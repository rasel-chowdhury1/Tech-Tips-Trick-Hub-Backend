# Tech Tips & Tricks Backend

This is the backend API for the **Tech Tips & Tricks** platform, built with Node.js, Express, and MongoDB. It provides robust user authentication, content management, and payment integration for premium content.

## Key Features:
- **User Authentication**: JWT-based authentication for secure user login and signup.
- **User Roles**: Differentiates between regular users and admins, with role-based access control.
- **Post Management**: API endpoints for creating, updating, deleting, and managing user-generated posts with rich text, images, and tags.
- **Premium Content**: Payment integration (Aamarpay/Stripe) for subscribing to exclusive posts and content.
- **Commenting System**: Users can add, edit, or delete comments on posts.
- **Upvote/Downvote**: Allows users to vote on posts and comments.
- **Search & Filter**: Advanced search functionality with debounced keyword search and category filtering.
- **Profile Management**: Users can update their profile information, including profile pictures and subscription details.
- **Admin Controls**: Admins can manage users, posts, and payment history with control over blocking/unblocking accounts.

## Tech Stack:
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Non-relational database for data storage and retrieval.
- **JWT**: Secure user authentication and role management.
- **Payment Integration**: Supports Stripe and Aamarpay for handling premium content subscriptions.

## Setup Instructions:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/tech-tips-tricks-backend.git
    cd tech-tips-tricks-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the following environment variables:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    AAMARPAY_KEY=your_aamarpay_key
    ```

4. Run the application:
    ```bash
    npm start
    ```

5. The API will be available at `http://localhost:5000`.

## API Endpoints:

- **Authentication**:
    - `POST /api/auth/register`: Register a new user.
    - `POST /api/auth/login`: User login.
    - `POST /api/auth/logout`: User logout.
  
- **Post Management**:
    - `GET /api/posts`: Get all posts.
    - `POST /api/posts`: Create a new post (auth required).
    - `PUT /api/posts/:id`: Update a post (auth required).
    - `DELETE /api/posts/:id`: Delete a post (auth required).
  
- **Comments**:
    - `POST /api/posts/:postId/comments`: Add a comment.
    - `PUT /api/posts/:postId/comments/:commentId`: Edit a comment.
    - `DELETE /api/posts/:postId/comments/:commentId`: Delete a comment.
  
- **Payments**:
    - `POST /api/payments/checkout`: Process payment for premium content.

## License:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
