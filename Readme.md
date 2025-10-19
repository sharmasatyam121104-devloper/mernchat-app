
```markdown
# 💬 MERN Chat App

A **real-time chat application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
It enables users to create accounts, log in securely, and chat instantly in real time — powered by **Socket.io**.

---

## 🚀 Features

- 🔐 **User Authentication** (Register / Login / Logout)
- 💬 **Real-time Chat** using **Socket.io**
- 👥 **One-to-One Messaging**
- 🌐 **Online / Offline User Status**
- ⚙️ **RESTful APIs for backend operations**
- ☁️ **Secure Environment Configuration using `.env`**

---

## 🏗️ Tech Stack

### **Frontend (Client)**
- React.js (Vite)
- Axios (API requests)
- Context API / Redux (State Management)
- Tailwind CSS (UI Styling)
- Socket.io-client (Real-time chat)

### **Backend (Server)**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- JWT (Authentication)
- bcrypt.js (Password hashing)
- dotenv (Environment variables)



````

---

## 🧑‍💻 Setup & Installation

### 1️⃣ Clone the Repository

git clone https://github.com/<your-username>/mernchat.git
````

### **2️⃣ Navigate to Project Folder**

```bash
cd mernchat
```

### **3️⃣ Install Dependencies**

#### 🔹 Backend

```bash
cd server
npm install
```

#### 🔹 Frontend

```bash
cd ../client
npm install
```

---

## 🧩 Environment Variables Setup

Create a `.env` file in both **client** and **server** folders.

### **Server (.env)**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### **Client (.env)**

```
VITE_API_URL=http://localhost:5000
```

---

## 🏃‍♂️ Run the Project

### **Run Backend (Server)**

```bash
cd server
npm start
```

or

```bash
npm run dev
```

### **Run Frontend (Client)**

```bash
cd client
npm run dev
```

Now open 👉 **[http://localhost:5173](http://localhost:5173)** in your browser.

---


## 🧠 Future Improvements

* 📸 File & Image Sharing
* 👥 Group Chat Support
* 🔔 Message Notifications
* ✍️ Typing Indicators
* 🌙 Dark Mode

---

## 💪 Author

👤 **Satyam Sharma**
💼 Full Stack Developer
🔗 [GitHub Profile](https://github.com/sharmasatyam121104-devloper)




