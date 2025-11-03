# 🎯 Event Planner Pro (Cloud-Native Web App)

A **secure, full-stack event management application** built with **Node.js** and a **single-file React frontend**.  
The main goal of this project is to demonstrate a **robust, containerized deployment pipeline** orchestrated by **Kubernetes**.

---

## ✨ Features

The application provides a foundational set of features for authenticated users to manage their personal event schedules:

- 🔐 **User Authentication:**  
  Secure sign-up and login endpoints using **JWT** and **bcrypt** for password hashing.

- 🗓️ **Event Management (CRUD):**  
  Users can create, read, and delete their scheduled events via a **RESTful API**.

- 💻 **Responsive Frontend:**  
  A simple **Single-Page Application (SPA)** built using **React (via Babel)** and styled with **Tailwind CSS**.

- 🧠 **In-Memory Database:**  
  The backend (`app.js`) utilizes an in-memory array for persistence.  
  Data resets whenever the server or container restarts.

---

## 💻 Tech Stack

| **Category**        | **Technology**              | **Description**                                                |
|----------------------|-----------------------------|----------------------------------------------------------------|
| **Backend**          | Node.js, Express            | Core application server and REST API development.              |
| **Frontend**         | React (Babel), HTML/CSS     | Single-file component architecture for dynamic UI.             |
| **Containerization** | Docker                      | Packages the entire Node.js application into a container.      |
| **Orchestration**    | Kubernetes (K8s)            | Manages deployment, scaling (2 replicas), and service exposure.|

---

## 🚀 Local Development Setup

To run the application **outside of Docker**, follow these steps:

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- npm

---

### ⚙️ Installation

**1. Clone the Repository:**
```bash
git clone https://github.com/HanaAbdelbari/Cloud-Native-Web-App.git event-planner
cd event-planner
