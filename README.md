# Community Forums

A full-stack web application where users can sign up, create forums, and interact through comments/questions—similar to GitHub Discussions.

## Features

- User authentication (signup/login)
- Forum creation, editing, and deletion
- Commenting system
- Tag-based categorization
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- Next.js
- React
- NextAuth.js for authentication
- Tailwind CSS for styling

### Backend
- Node.js with Express
- Prisma ORM
- PostgreSQL database
- JWT authentication

## Live Demo

Visit the live application:
- **Frontend**: [https://community-forums-fo-git-40ba0d-vamsi-krishnas-projects-b141a25b.vercel.app](https://community-forums-fo-git-40ba0d-vamsi-krishnas-projects-b141a25b.vercel.app)
- **Backend API**: [https://be-community-forums.onrender.com/](https://be-community-forums.onrender.com/)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository
   ```
   git clone https://github.com/YOUR_USERNAME/Community-Forums.git
   ```

2. Install dependencies
   ```
   # Backend
   cd BE-community-forums
   npm install

   # Frontend
   cd ../FE-community-forums
   npm install
   ```

3. Set up environment variables
   
   **Backend (.env)**
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   **Frontend (.env.local)**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:10000
   ```

4. Run database migrations
   ```
   cd BE-community-forums
   npx prisma migrate dev
   ```

5. Start the development servers
   ```
   # Backend
   cd BE-community-forums
   npm run dev

   # Frontend
   cd ../FE-community-forums
   npm run dev
   ```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile (protected)

### Forums
- `GET /api/forums` - Get all forums
- `GET /api/forums/:id` - Get forum by ID
- `POST /api/forums` - Create a new forum (protected)
- `PUT /api/forums/:id` - Update a forum (protected)
- `DELETE /api/forums/:id` - Delete a forum (protected)

### Comments
- `GET /api/comments/forum/:forumId` - Get comments by forum ID
- `POST /api/comments` - Create a new comment (protected)

## Deployment

### Backend
The backend is deployed on Render:
1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Set the build command: `npm install && npx prisma generate`
4. Set the start command: `node index.js`
5. Add environment variables: `DATABASE_URL` and `JWT_SECRET`

### Frontend
The frontend is deployed on Vercel:
1. Import your GitHub repository to Vercel
2. Set the environment variable: `NEXT_PUBLIC_API_URL=https://be-community-forums.onrender.com`
3. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
