import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { toast } from "sonner";

const SignUp = () => {
    const { role } = useParams<{ role: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        // Driver specific
        vehicleDetails: "",
        licenseNumber: "",
        // Mechanic specific
        shopName: "",
        servicesOffered: "",
        location: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", {
                ...formData,
                role: role?.toUpperCase(),
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Account created successfully!");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero">
            <Navbar />
            <div className="pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-md">
                    <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
                        <h2 className="text-3xl font-bold mb-2 text-foreground text-center">
                            Sign Up as {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
                        </h2>
                        <p className="text-muted-foreground text-center mb-6">
                            Create your account to get started
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground">
                                    Phone Number
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            {role === "driver" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground">
                                            Vehicle Details
                                        </label>
                                        <input
                                            name="vehicleDetails"
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Toyota Camry 2020"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground">
                                            License Number
                                        </label>
                                        <input
                                            name="licenseNumber"
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="DL12345678"
                                        />
                                    </div>
                                </>
                            )}

                            {role === "mechanic" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground">
                                            Shop Name (Optional)
                                        </label>
                                        <input
                                            name="shopName"
                                            type="text"
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Joe's Garage"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-foreground">
                                            Services Offered
                                        </label>
                                        <input
                                            name="servicesOffered"
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Tire change, Oil change, etc."
                                        />
                                    </div>
                                </>
                            )}

                            <Button variant="hero" className="w-full" size="lg" type="submit">
                                Create Account
                            </Button>
                        </form>

                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
