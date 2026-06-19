# SmartTouristPlatform - Frontend

A production-quality frontend for SmartTouristPlatform, a comprehensive tourism management system built with **Next.js (React + Wouter)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## 🎯 Project Overview

SmartTouristPlatform is an intelligent travel companion that connects tourists with expert guides and perfect accommodations. The frontend provides a seamless experience for planning trips, discovering guides and hotels, managing bookings, and sharing reviews.

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 19 + Wouter (client-side routing)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios with JWT interceptors
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner
- **State Management**: React Context API

### Folder Structure
```
client/src/
├── pages/              # Page components (routing)
│   ├── auth/          # Authentication pages (Login, Register)
│   ├── trips/         # Trip management pages
│   ├── admin/         # Admin dashboard
│   ├── Dashboard.tsx  # Main dashboard
│   ├── Profile.tsx    # User profile
│   ├── Guides.tsx     # Browse guides
│   ├── Hotels.tsx     # Browse hotels
│   ├── Trips.tsx      # My trips
│   ├── Bookings.tsx   # My bookings
│   └── Home.tsx       # Landing page
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── Navbar.tsx    # Navigation bar
│   ├── GuideCard.tsx # Guide listing card
│   ├── HotelCard.tsx # Hotel listing card
│   ├── TripCard.tsx  # Trip card
│   ├── Rating.tsx    # Star rating component
│   ├── StatusBadge.tsx # Status indicator
│   ├── LoadingSkeleton.tsx # Loading state
│   ├── EmptyState.tsx # Empty list state
│   └── ProtectedRoute.tsx # Auth guard
├── services/         # API service layer
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── tourist.service.ts
│   ├── guide.service.ts
│   ├── hotel.service.ts
│   ├── trip.service.ts
│   ├── guideBooking.service.ts
│   ├── hotelBooking.service.ts
│   └── review.service.ts
├── contexts/         # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme management
├── hooks/            # Custom React hooks
│   └── useApi.ts     # Data fetching hooks
├── types/            # TypeScript definitions
│   └── index.ts      # All type definitions
├── utils/            # Utility functions
│   └── helpers.ts    # Helper functions
├── lib/              # Library configurations
│   └── axios.ts      # Axios setup with interceptors
├── App.tsx           # Main app component with routing
└── main.tsx          # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Environment Configuration
Create `.env.local` in the project root:
```env
VITE_FRONTEND_FORGE_API_URL=http://localhost:3001
```

## 🎨 Design System

### Color Palette
- **Primary**: Sky Blue (#4DA3FF) - Main CTAs and highlights
- **Secondary**: Ocean Teal (#00BFA6) - Accent elements
- **Background**: White (#FFFFFF)
- **Text**: Dark Gray (#235015)

### Typography
- **Display**: Bold sans-serif for headings
- **Body**: Clean, readable sans-serif
- **Font Hierarchy**: h1 (32px) → h2 (24px) → h3 (18px) → Body (14px)

### Components
All UI components use shadcn/ui with Tailwind CSS for consistent styling and accessibility.

## 🔐 Authentication

### Flow
1. User registers with email, name, phone, and password
2. System creates account with TOURIST role by default
3. User logs in with email and password
4. JWT token stored in localStorage
5. Token automatically attached to all API requests via Axios interceptor
6. Protected routes check authentication status

### Protected Routes
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/trips` - Trip management
- `/trips/create` - Create new trip
- `/bookings` - Booking management

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with features overview
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Guides** (`/guides`) - Browse and search guides
- **Hotels** (`/hotels`) - Browse and search hotels

### Protected Pages
- **Dashboard** (`/dashboard`) - Main user dashboard with quick actions
- **Profile** (`/profile`) - Manage user information
- **My Trips** (`/trips`) - View and manage trips
- **Create Trip** (`/trips/create`) - Multi-step trip creation wizard
- **My Bookings** (`/bookings`) - View guide and hotel bookings
- **Admin Dashboard** (`/admin`) - Admin panel (ADMIN role only)

## 🔌 API Integration

### Service Layer
All API calls are abstracted into service files in `client/src/services/`:

```typescript
// Example: Creating a trip
import { tripService } from '@/services/trip.service';

const trip = await tripService.createTrip({
  title: "Europe Adventure",
  startDate: "2026-07-01",
  endDate: "2026-07-15",
  budget: 5000,
  currency: "USD",
  visibility: "PRIVATE",
  destinations: []
});
```

### API Endpoints
All endpoints follow REST conventions:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile
- `GET /api/guides` - List guides
- `GET /api/hotels` - List hotels
- `GET /api/trips` - List user trips
- `POST /api/trips` - Create trip
- `POST /api/guide-bookings` - Book guide
- `POST /api/hotel-bookings` - Book hotel
- `POST /api/reviews/guides/{id}` - Submit guide review
- `POST /api/reviews/hotels/{id}` - Submit hotel review

## 🛠️ Development

### Adding New Pages
1. Create component in `client/src/pages/`
2. Import in `App.tsx`
3. Add route in Router function
4. Wrap with `<ProtectedRoute>` if needed

### Adding New API Services
1. Create service file in `client/src/services/`
2. Export functions that call `axiosInstance`
3. Import and use in components

### Adding New Components
1. Create component in `client/src/components/`
2. Export as named export
3. Import in pages or other components

### Styling
- Use Tailwind CSS utilities for styling
- Use shadcn/ui components for complex UI
- Follow design system colors and spacing
- Ensure responsive design (mobile-first)

## 📊 State Management

### Authentication State
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### Data Fetching
```typescript
const { data, loading, error } = useApi(() => guideService.getGuides());
```

### Mutations
```typescript
const [mutate, { loading }] = useMutation((data) => tripService.createTrip(data));
```

## 🧪 Testing & Validation

### Form Validation
- React Hook Form for form state
- Zod for schema validation
- Real-time error feedback

### Error Handling
- Axios interceptors for error responses
- Toast notifications for user feedback
- Graceful error states in components

## 📈 Performance

### Optimizations
- Code splitting via React Router
- Lazy loading for images
- Memoization for expensive computations
- Efficient re-renders with React Context

### Loading States
- Skeleton screens for data loading
- Empty states for empty lists
- Error boundaries for crash handling

## 🔄 Workflow

### User Journey
1. **Landing** → Home page with features
2. **Registration** → Create account as Tourist
3. **Dashboard** → View overview and quick actions
4. **Explore** → Browse guides and hotels
5. **Plan** → Create trips with destinations
6. **Book** → Reserve guides and hotels
7. **Review** → Share experiences and ratings

## 🚨 Error Handling

### Common Errors
- **401 Unauthorized** → Redirect to login
- **403 Forbidden** → Show permission error
- **404 Not Found** → Show 404 page
- **500 Server Error** → Show generic error message
- **Network Error** → Show connection error

## 📝 Best Practices

### Code Style
- Use TypeScript for type safety
- Follow React hooks best practices
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic

### Performance
- Avoid unnecessary re-renders
- Use useMemo for expensive calculations
- Lazy load routes and components
- Optimize images and assets

### Accessibility
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Maintain color contrast
- Test with screen readers

## 🤝 Contributing

### Guidelines
1. Follow the existing code structure
2. Use TypeScript for new code
3. Test changes thoroughly
4. Keep components reusable
5. Document complex logic

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
- [Axios](https://axios-http.com)

## 📄 License

This project is part of SmartTouristPlatform and follows the same license terms.

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Video uploads for guides
- [ ] Advanced trip analytics
- [ ] Social features (follow guides, share trips)
- [ ] Payment integration
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Trip collaboration features

---

**Built with ❤️ for travelers and explorers worldwide**
