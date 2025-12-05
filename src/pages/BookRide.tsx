import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Car, Phone, MapPinned, IndianRupee } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
  phone: string | null;
  driverProfile: {
    vehicleDetails: string;
    licenseNumber: string;
    currentLocation: string | null;
    costPerKm: number | null;
    isAvailable: boolean;
  } | null;
}

const BookRide = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    type: "Economy",
    scheduledTime: "",
  });
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFindDrivers = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get("/drivers/available", {
        params: { location: formData.pickup }
      });
      setAvailableDrivers(response.data);
      if (response.data.length === 0) {
        toast.error("No drivers available at the moment. Please try again later.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDriver = async (driverId: string) => {
    setLoading(true);
    try {
      await api.post("/rides", {
        ...formData,
        driverId,
      });
      toast.success("Ride request sent to driver! Waiting for confirmation.");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
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

              <form onSubmit={handleFindDrivers} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Pickup Location
                  </label>
                  <input
                    name="pickup"
                    type="text"
                    required
                    value={formData.pickup}
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
                    value={formData.dropoff}
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
                    value={formData.type}
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
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  size="lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Find Drivers"}
                </Button>
              </form>
            </Card>

            {/* Driver List */}
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Available Drivers
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Searching for drivers...</p>
                  </div>
                </div>
              ) : availableDrivers.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {availableDrivers.map((driver) => (
                    <Card
                      key={driver.id}
                      className="p-4 bg-card/60 backdrop-blur-glass border-white/10 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-foreground">
                            {driver.name}
                          </h3>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
                        </div>

                        <div className="space-y-2 text-sm">
                          {driver.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4 text-primary" />
                              <span>{driver.phone}</span>
                            </div>
                          )}

                          {driver.driverProfile && (
                            <>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Car className="w-4 h-4 text-accent" />
                                <span>{driver.driverProfile.vehicleDetails}</span>
                              </div>

                              {driver.driverProfile.currentLocation && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPinned className="w-4 h-4 text-primary" />
                                  <span>{driver.driverProfile.currentLocation}</span>
                                </div>
                              )}

                              {driver.driverProfile.costPerKm && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <IndianRupee className="w-4 h-4 text-green-500" />
                                  <span className="font-semibold">₹{driver.driverProfile.costPerKm}/km</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <Button
                          variant="hero"
                          className="w-full"
                          size="sm"
                          onClick={() => handleSelectDriver(driver.id)}
                          disabled={loading}
                        >
                          {loading ? "Booking..." : "Select Driver"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Drivers Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Click "Find Drivers" to search for available drivers
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
