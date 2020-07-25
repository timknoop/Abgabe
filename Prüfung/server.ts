import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb"; 

//mongodb+srv://timknp:<password>@timknp.wm48n.mongodb.net/<dbname>?retryWrites=true&w=majority
//https://mongodbnetbrowser.herokuapp.com/?u=timknp&p=pw123456&a=timknp.wm48n.mongodb.net&n=Test&c=Students

export namespace PrüfungServer {
    let mongoDaten: Mongo.Collection;
    let databaseUrl: string;

    databaseUrl = "mongodb+srv://timknp:pw123456@timknp.wm48n.mongodb.net/Test?retryWrites=true&w=majority";

    connectToDatabase(databaseUrl);

    let port: number = Number(process.env.PORT);
    if (!port)
    port = 8100; 
    
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        mongoDaten = mongoClient.db("Shop").collection("Orders");
      } 
    

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");


    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      if (url.pathname == "/input") {
        
        mongoDaten.insertOne(url.query);

          } 
          
          else if (url.pathname == "/request") {
            _response.write(JSON.stringify(await mongoDaten.find().toArray()));
          }
          else if (url.pathname == "/updateone") {
            mongoDaten.updateOne({Status: "ausstehend"}, {$set: {Status: "versandt"}});
          }

          else if (url.pathname == "/deleteAll") {
            mongoDaten.deleteMany({});
          }
          else if (url.pathname == "/update") {
            mongoDaten.updateMany({Status: "ausstehend"}, {$set: {Status: "versandt"}});
          }
    }
          
    _response.end();
  } 
}