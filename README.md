# Community Forums

A full-stack web application where users can sign up, create forums, and interact through comments/questions—similar to GitHub Discussions.

## Features

- User authentication (signup/login)
- Forum creation, editing, and deletion
- Commenting system
- Tag-based categorization

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

## Getting Started

### Prerequisites
- Node.js
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
   Create `.env` files in both frontend and backend directories

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

## Deployment

This application is deployed on Railway. Visit [live demo](https://your-app-url.railway.app).

## License

[MIT](LICENSE)