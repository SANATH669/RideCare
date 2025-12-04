import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Wrench, MapPin, Clock, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Car,
      title: "Quick Ride Booking",
      description: "Get a ride in minutes with our network of verified drivers",
    },
    {
      icon: Wrench,
      title: "Find Mechanics",
      description: "Connect with nearby mechanics for instant vehicle assistance",
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Real-time location tracking for rides and mechanic services",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Round-the-clock service for all your transportation needs",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified professionals and secure payment systems",
    },
    {
      icon: Zap,
      title: "Instant Connect",
      description: "Connect with drivers and mechanics instantly",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero/80" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your Journey, Our Priority
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Book rides instantly or find mechanics nearby. One platform for all your transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-ride">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Car className="mr-2 w-5 h-5" />
                  Book a Ride
                </Button>
              </Link>
              <Link to="/find-mechanic">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  <Wrench className="mr-2 w-5 h-5" />
                  Find Mechanic
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background/50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Why Choose RIDECARE?
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Experience seamless transportation and vehicle services all in one place
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card/40 backdrop-blur-glass border border-white/10 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 hover:shadow-glow hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-card/40 backdrop-blur-glass border border-white/10 shadow-elegant">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust RIDECARE for their daily transportation needs
            </p>
            <Link to="/signin">
              <Button variant="hero" size="lg">
                Create Account Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 RIDECARE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
