# circulating-supply-eclip

A simple AWS Lambda function that polls a Google Sheets URL and returns the circulating supply number for ECLIP token based on the current date.

## Overview

This service:
1. Accesses a CSV from Google Sheets containing circulating supply data
2. Uses today's date (YYYY-MM-DD) to look up the associated row
3. Returns the circulating supply number for that date as a plain number

## Deployment Instructions

### Prerequisites
- AWS Account
- AWS CLI configured locally
- Node.js and npm installed

### Manual Deployment

1. Install dependencies:
```bash
npm install
```

2. Create deployment package:
```bash
zip -r function.zip index.js node_modules
```
(On Windows, you can use PowerShell: `Compress-Archive -Path index.js, node_modules -DestinationPath function.zip -Force`)

3. Deploy to AWS Lambda:
   - Go to AWS Lambda console
   - Create a new function
   - Choose "Author from scratch"
   - Name: `eclip-circulating-supply`
   - Runtime: Node.js 18.x
   - Upload the function.zip file
   - Set the handler to `index.handler`
   - Set timeout to 30 seconds
   - Create or assign an appropriate IAM role with basic Lambda execution permissions

4. Create public endpoint (two options):

   **Option A: Function URL (Recommended)**
   - Go to Configuration -> Function URL
   - Enable Function URL with Auth type = NONE
   - Save the generated URL (format: https://[id].lambda-url.[region].on.aws/)

   **Option B: API Gateway**
   - In the Lambda function console, add API Gateway trigger
   - Create a new API or use an existing one
   - Configure as REST API with open access
   - Deploy the API

### CloudFormation Deployment

Alternatively, use the included `template.yml` file for CloudFormation deployment:

```bash
aws cloudformation deploy --template-file template.yml --stack-name eclip-circulating-supply --capabilities CAPABILITY_IAM
```

## API Usage

Once deployed, the API will be available at the provided Function URL or API Gateway URL:

```
GET https://[your-function-url].lambda-url.[region].on.aws/
```
or
```
GET https://[your-api-id].execute-api.[region].amazonaws.com/prod/circulating-supply
```

Response format:
```
23169989.805229
```

The response is a plain number with no formatting or JSON wrapper.

## Error Handling

- If no data is found for the current date: Returns `0`
- If there's a server error: Returns `0`
