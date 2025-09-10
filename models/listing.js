const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://wallpaperaccess.com/full/1536671.jpg", // this will work when we doesn't pass image in db
      set: (v) => v === "" ? "https://wallpaperaccess.com/full/1536671.jpg" : v, // this will work when we pass image but in image we don't give value of our image
    }
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;