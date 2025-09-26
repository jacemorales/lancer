# MVP Backlog and Phased Roadmap

This document outlines the prioritized features for the Minimum Viable Product (MVP) and a roadmap for subsequent phases. Each feature is presented as a user story with clear acceptance criteria.

## Estimation Buckets
- **S (Small):** 1-3 days of effort
- **M (Medium):** 3-7 days of effort
- **L (Large):** 1-3 weeks of effort
- **XL (Extra Large):** 3+ weeks of effort

---

## Phase 1: MVP - Core Marketplace Functionality

The goal of the MVP is to provide a fully functional platform for clients to post jobs, hire freelancers, and pay for completed work securely.

### Epic: Authentication & User Profiles

| ID | User Story | Effort | Acceptance Criteria |
|----|------------|--------|---------------------|
| 1.1| As a new user, I want to sign up with my email and password so I can create an account. | M | - User can provide email, password, and role (client/freelancer).<br>- An email verification link is sent.<br>- Account is not active until email is verified. |
| 1.2| As a new user, I want to sign in with my Google account so I can register quickly. | M | - User can authenticate with Google OAuth.<br>- A new user record is created if one doesn't exist.<br>- User is logged in and a JWT is issued. |
| 1.3| As a returning user, I want to log in with my email and password. | S | - User can log in with correct credentials.<br>- A JWT is issued upon successful login. |
| 1.4| As a freelancer, I want to create a basic profile with a headline, bio, and skills. | M | - Authenticated freelancer can fill and save profile fields.<br>- Public profile page is generated. |
| 1.5| As a client, I want to have a basic profile with my name and company. | S | - Authenticated client can fill and save profile fields. |

### Epic: Job Posting & Application

| ID | User Story | Effort | Acceptance Criteria |
|----|------------|--------|---------------------|
| 2.1| As a client, I want to post a job with a title, description, budget type, and budget. | M | - A logged-in client can access a "Post Job" form.<br>- The job appears in the public job listings after submission. |
| 2.2| As a user, I want to browse and search for jobs by keywords. | M | - A public job listing page is available.<br>- Basic keyword search is functional. |
| 2.3| As a freelancer, I want to apply to a job with a cover letter and proposed rate. | M | - A logged-in freelancer can submit a proposal on a job detail page.<br>- The client receives a notification/can see the proposal. |
| 2.4| As a client, I want to review the proposals I have received for my job. | M | - A client can view a list of proposals for their job.<br>- They can click to see proposal details and the freelancer's profile. |

### Epic: Contracts & Payments (Core Escrow Flow)

| ID | User Story | Effort | Acceptance Criteria |
|----|------------|--------|---------------------|
| 3.1| As a client, I want to accept a proposal to create a contract. | S | - Client can click "Accept" on a proposal.<br>- A contract is created in a `draft` state. |
| 3.2| As a client, I want to deposit funds into escrow for a contract. | L | - Client is prompted to pay the agreed amount.<br>- Integration with Stripe PaymentIntents is successful.<br>- Contract status changes to `active` upon successful payment. |
| 3.3| As a freelancer, I want to be notified when a contract is funded and active. | S | - Freelancer receives an email/in-app notification. |
| 3.4| As a client, I want to approve the completed work and release the payment. | M | - Client has a "Mark as Complete" button.<br>- On approval, funds are released to the freelancer's connected account (minus platform fees).<br>- Stripe Transfer is successfully created. |
| 3.5| As a freelancer, I want to set up my payout information (Stripe Connect). | M | - Freelancer can complete the Stripe Connect onboarding flow.<br>- KYC is handled by Stripe. |
| 3.6| As a user, I want to leave a rating and review after a contract is completed. | M | - Both parties are prompted to leave a review after payment is released.<br>- Reviews appear on the user's public profile. |

### Epic: Basic Administration

| ID | User Story | Effort | Acceptance Criteria |
|----|------------|--------|---------------------|
| 4.1| As an admin, I want a dashboard to view key stats (users, jobs, transactions). | M | - A secure admin area exists.<br>- Basic stats are displayed. |
| 4.2| As an admin, I want to view a list of all users and be able to suspend an account. | M | - Admin can search for users.<br>- Admin has a "Suspend" button that deactivates a user's account. |

---

## Phase 2: Post-MVP Enhancements

### Epic: Advanced Features

| ID | User Story | Effort | Acceptance Criteria |
|----|------------|--------|---------------------|
| 5.1| As a client, I want to define and fund multiple milestones for a project. | L | - Contracts support multiple milestones.<br>- Escrow can be funded per milestone.<br>- Funds are released per milestone. |
| 5.2| As a user, I want to open a dispute if there is a problem with a contract. | L | - A "Dispute" button is available on active contracts.<br>- A form allows users to submit evidence.<br>- An admin can review and resolve the dispute (release/refund funds). |
| 5.3| As a user, I want real-time messaging on the contract page. | L | - A chat interface is available on the contract page.<br>- Messages are delivered in near real-time via WebSockets. |
| 5.4| As a user, I want advanced search filters (skills, ratings, client history). | M | - The job/freelancer search includes faceted filters. |
| 5.5| As a freelancer, I want to enhance my profile with a portfolio and work history. | M | - Profile page supports uploading images and detailed project descriptions. |

---

## Phase 3: Scaling & Intelligence

### Epic: Growth and Platform Maturity

| ID | User Story | Effort | Acceptance Criteria |
|----|------------|--------|---------------------|
| 6.1| As a user, I want to receive intelligent job/freelancer recommendations. | L | - A recommendation engine suggests relevant jobs/freelancers based on skills and history. |
| 6.2| As a freelancer, I want to be able to take skill tests to verify my abilities. | XL | - Integration with a skill testing platform.<br>- Verified skills are displayed on profiles. |
| 6.3| As a business, I want to have a mobile app to manage my projects on the go. | XL | - Native or hybrid mobile apps for iOS and Android are developed. |
| 6.4| As an admin, I want detailed analytics and reporting dashboards. | L | - Integration with an analytics tool (e.g., Metabase) for business intelligence. |