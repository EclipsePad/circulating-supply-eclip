# circulating-supply-eclip

A simple AWS Lambda function that polls a Google Sheets URL and returns the circulating supply number for ECLIP token based on the current date.

## Overview

This service:
1. Accesses a CSV from Google Sheets containing circulating supply data
2. Uses today's date (YYYY-MM-DD) to look up the associated row
3. Returns the circulating supply number for that date

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
(On Windows, you can use 7-Zip or other zip utilities)

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

4. Create API Gateway trigger:
   - In the Lambda function console, add API Gateway trigger
   - Create a new API or use an existing one
   - Configure as REST API with open access (or secure as needed)
   - Deploy the API

### CloudFormation Deployment

Alternatively, use the included `template.yml` file for CloudFormation deployment:

```bash
aws cloudformation deploy --template-file template.yml --stack-name eclip-circulating-supply --capabilities CAPABILITY_IAM
```

## API Usage

Once deployed, the API will be available at the provided API Gateway URL:

```
GET https://your-api-id.execute-api.your-region.amazonaws.com/prod/circulating-supply
```

Response format:
```json
{
  "date": "2024-04-01",
  "circulatingSupply": 23169989.805229
}
```

## Error Handling

- 404: No data found for the current date
- 500: Server error (check CloudWatch logs)
