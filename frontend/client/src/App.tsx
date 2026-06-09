import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TouristDashboard from "./pages/TouristDashboard";
import GuidesListing from "./pages/GuidesListing";
import HotelsListing from "./pages/HotelsListing";
import GuideDashboard from "./pages/GuideDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          {/* Public Routes */}
          <Route path={"/"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          
          {/* Tourist Routes */}
          <Route path={"/tourist/dashboard"} component={TouristDashboard} />
          <Route path={"/tourist/guides"} component={GuidesListing} />
          <Route path={"/tourist/hotels"} component={HotelsListing} />
          
          {/* Guide Routes */}
          <Route path={"/guide/dashboard"} component={GuideDashboard} />
          
          {/* Hotel Routes */}
          <Route path={"/hotel/dashboard"} component={HotelDashboard} />
          
          {/* Admin Routes */}
          <Route path={"/admin/dashboard"} component={AdminDashboard} />
          
          {/* User Routes */}
          <Route path={"/profile"} component={UserProfile} />
          
          {/* Error Routes */}
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
