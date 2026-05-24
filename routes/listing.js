const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); // using cloudinary cloud storage fopr storing imgs

//Index Route & Create Route
router.route("/").get(wrapAsync(listingController.index)).post(
  // using router.route() to structure our code
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing, // USE OF joi IN schema.js file
  wrapAsync(listingController.createListing),
);
// .post(, (req, res) => {
//   //Using multer npm package
//   res.send(req.file);
// });

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route & Update route & Delete Route
router
  .route("/:id") // using router.route() to structure our code
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
