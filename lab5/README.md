# Reflection log

For this lab, I focused on implementing the node api to manipulate and retrieve data from the mongo database with the get, post, put, and delete requests. I made a new service component for organizing the request verbs. Each verb would access its corresponding api function from the backend, and will accordingly return data (get), or change/add/delete the documents in the collection. I got stuck in some parts of the lab, for instance I had trouble connecting and maintaining the client connection, possibly because I was not using an async function with await for client connect. I also had trouble with setting the number values in the backend, as they were considered as strings from the request paramater. I later realized the problem, and solved it by changing the paramater input to integers, because of how each 'number' in a document was an integer. The query in updateOne did not work when the number was a string.

# Resources/Citations

https://cloud.mongodb.com/v2/62311ee07df4ff0548cdc7f1#clusters/connect?clusterId=Cluster0

https://expressjs.com/en/guide/routing.html#route-parameters

https://www.geeksforgeeks.org/express-js-req-params-property/

https://docs.mongodb.com/drivers/node/current/usage-examples/find/

https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/

https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/

https://www.mongodb.com/docs/manual/tutorial/insert-documents/

https://www.geeksforgeeks.org/difference-between-insert-insertone-and-insertmany-in-pymongo/

https://stackoverflow.com/questions/63736845/add-fields-in-all-documents-of-a-collection-mongodb

https://stackoverflow.com/questions/70596377/mongonotconnectederror-mongoclient-must-be-connected-to-perform-this-operation?rq=1

https://stackoverflow.com/questions/45747412/how-to-make-post-request-from-angular-to-node-server

https://angular.io/api/forms/NgForm

https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial

https://www.tutorialspoint.com/how-to-convert-a-string-into-integer-in-javascript#:~:text=To%20convert%20a%20string%20to,be%20returned%20as%20the%20output.
