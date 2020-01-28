'use strict';
const requester = require('./index');


(() => {
  /* GET */
  // example of how to use 'httpsGet'
  const exampleGet = requester.httpsGet([
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
  ]);

  console.log('exampleGet is a:', exampleGet);
  exampleGet.then((response) => {
    console.log('exampleGet response:');

    return console.log(response);
  }).catch((error) => console.log('exampleGet error:', error));


  /* ANY */
  // example of how to use 'httpsAny'
  const exampleAny = requester.httpsAny([
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
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      payload: {
        title: 'POST 2',
        body: 'A second post example',
        userId: 93383
      }
    },
    {
      method: 'PUT',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      payload: {
        title: 'PUT request',
        body: 'A tale of something exciting!',
        userId: 829303
      }
    },
    {
      method: 'GET',
      url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json'
    }
  ]);

  console.log('exampleAny is a:', exampleGet);
  exampleAny.then((response) => {
    console.log('exampleAny response:');

    return console.log(response);
  }).catch((error) => console.log('exampleAny error:', error));
})();
