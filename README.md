# 🌍 Family Travel Tracker

A fun web app that allows a family to track the countries they have visited on an interactive world map.  
Each family member has their own color and visited countries are highlighted on the map.

---

## ✨ Features

👨‍👩‍👧‍👦 Add multiple family members  

🎨 Each member has their own color  

🌎 Track visited countries on a world map  

📍 Countries are stored per user  

🚫 Prevents duplicate country entries  

⚠️ Shows error messages for invalid countries  

---

## 📸 Screenshots

<img width="1919" height="1067" alt="image" src="https://github.com/user-attachments/assets/0096c2e4-db34-4952-a590-6b3f4cdbd1cd" />
<img width="1919" height="1068" alt="image" src="https://github.com/user-attachments/assets/2c76a94a-eb0f-4974-bcd3-e94dbbc2fbd1" />

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **EJS**
- **HTML / CSS / JavaScript**

---

## 📂 Project Structure

```
family-travel-tracker
│
├── public
│   └── styles
│       ├── main.css
│       └── new.css
│
├── views
│   ├── index.ejs
│   └── new.ejs
│
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/family-travel-tracker.git
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Create PostgreSQL database

```
CREATE DATABASE family_travel;
```

### 4️⃣ Create tables

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(15) UNIQUE NOT NULL,
  color VARCHAR(15) NOT NULL
);

CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  country_code CHAR(2),
  user_id INTEGER REFERENCES users(id),
  UNIQUE(country_code, user_id)
);
```

### 5️⃣ Start the server

```
node index.js
```

Open in browser:

```
http://localhost:3000
```

---

## 🚀 Future Improvements

⏱️ Add travel timeline  

🏆 Track most visited countries  

📊 Add statistics dashboard  

📍 Show country names on hover  

---

✨ A simple project to practice **Node.js, PostgreSQL, and EJS while visualizing travel on a world map!**
