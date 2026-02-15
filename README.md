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

Copyright (c) 2026, Rizatdinov Nail

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
