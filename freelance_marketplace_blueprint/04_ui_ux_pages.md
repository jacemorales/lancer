# UI/UX Page List and Wireframe Descriptions

This document outlines the necessary pages for the freelance marketplace, along with a description of their key components and intended user experience. This serves as a blueprint for UI/UX design and frontend development.

## General Components

- **Navbar (Authenticated):** Logo, Search Bar, "Find Work", "My Jobs", Messages Icon, Notifications Icon, User Profile Dropdown (Dashboard, Profile, Settings, Logout).
- **Navbar (Unauthenticated):** Logo, "Find Work", "Post a Job", "Log In", "Sign Up".
- **Footer:** About Us, Contact, Terms of Service, Privacy Policy, Social Media Links.

---

## 1. Core Public Pages

### 1.1. Homepage
- **Description:** The main landing page for new visitors.
- **Components:**
    - Hero section with a clear value proposition (e.g., "Find the perfect developer for your project") and primary CTAs ("Find a Freelancer", "Post a Job").
    - A search bar for jobs or freelancers.
    - Featured job categories or skills.
    - Testimonials or success stories.
    - "How it works" section (for clients and freelancers).

### 1.2. Job Listing Page (`/jobs`)
- **Description:** A searchable and filterable list of all public job postings.
- **Components:**
    - **Search Bar:** Prominently displayed at the top.
    - **Filters (Sidebar):**
        - Keywords, Skills (tags)
        - Budget Range (slider)
        - Job Type (fixed/hourly)
        - Experience Level
        - Client History (payment verified, etc.)
        - Location (remote/on-site)
    - **Job List:** Each item shows title, brief description, key skills, budget, and posted date.
    - **Sorting Options:** Relevance, Newest, Highest Budget.

### 1.3. Job Detail Page (`/jobs/:id`)
- **Description:** A detailed view of a single job posting.
- **Components:**
    - **Main Content:**
        - Job Title
        - Full Description (supports markdown/rich text)
        - Required Skills
        - Budget, Job Type, Experience Level
        - Attachments
        - Screening Questions
    - **Sidebar:**
        - "Apply Now" button (for freelancers).
        - **About the Client:** Company info, location, hiring history, average rating from freelancers.
        - "Save Job" button.

### 1.4. Freelancer Profile Page (`/freelancers/:id`)
- **Description:** A public profile for a freelancer.
- **Components:**
    - **Header:** Profile picture, name, headline, location, hourly rate, "Hire Me" button.
    - **Main Content:**
        - **Bio/About section.**
        - **Work History & Portfolio:** A gallery of past projects with descriptions, images, and links.
        - **Skills:** List of skills.
        - **Reviews & Ratings:** Feedback from past clients.
    - **Sidebar:**
        - **Stats:** Job success rate, completed jobs, rating.
        - **Verification Badges:** ID Verified, etc.
        - **Resume/CV:** Download link.

---

## 2. Authentication Pages

### 2.1. Sign Up Page (`/signup`)
- **Description:** A simple form for new user registration.
- **Components:**
    - Tabs to select role ("I'm a client, hiring for a project" or "I'm a freelancer, looking for work").
    - Email, Password fields.
    - "Sign up with Google" button.
    - Link to Terms of Service and Privacy Policy.

### 2.2. Login Page (`/login`)
- **Description:** A form for existing users to log in.
- **Components:**
    - Email, Password fields.
    - "Sign in with Google" button.
    - "Forgot Password?" link.

---

## 3. User Dashboard & Workflow Pages

### 3.1. Dashboard (`/dashboard`)
- **Description:** The main hub for authenticated users, showing a summary of their activity.
- **Components (Client View):**
    - List of active jobs.
    - Recent proposals received.
    - Active contracts.
    - "Post a New Job" button.
- **Components (Freelancer View):**
    - List of active proposals.
    - Active contracts.
    - Recommended jobs based on profile.

### 3.2. Post a Job Form (`/jobs/new`)
- **Description:** A multi-step form for clients to create a job posting.
- **Steps/Sections:**
    1.  **Title & Category:** Job title, category.
    2.  **Description:** Rich text editor for the job description.
    3.  **Details:** Skills, experience level, location.
    4.  **Budget:** Budget type (fixed/hourly), budget range.
    5.  **Review & Post:** A final review of all details before posting.

### 3.3. Apply to Job Form (`/jobs/:id/apply`)
- **Description:** A form for freelancers to submit a proposal.
- **Components:**
    - **Cover Letter:** Text area.
    - **Proposed Budget/Rate.**
    - **Answers to Screening Questions.**
    - **Attachments:** Upload resume or portfolio samples.
    - "Submit Proposal" button.

### 3.4. Contract View (`/contracts/:id`)
- **Description:** The central page for managing an active contract.
- **Components:**
    - **Header:** Contract title, status, client/freelancer names.
    - **Milestones:**
        - List of milestones with status (funded, submitted, approved).
        - "Deposit Funds" button for clients (for pending milestones).
        - "Submit Work" button for freelancers.
        - "Approve & Release Funds" button for clients.
    - **Messaging:** A real-time chat window for communication.
    - **Deliverables/Files:** A tab to view all files exchanged.
    - **Contract Details:** Original job post link, agreed terms.
    - **Actions:** "End Contract", "Open a Dispute".

---

## 4. Settings & Admin

### 4.1. Settings Page (`/settings`)
- **Description:** A tabbed interface for managing account settings.
- **Tabs:**
    - **Profile:** Edit public profile information.
    - **Account:** Change email, password.
    - **Billing & Payments:** Manage payment methods (for clients), set up payout details (for freelancers, including KYC).
    - **Notifications:** Configure email and push notifications.

### 4.2. Admin Panel (Separate Interface)
- **Description:** A dashboard for platform administrators.
- **Sections:**
    - **User Management:** Search, view, suspend users.
    - **Job Management:** View, flag, remove job postings.
    - **Dispute Resolution:** View open disputes, review evidence, and resolve them.
    - **Transactions:** View a log of all financial transactions.
    - **Analytics:** Key platform metrics (signups, jobs posted, value of transactions).