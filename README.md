
# 🏡 Roommate Finder Pro

Welcome to **Roommate Finder Pro** – a modern web application that helps individuals find compatible roommates based on preferences like location, rent, lifestyle, and more.

🌐 **Live Site:** [https://roommate-finder-pro.web.app/](https://roommate-finder-pro.web.app/)

🔗 **Client Repository:** [Client on GitHub](https://github.com/Programming-Hero-Web-Course4/b11a10-client-side-JAHID-SUPER-GIT)  
🔗 **Server Repository:** [Server on GitHub](https://github.com/Programming-Hero-Web-Course4/b11a10-server-side-JAHID-SUPER-GIT)

---

## ✨ Key Features

- 🔐 **Email/Password Authentication** with Google Sign-In option.
- 📥 **Add Roommate Listings** (title, rent, location, preferences, etc.).
- 🔍 **Browse & View Listings** from all users with detail view and like system.
- 💼 **My Listings** to view, update, or delete your own listings.
- ❤️ **Like Feature** on detail page with restricted logic (can't like own post).
- 📞 **Hidden Contact Info** revealed only after liking the post.
- 🌙 **Dark/Light Mode** toggle on Home page.
- 📱 Fully **Responsive Design** for mobile, tablet, and desktop.
- 🚫 404 Page and ⏳ Loading Spinner for better UX.

---

## 🛠️ Technologies Used

### 📦 Frontend
- React.js (Vite)
- React Router DOM
- Firebase Authentication
- TailwindCSS + DaisyUI
- React Helmet Async
- Lottie React
- React Awesome Reveal ✨
- React Simple Typewriter
- React Hot Toast
- SweetAlert2

### 🌐 Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS, Dotenv, JWT
- Vercel Deployment

---

## 🚦 Pages Overview

### 🔓 Public Pages
- `/` Home Page
- `/login` Login Page
- `/signup` Signup Page
- `/browse-listings` Browse all Roommate Listings
- `*` 404 Not Found

### 🔐 Protected Routes
- `/add-roommate` Add a Roommate Listing
- `/listing/:id` Details Page with Like & Contact
- `/my-listings` My Listings Page
- `/update/:id` Update a Roommate Post

---

## 📋 Functional Requirements Implemented

✅ **Routing:** No page breaks on reload, no auto-redirect from private route if already logged in  
✅ **Authentication:** Login/Register with validation, error messages via Toast/SweetAlert  
✅ **CRUD Operations:** Create, Read, Update, Delete listings  
✅ **Like System:** Users can like others’ posts multiple times, not their own  
✅ **Contact Info Reveal:** Contact number appears after clicking Like button  
✅ **Dark/Light Theme:** Toggle switch available on Home  
✅ **Extra Sections:** “How It Works” & “Why Choose Us”  
✅ **Responsiveness:** Perfectly optimized for all screen sizes  
✅ **Meaningful Content:** No Lorem Ipsum used  
✅ **.env Variables:** Firebase & MongoDB configs stored in `.env`  
✅ **UI/UX:** Unique, clean design inspired by ThemeForest

---

## 💡 Special Implementations

- **Animations** with `React Awesome Reveal`
- **Typing Effect** using `React Simple Typewriter`
- **Limit Query** in MongoDB to show only 6 Featured Roommates
- **Conditional Navbar** showing profile image & logout if logged in
- **Toast + SweetAlert2** for success/error/confirmation dialogs
- **Hover Tooltip** to show user display name on navbar avatar

---

## 📁 Folder Structure Highlights

```bash
client/
├── src/
│   ├── components/         # Reusable UI Components (Navbar, Footer, etc.)
│   ├── pages/              # All route pages (Home, Login, Signup, etc.)
│   ├── routes/             # Route configurations
│   ├── contexts/           # AuthContext for global user state
│   ├── hooks/              # Custom hooks like useAxiosSecure
│   ├── utils/              # Utilities (e.g., PrivateRoute)
│   └── assets/             # Images, animations, etc.
server/
├── routes/
├── models/
├── controllers/
├── middleware/
└── index.js
```

---

## 🔒 Environment Variables

Create a `.env` file in both `client/` and `server/`:

### For Client:
```
VITE_API_URL=https://your-server.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
...
```

### For Server:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Deployment

- **Client Side**: Deployed on **Firebase Hosting**
- **Server Side**: Deployed on **Vercel**

---

## 🧪 How to Run Locally

```bash
# Clone repos
git clone <client-repo-url>
git clone <server-repo-url>

# Client Setup
cd client
npm install
npm run dev

# Server Setup
cd server
npm install
nodemon index.js
```

---

## 🙋 Author

Made with ❤️ by [Jahid](https://github.com/JAHID-SUPER-GIT) for **Assignment-10 (Category: Orange)** under Programming Hero Web Development Course.

---

## 📜 License

This project is for educational purposes only. No commercial license.
