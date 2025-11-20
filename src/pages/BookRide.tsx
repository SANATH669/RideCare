import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

const BookRide = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    type: "Economy",
    scheduledTime: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/rides", formData);
      toast.success("Ride booked successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Book Your Ride
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter your pickup and drop-off locations to get started
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Booking Form */}
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Ride Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Pickup Location
                  </label>
                  <input
                    name="pickup"
                    type="text"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter pickup location"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <Navigation className="w-4 h-4 text-accent" />
                    Drop-off Location
                  </label>
                  <input
                    name="dropoff"
                    type="text"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter drop-off location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Ride Type
                  </label>
                  <select
                    name="type"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium">Premium</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Scheduled Time (Optional)
                  </label>
                  <input
                    name="scheduledTime"
                    type="datetime-local"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button variant="hero" className="w-full" size="lg" type="submit">
                  Find Drivers
                </Button>
              </form>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10 flex items-center justify-center min-h-[500px]">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Map View
                </h3>
                <p className="text-muted-foreground">
                  Interactive map will be displayed here
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
