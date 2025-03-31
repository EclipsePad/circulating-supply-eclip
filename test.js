const { handler } = require('./index');

/**
 * Simple test script to verify the Lambda function locally
 */
async function testLambdaFunction() {
  console.log('Testing ECLIP Circulating Supply Lambda function...');
  
  try {
    // Call the Lambda handler function
    const result = await handler({}, {});
    
    // Log the results
    console.log('Status Code:', result.statusCode);
    console.log('Content-Type:', result.headers['Content-Type']);
    console.log('Response Body:', result.body);
    
    if (result.statusCode === 200) {
      console.log('\nSuccess! Found circulating supply:', result.body);
    } else {
      console.log('\nNo data found or error occurred.');
      console.log('Response:', result.body);
    }
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the test
testLambdaFunction();
