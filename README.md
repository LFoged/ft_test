# FT technical exercise 'requestMultipleUrls'

### Description
Package for sending multiple requests using GET or any other valid HTTP method.  
Best suited for JSON, but ```httpsAny()``` can be used for other formats.
- Uses Node's 'https' module for making requests.
- Returns Promise that resolves to Array of responses.
- Uses 'Promise.all' so requests are made concurrently (instead of sequentially).
- NOTE: all requests will either succeed or fail (if any request fails, they all do).
- Contains 0 external dependencies.

<br>

Run ```npm run example``` from inside package to send example requests => responses logged to console. 

### Interface
- ```[package].httpsGet()``` accepts an Array of url strings. Makes GET request for each string and JSON parses response. Responds with Promise that resolves to Array of responses.  
Accepts:  
```['url', 'url', 'url', ...]```  
Returns:  
```[JSON, JSON, JSON, ...]```

<br>

- ```[package].httpsAny()``` accepts an Array of request Objects. Makes request for each Object and optionally JSON parses response. Responds with Promise that resolves to Array of Objects, containing response info. (statusCode, statusMessage, headers and response 'data').  
Accepts:  
```
  { 
    method: String (required), 
    url: String (required), 
    payload: Object (optional),
    headers: Object (optional),
    isJSON: Boolean (optional)
  }
```
Returns:  
```
  { 
    statusCode: Number (response statusCode), 
    statusMessage: String (response statusMessage), 
    headers: Object (response headers),
    payload: String or Object (if 'isJSON' is true)
  }
```

#### Example
Package is called 'request-multiple-urls' in below examples.  
Example of ```httpsGet()```:  
```
  const requestMultipleUrls = require('request-multiple-urls');

  const exampleGet = requestMultipleUrls.httpsGet([
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
  ]);

  exampleGet.then(console.log).catch(console.error);
  => returns Promise that resolves to an Array of JSON parsed responses
```

Example of ```httpsAny()```:  
```
  const requestMultipleUrls = require('request-multiple-urls');

  const exampleAny = requestMultipleUrls.httpsAny([
    {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      payload: {
        title: 'POST Example',
        body: 'This is an example post',
        userId: 2974
      },
      headers: { 'Authorization': 'Bearer xxxxxxxxxxx' },
      isJSON: true
    },
    {
      method: 'PUT',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      payload: {
        title: 'PUT request',
        body: 'An exciting update!',
        userId: 829303
      }
    },
    {
      method: 'GET',
      url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json'
    }
  ]);

  exampleAny.then(console.log).catch(console.error);
  => returns Promise that resolves to an Array of Objects
```