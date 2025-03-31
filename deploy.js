const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Script to automate the deployment of the ECLIP Circulating Supply Lambda function
 */
function deploy() {
  try {
    console.log('Starting deployment process...');
    
    // 1. Install dependencies
    console.log('\n1. Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // 2. Create deployment package
    console.log('\n2. Creating deployment package...');
    
    // Check if function.zip exists and delete it
    if (fs.existsSync('function.zip')) {
      fs.unlinkSync('function.zip');
    }
    
    // Create a deployment package using 7-Zip (for Windows) or zip (for Unix)
    try {
      if (process.platform === 'win32') {
        // For Windows using 7-Zip (if available)
        console.log('Using 7-Zip for Windows...');
        execSync('7z a -r function.zip index.js node_modules', { stdio: 'inherit' });
      } else {
        // For Unix systems
        console.log('Using zip for Unix...');
        execSync('zip -r function.zip index.js node_modules', { stdio: 'inherit' });
      }
    } catch (error) {
      console.error('Error creating zip file. Please ensure 7-Zip is installed on Windows or zip on Unix systems.');
      console.error('You can manually create a zip file containing index.js and the node_modules folder.');
      process.exit(1);
    }
    
    // 3. Deploy using CloudFormation
    console.log('\n3. Deploying with CloudFormation...');
    console.log('To deploy using CloudFormation, run the following command:');
    console.log('aws cloudformation deploy --template-file template.yml --stack-name eclip-circulating-supply --capabilities CAPABILITY_IAM');
    
    // 4. Provide manual deployment instructions
    console.log('\n4. Alternative: Manual deployment instructions');
    console.log('If CloudFormation deployment fails, you can manually deploy:');
    console.log('- Go to AWS Lambda console: https://console.aws.amazon.com/lambda');
    console.log('- Create a new function named "eclip-circulating-supply"');
    console.log('- Upload the function.zip file');
    console.log('- Set the handler to "index.handler"');
    console.log('- Set timeout to 30 seconds');
    console.log('- Create an API Gateway trigger');
    
    console.log('\nDeployment preparation completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

// Run the deployment
deploy();
