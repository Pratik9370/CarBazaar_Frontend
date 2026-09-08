# 🚗 CarBazaar – Frontend

**CarBazaar** is a modern web platform designed to help users **discover, explore, list, and evaluate used cars**.

The platform connects potential buyers and sellers by providing detailed car information, filtering and search functionality, car listings, and an **ML-powered used car price estimation** feature.

> ⚠️ **Note:** CarBazaar does not directly facilitate the purchase or sale of vehicles. It acts as an informational platform where sellers can register their cars and buyers can explore available listings and get an estimated idea of a car's market value.

---

## ✨ Features

### 🚘 Car Listings

* Browse available used car listings.
* View detailed information about each car.
* Sellers can register their vehicles on the platform.
* Display important details such as:

  * Brand & Model
  * Manufacturing Year
  * Fuel Type
  * Transmission
  * Kilometers Driven
  * Engine
  * Maximum Power
  * Location
  * Expected Price
  * Vehicle Images

### 🔍 Search & Filtering

Users can find suitable cars using filters such as:

* Brand
* Model
* Price range
* Fuel type
* Transmission
* Vehicle age
* Kilometers driven
* Body type
* Location

### 🤖 AI/ML Car Price Estimation

CarBazaar integrates a machine learning model to provide an **estimated price range** for a used car based on its characteristics.

The prediction considers features such as:

* Vehicle age
* Kilometers driven
* Fuel type
* Transmission
* Brand
* Model
* Engine
* Maximum power

The result is presented as an **estimated price range** rather than claiming to be the exact market price.

### 👤 User Authentication

* User registration and login
* JWT-based authentication
* Protected user functionality
* Secure authentication using HTTP-only cookies

### 📱 Responsive UI

The interface is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

### 🖼️ Car Images

Users can view multiple images associated with a vehicle listing to better understand its condition and appearance.

### 📍 Location Support

Car listings can include location information, helping users understand where the vehicle is available.

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **React Router**
* **Lucide React**

### Backend

The frontend communicates with a backend API built using:

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

### Machine Learning

Car price estimation is provided through a separate ML API using:

* **Python**
* **FastAPI**
* **Pandas**
* **Scikit-learn**
* **Joblib**
* **Random Forest Regressor**

### Other Services

* **Cloudinary** – Image storage
* **Redis** – OTP/session-related functionality
* **Geo-location APIs** – Location detection

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      CarBazaar      │
                    │      Frontend       │
                    │  React + Vite       │
                    └──────────┬──────────┘
                               │
                     REST API Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │ Node.js + Express   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
         MongoDB          Cloudinary         Redis
        Database          Car Images           OTP
                              
                              
                    ┌─────────────────────┐
                    │    ML Prediction    │
                    │   Python + FastAPI  │
                    └─────────────────────┘
```

---

## 📂 Frontend Project Structure

```text
CarBazaar/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── CarCard/
│   │   └── ...
│   │
│   │
│   ├── context/
│   │
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CarBazaar-Frontend.git
```

### 2. Navigate to the Project

```bash
cd CarBazaar-Frontend
```

### 3. Install Dependencies

```bash
npm install
```


### 4. Start the Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🔗 Backend Repository

The frontend communicates with the CarBazaar backend for authentication, car listings, user data, and other API operations.

**Backend Repository:**
`https://github.com/your-username/CarBazaar-Backend`

---

## 🤖 Machine Learning API

The ML service is responsible for estimating the price range of used cars.

**ML Repository:**
`https://github.com/your-username/CarBazaar-ML`

---

## 🌐 Deployment

The CarBazaar frontend can be deployed using platforms such as:

* Vercel
* Netlify
* Render

Example production architecture:

```text
User
 │
 ▼
CarBazaar Frontend
(Vercel / Netlify / Render)
 │
 ├──────────────► Express Backend
 │
 └──────────────► FastAPI ML Service
                         │
                         ▼
                    ML Model
```

---

## 🔐 Security

The application follows several security practices, including:

* HTTP-only authentication cookies
* JWT-based authentication
* Protected API routes
* Environment variables for sensitive configuration
* CORS configuration
* No sensitive credentials stored directly in the frontend source code

---

## 🎯 Purpose of the Project

CarBazaar was developed as a **full-stack development project** to apply concepts learned in:

* Frontend development
* Backend development
* REST APIs
* Authentication
* Database management
* Cloud image storage
* Machine learning integration
* API communication
* Deployment

The project focuses on creating a practical platform that makes it easier for users to **research used cars, compare listings, register vehicles, and understand estimated vehicle values**.

---

## 🚀 Future Improvements

Some possible improvements include:

* ⭐ User reviews and ratings
* ❤️ Wishlist / favorite cars
* 🔔 Price alerts
* 💬 Buyer-seller communication
* 📊 Advanced car price analytics
* 🗺️ Improved location-based search
* 🔎 More advanced filtering
* 📈 Historical price trends
* 🧠 Improved ML model with larger datasets
* 🛡️ Admin dashboard for listing moderation

---

## 👨‍💻 Author

**Pratik Jadhav**

Computer Engineering Student
Full-Stack Developer | MERN Stack | Machine Learning

---

## ⭐ Feedback

If you find this project interesting, feel free to explore the repository and provide feedback or suggestions for improvement.

**CarBazaar — Explore Cars. Understand Their Value.**
