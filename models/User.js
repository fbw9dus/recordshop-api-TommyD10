const mongoose = require("mongoose");
const { Schema } = mongoose;
const encryption = require('../lib/validation/encryption')


const address = new Schema({
  street:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  }
})

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    address: address
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);



UserSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await encryption.encrypt(this.password);
  next();
});

UserSchema.pre("findOneAndUpdate", async function(next) {
  if (!this.getUpdate().password) return next();

  this._update.password = await encryption.encrypt(this._update.password);
  next();
});

module.exports = mongoose.model("User", UserSchema);
