import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Award, Shield, Users, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All drivers and mechanics are verified and background-checked for your security.",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Quick response times and reliable service whenever you need it.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by and for the community, connecting people who need help with those who can provide it.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "We maintain high standards and continuously improve based on user feedback.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 animate-slide-up text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              About BrightBooking
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing transportation and vehicle services with technology and trust
            </p>
          </div>

          <Card className="p-12 bg-card/40 backdrop-blur-glass border-white/10 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At BrightBooking, we believe that getting from point A to point B, or finding help when your vehicle breaks down, 
              should be simple, safe, and reliable. We've created a platform that connects passengers with drivers and mechanics 
              with just a few taps.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to provide seamless transportation solutions while ensuring the highest standards of safety, 
              reliability, and customer satisfaction. Whether you need a ride across town or emergency vehicle assistance, 
              we're here 24/7 to help.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 bg-card/40 backdrop-blur-glass border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-12 bg-card/40 backdrop-blur-glass border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
              Join Our Growing Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">50K+</p>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary mb-2">5K+</p>
                <p className="text-muted-foreground">Verified Drivers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent mb-2">1K+</p>
                <p className="text-muted-foreground">Trusted Mechanics</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
