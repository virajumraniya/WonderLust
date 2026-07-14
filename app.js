if (process.env.NODE_ENV != "production") {
  // for development phase only.
  require("dotenv").config(); // using dotenv npm package
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // user .default when you need to face an error.
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // Local mongoDB url
const dbUrl = process.env.ATLAS_URL; // Mongo Atlas url
let dbConnectionPromise = null;

const mongoOptions = {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 5000,
};

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose.connect(dbUrl, mongoOptions).catch((err) => {
      dbConnectionPromise = null;
      throw err;
    });
  }

  await dbConnectionPromise;
}

async function startServer() {
  await connectDB();
  console.log("connected to DB");
  app.listen(port, () => {
    console.log("Server is listening on port 8080...");
  });
}

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // days * hours * mins * secs * mili-secs
    maxAge: 7 * 24 * 60 * 60 * 1000, // days * hours * mins * secs * mili-secs
    httpOnly: true, // to prevent cross-scripting attacks
  },
};

if (process.env.NODE_ENV === "production") {
  const store = MongoStore.create({
    mongoUrl: dbUrl,
    mongoOptions,
    touchAfter: 24 * 3600,
  });

  store.on("error", (err) => {
    console.log("error in Mongo Session-store", err);
  });

  sessionOptions.store = store;
}

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(new ExpressError(500, "Database connection failed. Please check the MongoDB Atlas network access and environment variables."));
  }
});

app.use(session(sessionOptions)); // using express-session
app.use(flash()); // using connect-flash

app.use(passport.initialize()); // To use Passport in an Express or Connect-based application, configure it with the required passport.initialize() middleware.
app.use(passport.session()); // If your application uses persistent login sessions (recommended, but not required), passport.session() middleware must also be used
passport.use(new LocalStrategy(User.authenticate())); // Passport provides an authenticate() function, which is used as route middleware to authenticate requests.

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); // Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser()); // Generates a function that is used by Passport to deserialize users into the session

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next(); // if you not write this line then this middleware becomes stucked..and your req will not pass to the next middleware.
});

// app.get("/registerUser", async (req, res) => {
//   let fakeUser = {
//     email: "student18@gmail.com",
//     username: "student123",
//   };
//   let newUser = await User.register(fakeUser, "Hello123"); // register(user, password, cb) --> Convenience method to register a new user instance with a given password. Checks if username is unique.
//   res.send(newUser); // Response page --> {"email":"student@gmail.com","_id":"69fd892f8236d9b53f90f4b0","username":"student","salt":"4602b73e3b406a9186592a431d8d1fd3c488819c598344f14b37d46fb2dfc792","hash":"ffaccfffada8d8e31bae05f9f4de50c40856844c680fc30e1903089a9641cdee08dc5dbbeb2f3b1d106112bad0947e0297e615c820db6d40e7714e2b23b1142eabd43be3da5efcf02d0aaba3173590b6089780877dba2fc114bb341d67699510eeea6a77ad1f3953bf580331c923a322879790c6c2509bb1f4d79f94587546546a60e0d555c2d3162cac4015862f97112bb94dd1ab4c1eab9d799d57ab6753320a2c18fd38c5749199a5b44ff8eb8c6e666bf39ed13362c5d9bf7487907ddcf8aa3250be33b500a7ab45a33705605bdbeb3fd613009be64608ded926e1e83faf3efa406aefb26007dc655c8128511705f0b3498490fb273d5c12c889d2e9141fa8689200c04be72b9555bb068afed8d68aa4cac76dfc36e658b1cf1900557b5499c48aec4ad12d3477d7121c7d161779cc0f2aed1c9aa76814e0e66c2e54c3c7e6847ba56f73827b949bbc15f04ebb34ce9182e5c691b68bb51369baff6bf0fda3420179baf287e79df2c8aa27e3b8897555b3b45baa4ceb26f94df1258967b5858f28203915bcf1013acab7b020707a2954d59fc52e99c53c398b3d0bce57c5aca18444e35627e30a4d89fd02021791b3897df5c6e3bbf73d70c2d9f207e7aa7d31e526e72a69adea2562675c237817f74b266cf482e7db51f80196d364527b70f5628ba673b92e7c81067e28f930551c3317ad48f6ab2138afcfe77ab4516c","__v":0}
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ERROR HANDLING MIDDLEWARES :
// always define default error handling middlewares pf express at the end
// For all other wrong routs
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// Custom error handling
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

if (require.main === module) {
  startServer()
  .then(() => {
    // Server started successfully.
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });
}

module.exports = app;
