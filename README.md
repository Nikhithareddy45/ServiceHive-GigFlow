# GigFlow

Mini freelance marketplace to post gigs, bid on work, and hire securely. This repo contains a React + Vite frontend and an Express + MongoDB backend.

## Features
- User registration and login with HttpOnly JWT cookie
- Create gigs and list public gigs
- Submit bids to open gigs; owners can accept (hire) or reject
- Atomic hiring: only one bid can be hired, others become rejected
- My Gigs with bid count; My Bids with colorful status chips
- Privacy: non-owners never see others’ bid details, only count
- Auth persistence on refresh via /auth/me and localStorage
- CORS configured for local dev (frontend: 5173, backend: 5000)

## Tech Stack
- Frontend: React 19 + Vite, React Router v7, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express, Mongoose, JSON Web Token, bcrypt
- Database: MongoDB

## Project Structure
- Backend: [backend](file:///d:/Perug/ServiceHive%20Assignment/backend)
  - Entrypoint: [server.js](file:///d:/Perug/ServiceHive%20Assignment/backend/server.js)
  - App setup: [app.js](file:///d:/Perug/ServiceHive%20Assignment/backend/app.js)
  - Routes: [authRoutes.js](file:///d:/Perug/ServiceHive%20Assignment/backend/routes/authRoutes.js), [gigRoutes.js](file:///d:/Perug/ServiceHive%20Assignment/backend/routes/gigRoutes.js), [bidRoutes.js](file:///d:/Perug/ServiceHive%20Assignment/backend/routes/bidRoutes.js)
  - Controllers: [authController.js](file:///d:/Perug/ServiceHive%20Assignment/backend/controllers/authController.js), [gigsController.js](file:///d:/Perug/ServiceHive%20Assignment/backend/controllers/gigsController.js), [bidsController.js](file:///d:/Perug/ServiceHive%20Assignment/backend/controllers/bidsController.js)
  - Models: [Usermodel.js](file:///d:/Perug/ServiceHive%20Assignment/backend/models/Usermodel.js), [Gig.js](file:///d:/Perug/ServiceHive%20Assignment/backend/models/Gig.js), [Bid.js](file:///d:/Perug/ServiceHive%20Assignment/backend/models/Bid.js)
  - Middleware: [authMiddleware.js](file:///d:/Perug/ServiceHive%20Assignment/backend/middleware/authMiddleware.js)
- Frontend: [frontend/src](file:///d:/Perug/ServiceHive%20Assignment/frontend/src)
  - Routing: [App.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/App.jsx)
  - Auth: [authSlice.js](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/redux/slices/authSlice.js), [authApi.js](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/api/authApi.js), [axios.js](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/api/axios.js)
  - Pages:
    - Home: [home.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/home.jsx)
    - Login: [login.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/login.jsx)
    - Register: [register.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/register.jsx)
    - Public Gigs: [Giglist.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/Giglist.jsx)
    - Create Gig: [CreateGig.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/CreateGig.jsx)
    - Gig Details: [GigDetails.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/GigDetails.jsx)
    - My Gigs: [MyGigs.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/MyGigs.jsx)
    - View Bids (owner only): [ViewBids.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/bids/ViewBids.jsx)
    - My Bids: [MyBids.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/bids/MyBids.jsx)
  - Components: [Navbar.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/components/Navbar.jsx), [BidForm.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/components/BidForm.jsx)
  - Route Guard: [ProtectedRoute.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/routes/ProtectedRoute.jsx)

## Setup
1. Requirements:
   - Node.js 18+
   - MongoDB instance (local or cloud)
2. Backend:
   - Create backend/.env:
     - MONGO_URI=mongodb://localhost:27017/gigflow
     - JWT_SECRET=your_jwt_secret
   - Install and run:
     - cd backend
     - npm install
     - npm run start
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev
4. Open http://localhost:5173

## Environment Variables
- MONGO_URI: MongoDB connection string
- JWT_SECRET: secret for signing JWT tokens

## Scripts
- Backend: npm run start (nodemon)
- Frontend: npm run dev, npm run build, npm run preview

## API Reference
Base: http://localhost:5000/api

### Auth
- POST /auth/register
  - body: { name, email, password }
- POST /auth/login
  - body: { email, password }
  - sets HttpOnly cookie token, returns user payload
- GET /auth/me
  - auth required; returns { id, name, email }
- POST /auth/logout
  - clears cookie token

### Gigs
- GET /gigs?search=
  - public list of open gigs, returns ownerName and bidCount
- POST /gigs
  - auth required; body: { title, description, budget }
- GET /gigs/my-gigs
  - auth required; owner’s gigs with bidCount
- GET /gigs/:id
  - auth required; returns gig with isOwner and ownerName

### Bids
- POST /bids
  - auth required; body: { gigId, message, price }
  - only allowed if gig status is open
- GET /bids/:gigId
  - auth required; only gig owner can view bid details
- PATCH /bids/:bidId/hire
  - auth required; owner hires selected bid
  - atomically sets gig.status=assigned, sets bid.status=hired, others rejected
- PATCH /bids/:bidId/reject
  - auth required; owner rejects a single pending bid
- GET /bids/my
  - auth required; list of current user’s bids with gig info

## Data Models
- User: [Usermodel.js](file:///d:/Perug/ServiceHive%20Assignment/backend/models/Usermodel.js)
  - name, email, password
- Gig: [Gig.js](file:///d:/Perug/ServiceHive%20Assignment/backend/models/Gig.js)
  - title, description, budget, ownerId (ref User), status: open|assigned
- Bid: [Bid.js](file:///d:/Perug/ServiceHive%20Assignment/backend/models/Bid.js)
  - gigId (ref Gig), freelancerId (ref User), message, price, status: pending|hired|rejected

## Frontend Overview
- Auth state: Redux Toolkit slice [authSlice.js](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/redux/slices/authSlice.js)
  - Persists user in localStorage; rehydrates on refresh
  - Bootstraps /auth/me in [App.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/App.jsx)
- Axios: baseURL http://localhost:5000/api and withCredentials=true [axios.js](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/api/axios.js)
- Pages:
  - Home: gradient hero, features, CTAs [home.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/home.jsx)
  - Gig list: square cards, owner name, bid count; non-owners see Bid Now [Giglist.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/Giglist.jsx)
  - Gig details: owner name, status chip, submit bid (if open) [GigDetails.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/GigDetails.jsx)
  - My Gigs: owner grid with bid count and View Bids [MyGigs.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/MyGigs.jsx)
  - View Bids: owner-only; colorful statuses; accept/reject and redirects [ViewBids.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/bids/ViewBids.jsx)
  - My Bids: grid showing user’s bids with status chips [MyBids.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/bids/MyBids.jsx)
  - Create Gig: form posts to /gigs [CreateGig.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/gigs/CreateGig.jsx)
  - Login/Register: [login.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/login.jsx), [register.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/pages/register.jsx)
  - Navbar: links vary by auth state; logout clears cookie and Redux [Navbar.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/components/Navbar.jsx)
  - ProtectedRoute: redirects to /login if not authenticated [ProtectedRoute.jsx](file:///d:/Perug/ServiceHive%20Assignment/frontend/src/routes/ProtectedRoute.jsx)

## Auth Flow and Persistence
- Login sets HttpOnly cookie token; Redux stores user
- On refresh:
  - App.jsx calls /auth/me to restore from cookie if valid
  - localStorage fallback keeps the guard from redirecting prematurely
- Logout:
  - POST /auth/logout clears cookie; frontend clears Redux and localStorage

## Privacy and Permissions
- Non-owners cannot access /bids/:gigId; frontend redirects to gig details if request fails
- Only the owner can hire or reject bids for their gigs

## CORS
- Configured in [app.js](file:///d:/Perug/ServiceHive%20Assignment/backend/app.js) with:
  - origin: http://localhost:5173
  - credentials: true

## Security Notes
- HttpOnly cookie avoids client-side token access
- JWT secret should be strong and rotated for production
- No sensitive fields returned from user model

## UX Notes
- Square gig cards keep content concise; bid count visible
- Status chips: green=hired, red=rejected, yellow=pending/open
- After hire: navigate to gig details to show assigned status
- After reject: stay on bids and refresh list
- Bid submit redirects to My Bids

## Future Improvements
- Validation for duplicate bids and self-bidding (partially present)
- Socket.io for real-time notifications on hire/reject
- Pagination and filters for gigs
- Image uploads and gig attachments
- Robust form validation and error handling on UI

