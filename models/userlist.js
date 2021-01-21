var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  name: { type: String },
  accountnumber: { type: String },
  fromaccountnumber: [{ type: mongoose.Schema.ObjectId, ref: 'transfers'}],
  amount: [{ type: mongoose.Schema.ObjectId, ref: 'transfers'}]
})

var Userlist = mongoose.model('users', schema);
module.exports =Userlist;

//export default Mongoose.model('Locations', schema)