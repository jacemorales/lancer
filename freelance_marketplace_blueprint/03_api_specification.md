# API Specification

This document defines the RESTful API for the freelance marketplace. The API is designed to be secure, predictable, and easy to use.

## General Principles

- **Base URL:** `/api/v1`
- **Authentication:** Most endpoints require a JSON Web Token (JWT) in the `Authorization` header (`Bearer <token>`). The token is obtained via the `/auth/login` endpoint.
- **Data Format:** All requests and responses will use JSON.
- **Error Handling:** Errors will be returned with appropriate HTTP status codes and a JSON body containing a descriptive error message.
  ```json
  {
    "error": "A descriptive error message."
  }
  ```
- **Rate Limiting:** All endpoints are subject to rate limiting to prevent abuse.

---

## 1. Authentication (`/auth`)

### `POST /auth/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "a-strong-password",
    "role": "client" // or "freelancer"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User created successfully. Please check your email to verify your account."
  }
  ```

### `POST /auth/login`
- **Description:** Log in a user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "a-strong-password"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### `POST /auth/google`
- **Description:** Sign in or sign up using a Google OAuth token.
- **Request Body:**
  ```json
  {
    "google_token": "the-token-from-google"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

---

## 2. Users & Profiles (`/users`, `/profiles`)

### `GET /users/me`
- **Description:** Get the current authenticated user's details.
- **Auth:** Required.
- **Response (200 OK):**
  ```json
  {
    "id": "user-uuid",
    "email": "user@example.com",
    "roles": ["client"],
    // ... other user fields
  }
  ```

### `PUT /profiles/freelancer`
- **Description:** Create or update the freelancer profile for the current user.
- **Auth:** Required (user must have 'freelancer' role).
- **Request Body:**
  ```json
  {
    "headline": "Full-Stack Developer",
    "bio": "...",
    "skills": ["React", "Node.js"],
    // ... other freelancer profile fields
  }
  ```
- **Response (200 OK):** The updated profile object.

### `GET /profiles/freelancer/:userId`
- **Description:** Get a freelancer's public profile.
- **Auth:** Not required.
- **Response (200 OK):** The freelancer's public profile data.

---

## 3. Jobs (`/jobs`)

### `POST /jobs`
- **Description:** Create a new job posting.
- **Auth:** Required (user must have 'client' role).
- **Request Body:**
  ```json
  {
    "title": "Build a new feature",
    "description": "...",
    "skills": ["React", "API Integration"],
    "budget_type": "fixed",
    "budget_min_cents": 50000
  }
  ```
- **Response (201 Created):** The newly created job object.

### `GET /jobs`
- **Description:** Search and filter for jobs.
- **Auth:** Not required.
- **Query Parameters:** `q`, `skills`, `budget_min`, `budget_max`, `type`, `sort`.
- **Response (200 OK):**
  ```json
  {
    "jobs": [
      // ... list of job objects
    ],
    "total": 100
  }
  ```

### `GET /jobs/:id`
- **Description:** Get details for a single job.
- **Auth:** Not required.
- **Response (200 OK):** The job object.

---

## 4. Proposals (`/proposals`)

### `POST /jobs/:jobId/proposals`
- **Description:** Submit a proposal for a job.
- **Auth:** Required (user must have 'freelancer' role).
- **Request Body:**
  ```json
  {
    "cover_letter": "I am the best candidate because...",
    "proposed_budget_cents": 45000
  }
  ```
- **Response (201 Created):** The newly created proposal object.

### `GET /jobs/:jobId/proposals`
- **Description:** List proposals for a job owned by the client.
- **Auth:** Required (user must be the job owner).
- **Response (200 OK):** A list of proposal objects.

---

## 5. Contracts (`/contracts`)

### `POST /contracts`
- **Description:** Create a contract by accepting a proposal.
- **Auth:** Required (user must be the job owner).
- **Request Body:**
  ```json
  {
    "proposal_id": "proposal-uuid"
  }
  ```
- **Response (201 Created):** The newly created contract object. This will have a `draft` status until funds are deposited.

### `GET /contracts`
- **Description:** Get a list of contracts for the current user.
- **Auth:** Required.
- **Response (200 OK):** A list of contract objects.

### `GET /contracts/:id`
- **Description:** Get details for a single contract.
- **Auth:** Required (user must be the client or freelancer on the contract).
- **Response (200 OK):** The contract object, including milestones.

---

## 6. Payments (`/payments`)

### `POST /payments/create-intent`
- **Description:** Create a payment intent for depositing funds into escrow.
- **Auth:** Required (user must be the client on the contract).
- **Request Body:**
  ```json
  {
    "contract_id": "contract-uuid",
    "milestone_id": "milestone-uuid" // Optional, for milestone funding
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "client_secret": "stripe-client-secret"
  }
  ```

### `POST /payments/release-funds`
- **Description:** Release funds for a completed milestone or contract.
- **Auth:** Required (user must be the client on the contract).
- **Request Body:**
  ```json
  {
    "contract_id": "contract-uuid",
    "milestone_id": "milestone-uuid"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Funds released successfully."
  }
  ```

### `POST /payments/webhooks`
- **Description:** Webhook endpoint for the payment provider (e.g., Stripe) to send events.
- **Auth:** None (secured by verifying the webhook signature).
- **Request Body:** Varies by provider (e.g., Stripe event object).
- **Response (200 OK):** An empty body.

---

## 7. Messaging (`/messages`)

- **Note:** Messaging will primarily use WebSockets, but a REST endpoint can be used to fetch message history.

### `GET /contracts/:contractId/messages`
- **Description:** Get message history for a contract.
- **Auth:** Required (user must be part of the contract).
- **Query Parameters:** `limit`, `before` (for pagination).
- **Response (200 OK):**
  ```json
  {
    "messages": [
      // ... list of message objects
    ]
  }
  ```
- **WebSocket Events:**
  - `join_contract_room` (client to server)
  - `leave_contract_room` (client to server)
  - `send_message` (client to server)
  - `new_message` (server to clients)