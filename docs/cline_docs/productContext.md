# Product Context

## Purpose
This project exists to provide Florida real estate professionals with an accurate and user-friendly closing cost calculator. It solves the problem of complex closing cost calculations by automating the process and providing instant, accurate estimates.

## Problems Solved
1. Complex Calculations
   - Automates Florida-specific closing cost calculations
   - Handles title insurance reissue rates
   - Calculates documentary stamps and prorated taxes

2. Accessibility
   - Provides real-time updates as inputs change
   - Offers visual breakdowns of costs
   - Includes demo mode for quick testing
   - Role-specific features and access

3. Accuracy
   - Uses current Florida rates and fees
   - Implements proper calculation formulas
   - Allows for customization of default values
   - Role-based validation

## How It Works
1. User Management
   - Role-based registration (agent/broker)
   - Secure authentication via Supabase
   - Protected dashboard access
   - Profile management
   - Session handling

2. Property Selection
   - Property search functionality
   - Manual property data entry
   - Demo property option
   - Role-specific property access

3. Calculator Flow
   - Step-by-step input process
   - Real-time calculations
   - Interactive cost breakdown
   - Downloadable/shareable results
   - Role-based permissions

4. Data Management
   - Local storage for persistence
   - URL-based state sharing
   - Transaction history tracking
   - Secure profile data
   - Role-based data access

## User Roles
1. Real Estate Agent
   - Basic calculator access
   - Property search
   - Result sharing
   - Transaction history

2. Broker
   - Advanced calculator features
   - Team management
   - Analytics access
   - Custom fee settings

## Security
1. Access Control
   - Role-based permissions
   - Protected routes
   - Secure API endpoints
   - Data isolation

2. Data Protection
   - Row Level Security
   - Profile privacy
   - Secure sessions
   - Audit logging