# DecalXe Frontend

A React TypeScript frontend application for the DecalXe vehicle decal management system.

## Features

- **Dashboard**: Overview of business metrics and recent orders
- **Customer Management**: CRUD operations for customer data
- **Vehicle Management**: Manage customer vehicles with license plates and details
- **Order Management**: Track decal orders and their progress
- **Authentication**: JWT-based authentication system
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons
- **Context API** for state management

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see backend documentation)

### Installation

1. Navigate to the frontend directory:
```bash
cd decal-xe-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

## API Integration

The frontend communicates with the DecalXe API backend. Make sure the backend is running and accessible at the URL specified in your `.env` file.

### Default Demo Credentials

For testing purposes, you can use these demo credentials:
- Username: `admin`
- Password: `password`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main application layout
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Login page
│   ├── Customers.tsx   # Customer management
│   ├── Vehicles.tsx    # Vehicle management
│   ├── Orders.tsx      # Order management
│   └── Settings.tsx    # Settings page
├── services/           # API service layer
│   └── api.ts          # Axios configuration and API calls
├── types/              # TypeScript type definitions
│   └── api.ts          # API response types
└── App.tsx             # Main application component
```

## Features Overview

### Dashboard
- Key business metrics (customers, vehicles, orders)
- Recent orders list
- Visual status indicators

### Customer Management
- Add, edit, delete customers
- Search functionality
- Contact information management

### Vehicle Management
- Link vehicles to customers
- Track vehicle details (license plate, chassis number, etc.)
- Vehicle model and brand information

### Order Management
- View all orders with status tracking
- Filter by status (active, completed, cancelled)
- Order progress tracking through stages

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the DecalXe vehicle decal management system.
