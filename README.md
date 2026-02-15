# Full Stack Todo App

A **full-stack Todo application** built with **Next.js (React/TypeScript/TailwindCSS) frontend** and **Express + MongoDB backend**, featuring authentication, todos management, search, filters, tags, and customizable themes.

---

## Features

- **Authentication**
  - Create an account (signup)
  - Login / Logout
  - Secure routes using JWT
- **Todos Management**
  - Add, edit, and delete todos
  - Mark todos as completed
  - Due dates and tags
- **Search & Filters**
  - Search todos by title
  - Filter todos by:
    - Completed / Incomplete
    - Today
    - Upcoming
    - No Due Date
    - By Tag
  - Auto-hide completed todos unless the filter is active
- **UI Customization**
  - Change app theme (dark/light/multiple themes)
- Responsive UI built with Tailwind CSS
- Modal for viewing and editing todo details

---

## Tech Stack

**Frontend:**
- Next.js 13 / React
- TypeScript
- Tailwind CSS
- Axios for API requests

**Backend:**
- Node.js / Express
- MongoDB with Mongoose
- JWT Authentication
- CORS enabled

---

## Project Structure

```bash
/frontend
  /app
    /api
      api.ts           
    /pages
      main/page.tsx     
      login/page.tsx
      register/page.tsx
    global.css
    layout.tsx
    page.tsx
/backend
  /models
    Tag.js
    ToDo.js
    User.js
  /routes
    Auth.js
    Middleware.js
    CRUD.js      
  server.js
```

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
