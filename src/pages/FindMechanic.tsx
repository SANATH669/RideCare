import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Upload, Wrench } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

const FindMechanic = () => {
  const [formData, setFormData] = useState({
    location: "",
    vehicleType: "Car",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/mechanics", formData);
      toast.success("Service request created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Find a Mechanic
            </h1>
            <p className="text-xl text-muted-foreground">
              Get instant help from verified mechanics nearby
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Request Form */}
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Service Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Your Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your current location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Truck">Truck</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Issue Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Describe the issue with your vehicle..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <Upload className="w-4 h-4 text-accent" />
                    Upload Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>

                <Button variant="accent" className="w-full" size="lg" type="submit">
                  Find Nearby Mechanics
                </Button>
              </form>
            </Card>

            {/* Map/Results Placeholder */}
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10 flex items-center justify-center min-h-[600px]">
              <div className="text-center">
                <Wrench className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nearby Mechanics
                </h3>
                <p className="text-muted-foreground">
                  Available mechanics will appear here
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMechanic;
