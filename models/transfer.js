var mongoose = require('mongoose');
var TransferSchema = new mongoose.Schema({
  fromaccountnumber: {
      type: String
    },
    toaccountnumber: {
      type: String
    },
    amount:{
      type: String
    },
    reason:{
      type: String
    }
});

var Transfer = mongoose.model('transfers', TransferSchema);
module.exports =Transfer;
