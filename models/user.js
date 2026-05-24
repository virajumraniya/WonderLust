// const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const passportLocalMongoose = require("passport-local-mongoose"); // this one is for older version for passport-local-mongoose
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
// console.log(typeof passportLocalMongoose); // this is for checking error is coming from where...
// console.log(passportLocalMongoose);

// You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
// https://www.npmjs.com/package/passport-local-mongoose
// Additionally, Passport-Local Mongoose adds some methods to your Schema. See the API Documentation section for more details.
