# Your Project Name

Brief description of your project.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
## Introduction

This is a full-stack payment application designed to streamline financial transactions between users. Built using the MERN stack, the application provides a secure and efficient platform for users to sign up, sign in, explore their dashboard, and seamlessly send money to other users.

## Features

- **User Authentication:** Easily create an account and securely log in.
- **Dashboard:** Access a personalized dashboard displaying user information and other users.
- **Send Page:** Initiate secure dummy money transfers to other users effortlessly.
- **Animation:** Enjoy a visually appealing experience with animated elements powered by Lottie.
- **State Management:** Efficiently manage application state using Recoil.

## Technologies

- **Frontend:**
  - React
  - React DOM
  - Lottie
  - Recoil
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Zod for validation
  - Axios for HTTP requests

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2.  Install dependencies.

```bash
  cd payment-app
  npm install
```

3. Start the server.

```bash
cd backend
node "index.js"
```

4. Start the client.

```bash
cd frontend
npm install
npm run dev
```


---

## Usage

This is a student project developed to gain hands-on experience with full-stack development. As you explore the application, keep in mind that its primary purpose is to showcase various skills and technologies learned during the development process.

1. **Signup and Login:**
   - Start by creating an account using the signup page. This process simulates user registration and authentication steps to demonstrate backend and frontend integration.

2. **Dashboard:**
   - Upon successful login, you'll be directed to the dashboard, where you can observe how user-specific data is displayed. Take a closer look at how state management (Recoil) is utilized for a smooth user experience.

3. **Send Money:**
   - Navigate to the send page to simulate money transfers between users. This feature highlights backend interactions, including data validation using Zod and HTTP requests with Axios.

4. **Animations:**
   - Enjoy the animated elements powered by Lottie, showcasing how frontend libraries can enhance the overall look and feel of the application.

5. **State Management:**
   - The project utilizes Recoil for state management. Experiment with different scenarios to see how the application maintains a consistent state across various components.

6. **Explore and Test:**
   - Feel free to explore other features and functionalities. While the project may not be a market-ready product, it serves as a valuable learning tool. Consider examining the source code to understand how different technologies are implemented.

Remember, this project is a reflection of the learning journey, and your engagement with it contributes to a deeper understanding of full-stack development concepts.


## Folder Structure


```bash

.
├── frontend/            # Vite Frontend App
│   ├── public/
│   ├── node_modules/
│   ├── src/
│   │   ├── assets/      # Images, fonts, etc.
│   │   ├── components/  # React components
│   │   ├── pages/       # React pages/screens
│   │   ├── main.js      # Main entry file for the Vite app
│   │   ├── App.jsx      # Main React file
│   │   ├── index.css
│   │   └── App.css
│   ├── store            # All the Recoil atoms are stored here
│   ├── package.json     # Frontend dependencies and scripts
│   ├── index.html
│   ├── tailwind.config
│   ├── vite.config
│   └── ...

├── backend/               # Backend Node.js App
│   ├── config.js          # Configuration files
│   ├── routes/            # Express routes
│   │   ├── account/       # Account route
│   │   ├── index/         # Main express app for all /api/v1 requests
│   │   ├── middlewares/   
│   │   ├── user/          # User route
│   ├── types.js           # Zod Schema file
│   ├── index.js           # Express application setup
│   ├── db.js              # Database Schema file
│   └── ...

├── .gitignore           # Git ignore file
├── README.md            # Project README file
├── package.json         # Backend dependencies and scripts
├── package-lock.json    # Dependency lock file
├── .env                 # Environment variable file
└── ...

├── Dockerfile
├── README.md


```




