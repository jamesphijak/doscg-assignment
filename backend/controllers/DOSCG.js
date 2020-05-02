const { handleError, ErrorHandler, HttpStatus } = require("../utils/error");
const DOSCG = require("../models/DOSCG");
const config = require('../configs/config')
const https = require('https');
Stream = require('stream').Transform

const getXYZ  = (req, res) => {
     try {
          const { missing_list } = req.body;
          if (!missing_list)
               throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled missing value");

          const DOSCG_Model = new DOSCG();
          DOSCG_Model.setMissingList(missing_list)
          return res.json({ success: true, message: DOSCG_Model.getXYZ() });

     } catch (error) {
          return handleError(error, res);
     }
};

const getBC  = (req, res) => {
     try {
          const { a,ans_b,ans_c } = req.body;
          if (!a || !ans_b || !ans_c)
               throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled missing value");

          const DOSCG_Model = new DOSCG();
          DOSCG_Model.setAnswer(a,ans_b,ans_c)
          return res.json({ success: true, message: DOSCG_Model.getBC() });

     } catch (error) {
          return handleError(error, res);
     }
};
   
const getPlace = (req, res) => {
     try {
          const { name } = req.body;
          if (!name)
               throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled missing value");
               
          var url = config.google_map_api_url + '/place/findplacefromtext/json?input=' + name + '&inputtype=textquery&fields=name,place_id,photos&language=th&region=TH&key=' + config.google_map_api_key
          
          https.get(url, (resp) => {
          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
               data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
               result = JSON.parse(data)
               console.log(result)
               if(result.status == "OK"){
                    var place_name = result.candidates[0].name;
                    var place_id = result.candidates[0].place_id;

                    place_photo = result.candidates[0].photos[0].photo_reference;
                    place_photo_url = config.google_map_api_url + '/place/photo?maxwidth=400&photoreference=' + place_photo + '&sensor=false&key=' + config.google_map_api_key
                    return res.json({success: true, message:{
                         "name":place_name,
                         "photo":place_photo_url
                    }});
               }else{
                    return res.json({success: false, message:"No result"});
               }
               
          });

          }).on("error", (err) => {
               console.log(err);
               return handleError(err, res);
          });
          
     } catch (error) {
          return handleError(error, res);
     }
}

const getRoute = (req, res) => {
     try {
          const { origin,destination } = req.body;
          if (!origin || !destination)
               throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled missing value");
               
          var url = config.google_map_api_url + '/directions/json?origin=' + origin + '&destination=' + destination + '&key=' + config.google_map_api_key
          
          https.get(url, (resp) => {
               let data = '';

               // A chunk of data has been recieved.
               resp.on('data', (chunk) => {
                    data += chunk;
               });

               // The whole response has been received. Print out the result.
               resp.on('end', () => {
                    result = JSON.parse(data)
                    if(result.status == "OK"){
                         return res.json({success: true, message:result.routes[0] });
                    }else{
                         return res.json({success: false, message:"No result"});
                    }
                    
               });

               }).on("error", (err) => {
                    return handleError(err, res);
               });
          
     } catch (error) {
          return handleError(error, res);
     }
}



const getStaticMap = (req, res) => {
     try {
          const { encoded_polyline } = req.body;
          if (!encoded_polyline)
               throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled missing value");
               
          var url = config.google_map_api_url + '/staticmap?size=600x400&path=enc%3A' + encoded_polyline + '&key=' + config.google_map_api_key
          
          https.get(url, (resp) => {
               var data = new Stream();      

               // A chunk of data has been recieved.
               resp.on('data', function(chunk) {                                       
                    data.push(chunk);                                                         
               });  

               // The whole response has been received. Print out the result.
               resp.on('end', () => {
                    // fs.writeFileSync('/map.png', data.read()); 
                    return res.end(data.read())
               });

               }).on("error", (err) => {
                    return handleError(err, res);
               });
          
     } catch (error) {
          return handleError(error, res);
     }
}



module.exports = {
     getXYZ,
     getBC,
     getPlace,
     getRoute,
     getStaticMap
};