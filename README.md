# 🌍 WonderLust - Full Stack Travel & Accommodation Platform

WonderLust is a full-stack web application inspired by Airbnb that allows users to explore, create, edit, and review accommodation listings from different destinations.

The application includes secure user authentication, authorization, image uploads, interactive maps, reviews, session management, and a responsive user interface.

## 🚀 Live Demo

🌐 **Live Application:**
https://wanderlust-hotel-app.vercel.app/

💻 **GitHub Repository:**
https://github.com/virajumraniya/WonderLust

## ✨ Features

* 🏡 Browse accommodation listings
* 🔍 View detailed information about individual properties
* ➕ Create new listings
* ✏️ Edit existing listings
* 🗑️ Delete listings
* ⭐ Add and delete reviews
* 👤 User registration and login
* 🔐 Secure authentication using Passport.js
* 🛡️ Authorization for listing owners and review authors
* 📸 Upload and manage property images using Cloudinary
* 🗺️ Interactive maps and geocoding using Mapbox
* 💬 Flash messages for success and error notifications
* 🍪 Session-based authentication
* 📱 Responsive and user-friendly interface
* ⚠️ Server-side data validation and error handling

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js
* RESTful Routes

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Authentication & Security

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session
* Connect Mongo
* Connect Flash

### Image Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

### Maps & Location

* Mapbox API
* Geocoding

### Validation

* Joi

### Deployment & Development Tools

* Git
* GitHub
* Vercel
* dotenv

## 📂 Project Structure

```text
WonderLust/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/virajumraniya/WonderLust.git
```

### 2. Navigate to the Project Directory

```bash
cd WonderLust
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token
```

> Never upload your `.env` file or secret API credentials to GitHub.

### 5. Start the Application

```bash
node app.js
```

Or, if Nodemon is installed:

```bash
nodemon app.js
```

The application will typically run at:

```text
http://localhost:8080/listings
```

## 🔐 Authentication & Authorization

WonderLust provides secure user authentication and authorization.

Users can:

* Create a new account
* Log in and log out
* Create accommodation listings after authentication
* Edit or delete only their own listings
* Add reviews to listings
* Delete only their own reviews

Authentication is implemented using **Passport.js** and **passport-local-mongoose**.

## 📸 Image Uploads

Property images are uploaded and stored using **Cloudinary**. The application uses Multer and Multer Storage Cloudinary to process image uploads.

This allows images to be stored in the cloud instead of directly on the application server.

## 🗺️ Map Integration

The application integrates **Mapbox** to provide interactive maps and location-based information for accommodation listings.

When a listing location is provided, its geographical coordinates can be used to display the property on an interactive map.

## 🌐 RESTful Routes

The application follows RESTful routing principles for managing resources.

| Method | Route                             | Description           |
| ------ | --------------------------------- | --------------------- |
| GET    | `/listings`                       | Display all listings  |
| GET    | `/listings/new`                   | Show new listing form |
| POST   | `/listings`                       | Create a new listing  |
| GET    | `/listings/:id`                   | Show listing details  |
| GET    | `/listings/:id/edit`              | Show edit form        |
| PUT    | `/listings/:id`                   | Update a listing      |
| DELETE | `/listings/:id`                   | Delete a listing      |
| POST   | `/listings/:id/reviews`           | Add a review          |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review       |

## 💡 What I Learned

While building WonderLust, I gained hands-on experience with:

* Building a complete full-stack web application
* Creating RESTful routes with Express.js
* Working with MongoDB and Mongoose
* Designing schemas and relationships between models
* Implementing MVC architecture
* User authentication using Passport.js
* Authorization and ownership validation
* Managing sessions with MongoDB
* Uploading images to Cloudinary
* Integrating Mapbox maps and geocoding
* Server-side validation using Joi
* Creating reusable EJS templates
* Implementing flash messages
* Handling asynchronous errors
* Using middleware in Express.js
* Deploying a full-stack application

## 🔮 Future Improvements

* 🔍 Advanced search functionality
* 🏷️ Filter listings by category
* 💰 Filter properties by price range
* 📅 Add booking and reservation functionality
* 💳 Integrate online payments
* ❤️ Add a wishlist or favorites feature
* 🌙 Add dark mode
* 📱 Improve mobile responsiveness
* 📊 Add a user dashboard
* 📧 Add email verification and password reset
* ⭐ Improve the rating and review system

## 👨‍💻 Author

**Viraj Umraniya**

Computer Engineering Student | MERN Stack Developer

GitHub: @virajumraniya

## ⭐ Support

If you found this project interesting or useful, consider giving the repository a ⭐!

---

Made with ❤️ using Node.js, Express.js, MongoDB, and EJS.
