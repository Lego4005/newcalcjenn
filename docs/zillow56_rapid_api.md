const http = require('https');

const options = {
	method: 'GET',
	hostname: 'zillow56.p.rapidapi.com',
	port: null,
	path: '/search_polygon?polygon=34.03959576441558%20-118.50636536779786%2C34.0418716916327%20-118.50276047888184%2C34.042440663894304%20-118.49846894445801%2C34.04201393505594%20-118.49417741003418%2C34.04087598099002%20-118.4897142142334%2C34.03945351693672%20-118.48525101843262%2C34.03788877892429%20-118.48095948400879%2C34.03618175908096%20-118.47683961096192%2C34.034190192514366%20-118.47271973791504%2C34.031629538228394%20-118.46962983312989%2C34.02835747861639%20-118.4677415579834%2C34.02465847668084%20-118.46671158972168%2C34.02081703478521%20-118.46636826696778%2C34.01697541902413%20-118.46636826696778%2C34.01341821237762%20-118.4673982352295%2C34.011283816847104%20-118.47100312414551%2C34.01057233974687%20-118.47563798132325%2C34.01043004361143%20-118.47992951574707%2C34.01071463564384%20-118.48439271154786%2C34.01156840601794%20-118.48868424597168%2C34.01270675316253%20-118.49297578039551%2C34.01398737545716%20-118.49709565344239%2C34.01555255425154%20-118.50104386511231%2C34.01754455825562%20-118.50464875402832%2C34.02039019717532%20-118.50756699743653%2C34.02352028980117%20-118.50962693395996%2C34.02707707311613%20-118.51065690222168%2C34.03063370735633%20-118.50997025671387%2C34.034190192514366%20-118.5091119498291%2C34.03774652858273%20-118.50825364294434%2C34.03959576441558%20-118.50636536779786&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any',
	headers: {
		'x-rapidapi-key': '98499a597fmshc2fcb36de3731c3p1b3d92jsn537d51627506',
		'x-rapidapi-host': 'zillow56.p.rapidapi.com'
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
  "results": [
    {
      "bathrooms": 1,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/6a33e8df1419e8ab144164dfbc26acc6-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": true,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.022987,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 784,
      "longitude": -118.46839,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 300,
      "price": 689999,
      "priceForHDP": 689999,
      "rentZestimate": 3313,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1950 Cloverfield Blvd UNIT 10",
      "taxAssessedValue": 686663,
      "timeOnZillow": 2669956000,
      "unit": "Unit 10",
      "zestimate": 692700,
      "zipcode": "90404",
      "zpid": 20473751
    },
    {
      "bathrooms": 3,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/bbb6aa387959d591fa05c2438589b1de-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.040443,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 2284,
      "longitude": -118.49983,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7514.1,
      "openHouse": "Sat. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746316800000,
            "open_house_start": 1746306000000
          },
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          },
          {
            "open_house_end": 1746565200000,
            "open_house_start": 1746554400000
          }
        ]
      },
      "price": 4295000,
      "priceForHDP": 4295000,
      "rentZestimate": 14195,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "222 17th St",
      "taxAssessedValue": 262595,
      "timeOnZillow": 158842000,
      "zestimate": 4267600,
      "zipcode": "90402",
      "zpid": 20476980
    },
    {
      "bathrooms": 5,
      "bedrooms": 5,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/1b1d4ec230d04844b7dc882b152b70e2-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.034557,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 3941,
      "longitude": -118.49741,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7509.744,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 6780000,
      "priceForHDP": 6780000,
      "rentZestimate": 21775,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "543 14th St",
      "taxAssessedValue": 4372830,
      "timeOnZillow": 711462000,
      "zestimate": 6645700,
      "zipcode": "90402",
      "zpid": 20477270
    },
    {
      "bathrooms": 2,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/8b87026f07fc5ebba5bc98670be37ff9-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.03769,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 2048,
      "longitude": -118.5003,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7492.32,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 5295000,
      "priceForHDP": 5295000,
      "rentZestimate": 8146,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "324 15th St",
      "taxAssessedValue": 3270212,
      "timeOnZillow": 678389000,
      "zestimate": 5199200,
      "zipcode": "90402",
      "zpid": 20477221
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/28dc488d14bb51a0eda7d7acc123a962-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.033543,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 1007,
      "longitude": -118.47884,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 5331.744,
      "price": 998789,
      "priceForHDP": 998789,
      "rentZestimate": 4009,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1231 24th St UNIT 3",
      "taxAssessedValue": 374441,
      "timeOnZillow": 778313000,
      "unit": "Unit 3",
      "zestimate": 1005200,
      "zipcode": "90404",
      "zpid": 20474543
    },
    {
      "bathrooms": 3,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/17a060fed7300a69797505977f6b0b54-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.034527,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1905,
      "longitude": -118.48736,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7997,
      "openHouse": "Sun. 2-4pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746399600000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 2000000,
      "priceForHDP": 2000000,
      "rentZestimate": 6996,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "930 20th St UNIT 6",
      "taxAssessedValue": 726507,
      "timeOnZillow": 337156000,
      "unit": "Unit 6",
      "zestimate": 1969100,
      "zipcode": "90403",
      "zpid": 20475201
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/ed0d463ef57afccc5e6038c83f7b853e-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.024673,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1394,
      "longitude": -118.494286,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.3445592286501377,
      "openHouse": "Sat. 1-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746316800000,
            "open_house_start": 1746302400000
          }
        ]
      },
      "price": 1500000,
      "priceForHDP": 1500000,
      "rentZestimate": 5506,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "930 California Ave UNIT 105",
      "taxAssessedValue": 1045500,
      "timeOnZillow": 164356000,
      "unit": "Unit 105",
      "zestimate": 1471000,
      "zipcode": "90403",
      "zpid": 20479081
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/c19b9ea9741a36baa2df333aca93535a-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.01113,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 850,
      "longitude": -118.4833,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.46759999999999996,
      "openHouse": "Sun. 12-3pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746396000000,
            "open_house_start": 1746385200000
          },
          {
            "open_house_end": 1747000800000,
            "open_house_start": 1746990000000
          }
        ]
      },
      "price": 955000,
      "priceForHDP": 955000,
      "rentZestimate": 3951,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "697 Bay St",
      "taxAssessedValue": 847678,
      "timeOnZillow": 316974000,
      "zestimate": 951000,
      "zipcode": "90405",
      "zpid": 20484053
    },
    {
      "bathrooms": 6,
      "bedrooms": 7,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/2b35b14220ea191a70d22b80d912db1a-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.029762,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 5658,
      "longitude": -118.49945,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7514.1,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 6998000,
      "priceForHDP": 6998000,
      "rentZestimate": 20801,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "723 10th St",
      "taxAssessedValue": 3347773,
      "timeOnZillow": 499911000,
      "zipcode": "90402",
      "zpid": 37767919
    },
    {
      "bathrooms": 7,
      "bedrooms": 7,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/6a14ea28ee865e2ea7002bf1d104c5c4-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.040977,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 6692,
      "longitude": -118.49376,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 8934.156,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 10495000,
      "priceForHDP": 10495000,
      "rentZestimate": 27236,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "422 21st St",
      "taxAssessedValue": 5588528,
      "timeOnZillow": 1873858000,
      "zestimate": 10187900,
      "zipcode": "90402",
      "zpid": 20476517
    },
    {
      "bathrooms": 4,
      "bedrooms": 5,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/2692ffb727613b6e070205c36d67c7da-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.026123,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 3294,
      "longitude": -118.50601,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 5911.092,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 5700000,
      "priceForHDP": 5700000,
      "rentZestimate": 16937,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "615 4th St",
      "taxAssessedValue": 1042576,
      "timeOnZillow": 1483602000,
      "zestimate": 5580300,
      "zipcode": "90402",
      "zpid": 20486584
    },
    {
      "bathrooms": 1,
      "bedrooms": 1,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/0ab3516293ce9fa2c72e5acecfb6a505-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.02828,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 440,
      "longitude": -118.49284,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 1319.868,
      "openHouse": "Sun. 1-3pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746396000000,
            "open_house_start": 1746388800000
          }
        ]
      },
      "price": 1160000,
      "priceForHDP": 1160000,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1012 1/2 Euclid St",
      "taxAssessedValue": 913190,
      "timeOnZillow": 4324084000,
      "zipcode": "90403",
      "zpid": 20478685
    },
    {
      "bathrooms": 2,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/3dd2c3af8bc590d92781b3e2675f5cc3-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.025967,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1257,
      "longitude": -118.48843,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.3442,
      "openHouse": "Sat. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746316800000,
            "open_house_start": 1746306000000
          }
        ]
      },
      "price": 1095000,
      "priceForHDP": 1095000,
      "rentZestimate": 4462,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1228 14th St APT 103",
      "taxAssessedValue": 1039358,
      "timeOnZillow": 1908443000,
      "unit": "Apt 103",
      "zestimate": 1130000,
      "zipcode": "90404",
      "zpid": 20479421
    },
    {
      "bathrooms": 3,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/b2c052531a8bb2c65fece61662f6e0a7-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.032608,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 1637,
      "longitude": -118.48961,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.34450000000000003,
      "price": 1850000,
      "priceForHDP": 1850000,
      "rentZestimate": 7491,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "933 17th St UNIT 5",
      "taxAssessedValue": 1183124,
      "timeOnZillow": 167869000,
      "unit": "Unit 5",
      "zestimate": 1827800,
      "zipcode": "90403",
      "zpid": 20475061
    },
    {
      "bathrooms": 3,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/da4dca9b6e491e94d4f1b45f16e50321-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.034054,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1392,
      "longitude": -118.47466,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.29910000000000003,
      "openHouse": "Sun. 1-3pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746396000000,
            "open_house_start": 1746388800000
          }
        ]
      },
      "price": 1149000,
      "priceForHDP": 1149000,
      "rentZestimate": 5102,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1339 26th St APT 1",
      "taxAssessedValue": 384219,
      "timeOnZillow": 976888000,
      "unit": "Apt 1",
      "zestimate": 1171300,
      "zipcode": "90404",
      "zpid": 20470095
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/d99c3cfe80e08ee7fa1d45b259b6c681-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.02153,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1369,
      "longitude": -118.5035,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.34460514233241507,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 1368000,
      "priceForHDP": 1368000,
      "rentZestimate": 6642,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "930 3rd St APT 106",
      "taxAssessedValue": 1207551,
      "timeOnZillow": 423556000,
      "unit": "Apt 106",
      "zestimate": 1354600,
      "zipcode": "90403",
      "zpid": 20485459
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/e619ca8076a15616d2a7fd50862e2ae9-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.036243,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1116,
      "longitude": -118.4875,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 8019.396,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 1225000,
      "priceForHDP": 1225000,
      "rentZestimate": 4401,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "852 21st St",
      "timeOnZillow": 174730000,
      "zestimate": 1223600,
      "zipcode": "90403",
      "zpid": 2076733041
    },
    {
      "bathrooms": 5,
      "bedrooms": 5,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1746169200000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/296c2480694371768416535d992a8b78-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.022144,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 3347,
      "longitude": -118.497406,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 5013.756,
      "price": 4495000,
      "priceChange": -500000,
      "priceForHDP": 4495000,
      "priceReduction": "$500,000 (May 2)",
      "rentZestimate": 18181,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "614 California Ave",
      "taxAssessedValue": 4204275,
      "timeOnZillow": 2496418000,
      "zestimate": 4367800,
      "zipcode": "90403",
      "zpid": 20484842
    },
    {
      "bathrooms": 2,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/69dc86e2f8e7f87e9553c7ee4ff40792-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.03661,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1319,
      "longitude": -118.48175,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 6107.112,
      "openHouse": "Tue. 11am-2pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746565200000,
            "open_house_start": 1746554400000
          }
        ]
      },
      "price": 3745000,
      "priceForHDP": 3745000,
      "rentZestimate": 6929,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1030 Chelsea Ave",
      "taxAssessedValue": 2970341,
      "timeOnZillow": 106315000,
      "zestimate": 3688100,
      "zipcode": "90403",
      "zpid": 20475481
    },
    {
      "bathrooms": 3,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/ff4f0f550a380ee5188bad250c1b2d9c-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.025383,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1670,
      "longitude": -118.49958,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7501.032,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 2295000,
      "priceForHDP": 2295000,
      "rentZestimate": 6835,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "911 7th St UNIT D",
      "taxAssessedValue": 1872719,
      "timeOnZillow": 695186000,
      "unit": "Unit D",
      "zestimate": 2258000,
      "zipcode": "90403",
      "zpid": 55822808
    },
    {
      "bathrooms": 3,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/dfeeb386a56a3ddf1617bacdcbeb3a0d-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.02403,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 1506,
      "longitude": -118.48855,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 5009.4,
      "price": 2195000,
      "priceForHDP": 2195000,
      "rentZestimate": 6928,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1216 1/2 Arizona Ave",
      "taxAssessedValue": 1825000,
      "timeOnZillow": 250622000,
      "zestimate": 2178400,
      "zipcode": "90404",
      "zpid": 20479676
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1742886000000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/d9d222e9d468aada5159ef517e3a3afd-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.02354,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 990,
      "longitude": -118.49573,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7496.676,
      "price": 799000,
      "priceChange": -50000,
      "priceForHDP": 799000,
      "priceReduction": "$50,000 (Mar 25)",
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1101 Lincoln Blvd APT 3A",
      "timeOnZillow": 9173426000,
      "unit": "Apt 3A",
      "zestimate": 819200,
      "zipcode": "90403",
      "zpid": 441856146
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1745996400000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/0143112b8e0ea66f0cb04f3a112bbfe7-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.010662,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1215,
      "longitude": -118.48439,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 2513.412,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 1549900,
      "priceChange": -25100,
      "priceForHDP": 1549900,
      "priceReduction": "$25,100 (Apr 30)",
      "rentZestimate": 5884,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1921 6th St",
      "taxAssessedValue": 1393858,
      "timeOnZillow": 5601856000,
      "zestimate": 1580200,
      "zipcode": "90405",
      "zpid": 20484040
    },
    {
      "bathrooms": 3,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/68162f07d5dd820f4122e204fbf4ce19-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.014423,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1390,
      "longitude": -118.47749,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.6628999999999999,
      "openHouse": "Sun. 1-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746388800000
          }
        ]
      },
      "price": 1296000,
      "priceForHDP": 1296000,
      "rentZestimate": 6013,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "2016 Euclid St APT 15",
      "taxAssessedValue": 818207,
      "timeOnZillow": 657026000,
      "unit": "Apt 15",
      "zipcode": "90405",
      "zpid": 20480424
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/5d756187cb3106600c2254fbdd9d2f9f-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.024494,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1015,
      "longitude": -118.495804,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7505.388,
      "openHouse": "Sat. 1-3pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746309600000,
            "open_house_start": 1746302400000
          }
        ]
      },
      "price": 1099000,
      "priceForHDP": 1099000,
      "rentZestimate": 4973,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1048 9th St APT 5",
      "taxAssessedValue": 843300,
      "timeOnZillow": 2438242000,
      "unit": "Apt 5",
      "zestimate": 1093000,
      "zipcode": "90403",
      "zpid": 20479296
    },
    {
      "bathrooms": 4,
      "bedrooms": 4,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1744959600000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/2fd405bab3ba998d7285b70e1dc5c28f-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.03873,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 2822,
      "longitude": -118.491135,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 8938.512,
      "price": 5795000,
      "priceChange": -500000,
      "priceForHDP": 5795000,
      "priceReduction": "$500,000 (Apr 18)",
      "rentZestimate": 21191,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "616 21st St",
      "taxAssessedValue": 1112744,
      "timeOnZillow": 3386253000,
      "zestimate": 5729300,
      "zipcode": "90402",
      "zpid": 20476537
    },
    {
      "bathrooms": 1,
      "bedrooms": 1,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/e0005715d9befe7557829e97184f190a-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.018635,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 690,
      "longitude": -118.50274,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.43050000000000005,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 1025000,
      "priceForHDP": 1025000,
      "rentZestimate": 3426,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "101 California Ave UNIT 805",
      "taxAssessedValue": 867000,
      "timeOnZillow": 364580000,
      "unit": "Unit 805",
      "zestimate": 1015400,
      "zipcode": "90403",
      "zpid": 20485737
    },
    {
      "bathrooms": 9,
      "bedrooms": 5,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/cc8ce20ae1f7e2fe2d629b695c875962-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.03647,
      "listing_sub_type": {
        "is_newHome": true
      },
      "livingArea": 13957,
      "longitude": -118.50487,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.4338,
      "newConstructionType": "BUILDER_SPEC",
      "price": 22500000,
      "priceForHDP": 22500000,
      "rentZestimate": 81236,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1115 Georgina Ave",
      "taxAssessedValue": 13035862,
      "timeOnZillow": 8810550000,
      "zestimate": 21833700,
      "zipcode": "90402",
      "zpid": 20477458
    },
    {
      "bathrooms": 5,
      "bedrooms": 4,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/fc3bdabc10fa694501f50f8c50a807c9-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.020004,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 2915,
      "longitude": -118.47306,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7997.616,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 2599000,
      "priceForHDP": 2599000,
      "rentZestimate": 7202,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1927 18th St #C",
      "taxAssessedValue": 2042824,
      "timeOnZillow": 2387605000,
      "unit": "# C",
      "zestimate": 2594000,
      "zipcode": "90404",
      "zpid": 338341412
    },
    {
      "bathrooms": 1,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/0f9260d143bedd6252c4843059cc0e73-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.03181,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 784,
      "longitude": -118.47973,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 1951.488,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 1790000,
      "priceForHDP": 1790000,
      "rentZestimate": 4204,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "2213 Arizona Ave",
      "taxAssessedValue": 1326000,
      "timeOnZillow": 1987078000,
      "zestimate": 1765500,
      "zipcode": "90404",
      "zpid": 20474464
    },
    {
      "bathrooms": 8,
      "bedrooms": 6,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/3e0d7e1d3c97a04b48046e94f77c352f-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.033157,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 8189,
      "longitude": -118.506935,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 9474,
      "price": 11500000,
      "priceForHDP": 11500000,
      "rentZestimate": 38450,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "808 San Vicente Blvd",
      "timeOnZillow": 1555049000,
      "zestimate": 11129800,
      "zipcode": "90402",
      "zpid": 2086582988
    },
    {
      "bathrooms": 5,
      "bedrooms": 5,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/45843275546be4d8d69160198521948c-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.033295,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 4002,
      "longitude": -118.497,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7514.1,
      "openHouse": "Sat. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746316800000,
            "open_house_start": 1746306000000
          },
          {
            "open_house_end": 1746399600000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 6495000,
      "priceForHDP": 6495000,
      "rentZestimate": 23101,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "620 14th St",
      "taxAssessedValue": 4203256,
      "timeOnZillow": 1574203000,
      "zestimate": 6414700,
      "zipcode": "90402",
      "zpid": 20478010
    },
    {
      "bathrooms": 3,
      "bedrooms": 4,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/eebb736300a2d2bad68dbe80b70f7daa-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.035187,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 2211,
      "longitude": -118.49631,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7500,
      "openHouse": "Sun. 2-4pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746399600000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 5489000,
      "priceForHDP": 5489000,
      "rentZestimate": 8239,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "549 15th St",
      "taxAssessedValue": 1989636,
      "timeOnZillow": 682756000,
      "zestimate": 5445300,
      "zipcode": "90402",
      "zpid": 20477110
    },
    {
      "bathrooms": 7,
      "bedrooms": 6,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1744959600000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/6084e62aa7e2c20e966e1c21f8a9350d-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.037148,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 5795,
      "longitude": -118.48997,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 8934.156,
      "price": 7995000,
      "priceChange": -1000000,
      "priceForHDP": 7995000,
      "priceReduction": "$1,000,000 (Apr 18)",
      "rentZestimate": 24206,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "739 20th St",
      "taxAssessedValue": 957604,
      "timeOnZillow": 1218105000,
      "zestimate": 7706900,
      "zipcode": "90402",
      "zpid": 20476572
    },
    {
      "bathrooms": 5,
      "bedrooms": 4,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/20ced68059f1d73989bbcde29bbe3a04-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.027542,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 5796,
      "longitude": -118.50706,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.2612,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 10995000,
      "priceForHDP": 10995000,
      "rentZestimate": 33969,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "424 Marguerita Ave",
      "taxAssessedValue": 7108695,
      "timeOnZillow": 1822311000,
      "zestimate": 10624500,
      "zipcode": "90402",
      "zpid": 20486458
    },
    {
      "bathrooms": 1,
      "bedrooms": 1,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1745910000000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/ed94d1fc1a141c89fa2ff0e929bbb7fb-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.029587,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 670,
      "longitude": -118.47687,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.784,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 589000,
      "priceChange": -10000,
      "priceForHDP": 589000,
      "priceReduction": "$10,000 (Apr 29)",
      "rentZestimate": 2828,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1440 23rd St APT 220",
      "taxAssessedValue": 168944,
      "timeOnZillow": 1379861000,
      "unit": "Apt 220",
      "zestimate": 584900,
      "zipcode": "90404",
      "zpid": 20474017
    },
    {
      "bathrooms": 0,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "SINGLE_FAMILY",
      "imgSrc": "https://photos.zillowstatic.com/fp/bd1453fc240b9e95e1bb1d3eb420a602-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.01701,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "longitude": -118.48872,
      "price": 3960,
      "priceForHDP": 3960,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1550 Lincoln Blvd",
      "timeOnZillow": 6820260000,
      "zipcode": "90401",
      "zpid": 444458022
    },
    {
      "bathrooms": 2,
      "bedrooms": 2,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/f53a8b85279ca62f1fa2c66e7265b552-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.029278,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1471,
      "longitude": -118.49599,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.3446,
      "openHouse": "Sat. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746316800000,
            "open_house_start": 1746306000000
          },
          {
            "open_house_end": 1746399600000,
            "open_house_start": 1746388800000
          }
        ]
      },
      "price": 1450000,
      "priceForHDP": 1450000,
      "rentZestimate": 7288,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "858 12th St APT 4",
      "taxAssessedValue": 1145999,
      "timeOnZillow": 354097000,
      "unit": "Apt 4",
      "zestimate": 1437100,
      "zipcode": "90403",
      "zpid": 20478896
    },
    {
      "bathrooms": 1,
      "bedrooms": 1,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "datePriceChanged": 1743663600000,
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/2cafa376254970190d2b59fd5d52ea0a-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.014725,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 880,
      "longitude": -118.47891,
      "lotAreaUnit": "acres",
      "lotAreaValue": 0.3406,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 699000,
      "priceChange": -50000,
      "priceForHDP": 699000,
      "priceReduction": "$50,000 (Apr 3)",
      "rentZestimate": 3172,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1125 Pico Blvd APT 209",
      "taxAssessedValue": 777578,
      "timeOnZillow": 8724236000,
      "unit": "Apt 209",
      "zestimate": 729200,
      "zipcode": "90405",
      "zpid": 20480053
    },
    {
      "bathrooms": 3,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "TOWNHOUSE",
      "imgSrc": "https://photos.zillowstatic.com/fp/863488e90826640c155945bd08227793-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.029865,
      "listing_sub_type": {
        "is_FSBA": true
      },
      "livingArea": 1553,
      "longitude": -118.49193,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7496.676,
      "price": 1895450,
      "priceForHDP": 1895450,
      "rentZestimate": 5912,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "1405 Washington Ave",
      "taxAssessedValue": 544181,
      "timeOnZillow": 1820385000,
      "zestimate": 1891700,
      "zipcode": "90403",
      "zpid": 20478404
    },
    {
      "bathrooms": 2,
      "bedrooms": 3,
      "city": "Santa Monica",
      "country": "USA",
      "currency": "USD",
      "daysOnZillow": -1,
      "homeStatus": "FOR_SALE",
      "homeStatusForHDP": "FOR_SALE",
      "homeType": "CONDO",
      "imgSrc": "https://photos.zillowstatic.com/fp/eb5feede6373f61922a13bc202f0825f-p_e.jpg",
      "isFeatured": false,
      "isNonOwnerOccupied": true,
      "isPreforeclosureAuction": false,
      "isPremierBuilder": false,
      "isShowcaseListing": false,
      "isUnmappable": false,
      "isZillowOwned": false,
      "latitude": 34.023357,
      "listing_sub_type": {
        "is_FSBA": true,
        "is_openHouse": true
      },
      "livingArea": 1079,
      "longitude": -118.5009,
      "lotAreaUnit": "sqft",
      "lotAreaValue": 7509.744,
      "openHouse": "Sun. 2-5pm",
      "open_house_info": {
        "open_house_showing": [
          {
            "open_house_end": 1746403200000,
            "open_house_start": 1746392400000
          }
        ]
      },
      "price": 1099000,
      "priceForHDP": 1099000,
      "rentZestimate": 5894,
      "shouldHighlight": false,
      "state": "CA",
      "streetAddress": "937 5th St APT 2",
      "taxAssessedValue": 738756,
      "timeOnZillow": 3637233000,
      "unit": "Apt 2",
      "zestimate": 1101500,
      "zipcode": "90403",
      "zpid": 20485126
    }
  ],
  "resultsPerPage": 41,
  "totalPages": 4,
  "totalResultCount": 139
}