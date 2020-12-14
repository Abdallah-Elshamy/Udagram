import express from 'express';
import bodyParser from 'body-parser';
import isImageURL from 'image-url-validator';
import {filterImageFromURL, deleteLocalFiles} from './util/util';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  app.get( "/filteredimage", async ( req, res) => {
    const image_url : string = req.query["image_url"];
    
    if(!image_url)
      res.status(400).json({error: "The request doesn't have a query"})
      
    if(! await isImageURL(image_url)) {
      res.status(400).json({error: "Image URL is not valid"})
    }
    else {
      const filtered_image_local_path: string = await filterImageFromURL(image_url);
      res.sendFile(filtered_image_local_path, err => {
        if (err)
        {
          console.log(err);
          res.status(500).json({error: "An error occurred"})
        }
        deleteLocalFiles([filtered_image_local_path]); 
      });
    }
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();