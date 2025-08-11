# 🌩️ CloudyMeter

**CloudyMeter** is a complete IoT-based sensor monitoring system. It integrates physical sensors connected to an Arduino board, real-time data transmission using MQTT, data processing and persistence with a Java backend, storage in a PostgreSQL database, and a React/Next.js web frontend for visualization.

---

## 📁 Project Structure

```
.
├── arduino/          # Arduino code to read sensor data and publish via MQTT
├── backend/          # Java Spring Boot application to process and store data, handle authentication and sessions
├── database/         # SQL scripts for creating and configuring the PostgreSQL database
├── frontend/         # Web application built with React + Next.js
├── diagramas/
│   ├── arquitetura.png      # System architecture diagram
│   └── modelo_dados.png     # Entity-relationship (ER) diagram
└── README.md
```

---

## 📷 Diagrams

### System Architecture

![System Architecture](./diagrams/diagrama%20Arquitetura.png)

### Entity-Relationship Diagram

![Data Model](./diagrams/diagrama%20ER.png)

---

## 🛠️ Technologies Used

- **Arduino + sensors**: for physical data collection
- **MQTT**: lightweight protocol for real-time messaging
- **Java + Spring Boot**: backend for consuming and storing the data
- **PostgreSQL**: relational database management system
- **React + Next.js**: modern web frontend

---

## 🚀 How to Run

### 1. Arduino

- Upload the code from the `arduino/` folder to your device
- Configure the Wi-Fi credentials and MQTT broker in the source code

### 2. Backend (Java)

```bash
cd backend/
./mvnw spring-boot:run
```

Make sure a PostgreSQL instance is running and accessible.
Create organizations with name and password credentials before starting or use API endpoints to register.


### 3. Database

- Run the SQL scripts located in the `database/` folder to initialize the schema

### 4. Frontend

```bash
cd frontend/
npm install
npm run dev
```

---

## 📌 Features

- Real-time sensor data monitoring  
- Historical data storage  
- Dashboard and graphical visualizations  
- Support for multiple sensors per device  
- Support for multiple organizations, each with isolated meters and sensors  
- User authentication via Basic Auth with session tokens (JWT) managed by the backend  
- Secure access control ensuring each organization only accesses its own meters and data  

---

## 🔐 Authentication & Authorization

- Users log in using organization credentials (name and password) via Basic Authentication  
- Backend validates credentials against stored organization data and issues a session token (JWT)  
- Frontend stores the token and includes it in API requests to authorize access  
- Backend verifies token validity and enforces access restrictions so organizations can only see their own meters and sensors  
- Token expiration and session management handled centrally in the backend  

---

## 📄 Full Documentation

You can access the full documentation (TCC report) here:  
📎 [CloudyMeter - Google Docs](https://docs.google.com/document/d/1JZ3B5b4yDFAEL1ascxJWgDR6ur6_lXzRr40IBrODyE4/edit?usp=sharing)

---

## ✍️ Author

Carlos Manoel Wendorff  
Software Engineering – Católica de Santa Catarina

---
