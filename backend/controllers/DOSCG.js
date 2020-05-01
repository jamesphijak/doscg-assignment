const { handleError, ErrorHandler, HttpStatus } = require("../utils/error");
const DOSCG = require("../models/DOSCG");
const axios = require('axios');
const config = require('../configs/config')
const https = require('https');

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
               
          var url = config.google_map_api_url + '/place/findplacefromtext/json?input=' + name + '&inputtype=textquery' + '&fields=name' + '&key=' + config.google_map_api_key
          
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
                    return res.json({success: true, message:result.candidates[0].name});
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

module.exports = {
     getXYZ,
     getBC,
     getPlace,
     getRoute
};