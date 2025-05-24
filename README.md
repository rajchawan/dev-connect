# DevConnect Backend

This is the backend server for the DevConnect application. It is built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- 🔐 User Authentication & Authorization
- 👤 Profile Management
- ➕ Follow/Unfollow Users
- 🔍 Search Users by Name
- ✅ RESTful API Endpoints

---

## 🧰 Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devconnect/devconnect-backend
   ```

````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root of the backend folder and add:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

---

## ▶️ Running the Server

Start the development server with:

```bash
npm start
```

The server will run at: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
devconnect-backend/
├── controllers/        # Request handlers
├── middlewares/        # Authentication middleware
├── models/             # Mongoose models
├── routes/             # Route definitions
├── index.js            # Main entry point
├── package.json        # Dependencies and scripts
└── .env                # Environment variables (DO NOT commit)
```

---

## 🔗 API Endpoints

| Method | Endpoint                | Description                 | Auth Required |
| ------ | ----------------------- | --------------------------- | ------------- |
| GET    | `/api/users/me`         | Get current user profile    | ✅             |
| PUT    | `/api/users/me`         | Update current user profile | ✅             |
| POST   | `/api/users/:id/follow` | Follow a user               | ✅             |
| GET    | `/api/users/search`     | Search users by name        | ✅             |
| GET    | `/api/users/:id`        | Get user by ID              | ✅             |

---

## 🛡️ Security Tips

* Never expose your `.env` file.
* Use HTTPS in production.
* Use a strong `JWT_SECRET` and rotate it periodically.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

For questions or feedback, feel free to open an issue or pull request on the repo.

```
````
