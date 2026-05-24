const express = require("express");
const router = express.Router({ mergeParams: true }); // 	mergeParams --> Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.
const wrapAsync = require("../utils/wrapAsync.js"); // parent router : "/listings/:id/reviews" (common route)
// child router : "/" and "/reviewId" (after a common route name)

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { isRef } = require("joi");

const reviewController = require("../controllers/reviews.js");

//Review - POST route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//Review - DELETE Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
