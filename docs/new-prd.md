# Realtor Platform with Iris AI - Product Requirements Document (PRD)

## 1. Vision & Goal

To create an AI-powered web application providing high value to realtors through interactive property analysis, sophisticated real estate calculators, and intuitive map-based research tools. The platform will serve as a lead generation and retention tool for a title company, making Iris (the AI assistant) the centerpiece of the user experience.

## 2. Core User Groups & Needs

* **Realtors (Primary):** Need accurate calculators, property analysis, map research, report generation/sharing (email), and AI assistance. Require a polished, reliable, time-saving tool. (Requires Auth for full features)
* **Public Users (Leads):** Seek quick property analysis and estimations. Willing to register for full results/saved data. (Goal: Lead Capture)
* **Administrators (Title Co.):** Need usage analytics, user management for marketing/support.
* **Title Company (Stakeholder):** Needs enhanced realtor relationships, lead generation, value demonstration.

## 3. Feature Breakdown: Core Experience

### 3.1 Iris AI Assistant
* **Conversational Interface:** Chat-based interaction for property lookup, analysis, and calculations
* **Property Data Lookup:** Allow users to simply enter an address and Iris fetches all relevant data
* **Calculation Runner:** Iris can run and explain various real estate calculations
* **Context Awareness:** Remembers current property and recent calculations
* **Placement:** Persistent drawer at the bottom of the screen, expandable for larger interactions

### 3.2 Map Interface
* **Property Exploration:** Zillow-like map for browsing properties
* **Data Overlay:** Show property prices, recently sold, etc.
* **Selection Integration:** Selected properties feed into Iris and calculators
* **Implementation:** Use Zillow56/Realtor16 RapidAPI endpoints

### 3.3 Property Panel (Left Side)
* **Property Details:** Display comprehensive information about selected property
* **Images Gallery:** Show property photos from API
* **Key Metrics:** Price, beds/baths, square footage, etc.
* **Quick Actions:** Run calculations, save property, share

### 3.4 Financial Tools Panel (Right Side)
* **Calculator Access:** Various financial tools organized by category
* **Seller's Net Sheet:** Calculate seller proceeds after costs
* **Buyer Financing:** Estimate buyer closing costs and monthly payments
* **Investment Analysis:** Calculate potential rental returns, cap rates, etc.
* **Tax Estimator:** Property tax calculations

### 3.5 Recent Properties Bar
* **Placement:** Horizontal scrolling bar above chat drawer
* **Content:** Recently viewed or analyzed properties
* **Functionality:** Quick access to previously visited properties
* **Persistence:** Save between sessions for registered users

## 4. User Flows

### 4.1 Public User Flow (Lead Generation)
1. User discovers site through search or referral
2. Browses properties on map or asks Iris about a specific address
3. Receives basic property information and simplified calculation results
4. When requesting detailed analysis or trying to save/share:
   - Email capture form appears offering full report in exchange for email
   - Simple registration to access additional features
5. After registration:
   - Receives full report via email
   - Basic account created for future visits
   - Email nurturing sequence from title company begins

### 4.2 Realtor User Flow (Registered)
1. Logs in to access full platform features
2. Either:
   - Explores properties via map interface
   - Directly asks Iris about a specific property
   - Accesses saved properties from previous sessions
3. Uses financial tools to analyze property
4. Generates professional reports for clients
5. Shares reports via email or direct link
6. Saves analyses for future reference

### 4.3 New Property Analysis Flow
1. User enters property address (via Iris or search)
2. System fetches property data from Zillow56/Realtor16 API
3. Property details display on left panel
4. User selects desired calculator from right panel
5. Calculator pre-fills with property data
6. User adjusts variables as needed
7. Results update in real-time
8. User can:
   - Email report (lead capture for public users)
   - Save analysis (registered users)
   - Ask Iris follow-up questions about the results

## 5. Technical Architecture

### 5.1 Frontend
* **Framework:** Next.js (React)
* **UI Components:** HeroUI or similar for clean, professional interface
* **Map Component:** Integration with mapping libraries for property visualization
* **Chat Interface:** Custom or adapted chat UI for Iris
* **Responsive Design:** Mobile-friendly with adaptive layouts

### 5.2 Backend
* **Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth
* **APIs:** 
  - Zillow56 RapidAPI
  - Realtor16 RapidAPI 
  - AirDNA1 RapidAPI
* **AI Integration:** OpenAI API or similar for Iris functionality
* **Email Service:** SendGrid or similar for report sharing and marketing

### 5.3 Supabase Implementation
* **Database Schema:**
  - Users table (extends Supabase auth)
  - Properties table (saved properties)
  - Analyses table (saved calculations)
  - Reports table (generated reports)
  - Activity table (user interactions for analytics)

* **Row Level Security Policies:**
  - Users can only see their own properties and analyses
  - Admins can view aggregated analytics

* **Realtime Features:**
  - Subscribe to property updates for collaborative use
  - Sync map view across devices

* **Setup Instructions:**
  1. Create new Supabase project
  2. Set up authentication providers (Email, Google, etc.)
  3. Run initial schema setup (through Postgres MCP)
  4. Configure security policies
  5. Set up webhooks for email triggers
  6. Connect to frontend with Supabase client

## 6. Calculator Implementations

### 6.1 Seller's Net Sheet Calculator
* **Inputs:**
  - Property sale price
  - Outstanding mortgage balance
  - Property details (auto-filled from API)
* **Calculations:**
  - Title insurance costs
  - Transfer taxes
  - Real estate commissions
  - Settlement fees
  - Mortgage payoff
* **Output:**
  - Net proceeds to seller
  - Itemized closing costs

### 6.2 Buyer Financing Calculator
* **Inputs:**
  - Purchase price
  - Down payment
  - Loan terms
  - Interest rate
  - Property details (auto-filled)
* **Calculations:**
  - Monthly mortgage payment
  - Property taxes
  - Insurance estimates
  - Closing costs
* **Output:**
  - Total monthly payment
  - Cash needed to close

### 6.3 Rental Property Analysis
* **Inputs:**
  - Purchase price
  - Expected rent (can use AirDNA API)
  - Expenses (taxes, insurance, maintenance)
  - Financing details
* **Calculations:**
  - Cap rate
  - Cash-on-cash return
  - ROI
  - Monthly cash flow
* **Output:**
  - Investment analysis summary
  - Cash flow projections

## 7. API Integration Details

### 7.1 Zillow56 RapidAPI
* **Authentication:**
  - Header: 'x-rapidapi-host': 'zillow56.p.rapidapi.com'
  - API key management through environment variables
* **Key Endpoints:**
  - `/locationSuggestions` - Search for properties by address
  - `/property` - Get comprehensive property details
  - `/propertyExtendedSearch` - Search properties with filters
  - `/propertyByPolygon` - Get properties within map boundaries
  - `/images` - Retrieve property images
  - `/priceAndTaxHistory` - Historical data
  - `/propertyEstimateMortgage` - Mortgage calculations
  - `/zestimate` - Property value estimates

### 7.2 Realtor16 RapidAPI
* **Authentication:**
  - Header: 'x-rapidapi-host': 'realtor16.p.rapidapi.com'
  - API key management through environment variables
* **Usage:**
  - Supplemental data source when Zillow data is insufficient
  - Alternative property search

### 7.3 AirDNA1 RapidAPI
* **Authentication:**
  - Header: 'x-rapidapi-host': 'airdna1.p.rapidapi.com'
  - API key management through environment variables
* **Usage:**
  - Short-term rental data for investment analysis
  - Vacation rental performance metrics

## 8. Iris AI Implementation

### 8.1 Core Functionality
* **Natural Language Processing:** Process user queries about properties
* **Context Management:** Maintain conversation context about properties
* **API Orchestration:** Trigger appropriate API calls based on user requests
* **Calculator Integration:** Run calculations based on conversational inputs
* **Response Generation:** Provide natural, helpful responses to user queries

### 8.2 Example Interactions
* User: "What are the seller closing costs for 123 Main St, Tampa FL?"
* User: "How much would my monthly payment be if I put 20% down on this house?"
* User: "What's the rental potential for this property?"
* User: "Compare this property to others in the neighborhood"

### 8.3 Technical Implementation
* **AI Service:** OpenAI API or similar
* **Prompt Engineering:** Carefully designed prompts to handle property queries
* **Function Calling:** Define functions for API calls and calculations
* **State Management:** Track conversation context and property details

## 9. Prioritization & MVP

### 9.1 MVP (Phase 1)
* **Core Infrastructure:**
  - Supabase setup with authentication
  - Basic Next.js application structure
  - API integrations (Zillow56)
* **Key Features:**
  - Simplified map interface
  - Basic property panel
  - Initial version of Iris chat interface
  - Seller's Net Sheet Calculator
  - Email capture for lead generation
  - Basic report generation

### 9.2 Phase 2
* **Enhanced Features:**
  - Full property management
  - Additional calculators (Buyer, Investment)
  - Advanced mapping features
  - Realtor dashboard with saved properties
  - Email reports to clients
  - Recent properties bar
  - Enhanced Iris capabilities

### 9.3 Phase 3
* **Advanced Features:**
  - AI property recommendations
  - Advanced market analysis
  - Comparative market analysis
  - Portfolio tracking for investors
  - Team collaboration features

## 10. UI/UX Guidelines

### 10.1 Design Principles
* **Clean & Professional:** Polished interface that reflects title company brand
* **Intuitive Navigation:** Clear pathways for all user journeys
* **Progressive Disclosure:** Start simple, reveal complexity as needed
* **Conversational First:** Prioritize Iris interactions for key workflows

### 10.2 Key Screens
* **Landing Page:** Map-centric with prominent Iris chat
* **Property Detail View:** Left panel with comprehensive information
* **Calculator View:** Clean, form-based calculators with clear results
* **Results/Report View:** Professional, shareable reports with branding

### 10.3 Mobile Considerations
* **Responsive Design:** Adapt layout for smaller screens
* **Touch-Friendly:** Large tap targets for map interactions
* **Simplified Views:** Focus on one panel at a time on mobile

## 11. Analytics & Reporting

### 11.1 User Analytics
* **Registration Tracking:** Monitor conversion from visitor to registered user
* **Feature Usage:** Track which calculators and features are most used
* **Engagement Metrics:** Time on site, return visits, etc.

### 11.2 Business Metrics
* **Lead Generation:** Number of emails captured
* **Conversion:** Visitors to registered users to title clients
* **Retention:** Repeat usage by realtors

### 11.3 Implementation
* **Supabase Analytics:** Track key events in database
* **Frontend Tracking:** Implement client-side analytics for detailed usage patterns

## 12. Implementation Plan

### 12.1 Initial Setup
1. Create Supabase project
2. Set up authentication flows
3. Create database schema with MCP assistance
4. Configure row-level security
5. Set up Next.js project with authentication

### 12.2 Core Platform Development
1. Implement map interface with property search
2. Develop property panel with data display
3. Create calculator components
4. Build report generation and sharing

### 12.3 Iris AI Development
1. Design conversation flows
2. Implement core NLP capabilities
3. Integrate with API services
4. Connect to calculator functions
5. Test and refine responses

### 12.4 Testing & Refinement
1. Internal testing with sample properties
2. Realtor beta testing
3. Performance optimization
4. Refine UI/UX based on feedback

## 13. Future Considerations

### 13.1 AI Enhancements
* Predictive property recommendations
* Market trend analysis
* Investment opportunity identification
* Document analysis for contracts

### 13.2 Integration Opportunities
* CRM integration for realtors
* Mortgage provider partnerships
* Property inspection services
* Moving companies and other related services

### 13.3 Monetization Options
* Premium features for power users
* White-label version for brokerages
* Referral fees from service providers
* Subscription model for advanced analytics

## 14. Technical Appendix

### 14.1 Supabase Schema Definition
```sql
-- Users table extensions (extends Supabase auth)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip TEXT,
  price NUMERIC,
  beds INTEGER,
  baths NUMERIC,
  sqft INTEGER,
  property_type TEXT,
  year_built INTEGER,
  lot_size NUMERIC,
  zpid TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analyses table
CREATE TABLE analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES properties,
  analysis_type TEXT NOT NULL,
  input_data JSONB,
  result_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  analysis_id UUID REFERENCES analyses,
  report_url TEXT,
  shared_with TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- User can only see and edit their own profile
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Users can only see and edit their own properties
CREATE POLICY "Users can view own properties" 
  ON properties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own properties" 
  ON properties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own properties" 
  ON properties FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own properties" 
  ON properties FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for analyses and reports tables
```

### 14.2 Next.js Setup with Supabase
```javascript
// Example supabase.js file
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Example auth hook
export function useAuth() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (mounted) {
        if (session) {
          setSession(session)
          setUser(session.user)
        }
        setLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return {
    session,
    user,
    loading,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => supabase.auth.signOut(),
  }
}
```

### 14.3 API Integration Utility
```javascript
// Example API utility for Zillow56
const RAPID_API_KEY = process.env.RAPID_API_KEY;

export async function searchPropertyByAddress(address) {
  try {
    // First get location suggestions
    const locationResponse = await fetch('https://zillow56.p.rapidapi.com/locationSuggestions', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'zillow56.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY
      },
      params: { query: address }
    });
    
    const locations = await locationResponse.json();
    
    if (!locations.length) {
      return { error: 'Address not found' };
    }
    
    // Get property details using zpid
    const propertyResponse = await fetch('https://zillow56.p.rapidapi.com/property', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'zillow56.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY
      },
      params: { zpid: locations[0].zpid }
    });
    
    return await propertyResponse.json();
  } catch (error) {
    console.error('Error fetching property:', error);
    return { error: 'Failed to fetch property data' };
  }
}

// Additional API functions for other endpoints...
```