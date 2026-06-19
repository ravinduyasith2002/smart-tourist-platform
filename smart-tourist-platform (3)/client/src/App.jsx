import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import HotelDetail from "./pages/HotelDetail";
import Hotels from "./pages/Hotels";
import Trips from "./pages/Trips";
import TripDetail from "./pages/TripDetail";
import Bookings from "./pages/Bookings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreateTrip } from "./pages/CreateTrip";
import CreateHotelBooking from "./pages/CreateHotelBooking";
import CreateGuideBooking from "./pages/CreateGuideBooking";
import HotelProfile from "./pages/HotelProfile";
import GuideProfile from "./pages/GuideProfile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/guides" component={Guides} />
      <Route path="/guides/:id" component={GuideDetail} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/hotels/:id" component={HotelDetail} />
      <Route path="/dashboard" component={() => (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )} />
      <Route path="/profile" component={() => (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      )} />
      <Route path="/profile/hotel" component={() => (
        <ProtectedRoute>
          <HotelProfile />
        </ProtectedRoute>
      )} />
      <Route path="/profile/guide" component={() => (
        <ProtectedRoute>
          <GuideProfile />
        </ProtectedRoute>
      )} />
      <Route path="/trips" component={() => (
        <ProtectedRoute>
          <Trips />
        </ProtectedRoute>
      )} />
      <Route path="/trips/create" component={() => (
        <ProtectedRoute>
          <CreateTrip />
        </ProtectedRoute>
      )} />
      <Route path="/trips/:id" component={() => (
        <ProtectedRoute>
          <TripDetail />
        </ProtectedRoute>
      )} />
      <Route path="/bookings" component={() => (
        <ProtectedRoute>
          <Bookings />
        </ProtectedRoute>
      )} />
      <Route path="/bookings/hotel/create" component={() => (
        <ProtectedRoute>
          <CreateHotelBooking />
        </ProtectedRoute>
      )} />
      <Route path="/bookings/guide/create" component={() => (
        <ProtectedRoute>
          <CreateGuideBooking />
        </ProtectedRoute>
      )} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
