# 🥗 HealMeals Frontend — Health-Conscious Recipe Platform

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-8B5CF6)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

---

**HealMeals Frontend** is the web interface of the HealMeals system — a full-stack application that helps users find recipes suitable for their dietary needs and health conditions.  
This repository contains the **React + Vite (TypeScript)** implementation for all user and admin interfaces.

---

## 🎥 Project Demo

[![Watch the HealMeals Demo](https://img.youtube.com/vi/BUDsvqlEql8/0.jpg)](https://youtu.be/BUDsvqlEql8)
> 📹 Click the thumbnail to watch the 3-minute HealMeals walkthrough!

---

## 🚀 Current Features

### 👤 **User-Side**
- **Account System:** User registration, login, and profile management (fully functional).  
- **Health Profile:** Users can add and manage their health conditions *(data stored via backend API but personalization not yet active)*.  
- **Recipe Pages:**  
  - View all recipes.  
  - Detailed recipe view with ingredients and preparation steps.
- **Donation Form:** Fully functional form linked to backend endpoint. 

### 🧑‍💼 **Admin Panel**
- Manage content via CRUD operations for:  
  - Users  
  - Recipes  
  - Ingredients  
  - Global Conditions  
  - User Conditions  
  - Donations  
- Clean UI built with **shadcn/ui** and **Lucide-react** icons.  

---

## 🧩 Features in Progress
- 🔸 **Recipe Reviews (UI + backend logic pending)**  
- 🔸 **Recipe Rating (backend logic pending)**  
- 🔸 **Recipe Sharing (social & link sharing)**  
- 🔸 **Flagging Recipes** for unsafe or incorrect data  
- 🔸 **Search Bar & Filtering System**  
- 🔸 **AI-based Personalization (future backend feature)**  

---

## 🧠 Project Vision
HealMeals aims to be a **smart dietary assistant** that helps people manage their nutrition safely.  
The frontend provides an intuitive, responsive interface for users and admins, while the backend (built with Spring Boot) handles logic, authentication, and data storage.

---

## 🏗️ Tech Stack

### **Frontend**
- ⚛️ **React + Vite (TypeScript)** — component-based UI  
- 🎨 **Tailwind CSS** — responsive design  
- 🧩 **shadcn/ui** — modern UI components  
- 🧠 **Lucide-react** — elegant icons  

---

## 🔄 Backend Information

At present, HealMeals Frontend is connected to our **current backend implementation built with Spring Boot (Java)**.  
This backend supports all major endpoints for:
- Users, Recipes, Ingredients, and Donations  
- Health Conditions (global and user-specific)  
- Authentication (JWT-based)

### ⚙️ Upcoming Backend Rehaul
We are currently in the process of **redesigning and re-implementing the backend** to improve:
- ⚡ Performance and scalability  
- 🧠 Code structure and maintainability  
- 🔐 Security and API efficiency  
- 🧩 Support for new features like reviews, ratings, and personalized recommendations  

Once the new backend is complete, the frontend will switch to the new API seamlessly — with updated endpoints and improved data flow.

> 🛠️ Current Backend Repo: [HealMeals Backend (Current)](https://github.com/DuaA-A/HealMeals-Backend)  
---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yousseffe/heals-meals.git
cd healmeals
npm install
npm run dev
```


## 🧪 Future Roadmap

- ✅ Full Review and Rating System (UI + API)
- ✅ Search and Filtering
- ✅ Flagging System for Recipes
- 🔄 Personalized Recommendations based on health conditions
- 🔄 Chatbot Integration for food and recipe assistance
- 🔄 Mobile Version (React Native)

## 👩‍💻 Team

Developed by our team:
Roles:

Frontend Development — [Mariam Amro and Youssef Nabeh]

Backend Development — [Duaa Abd-Elati and Nada Assad]

---
## 🧾 License
This project is open-source under the [MIT License](LICENSE).

> 🔗 You can find the backend repository here: [HealMeals Backend](https://github.com/DuaA-A/HealMeals-Backend)

