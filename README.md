# Bright Ride

Bright Ride is a comprehensive platform connecting riders with drivers and mechanics. Whether you need a ride or vehicle repair services, Bright Ride has you covered.

## Features

- **Ride Booking**: Easily book rides with available drivers.
- **Mechanic Services**: Find and contact mechanics for vehicle repairs.
- **Multi-Role System**: Dedicated dashboards and features for:
  - **Riders**: Book rides, find mechanics, view history.
  - **Drivers**: Manage ride requests, view earnings.
  - **Mechanics**: Receive service requests, manage profile.
- **Authentication**: Secure sign-up and sign-in for all user roles.
- **Responsive Design**: Built with a modern UI using Tailwind CSS and shadcn-ui.

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn-ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd bright-ride-fix-main
    ```

2.  **Frontend Setup**
    ```bash
    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```
    The frontend will be available at `http://localhost:8080` (or similar).

3.  **Backend Setup**
    ```bash
    cd server

    # Install dependencies
    npm install

    # Setup Environment Variables
    # Create a .env file in the server directory and add necessary variables (PORT, DATABASE_URL, JWT_SECRET, etc.)

    # Start the backend server
    npm run dev
    ```
    The backend API will run on `http://localhost:5000` (default).

## Project Structure

- `src/`: Frontend source code (Pages, Components, Hooks).
- `server/`: Backend source code (Routes, Controllers, Middleware).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
