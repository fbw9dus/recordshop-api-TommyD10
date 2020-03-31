const mongoose = require('mongoose')
const { Schema } = mongoose

/**CONNECT TO DB */
mongoose.connect("mongodb://localhost:27017/Car", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const CarSchema = new Schema({
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    }
})

const Car = mongoose.model('Car', CarSchema)

const OwnerSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    car:{
        ref:'Car',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Owner = mongoose.model('Owner', OwnerSchema)


;(async () =>{
    const iPace = await Car.create({
        brand: "Jaguar",
        model: "iPace"
    })

    const jon = await Owner.create({
        firstName: "Jon",
        lastName: "Snow",
        car: iPace.id
    })

    const owner = await Owner.findById(jon.id).populate('car')
   

    console.log(owner)
})()
