# Realtor Platform - Product Requirements Document (PRD)

## 1. Vision & Goal

To create a web application providing high value to realtors, acting as a lead generation and retention tool for a title company. The platform will feature sophisticated real estate calculators, property management, map-based research tools, and AI assistance, aiming to be an indispensable resource for realtors.

## 2. Core User Groups & Needs

*   **Realtors (Primary):** Need accurate calculators, property/client management, map research, report generation/sharing (email), potential AI assistance. Require a polished, reliable, time-saving tool. (Requires Auth)
*   **Public Users (Leads):** Seek quick estimations. Willing to register for full results/saved data. (Goal: Lead Capture)
*   **Administrators (Title Co.):** Need usage analytics, user management for marketing/support.
*   **Title Company (Stakeholder):** Needs enhanced realtor relationships, lead generation, value demonstration.

## 3. Feature Breakdown: Realtor Portal

*   **Authentication:** Secure login/registration (Clerk).
*   **Dashboard:** Central hub (saved properties, recent calculations, etc.).
*   **Property Management:** Add/Edit/View/Save properties.
*   **Calculators:** Access to implemented calculators (Seller Closing Costs, etc.), pre-fill from saved properties.
*   **Map Interface:** Zillow-like map for research (using provided RapidAPI). Click properties for details/calculations.
*   **Focus Mode:** Toggle between map focus and calculator/dashboard focus.
*   **Report Generation/Sharing:** Generate PDF/web summaries, email reports to self/clients.

## 4. Feature Breakdown: Public Portal

*   **Calculator Access:** Public access to one or more calculators.
*   **Registration Gate:** Require registration/login for full results, saving, or emailing reports (Lead Capture).
*   **Value Proposition:** Clearly communicate benefits of registration.

## 5. Feature Breakdown: Admin Portal

*   **Secure Access:** Separate admin login.
*   **User Management:** View registered realtors, manage status.
*   **Usage Analytics:** Key metrics dashboard (registrations, activity, feature usage), filterable by date.
*   **Data Export:** Export user lists/analytics (CSV).

## 6. Feature Breakdown: AI Integration

*   **(Phase 2+) AI Property Evaluation:** Estimated valuations/insights (Requires reliable data/model).
*   **(Phase 2+) Conversational Calculator:** AI chatbot interface for calculator input.
*   **(Phase 2+) AI Q&A / Chatbot:** Answer realtor questions about closing costs, title, platform features, leveraging property data from RapidAPI.
*   **(Phase 2+) AI Property Report/Investor Guide:** Generate reports based on property data.

## 7. Technical Stack & UI/UX

*   **Frontend:** Next.js (React)
*   **Authentication:** Clerk
*   **Database:** Supabase or Convex (Decision needed)
*   **API Integrations:** RapidAPI (Property/Map Data), AI Service (TBD), Email Service (e.g., Resend, SendGrid).
*   **UI/UX:** High priority on polished, clean, intuitive UI (HeroUI, potentially 21st Magic). Consistent look/feel, smooth animations/transitions, responsive design.
*   **Caching:** Implement for external APIs and potentially DB queries.

## 8. Prioritization & MVP

*   **MVP Must-Haves:**
    *   Realtor Auth (Clerk)
    *   Core Calculator(s) (Seller Closing Costs accurate)
    *   Basic Property Saving/Management
    *   Report Generation (Web view/Email to self)
    *   Public Calculator + Registration Gate
    *   Basic Admin view (User list)
    *   Database Setup (Supabase/Convex)
    *   Polished UI (Core features)
*   **Phase 2 Should-Haves:**
    *   Realtor Dashboard (Basic)
    *   Email reports to clients
    *   Admin Analytics (Basic counts)
    *   Additional Calculators (e.g., Buyer Costs)
    *   Initial AI Features (Chatbot, Simple Report)
*   **Later Phases:**
    *   Map Interface (RapidAPI integration)
    *   Focus Mode Toggle
    *   Advanced Admin Analytics/Export
    *   Advanced AI (Evaluation, Conversational Calc)

## 9. Difficulty Assessment

*   **Easy/Medium:** Core Calculator logic, Basic Auth, Basic CRUD, Simple Report/Email, Reg Gate, Admin List, Component UI.
*   **Medium/Hard:** Dashboard, Map Interface, Admin Analytics, DB Choice/Setup, Initial AI Features.
*   **Hard:** Advanced AI, Complex Map Interactions.

## 10. Key Decisions / Next Steps

*   Confirm final MVP scope.
*   Choose Database: Supabase vs. Convex.
*   Deep dive into RapidAPI endpoint capabilities/limits/costs.
*   Prioritize specific AI features for Phase 2.
*   Determine next calculator(s) after Seller Costs.
*   Refine UI/UX requirements (style guide, key interactions).
*   Plan lead flow post-registration. 