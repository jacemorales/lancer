-- PostgreSQL Schema for the Freelance Marketplace
-- This schema is designed to be robust, scalable, and secure, with a focus on data integrity for financial transactions.

-- Enums for status fields to ensure data consistency
CREATE TYPE user_role AS ENUM ('freelancer', 'client');
CREATE TYPE job_budget_type AS ENUM ('fixed', 'hourly');
CREATE TYPE job_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE proposal_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'in_progress', 'disputed', 'completed', 'closed');
CREATE TYPE milestone_status AS ENUM ('pending', 'funded', 'in_progress', 'submitted', 'approved', 'cancelled');
CREATE TYPE transaction_type AS ENUM ('deposit', 'release', 'refund', 'fee', 'withdrawal');
CREATE TYPE transaction_status AS ENUM ('pending', 'succeeded', 'failed');
CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'resolved');
CREATE TYPE kyc_status AS ENUM ('not_started', 'pending', 'verified', 'rejected');

-- Main user table
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT UNIQUE NOT NULL,
  "password_hash" TEXT,
  "google_oauth_id" TEXT UNIQUE,
  "roles" user_role[] NOT NULL,
  "email_verified" BOOLEAN NOT NULL DEFAULT false,
  "kyc_status" kyc_status NOT NULL DEFAULT 'not_started',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Freelancer-specific profile information
CREATE TABLE "freelancer_profiles" (
  "user_id" UUID PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "headline" TEXT,
  "bio" TEXT,
  "skills" TEXT[],
  "hourly_rate_cents" INTEGER, -- Store money in cents
  "location" TEXT,
  "resume_url" TEXT,
  "portfolio" JSONB, -- Array of {title, description, url, image_url}
  "github_url" TEXT,
  "linkedin_url" TEXT,
  "languages" TEXT[],
  "education" JSONB, -- Array of {institution, degree, start_date, end_date}
  "work_history" JSONB, -- Array of {company, role, start_date, end_date, description}
  "rating_avg" NUMERIC(3, 2) DEFAULT 0.00,
  "completed_jobs" INTEGER DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Client-specific profile information
CREATE TABLE "client_profiles" (
  "user_id" UUID PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
  "company_name" TEXT,
  "website_url" TEXT,
  "verified_business" BOOLEAN DEFAULT false,
  "total_spent_cents" BIGINT DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Job postings
CREATE TABLE "jobs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "client_id" UUID NOT NULL REFERENCES "users"("id"),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL, -- Rich text/markdown
  "skills" TEXT[],
  "category" TEXT,
  "budget_type" job_budget_type NOT NULL,
  "budget_min_cents" INTEGER,
  "budget_max_cents" INTEGER,
  "attachments" TEXT[],
  "status" job_status NOT NULL DEFAULT 'open',
  "experience_level" TEXT, -- e.g., 'entry', 'intermediate', 'expert'
  "screening_questions" JSONB, -- Array of strings
  "visibility" TEXT DEFAULT 'public', -- 'public' or 'invite-only'
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "expires_at" TIMESTAMPTZ
);

-- Proposals submitted by freelancers for jobs
CREATE TABLE "proposals" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "job_id" UUID NOT NULL REFERENCES "jobs"("id"),
  "freelancer_id" UUID NOT NULL REFERENCES "users"("id"),
  "cover_letter" TEXT NOT NULL,
  "resume_url" TEXT,
  "attachments" TEXT[],
  "proposed_budget_cents" INTEGER,
  "proposed_timeline_days" INTEGER,
  "screening_question_answers" JSONB,
  "status" proposal_status NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("job_id", "freelancer_id") -- A freelancer can only apply once to a job
);

-- Contracts created when a proposal is accepted
CREATE TABLE "contracts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "job_id" UUID NOT NULL REFERENCES "jobs"("id"),
  "proposal_id" UUID UNIQUE REFERENCES "proposals"("id"),
  "client_id" UUID NOT NULL REFERENCES "users"("id"),
  "freelancer_id" UUID NOT NULL REFERENCES "users"("id"),
  "total_amount_cents" INTEGER NOT NULL,
  "escrow_status" TEXT, -- e.g., 'funded', 'partially-funded', 'unfunded'
  "status" contract_status NOT NULL DEFAULT 'draft',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "start_date" TIMESTAMPTZ,
  "end_date" TIMESTAMPTZ
);

-- Milestones within a contract
CREATE TABLE "milestones" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contract_id" UUID NOT NULL REFERENCES "contracts"("id"),
  "title" TEXT NOT NULL,
  "description" TEXT,
  "amount_cents" INTEGER NOT NULL,
  "due_date" TIMESTAMPTZ,
  "status" milestone_status NOT NULL DEFAULT 'pending',
  "deliverable_urls" TEXT[],
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Financial transactions
CREATE TABLE "transactions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contract_id" UUID REFERENCES "contracts"("id"),
  "milestone_id" UUID REFERENCES "milestones"("id"),
  "user_id" UUID NOT NULL REFERENCES "users"("id"), -- User initiating or receiving
  "type" transaction_type NOT NULL,
  "amount_cents" INTEGER NOT NULL,
  "fee_cents" INTEGER DEFAULT 0,
  "provider_transaction_id" TEXT UNIQUE NOT NULL, -- From Stripe, etc.
  "status" transaction_status NOT NULL,
  "metadata" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages between users, tied to a contract
CREATE TABLE "messages" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contract_id" UUID NOT NULL REFERENCES "contracts"("id"),
  "sender_id" UUID NOT NULL REFERENCES "users"("id"),
  "text" TEXT,
  "attachments" TEXT[],
  "read_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews left by users after a contract is completed
CREATE TABLE "reviews" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contract_id" UUID NOT NULL REFERENCES "contracts"("id"),
  "reviewer_id" UUID NOT NULL REFERENCES "users"("id"),
  "reviewee_id" UUID NOT NULL REFERENCES "users"("id"),
  "rating" INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  "comment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("contract_id", "reviewer_id") -- One review per contract per user
);

-- Disputes raised for a contract
CREATE TABLE "disputes" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contract_id" UUID UNIQUE NOT NULL REFERENCES "contracts"("id"), -- One dispute per contract
  "raised_by_id" UUID NOT NULL REFERENCES "users"("id"),
  "reason" TEXT NOT NULL,
  "evidence_urls" TEXT[],
  "status" dispute_status NOT NULL DEFAULT 'open',
  "resolution_notes" TEXT,
  "resolved_by_admin_id" UUID REFERENCES "users"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "resolved_at" TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX ON "users" ("email");
CREATE INDEX ON "jobs" ("client_id");
CREATE INDEX ON "jobs" USING GIN ("skills");
CREATE INDEX ON "proposals" ("job_id");
CREATE INDEX ON "proposals" ("freelancer_id");
CREATE INDEX ON "contracts" ("client_id");
CREATE INDEX ON "contracts" ("freelancer_id");
CREATE INDEX ON "milestones" ("contract_id");
CREATE INDEX ON "transactions" ("user_id");
CREATE INDEX ON "messages" ("contract_id");
CREATE INDEX ON "reviews" ("reviewee_id");
CREATE INDEX ON "disputes" ("contract_id");