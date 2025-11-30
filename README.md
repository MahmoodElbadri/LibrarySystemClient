# 📚 Library Management System

A modern web application for managing library operations including book cataloging, user management, and loan tracking. Built with Angular and designed with a clean, responsive interface.

## ✨ Features

- **User Authentication**
  - Secure login and registration
  - Role-based access control (Admin/User)
  - JWT token authentication

- **Book Management**
  - Add, edit, and delete books
  - Categorize books
  - Upload book cover images
  - Search and filter books

- **Loan Management**
  - Borrow and return books
  - View loan history
  - Track due dates

- **Category Management**
  - Create and manage book categories
  - Assign categories to books

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- Angular CLI (v15 or later)
- .NET Core SDK (for the backend API)

### Installation

1. **Clone the repository**
   ```bash
   git clone ---
   cd LibrarySystem/LibrarySystem.Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create a copy of `src/environments/environment.development.ts`
   - Update the API URL to point to your backend server

4. **Run the application**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`

## 🏗 Project Structure

```
src/app/
├── _components/         # Reusable UI components
│   ├── add-book/       # Add new book form
│   ├── edit-book/      # Edit existing book
│   ├── library/        # Main book listing
│   ├── login/          # Authentication
│   ├── my-loans/       # User's loan history
│   └── categories/     # Category management
├── _guards/            # Route guards
├── _interceptors/      # HTTP interceptors
├── _models/            # Data models and DTOs
└── _services/          # API services
```

## 🔧 Development

### Code scaffolding

```bash
# Generate a new component
ng generate component components/component-name

# Generate a new service
ng generate service services/service-name
```

### Build

```bash
# Development build
ng build

# Production build
ng build --configuration production
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
