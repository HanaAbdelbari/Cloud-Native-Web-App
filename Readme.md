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

## 🐳 Docker and Kubernetes Deployment

This section explains how to **build** the Docker image and **deploy** it to a local Kubernetes cluster (e.g., **Minikube**).

---

### ⚙️ 1. Build and Push the Docker Image

The included **Dockerfile** ensures all Node.js dependencies are installed and that static files (like `index.html`) are copied to `/public` so **Express** can serve them correctly.

#### 🏗️ Build the Image

Replace `hana345` with your **Docker Hub** username:

```bash
docker build -t hana345/event-planner:latest .
```

#### 📤 Push the Image

Make the image available for your Kubernetes cluster:

```bash
docker push hana345/event-planner:latest
```

---

### 🎯 2. Apply Kubernetes Manifests

The deployment is defined by two YAML files: `event-planner-deployment.yaml` and `event-planner-service.yaml`.

#### 🚀 Deploy the Application

Creates the Deployment and launches 2 Pod replicas:

```bash
kubectl apply -f event-planner-deployment.yaml
```

#### 🌐 Expose the Service

Creates a Service to expose the Pods externally (using NodePort on port 30080):

```bash
kubectl apply -f event-planner-service.yaml
```

---

### ✅ 3. Verify and Access

#### 🔍 Check Pod Status

Confirm that both Pods are running successfully:

```bash
kubectl get pods
```

#### 🌍 Access the App (Minikube)

If using Minikube, run the following command to automatically open the app in your browser:

```bash
minikube service event-planner-service
```

---

## 📁 Project Structure

```
event-planner-pro/
│
├── app.js                          # Main Node.js/Express backend server
├── package.json                    # Node.js dependencies
├── Dockerfile                      # Docker image configuration
├── public/
│   └── index.html                  # Single-page React frontend
├── event-planner-deployment.yaml   # Kubernetes Deployment manifest
└── event-planner-service.yaml      # Kubernetes Service manifest
```

---

## 🔒 Security Notes

- Passwords are hashed using **bcrypt** before storage
- JWT tokens are used for authenticated API requests
- All user data is isolated per authenticated user
- **Note:** This is a demonstration project with in-memory storage. For production use, implement a persistent database and additional security measures.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**hana345**

---

## 🙏 Acknowledgments

- Built with Node.js and Express
- Styled with Tailwind CSS
- Orchestrated with Kubernetes
- Containerized with Docker
