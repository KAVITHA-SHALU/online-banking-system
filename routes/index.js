var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
//var User = require('../models/user');
var Transfer = require('../models/transfer');
var Userlist = require('../models/userlist');
//get the pages
router.get('/',function(req, res, next){
  return res.render('final',{title:'HOME'});
});

// router.get('/final.html',function(req, res, next){
//   return res.render('final',{title:'HOME'});
// });

// router.get('/moneytrans.html',function(req, res, next){
//   return res.render('moneytrans',{title:'moneytrans.html'});
// });

router.get('/userlist',function(req, res, next){
Userlist.aggregate([
    {
        "$lookup": {
            "from": "transfers",
            "localField": "accountnumber",
            "foreignField": "toaccountnumber",
            "as": "resultingTagsArray"
        }
    },
    { "$unwind": "$resultingTagsArray" },
    {
      "$group": {
          "_id": {
           "accountnumber": { "$ifNull": ["$accountnumber", ""] },
           "amount": { "$ifNull": ["$resultingTagsArray.amount", ""] },
           "name": { "$ifNull": ["$name", ""] },
           "fromaccountnumber": { "$ifNull": ["$resultingTagsArray.fromaccountnumber", ""] },
        }
    }
  },
  {
    "$project":
    {
      "name": "$_id.name",
      "accountnumber": "$_id.accountnumber",
      "fromaccountnumber": "$_id.fromaccountnumber",
      "amount": "$_id.amount",
      "_id": 0
    }
  }

 ]).exec(function(err, results){
   if(err) console.log(err);
   else { 
     console.log(results);
     res.end( JSON.stringify(results));
   }
 })

});

router.post('/moneytrans', bodyParser, function(req, res, next){
  //console.log(req.body);
  if(req.body.fromaccountnumber && req.body.toaccountnumber && req.body.amount && req.body.reason){
      
       var transferData = {
        fromaccountnumber: req.body.fromaccountnumber,
        toaccountnumber: req.body.toaccountnumber,
        amount: req.body.amount,
        reason: req.body.reason
         };
         // use sche,'s create method to insert document into mongo'
         Transfer.create(transferData, function(err, user){
           if(err){
             return res.send("NO DATA SAVED!! there was an error");
           }else {
             return res.send("Updated Successfully");
             }
         });
     }
     else{
       var err = new Error('All fileds are required');
       err.status =400;
       return next(err);
     }
});
module.exports = router;
