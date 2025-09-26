# Payment and Escrow Flow with Stripe Connect

This document details the payment flow, focusing on the integration with Stripe Connect to handle escrow, payouts, and platform fees. We will use Stripe's "Separate Charges and Transfers" model, as it provides a clean separation of concerns and is well-suited for marketplaces.

## Core Concepts

- **Stripe Connect:** Allows the platform to process payments on behalf of freelancers. Each freelancer will have a "Connected Account" with Stripe, which we help them create.
- **PaymentIntents:** The primary Stripe API for handling complex payment flows. It tracks the payment from initiation to completion.
- **Separate Charges and Transfers:** We create a charge on the client's card and hold the funds in our platform's Stripe balance. When the work is approved, we transfer the funds to the freelancer's Connected Account, minus our platform fee.
- **Idempotency:** Crucial for webhooks. We must ensure that processing the same event multiple times does not result in duplicate transactions.

---

## Flow 1: Freelancer Onboarding

1.  **Trigger:** A freelancer accesses the "Payout Settings" page in their dashboard.
2.  **Action:** The backend calls Stripe's API to create a new Connected Account for the freelancer.
    ```
    // Example: Create a Stripe Connect account
    const account = await stripe.accounts.create({
      type: 'express', // Express provides a Stripe-hosted onboarding flow
      email: freelancer.email,
    });
    ```
3.  **Backend:** The backend then creates an "Account Link" for this account.
    ```
    // Example: Create an Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://your-platform.com/reauth',
      return_url: 'https://your-platform.com/stripe-return',
      type: 'account_onboarding',
    });
    ```
4.  **Frontend:** The frontend redirects the freelancer to the `url` provided in the `accountLink` response.
5.  **Stripe:** The freelancer completes the Stripe-hosted onboarding form (providing bank details, identity info for KYC, etc.).
6.  **Webhook:** Once complete, Stripe sends an `account.updated` webhook to our backend. We inspect the `charges_enabled` and `payouts_enabled` fields to confirm the freelancer can receive payments.

---

## Flow 2: Client Deposits Funds into Escrow

1.  **Trigger:** A client accepts a proposal and clicks "Hire & Deposit Funds".
2.  **Frontend:** The frontend makes a request to our backend to create a payment intent.
    ```javascript
    // POST /api/v1/payments/create-intent
    {
      "contract_id": "contract-uuid"
    }
    ```
3.  **Backend:**
    - The backend looks up the contract and its total amount.
    - It creates a `PaymentIntent` with Stripe, specifying the amount and currency. **Crucially, it does not set the `transfer_data.destination` yet.**
    ```
    // Example: Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: contract.total_amount_cents,
      currency: 'usd',
      application_fee_amount: contract.total_amount_cents * 0.10, // Example 10% fee
      // We will link the transfer later
    });
    ```
    - The backend saves the `paymentIntent.id` in the `transactions` table with a `pending` status.
    - It returns the `client_secret` from the `paymentIntent` to the frontend.
4.  **Frontend:** The frontend uses the `client_secret` with the Stripe.js library to display the payment form (e.g., Stripe Card Element).
5.  **Stripe:** The client securely enters their payment details into the Stripe Element. Stripe processes the payment.
6.  **Webhook:** Stripe sends a `payment_intent.succeeded` webhook to our backend.

---

## Flow 3: Handling a Successful Deposit (Webhook)

1.  **Trigger:** Our backend receives the `payment_intent.succeeded` webhook from Stripe.
2.  **Idempotency Check:**
    - The backend first checks if it has already processed this event. A good way is to use the webhook event's ID (`evt.id`) and store it, or check the status of our internal transaction record.
3.  **Backend Logic:**
    - Find the corresponding transaction in our database using the `paymentIntent.id`.
    - If the transaction is still `pending`, update its status to `succeeded`.
    - Update the `contract` status to `active` and `escrow_status` to `funded`.
    - Notify the freelancer that the project has started.
4.  **Response:** The backend returns a `200 OK` response to Stripe to acknowledge receipt of the webhook.

---

## Flow 4: Releasing Funds to the Freelancer

1.  **Trigger:** The client approves the final work and clicks "Approve & Release Payment".
2.  **Frontend:** The frontend makes a request to our backend.
    ```javascript
    // POST /api/v1/payments/release-funds
    {
      "contract_id": "contract-uuid"
    }
    ```
3.  **Backend:**
    - The backend verifies that the user is the client and that the contract is in a releasable state.
    - It calculates the final amounts (platform fee and freelancer payout).
    - It creates a `Transfer` with Stripe to move the funds from the platform's balance to the freelancer's Connected Account.
    ```
    // Example: Create a Transfer
    const transfer = await stripe.transfers.create({
      amount: payout_amount_cents, // Total amount minus platform fee
      currency: 'usd',
      destination: freelancer.stripe_account_id,
      source_transaction: original_charge_id, // Link to the original client payment
    });
    ```
    - The backend updates the `contract` status to `completed`.
    - It records the release transaction and the fee transaction in the `transactions` table.
4.  **Webhook:** Stripe sends a `transfer.created` and then a `transfer.paid` webhook. We can use these to log the payout status.

---

## Sample Webhook Payloads & Handling

### `payment_intent.succeeded`

```json
{
  "id": "evt_123...",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_123...",
      "amount": 50000,
      "currency": "usd",
      "status": "succeeded"
    }
  }
}
```
**Handler Logic:** Verify idempotency key (`evt.id`). Find `transaction` with `provider_transaction_id` = `pi_123...`. Update status to `succeeded`. Update contract status.

### `transfer.paid`

```json
{
  "id": "evt_456...",
  "type": "transfer.paid",
  "data": {
    "object": {
      "id": "tr_456...",
      "amount": 45000,
      "destination": "acct_freelancer_123",
      "status": "paid"
    }
  }
}
```
**Handler Logic:** Log that the payout to the freelancer has been successfully completed. This is important for auditing and support.

---

## Security and Edge Cases

- **Webhook Security:** Always verify the signature of incoming webhooks using your Stripe webhook signing secret. This prevents forged events.
- **Disputes/Chargebacks:** If a client issues a chargeback, Stripe will create a `charge.dispute.created` event. We must handle this by freezing the contract and notifying admins.
- **Partial Refunds:** The Stripe API allows for partial refunds on charges if a partial resolution is agreed upon.
- **Idempotency Keys:** When making critical API calls (like creating transfers), use idempotency keys to prevent creating duplicate transactions in case of network failures.