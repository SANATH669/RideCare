import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, Wrench, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { toast } from "sonner";

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const roles = [
    {
      id: "passenger",
      title: "Passenger",
      description: "Book rides and find mechanics",
      icon: User,
      gradient: "from-primary to-secondary",
    },
    {
      id: "driver",
      title: "Driver",
      description: "Accept ride requests and earn",
      icon: Car,
      gradient: "from-secondary to-accent",
    },
    {
      id: "mechanic",
      title: "Mechanic",
      description: "Provide vehicle repair services",
      icon: Wrench,
      gradient: "from-accent to-primary",
    },
  ];

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-md">
            <Button
              variant="ghost"
              onClick={() => setSelectedRole(null)}
              className="mb-6"
            >
              ← Back to role selection
            </Button>

            <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
              <h2 className="text-3xl font-bold mb-2 text-foreground text-center">
                Sign in as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Enter your credentials to continue
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                  />
                </div>

                <Button variant="hero" className="w-full" size="lg" type="submit">
                  Sign In
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button variant="glass" className="w-full" size="lg" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to={`/signup/${selectedRole}`} className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Welcome to BrightBooking
            </h1>
            <p className="text-xl text-muted-foreground">
              Select your role to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="p-8 bg-card/40 backdrop-blur-glass border-white/10 hover:border-primary/50 hover:bg-card/60 cursor-pointer transition-all duration-300 hover:shadow-glow hover:-translate-y-2 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {role.title}
                </h3>
                <p className="text-muted-foreground mb-6">{role.description}</p>
                <Button variant="glass" className="w-full">
                  Continue as {role.title}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
