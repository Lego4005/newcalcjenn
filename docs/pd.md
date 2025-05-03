https://apivex.com/docs/realtor

https://apivex.com/docs/airdna


pk_0ae2d63b73237c6733fe1554d3ba66cbfca5d18021c62ce5


so vex seems to not be wokring but you can try it out with the api key above
however if not working the same api jsut differnet hosts are on rapidapi below. 

		'x-rapidapi-key': '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506',

        

        'x-rapidapi-host': 'airdna1.p.rapidapi.com'
            https://apivex.com/docs/airdna - docs

		'x-rapidapi-host': 'realtor16.p.rapidapi.com'
            https://apivex.com/docs/realtor  -docs
            

        'x-rapidapi-host': 'zillow56.p.rapidapi.com'
            https://apivex.com/docs/zillow - docs       
            

            const API_ENDPOINTS = {
                airdna: {
                    host: 'airdna1.p.rapidapi.com',
                    key: '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506',
                    docs: 'https://apivex.com/docs/airdna',
                    docsPath: '/docs/airdna-docs.md' // Placeholder since no file exists yet
                },
                realtor: {
                    host: 'realtor16.p.rapidapi.com', 
                    key: '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506',
                    docs: 'https://apivex.com/docs/realtor',
                    docsPath: '/docs/realtor16_endpoint_rapidapi.md'
                },
                zillow: {
                    host: 'zillow56.p.rapidapi.com',
                    key: '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506',
                    docs: 'https://apivex.com/docs/zillow',
                    docsPath: '/docs/zillow1_rapid_api.md'
                }
            };

            // Helper function to make API requests
            async function makeApiRequest(service, endpoint, params = {}) {
                const config = API_ENDPOINTS[service];
                if (!config) throw new Error(`Unknown service: ${service}`);

                const response = await fetch(`https://${config.host}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': config.host,
                        'x-rapidapi-key': config.key
                    },
                    ...params
                });

                if (!response.ok) {
                    throw new Error(`API request failed: ${response.statusText}`);
                }

                return response.json();
            }

            // Helper function to load API documentation
            async function loadApiDocs(service) {
                const config = API_ENDPOINTS[service];
                if (!config) throw new Error(`Unknown service: ${service}`);

                try {
                    const response = await fetch(config.docsPath);
                    if (!response.ok) {
                        throw new Error(`Failed to load docs for ${service}`);
                    }
                    return await response.text();
                } catch (error) {
                    console.error(`Error loading docs for ${service}:`, error);
                    return null;
                }
            }





