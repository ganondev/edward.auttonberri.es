'use strict';

var AWS = require('aws-sdk');

exports.getQuote = function(event, context, callback) {
	
	var dynamodb = new AWS.DynamoDB();
	console.log(event);
	
	dynamodb.describeTable({TableName: "quotes"}, function(err, data) {

        if (err) console.log(err, err.stack);
        else {
            
            var id = event.pathParameters?.id ? parseInt(event.pathParameters.id) : Math.floor(Math.random() * data.Table.ItemCount);
            
            console.log(`Getting quote with id: ${id}.`);
            
            var params = {

                Key: {
                    "id": {
                        N: id.toString()
                    }
                },
                TableName: "quotes"
        
            };
            
            dynamodb.getItem(params, function(err, resultSet) {
        

                if (err) console.log(err, err.stack);
                else {
        
                    console.log("Returned quote:", resultSet );
                    callback(null, {statusCode: 200,
                                    headers : {"content-type": "text/json",
                                                "Access-Control-Allow-Origin" : "http://localhost:3000",
                                                "Access-Control-Allow-Credentials" : true,
                                                "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
                                                "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept"}, 
                                    body: JSON.stringify({
                                        quote: resultSet.Item.quote.S,
                                        author: resultSet.Item.author ? resultSet.Item.author.S : undefined
                                    })});
        
                }
        
            });

        }
    });

}