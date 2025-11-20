import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Clock, MapPin, Star, TrendingUp, Wrench } from "lucide-react";
import api from "@/lib/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [rides, setRides] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchData = async () => {
      try {
        const [ridesRes, requestsRes] = await Promise.all([
          api.get("/rides"),
          api.get("/mechanics"),
        ]);
        setRides(ridesRes.data);
        setRequests(requestsRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: "Total Rides", value: rides.length.toString(), icon: Car, color: "text-primary" },
    { label: "Service Requests", value: requests.length.toString(), icon: Wrench, color: "text-accent" },
    { label: "Total Spent", value: "$0", icon: TrendingUp, color: "text-secondary" }, // Placeholder
    { label: "Saved Time", value: "0h", icon: Clock, color: "text-accent" }, // Placeholder
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome back, {user?.name || "User"}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-card/40 backdrop-blur-glass border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-primary ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Car className="w-6 h-6 text-primary" />
                Recent Rides
              </h2>
              <div className="space-y-4">
                {rides.length === 0 ? (
                  <p className="text-muted-foreground">No recent rides found.</p>
                ) : (
                  rides.slice(0, 3).map((ride) => (
                    <div
                      key={ride.id}
                      className="p-4 rounded-lg bg-muted border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground">
                            {ride.pickup} → {ride.dropoff}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                          {ride.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(ride.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <Button variant="glass" className="w-full mt-6">
                View All Rides
              </Button>
            </Card>

            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Star className="w-6 h-6 text-accent" />
                Quick Actions
              </h2>
              <div className="space-y-4">
                <Link to="/book-ride">
                  <Button variant="hero" className="w-full justify-start mb-4" size="lg">
                    <Car className="mr-2 w-5 h-5" />
                    Book a New Ride
                  </Button>
                </Link>
                <Link to="/find-mechanic">
                  <Button variant="accent" className="w-full justify-start mb-4" size="lg">
                    <Wrench className="mr-2 w-5 h-5" />
                    Request Mechanic
                  </Button>
                </Link>
                <Button variant="glass" className="w-full justify-start" size="lg">
                  <MapPin className="mr-2 w-5 h-5" />
                  View Nearby Services
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
