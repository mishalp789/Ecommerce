# 🛒 E-Commerce Platform (Spring Boot + JWT)

A full-stack E-Commerce Product Management Platform built using Spring Boot with JWT-based authentication, role-based authorization, and a dynamic frontend using HTML, CSS, and JavaScript.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based authorization (ADMIN / USER)
- Stateless backend using Spring Security
- Secure API access using Bearer tokens

### 📦 Product Management
- Create, update, delete products (ADMIN only)
- View products with pagination (USER & ADMIN)
- Product validation and global exception handling
- Search products by name
- Handles 100+ products efficiently using pagination

### 🖼 Image Handling
- Secure product image upload using multipart requests
- Store image paths in database
- Public endpoint to fetch images dynamically

### 🛒 Shopping Cart (Frontend)
- Add products to cart
- Cart stored in browser localStorage
- Real-time total price calculation
- Clear cart functionality

### 🖥 Frontend
- Admin dashboard for product management
- User product listing page with product cards
- Pagination, search, and cart integration
- Clean UI using HTML & CSS

---

## 🛠 Tech Stack

Backend:
- Java 17
- Spring Boot
- Spring Security
- JWT
- JPA / Hibernate
- H2 Database (can be switched to MySQL)
- Maven

Frontend:
- HTML
- CSS
- JavaScript

Tools:
- Git
- Postman
- Linux

---

## 🏗 Project Architecture

src/main/java
 ├── controller
 ├── service
 ├── repository
 ├── security
 ├── exception
 ├── config
 └── model

---

## 🔑 Roles & Permissions

ADMIN:
- Add / Update / Delete products
- Upload product images

USER:
- View products
- Search products
- Add products to cart

---

## 🔌 API Endpoints (Sample)

POST   /api/v1/auth/login            (Public)
GET    /api/v1/products              (USER / ADMIN)
POST   /api/v1/products              (ADMIN)
PUT    /api/v1/products/{id}         (ADMIN)
DELETE /api/v1/products/{id}         (ADMIN)
POST   /api/v1/products/{id}/image   (ADMIN)
GET    /api/v1/products/images/{filename} (Public)
GET    /api/v1/products/search?name= (USER / ADMIN)

---

## ⚙ Authentication Flow

1. User logs in using username and password
2. Backend generates a JWT containing username and role
3. Frontend stores token in localStorage
4. Token is sent in Authorization header with each request
5. JWT filter validates token and sets security context

---

## 📈 Performance & Scalability

- Stateless authentication using JWT
- Pagination for optimized database access
- Handles 1,000+ authenticated API requests
- Clean layered architecture

---

## ▶ Running the Project

Backend:
mvn spring-boot:run

Frontend:
Open login.html, products.html, admin.html, cart.html in browser

---

## 📌 Future Enhancements

- Order placement & checkout
- Quantity-based cart
- Payment gateway integration
- User registration
- Docker deployment

---

## 👨‍💻 Author

Built by [Your Name]
Aspiring Backend / Full-Stack Developer
