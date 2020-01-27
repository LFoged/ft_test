'use strict';
const requester = require('./index');


(() => {
  /* GET */
  const testGet = requester.get([
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
  ]);

  console.log('testGet is a:', testGet);
  testGet.then(console.log).catch(console.error);

  /* POST */
  const testPost = requester.any([
    {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      payload: { title: 'Freeze', body: 'Voice', userId: 1373 },
      headers: { 'LULULUU': 'TTTOOO TREUE' },
      isJSON: true
    },
    {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      payload: { title: 'Giant', body: 'SHit', userId: 93383 }
    },
    {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      payload: { title: 'Ghost', body: 'Run', userId: 829303 },
      headers: { 'Authorization': 'true' },
      isJSON: true
    },
    {
      method: 'GET',
      url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
      isJSON: true
    }
  ]);

  console.log('testPost is a:', testPost);
  return testPost.then(console.log).catch((error) => console.error('POST ERROR:', error));
})();