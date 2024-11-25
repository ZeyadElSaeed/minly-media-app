This project is a full-stack media sharing platform where users can upload, view, like, and unlike images and videos. The platform consists of:

- **Backend**: Built with NestJS and Node.js, providing CRUD operations and API endpoints.
- **Frontend**: A React-based web application using Next.js.
- **Mobile**: A mobile application developed with Flutter.
- **Database**: PostgreSQL, used for storing user and media data.

The entire application (backend, frontend, and database) can be run using Docker Compose, simplifying the setup and deployment process.

## Project Structure

1. **Backend**: NestJS with Node.js for the server-side logic.
2. **Frontend**: Next.js with React for the web application.
3. **Mobile Application**: Flutter for cross-platform iOS and Android apps.
4. **Database**: PostgreSQL, managed within a Docker container.
5. **Docker**: A `docker-compose` configuration to run the backend, frontend, and database in containers.

---

## Features

- **Backend API**: CRUD operations for media content, user authentication (JWT), liking/unliking media.
- **Frontend**: Web interface to upload and interact with media, view the media feed, and like/unlike content.
- **Mobile**: Cross-platform Flutter app for managing media content and interacting with the platform.

---

## Prerequisites

Ensure the following tools are installed before running the app:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Flutter** (for mobile app development): [Install Flutter](https://flutter.dev/docs/get-started/install)

---

## Getting Started

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/yourusername/media-sharing-platform.git
cd media-sharing-platform 
```

### 2. Run with Docker Compose

This project includes a `docker-compose.yml` file that configures all necessary services (backend, frontend, and database) and runs them in containers.

1. **Build and start the containers**:
    
    In the root project directory (where `docker-compose.yml` is located), run:
    `docker-compose up --build`
    
    This will:
    - Build the Docker images for the backend, frontend, and PostgreSQL.
    - Start the containers for the backend server, frontend, and PostgreSQL database.
    - Expose the following ports:
        - **Frontend (Next.js)**: `http://localhost:3000`
        - **Backend (NestJS)**: `http://localhost:4000`
        - **PostgreSQL**: `localhost:5432`
2. **Access the web application**:
    Once the containers are up and running, you can access the web application at `http://localhost:3000` in your browser.
3. **Stop the containers**:
    To stop the containers, run:
    `docker-compose down`

### 3. Mobile Application (Flutter)

To run the mobile app on your device/emulator, follow these steps:

1. **Navigate to the Flutter mobile app directory**:
    `cd mobile-app`
    
2. **Install Flutter dependencies**:
    Run the following command to install the necessary packages:
    `flutter pub get`
    
3. **Run the app**:
    - For **Android**:
        `flutter run`
    - For **iOS**:
        `flutter run --ios`
The mobile app will interact with the backend running on `http://localhost:4000`.

---
## API

### Auth API
- Login
```bash
POST /auth/login
Content-Type: application/json
{
  "username": "user@example.com",
  "password": "password123"
}

```

### Users API
- Create User (Register)
```bash
POST /users
Content-Type: application/json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}
```

- Get User Info
```bash
GET /users
Authorization: Bearer <JWT_TOKEN>
```

- Get User's Media
```bash
GET /users/media
Authorization: Bearer <JWT_TOKEN>
```


### Media API

- Upload Media
```bash
POST /media
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>
```

- Get All Media
```bash
GET /media
Authorization: Bearer <JWT_TOKEN>
```

- Get One Media Content
```bash
GET /media/{:id}
Authorization: Bearer <JWT_TOKEN>
```

- Update Media
```bash
PATCH /media/1
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "title": "Updated Media Title",
}
```

- Update Media
```bash
PATCH /media/1
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

- Delete Media
```bash
DELETE /media/1
Authorization: Bearer <JWT_TOKEN>
```

- Like Media
```bash
GET /media/1/like
Authorization: Bearer <JWT_TOKEN>
```

- Unlike Media
```bash
GET /media/1/unlike
Authorization: Bearer <JWT_TOKEN>
```
