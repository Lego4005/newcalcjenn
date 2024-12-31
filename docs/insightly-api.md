# Insightly API Integration Guide

## Authentication
- All API calls must be made via HTTPS
- Uses HTTP Basic authentication
- API key should be Base64-encoded as the username (leave password blank)
- Find your API key in User Settings under the API section
- Your API URL format: `https://api.{pod}.insightly.com/v3.1/`
  - Find your pod in User Settings under API URL

## Request Headers
- Content-Type: application/json
- Accept: application/json
- Accept-Encoding: gzip (optional, for compression)

## Rate Limits
- 10 requests per second maximum
- Daily limits based on plan:
  - Free/Gratis: 1,000 requests/day
  - Legacy plans: 20,000 requests/day
  - Plus: 40,000 requests/day
  - Professional: 60,000 requests/day
  - Enterprise: 100,000 requests/day

## Response Headers
Each response includes rate limit information:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
```

## Tags and Data Format
### Getting Tags
- Fetch all tags using: `GET /v3.1/Tags`
- Get specific tag: `GET /v3.1/Tags/{id}`
- Response format:
  ```json
  {
    "TAG_NAME": "string",
    "TAG_ID": integer,
    "ENTITY_NAME": "string" // What the tag is attached to (Contact, Organization, etc.)
  }
  ```

### Managing Tags
- PUT/POST requests accept subcollections in their payload
- Tags can be updated in bulk from parent entity's PUT/POST requests
- Tags can be updated using the specific PUT endpoint for tags
- To remove a field value that's already set, use NULL

### Example Tag Operations
1. Get all tags:
```
GET: https://api.{pod}.insightly.com/v3.1/Tags
```

2. Add tags to a contact:
```
POST: https://api.{pod}.insightly.com/v3.1/Contacts/{contact_id}/Tags
Content-Type: application/json
{
  "TAG_NAME": "VIP Client",
  "ENTITY_NAME": "Contact"
}
```

3. Sync tags between systems:
```
// Step 1: Get all Insightly tags
GET: https://api.{pod}.insightly.com/v3.1/Tags

// Step 2: For each tag, store in your CRM:
{
  insightly_tag_id: response.TAG_ID,
  name: response.TAG_NAME,
  entity_type: response.ENTITY_NAME,
  source: "insightly"
}
```

## Example API Call
```
GET: https://api.{pod}.insightly.com/v3.1/Contacts
Authorization: Basic YWM5YTIyOTItZjI1YS00NDgzLTlkNTQtMDAwMDAwMDAwMDAw
Accept-Encoding: gzip
```

## Search and Filtering
- Search by any standard or custom field
- Use field_name and field_value parameters:
  ```
  https://api.{pod}.insightly.com/v3.1/Contacts/Search?field_name={custom field id}&field_value={value}
  ```

## Pagination
- Default: 100 records per response
- Maximum: 500 records per response
- Use `top` and `skip` parameters for paging:
  ```
  https://api.{pod}.insightly.com/v3.1/Contacts?top=20&skip=50
  ```

## Date Formatting
- URL parameters: ISO 8601 format (`yyyy-mm-ddThh:mm:ssZ`)
  Example: `2018-04-09T16:58:14Z`
- Object data: `yyyy-MM-dd HH:mm:ss`
  Example: `2015-04-10 21:15:00`

## Best Practices
1. Always check rate limits in response headers
2. Use compression for large responses
3. Implement proper error handling for 429 (rate limit) responses
4. Keep track of daily API usage
5. Use proper date formatting based on context (URL vs object data)

## Support
For additional support, visit: support.insight.ly 