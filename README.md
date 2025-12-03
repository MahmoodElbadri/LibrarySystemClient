# 📚 Library Management Client

A modern, responsive Single Page Application (SPA) built with Angular 18 to interact with the Library Management API.

## ✨ Key Features

### 🏗️ Modern Angular Architecture
- ⚡️ Built with Angular 18 using Standalone Components
- 🔄 Utilizes Signals for reactive state management and high performance

### 🔐 Authentication & Security
- 🛡️ HttpInterceptors: Automatically attaches JWT tokens to outgoing requests
- 🚧 Functional Guards: Protects admin routes and user-specific pages

### 👤 User Experience
- ⚠️ Global Error Handling: Centralized interceptor to catch HTTP errors and display user-friendly Toastr notifications
- ⚡️ Optimistic UI Updates: Instant UI feedback when borrowing/returning books
- 📱 Responsive Design: Fully responsive layout using Bootstrap 5

### 👑 Admin Dashboard
- 🛠️ Dedicated view for Admins to manage inventory
- 📊 Table view of active loans with "Days Overdue" calculation
- 📧 One-click email notification system for overdue users

### 🔍 Advanced Data Display
- 📄 Server-side Pagination integration using ngx-bootstrap
- 🔎 Dynamic Search and Category Filtering

## 🛠️ Tech Stack
- ⚡️ **Angular 18** - Core framework
- 📘 **TypeScript** - Type safety
- 🎨 **Bootstrap 5** - UI components & styling
- ✨ **FontAwesome** - Icons
- 🌐 **RxJS & Angular HttpClient** - HTTP client
- 🧩 **ngx-bootstrap** - Pagination, Modals
- 🔔 **ngx-toastr** - Notifications

## 🚀 Getting Started

### 📋 Prerequisites
- ⚙️ **Node.js** (LTS version)
- 📦 **Angular CLI**

### ⚡️ Installation
1. 📥 Clone the repository:
```bash
git clone https://github.com/MahmoodElbadri/librarysystemclient.git
```

2. 📂 Navigate to the project directory:
```bash
cd Library.Client
```

3. 📦 Install dependencies:
```bash
npm install
```

4. ▶️ Run the development server:
```bash
ng serve
```

5. 🌐 Open http://localhost:4200 in your browser.


🔨 Built by Mahmood Elbadri with ❤️
