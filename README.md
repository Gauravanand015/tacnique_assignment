# Task Management API

The Task Management API is a RESTful service for managing tasks and user accounts. It provides endpoints for user registration, authentication, creating, updating, retrieving, and deleting tasks.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB database set up.

## Installation

1. Clone this repository:

   git clone https://github.com/Gauravanand015/tacnique_assignment.git

   Open the cloned repository in the editor

   npm install

## Configuration

Before running the API, you need to configure some environment variables. Create a .env file in the root directory of your project and set the following variables:

PORT=8500 # Port for the API to listen on
SECRET_KEY=yourSecretKey # Secret key for JWT token generation
MONGO_URI=yourMongoDBConnectionURI # MongoDB connection URI

## Running the API

To start the API, run the following command:
npm start

The API will run on the port specified in your .env file.

## API Endpoints

### User Management

Register a New User

- POST /user/register: Register a new user.
  Request Body:
  name (string): User's name.
  email (string): User's email.
  password (string): User's password.
  Response: User registration confirmation or error message.

Log In a User

 - POST /user/login: Log in a user.
  Request Body:
  email (string): User's email.
  password (string): User's password.
  Response: JWT token for authentication or error message.

### Task Management

#### Get All Tasks

- GET /tasks: Get all tasks.
  Response: List of tasks.
  Create a New Task 

#### Add Task
  
- POST /tasks: Create a new task (Requires Authentication).
  Request Body:
  title (string): Task title.
  description (string): Task description.
  Response: Created task or error message.

#### Get a Specific Task by ID (Requires Authentication)

- GET /tasks/:taskId: Get a specific task by ID (requires authentication).
  Response: Task details or error message.

#### Delete a Task by ID (Requires Authentication)

- DELETE /tasks/:taskId: Delete a task by ID (requires authentication).
  Response: Task deleted confirmation or error message.

#### Update a Task by ID (Requires Authentication)

- PUT /tasks/:taskId: Update a task by ID (requires authentication).
  Request Body:
  title (string): Task title.
  description (string): Task description.
  status (string): Task status.
  Response: Task updated confirmation or error message.

## AUTHENTICATION

To access protected routes (create, read, update, delete tasks), you must include a valid JWT token in the Authorization header of your HTTP request. Obtain a token by registering and logging in as a user.
