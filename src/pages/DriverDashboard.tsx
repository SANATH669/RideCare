import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Clock, MapPin, Star, TrendingUp, DollarSign } from "lucide-react";
import api from "@/lib/api";

const DriverDashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [availableRides, setAvailableRides] = useState<any[]>([]);
    const [myRides, setMyRides] = useState<any[]>([]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const fetchData = async () => {
            try {
                const [availableRes, myRidesRes] = await Promise.all([
                    api.get("/rides/available"),
                    api.get("/rides"),
                ]);
                setAvailableRides(availableRes.data);
                setMyRides(myRidesRes.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    const handleAcceptRide = async (rideId: string) => {
        try {
            await api.patch(`/rides/${rideId}/status`, { status: "ACCEPTED" });
            // Refresh data
            const [availableRes, myRidesRes] = await Promise.all([
                api.get("/rides/available"),
                api.get("/rides"),
            ]);
            setAvailableRides(availableRes.data);
            setMyRides(myRidesRes.data);
        } catch (error) {
            console.error("Failed to accept ride", error);
        }
    };

    const handleRejectRide = async (rideId: string) => {
        try {
            await api.patch(`/rides/${rideId}/status`, { status: "CANCELLED" });
            // Refresh data
            const [availableRes, myRidesRes] = await Promise.all([
                api.get("/rides/available"),
                api.get("/rides"),
            ]);
            setAvailableRides(availableRes.data);
            setMyRides(myRidesRes.data);
        } catch (error) {
            console.error("Failed to reject ride", error);
        }
    };

    const acceptedRides = myRides.filter((ride) => ride.status === "ACCEPTED");
    const completedRides = myRides.filter((ride) => ride.status === "COMPLETED");

    const stats = [
        { label: "Available Rides", value: availableRides.length.toString(), icon: Car, color: "text-primary" },
        { label: "Active Rides", value: acceptedRides.length.toString(), icon: Clock, color: "text-secondary" },
        { label: "Completed Today", value: completedRides.length.toString(), icon: Star, color: "text-accent" },
        { label: "Today's Earnings", value: "₹0", icon: DollarSign, color: "text-primary" },
    ];

    return (
        <div className="min-h-screen bg-gradient-hero">
            <Navbar />
            <div className="pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-8 animate-slide-up">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            Driver Dashboard
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Welcome back, {user?.name || "Driver"}
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

                    {/* Available Rides and My Rides */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                <Car className="w-6 h-6 text-primary" />
                                Available Rides
                            </h2>
                            <div className="space-y-4">
                                {availableRides.length === 0 ? (
                                    <p className="text-muted-foreground">No available rides at the moment.</p>
                                ) : (
                                    availableRides.slice(0, 5).map((ride) => (
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
                                                    {ride.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {ride.passenger?.name || "Unknown"} • ₹{ride.price || "TBD"}
                                                </p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleRejectRide(ride.id)}
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        variant="hero"
                                                        size="sm"
                                                        onClick={() => handleAcceptRide(ride.id)}
                                                    >
                                                        Accept
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>

                        <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-accent" />
                                My Active Rides
                            </h2>
                            <div className="space-y-4">
                                {acceptedRides.length === 0 ? (
                                    <p className="text-muted-foreground">No active rides.</p>
                                ) : (
                                    acceptedRides.map((ride) => (
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
                                                <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                                                    {ride.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                ₹{ride.price || "TBD"}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
