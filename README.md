# ✈️ Trip Booking API

A Node.js + Express + MongoDB API for managing trips, bookings, and users — including admin control, authentication, coupons, and more.

---

## 📚 Features

- 🧳 Trip management (CRUD + prevent overlapping dates)
- 🙋‍♂️ User registration, login, and profile updates
- 📆 Booking trips with seat validation and coupon support
- 🎟️ Coupon creation and usage tracking
- 🔐 Authentication and role-based authorization (`admin`, `user`)
- 🧠 Mongoose schemas with validation
- 🪄 Cloudinary image uploads
- 📂 Organized folder structure
- 🌐 Ready for frontend integration

---

## ✨ Special Features

| Feature                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| Email Confirmation     | Users receive a verification email upon registration.                     |
| Password Reset         | Users can reset their password via email using a secure code.             |
| Send Verification Code | Verification codes are sent for sensitive actions (e.g., password reset). |

---

## ⚙️ Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Cloudinary for image storage
- Multer for file uploads
- dotenv, express-async-handler, etc.

---


---

## 🧪 API Endpoints (Sample)

### 🔐 Auth

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | `/auth/register`        | Register user                      |
| GET    | `/auth/confirmEmail/:token` | Confirm user email             |
| POST   | `/auth/login`           | Login and get token                |
| POST   | `/auth/sendCode`        | Send reset code to email           |
| POST   | `/auth/resetPassword`   | Reset password using sent code     |


### 👤 User Endpoints

| Method | Endpoint | Description             | Access Roles |
|--------|----------|-------------------------|--------------|
| GET    | `/users` | Get current user data   | user, admin  |
| PUT    | `/users` | Update user profile     | user, admin  |
| DELETE | `/users` | Delete user profile     | user, admin  |
| GET    | `/users/all` | Get all users       | admin only   |


### 🧳 Trips

| Method | Endpoint        | Description                   |
|--------|-----------------|-------------------------------|
| GET    | `/trips`        | Get all trips                 |
| POST   | `/trips`        | (Admin) Create a new trip     |
| PUT    | `/trips/:id`    | (Admin) Update a trip         |
| DELETE | `/trips/:id`    | (Admin) Delete a trip         |

### 📆 Bookings 

| Method | Endpoint          | Description                       | Access Roles       |
|--------|-------------------|-----------------------------------|--------------------|
| POST   | `/bookings`       | Create a new booking              | user               |
| GET    | `/bookings`       | Get all bookings (admin only)     | admin              |
| PATCH  | `/bookings/:id`   | Update booking status (admin)     | admin              |
| PUT    | `/bookings/update/:id`| Update booking details (user) | user               |
| DELETE | `/bookings/:id`   | Cancel/Delete a booking (user)    | user               |
| GET    | `/bookings/user/:userId` | Get bookings by user       | user, admin        |

### 🎟️ Coupons

| Method | Endpoint        | Description                   |
|--------|-----------------|-------------------------------|
| POST   | `/coupons`      | (Admin) Create a new coupon   |
| GET    | `/coupons`      | (Admin) Get all coupons       |

---

## 👥 Roles

- **Admin**: Can manage trips, view all bookings, create/edit coupons.
- **User**: Can book trips, view/edit their own profile and bookings.

---

## ✨ Future Enhancements

- Payment gateway integration
- Booking filters and sorting
- Pagination and search APIs

---

## 📬 Contact

Made by **Hala Madi**  
GitHub: [@halamadi](https://github.com/halamadi)
