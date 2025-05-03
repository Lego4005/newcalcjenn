API Overview
Search homes for sale, new construction homes, apartments, and houses for rent. See property values and mortgages. Find agents information and much more


Query real time data of US real estate properties and agents

Realtor API
This API provides access to property listings, agent details, property details, and much more from Realtor.com. It allows users to search for properties for sale, rent, or sold, as well as agents, their reviews, and recommendations. The endpoints are designed to be efficient and flexible, providing comprehensive data for real estate needs.

Endpoints
1. Search for Sale Listings
URL: /search/forsale
Method: GET
Parameters:
location: Location for searching properties.
page: Page number for pagination (default: 1).
sort: Sorting option for the results.
limit: Limit the number of listings (default: 50, max: 200).
search_radius: Radius in kilometers (default: 0, max: 50).
Example:

GET /search/forsale?location=New+York&page=1&limit=50
2. Search for Sale Listings by Coordinates
URL: /search/forsale/coordinates
Method: GET
Parameters:
polygon: Polygon coordinates for the area.
latitude and longitude: Coordinates for location-based search.
radius: Radius in kilometers.
page, sort, limit: Same as above.
3. Search for Rent Listings
URL: /search/forrent
Method: GET
Parameters: Similar to the "Search for Sale Listings" endpoint.
4. Search for Sold Listings
URL: /search/forsold
Method: GET
Parameters: Similar to the "Search for Sale Listings" endpoint.
5. Get Suggestions
URL: /suggestion
Method: GET
Parameters:
location: Location for suggestions.
6. Agent Endpoints
Search Agents

URL: /agent/search
Method: GET
Parameters:
location, name: Filters for searching agents.
limit, page: Pagination options.
Get Agent Profile

URL: /agent/profile
Method: GET
Parameters:
advertiser_id: ID of the agent.
Get Agent Reviews

URL: /agent/reviews
Method: GET
Parameters:
advertiser_id: ID of the agent.
Get Agent Listings

URL: /agent/listings
Method: GET
Parameters:
advertiser_id: ID of the agent.
page: Page number for pagination.
type: Type of listing (default: all).
7. Property Endpoints
Get Property Details

URL: /property/details
Method: GET
Parameters:
property_id: ID of the property.
url: URL of the property (alternative to property_id).
Get Property Photos

URL: /property/photos
Method: GET
Parameters: Similar to the "Get Property Details" endpoint.
Get Property Environment Risk

URL: /property/environment_risk
Method: GET
Parameters: Similar to the "Get Property Details" endpoint.
Get Similar Homes

URL: /property/similar_homes
Method: GET
Parameters:
property_id, url, status: For retrieving similar homes.
8. Housing Market Details
URL: /housing_market_details
Method: GET
Parameters:
slug_id, location: For retrieving housing market details.
Error Handling
If an error occurs, the API returns a JSON object with an error field describing the issue.

Example response for an invalid request:

{
    "error": "Invalid Date"
}
Example Usage
Example: Get properties for sale in San Francisco:

GET /search/forsale?location=San+Francisco&limit=50
Example: Get agent reviews:

GET /agent/reviews?advertiser_id=12345






const http = require('https');

const options = {
	method: 'GET',
	hostname: 'realtor16.p.rapidapi.com',
	port: null,
	path: '/search/forsale?location=houston%20%2Ctx&search_radius=0',
	headers: {
		'x-rapidapi-key': '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506',
		'x-rapidapi-host': 'realtor16.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();





{
  "costar_counts": null,
  "count": 50,
  "properties": [
    {
      "advertisers": [
        {
          "office": {
            "name": "Professional Realty Services",
            "phones": [
              {
                "ext": null,
                "number": "2815286466",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(713) 722-8066",
              "primary": true,
              "trackable": null,
              "type": "Home"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Professional Realty Services",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 2,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 980,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "multi_family",
        "year_built": 2003
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 2",
            "Primary Bedroom Dimensions: 13 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "LivingRoom",
            "Bedroom: 11 x 10",
            "Bedroom Level: First",
            "LivingRoom: 14 x 12",
            "LivingRoom Level: First",
            "Kitchen: 1Ox07",
            "Kitchen Level: First",
            "Bedroom: 11 x 10",
            "Bedroom Level: First",
            "PrimaryBedroom: 13 x 12",
            "PrimaryBedroom Level: First",
            "Living Room Dimensions: 14 x 12",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "ElectricOven",
            "ElectricRange",
            "Disposal",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Carport Spaces: 2",
            "Parking Features: DetachedCarport"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 1.0",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 43560"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:CASE BY CASE"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2024-03-01",
            "Directions: FROM HWY 59 S GO SOUTH ON 36 FOR 6 MILES TO FOSTER THEN LEFT ON MEADOWGREEN LN TO DUPLEX ON LEFT",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Meadowgreen Estates",
            "Parcel Number: 4967-00-000-0300-906",
            "Postal City: Needville",
            "Postal Code Plus 4: 8781",
            "Subdivision: Meadowgreen Estates",
            "Property Subtype: Duplex",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 980",
            "Year Built: 2003",
            "Building Area Total: 980",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 22",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Structure Type: Duplex",
            "Year Built Source: PublicRecords",
            "Architectural Style: Duplex"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: SepticTank"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-02-11T20:26:19.000000Z",
      "list_price": 1225,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2978207293",
      "location": {
        "address": {
          "city": "Needville",
          "coordinate": {
            "lat": 29.443273,
            "lon": -95.848111
          },
          "country": "USA",
          "line": "7207A Meadowgreen Ln Unit A",
          "postal_code": "77461",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2978207293",
            "status": "for_rent"
          },
          {
            "listing_id": "2976653130",
            "status": "off_market"
          },
          {
            "listing_id": "2964003935",
            "status": "off_market"
          },
          {
            "listing_id": "2941316428",
            "status": "off_market"
          },
          {
            "listing_id": "633054379",
            "status": "off_market"
          }
        ]
      },
      "permalink": "7207-A-Meadowgreen-Ln-A_Needville_TX_77461_M89313-84603",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/b8205903787132f8b0c7507b963efa51l-m154308138s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/b8205903787132f8b0c7507b963efa51l-m3982124767s.jpg"
        }
      ],
      "price_reduced_amount": 25,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/b8205903787132f8b0c7507b963efa51l-m154308138s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "8931384603",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Sos Realty",
            "phones": [
              {
                "ext": null,
                "number": "8322332311",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8322332311",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            },
            {
              "ext": null,
              "number": "8326652030",
              "primary": false,
              "trackable": null,
              "type": "Fax"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Sos Realty",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 2,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 805,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1981
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 2"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 2",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "CeilingFans",
            "ProgrammableThermostat"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "WasherDryerStacked",
            "Refrigerator",
            "Washer",
            "Laundry Features: Stacked"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: MEYER ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-05-01",
            "Directions: From I-69: south on FM 2218, property on right a few miles down",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: G M STONE",
            "Parcel Number: 0312-00-000-0142-901",
            "Postal City: Richmond",
            "Subdivision: G M STONE",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 805",
            "Year Built: 1981",
            "Building Area Total: 805",
            "Living Area Source: Owner",
            "Property Age: 44",
            "Year Built Source: Owner",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "SewerAvailable",
            "TrashCollection",
            "WaterAvailable",
            "YardMaintenance",
            "Water Source: Well"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Lighting, Thermostat"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-28T05:31:41.000000Z",
      "list_price": 1435,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979882898",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.508362,
            "lon": -95.79319
          },
          "country": "USA",
          "line": "4828 FM 2218 Rd",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979882898",
            "status": "for_rent"
          },
          {
            "listing_id": "2965651527",
            "status": "off_market"
          },
          {
            "listing_id": "2937007376",
            "status": "off_market"
          }
        ]
      },
      "permalink": "4828-FM-2218-Rd_Richmond_TX_77469_M97480-66722",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/a3aa40e8d5eafa562565c67ce19139cfl-m1949772582s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/a3aa40e8d5eafa562565c67ce19139cfl-m341034021s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/a3aa40e8d5eafa562565c67ce19139cfl-m1949772582s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9748066722",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Kingfay Inc",
            "phones": [
              {
                "ext": null,
                "number": "8325396468",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2816905900",
              "primary": true,
              "trackable": null,
              "type": "Office"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Kingfay Inc",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2031,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2023
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 16 x 13",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 5",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "FamilyRoom: 22 x 19",
            "FamilyRoom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "PrimaryBedroom: 16 x 13",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 22 x 19",
            "Family Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Disposal",
            "Microwave"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: THOMAS ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-05-01",
            "Directions: 59 South, Exit on Reading, Left onto Reading Rd, Right onto Minonite Rd, Left onto Bryan Rd, Right onto Skybridge Ln, Right onto Dawn View Ln.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sunset Crossing",
            "Parcel Number: 4136-08-002-0020-901",
            "Postal City: Rosenberg",
            "Subdivision: Sunset Crossing",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2031",
            "Year Built: 2023",
            "Building Area Total: 2031",
            "Living Area Source: Builder",
            "Property Age: 2",
            "Year Built Source: Builder",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-02T04:35:32.000000Z",
      "list_price": 2330,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981323636",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.518927,
            "lon": -95.738724
          },
          "country": "USA",
          "line": "7126 Dawn View Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981323636",
            "status": "for_rent"
          },
          {
            "listing_id": "2954954246",
            "status": "off_market"
          }
        ]
      },
      "permalink": "7126-Dawn-View-Ln_Rosenberg_TX_77469_M95481-47731",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/c1bd7a50ea041484853fd079dd175274l-m2374535592s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/c1bd7a50ea041484853fd079dd175274l-m1770471064s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/c1bd7a50ea041484853fd079dd175274l-m2374535592s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9548147731",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "RE MAX 1st Team",
            "phones": [
              {
                "ext": null,
                "number": "9792975747",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "9794826025",
              "primary": true,
              "trackable": null,
              "type": "Office"
            },
            {
              "ext": null,
              "number": "9794826025",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "RE MAX 1st Team",
          "photo": "https://ap.rdcpix.com/a7c77986d5aeec44a32cf9ed79d082c9o-b2274465705s.jpg",
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 2,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1200,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2016
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 2"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 2",
            "Bedroom: 15 x 15 x First",
            "Bedroom: 15 x 15 x First",
            "Bedroom: 15 x 15 x First",
            "Bedroom: 15 x 15 x First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "HighCeilings",
            "KitchenIsland",
            "KitchenFamilyRoomCombo"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "FreeStandingRange",
            "Disposal",
            "Microwave",
            "Dryer",
            "Refrigerator",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Carport Spaces: 2",
            "Parking Features: AttachedCarport, AdditionalParking, Driveway"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: CornerLot, Subdivision",
            "Lot Size Acres: 0.1148",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 5001"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Road Surface Type: Asphalt"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$500 non refundable"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-05-09",
            "Directions: Sweeny - FM 523 into Sweeny turn left at Simple Simon Pizza - house is on corner of Pecan",
            "Restrictions: NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: Sweeny",
            "Parcel Number: 7885-0175-000",
            "Postal City: Sweeny",
            "Postal Code Plus 4: 2438",
            "Subdivision: Sweeny",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1200",
            "Year Built: 2016",
            "Building Area Total: 1200",
            "Living Area Source: Appraiser",
            "Property Age: 9",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Ranch"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Security Features: SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-02T04:35:32.000000Z",
      "list_price": 1850,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981323749",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.040396,
            "lon": -95.701631
          },
          "country": "USA",
          "line": "412 Pecan St",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981323749",
            "status": "for_rent"
          },
          {
            "listing_id": "2939219508",
            "status": "off_market"
          },
          {
            "listing_id": "2954014092",
            "status": "off_market"
          }
        ]
      },
      "permalink": "412-Pecan-St_Sweeny_TX_77480_M75335-91501",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/a9509aeaa5ec9385e3f346388e28998dl-m4023028005s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/a9509aeaa5ec9385e3f346388e28998dl-m3548486954s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/a9509aeaa5ec9385e3f346388e28998dl-m4023028005s.jpg"
      },
      "products": {
        "brand_name": "advantage_brand",
        "products": [
          "core.agent",
          "core.broker",
          "listing_owner_brand.broker"
        ]
      },
      "property_id": "7533591501",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "LGI Homes",
            "phones": [
              {
                "ext": null,
                "number": "2813628998",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2812102533",
              "primary": true,
              "trackable": null,
              "type": "Office"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "LGI Homes",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1420,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2025
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 11 x 17",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "EntryFoyer, FamilyRoom, Kitchen, UtilityRoom",
            "UtilityRoom: 6 x 7 x First",
            "Bathroom: 7 x 10 x First",
            "Bedroom: 10 x 12 x First",
            "Bedroom: 10 x 12 x First",
            "UtilityRoom: 6 x 7 x First",
            "Bathroom: 7 x 10 x First",
            "Bedroom: 10 x 12 x First",
            "Bedroom: 10 x 12 x First",
            "PrimaryBathroom: 11 x 8",
            "PrimaryBathroom Level: First",
            "PrimaryBedroom: 11 x 17",
            "PrimaryBedroom Level: First",
            "FamilyRoom: 12 x 18",
            "FamilyRoom Level: First",
            "DiningRoom: 10 x 10",
            "DiningRoom Level: First",
            "Kitchen: 10 x 13",
            "Kitchen Level: First",
            "Family Room Dimensions: 12 x 18",
            "Family Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2",
            "Primary Bathroom Dimensions: 11 x 8",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "EntranceFoyer",
            "GraniteCounters",
            "KitchenIsland",
            "KitchenFamilyRoomCombo",
            "MarbleCounters",
            "Pantry",
            "SoakingTub",
            "SeparateShower",
            "TubShower",
            "Vanity",
            "CeilingFans",
            "KitchenDiningCombo",
            "ProgrammableThermostat",
            "Flooring: Plank, Vinyl",
            "Window Features: LowEmissivityWindows"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "GasCooktop",
            "Disposal",
            "GasOven",
            "Microwave",
            "EnergyStarQualifiedAppliances",
            "Refrigerator",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: HeatPump",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 10 x 10",
            "Dining Room Level: First",
            "Kitchen Dimensions: 10 x 13",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "Patio",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Emberly Homeowners Association",
            "Pets Allowed: PetDeposit, Yes",
            "Pet Description: PetDepositDescription:$250 Pet Deposit, PetDepositDescription: Pet Rent $25 per pet/per mont"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: BEASLEY ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-07-19",
            "Directions: 59 South, to Exit Loop 541. Left at the light, left on Sky Creek Lane. 3rd Model on the left",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Emberly",
            "Parcel Number: 2869-01-002-0010-901",
            "Postal City: Beasley",
            "Public Survey Section: 1",
            "Subdivision: Emberly",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1420",
            "Year Built: 2025",
            "Building Area Total: 1420",
            "Levels: One",
            "Living Area Source: Builder",
            "New Construction: Yes",
            "Property Condition: UnderConstruction",
            "Levels or Stories: 1",
            "Year Built Source: Builder",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Appliances, Hvac, Insulation, Thermostat, Windows",
            "Security Features: FireSprinklerSystem, SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-02T15:02:17.000000Z",
      "list_price": 2580,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981341980",
      "location": {
        "address": {
          "city": "Beasley",
          "coordinate": {
            "lat": 29.464231,
            "lon": -95.950441
          },
          "country": "USA",
          "line": "1023 Rosewood Trl",
          "postal_code": "77417",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981340585",
            "status": "for_sale"
          },
          {
            "listing_id": "2981341980",
            "status": "for_rent"
          },
          {
            "listing_id": "2979814953",
            "status": "off_market"
          },
          {
            "listing_id": "2979814473",
            "status": "off_market"
          },
          {
            "listing_id": "2978694482",
            "status": "off_market"
          },
          {
            "listing_id": "2978694450",
            "status": "off_market"
          }
        ]
      },
      "permalink": "1023-Rosewood-Trl_Beasley_TX_77417_M96089-25420",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/0f6151c6a100b1147c022aa2e40e07cfl-m3416095127s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/0f6151c6a100b1147c022aa2e40e07cfl-m2214485194s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/0f6151c6a100b1147c022aa2e40e07cfl-m3416095127s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9608925420",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "LGI Homes",
            "phones": [
              {
                "ext": null,
                "number": "2813628998",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2812102533",
              "primary": true,
              "trackable": null,
              "type": "Office"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "LGI Homes",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1400,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2025
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 17 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "EntryFoyer, Kitchen, LivingRoom, UtilityRoom",
            "UtilityRoom: 6 x 6 x First",
            "Bathroom: 4 x 9 x First",
            "Bedroom: 11 x 11 x First",
            "Bedroom: 10 x 12 x First",
            "UtilityRoom: 6 x 6 x First",
            "Bathroom: 4 x 9 x First",
            "Bedroom: 11 x 11 x First",
            "Bedroom: 10 x 12 x First",
            "PrimaryBathroom: 9 x 9",
            "PrimaryBathroom Level: First",
            "PrimaryBedroom: 17 x 12",
            "PrimaryBedroom Level: First",
            "LivingRoom: 17 x 17",
            "LivingRoom Level: First",
            "DiningRoom: 7 x 10",
            "DiningRoom Level: First",
            "Kitchen: 12 x 15",
            "Kitchen Level: First",
            "Living Room Dimensions: 17 x 17",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2",
            "Primary Bathroom Dimensions: 9 x 9",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "GraniteCounters",
            "KitchenIsland",
            "KitchenFamilyRoomCombo",
            "Pantry",
            "SoakingTub",
            "SeparateShower",
            "TubShower",
            "Vanity",
            "WindowTreatments",
            "KitchenDiningCombo",
            "LivingDiningRoom",
            "ProgrammableThermostat",
            "Flooring: Plank, Vinyl",
            "Window Features: LowEmissivityWindows, WindowCoverings"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "GasCooktop",
            "Disposal",
            "GasOven",
            "Microwave",
            "TrashCompactor",
            "EnergyStarQualifiedAppliances",
            "Refrigerator",
            "TanklessWaterHeater",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: HeatPump",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 7 x 10",
            "Dining Room Level: First",
            "Kitchen Dimensions: 12 x 15",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Fence",
            "SprinklerIrrigation",
            "Fencing: BackYard"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Emberly Homeowners Association",
            "Pets Allowed: PetDeposit, Yes",
            "Pet Description: PetDepositDescription:$250 Pet Deposit, PetDepositDescription: Pet Rent $25 per pet/per month"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: BEASLEY ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-07-19",
            "Directions: 59 South, exit Loop 541, left at the light, left on Sky Creek Lane. 3rd Model on the left",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Emberly",
            "Parcel Number: 2869-04-001-0010-901",
            "Postal City: Beasley",
            "Public Survey Section: 4",
            "Subdivision: Emberly",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1400",
            "Year Built: 2025",
            "Building Area Total: 1400",
            "Levels: One",
            "Living Area Source: Builder",
            "New Construction: Yes",
            "Property Condition: UnderConstruction",
            "Levels or Stories: 1",
            "Year Built Source: Builder",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Appliances, Hvac, Insulation, Thermostat, WaterHeater, Windows",
            "Security Features: FireSprinklerSystem, SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-02T14:55:11.000000Z",
      "list_price": 2515,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981341673",
      "location": {
        "address": {
          "city": "Beasley",
          "coordinate": {
            "lat": 29.46235,
            "lon": -95.948001
          },
          "country": "USA",
          "line": "10811 Hickory Ln",
          "postal_code": "77417",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981341236",
            "status": "for_sale"
          },
          {
            "listing_id": "2981341673",
            "status": "for_rent"
          },
          {
            "listing_id": "2979813571",
            "status": "off_market"
          },
          {
            "listing_id": "2979813196",
            "status": "off_market"
          },
          {
            "listing_id": "2978694495",
            "status": "off_market"
          },
          {
            "listing_id": "2978593271",
            "status": "off_market"
          }
        ]
      },
      "permalink": "10811-Hickory-Ln_Beasley_TX_77417_M99506-79530",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/d907197f37aea9ab8a50d2ec01ef5081l-m937193960s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/d907197f37aea9ab8a50d2ec01ef5081l-m1198269772s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/d907197f37aea9ab8a50d2ec01ef5081l-m937193960s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9950679530",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "LGI Homes",
            "phones": [
              {
                "ext": null,
                "number": "2813628998",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2812102533",
              "primary": true,
              "trackable": null,
              "type": "Office"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "LGI Homes",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1400,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2025
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 17 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "FamilyRoom, LivingRoom, UtilityRoom",
            "UtilityRoom: 6 x 6 x First",
            "Bathroom: 4 x 9 x First",
            "Bedroom: 11 x 11 x First",
            "Bedroom: 10 x 12 x First",
            "UtilityRoom: 6 x 6 x First",
            "Bathroom: 4 x 9 x First",
            "Bedroom: 11 x 11 x First",
            "Bedroom: 10 x 12 x First",
            "PrimaryBathroom: 9 x 9",
            "PrimaryBathroom Level: First",
            "PrimaryBedroom: 17 x 12",
            "PrimaryBedroom Level: First",
            "LivingRoom: 17 x 17",
            "LivingRoom Level: First",
            "DiningRoom: 7 x 10",
            "DiningRoom Level: First",
            "Kitchen: 12 x 15",
            "Kitchen Level: First",
            "Living Room Dimensions: 17 x 17",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2",
            "Primary Bathroom Dimensions: 9 x 9",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "GraniteCounters",
            "KitchenIsland",
            "Pantry",
            "SoakingTub",
            "SeparateShower",
            "TubShower",
            "Vanity",
            "LivingDiningRoom",
            "ProgrammableThermostat",
            "Window Features: LowEmissivityWindows"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Disposal",
            "Microwave",
            "EnergyStarQualifiedAppliances"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: HeatPump",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 7 x 10",
            "Dining Room Level: First",
            "Kitchen Dimensions: 12 x 15",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Emberly Homeowners Association",
            "Pets Allowed: PetDeposit, Yes",
            "Pet Description: PetDepositDescription:$250 Pet Deposit, PetDepositDescription: Pet Rent $25 per pet/per month"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: BEASLEY ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-07-19",
            "Directions: 59 South, exit loop 541, left at the light, left on to Sky Creek Lane, 3rd model on the left",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Emberly",
            "Parcel Number: 2869-01-002-0040-901",
            "Postal City: Beasley",
            "Public Survey Section: 1",
            "Subdivision: Emberly",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1400",
            "Year Built: 2025",
            "Building Area Total: 1400",
            "Levels: One",
            "Living Area Source: Builder",
            "New Construction: Yes",
            "Property Condition: UnderConstruction",
            "Levels or Stories: 1",
            "Year Built Source: Builder",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Appliances, Hvac, Insulation, Thermostat, Windows"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-02T14:52:39.000000Z",
      "list_price": 2485,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981341544",
      "location": {
        "address": {
          "city": "Beasley",
          "coordinate": {
            "lat": 29.464105,
            "lon": -95.950026
          },
          "country": "USA",
          "line": "1035 Rosewood Trl",
          "postal_code": "77417",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981341435",
            "status": "for_sale"
          },
          {
            "listing_id": "2981341544",
            "status": "for_rent"
          },
          {
            "listing_id": "2979813193",
            "status": "off_market"
          },
          {
            "listing_id": "2979811943",
            "status": "off_market"
          },
          {
            "listing_id": "2978694371",
            "status": "off_market"
          },
          {
            "listing_id": "2978593185",
            "status": "off_market"
          }
        ]
      },
      "permalink": "1035-Rosewood-Trl_Beasley_TX_77417_M99234-37241",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/a10a213527ea1749b4a8a488bc1c045dl-m3900969246s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/a10a213527ea1749b4a8a488bc1c045dl-m1198269772s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/a10a213527ea1749b4a8a488bc1c045dl-m3900969246s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9923437241",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "SG Management, LLC",
            "phones": [
              {
                "ext": null,
                "number": "7137726262",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "7133694362",
              "primary": true,
              "trackable": null,
              "type": "Other"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "SG Management, LLC",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 5,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2021
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 5",
            "Primary Bedroom Dimensions: 16 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 12",
            "UtilityRoom: 5 x 7 x Second",
            "Bedroom: 14 x 12",
            "Bedroom Level: Second",
            "Bedroom: 14 x 10",
            "Bedroom Level: Second",
            "Bathroom: 15 x 6",
            "Bathroom Level: Second",
            "Bedroom: 15 x 12",
            "Bedroom Level: Second",
            "Bedroom: 15 x 10",
            "Bedroom Level: Second",
            "UtilityRoom: 5 x 7 x Second",
            "GameRoom: 19 x 12",
            "GameRoom Level: Second",
            "Bedroom: 14 x 12",
            "Bedroom Level: Second",
            "Bedroom: 14 x 10",
            "Bedroom Level: Second",
            "PrimaryBedroom: 16 x 12",
            "PrimaryBedroom Level: First",
            "Kitchen: 10 x 15",
            "Kitchen Level: First",
            "Bathroom: 15 x 6",
            "Bathroom Level: Second",
            "Bedroom: 15 x 12",
            "Bedroom Level: Second",
            "Bedroom: 15 x 10",
            "Bedroom Level: Second",
            "PrimaryBathroom: 7 x 13",
            "PrimaryBathroom Level: First",
            "DiningRoom: 10 x 12",
            "DiningRoom Level: First",
            "LivingRoom: 17 x 13",
            "LivingRoom Level: First",
            "Game/Recreation Room Dimensions: 19 x 12",
            "Living Room Dimensions: 17 x 13",
            "Game/Recreation Room Level: Second",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 2",
            "1/2 Bathrooms: 1",
            "Primary Bathroom Dimensions: 7 x 13",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 10 x 12",
            "Dining Room Level: First",
            "Kitchen Dimensions: 10 x 15",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Shannon Property Management",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-05-02",
            "Directions: Directions from Houston: Head southwest on I-69, Exit for FM 762 and Reading Road, Turn left onto Reading Road, Turn right on Minonite Rd.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Vacek Country Meadows",
            "Postal City: Richmond",
            "Subdivision: Vacek Country Meadows",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 2021",
            "New Construction: Yes",
            "Property Age: 4",
            "Property Condition: NewConstruction",
            "Year Built Source: Builder",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-02T14:41:28.000000Z",
      "list_price": 2250,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981340976",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.438848,
            "lon": -95.750785
          },
          "country": "USA",
          "line": "8003 Vacek Meadows Loop",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981340976",
            "status": "for_rent"
          },
          {
            "listing_id": "2940658318",
            "status": "off_market"
          },
          {
            "listing_id": "2936496964",
            "status": "sold"
          }
        ]
      },
      "permalink": "8003-Vacek-Meadows-Loop_Richmond_TX_77469_M95509-25818",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/ffcc875d2078f5931ee43cbd911dae1al-m3762094440s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/ffcc875d2078f5931ee43cbd911dae1al-m56440701s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/ffcc875d2078f5931ee43cbd911dae1al-m3762094440s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9550925818",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": [
        {
          "href": "https://shannonpropertymanagement.com/for-rent"
        }
      ]
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Exp Realty, Llc",
            "phones": null
          },
          "phones": [
            {
              "ext": null,
              "number": "8323406157",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        },
        {
          "office": {
            "name": "Exp Realty LLC",
            "phones": [
              {
                "ext": null,
                "number": "8885197431",
                "primary": false,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2819109082",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "co_seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Exp Realty, Llc",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "multi_family",
        "year_built": 1988
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 11 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "Bedroom: 11 x 11",
            "Bedroom Level: First",
            "Bedroom: 11 x 10",
            "Bedroom Level: First",
            "Kitchen: 14 x 12",
            "Kitchen Level: First",
            "Bedroom: 11 x 11",
            "Bedroom Level: First",
            "Bedroom: 11 x 10",
            "Bedroom Level: First",
            "PrimaryBedroom: 11 x 12",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Kitchen Dimensions: 14 x 12",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared, Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-04-24",
            "Directions: From Hwy 35, left on FM 1459, right on CR 425.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: D MCCORMICK",
            "Postal City: Sweeny",
            "Subdivision: D MCCORMICK",
            "Property Subtype: Duplex",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 1988",
            "Property Age: 37",
            "Structure Type: Duplex",
            "Year Built Source: PublicRecords",
            "Architectural Style: Duplex"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: AerobicSeptic, SepticTank",
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-24T16:24:41.000000Z",
      "list_price": 1050,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980941225",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.080509,
            "lon": -95.692757
          },
          "country": "USA",
          "line": "141 County Road 725 Unit B",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980941225",
            "status": "for_rent"
          },
          {
            "listing_id": "2962551762",
            "status": "off_market"
          }
        ]
      },
      "permalink": "141-County-Road-725-B_Sweeny_TX_77480_M94474-84985",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/344ec347b01a73d35fc46df8c3579e47l-m3572852149s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/344ec347b01a73d35fc46df8c3579e47l-m3940140733s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/344ec347b01a73d35fc46df8c3579e47l-m3572852149s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9447484985",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "RE MAX Opportunities",
            "phones": [
              {
                "ext": null,
                "number": "9797935454",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "7133763838",
              "primary": true,
              "trackable": null,
              "type": "Office"
            },
            {
              "ext": null,
              "number": "7133763838",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "RE MAX Opportunities",
          "photo": "https://ap.rdcpix.com/9712048eb423de0b211cb58e2c1ee7f0o-b2274465705s.jpg",
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 2,
        "beds_max": null,
        "beds_min": null,
        "garage": 1,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 844,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "multi_family",
        "year_built": 2020
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 2"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "Bedroom: to be verified x Second",
            "Bedroom: to be verified x Second",
            "Bedroom: to be verified x Second",
            "Bedroom: to be verified x Second",
            "Kitchen: to be verified",
            "Kitchen Level: Second",
            "LivingRoom: to be verified",
            "LivingRoom Level: Second",
            "Living Room Level: Second"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Refrigerator",
            "Washer"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Kitchen Level: Second"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 1",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared",
            "Lot Size Acres: 1.0",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 43560"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:500 non refundable"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2024-08-28",
            "Directions: From Hwy 36 south, turn left onto FM 1462. Continue along FM 1462 to Julia Avenue. Turn left onto Julia Avenue. House will be on your left.",
            "Restrictions: NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Day Land & Cattle",
            "Postal City: Needville",
            "Postal Code Plus 4: 9446",
            "Subdivision: Day Land & Cattle",
            "Property Subtype: Duplex",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 844",
            "Year Built: 2020",
            "Building Area Total: 844",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 5",
            "Levels or Stories: 2",
            "Building Total Stories: 2",
            "Structure Type: Duplex",
            "Year Built Source: PublicRecords",
            "Architectural Style: Traditional, Duplex"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: AerobicSeptic",
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2024-08-28T15:52:18.000000Z",
      "list_price": 1400,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2971285845",
      "location": {
        "address": {
          "city": "Needville",
          "coordinate": {
            "lat": 29.357355,
            "lon": -95.675125
          },
          "country": "USA",
          "line": "17520 Julia Ave Unit B",
          "postal_code": "77461",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2971285845",
            "status": "for_rent"
          },
          {
            "listing_id": "2965977449",
            "status": "off_market"
          },
          {
            "listing_id": "2971259134",
            "status": "off_market"
          }
        ]
      },
      "permalink": "17520-Julia-Ave-B_Needville_TX_77461_M97520-47951",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/429fb539089def28d4b6bda78350ae86l-b4193457304s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/429fb539089def28d4b6bda78350ae86l-b1024507385s.jpg"
        }
      ],
      "price_reduced_amount": 100,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/429fb539089def28d4b6bda78350ae86l-b4193457304s.jpg"
      },
      "products": {
        "brand_name": "advantage_brand",
        "products": [
          "core.agent",
          "core.broker",
          "listing_owner_brand.broker"
        ]
      },
      "property_id": "9752047951",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "The Christopher Dynasty Real",
            "phones": [
              {
                "ext": null,
                "number": "8325676937",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8325676937",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "The Christopher Dynasty Real",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1529,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1960
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 14 x 10",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 7",
            "UtilityRoom: 9 x 10 x First",
            "Bedroom: 10 x 12",
            "Bedroom Level: First",
            "Bedroom: 10 x 12",
            "Bedroom Level: First",
            "Bedroom: 10 x 12",
            "Bedroom Level: First",
            "UtilityRoom: 9 x 10 x First",
            "PrimaryBedroom: 14 x 10",
            "PrimaryBedroom Level: First",
            "Bedroom: 10 x 12",
            "Bedroom Level: First",
            "Bedroom: 10 x 12",
            "Bedroom Level: First",
            "Bedroom: 10 x 12",
            "Bedroom Level: First",
            "Kitchen: 12 x 12",
            "Kitchen Level: First",
            "LivingRoom: 16 x 18",
            "LivingRoom Level: First",
            "Living Room Dimensions: 16 x 18",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Disposal",
            "Microwave"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Kitchen Dimensions: 12 x 12",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.399",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 17380"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-04-30",
            "Directions: From HWY 59, take HWY 36 into Needville.",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: C Radke",
            "Parcel Number: 0482-00-000-0140-906",
            "Postal City: Needville",
            "Postal Code Plus 4: 9372",
            "Subdivision: C Radke",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1529",
            "Year Built: 1960",
            "Building Area Total: 1529",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 65",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-30T13:13:27.000000Z",
      "list_price": 1725,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981152218",
      "location": {
        "address": {
          "city": "Needville",
          "coordinate": {
            "lat": 29.370162,
            "lon": -95.803714
          },
          "country": "USA",
          "line": "16316 Highway 36",
          "postal_code": "77461",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981152218",
            "status": "for_rent"
          }
        ]
      },
      "permalink": "16316-Highway-36_Needville_TX_77461_M75582-52965",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/e21094bd541864692ff3d7e1edbd9044l-m2539682234s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/e21094bd541864692ff3d7e1edbd9044l-m237928060s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/e21094bd541864692ff3d7e1edbd9044l-m2539682234s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7558252965",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": [
              {
                "ext": null,
                "number": "4094201022",
                "primary": false,
                "trackable": null,
                "type": "primary"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1633,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2.0",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "Stove"
          ]
        },
        {
          "category": "Multi-Unit Info",
          "parent_category": "Community",
          "text": [
            "Number of Units: 1"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Cats Allowed: Yes",
            "Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Security Deposit: 1495.0"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "List Price Low: 1495",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "SqFt Maximum: 1633",
            "SqFt Minimum: 1633"
          ]
        }
      ],
      "flags": {
        "is_new_listing": null,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": false,
        "is_schedule_a_tour": false,
        "lead_type": "rental_go_direct"
      },
      "list_date": null,
      "list_price": 1495,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980616263",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.03656,
            "lon": -95.699513
          },
          "country": "USA",
          "line": "303 Harlem St",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980616263",
            "status": "for_rent"
          },
          {
            "listing_id": "2941608054",
            "status": "off_market"
          },
          {
            "listing_id": "2945338290",
            "status": "off_market"
          },
          {
            "listing_id": "2927653176",
            "status": "off_market"
          },
          {
            "listing_id": "2925562390",
            "status": "off_market"
          },
          {
            "listing_id": "2923766454",
            "status": "sold"
          }
        ]
      },
      "permalink": "303-Harlem-St_Sweeny_TX_77480_M71059-96299",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/5d28d810bc4a937258acd439059bbc3al-m3289706470s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/5d28d810bc4a937258acd439059bbc3al-m1384288264s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/5d28d810bc4a937258acd439059bbc3al-m3289706470s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "co_broke",
          "rentals_cost_per_lead_hybrid"
        ]
      },
      "property_id": "7105996299",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "RXUN",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Exp Realty, Llc",
            "phones": null
          },
          "phones": [
            {
              "ext": null,
              "number": "8323406157",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        },
        {
          "office": {
            "name": "Exp Realty LLC",
            "phones": [
              {
                "ext": null,
                "number": "8885197431",
                "primary": false,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2819109082",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "co_seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Exp Realty, Llc",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 1,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1991
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 1",
            "Primary Bedroom Dimensions: 11 x 11",
            "Primary Bedroom Level: Second"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 1",
            "PrimaryBedroom: 11 x 11",
            "PrimaryBedroom Level: Second"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-04-24",
            "Directions: SH-35 S, make a left onto FM 1459 then make a right onto a private gravel road that ends at the property gate.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: D MCCORMICK",
            "Postal City: Sweeny",
            "Subdivision: D MCCORMICK",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 1991",
            "Property Age: 34",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: AerobicSeptic, SepticTank",
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-24T15:55:38.000000Z",
      "list_price": 850,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980939321",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.091413,
            "lon": -95.69632
          },
          "country": "USA",
          "line": "7460 FM 1459 Rd Unit B",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980939321",
            "status": "for_rent"
          }
        ]
      },
      "permalink": "7460-FM-1459-Rd-B_Sweeny_TX_77480_M95339-52348",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/840ed1c7385dfa0ef318d1535e8cdd0fl-m1016514593s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/840ed1c7385dfa0ef318d1535e8cdd0fl-m4028332168s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/840ed1c7385dfa0ef318d1535e8cdd0fl-m1016514593s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9533952348",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Excellent Properties, Inc.",
            "phones": [
              {
                "ext": null,
                "number": "2812651288",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(281) 265-1288",
              "primary": true,
              "trackable": null,
              "type": "Home"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Excellent Properties, Inc.",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2369,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2017
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 15 x 14",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "Bedroom: 13 x 12",
            "Bedroom Level: Second",
            "Bedroom: 13 x 12",
            "Bedroom Level: Second",
            "Bedroom: 13 x 12",
            "Bedroom Level: Second",
            "GameRoom: 23 x 17",
            "GameRoom Level: Second",
            "FamilyRoom: 17 x 15",
            "FamilyRoom Level: First",
            "DiningRoom: 12 x 10",
            "DiningRoom Level: First",
            "Kitchen: 12 x 10",
            "Kitchen Level: First",
            "Bedroom: 13 x 12",
            "Bedroom Level: Second",
            "Bedroom: 13 x 12",
            "Bedroom Level: Second",
            "Bedroom: 13 x 12",
            "Bedroom Level: Second",
            "PrimaryBedroom: 15 x 14",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 17 x 15",
            "Game/Recreation Room Dimensions: 23 x 17",
            "Family Room Level: First",
            "Game/Recreation Room Level: Second"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 2",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "GraniteCounters",
            "HighCeilings",
            "WindowTreatments",
            "CeilingFans",
            "ProgrammableThermostat",
            "Flooring: Laminate, Tile",
            "Window Features: LowEmissivityWindows, WindowCoverings"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "FreeStandingRange",
            "GasCooktop",
            "Disposal",
            "GasOven",
            "Microwave",
            "Oven",
            "EnergyStarQualifiedAppliances",
            "Refrigerator",
            "Laundry Features: WasherHookup, ElectricDryerHookup, GasDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 12 x 8",
            "Breakfast Room Level: First",
            "Dining Room Dimensions: 12 x 10",
            "Dining Room Level: First",
            "Kitchen Dimensions: 12 x 10",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage, GarageDoorOpener"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Excellent Propertie",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$300 pet deposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: VELASQUEZ ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: GEORGE RANCH HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: READING JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-05-01",
            "Directions: Hwy. 59 exit on 762, L. on Reading, L. on Lake Bridge, at turnabout turn L. to Summer Crescent, R. on Round lake, R. on Green paseo Place, next street of Paddle Fish Place, L. on Sintra Lake (this street no street sign due to construction). no sign",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend Southeast",
            "Source Neighborhood: Summer Lakes",
            "Parcel Number: 7585-09-002-0060-901",
            "Postal City: Rosenberg",
            "Subdivision: Summer Lakes",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2369",
            "Year Built: 2017",
            "Building Area Total: 2369",
            "Green Building Verification Type: EnergyStarCertifiedHomes",
            "Levels: Two",
            "Living Area Source: Builder",
            "New Construction: Yes",
            "Property Age: 8",
            "Property Condition: NewConstruction",
            "Levels or Stories: 2",
            "Building Total Stories: 2",
            "Year Built Source: Builder",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "CableAvailable",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: RadiantAtticBarrier, Appliances, Hvac, Insulation, Thermostat, Windows",
            "Security Features: FireSprinklerSystem, SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-28T20:17:16.000000Z",
      "list_price": 2100,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981086920",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.538448,
            "lon": -95.727907
          },
          "country": "USA",
          "line": "247 Sintra Lake Way",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981086920",
            "status": "for_rent"
          },
          {
            "listing_id": "2953577943",
            "status": "off_market"
          },
          {
            "listing_id": "641227979",
            "status": "off_market"
          },
          {
            "listing_id": "627798223",
            "status": "off_market"
          },
          {
            "listing_id": "626069259",
            "status": "off_market"
          },
          {
            "listing_id": "620880155",
            "status": "off_market"
          }
        ]
      },
      "permalink": "247-Sintra-Lake-Way_Richmond_TX_77469_M87073-18156",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/d80eaee9a0315e5dfebc63cc8c5af4d1l-m2600093954s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/d80eaee9a0315e5dfebc63cc8c5af4d1l-m3293355208s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/d80eaee9a0315e5dfebc63cc8c5af4d1l-m2600093954s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "8707318156",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": [
              {
                "ext": null,
                "number": "9793180197",
                "primary": false,
                "trackable": null,
                "type": "primary"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2253,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2015
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: Central"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Full Bathrooms: 3"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "Interior Amenities: Microwave, RangeOven, Refrigerator, Dishwasher, GarbageDisposal, Freezer",
            "Flooring: Carpet, Laminate"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "CableReady",
            "FencedYard",
            "Garage",
            "WiredForInternet"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: OneYear",
            "Rent Frequency: MONTH",
            "Desposit Description: 2220.00"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Cats Allowed: Yes",
            "Dogs Allowed: Yes",
            "Small Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Availability Date: 2025-05-07",
            "Source Property Type: HOUSE",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Property Age: 10",
            "SqFt Minimum: 2253"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_unit"
      },
      "list_date": "2025-03-28T21:17:00.000000Z",
      "list_price": 2220,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979915879",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.511774,
            "lon": -95.821294
          },
          "country": "USA",
          "line": "2315 Zephyr Ln",
          "postal_code": "77471",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979915879",
            "status": "for_rent"
          },
          {
            "listing_id": "2645289979",
            "status": "sold"
          }
        ]
      },
      "permalink": "2315-Zephyr-Ln_Rosenberg_TX_77471_M72893-52224",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": true
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/e7fea40f7abcd0529d28140641d1a169l-m2158043095s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/e7fea40f7abcd0529d28140641d1a169l-m3282952671s.jpg"
        }
      ],
      "price_reduced_amount": 30,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/e7fea40f7abcd0529d28140641d1a169l-m2158043095s.jpg"
      },
      "products": null,
      "property_id": "7289352224",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "TRBO",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "HomeSmart",
            "phones": [
              {
                "ext": null,
                "number": "7137856666",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8328775042",
              "primary": true,
              "trackable": null,
              "type": "Cell"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "HomeSmart",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1462,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1939
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 22 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "Kitchen, LivingRoom",
            "Bathroom: 9 x 7 x First",
            "Bedroom: 13 x 12",
            "Bedroom Level: First",
            "Bedroom: 12 x 12",
            "Bedroom Level: First",
            "UtilityRoom: 12 x 8",
            "UtilityRoom Level: First",
            "Bathroom: 9 x 7 x First",
            "PrimaryBathroom: 9 x 8",
            "PrimaryBathroom Level: First",
            "Bedroom: 13 x 12",
            "Bedroom Level: First",
            "Bedroom: 12 x 12",
            "Bedroom Level: First",
            "PrimaryBedroom: 22 x 12",
            "PrimaryBedroom Level: First",
            "UtilityRoom: 12 x 8",
            "UtilityRoom Level: First",
            "DiningRoom: 10 x 8",
            "DiningRoom Level: First",
            "Kitchen: 14 x 14",
            "Kitchen Level: First",
            "LivingRoom: 17 x 14",
            "LivingRoom Level: First",
            "Living Room Dimensions: 17 x 14",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2",
            "Primary Bathroom Dimensions: 9 x 8",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "KitchenDiningCombo",
            "Flooring: Laminate"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "GasOven",
            "GasRange",
            "Microwave",
            "Laundry Features: WasherHookup, ElectricDryerHookup, GasDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 10 x 8",
            "Dining Room Level: First",
            "Kitchen Dimensions: 14 x 14",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 1.17",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 50965"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: WEST COLUMBIA ELEMENTARY",
            "Elementary School District: 10 - Columbia-Brazoria",
            "High School: COLUMBIA HIGH SCHOOL",
            "High School District: 10 - Columbia-Brazoria",
            "Middle School: WEST BRAZOS JUNIOR HIGH",
            "Middle or Junior School District: 10 - Columbia-Brazoria"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-04-11",
            "Directions: From SH-288 South, keep right on South FWY, Turn R on CR-45, left on FM -521, R on Jimmy Phillips Blvd, L on S 17th St, L on S Columbia the house will be on the R side.",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: Dance East",
            "Parcel Number: 3150-0053-000",
            "Postal City: West Columbia",
            "Postal Code Plus 4: 3618",
            "Subdivision: Dance East",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1462",
            "Year Built: 1939",
            "Building Area Total: 1462",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 86",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-12T04:05:59.000000Z",
      "list_price": 1600,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980505529",
      "location": {
        "address": {
          "city": "West Columbia",
          "coordinate": {
            "lat": 29.116446,
            "lon": -95.642545
          },
          "country": "USA",
          "line": "2122 S Columbia Dr",
          "postal_code": "77486",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2976512462",
            "status": "for_sale"
          },
          {
            "listing_id": "2980505529",
            "status": "for_rent"
          },
          {
            "listing_id": "2973255461",
            "status": "off_market"
          },
          {
            "listing_id": "2936233498",
            "status": "off_market"
          },
          {
            "listing_id": "2951740934",
            "status": "off_market"
          },
          {
            "listing_id": "2963033569",
            "status": "off_market"
          },
          {
            "listing_id": "2964210031",
            "status": "off_market"
          },
          {
            "listing_id": "2955013495",
            "status": "off_market"
          },
          {
            "listing_id": "2942866053",
            "status": "off_market"
          }
        ]
      },
      "permalink": "2122-S-Columbia-Dr_West-Columbia_TX_77486_M75234-52016",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/925fec591a5221d9cf6f10d4880a36d9l-m3750738900s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/925fec591a5221d9cf6f10d4880a36d9l-m795998315s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/925fec591a5221d9cf6f10d4880a36d9l-m3750738900s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7523452016",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Exp Realty, Llc",
            "phones": null
          },
          "phones": [
            {
              "ext": null,
              "number": "8323406157",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        },
        {
          "office": {
            "name": "Exp Realty LLC",
            "phones": [
              {
                "ext": null,
                "number": "8885197431",
                "primary": false,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2819109082",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "co_seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Exp Realty, Llc",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 2,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1988
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 2"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 2",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 11 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 11 x First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-04-06",
            "Directions: From hwy 35, left on FM 1469, right on CR 425.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: D Mccormick",
            "Parcel Number: 0085-0054-191",
            "Postal City: Sweeny",
            "Subdivision: D Mccormick",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 1988",
            "Property Age: 37",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: SepticTank"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-07T00:25:45.000000Z",
      "list_price": 1100,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980262078",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.080509,
            "lon": -95.692757
          },
          "country": "USA",
          "line": "141 County Road 725",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980262078",
            "status": "for_rent"
          },
          {
            "listing_id": "2946959579",
            "status": "off_market"
          }
        ]
      },
      "permalink": "141-County-Road-725_Sweeny_TX_77480_M95429-22155",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/b9085b1652c376b10cba3e9a35d8478al-m1643996509s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/b9085b1652c376b10cba3e9a35d8478al-m1681772221s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/b9085b1652c376b10cba3e9a35d8478al-m1643996509s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9542922155",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": [
              {
                "ext": null,
                "number": "8886599596",
                "primary": false,
                "trackable": null,
                "type": "primary"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1103,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2.0",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Cats Allowed: Yes",
            "Dogs Allowed: Yes",
            "Large Dogs Allowed: Yes",
            "Small Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Property Type: SingleFamily",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1103",
            "SqFt Minimum: 1103.00"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_unit"
      },
      "list_date": "2025-03-31T21:05:59.000000Z",
      "list_price": 1765,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979992985",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.502982,
            "lon": -95.762022
          },
          "country": "USA",
          "line": "7006 Bloom Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979992985",
            "status": "for_rent"
          },
          {
            "listing_id": "2965264174",
            "status": "off_market"
          },
          {
            "listing_id": "2965258120",
            "status": "off_market"
          },
          {
            "listing_id": "637637787",
            "status": "off_market"
          }
        ]
      },
      "permalink": "7006-Bloom-Ln_Richmond_TX_77469_M87222-13314",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": true,
        "dogs_small": true
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/781e0dc92741a387054745a99429013el-m2031810796s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/781e0dc92741a387054745a99429013el-m3954902569s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/781e0dc92741a387054745a99429013el-m2031810796s.jpg"
      },
      "products": null,
      "property_id": "8722213314",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "RNTL",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": [
              {
                "ext": null,
                "number": "8333676963",
                "primary": false,
                "trackable": null,
                "type": "primary"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1574,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2023
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer: Yes",
            "Washer: Yes",
            "Microwave: Yes",
            "Refrigerator: Yes",
            "Washer Dryer Hookup: Yes",
            "Disposal: Yes"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Heating Features: gas",
            "Heating Fuel: gas",
            "Ceiling Fans: Yes"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "Flooring: Carpet"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Assigned Spaces: yes",
            "Attached Parking: 888",
            "Garage Description: attached"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Patio: Yes",
            "Porch: Yes",
            "Balcony: No",
            "Private Balcony: No",
            "Private Patio: Yes"
          ]
        },
        {
          "category": "Multi-Unit Info",
          "parent_category": "Community",
          "text": [
            "Number of Units: 1"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: 12",
            "Security Deposit: 2199.00",
            "Application Fee: $59.00"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Cats Allowed: Yes",
            "Dogs Allowed: Yes",
            "Large Dogs Allowed: Yes",
            "Small Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "County: Fort Bend",
            "Availability Date: 2025-05-09",
            "Management Company: Mynd Property Management",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Accessibility Features",
          "parent_category": "Features",
          "text": [
            "Disabled Access: No"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Property Age: 2",
            "SqFt Minimum: 1574"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": false,
        "is_schedule_a_tour": false,
        "lead_type": "rental_go_direct"
      },
      "list_date": "2024-03-22T17:07:48.000000Z",
      "list_price": 2199,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2965405497",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.527102,
            "lon": -95.769136
          },
          "country": "USA",
          "line": "2832 Willow Gulch Way",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2965405497",
            "status": "for_rent"
          },
          {
            "listing_id": "2965445831",
            "status": "off_market"
          },
          {
            "listing_id": "2958306210",
            "status": "off_market"
          }
        ]
      },
      "permalink": "2832-Willow-Gulch-Way_Richmond_TX_77469_M96852-24039",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": true,
        "dogs_small": true
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/5d3b96fad63799996ada8ff8efeed9dal-m85245998s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/5d3b96fad63799996ada8ff8efeed9dal-m739545388s.jpg"
        }
      ],
      "price_reduced_amount": 101,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/5d3b96fad63799996ada8ff8efeed9dal-m85245998s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "co_broke",
          "rentals_cost_per_lead_hybrid"
        ]
      },
      "property_id": "9685224039",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "MYND",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Alford Realty",
            "phones": [
              {
                "ext": null,
                "number": "(979) 548-8009",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "9793731053",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Alford Realty",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1056,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2013
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 16 x 112",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 3",
            "Bedroom: 12 x 10 x First",
            "Bedroom: 8 x 8 x First",
            "Bedroom: 12 x 10 x First",
            "Bedroom: 8 x 8 x First",
            "PrimaryBedroom: 16 x 112",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "FreeStandingRange",
            "Refrigerator",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: WEST COLUMBIA ELEMENTARY",
            "Elementary School District: 10 - Columbia-Brazoria",
            "High School: COLUMBIA HIGH SCHOOL",
            "High School District: 10 - Columbia-Brazoria",
            "Middle School: WEST BRAZOS JUNIOR HIGH",
            "Middle or Junior School District: 10 - Columbia-Brazoria"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2022-08-08",
            "Directions: FROM HWY 35 TURN NORTH ON 524 TURN RIGHT ON CR 720 PROPERTY ON THE LEFT",
            "Restrictions: MobileHomeAllowed, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: MCNEEL TRACT",
            "Parcel Number: 9690-0088-472",
            "Postal City: Sweeny",
            "Postal Code Plus 4: 7074",
            "Subdivision: MCNEEL TRACT",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1056",
            "Year Built: 2013",
            "Building Area Total: 1056",
            "Living Area Source: Appraiser",
            "Property Age: 12",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: SepticTank",
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-15T19:41:36.000000Z",
      "list_price": 1300,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980603977",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.137087,
            "lon": -95.796005
          },
          "country": "USA",
          "line": "333 County Road 720",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980603977",
            "status": "for_rent"
          },
          {
            "listing_id": "2946061080",
            "status": "off_market"
          }
        ]
      },
      "permalink": "333-County-Road-720_Sweeny_TX_77480_M85392-26164",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/56cf3ec6d21597cce4c8092c247880fel-m349190476s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/56cf3ec6d21597cce4c8092c247880fel-m2810833206s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/56cf3ec6d21597cce4c8092c247880fel-m349190476s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "8539226164",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Cjm Realty Advisors",
            "phones": [
              {
                "ext": null,
                "number": "8328754309",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "9364652265",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Cjm Realty Advisors",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1450,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2007
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 12 x 10",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "PrimaryBedroom: 12 x 10",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "QuartzCounters",
            "CeilingFans",
            "Flooring: Laminate"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Dishwasher",
            "Microwave",
            "Washer",
            "Refrigerator",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "Patio",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Driveway, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1791",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 7802"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$300 Nonrefundable"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ADRIANE MATHEWS GRAY ELEMENTARY",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-06-01",
            "Directions: From FM 2977/Minonite, turn on Koeblen. Turn left on Sunrise Meadows, right on Standing Bluff. Then turn left on Garnet Trail and the home is on the left.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sunrise Meadow Sec 2",
            "Parcel Number: 8289-02-006-0240-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 4393",
            "Public Survey Section: 2",
            "Subdivision: Sunrise Meadow Sec 2",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1450",
            "Year Built: 2007",
            "Building Area Total: 1450",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 18",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-30T07:09:37.000000Z",
      "list_price": 2000,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981146189",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.501465,
            "lon": -95.766661
          },
          "country": "USA",
          "line": "6818 Garnet Trail Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981146189",
            "status": "for_rent"
          },
          {
            "listing_id": "2966958027",
            "status": "off_market"
          }
        ]
      },
      "permalink": "6818-Garnet-Trail-Ln_Richmond_TX_77469_M73326-91600",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/3aca520e90a40cf8f3562b80146f05c8l-m266019737s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/3aca520e90a40cf8f3562b80146f05c8l-m1028367917s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/3aca520e90a40cf8f3562b80146f05c8l-m266019737s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7332691600",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Progress Residential Property",
            "phones": [
              {
                "ext": null,
                "number": "8002184796",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8002184796",
              "primary": true,
              "trackable": null,
              "type": null
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Progress Residential Property",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1123,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2005
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 3"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "CeilingFans",
            "Furnished Description: Unfurnished"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Disposal",
            "Refrigerator"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1528",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 6656"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Progress Residential",
            "Pets Allowed: Yes",
            "Pet Description: PetDepositDescription:Pet rent: 1 pet $72mo, PetDepositDescription: 2 pets $144mo, PetDepositDescription: 3 pets $199mo. Pet limit 3. Contact Progress Residential for breed restrictions"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ADRIANE MATHEWS GRAY ELEMENTARY",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Pending",
            "County: Fort Bend",
            "Availability Date: 2024-10-29",
            "Directions: 59 South Exit FM 762 Left; Right--FM 2977, Right--Koeblen rd, Left--Sunrise Meadow; Left--Enclave Hill; Right--Falling Trace; Left--Plum Meadow; Right-Sunrise Hill which turns and becomes Hollow Cove. Home is on the left.",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sunrise Meadow Sec 1",
            "Parcel Number: 8289-01-003-0300-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 4127",
            "Subdivision: Sunrise Meadow Sec 1",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1123",
            "Year Built: 2005",
            "Building Area Total: 1123",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 20",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": true
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2024-10-29T16:55:22.000000Z",
      "list_price": 1550,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2974265609",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.49993,
            "lon": -95.760867
          },
          "country": "USA",
          "line": "4002 Hollow Cove Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2974265609",
            "status": "for_rent"
          },
          {
            "listing_id": "632301403",
            "status": "off_market"
          },
          {
            "listing_id": "2972806279",
            "status": "off_market"
          },
          {
            "listing_id": "2972471990",
            "status": "off_market"
          },
          {
            "listing_id": "2973717116",
            "status": "off_market"
          },
          {
            "listing_id": "603595135",
            "status": "off_market"
          },
          {
            "listing_id": "603559295",
            "status": "off_market"
          },
          {
            "listing_id": "602341187",
            "status": "off_market"
          },
          {
            "listing_id": "576886935",
            "status": "off_market"
          },
          {
            "listing_id": "573073471",
            "status": "sold"
          }
        ]
      },
      "permalink": "4002-Hollow-Cove-Ln_Richmond_TX_77469_M70172-66029",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/24b351958e2b4c8a25f603b2435693c7l-m1857823449s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/24b351958e2b4c8a25f603b2435693c7l-m1197720928s.jpg"
        }
      ],
      "price_reduced_amount": 5,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/24b351958e2b4c8a25f603b2435693c7l-m1857823449s.jpg"
      },
      "products": null,
      "property_id": "7017266029",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Firstkey Homes",
            "phones": [
              {
                "ext": null,
                "number": "7136590616",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Firstkey Homes",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 5,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2627,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2013
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 5",
            "Primary Bedroom Dimensions: 15 x 11",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 5",
            "Bedroom: 13 x 13 x Second",
            "Bedroom: 15 x 15 x Second",
            "Bedroom: 15 x 10 x Second",
            "Bedroom: 15 x 13 x Second",
            "Bedroom: 13 x 13 x Second",
            "Bedroom: 15 x 15 x Second",
            "Bedroom: 15 x 10 x Second",
            "Bedroom: 15 x 13 x Second",
            "PrimaryBedroom: 15 x 11",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 2",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "CeilingFans",
            "Flooring: Carpet, Tile, Wood"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "FullyFenced"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1842",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 8024"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: FirstKey Homes",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ADRIANE MATHEWS GRAY ELEMENTARY",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-04-03",
            "Directions: Get on I-69 from Smith St Continue on I-69 to Rosenberg. Take exit 99 from I-69 Take Farm-To-Market Rd 2218 and Powerline Rd to Beech Trail Ct",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sunrise Meadow Sec 6",
            "Parcel Number: 8289-06-003-0430-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 5464",
            "Subdivision: Sunrise Meadow Sec 6",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2627",
            "Year Built: 2013",
            "Building Area Total: 2627",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 12",
            "Levels or Stories: 2",
            "Building Total Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "CableAvailable",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-03T20:06:05.000000Z",
      "list_price": 2075,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980156827",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.496613,
            "lon": -95.77392
          },
          "country": "USA",
          "line": "6731 Beech Trail Ct",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980156827",
            "status": "for_rent"
          },
          {
            "listing_id": "2964314176",
            "status": "off_market"
          },
          {
            "listing_id": "2963350979",
            "status": "off_market"
          },
          {
            "listing_id": "2963345417",
            "status": "off_market"
          },
          {
            "listing_id": "2438592515",
            "status": "off_market"
          },
          {
            "listing_id": "2313741339",
            "status": "sold"
          },
          {
            "listing_id": "640508083",
            "status": "off_market"
          },
          {
            "listing_id": "601122943",
            "status": "sold"
          },
          {
            "listing_id": "563687123",
            "status": "off_market"
          }
        ]
      },
      "permalink": "6731-Beech-Trail-Ct_Richmond_TX_77469_M77624-84941",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/cf22225870bdddfeeb53730f4ed746b8l-m2973088626s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/cf22225870bdddfeeb53730f4ed746b8l-m86519490s.jpg"
        }
      ],
      "price_reduced_amount": 55,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/cf22225870bdddfeeb53730f4ed746b8l-m2973088626s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7762484941",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Apex Brokerage, Llc",
            "phones": [
              {
                "ext": null,
                "number": "8326852739",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8329662669",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Apex Brokerage, Llc",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": null,
        "baths_max": null,
        "baths_min": null,
        "beds": 0,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "land",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 0"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 0"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-05-01",
            "Directions: From Needville, head south on TX-36. Turn left on FM 1994 to blue barn on the right",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Call 477, Tract 29, Fort Bend County",
            "Postal City: Guy",
            "Subdivision: Call 477, Tract 29, Fort Bend County",
            "Property Subtype: UnimprovedLand",
            "Source System Name: C2C"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-05-01T06:51:47.000000Z",
      "list_price": 15000,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981194988",
      "location": {
        "address": {
          "city": "Guy",
          "coordinate": {
            "lat": 29.34931,
            "lon": -95.777685
          },
          "country": "USA",
          "line": "Tr",
          "postal_code": "77444",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981194988",
            "status": "for_rent"
          }
        ]
      },
      "permalink": "Tr_Guy_TX_77444_M98548-15466",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/1bbc2181e89034a109e047b3461a651el-m902889301s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/1bbc2181e89034a109e047b3461a651el-m4157153701s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/1bbc2181e89034a109e047b3461a651el-m902889301s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9854815466",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Green And Associates, REALTORS",
            "phones": [
              {
                "ext": null,
                "number": "2814844444",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2819759301",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Green And Associates, REALTORS",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1619,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1960
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 12 x 13",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 7",
            "Bedroom: 11 x 11",
            "Bedroom Level: First",
            "Bedroom: 11 x 12",
            "Bedroom Level: First",
            "LivingRoom: 16 x 15",
            "LivingRoom Level: First",
            "Den: 18 x 16",
            "Den Level: First",
            "Kitchen: 14 x 10",
            "Kitchen Level: First",
            "Bedroom: 11 x 11",
            "Bedroom Level: First",
            "Bedroom: 11 x 12",
            "Bedroom Level: First",
            "PrimaryBedroom: 12 x 13",
            "PrimaryBedroom Level: First",
            "PrimaryBathroom: 7 x 5",
            "PrimaryBathroom Level: First",
            "Den Dimensions: 18 x 16",
            "Living Room Dimensions: 16 x 15",
            "Den Level: First",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2",
            "Primary Bathroom Dimensions: 7 x 5",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "TubShower",
            "CeilingFans",
            "ProgrammableThermostat"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Dishwasher",
            "ElectricRange",
            "Disposal",
            "Oven",
            "Washer",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Kitchen Dimensions: 14 x 10",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Carport Spaces: 2",
            "Parking Features: AttachedCarport"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared",
            "Lot Size Acres: 0.3236",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 14096"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$250 non refundable pet fee per pet plus additional $25 rent per month per pet"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Pending",
            "County: Brazoria",
            "Availability Date: 2025-03-07",
            "Directions: From FM 1459, take a right on Alice St, the home is on the right",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: Early Trs 48-49 Blk C Sween",
            "Parcel Number: 3651-0038-000",
            "Postal City: Sweeny",
            "Postal Code Plus 4: 2703",
            "Subdivision: Early Trs 48-49 Blk C Sween",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1619",
            "Year Built: 1960",
            "Building Area Total: 1619",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 65",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "ElectricityAvailable",
            "SewerAvailable",
            "WaterAvailable",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Thermostat"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": true
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-08T02:21:17.000000Z",
      "list_price": 1695,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979141774",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.048486,
            "lon": -95.692878
          },
          "country": "USA",
          "line": "1105 Alice St",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979141774",
            "status": "for_rent"
          }
        ]
      },
      "permalink": "1105-Alice-St_Sweeny_TX_77480_M71597-73683",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/68f95e76ab41171af182c5a88a7cec86l-m726312896s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/68f95e76ab41171af182c5a88a7cec86l-m1783298246s.jpg"
        }
      ],
      "price_reduced_amount": 100,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/68f95e76ab41171af182c5a88a7cec86l-m726312896s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7159773683",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Shanni Lo",
            "phones": [
              {
                "ext": null,
                "number": "8324527328",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(713) 538-0992",
              "primary": true,
              "trackable": null,
              "type": "Home"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Shanni Lo",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1342,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2006
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 14 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "Bedroom: 10 x 10",
            "Bedroom Level: First",
            "Bedroom: 10 x 9",
            "Bedroom Level: First",
            "LivingRoom: 14 x 12",
            "LivingRoom Level: First",
            "Bedroom: 10 x 10",
            "Bedroom Level: First",
            "Bedroom: 10 x 9",
            "Bedroom Level: First",
            "PrimaryBedroom: 14 x 12",
            "PrimaryBedroom Level: First",
            "Living Room Dimensions: 14 x 12",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "LaminateCounters",
            "Flooring: Laminate"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1378",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 6003"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ADRIANE MATHEWS GRAY ELEMENTARY",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "CommunityPool",
            "Community Features: CommunityPool"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2023-01-10",
            "Directions: FM 2997 to Koeblen, Koeblen to Sunrise meadow dr. Left onto Clay Cliff, right onto Cloudbluff. Follow circle to Middlecrest.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sunrise Meadow Sec 1",
            "Parcel Number: 8289-01-003-0210-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 4124",
            "Public Survey Section: 1",
            "Subdivision: Sunrise Meadow Sec 1",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1342",
            "Year Built: 2006",
            "Building Area Total: 1342",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 19",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-30T20:48:47.000000Z",
      "list_price": 1750,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981170332",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.500803,
            "lon": -95.760445
          },
          "country": "USA",
          "line": "3907 Middlecrest Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981170332",
            "status": "for_rent"
          },
          {
            "listing_id": "2978483361",
            "status": "off_market"
          },
          {
            "listing_id": "2961315184",
            "status": "off_market"
          },
          {
            "listing_id": "2951334870",
            "status": "off_market"
          },
          {
            "listing_id": "620404635",
            "status": "off_market"
          },
          {
            "listing_id": "618479731",
            "status": "off_market"
          },
          {
            "listing_id": "617023319",
            "status": "sold"
          },
          {
            "listing_id": "529477431",
            "status": "sold"
          },
          {
            "listing_id": "529471323",
            "status": "off_market"
          }
        ]
      },
      "permalink": "3907-Middlecrest-Ln_Richmond_TX_77469_M75951-97637",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/f1c3dcfa3d32f69ab994e25851f30fa2l-m1196020932s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/f1c3dcfa3d32f69ab994e25851f30fa2l-m1182081350s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/f1c3dcfa3d32f69ab994e25851f30fa2l-m1196020932s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7595197637",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Keller Williams Realty -Sw",
            "phones": [
              {
                "ext": null,
                "number": "2812650123",
                "primary": true,
                "trackable": null,
                "type": "Office"
              },
              {
                "ext": null,
                "number": "2812650123",
                "primary": false,
                "trackable": null,
                "type": "Fax"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "4784843255",
              "primary": true,
              "trackable": null,
              "type": "Cell"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Keller Williams Realty -Sw",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3",
        "baths_max": null,
        "baths_min": null,
        "beds": 5,
        "beds_max": null,
        "beds_min": null,
        "garage": 3,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2456,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2024
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 5",
            "Primary Bedroom Dimensions: 13 x 16",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 6",
            "FamilyRoom",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 12 x 11 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 12 x 11 x First",
            "PrimaryBedroom: 13 x 16",
            "PrimaryBedroom Level: First",
            "LivingRoom: 13 x 18",
            "LivingRoom Level: First",
            "Living Room Dimensions: 13 x 18",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 3"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "GraniteCounters",
            "Pantry",
            "ProgrammableThermostat",
            "Window Features: LowEmissivityWindows"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Disposal",
            "GasRange",
            "Microwave",
            "Oven",
            "TanklessWaterHeater"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "Patio",
            "PrivateYard",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 3",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: CornerLot, Subdivision",
            "Lot Size Acres: 0.1652893",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 7200"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Inframark",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ARREDONDO ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "CommunityPool",
            "Community Features: CommunityPool"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-04-14",
            "Directions: Take SW I-69 and exit at 99 onto the SW Freeway. Turn left onto BF Terry Blvd, then left onto Bryan Rd. Turn right into the Bryan Grove entrance",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Bryan Grove",
            "Parcel Number: 2209-02-004-0200-901",
            "Postal City: Rosenberg",
            "Public Survey Section: 2",
            "Subdivision: Bryan Grove",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2456",
            "Year Built: 2024",
            "Building Area Total: 2456",
            "Green Indoor Air Quality: Ventilation",
            "Levels: One",
            "Living Area Source: Appraiser",
            "New Construction: Yes",
            "Property Age: 1",
            "Property Condition: NewConstruction",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: Builder",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: RadiantAtticBarrier, Lighting, Thermostat, WaterHeater, Windows",
            "Security Features: SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-14T21:32:40.000000Z",
      "list_price": 2700,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980565707",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.525381,
            "lon": -95.767006
          },
          "country": "USA",
          "line": "2922 Bur Landing Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2977995120",
            "status": "for_sale"
          },
          {
            "listing_id": "2980565707",
            "status": "for_rent"
          },
          {
            "listing_id": "2970202574",
            "status": "sold"
          },
          {
            "listing_id": "2976275663",
            "status": "off_market"
          }
        ]
      },
      "permalink": "2922-Bur-Landing-Ln_Rosenberg_TX_77469_M98427-44286",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/6982bce112e639a15fd9698c0a1c9240l-m2317218107s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/6982bce112e639a15fd9698c0a1c9240l-m3158461216s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/6982bce112e639a15fd9698c0a1c9240l-m2317218107s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9842744286",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Progress Residential Property",
            "phones": [
              {
                "ext": null,
                "number": "8002184796",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8002184796",
              "primary": true,
              "trackable": null,
              "type": null
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Progress Residential Property",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2260,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2007
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 14 x 20",
            "Primary Bedroom Level: Second"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "Bedroom: 14 x 11 x Second",
            "Bedroom: 13 x 13 x Second",
            "Bedroom: 12 x 13 x Second",
            "Bedroom: 14 x 11 x Second",
            "Bedroom: 13 x 13 x Second",
            "Bedroom: 12 x 13 x Second",
            "PrimaryBedroom: 14 x 20",
            "PrimaryBedroom Level: Second"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 2",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "CeilingFans",
            "Furnished Description: Unfurnished"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Disposal",
            "Refrigerator"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1516",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 6604"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Progress Residential",
            "Pets Allowed: Yes",
            "Pet Description: PetDepositDescription:Pet rent: 1 pet $72mo, PetDepositDescription: 2 pets $144mo, PetDepositDescription: 3 pets $199mo. Pet limit 3. Contact Progress Residential for breed restrictions"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: MEYER ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Pending",
            "County: Fort Bend",
            "Availability Date: 2024-09-10",
            "Directions: South on Route 59/ TX-529 Spur N toward US-59 S, 1st Right on Southwest Fwy, Make a U turn, Go right on TX-36S, Left on J Meyers Rd, Right on Silver Stone LN, Right on Oakbriar, Property on your right.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: The Trails At Seabourne Park Sec 1",
            "Parcel Number: 8016-01-006-0130-901",
            "Postal City: Rosenberg",
            "Postal Code Plus 4: 4702",
            "Subdivision: The Trails At Seabourne Park Sec 1",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2260",
            "Year Built: 2007",
            "Building Area Total: 2260",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 18",
            "Levels or Stories: 2",
            "Building Total Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": true
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2024-09-11T00:28:31.000000Z",
      "list_price": 1765,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2971939771",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.510028,
            "lon": -95.803286
          },
          "country": "USA",
          "line": "5018 Oakbriar Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2971939771",
            "status": "for_rent"
          },
          {
            "listing_id": "2926762194",
            "status": "off_market"
          },
          {
            "listing_id": "2971871547",
            "status": "off_market"
          },
          {
            "listing_id": "2969373617",
            "status": "off_market"
          },
          {
            "listing_id": "2973719894",
            "status": "off_market"
          },
          {
            "listing_id": "557385371",
            "status": "sold"
          },
          {
            "listing_id": "557474999",
            "status": "off_market"
          },
          {
            "listing_id": "536299751",
            "status": "off_market"
          },
          {
            "listing_id": "502988515",
            "status": "off_market"
          },
          {
            "listing_id": "502988255",
            "status": "off_market"
          }
        ]
      },
      "permalink": "5018-Oakbriar-Ln_Richmond_TX_77469_M80312-55694",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/044ffe2db54b1a1169e4941ed7cf7cbdl-m1138199642s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/044ffe2db54b1a1169e4941ed7cf7cbdl-m3863998016s.jpg"
        }
      ],
      "price_reduced_amount": 25,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/044ffe2db54b1a1169e4941ed7cf7cbdl-m1138199642s.jpg"
      },
      "products": null,
      "property_id": "8031255694",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Realm Real Estate Professional",
            "phones": [
              {
                "ext": null,
                "number": "2815985200",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Realm Real Estate Professional",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1636,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1935
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 12",
            "DiningRoom, FamilyRoom, Kitchen, LivingRoom, UtilityRoom, HalfBath",
            "Bathroom: Buyer to Verify",
            "Bathroom Level: First",
            "Bathroom: Buyer to Verify",
            "Bathroom Level: First",
            "Bedroom: Buyer to Verify",
            "Bedroom Level: First",
            "Bedroom: Buyer to Verify",
            "Bedroom Level: First",
            "Bedroom: Buyer to Verify",
            "Bedroom Level: First",
            "UtilityRoom: Buyer to Verify",
            "UtilityRoom Level: First",
            "DiningRoom: Buyer to Verify",
            "DiningRoom Level: First",
            "Kitchen: Buyer to Verify",
            "Kitchen Level: First",
            "LivingRoom: Buyer to Verify",
            "LivingRoom Level: First",
            "Bathroom: Buyer to Verify",
            "Bathroom Level: First",
            "Bathroom: Buyer to Verify",
            "Bathroom Level: First",
            "PrimaryBathroom: Buyer to Verify",
            "PrimaryBathroom Level: First",
            "Bedroom: Buyer to Verify",
            "Bedroom Level: First",
            "Bedroom: Buyer to Verify",
            "Bedroom Level: First",
            "Bedroom: Buyer to Verify",
            "Bedroom Level: First",
            "PrimaryBedroom: Buyer to Verify",
            "PrimaryBedroom Level: First",
            "Porch: Buyer to Verify",
            "Porch Level: First",
            "UtilityRoom: Buyer to Verify",
            "UtilityRoom Level: First",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 2",
            "1/2 Bathrooms: 1",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "BreakfastBar",
            "KitchenFamilyRoomCombo",
            "BathInPrimaryBedroom",
            "Pantry",
            "SelfClosingCabinetDoors",
            "SelfClosingDrawers",
            "KitchenDiningCombo"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "Microwave"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Level: First",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Carport Spaces: 2",
            "Parking Features: AttachedCarport"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Size Acres: 1.55",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 67518"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Porch Level: First"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-03-27",
            "Directions: From Highway 36 South, turn right on Barak Rd. Follow Barak past 90 degree turn. Property will be on your left before the next 90 degree turn.",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: R E Coker",
            "Parcel Number: 0588-00-000-0170-906",
            "Postal City: Guy",
            "Postal Code Plus 4: 9787",
            "Public Survey Section: 1",
            "Subdivision: R E Coker",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1636",
            "Year Built: 1935",
            "Building Area Total: 1636",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 90",
            "Levels or Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: SepticTank",
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-27T22:14:25.000000Z",
      "list_price": 1980,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979854186",
      "location": {
        "address": {
          "city": "Guy",
          "coordinate": {
            "lat": 29.322197,
            "lon": -95.776125
          },
          "country": "USA",
          "line": "14711 Barak Rd Unit 1",
          "postal_code": "77444",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979173436",
            "status": "for_sale"
          },
          {
            "listing_id": "2979854186",
            "status": "for_rent"
          },
          {
            "listing_id": "2976957329",
            "status": "off_market"
          },
          {
            "listing_id": "2967598788",
            "status": "off_market"
          },
          {
            "listing_id": "2940578736",
            "status": "off_market"
          },
          {
            "listing_id": "2922184081",
            "status": "off_market"
          },
          {
            "listing_id": "2917727996",
            "status": "sold"
          },
          {
            "listing_id": "2956195744",
            "status": "off_market"
          },
          {
            "listing_id": "2953520436",
            "status": "off_market"
          },
          {
            "listing_id": "2943622489",
            "status": "off_market"
          },
          {
            "listing_id": "2922198684",
            "status": "off_market"
          }
        ]
      },
      "permalink": "14711-Barak-Rd_Guy_TX_77444_M84009-58268",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/9cf4c4c86b7e197856d006fe41439211l-m2542491388s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/9cf4c4c86b7e197856d006fe41439211l-m2321741488s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/9cf4c4c86b7e197856d006fe41439211l-m2542491388s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "8400958268",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Texas Signature Realty",
            "phones": [
              {
                "ext": null,
                "number": "8328762093",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(832) 439-1108",
              "primary": true,
              "trackable": null,
              "type": "Home"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Texas Signature Realty",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2023
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 17 x 14",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "UtilityRoom: 9 x 9 x First",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "UtilityRoom: 9 x 9 x First",
            "Kitchen: 12 x 10",
            "Kitchen Level: First",
            "GameRoom: 18 x 12",
            "GameRoom Level: Second",
            "FamilyRoom: 23 x 15",
            "FamilyRoom Level: First",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "PrimaryBedroom: 17 x 14",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 23 x 15",
            "Game/Recreation Room Dimensions: 18 x 12",
            "Family Room Level: First",
            "Game/Recreation Room Level: Second"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 3"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "KitchenIsland",
            "KitchenFamilyRoomCombo",
            "Pantry",
            "TubShower",
            "CeilingFans",
            "ProgrammableThermostat",
            "Flooring: Carpet, Plank, Vinyl"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "GasCooktop",
            "Disposal",
            "GasOven",
            "IceMaker",
            "Microwave",
            "Oven",
            "Dryer",
            "Refrigerator",
            "TanklessWaterHeater",
            "Washer",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 14 x 10",
            "Breakfast Room Level: First",
            "Kitchen Dimensions: 12 x 10",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "SprinklerIrrigation",
            "Patio",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio",
            "Road Surface Type: Concrete"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage, GarageDoorOpener"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ADRIANE MATHEWS GRAY ELEMENTARY",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "Curbs",
            "Community Features: Curbs"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Pending",
            "County: Fort Bend",
            "Availability Date: 2025-02-24",
            "Directions: 59 South",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Windstone/Prairie Sec Two",
            "Parcel Number: 8951-02-008-0030-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 3884",
            "Subdivision: Windstone/Prairie Sec Two",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 2023",
            "Living Area Source: Appraiser",
            "Property Age: 2",
            "Year Built Source: Builder",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "CableAvailable",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Roof, Thermostat, WaterHeater",
            "Security Features: SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": true
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-02-25T00:42:49.000000Z",
      "list_price": 2199,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2978659661",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.49564,
            "lon": -95.760468
          },
          "country": "USA",
          "line": "7414 Misty Iris Way",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2978659661",
            "status": "for_rent"
          },
          {
            "listing_id": "2974734255",
            "status": "off_market"
          },
          {
            "listing_id": "2963021080",
            "status": "off_market"
          }
        ]
      },
      "permalink": "7414-Misty-Iris-Way_Richmond_TX_77469_M94356-63235",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/d2ac301152237a99c6cec0e2607411d9l-m1600276580s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/d2ac301152237a99c6cec0e2607411d9l-m3852440585s.jpg"
        }
      ],
      "price_reduced_amount": 101,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/d2ac301152237a99c6cec0e2607411d9l-m1600276580s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9435663235",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "The Realty",
            "phones": [
              {
                "ext": null,
                "number": "8328345874",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2817289064",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "The Realty",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 1,
        "beds_max": null,
        "beds_min": null,
        "garage": 1,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2022
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 1"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 1",
            "GuestQuarters: 12 x 17 x First",
            "GuestQuarters: 12 x 17 x First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Dishwasher",
            "Refrigerator",
            "Washer",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 1",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: MEYER ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-02-15",
            "Directions: Go South I-69 (59), take a left on Farm To Market Rd 2218, left onto Koeblen Rd, left onto Sendero Dr, take a right onto Twin Summit Dr / Sierra Ridge Dr, take a right onto Eagleton Dr, the left onto Richglen, the house is on the left.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sendero",
            "Postal City: Rosenberg",
            "Subdivision: Sendero",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 2022",
            "Property Age: 3",
            "Year Built Source: Builder"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "ElectricityAvailable",
            "NaturalGasAvailable",
            "SewerAvailable",
            "TrashCollection",
            "WaterAvailable",
            "YardMaintenance",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-02-11T13:54:58.000000Z",
      "list_price": 1300,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2978191710",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.518963,
            "lon": -95.778
          },
          "country": "USA",
          "line": "3612 Richglen Ct",
          "postal_code": "77471",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2978191710",
            "status": "for_rent"
          },
          {
            "listing_id": "2952489046",
            "status": "off_market"
          }
        ]
      },
      "permalink": "3612-Richglen-Ct_Rosenberg_TX_77471_M94471-19026",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/95a88b0144b37ea5acb613d9c73cb42fl-m202854551s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/95a88b0144b37ea5acb613d9c73cb42fl-m311860310s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/95a88b0144b37ea5acb613d9c73cb42fl-m202854551s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9447119026",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Realm Real Estate Professional",
            "phones": [
              {
                "ext": null,
                "number": "2815985200",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8327666662",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Realm Real Estate Professional",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 3,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 3407,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2022
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 18 x 14",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "GameRoom, Office",
            "Bedroom: 11 x 13",
            "Bedroom Level: Second",
            "Bedroom: 11 x 13",
            "Bedroom Level: Second",
            "Bedroom: 11 x 13",
            "Bedroom Level: First",
            "DiningRoom: 11 x 15",
            "DiningRoom Level: First",
            "MediaRoom: 16 x 13",
            "MediaRoom Level: Second",
            "GameRoom: 15 x 14",
            "GameRoom Level: Second",
            "Office: 11 x 13",
            "Office Level: First",
            "FamilyRoom: 17 x 25",
            "FamilyRoom Level: First",
            "Bedroom: 11 x 13",
            "Bedroom Level: Second",
            "Bedroom: 11 x 13",
            "Bedroom Level: Second",
            "Bedroom: 11 x 13",
            "Bedroom Level: First",
            "PrimaryBedroom: 18 x 14",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 17 x 25",
            "Game/Recreation Room Dimensions: 15 x 14",
            "Media Room Dimensions: 16 x 13",
            "Office/Study Room Dimensions: 11 x 13",
            "Family Room Level: First",
            "Game/Recreation Room Level: Second",
            "Media Room Level: Second",
            "Office/Study Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 3"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "EntranceFoyer",
            "HighCeilings",
            "CeilingFans",
            "ProgrammableThermostat",
            "Flooring: Carpet, Laminate, Tile",
            "Window Features: LowEmissivityWindows"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "GasCooktop",
            "Disposal",
            "Microwave",
            "EnergyStarQualifiedAppliances",
            "Laundry Features: WasherHookup, ElectricDryerHookup, GasDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric, AtticFan",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 11 x 15",
            "Dining Room Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 3",
            "Parking Features: Attached, Garage, Tandem"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1749",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 7619"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Stonecreek Estates CAI",
            "Pets Allowed: No, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: CARTER ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: GEORGE RANCH HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: READING JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-02-12",
            "Directions: from Highway 59 (I-69), exit at Reading Road. Head south on Reading Road for about 1.5 miles, then turn right onto Spacek Road. Drive approximately 0.5 miles and turn left into the Stonecreek Estates subdivision. Follow the main road, turn right onto Turquoise Hill Lane.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Stonecreek Estates Sec 6",
            "Parcel Number: 7506-06-001-0100-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 3686",
            "Public Survey Section: 6",
            "Subdivision: Stonecreek Estates Sec 6",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 3407",
            "Year Built: 2022",
            "Building Area Total: 3407",
            "Green Indoor Air Quality: Ventilation",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 3",
            "Levels or Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Appliances, Lighting, Thermostat, Windows",
            "Security Features: Prewired, SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-02-12T11:42:33.000000Z",
      "list_price": 4500,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2978226578",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.502813,
            "lon": -95.719494
          },
          "country": "USA",
          "line": "5838 Turquoise Hill Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2978226475",
            "status": "for_sale"
          },
          {
            "listing_id": "2978226578",
            "status": "for_rent"
          },
          {
            "listing_id": "2947946223",
            "status": "off_market"
          },
          {
            "listing_id": "2948932222",
            "status": "off_market"
          },
          {
            "listing_id": "2940210164",
            "status": "sold"
          }
        ]
      },
      "permalink": "5838-Turquoise-Hill-Ln_Richmond_TX_77469_M99156-08252",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/ac25082543c007836a206caa651227bbl-m3707506267s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/ac25082543c007836a206caa651227bbl-m3764235124s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/ac25082543c007836a206caa651227bbl-m3707506267s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9915608252",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "NetWorth Realty of Houston, LLC",
            "phones": [
              {
                "ext": null,
                "number": "2812201000",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2812201000",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_PHONE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "NetWorth Realty of Houston, LLC",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 2,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 875,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1942
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 2"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 5",
            "Bedroom: 14 x 12",
            "Bedroom Level: First",
            "Bedroom: 14 x 16",
            "Bedroom Level: First",
            "Bathroom: 10 x 10",
            "Bathroom Level: First",
            "Kitchen: 14 x 10",
            "Kitchen Level: First",
            "LivingRoom: 14 x 11",
            "LivingRoom Level: First",
            "Bedroom: 14 x 12",
            "Bedroom Level: First",
            "Bedroom: 14 x 16",
            "Bedroom Level: First",
            "Bathroom: 10 x 10",
            "Bathroom Level: First",
            "Living Room Dimensions: 14 x 11",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "GraniteCounters",
            "TubShower",
            "Flooring: Plank, Tile, Vinyl"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "ElectricCooktop",
            "ElectricOven",
            "Disposal",
            "Microwave",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: WindowUnits"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Kitchen Dimensions: 14 x 10",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared, Subdivision",
            "Lot Size Acres: 0.7966",
            "Lot Size Source: Survey",
            "Lot Size Square Feet: 34700"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Garage Spaces: 2",
            "Parking Features: Detached, Garage"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Road Surface Type: Asphalt"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Exterior",
          "text": [
            "View: SouthernExposure",
            "Security Features: SmokeDetectors"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$250-$500 FEE PER PET NOT REFUNDABLE, PetDepositDescription: ROTTWEILER, PetDepositDescription:GREAT DANE OR DOBERMAN), PetDepositDescription: MAX 2 PETS"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-02-15",
            "Directions: From 35 S, turn left onto FM 1459 for 4 miles, turn left onto N Francis then right onto Old Ocean Avenue. From Brazoria, Follow FM521 W and FM524 to N Hackberry St in Sweeny 14 min (11.1 mi). Drive to 802 Old Ocean Ave",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: Macdonald Sweeny Tr 59-60",
            "Parcel Number: 6505-0075-000",
            "Postal City: Sweeny",
            "Postal Code Plus 4: 3204",
            "Subdivision: Macdonald Sweeny Tr 59-60",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 875",
            "Year Built: 1942",
            "Building Area Total: 875",
            "Direction Faces: Northwest",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 83",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-21T02:22:18.000000Z",
      "list_price": 1300,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979613590",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.042531,
            "lon": -95.693064
          },
          "country": "USA",
          "line": "802 Old Ocean Ave",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979621756",
            "status": "for_sale"
          },
          {
            "listing_id": "2979613590",
            "status": "for_rent"
          },
          {
            "listing_id": "2946550247",
            "status": "off_market"
          },
          {
            "listing_id": "2950345909",
            "status": "off_market"
          },
          {
            "listing_id": "2951697470",
            "status": "off_market"
          },
          {
            "listing_id": "2965664469",
            "status": "off_market"
          },
          {
            "listing_id": "2952541746",
            "status": "off_market"
          }
        ]
      },
      "permalink": "802-Old-Ocean-Ave_Sweeny_TX_77480_M85311-11484",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/760bea402d6eb2e75cb6bf146965098dl-m1653785304s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/760bea402d6eb2e75cb6bf146965098dl-m1919363494s.jpg"
        }
      ],
      "price_reduced_amount": 50,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/760bea402d6eb2e75cb6bf146965098dl-m1653785304s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "8531111484",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Wiley Davis Real Estate",
            "phones": [
              {
                "ext": null,
                "number": "2817822261",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "7137755024",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Wiley Davis Real Estate",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 3,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 3123,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2015
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 11 x 14",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 10",
            "Bedroom: 10 x 10",
            "Bedroom Level: Second",
            "Bedroom: 10 x 10",
            "Bedroom Level: Second",
            "Bedroom: 10 x 10",
            "Bedroom Level: Second",
            "MediaRoom: 12 x 12",
            "MediaRoom Level: Second",
            "Office: 10 x 10",
            "Office Level: First",
            "DiningRoom: 11 x 11",
            "DiningRoom Level: First",
            "GameRoom: 14 x 10",
            "GameRoom Level: Second",
            "LivingRoom: 15 x 10",
            "LivingRoom Level: First",
            "Bedroom: 10 x 10",
            "Bedroom Level: Second",
            "Bedroom: 10 x 10",
            "Bedroom Level: Second",
            "Bedroom: 10 x 10",
            "Bedroom Level: Second",
            "PrimaryBedroom: 11 x 14",
            "PrimaryBedroom Level: First",
            "Game/Recreation Room Dimensions: 14 x 10",
            "Living Room Dimensions: 15 x 10",
            "Media Room Dimensions: 12 x 12",
            "Office/Study Room Dimensions: 10 x 10",
            "Game/Recreation Room Level: Second",
            "Living Room Level: First",
            "Media Room Level: Second",
            "Office/Study Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 4",
            "Full Bathrooms: 3",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "ButlersPantry",
            "KitchenIsland",
            "BathInPrimaryBedroom",
            "Pantry",
            "CeilingFans",
            "ProgrammableThermostat"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Dishwasher",
            "GasCooktop",
            "Disposal",
            "Microwave",
            "Oven",
            "Refrigerator",
            "Washer",
            "EnergyStarQualifiedAppliances",
            "Laundry Features: WasherHookup, ElectricDryerHookup, GasDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric, AtticFan",
            "Fireplace Features: GasLog",
            "Heating Features: Central, Gas",
            "Heating: Yes",
            "Number of Fireplaces: 1"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 10 x 9",
            "Breakfast Room Level: First",
            "Dining Room Dimensions: 11 x 11",
            "Dining Room Level: First"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 3",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1865",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 8124"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Road Surface Type: Concrete"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: GENESIS COMMUNITY",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$500"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ARREDONDO ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "CommunityPool",
            "Curbs",
            "Community Features: CommunityPool, Curbs"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-03-12",
            "Directions: I69 SOUTH, EXIT WILLIAMS WAY BLVD , TURN LEFT AT LIGHT , 2 MILES THEN TURN RIGHT ONTO READING RD, THEN LEFT ONTO HIDDEN RIVER RUN DR, TURN RIGHT ONTO HONEYSUKLE VINE DR, TURN LEFT ONTO VALLEY RIDGE DR, TURN RIGH ONTO LONGVALE DR. TURNS INTO 811 OAK RIVER LN WILL BE ON THE LEFT",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: River Run At The Brazos Sec 3-B",
            "Parcel Number: 6469-93-003-0070-901",
            "Postal City: Rosenberg",
            "Postal Code Plus 4: 2138",
            "Public Survey Section: 3",
            "Subdivision: River Run At The Brazos Sec 3-B",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 3123",
            "Year Built: 2015",
            "Building Area Total: 3123",
            "Green Indoor Air Quality: Ventilation",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 10",
            "Levels or Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Appliances, Lighting, Thermostat"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-13T00:06:01.000000Z",
      "list_price": 2795,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979299541",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.530139,
            "lon": -95.737839
          },
          "country": "USA",
          "line": "811 Oak River Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979299541",
            "status": "for_rent"
          },
          {
            "listing_id": "2976586445",
            "status": "off_market"
          },
          {
            "listing_id": "2962834781",
            "status": "off_market"
          },
          {
            "listing_id": "2962834957",
            "status": "off_market"
          },
          {
            "listing_id": "2951460914",
            "status": "off_market"
          }
        ]
      },
      "permalink": "811-Oak-River-Ln_Rosenberg_TX_77469_M74593-57528",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/d70f25b8c304d86e06de7e50986319c4l-m1619379550s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/d70f25b8c304d86e06de7e50986319c4l-m1256251261s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/d70f25b8c304d86e06de7e50986319c4l-m1619379550s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7459357528",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": null
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 1,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 490,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": "condo",
        "type": "condos",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 1"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1.0",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Cats Allowed: Yes",
            "Dogs Allowed: Yes",
            "Large Dogs Allowed: Yes",
            "Small Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Property Type: Condo",
            "Property Subtype: condo",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 490",
            "SqFt Minimum: 490"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_unit"
      },
      "list_date": "2024-10-01T16:04:38.000000Z",
      "list_price": 792,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2973072435",
      "location": {
        "address": {
          "city": "West Columbia",
          "coordinate": {
            "lat": 29.14897,
            "lon": -95.658386
          },
          "country": "USA",
          "line": "205 N Columbia Dr Unit B1",
          "postal_code": "77486",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2973072435",
            "status": "for_rent"
          },
          {
            "listing_id": "2943630041",
            "status": "off_market"
          },
          {
            "listing_id": "2944076131",
            "status": "off_market"
          },
          {
            "listing_id": "2944448453",
            "status": "off_market"
          }
        ]
      },
      "permalink": "205-N-Columbia-Dr-Apt-1_West-Columbia_TX_77486_M95259-33802",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": true,
        "dogs_small": true
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/4aba8f8624752f2627945e65e5dd74c3l-m2085725881s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/4aba8f8624752f2627945e65e5dd74c3l-m1598003217s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/4aba8f8624752f2627945e65e5dd74c3l-m2085725881s.jpg"
      },
      "products": null,
      "property_id": "9525933802",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "RNTL",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": null
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "Furnished: Yes"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: Central Air",
            "Heating Features: Forced Air"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Parking Features: Off Street, On-Street"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Exterior",
          "text": [
            "View: Sea view"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "Pool",
            "Gated Property",
            "Grill"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Security Deposit: 100",
            "Rent Frequency: Monthly"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Availability Date: 2025-04-29",
            "Property Subtype: Single Family Home",
            "Source System Name: C2C"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_unit"
      },
      "list_date": "2024-12-17T00:05:24.000000Z",
      "list_price": 8000,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2976440037",
      "location": {
        "address": {
          "city": "Brazoria",
          "coordinate": {
            "lat": 29.04962,
            "lon": -95.635307
          },
          "country": "USA",
          "line": "4765 County Road 747A",
          "postal_code": "77422",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2976440037",
            "status": "for_rent"
          },
          {
            "listing_id": "2949254174",
            "status": "off_market"
          },
          {
            "listing_id": "2953944302",
            "status": "sold"
          },
          {
            "listing_id": "540881603",
            "status": "off_market"
          },
          {
            "listing_id": "540871983",
            "status": "off_market"
          },
          {
            "listing_id": "522348895",
            "status": "off_market"
          }
        ]
      },
      "permalink": "4765-County-Road-747A_Brazoria_TX_77422_M76869-76775",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": null,
        "dogs_small": null
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/023367ad6c60c4eb6a1ac69a4160e56dl-m2221223778s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/023367ad6c60c4eb6a1ac69a4160e56dl-m2527390758s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/023367ad6c60c4eb6a1ac69a4160e56dl-m2221223778s.jpg"
      },
      "products": null,
      "property_id": "7686976775",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "HOMD",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Bailes Real Estate",
            "phones": [
              {
                "ext": null,
                "number": "9792155390",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(979) 215-5390",
              "primary": true,
              "trackable": null,
              "type": "Home"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Bailes Real Estate",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1249,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1979
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 11 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 3",
            "LivingRoom, UtilityRoom",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "PrimaryBedroom: 11 x 12",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "BreakfastBar",
            "DoubleVanity",
            "KitchenFamilyRoomCombo",
            "TubShower"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Dishwasher",
            "Refrigerator",
            "Washer"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: StreetLevel",
            "Lot Size Acres: 0.204",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 8886"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: WEST COLUMBIA ELEMENTARY",
            "Elementary School District: 10 - Columbia-Brazoria",
            "High School: COLUMBIA HIGH SCHOOL",
            "High School District: 10 - Columbia-Brazoria",
            "Middle School: WEST BRAZOS JUNIOR HIGH",
            "Middle or Junior School District: 10 - Columbia-Brazoria"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2025-04-15",
            "Directions: FROM HWY 36 TAKE W. BRAZOS AVE. FOR APPROX. 0.2 MILES, TURN LEFT ONTO DRAEGER DR, HOME IS APPROX. 230FT DOWN ON THE RIGHT.",
            "Restrictions: NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: Crocker Heights",
            "Parcel Number: 3075-0203-000",
            "Postal City: West Columbia",
            "Postal Code Plus 4: 2620",
            "Subdivision: Crocker Heights",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1249",
            "Year Built: 1979",
            "Building Area Total: 1249",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 46",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-02T00:58:16.000000Z",
      "list_price": 2000,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980042709",
      "location": {
        "address": {
          "city": "West Columbia",
          "coordinate": {
            "lat": 29.146846,
            "lon": -95.654021
          },
          "country": "USA",
          "line": "108 Draeger Dr",
          "postal_code": "77486",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980042709",
            "status": "for_rent"
          },
          {
            "listing_id": "2974582109",
            "status": "off_market"
          }
        ]
      },
      "permalink": "108-Draeger-Dr_West-Columbia_TX_77486_M87846-91946",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/a73d11ca7ab49f208d1f7a5bf36a7475l-m4286441787s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/a73d11ca7ab49f208d1f7a5bf36a7475l-m1127585326s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/a73d11ca7ab49f208d1f7a5bf36a7475l-m4286441787s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "8784691946",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "SG Management, LLC",
            "phones": [
              {
                "ext": null,
                "number": "7137726262",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "7133694362",
              "primary": true,
              "trackable": null,
              "type": "Other"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "SG Management, LLC",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": null,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2015
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 16 x 15",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 3",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 10 x 10 x First",
            "PrimaryBedroom: 16 x 15",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Waterfront and Water Access",
          "parent_category": "Exterior",
          "text": [
            "Lake",
            "LakeFront",
            "Waterfront"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Views, Waterfront"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Exterior",
          "text": [
            "View: Lake, Water"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Association Name: Shannon Property Management",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: CARTER ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: GEORGE RANCH HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: READING JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "CommunityPool",
            "Community Features: CommunityPool"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-04-08",
            "Directions: From Hwy 59 South, turn left onto 762, right onto 2977, left on Reading Road, left on Rain Meadow, left on Bonbrook Bend Ln, right on Birthsel Bend Ln, which curves and becomes Conchola Ln. Right on Harmony Lake Lane",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: BONBROOK PLANTATION NORTH SEC 9",
            "Parcel Number: 1650-09-003-0020-901",
            "Postal City: Richmond",
            "Subdivision: BONBROOK PLANTATION NORTH SEC 9",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Year Built: 2015",
            "Property Age: 10",
            "Year Built Source: PublicRecords"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-09T00:54:48.000000Z",
      "list_price": 2100,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980338229",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.535135,
            "lon": -95.71629
          },
          "country": "USA",
          "line": "9430 Harmony Lake Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980338229",
            "status": "for_rent"
          },
          {
            "listing_id": "2980350078",
            "status": "off_market"
          },
          {
            "listing_id": "2974116357",
            "status": "sold"
          },
          {
            "listing_id": "623803291",
            "status": "off_market"
          },
          {
            "listing_id": "624143419",
            "status": "off_market"
          },
          {
            "listing_id": "609193243",
            "status": "sold"
          }
        ]
      },
      "permalink": "9430-Harmony-Lake-Ln_Richmond_TX_77469_M82821-55605",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/a405f5bf00cf41c1e9a97b97c44e046cl-m1990513567s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/a405f5bf00cf41c1e9a97b97c44e046cl-m1310523589s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/a405f5bf00cf41c1e9a97b97c44e046cl-m1990513567s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "8282155605",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": [
        {
          "href": "https://shannonpropertymanagement.com/for-rent"
        }
      ]
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "1St Texas Realty Services",
            "phones": [
              {
                "ext": null,
                "number": "7138711600",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(713) 871-1600",
              "primary": true,
              "trackable": null,
              "type": "Office"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "1St Texas Realty Services",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "1",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1008,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1965
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 10 x 16",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 3",
            "Bedroom: 10 x 14 x First",
            "Bedroom: 11 x 14 x First",
            "Bedroom: 10 x 14 x First",
            "Bedroom: 11 x 14 x First",
            "PrimaryBedroom: 10 x 16",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 1",
            "Full Bathrooms: 1"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Size Acres: 0.1148",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 5001"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: SWEENY ELEMENTARY SCHOOL",
            "Elementary School District: 51 - Sweeny",
            "High School: SWEENY HIGH SCHOOL",
            "High School District: 51 - Sweeny",
            "Middle School: SWEENY JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 51 - Sweeny"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Brazoria",
            "Availability Date: 2024-12-06",
            "Directions: From 332 go east on 524, turn left on North Martin Luther King Street, left on West 6th Street.",
            "Restrictions: NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 5",
            "MLS Area Minor: West of the Brazos",
            "Source Neighborhood: Sweeny",
            "Parcel Number: 7885-0116-000",
            "Postal City: Sweeny",
            "Postal Code Plus 4: 1619",
            "Subdivision: Sweeny",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1008",
            "Year Built: 1965",
            "Building Area Total: 1008",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 60",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2024-12-07T03:02:48.000000Z",
      "list_price": 1299,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2975903262",
      "location": {
        "address": {
          "city": "Sweeny",
          "coordinate": {
            "lat": 29.038099,
            "lon": -95.705915
          },
          "country": "USA",
          "line": "609 W 6th St",
          "postal_code": "77480",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48039",
          "name": "Brazoria"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2975903236",
            "status": "for_sale"
          },
          {
            "listing_id": "2980272953",
            "status": "for_sale"
          },
          {
            "listing_id": "2975903262",
            "status": "for_rent"
          },
          {
            "listing_id": "2945723922",
            "status": "off_market"
          },
          {
            "listing_id": "2945723617",
            "status": "off_market"
          },
          {
            "listing_id": "527415067",
            "status": "off_market"
          }
        ]
      },
      "permalink": "609-W-6th-St_Sweeny_TX_77480_M75647-25193",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/c76142f4b4ba415b6f2cec40405d9d0dl-m4189793624s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/c76142f4b4ba415b6f2cec40405d9d0dl-m2233242557s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/c76142f4b4ba415b6f2cec40405d9d0dl-m4189793624s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "7564725193",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Texas Premier Realty",
            "phones": [
              {
                "ext": null,
                "number": "8005449885",
                "primary": true,
                "trackable": null,
                "type": "Home"
              },
              {
                "ext": null,
                "number": "8005449885",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8327092540",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Texas Premier Realty",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "4.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 5,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 4476,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2000
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 5",
            "Primary Bedroom Dimensions: 17 x 15",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 14",
            "Bathroom: 9 x 5 x Second",
            "Bedroom: 15 x 13 x Second",
            "Bedroom: 15 x 13 x Second",
            "Bathroom: 19 x 17 x Second",
            "Bedroom: 14 x 13 x Second",
            "Bedroom: 19 x 15 x Second",
            "Bathroom: 10 x 7",
            "Bathroom Level: First",
            "Bathroom: 9 x 5 x Second",
            "Bedroom: 15 x 13 x Second",
            "Bedroom: 15 x 13 x Second",
            "Bathroom: 19 x 17 x Second",
            "Bedroom: 14 x 13 x Second",
            "Bedroom: 19 x 15 x Second",
            "PrimaryBathroom: 12 x 11",
            "PrimaryBathroom Level: First",
            "PrimaryBedroom: 17 x 15",
            "PrimaryBedroom Level: First",
            "Bathroom: 10 x 7",
            "Bathroom Level: First",
            "FamilyRoom: 18 x 15",
            "FamilyRoom Level: First",
            "Kitchen: 16 x 13",
            "Kitchen Level: First",
            "DiningRoom: 13 x 13",
            "DiningRoom Level: First",
            "Office: 11 x 15",
            "Office Level: First",
            "Family Room Dimensions: 18 x 15",
            "Office/Study Room Dimensions: 11 x 15",
            "Family Room Level: First",
            "Office/Study Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 5",
            "Full Bathrooms: 4",
            "1/2 Bathrooms: 1",
            "Primary Bathroom Dimensions: 12 x 11",
            "Primary Bathroom Level: First"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Microwave"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes",
            "Number of Fireplaces: 2"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 13 x 10",
            "Breakfast Room Level: First",
            "Dining Room Dimensions: 13 x 13",
            "Dining Room Level: First",
            "Kitchen Dimensions: 16 x 13",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared",
            "Lot Size Acres: 1.0227",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 44549"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ARREDONDO ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Pending",
            "County: Fort Bend",
            "Availability Date: 2025-03-31",
            "Directions: From I-69/US-59 (near Rosenberg/Richmond): Exit TX-762 toward Richmond. Turn east onto TX-762/Thompson Rd â€“ follow for about 3.5 miles. Turn left onto Austin St (TX-762 continues briefly through historic Richmond). Turn right onto Collins Rd. Turn left onto Lark Ln. 1211 Lark Ln will be on your right.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Blume Add",
            "Parcel Number: 1639-00-001-0150-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 7803",
            "Subdivision: Blume Add",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 4476",
            "Year Built: 2000",
            "Building Area Total: 4476",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 25",
            "Levels or Stories: 2",
            "Building Total Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": true
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-27T10:36:34.000000Z",
      "list_price": 2800,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981054855",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.529892,
            "lon": -95.750641
          },
          "country": "USA",
          "line": "1211 Lark Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981054855",
            "status": "for_rent"
          }
        ]
      },
      "permalink": "1211-Lark-Ln_Richmond_TX_77469_M84995-53406",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/6287df6c4f873c071444cb6652c74a4dl-m2623653457s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/6287df6c4f873c071444cb6652c74a4dl-m3913214386s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/6287df6c4f873c071444cb6652c74a4dl-m2623653457s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "listing_agent_product",
          "core.broker"
        ]
      },
      "property_id": "8499553406",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "5Th Stream Realty",
            "phones": [
              {
                "ext": null,
                "number": "2148680707",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "5Th Stream Realty",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2397,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2023
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 14 x 16",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 8",
            "FamilyRoom, Office",
            "Bedroom: 13 x 12",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Kitchen: 19 x 11",
            "Kitchen Level: First",
            "DiningRoom: 9 x 16",
            "DiningRoom Level: First",
            "FamilyRoom: 14 x 14",
            "FamilyRoom Level: First",
            "Office: 14 x 11",
            "Office Level: First",
            "Bedroom: 13 x 12",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "Bedroom: 12 x 11",
            "Bedroom Level: First",
            "PrimaryBedroom: 14 x 16",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 14 x 14",
            "Office/Study Room Dimensions: 14 x 11",
            "Family Room Level: First",
            "Office/Study Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 3"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "KitchenIsland",
            "KitchenFamilyRoomCombo",
            "SelfClosingCabinetDoors",
            "WalkInPantry",
            "Flooring: Plank, Vinyl"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "GasCooktop",
            "Disposal",
            "Microwave",
            "Dryer",
            "Refrigerator",
            "Washer",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 9 x 16",
            "Dining Room Level: First",
            "Kitchen Dimensions: 19 x 11",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "SprinklerIrrigation",
            "Patio",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: ADRIANE MATHEWS GRAY ELEMENTARY",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-01-01",
            "Directions: From I-69/59, exit Reading Rd, turn left onto Reading Rd, turn right onto Minonite Rd, turn right onto Powerline Rd, turn left onto Stone Cyn Dr, turn right onto Sleepy Fox Ln, and turn right onto Elk Grove Ln. House will be on the right.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Still Creek Ranch",
            "Postal City: Richmond",
            "Subdivision: Still Creek Ranch",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2397",
            "Year Built: 2023",
            "Building Area Total: 2397",
            "Direction Faces: Southwest",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 2",
            "Levels or Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Security Features: FireSprinklerSystem, SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-01-10T13:33:42.000000Z",
      "list_price": 2500,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2977069821",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.484684,
            "lon": -95.764877
          },
          "country": "USA",
          "line": "7927 Elk Grove Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2977069821",
            "status": "for_rent"
          },
          {
            "listing_id": "2960739752",
            "status": "sold"
          }
        ]
      },
      "permalink": "7927-Elk-Grove-Ln_Richmond_TX_77469_M94668-50354",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/607b07edf8f04d37367afcc221c93cb7l-m3334808648s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/607b07edf8f04d37367afcc221c93cb7l-m3191155518s.jpg"
        }
      ],
      "price_reduced_amount": 50,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/607b07edf8f04d37367afcc221c93cb7l-m3334808648s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9466850354",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": [
              {
                "ext": null,
                "number": "8886599596",
                "primary": false,
                "trackable": null,
                "type": "primary"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1219,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2.0",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Cats Allowed: Yes",
            "Dogs Allowed: Yes",
            "Large Dogs Allowed: Yes",
            "Small Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Property Type: SingleFamily",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1219",
            "SqFt Minimum: 1219.00"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_unit"
      },
      "list_date": "2025-03-21T15:07:32.000000Z",
      "list_price": 1795,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979640060",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.4976,
            "lon": -95.772495
          },
          "country": "USA",
          "line": "6722 Clover Walk Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979640060",
            "status": "for_rent"
          },
          {
            "listing_id": "2954118285",
            "status": "off_market"
          },
          {
            "listing_id": "2954094572",
            "status": "off_market"
          },
          {
            "listing_id": "2926165200",
            "status": "off_market"
          },
          {
            "listing_id": "541076947",
            "status": "sold"
          }
        ]
      },
      "permalink": "6722-Clover-Walk-Ln_Richmond_TX_77469_M71545-21783",
      "pet_policy": {
        "cats": true,
        "dogs": true,
        "dogs_large": true,
        "dogs_small": true
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/4747275b494d2680f5324547be6e0fddl-m1659022455s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/4747275b494d2680f5324547be6e0fddl-m2755245263s.jpg"
        }
      ],
      "price_reduced_amount": 30,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/4747275b494d2680f5324547be6e0fddl-m1659022455s.jpg"
      },
      "products": null,
      "property_id": "7154521783",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "RNTL",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "RE MAX Opportunities",
            "phones": [
              {
                "ext": null,
                "number": "9797935454",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2816108653",
              "primary": true,
              "trackable": null,
              "type": "Office"
            },
            {
              "ext": null,
              "number": "2816108653",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "RE MAX Opportunities",
          "photo": "https://ap.rdcpix.com/9712048eb423de0b211cb58e2c1ee7f0o-b2274465705s.jpg",
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2424,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 1940
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "Bedroom: 13 x 13 x First",
            "Bedroom: 16 x 11 x First",
            "Bedroom: 13 x 13 x First",
            "Bedroom: 15 x 11 x First",
            "LivingRoom: 20 x 13",
            "LivingRoom Level: First",
            "Bedroom: 13 x 13 x First",
            "Bedroom: 16 x 11 x First",
            "Bedroom: 13 x 13 x First",
            "Bedroom: 15 x 11 x First",
            "LivingRoom: 15 x 11",
            "LivingRoom Level: First",
            "DiningRoom: 13 x 13",
            "DiningRoom Level: First",
            "LivingRoom: 20 x 13",
            "LivingRoom Level: First",
            "Kitchen: 14 x 11",
            "Kitchen Level: First",
            "Living Room Dimensions: 15 x 11",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer",
            "Dishwasher",
            "ElectricCooktop",
            "ElectricOven",
            "Refrigerator",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: WindowUnits",
            "Heating Features: Propane, WindowUnit",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 12 x 10",
            "Breakfast Room Level: First",
            "Dining Room Dimensions: 13 x 13",
            "Dining Room Level: First",
            "Kitchen Dimensions: 14 x 11",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "Flooring: Carpet, Vinyl"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Carport Spaces: 2",
            "Parking Features: DetachedCarport"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Cleared",
            "Lot Size Acres: 2.0",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 87120"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: No, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2024-12-16",
            "Directions: From FM 1994, turn on Brumbelow Rd. Take a left on Beard Rd and property is on the right. No sign in the yard.",
            "Restrictions: NoRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: J C Phillips",
            "Parcel Number: 0527-00-000-0031-906",
            "Postal City: Needville",
            "Postal Code Plus 4: 9404",
            "Subdivision: J C Phillips",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2424",
            "Year Built: 1940",
            "Building Area Total: 2424",
            "Levels: OneAndOneHalf",
            "Living Area Source: Appraiser",
            "Property Age: 85",
            "Building Total Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Water Source: Well"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2024-12-17T00:29:39.000000Z",
      "list_price": 1750,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2976441308",
      "location": {
        "address": {
          "city": "Needville",
          "coordinate": {
            "lat": 29.351978,
            "lon": -95.697214
          },
          "country": "USA",
          "line": "9911 Beard Rd",
          "postal_code": "77461",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2976441308",
            "status": "for_rent"
          },
          {
            "listing_id": "2958593088",
            "status": "off_market"
          }
        ]
      },
      "permalink": "9911-Beard-Rd_Needville_TX_77461_M92009-89557",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/074922846f4a90a4c5bb22ab50d2486fl-b4091522275s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/074922846f4a90a4c5bb22ab50d2486fl-b1230705848s.jpg"
        }
      ],
      "price_reduced_amount": 50,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/074922846f4a90a4c5bb22ab50d2486fl-b4091522275s.jpg"
      },
      "products": {
        "brand_name": "advantage_brand",
        "products": [
          "core.agent",
          "core.broker",
          "listing_owner_brand.broker"
        ]
      },
      "property_id": "9200989557",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Alphamax Realty Inc.",
            "phones": [
              {
                "ext": null,
                "number": "7132989685",
                "primary": true,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "(832) 480-0848",
              "primary": true,
              "trackable": null,
              "type": "Office"
            }
          ],
          "rental_management": null,
          "type": "seller"
        },
        {
          "office": {
            "name": "Alphamax Realty Inc.",
            "phones": [
              {
                "ext": null,
                "number": "7132989685",
                "primary": false,
                "trackable": null,
                "type": "Mobile"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8322753013",
              "primary": true,
              "trackable": null,
              "type": "Cell"
            }
          ],
          "rental_management": null,
          "type": "co_seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Alphamax Realty Inc.",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2226,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2023
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 12 x 15",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 9",
            "FamilyRoom, GameRoom, LivingRoom, Office, UtilityRoom",
            "Bedroom: 11 x 14",
            "Bedroom Level: Second",
            "Bedroom: 11 x 14",
            "Bedroom Level: Second",
            "Bedroom: 11 x 10",
            "Bedroom Level: Second",
            "GameRoom: 11 x 13",
            "GameRoom Level: Second",
            "Bedroom: 11 x 14",
            "Bedroom Level: Second",
            "Bedroom: 11 x 14",
            "Bedroom Level: Second",
            "Bedroom: 11 x 10",
            "Bedroom Level: Second",
            "Office: 10 x 9",
            "Office Level: First",
            "Kitchen: 11 x 15",
            "Kitchen Level: First",
            "FamilyRoom: 15 x 15",
            "FamilyRoom Level: First",
            "PrimaryBedroom: 12 x 15",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 15 x 15",
            "Game/Recreation Room Dimensions: 11 x 13",
            "Office/Study Room Dimensions: 10 x 9",
            "Family Room Level: First",
            "Game/Recreation Room Level: Second",
            "Office/Study Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 2",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "DoubleVanity",
            "KitchenIsland",
            "Pantry",
            "Flooring: Laminate, Vinyl"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "ElectricOven",
            "Disposal",
            "GasRange",
            "Microwave",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 11 x 10",
            "Breakfast Room Level: First",
            "Kitchen Dimensions: 11 x 15",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "FullyFenced",
            "Fence",
            "Patio",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage, GarageDoorOpener"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1652893",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 7200"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:case by case."
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: MEYER ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-04-26",
            "Directions: Take I-69 South and exit at 2218/BF Terry Blvd. Turn left onto 2218, then left onto Koeblen Rd. Next, Turn left toward Knox Lndg Dr. Turn right at the 1st cross street onto Knox Lndg Dr. Turn left onto Moss Hl Rd. The house will be on the left",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sendero Sec 8",
            "Parcel Number: 6750-08-003-0120-901",
            "Postal City: Rosenberg",
            "Subdivision: Sendero Sec 8",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2226",
            "Year Built: 2023",
            "Building Area Total: 2226",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 2",
            "Levels or Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Security Features: SecuritySystemOwned"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-26T20:09:03.000000Z",
      "list_price": 2550,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981047876",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.513762,
            "lon": -95.772713
          },
          "country": "USA",
          "line": "3720 Moss Hill Rd",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981047876",
            "status": "for_rent"
          }
        ]
      },
      "permalink": "3720-Moss-Hill-Rd_Rosenberg_TX_77469_M92392-89901",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/c81f3ed331decb9e8ace619893e3868el-m494779531s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/c81f3ed331decb9e8ace619893e3868el-m3396269467s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/c81f3ed331decb9e8ace619893e3868el-m494779531s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9239289901",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Tab@Home",
            "phones": null
          },
          "phones": [
            {
              "ext": null,
              "number": "8327904003",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Tab@Home",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 1562,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2021
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 12 x 11",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 3",
            "Bedroom: 10 x 11 x First",
            "Bedroom: 10 x 11 x First",
            "Bedroom: 10 x 11 x First",
            "Bedroom: 10 x 11 x First",
            "PrimaryBedroom: 12 x 11",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric, Gas",
            "Heating Features: Central, Electric, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.1652893",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 7200"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: MEYER ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2024-03-02",
            "Directions: Make a right on FM 359 , make a right on FM 723, Left on J.Meyer Rd , left on Seabourne Landing Dr , Right on Bluestem Prairie Dr , right on Monarch Bend Lane",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Seabourne Landing",
            "Parcel Number: 6776-01-002-0210-901",
            "Postal City: Rosenberg",
            "Subdivision: Seabourne Landing",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 1562",
            "Year Built: 2021",
            "Building Area Total: 1562",
            "Levels: One",
            "Living Area Source: Builder",
            "Property Age: 4",
            "Levels or Stories: 1",
            "Year Built Source: Builder",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-30T20:48:47.000000Z",
      "list_price": 2049,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2981170304",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.514143,
            "lon": -95.799874
          },
          "country": "USA",
          "line": "4714 Monarch Bend Ln",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2981170304",
            "status": "for_rent"
          },
          {
            "listing_id": "2964660915",
            "status": "off_market"
          }
        ]
      },
      "permalink": "4714-Monarch-Bend-Ln_Rosenberg_TX_77469_M98201-21985",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/79602a1d96e563e850a88e02f1f91409l-m1484605508s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/79602a1d96e563e850a88e02f1f91409l-m1077221201s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/79602a1d96e563e850a88e02f1f91409l-m1484605508s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "core.agent"
        ]
      },
      "property_id": "9820121985",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Compass RE Texas LLC - Katy",
            "phones": [
              {
                "ext": null,
                "number": "2817515678",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2819689471",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_PHONE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Compass RE Texas LLC - Katy",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 3,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2036,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2004
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 3",
            "Primary Bedroom Dimensions: 17 x 12",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 6",
            "Bedroom: 11 x 10",
            "Bedroom Level: First",
            "Bedroom: 10 x 10",
            "Bedroom Level: First",
            "FamilyRoom: 23 x 16",
            "FamilyRoom Level: First",
            "DiningRoom: 16 x 14",
            "DiningRoom Level: First",
            "Bedroom: 11 x 10",
            "Bedroom Level: First",
            "Bedroom: 10 x 10",
            "Bedroom Level: First",
            "PrimaryBedroom: 17 x 12",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 23 x 16",
            "Family Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "DoubleVanity",
            "EntranceFoyer",
            "GraniteCounters",
            "HighCeilings",
            "KitchenIsland",
            "TubShower",
            "Vanity",
            "WalkInPantry",
            "WindowTreatments",
            "CeilingFans",
            "Furnished Description: Unfurnished",
            "Flooring: Carpet, Tile, Wood",
            "Window Features: WindowCoverings"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "ElectricCooktop",
            "ElectricOven",
            "Disposal",
            "Microwave",
            "Refrigerator"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Electric",
            "Heating: Yes",
            "Number of Fireplaces: 1"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Breakfast Room Dimensions: 10 x 10",
            "Breakfast Room Level: First",
            "Dining Room Dimensions: 16 x 14",
            "Dining Room Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "Patio",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision",
            "Lot Size Acres: 0.2375",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 10346"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$500 pet deposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: NEEDVILLE ELEMENTARY SCHOOL",
            "Elementary School District: 38 - Needville",
            "High School: NEEDVILLE HIGH SCHOOL",
            "High School District: 38 - Needville",
            "Middle School: NEEDVILLE JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 38 - Needville"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-05-01",
            "Directions: From TX-36 in Needville, head SW on School St. Turn left on Kostelnik St. Continue straight on Highland Pointe Dr. Turn right onto Doveswood Cir. The home will be on your left.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "Source Neighborhood: Highland Pointe",
            "Parcel Number: 4042-01-001-0140-906",
            "Postal City: Needville",
            "Postal Code Plus 4: 6500",
            "Public Survey Section: 1",
            "Subdivision: Highland Pointe",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2036",
            "Year Built: 2004",
            "Building Area Total: 2036",
            "Direction Faces: Northwest",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 21",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Security Features: SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": true,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-04-21T22:28:41.000000Z",
      "list_price": 2500,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2980819332",
      "location": {
        "address": {
          "city": "Needville",
          "coordinate": {
            "lat": 29.389126,
            "lon": -95.83916
          },
          "country": "USA",
          "line": "3807 Doveswood Cir",
          "postal_code": "77461",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980819332",
            "status": "for_rent"
          },
          {
            "listing_id": "2935033916",
            "status": "off_market"
          },
          {
            "listing_id": "2953403714",
            "status": "off_market"
          },
          {
            "listing_id": "2652258375",
            "status": "off_market"
          },
          {
            "listing_id": "510628887",
            "status": "sold"
          }
        ]
      },
      "permalink": "3807-Doveswood-Cir_Needville_TX_77461_M87036-28158",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/b443ee837186ea60ca234d62041b9ea7l-m3467602213s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/b443ee837186ea60ca234d62041b9ea7l-m963180832s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/b443ee837186ea60ca234d62041b9ea7l-m3467602213s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "8703628158",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Keller Williams Realty -Sw",
            "phones": [
              {
                "ext": null,
                "number": "2812650123",
                "primary": true,
                "trackable": null,
                "type": "Office"
              },
              {
                "ext": null,
                "number": "2812650123",
                "primary": false,
                "trackable": null,
                "type": "Fax"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8324446676",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_MOBILE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Keller Williams Realty -Sw",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2504,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2023
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Bedrooms Possible: 4",
            "Primary Bedroom Dimensions: 18 x 14",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 8",
            "Bedroom: 12 x 12",
            "Bedroom Level: First",
            "Bedroom: 13 x 11",
            "Bedroom Level: First",
            "Bedroom: 14 x 11",
            "Bedroom Level: First",
            "Office: 12 x 12",
            "Office Level: First",
            "DiningRoom: 13 x 10",
            "DiningRoom Level: First",
            "Kitchen: 13 x 10",
            "Kitchen Level: First",
            "FamilyRoom: 21 x 17",
            "FamilyRoom Level: First",
            "Bedroom: 12 x 12",
            "Bedroom Level: First",
            "Bedroom: 13 x 11",
            "Bedroom Level: First",
            "Bedroom: 14 x 11",
            "Bedroom Level: First",
            "PrimaryBedroom: 18 x 14",
            "PrimaryBedroom Level: First",
            "Family Room Dimensions: 21 x 17",
            "Office/Study Room Dimensions: 12 x 12",
            "Family Room Level: First",
            "Office/Study Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 3",
            "Full Bathrooms: 3"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "BreakfastBar",
            "DoubleVanity",
            "HighCeilings",
            "KitchenIsland",
            "KitchenFamilyRoomCombo",
            "Pantry",
            "SoakingTub",
            "SeparateShower",
            "TubShower",
            "Vanity",
            "WalkInPantry",
            "WindowTreatments",
            "CeilingFans",
            "Flooring: Carpet, Tile",
            "Window Features: WindowCoverings"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "ElectricOven",
            "GasCooktop",
            "Disposal",
            "Microwave",
            "Dryer",
            "Refrigerator",
            "Washer",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Fireplace Features: Gas",
            "Heating Features: Central, Gas",
            "Heating: Yes",
            "Number of Fireplaces: 1"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 13 x 10",
            "Dining Room Level: First",
            "Kitchen Dimensions: 13 x 10",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "Patio",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio",
            "Road Surface Type: Concrete"
          ]
        },
        {
          "category": "Pool and Spa",
          "parent_category": "Exterior",
          "text": [
            "Pool Features: Association"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Driveway, Garage, GarageDoorOpener"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: CornerLot, Subdivision",
            "Lot Size Acres: 0.2324",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 10123"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Association Amenities: Clubhouse, Playground, Pool, Trails",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$250 non-refundable and $250 refundable deposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: CARTER ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: GEORGE RANCH HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: READING JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "CommunityPool",
            "Curbs",
            "Community Features: CommunityPool, Curbs"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-02-01",
            "Directions: From 59 & Crabb River Rd. South on Crabb River Rd. Cross Railroad Tracks at 762. Right at Berdett Rd. Left at A Myers Rd. Left at Laurabee Dr. Right at Stonecreek Village Dr. Left at Stonecreek Village Drive. Left at Onyx Fls Drive. 5503 Onyx Falls is the corner home on the Left.",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Stonecreek Estates Sec 8",
            "Parcel Number: 7506-08-002-0520-901",
            "Postal City: Richmond",
            "Subdivision: Stonecreek Estates Sec 8",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2504",
            "Year Built: 2023",
            "Building Area Total: 2504",
            "Levels: One",
            "Living Area Source: Builder",
            "Property Age: 2",
            "Levels or Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached, Traditional"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Features",
          "text": [
            "Green Energy Efficient: Lighting",
            "Security Features: SecuritySystemOwned, SmokeDetectors"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-01-19T14:47:39.000000Z",
      "list_price": 3150,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2977405847",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.506887,
            "lon": -95.72295
          },
          "country": "USA",
          "line": "5503 Onyx Falls Dr",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2980164400",
            "status": "for_sale"
          },
          {
            "listing_id": "2977405847",
            "status": "for_rent"
          },
          {
            "listing_id": "2975224392",
            "status": "off_market"
          }
        ]
      },
      "permalink": "5503-Onyx-Falls-Dr_Richmond_TX_77469_M95124-89539",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/de60be965969a7bda1b326a3ee5c2b9el-m581446421s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/de60be965969a7bda1b326a3ee5c2b9el-m3338103202s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/de60be965969a7bda1b326a3ee5c2b9el-m581446421s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9512489539",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Keller Williams Realty Metropolitan",
            "phones": [
              {
                "ext": null,
                "number": "7136218001",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "8325885842",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "seller"
        },
        {
          "office": {
            "name": "Keller Williams Realty Metropolitan",
            "phones": [
              {
                "ext": null,
                "number": "7136218001",
                "primary": false,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "7132917583",
              "primary": true,
              "trackable": null,
              "type": "Mobile"
            }
          ],
          "rental_management": null,
          "type": "co_seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Keller Williams Realty Metropolitan",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "3.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2538,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2018
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 16 x 16",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 8",
            "GameRoom, UtilityRoom, HalfBath",
            "Bedroom: 11 x 11 x Second",
            "Bedroom: 11 x 11",
            "Bedroom Level: Second",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "Bedroom: 11 x 11 x Second",
            "GameRoom: 14 x 14",
            "GameRoom Level: Second",
            "Bedroom: 11 x 11",
            "Bedroom Level: Second",
            "Kitchen: 16 x 14",
            "Kitchen Level: First",
            "Bedroom: 12 x 12",
            "Bedroom Level: Second",
            "DiningRoom: 14 x 10",
            "DiningRoom Level: First",
            "PrimaryBedroom: 16 x 16",
            "PrimaryBedroom Level: First",
            "LivingRoom: 23 x 18",
            "LivingRoom Level: First",
            "Game/Recreation Room Dimensions: 14 x 14",
            "Living Room Dimensions: 23 x 18",
            "Game/Recreation Room Level: Second",
            "Living Room Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 4",
            "Full Bathrooms: 3",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Interior Features",
          "parent_category": "Interior",
          "text": [
            "BreakfastBar",
            "DoubleVanity",
            "HighCeilings",
            "KitchenIsland",
            "KitchenFamilyRoomCombo",
            "BathInPrimaryBedroom",
            "SoakingTub",
            "SeparateShower",
            "CeilingFans",
            "Flooring: Carpet, Tile"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dishwasher",
            "ElectricOven",
            "Disposal",
            "GasRange",
            "Microwave",
            "Laundry Features: WasherHookup, ElectricDryerHookup"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Kitchen and Dining",
          "parent_category": "Interior",
          "text": [
            "Dining Room Dimensions: 14 x 10",
            "Dining Room Level: First",
            "Kitchen Dimensions: 16 x 14",
            "Kitchen Level: First"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Deck",
            "Fence",
            "Patio",
            "Fencing: BackYard",
            "Patio And Porch Features: Deck, Patio"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: Subdivision, Views",
            "Lot Size Acres: 0.1911",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 8324"
          ]
        },
        {
          "category": "Home Features",
          "parent_category": "Exterior",
          "text": [
            "View: Lake, Water",
            "Security Features: Prewired, SmokeDetectors"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit",
            "Pet Description: PetDepositDescription:$500.00"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: CARTER ELEMENTARY SCHOOL",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: GEORGE RANCH HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: READING JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "CommunityPool",
            "Community Features: CommunityPool"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: TwelveMonths"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-03-27",
            "Directions: Take I-69 South going towards Richmond/Rosenberg. Take exit 103 to Richmond Parkway. Turn left on Richmond Parkway. Turn left on Rohan Drive. Turn right on Fuchsia Drive. Turn left on Harvest Hill Drive. Turn right on Downing Street. Home will be on your left.",
            "Restrictions: NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Bonbrook Plantation South Sec 9",
            "Parcel Number: 1651-09-003-0030-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 2388",
            "Subdivision: Bonbrook Plantation South Sec 9",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2538",
            "Year Built: 2018",
            "Building Area Total: 2538",
            "Levels: Two",
            "Living Area Source: Appraiser",
            "Property Age: 7",
            "Levels or Stories: 2",
            "Building Total Stories: 2",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-28T14:46:54.000000Z",
      "list_price": 2900,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979893405",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.523384,
            "lon": -95.729181
          },
          "country": "USA",
          "line": "9011 Downing St",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979893405",
            "status": "for_rent"
          },
          {
            "listing_id": "2977090698",
            "status": "off_market"
          },
          {
            "listing_id": "2972405324",
            "status": "off_market"
          },
          {
            "listing_id": "2978051047",
            "status": "off_market"
          },
          {
            "listing_id": "2934728258",
            "status": "off_market"
          },
          {
            "listing_id": "638391895",
            "status": "sold"
          }
        ]
      },
      "permalink": "9011-Downing-St_Richmond_TX_77469_M72057-56614",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/2b143db2244b46794f74febdf8d4caf4l-m4010565573s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/2b143db2244b46794f74febdf8d4caf4l-m3722713314s.jpg"
        }
      ],
      "price_reduced_amount": 100,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/2b143db2244b46794f74febdf8d4caf4l-m4010565573s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "7205756614",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": null,
            "phones": [
              {
                "ext": null,
                "number": "8005086821",
                "primary": false,
                "trackable": null,
                "type": "primary"
              }
            ]
          },
          "phones": null,
          "rental_management": null,
          "type": "management"
        },
        {
          "office": null,
          "phones": null,
          "rental_management": null,
          "type": "unit_rental"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": null,
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "4.5",
        "baths_max": null,
        "baths_min": null,
        "beds": 5,
        "beds_max": null,
        "beds_min": null,
        "garage": null,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 3432,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": null
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 5"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 4.5",
            "Full Bathrooms: 4",
            "1/2 Bathrooms: 1"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: Central Air",
            "Heating Features: electric"
          ]
        },
        {
          "category": "Appliances",
          "parent_category": "Interior",
          "text": [
            "Dryer: Yes",
            "Washer: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Assigned Spaces: yes"
          ]
        },
        {
          "category": "Exterior and Lot Features",
          "parent_category": "Exterior",
          "text": [
            "Lawn",
            "Garage",
            "Lawn: Yes"
          ]
        },
        {
          "category": "Amenities and Community Features",
          "parent_category": "Community",
          "text": [
            "Small Dogs Allowed",
            "Large Dogs Allowed",
            "Dishwasher",
            "Dryer",
            "Washer",
            "Central Air",
            "Fridge",
            "Microwave",
            "Stove"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: 12",
            "Security Deposit: 2800"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Dogs Allowed: Yes",
            "Large Dogs Allowed: Yes",
            "Small Dogs Allowed: Yes"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Tour Scheduling Available: no",
            "Availability Date: 2025-03-07",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Listing Information",
          "parent_category": "Listing",
          "text": [
            "Landlord Full Name: NCDG Realty & Property Management",
            "Landlord Verified: Yes"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "SqFt Minimum: 3432"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": false,
        "is_schedule_a_tour": false,
        "lead_type": "rental_go_direct"
      },
      "list_date": "2025-03-07T22:04:21.000000Z",
      "list_price": 2800,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979129286",
      "location": {
        "address": {
          "city": "Rosenberg",
          "coordinate": {
            "lat": 29.489822,
            "lon": -95.824161
          },
          "country": "USA",
          "line": "3430 Majestic Pine Ln",
          "postal_code": "77471",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979129286",
            "status": "for_rent"
          },
          {
            "listing_id": "2954495596",
            "status": "sold"
          }
        ]
      },
      "permalink": "3430-Majestic-Pine-Ln_Rosenberg_TX_77471_M95037-05156",
      "pet_policy": {
        "cats": false,
        "dogs": true,
        "dogs_large": true,
        "dogs_small": true
      },
      "photos": [
        {
          "href": "https://ap.rdcpix.com/adba193c933b1e872e0277e63511cc76l-m987176907s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/adba193c933b1e872e0277e63511cc76l-m2892088037s.jpg"
        }
      ],
      "price_reduced_amount": 100,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/adba193c933b1e872e0277e63511cc76l-m987176907s.jpg"
      },
      "products": {
        "brand_name": "basic_opt_in",
        "products": [
          "co_broke",
          "rentals_cost_per_lead_hybrid"
        ]
      },
      "property_id": "9503705156",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": "Syndicator Unit",
        "id": "AVAL",
        "type": "unit_rental"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    },
    {
      "advertisers": [
        {
          "office": {
            "name": "Realm Real Estate Professional",
            "phones": [
              {
                "ext": null,
                "number": "2813777300",
                "primary": true,
                "trackable": null,
                "type": "Office"
              }
            ]
          },
          "phones": [
            {
              "ext": null,
              "number": "2813777300",
              "primary": true,
              "trackable": null,
              "type": "BUSINESS_PHONE"
            }
          ],
          "rental_management": null,
          "type": "seller"
        }
      ],
      "application_url": null,
      "branding": [
        {
          "name": "Realm Real Estate Professional",
          "photo": null,
          "type": "Office"
        }
      ],
      "description": {
        "baths_consolidated": "2",
        "baths_max": null,
        "baths_min": null,
        "beds": 4,
        "beds_max": null,
        "beds_min": null,
        "garage": 2,
        "garage_max": null,
        "garage_min": null,
        "name": null,
        "sqft": 2150,
        "sqft_max": null,
        "sqft_min": null,
        "sub_type": null,
        "type": "single_family",
        "year_built": 2022
      },
      "details": [
        {
          "category": "Bedrooms",
          "parent_category": "Interior",
          "text": [
            "Bedrooms: 4",
            "Primary Bedroom Dimensions: 16 x 14",
            "Primary Bedroom Level: First"
          ]
        },
        {
          "category": "Other Rooms",
          "parent_category": "Interior",
          "text": [
            "Total Rooms: 4",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 12 x 11 x First",
            "Bedroom: 13 x 10 x First",
            "Bedroom: 11 x 10 x First",
            "Bedroom: 12 x 11 x First",
            "Bedroom: 13 x 10 x First",
            "PrimaryBedroom: 16 x 14",
            "PrimaryBedroom Level: First"
          ]
        },
        {
          "category": "Bathrooms",
          "parent_category": "Interior",
          "text": [
            "Total Bathrooms: 2",
            "Full Bathrooms: 2"
          ]
        },
        {
          "category": "Heating and Cooling",
          "parent_category": "Interior",
          "text": [
            "Cooling Features: CentralAir, Electric",
            "Heating Features: Central, Gas",
            "Heating: Yes"
          ]
        },
        {
          "category": "Garage and Parking",
          "parent_category": "Exterior",
          "text": [
            "Attached Garage: Yes",
            "Garage Spaces: 2",
            "Parking Features: Attached, Garage"
          ]
        },
        {
          "category": "Land Info",
          "parent_category": "Exterior",
          "text": [
            "Lot Description: CulDeSac",
            "Lot Size Acres: 0.1653",
            "Lot Size Source: Appraiser",
            "Lot Size Square Feet: 7200"
          ]
        },
        {
          "category": "Homeowners Association",
          "parent_category": "Community",
          "text": [
            "Association: No",
            "Calculated Total Monthly Association Fees: 0",
            "Pets Allowed: Conditional, PetDeposit"
          ]
        },
        {
          "category": "School Information",
          "parent_category": "Community",
          "text": [
            "Elementary School: THOMAS ELEMENTARY SCHOOL (LAMAR)",
            "Elementary School District: 33 - Lamar Consolidated",
            "High School: RANDLE HIGH SCHOOL",
            "High School District: 33 - Lamar Consolidated",
            "Middle School: WRIGHT JUNIOR HIGH SCHOOL",
            "Middle or Junior School District: 33 - Lamar Consolidated"
          ]
        },
        {
          "category": "Rental Info",
          "parent_category": "Community",
          "text": [
            "Lease Term: LongTerm"
          ]
        },
        {
          "category": "Other Property Info",
          "parent_category": "Listing",
          "text": [
            "Source Listing Status: Active",
            "County: Fort Bend",
            "Availability Date: 2025-03-21",
            "Directions: please turn lights off",
            "Restrictions: DeedRestrictions, NoSmoking",
            "Source Property Type: ResidentialLease",
            "Area: 30",
            "MLS Area Minor: Fort Bend South/Richmond",
            "Source Neighborhood: Sunset Crossing Sec 7",
            "Parcel Number: 4136-07-001-0130-901",
            "Postal City: Richmond",
            "Postal Code Plus 4: 1322",
            "Subdivision: Sunset Crossing Sec 7",
            "Property Subtype: Detached",
            "Source System Name: C2C"
          ]
        },
        {
          "category": "Building and Construction",
          "parent_category": "Features",
          "text": [
            "Total Square Feet Living: 2150",
            "Year Built: 2022",
            "Building Area Total: 2150",
            "Levels: One",
            "Living Area Source: Appraiser",
            "Property Age: 3",
            "Levels or Stories: 1",
            "Building Total Stories: 1",
            "Year Built Source: PublicRecords",
            "Architectural Style: Detached"
          ]
        },
        {
          "category": "Utilities",
          "parent_category": "Features",
          "text": [
            "Sewer: PublicSewer",
            "Water Source: Public"
          ]
        }
      ],
      "flags": {
        "is_new_listing": false,
        "is_pending": null
      },
      "has_specials": false,
      "lead_attributes": {
        "is_premium_ldp": null,
        "is_schedule_a_tour": false,
        "lead_type": "rental_basic_mls"
      },
      "list_date": "2025-03-20T14:25:36.000000Z",
      "list_price": 2400,
      "list_price_max": null,
      "list_price_min": null,
      "listing_id": "2979584914",
      "location": {
        "address": {
          "city": "Richmond",
          "coordinate": {
            "lat": 29.520753,
            "lon": -95.738531
          },
          "country": "USA",
          "line": "1715 Maclane Ct",
          "postal_code": "77469",
          "state_code": "TX"
        },
        "county": {
          "fips_code": "48157",
          "name": "Fort Bend"
        }
      },
      "matterport": false,
      "other_listings": {
        "rdc": [
          {
            "listing_id": "2979584914",
            "status": "for_rent"
          },
          {
            "listing_id": "2945297272",
            "status": "off_market"
          },
          {
            "listing_id": "2952657881",
            "status": "off_market"
          }
        ]
      },
      "permalink": "1715-Maclane-Ct_Richmond_TX_77469_M92401-50438",
      "pet_policy": null,
      "photos": [
        {
          "href": "https://ap.rdcpix.com/63883a7d786475d7baefdb10472f28c0l-m2106565903s.jpg"
        },
        {
          "href": "https://ap.rdcpix.com/63883a7d786475d7baefdb10472f28c0l-m2120654321s.jpg"
        }
      ],
      "price_reduced_amount": null,
      "primary_photo": {
        "href": "https://ap.rdcpix.com/63883a7d786475d7baefdb10472f28c0l-m2106565903s.jpg"
      },
      "products": {
        "brand_name": "essentials",
        "products": [
          "core.agent",
          "core.broker"
        ]
      },
      "property_id": "9240150438",
      "search_promotions": null,
      "source": {
        "community_id": null,
        "feed_type": null,
        "id": "HOTX",
        "type": "mls"
      },
      "status": "for_rent",
      "units": null,
      "virtual_tours": null
    }
  ],
  "total": 302
}