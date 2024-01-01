const mongoose = require("mongoose");
const { Schema } = mongoose;
//Products Schema
const productSchema = new Schema({
    title: {type: String, required: true, unique:true},
    description: {type: String, required: true},
    price: {type:Number,required:true},
    discountPercentage: {type:Number,required:true},
    rating: {type:Number,min:[0,'wrong rating'],max:[5,'higher rating than 5']},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true},
    images: [{type: String, required: true}],
  });
  
  //making mongoose schema to a model or collection named product and now we can do CRUD using model
  exports. Product=mongoose.model('Product',productSchema)