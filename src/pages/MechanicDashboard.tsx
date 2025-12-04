import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, MapPin, Star, TrendingUp, DollarSign } from "lucide-react";
import api from "@/lib/api";

const MechanicDashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [nearbyRequests, setNearbyRequests] = useState<any[]>([]);
    const [myRequests, setMyRequests] = useState<any[]>([]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const fetchData = async () => {
            try {
                const [nearbyRes, myRequestsRes] = await Promise.all([
                    api.get("/mechanics/nearby"),
                    api.get("/mechanics"),
                ]);
                setNearbyRequests(nearbyRes.data);
                setMyRequests(myRequestsRes.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    const handleAcceptRequest = async (requestId: string) => {
        try {
            await api.patch(`/mechanics/${requestId}/status`, { status: "ACCEPTED" });
            // Refresh data
            const [nearbyRes, myRequestsRes] = await Promise.all([
                api.get("/mechanics/nearby"),
                api.get("/mechanics"),
            ]);
            setNearbyRequests(nearbyRes.data);
            setMyRequests(myRequestsRes.data);
        } catch (error) {
            console.error("Failed to accept request", error);
        }
    };

    const acceptedRequests = myRequests.filter((req) => req.status === "ACCEPTED");
    const completedRequests = myRequests.filter((req) => req.status === "COMPLETED");

    const stats = [
        { label: "Pending Requests", value: nearbyRequests.length.toString(), icon: Wrench, color: "text-primary" },
        { label: "Active Jobs", value: acceptedRequests.length.toString(), icon: Clock, color: "text-secondary" },
        { label: "Completed Today", value: completedRequests.length.toString(), icon: Star, color: "text-accent" },
        { label: "Today's Earnings", value: "₹0", icon: DollarSign, color: "text-primary" },
    ];

    return (
        <div className="min-h-screen bg-gradient-hero">
            <Navbar />
            <div className="pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-8 animate-slide-up">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            Mechanic Dashboard
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Welcome back, {user?.name || "Mechanic"}
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

                    {/* Nearby Requests and My Jobs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                <Wrench className="w-6 h-6 text-primary" />
                                Nearby Service Requests
                            </h2>
                            <div className="space-y-4">
                                {nearbyRequests.length === 0 ? (
                                    <p className="text-muted-foreground">No pending requests at the moment.</p>
                                ) : (
                                    nearbyRequests.slice(0, 5).map((request) => (
                                        <div
                                            key={request.id}
                                            className="p-4 rounded-lg bg-muted border border-border hover:border-primary/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    <span className="font-semibold text-foreground">
                                                        {request.location}
                                                    </span>
                                                </div>
                                                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                                                    {request.vehicleType}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {request.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {request.user?.name || "Unknown"}
                                                </p>
                                                <Button
                                                    variant="hero"
                                                    size="sm"
                                                    onClick={() => handleAcceptRequest(request.id)}
                                                >
                                                    Accept
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>

                        <Card className="p-8 bg-card/40 backdrop-blur-glass border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-accent" />
                                My Active Jobs
                            </h2>
                            <div className="space-y-4">
                                {acceptedRequests.length === 0 ? (
                                    <p className="text-muted-foreground">No active jobs.</p>
                                ) : (
                                    acceptedRequests.map((request) => (
                                        <div
                                            key={request.id}
                                            className="p-4 rounded-lg bg-muted border border-border hover:border-primary/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    <span className="font-semibold text-foreground">
                                                        {request.location}
                                                    </span>
                                                </div>
                                                <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                                                    {request.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {request.vehicleType} • {request.description}
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

export default MechanicDashboard;
