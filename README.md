# Kanban Board Platform 🚀

## Overview

This is a robust, full-stack Kanban board application designed to streamline project management and boost team productivity. Built with **Next.js 16 (App Router)** and **TypeScript**, it features a powerful backend powered by **Drizzle ORM** and **PostgreSQL (Neon DB)** for efficient data management, **Better-Auth** for secure authentication, and a sleek, responsive frontend styled with **Tailwind CSS** and **Shadcn UI**. The application leverages **Redux Toolkit** for state management and **React Query** for server-side data fetching, providing a seamless and highly interactive user experience.

## Features

- **User Authentication**: Secure user registration, login, and password management with email verification and Google OAuth.
- **Custom Onboarding Flow**: Personalized first-time user experience.
- **Dynamic Board Management**: Create, view, edit, and delete Kanban boards effortlessly.
- **Flexible Column Organization**: Add and customize columns within each board to match project stages.
- **Comprehensive Task Management**: Create tasks with titles, descriptions, status, and assignable subtasks.
- **Interactive Subtask Tracking**: Mark subtasks as complete to track granular progress.
- **Intuitive Drag-and-Drop Interface**: Easily move tasks between columns for agile workflow updates (implied by Kanban board UI).
- **Theming**: Seamless toggle between light and dark modes for user preference.
- **Responsive Design**: Optimized for a consistent experience across all devices.
- **Persistent Data Storage**: Reliable data management using PostgreSQL via Drizzle ORM.
- **Form Validation**: Client-side and server-side validation using Zod and React Hook Form for data integrity.

## Getting Started

To get this project up and running on your local machine, follow these steps:

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Ridwan-Lawal/Kanban.git
    cd Kanban
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Drizzle ORM and Database**:
    Initialize and push your database schema. Ensure your `DATABASE_URL` is configured correctly.
    ```bash
    npx drizzle-kit push
    # or to generate new migrations
    npx drizzle-kit generate
    ```
4.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

### Environment Variables

This project requires the following environment variables to be set in a `.env` file at the root of the project:

- `DATABASE_URL`: Your PostgreSQL connection string.
  Example: `DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"`
- `AUTH_SECRET`: A long, random string used for signing authentication tokens. Generate a secure one (e.g., using `openssl rand -base64 32`).
  Example: `AUTH_SECRET="your_strong_secret_key_here"`
- `AUTH_GOOGLE_ID`: Client ID for Google OAuth authentication.
  Example: `AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"`
- `AUTH_GOOGLE_SECRET`: Client Secret for Google OAuth authentication.
  Example: `AUTH_GOOGLE_SECRET="your-google-client-secret"`
- `AUTH_EMAIL_FROM`: The email address Better-Auth should use to send verification and password reset emails.
  Example: `AUTH_EMAIL_FROM="no-reply@yourdomain.com"`
- `NEXT_PUBLIC_APP_URL`: The public URL of your deployed application. This is used for callback URLs in authentication flows.
  Example: `NEXT_PUBLIC_APP_URL="http://localhost:3000"` (for local development)

## API Documentation

### Base URL

All API requests are made to the root path of the application or `/api`.

### Endpoints

#### `POST` `/api/auth/[...all]`

This is a catch-all route handled by `better-auth` for all authentication-related operations. It supports various authentication flows including email/password registration, login, password reset requests, email verification, and Google OAuth callbacks.

**Purpose**: Handles core user authentication processes.

**Requests Handled (conceptual, actual payloads vary based on `better-auth` internal implementation)**:

- **User Registration**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "StrongPassword123"
  }
  ```
- **User Login**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "StrongPassword123"
  }
  ```
- **Password Reset Request**:
  ```json
  {
    "email": "john.doe@example.com",
    "redirectTo": "/reset-password"
  }
  ```
- **Password Reset (after token verification)**:
  ```json
  {
    "token": "reset_token_from_email",
    "newPassword": "NewStrongPassword123"
  }
  ```
- **Email Verification**: (Handled via URL parameters after clicking email link)
- **Google OAuth Callback**: (Handled internally by `better-auth` redirects)

**Responses**:

- **Success**: Varies based on action, often a redirect or a JSON object indicating success.
  Example (Login Success):
  ```json
  {
    "success": true,
    "message": "Welcome"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input (e.g., missing fields, invalid email format).
  - `401 Unauthorized`: Invalid credentials, or unverified email.
  - `403 Forbidden`: User lacks necessary permissions.
  - `409 Conflict`: User already exists (for registration).
  - `500 Internal Server Error`: Unexpected server-side error.
    Example (Login Error):
  ```json
  {
    "error": "Invalid email or password."
  }
  ```

#### `GET` `/api/boards`

**Purpose**: Retrieves all Kanban boards associated with the authenticated user, including their columns.

**Request**:
This endpoint does not require a request body. Authentication is handled via session cookies.

**Response**:
**Success**:

```json
{
  "success": true,
  "data": [
    {
      "id": "board-uuid-1",
      "name": "Platform Launch",
      "createdAt": "2024-07-20T10:00:00.000Z",
      "userId": "user-uuid-1",
      "columns": [
        {
          "id": "column-uuid-1",
          "name": "Todo",
          "createdAt": "2024-07-20T10:05:00.000Z",
          "boardId": "board-uuid-1"
        },
        {
          "id": "column-uuid-2",
          "name": "Doing",
          "createdAt": "2024-07-20T10:06:00.000Z",
          "boardId": "board-uuid-1"
        }
      ]
    },
    {
      "id": "board-uuid-2",
      "name": "Marketing Plan",
      "createdAt": "2024-07-21T11:30:00.000Z",
      "userId": "user-uuid-1",
      "columns": []
    }
  ]
}
```

**Errors**:

- `401 Unauthorized`: User is not authenticated.
- `504 Gateway Timeout`: Connection timed out (e.g., database connection issues).
- `500 Internal Server Error`: Something went wrong while fetching boards.

---

### Backend Operations (Next.js Server Actions)

The following operations are handled via Next.js Server Actions, which are backend functions callable directly from client components. While not traditional REST endpoints, they represent the core API logic for managing boards, columns, tasks, and subtasks.

#### `addNewBoardAction(formData: BoardSchemaType)`

**Purpose**: Creates a new Kanban board for the authenticated user, optionally with initial columns.

**Request**:

```typescript
interface BoardSchemaType {
  name: string;
  columns?: Array<{ name: string }>;
}
```

**Response**:
**Success**: `{ success: string, newBoardId: string }`
**Errors**: `{ error: string }`

#### `editBoardAction(boardToEditId: string, boardData: BoardSchemaType)`

**Purpose**: Updates an existing Kanban board, including its name and columns.

**Request**:
`boardToEditId`: ID of the board to update (string).
`boardData`: Updated `BoardSchemaType` object.

**Response**:
**Success**: `{ status: "success", message: string }`
**Errors**: `{ status: "error", message: string }`

#### `deleteBoardAction(boardToDelId: string)`

**Purpose**: Deletes a Kanban board and all associated columns and tasks.

**Request**:
`boardToDelId`: ID of the board to delete (string).

**Response**:
**Success**: (Redirects to dashboard page, no explicit JSON response)
**Errors**: `{ status: "error", message: string }`

#### `addNewColumnsAction(formData: ColumnSchemaType, columnsBoardId: string)`

**Purpose**: Adds new columns to an existing board.

**Request**:

```typescript
interface ColumnSchemaType {
  columns: Array<{ name: string }>;
}
```

`columnsBoardId`: ID of the board to add columns to (string).

**Response**:
**Success**: `{ status: "success", message: string }`
**Errors**: `{ status: "error", message: string }`

#### `addNewTaskAction(formData: TaskSchemaType, columnId: string, boardId: string)`

**Purpose**: Adds a new task to a specific column within a board.

**Request**:

```typescript
interface TaskSchemaType {
  title: string;
  description: string;
  status: string; // The name of the column
  subtasks?: Array<{ title: string }>;
}
```

`columnId`: ID of the column where the task will be added (string).
`boardId`: ID of the board (string).

**Response**:
**Success**: `{ success: string }`
**Errors**: `{ error: string }`

#### `editTaskAction(taskToEdit: TaskSchemaType, taskToEditId: string)`

**Purpose**: Updates an existing task, including its details and subtasks.

**Request**:
`taskToEdit`: Updated `TaskSchemaType` object.
`taskToEditId`: ID of the task to update (string).

**Response**:
**Success**: `{ success: string }`
**Errors**: `{ error: string }`

#### `deleteTaskAction(taskToDelId: string)`

**Purpose**: Deletes a task and all its associated subtasks.

**Request**:
`taskToDelId`: ID of the task to delete (string).

**Response**:
**Success**: `{ success: string }`
**Errors**: `{ error: string }`

#### `updateTaskStatusAction(taskToUpdateId: string, newStatus: string)`

**Purpose**: Changes the status (column) of a specific task.

**Request**:
`taskToUpdateId`: ID of the task to update (string).
`newStatus`: The new status (column name) for the task (string).

**Response**:
**Success**: (No explicit JSON response)
**Errors**: `{ error: string }`

#### `updateSubtaskStatusAction(subtaskId: string, newStatus: boolean)`

**Purpose**: Toggles the completion status of a subtask.

**Request**:
`subtaskId`: ID of the subtask to update (string).
`newStatus`: The new completion status (boolean).

**Response**:
**Success**: (No explicit JSON response)
**Errors**: `{ error: string }`

## Usage

The Kanban Board Platform provides an intuitive interface for managing your projects.

1.  **Authentication**: Start by registering a new account with your email and password, or use Google OAuth for a quicker setup.
2.  **Onboarding**: After registration, you'll be guided through a quick onboarding to set your display name.
3.  **Create Boards**: Navigate to the dashboard. If no boards exist, click "+ Add New Board" to create your first project board. Give it a name and define your initial columns (e.g., "Todo", "Doing", "Done").
4.  **Manage Columns**: Within a board, you can add new columns by clicking "+ New Column".
5.  **Create Tasks**: Click "+ Add New Task" on the top right to add a task. Provide a title, description, and break it down into subtasks. Assign it to a relevant column.
6.  **Track Progress**: As you work, update task statuses by moving them between columns. Mark subtasks as complete within the task details view.
7.  **Theme Toggle**: Switch between light and dark modes from the sidebar or mobile menu for a comfortable viewing experience.

### Screenshots

Here's a glimpse of the application in action:

**Subtask Tracking**:
![Subtask tracking modal showing checklist with purple checkboxes](public/subtask.png)
_Efficiently break down and track progress of individual subtasks within each main task._

**Light and Dark Mode**:
![Side by side comparison of Kanban board in light and dark mode](public/darkmode.png)
_Seamlessly switch between light and dark themes to suit your preference and reduce eye strain._

## Technologies Used

| Technology        | Description                                                             | Link                                             |
| :---------------- | :---------------------------------------------------------------------- | :----------------------------------------------- |
| **Next.js 16**    | React framework for building full-stack web applications (App Router)   | [Next.js](https://nextjs.org/)                   |
| **TypeScript**    | Strongly typed JavaScript for enhanced code quality                     | [TypeScript](https://www.typescriptlang.org/)    |
| **React**         | Frontend library for building user interfaces                           | [React](https://react.dev/)                      |
| **Drizzle ORM**   | TypeScript ORM for declarative and type-safe database access            | [Drizzle ORM](https://orm.drizzle.team/)         |
| **PostgreSQL**    | Powerful, open-source relational database                               | [PostgreSQL](https://www.postgresql.org/)        |
| **Neon DB**       | Serverless PostgreSQL for scalable and efficient database hosting       | [Neon](https://neon.tech/)                       |
| **Better-Auth**   | Headless authentication library for Next.js                             | [Better-Auth](https://better-auth.dev/)          |
| **Tailwind CSS**  | Utility-first CSS framework for rapid UI development                    | [Tailwind CSS](https://tailwindcss.com/)         |
| **Shadcn UI**     | Reusable UI components built with Tailwind CSS and Radix UI             | [Shadcn UI](https://ui.shadcn.com/)              |
| **Redux Toolkit** | Opinionated, batteries-included toolset for efficient Redux development | [Redux Toolkit](https://redux-toolkit.js.org/)   |
| **React Query**   | Powerful asynchronous state management for React                        | [React Query](https://tanstack.com/query/latest) |
| **Zod**           | TypeScript-first schema declaration and validation library              | [Zod](https://zod.dev/)                          |
| **Nodemailer**    | Module for sending emails from Node.js applications                     | [Nodemailer](https://nodemailer.com/)            |
| **Husky**         | Git hooks for pre-commit linting and type checking                      | [Husky](https://typicode.github.io/husky/)       |

## License

This project is not licensed.

## Author Info

**Ridwan Lawal**

- X (Twitter): [Your X Profile](https://x.com/ibndev)

---

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-F6B26B?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FRidwan-Lawal%2FKanban)
