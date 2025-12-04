import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Upload, Wrench, Phone, MapPinned } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

interface Mechanic {
  id: string;
  name: string;
  phone: string | null;
  mechanicProfile: {
    shopName: string | null;
    servicesOffered: string;
    location: string | null;
    isAvailable: boolean;
  } | null;
}

const FindMechanic = () => {
  const [formData, setFormData] = useState<{
    location: string;
    vehicleType: string;
    description: string;
    photos: string[];
  }>({
    location: "",
    vehicleType: "Car",
    description: "",
    photos: [],
  });
  const [availableMechanics, setAvailableMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const promises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((base64Files) => {
          setFormData({ ...formData, photos: base64Files });
          toast.success(`${base64Files.length} photo(s) uploaded`);
        })
        .catch(() => toast.error("Failed to upload photos"));
    }
  };

  const handleFindMechanics = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get("/mechanics/available", {
        params: { location: formData.location }
      });
      setAvailableMechanics(response.data);
      if (response.data.length === 0) {
        toast.error("No mechanics available at the moment. Please try again later.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch mechanics");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMechanic = async (mechanicId: string) => {
    setLoading(true);
    try {
      await api.post("/mechanics", {
        ...formData,
        mechanicId,
      });
      toast.success("Service request created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Request failed");
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

              <form onSubmit={handleFindMechanics} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Your Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    required
                    value={formData.location}
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
                    value={formData.vehicleType}
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
                    value={formData.description}
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
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div
                    onClick={() => document.getElementById('photo-upload')?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.photos.length > 0
                        ? `${formData.photos.length} photo(s) selected`
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>

                <Button
                  variant="accent"
                  className="w-full"
                  size="lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Find Nearby Mechanics"}
                </Button>
              </form>
            </Card>

            {/* Mechanic List */}
            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Available Mechanics
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse">
                    <Wrench className="w-12 h-12 text-accent mx-auto mb-4" />
                    <p className="text-muted-foreground">Searching for mechanics...</p>
                  </div>
                </div>
              ) : availableMechanics.length > 0 ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {availableMechanics.map((mechanic) => (
                    <Card
                      key={mechanic.id}
                      className="p-4 bg-card/60 backdrop-blur-glass border-white/10 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-foreground">
                            {mechanic.name}
                          </h3>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
                        </div>

                        <div className="space-y-2 text-sm">
                          {mechanic.mechanicProfile?.shopName && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Wrench className="w-4 h-4 text-accent" />
                              <span>{mechanic.mechanicProfile.shopName}</span>
                            </div>
                          )}

                          {mechanic.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4 text-primary" />
                              <span>{mechanic.phone}</span>
                            </div>
                          )}

                          {mechanic.mechanicProfile && (
                            <>
                              <div className="flex items-start gap-2 text-muted-foreground">
                                <Wrench className="w-4 h-4 text-accent mt-0.5" />
                                <span className="line-clamp-2">{mechanic.mechanicProfile.servicesOffered}</span>
                              </div>

                              {mechanic.mechanicProfile.location && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPinned className="w-4 h-4 text-primary" />
                                  <span>{mechanic.mechanicProfile.location}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <Button
                          variant="accent"
                          className="w-full"
                          size="sm"
                          onClick={() => handleSelectMechanic(mechanic.id)}
                          disabled={loading}
                        >
                          {loading ? "Requesting..." : "Select Mechanic"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Wrench className="w-16 h-16 text-accent mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Mechanics Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Click "Find Nearby Mechanics" to search
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

export default FindMechanic;
