# Project Brief: Financial Advisor Marketing CRM Platform

## System Purpose

Build a multi-tenant CRM system enabling marketing companies to manage lead generation campaigns (digital ads + direct mail) for financial advisors who convert leads through educational events into clients for financial services (trusts, retirement planning, etc.).

## Technical Stack Requirements

- Frontend: Next.js 13+ (App Router)
- Database/Backend: Supabase
- Authentication: Clerk
- Task Processing: Trigger.dev
- Styling: Tailwind CSS

## Core Functionality Requirements

### 1. Campaign Management

- Digital ad campaign tracking (Meta, Google Ads)
- Direct mail campaign management
- Budget allocation and spend tracking
- ROI analytics and reporting

### 2. Event Management

- Event scheduling and registration
- Attendee tracking
- Automated follow-up sequences
- Conversion analytics

### 3. Client Management

- Multi-tenant architecture with strict data isolation
- Client profiles and interaction history
- Service proposals and contract management
- Automated invoicing and billing

### 4. Analytics & Reporting

- Campaign performance metrics
- Event conversion rates
- Revenue tracking
- Cost per acquisition analysis

## Deliverables

### 1. System Architecture

- Infrastructure diagram with all service integrations
- Database schema with relationships and constraints
- API documentation following OpenAPI standards
- Security implementation plan with role-based access control

### 2. Implementation Roadmap

- Phase 1: Core infrastructure and authentication
- Phase 2: Campaign and event management
- Phase 3: Client management and billing
- Phase 4: Analytics and reporting
- Phase 5: Optimization and scaling

### 3. Technical Specifications

- Data models with validation rules
- API endpoint definitions
- Real-time sync implementation
- Background job configurations
- Testing strategy (unit, integration, E2E)

## Design Requirements

### Interface Requirements

- Clean, professional design system optimized for financial services
- Light and dark mode support
- Responsive layouts (mobile to desktop)
- Clear visual hierarchies for complex campaign data

### Component Library Specifications

- Reusable components following atomic design principles
- Essential CRM elements:
  - Contact cards
  - Campaign trackers
  - Event schedulers
  - Analytics dashboards
- White-labeling support for multiple marketing agency tenants

### Accessibility & Performance

- WCAG 2.1 Level AA compliance
- 3:1 minimum contrast ratios
- Keyboard navigation support
- Screen reader optimization
- <2s initial page load
- Progressive loading for data-heavy views

### User Experience Focus

- Streamlined campaign creation workflows
- Clear data visualization
- Intuitive event management
- Simple lead tracking
- Role-based dashboard views

Note: This brief will be used to populate other Memory Bank files and guide development.
