/*eslint-env node */
var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: String,
  date: Date,
  version: String,
  data: String
  
});
mongoose.model('CrashCollection', blobSchema);