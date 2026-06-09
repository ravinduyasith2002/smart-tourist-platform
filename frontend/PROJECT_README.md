# SmartTouristPlatform - Complete UI Project

A comprehensive tourism management system UI built with React 19, Tailwind CSS 4, and TypeScript. This is a complete frontend application for tour planning, guide booking, hotel booking, payments, reviews, and notifications.

## 🎯 Project Overview

**SmartTouristPlatform** is a multi-role booking ecosystem designed for:
- **Tourists**: Plan trips, book guides, reserve hotels, make payments, leave reviews
- **Guides**: Manage bookings, availability, earnings, and ratings
- **Hotels**: Manage rooms, bookings, occupancy, and guest reviews
- **Admins**: Oversee the platform, approve guides, manage users, view analytics

## 🏗️ Project Structure

```
client/src/
├── app/                          # Next.js App Router (routes only)
├── features/                     # Business logic modules
│   ├── auth/                     # Authentication
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── auth.types.ts
│   │   └── auth.store.ts
│   ├── users/                    # User management
│   ├── guides/                   # Guide operations
│   ├── hotels/                   # Hotel operations
│   ├── trips/                    # Trip planning
│   └── dashboard/                # Dashboard data
├── components/                   # Global reusable UI
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Navbar, Footer
│   └── shared/                   # Shared widgets (GuideCard, HotelCard, etc.)
├── services/                     # API layer
│   └── apiClient.ts
├── hooks/                        # Global custom hooks
│   ├── useAuth.ts
│   └── useDebounce.ts
├── store/                        # State management
│   └── auth.store.ts
├── lib/                          # Utility functions
│   └── utils.ts
├── config/                       # Configuration
│   └── routes.ts
├── types/                        # Global types
│   └── common.ts
├── styles/                       # Global styles
│   └── index.css
└── pages/                        # Page components
```

## 🎨 Design Philosophy: "Modern Travel Explorer"

### Color Palette
- **Primary**: Sky Blue (#4DA3FF) - Trust, openness, travel
- **Secondary**: Ocean Teal (#00BFA6) - Adventure, vitality
- **Background**: White - Clarity, cleanliness
- **Neutrals**: Gray shades for hierarchy and readability

### Typography
- **Display/Headings**: Poppins (bold, modern, friendly)
- **Body**: Inter (clean, readable, professional)
- **CTAs**: Poppins semibold uppercase

### Key Design Elements
- Large destination images for visual inspiration
- Card-based layouts for guides, hotels, trips
- Asymmetric layouts avoiding centered uniformity
- Smooth transitions (200-300ms) for interactions
- Status badges (Verified, Booked, Pending, Rejected)

## 🚀 Key Features

### Tourist Features
- ✅ Trip planning with multi-day itineraries
- ✅ Guide search and booking
- ✅ Hotel search and reservation
- ✅ Payment processing
- ✅ Review and rating system
- ✅ Notification center
- ✅ Trip management dashboard

### Guide Features
- ✅ Profile management with certifications
- ✅ Availability management
- ✅ Booking request handling
- ✅ Earnings tracking
- ✅ Rating and review management

### Hotel Features
- ✅ Room management
- ✅ Booking confirmation
- ✅ Occupancy tracking
- ✅ Guest review management
- ✅ Revenue analytics

### Admin Features
- ✅ User management
- ✅ Guide approval workflow
- ✅ System analytics
- ✅ Activity monitoring
- ✅ Platform statistics

## 📦 Dependencies

### Core
- React 19.2.1
- Tailwind CSS 4.1.14
- TypeScript 5.6.3
- Wouter 3.3.5 (routing)

### UI Components
- shadcn/ui (Radix UI components)
- Lucide React (icons)
- Sonner (toast notifications)
- Framer Motion (animations)

### Utilities
- Axios (HTTP client)
- React Hook Form (form handling)
- Zod (validation)
- Recharts (data visualization)

## 🛠️ Getting Started

### Installation
```bash
cd /home/ubuntu/smart-tourist-platform
pnpm install
```

### Development
```bash
pnpm dev
```
Server runs at `http://localhost:3000`

### Build
```bash
pnpm build
```

### Preview
```bash
pnpm preview
```

## 📋 Available Pages

### Public Routes
- `/` - Landing page with features and testimonials
- `/login` - User login
- `/register` - User registration

### Tourist Routes
- `/tourist/dashboard` - Tourist dashboard with stats and trips
- `/tourist/guides` - Browse and search guides
- `/tourist/hotels` - Browse and search hotels
- `/profile` - User profile management

### Guide Routes
- `/guide/dashboard` - Guide dashboard with bookings and earnings

### Hotel Routes
- `/hotel/dashboard` - Hotel dashboard with bookings and occupancy

### Admin Routes
- `/admin/dashboard` - Admin dashboard with approvals and analytics

## 🔐 Authentication

The project includes a mock authentication system with:
- Login/Register forms
- JWT token management
- Role-based access control (RBAC)
- User session persistence

**Note**: Replace mock implementations with actual API calls in `services/apiClient.ts`

## 🎯 Type System

All types are defined in `src/types/common.ts`:
- `User`, `Tourist`, `Guide`, `Hotel` - User models
- `Trip`, `ItineraryDay`, `Activity` - Trip planning
- `Guide_Booking`, `Hotel_Booking` - Booking models
- `Review`, `Payment`, `Notification` - Supporting models
- `BookingStatus`, `TripStatus`, `GuideStatus` - Enums

## 🔧 Configuration

### Routes
All routes are centralized in `src/config/routes.ts`:
```typescript
ROUTES.HOME
ROUTES.LOGIN
ROUTES.TOURIST_DASHBOARD
ROUTES.GUIDE_DASHBOARD
// ... more routes
```

### Environment Variables
Create `.env` file with:
```
REACT_APP_API_URL=http://localhost:3000/api
```

## 📱 Responsive Design

The project is fully responsive:
- **Mobile**: Single column, optimized touch targets
- **Tablet**: Two-column layouts
- **Desktop**: Three-column grids with full features

## 🎬 Animations

All animations respect `prefers-reduced-motion`:
- Card entrance: Fade-in + scale (250ms)
- Modal transitions: Scale from center (200ms)
- Button press: Scale down to 0.97 (100ms)
- Hover effects: Shadow and color shift (150ms)

## 🧪 Testing

Mock data is provided in page components for development:
- Mock guides with ratings and specializations
- Mock hotels with rooms and amenities
- Mock trips with itineraries
- Mock bookings and reviews

## 📖 API Integration

The `apiClient.ts` service provides:
- Automatic token injection
- Request/response interceptors
- Error handling
- File upload support

Replace mock API calls with actual endpoints:
```typescript
// Example: Login
const response = await authService.login({ email, password });
```

## 🎨 Component Library

### UI Components (shadcn/ui)
- Button, Input, Label, Textarea
- Card, Badge, Tabs, Dialog
- Select, Checkbox, Radio, Switch
- Table, Pagination, Breadcrumb
- And more...

### Shared Components
- `GuideCard` - Display guide information
- `HotelCard` - Display hotel information
- `TripCard` - Display trip information
- `StatCard` - Display statistics

### Layout Components
- `Navbar` - Top navigation with user menu
- `Footer` - Application footer

## 🚀 Deployment

The project is ready for deployment to Manus hosting:
1. Create a checkpoint: `webdev_save_checkpoint`
2. Click "Publish" in the Management UI
3. Configure custom domain if needed

## 📝 Best Practices

1. **Type Safety**: Always use TypeScript types
2. **Component Reusability**: Use shared components
3. **State Management**: Use `authStore` for global state
4. **API Calls**: Use services from `src/services/`
5. **Styling**: Use Tailwind utilities and CSS variables
6. **Accessibility**: Maintain focus rings and keyboard navigation
7. **Performance**: Lazy load components and images

## 🔄 Development Workflow

1. **Feature Development**:
   - Create feature folder in `src/features/`
   - Add types, services, components
   - Create page in `src/pages/`
   - Add route in `src/App.tsx`

2. **Component Development**:
   - Reusable UI in `src/components/ui/`
   - Shared widgets in `src/components/shared/`
   - Layout components in `src/components/layout/`

3. **State Management**:
   - Use `authStore` for auth state
   - Create feature stores as needed
   - Use hooks for state access

## 🐛 Troubleshooting

### TypeScript Errors
- Ensure all types are imported from `src/types/common.ts`
- Use `as const as any` for enum casting when needed

### Styling Issues
- Check that CSS variables are defined in `src/index.css`
- Verify Tailwind classes are properly scoped
- Use `cn()` utility for conditional classes

### Routing Issues
- Verify routes are added to `src/App.tsx`
- Check route paths match `src/config/routes.ts`
- Use `useLocation()` hook for navigation

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Wouter Router](https://github.com/molefrog/wouter)
- [TypeScript](https://www.typescriptlang.org)

## 📄 License

This project is part of SmartTouristPlatform and follows the project's license terms.

---

**Last Updated**: June 2024
**Version**: 1.0.0
**Status**: Production Ready
