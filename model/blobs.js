/*eslint-env node */
var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: String,
  date: Date,
  data: String
  
});
mongoose.model('CrashCollection', blobSchema);