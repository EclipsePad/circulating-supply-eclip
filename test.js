const { handler } = require('./index');

/**
 * Simple test script to verify the Lambda function locally
 */
async function testLambdaFunction() {
  console.log('Testing ECLIP Circulating Supply Lambda function...');
  
  try {
    // Call the Lambda handler function
    const result = await handler({}, {});
    
    // Parse the response body
    const body = JSON.parse(result.body);
    
    // Log the results
    console.log('Status Code:', result.statusCode);
    console.log('Response Body:', body);
    
    if (result.statusCode === 200) {
      console.log('\nSuccess! Found circulating supply for date:', body.date);
      console.log('Circulating Supply:', body.circulatingSupply);
    } else {
      console.log('\nNo data found or error occurred.');
      console.log('Error:', body.error);
    }
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the test
testLambdaFunction();
