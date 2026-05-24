const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
    // filename: {
    //   type: String,
    //   default: "listingimage",
    // },
    // url: {
    //   type: String,
    //   default: "https://wallpaperaccess.com/full/1536671.jpg", // this will work when we doesn't pass image in db
    //   set: (v) =>
    //     v === "" ? "https://wallpaperaccess.com/full/1536671.jpg" : v, // this will work when we pass image but in image we don't give value of our image
    // },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", //Using Joi here
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", //using joi here
  },
  geometry: { // mongoose GeoJson format --> The most simple structure in GeoJSON is a point. Note that longitude comes first in a GeoJSON coordinate array, not latitude.
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  // category:{ for impliment backend functionality in categpry of icons at index page
  //  type:String,
  //  enum:["mountain","beach","etc"]
  // },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  // WHEN WE DELETE LISTINGS THEN ALL REVIEWS ALSO DELETED WITH THIS MONGOOSE MIDDLEWARE
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
