const axios = require('axios');

/**
 * AWS Lambda function to fetch circulating supply from a Google Sheets CSV
 * 
 * @param {Object} event - Lambda event object
 * @param {Object} context - Lambda context object
 * @returns {Object} Response with circulating supply for today's date
 */
exports.handler = async (event, context) => {
    try {
        // Google Sheets CSV URL
        const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsmzTPDa6o1JNNuW72glwLsK_frXCN7wTknmA_Axu1SciGQOyXKpLepN7bYExQjnobXwE3JvAKfvmU/pub?gid=807430550&single=true&output=csv';
        
        // Fetch CSV data
        const response = await axios.get(csvUrl);
        const csvData = response.data;
        
        // Parse CSV data (simple parsing since format is straightforward)
        const rows = csvData.split('\n').map(row => row.trim()).filter(row => row);
        
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
        
        // Find the row with today's date
        let circulatingSupply = null;
        for (const row of rows) {
            const [date, supply] = row.split(',');
            if (date === formattedDate) {
                circulatingSupply = parseFloat(supply);
                break;
            }
        }
        
        // Prepare response
        if (circulatingSupply !== null) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' // Enable CORS
                },
                body: JSON.stringify({
                    date: formattedDate,
                    circulatingSupply: circulatingSupply
                })
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: `No circulating supply data found for date: ${formattedDate}`
                })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to retrieve circulating supply data',
                details: error.message
            })
        };
    }
};
