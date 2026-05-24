const Review = require("../models/review.js"); 
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  // console.log(newReview);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log("new review saved!");
  // res.send("new review saved");
  req.flash("success", "New Review created!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //In MongoDB, the $pull operator is an array update operator used to remove all instances of a value or values that match a specified condition from an existing array field
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};

