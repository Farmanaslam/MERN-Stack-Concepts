const mongoose=require('mongoose')
const { Schema } = mongoose;

const taskSchema  = new Schema({
  title:{type:String,required:true},
  status:{type:Boolean,requred:true},
  date:{type:String,required:true}
});
exports.Task=mongoose.model('Task',taskSchema)