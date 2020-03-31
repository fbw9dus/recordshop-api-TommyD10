const mongoose = require('mongoose')
const { Schema } = mongoose

/**CONNECT TO DB */
mongoose.connect("mongodb://localhost:27017/bakery", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const nutritioinFacts = new Schema({
    calories:{
        type: Number,
        required: true
    },
    carbs:{
        type: Number,
        required: true
    },
    protein:{
        type:Number,
        required: true
    },
    fat:{
        type: Number,
        required: true
    }
        
})

const BreadSchema = new Schema({
    productName:{
        type: String,
        required:true
    },
    weight:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    nutritioinFacts: nutritioinFacts
})

const Bread = mongoose.model('Bread', BreadSchema);

(async () =>{
    const bauernbrot = await Bread.create({
        productName:"Bauernbrot",
        weight: 1000 ,
        category: "Sauerteigbrot",
        nutritioinFacts:{
            calories:160,
            carbs:67,
            protein:12,
            fat:7
        }
    })
    const collectionData = await Bread.find()
    console.log(collectionData)
}) ()
