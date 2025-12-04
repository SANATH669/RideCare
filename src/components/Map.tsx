import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon - applied locally to avoid global issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface Driver {
  id: string;
  name: string;
  phone: string | null;
  driverProfile: {
    vehicleDetails: string;
    licenseNumber: string;
    currentLocation: string | null;
    isAvailable: boolean;
  } | null;
}

interface MapProps {
  drivers: Driver[];
  pickupLocation?: string;
}

// Component to update map center when drivers change
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const Map = ({ drivers, pickupLocation }: MapProps) => {
  // Default center (New York City) if no drivers or location
  const defaultCenter: [number, number] = [40.7128, -74.0060];

  // Mock coordinates for drivers based on the default center
  const getDriverCoordinates = (index: number): [number, number] => {
    const offset = 0.02; // Roughly 2km
    const latOffset = (Math.random() - 0.5) * offset * 2;
    const lngOffset = (Math.random() - 0.5) * offset * 2;
    return [defaultCenter[0] + latOffset, defaultCenter[1] + lngOffset];
  };

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border border-white/10 shadow-lg relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={defaultCenter} />

        {/* Driver Markers */}
        {drivers.map((driver, index) => {
          const position = getDriverCoordinates(index);
          return (
            <Marker key={driver.id} position={position} icon={DefaultIcon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{driver.name}</h3>
                  <p className="text-sm">{driver.driverProfile?.vehicleDetails}</p>
                  <p className="text-xs text-muted-foreground">{driver.driverProfile?.currentLocation}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Pickup Marker (Center) */}
        <Marker position={defaultCenter} icon={DefaultIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">Pickup Location</h3>
              <p className="text-sm">{pickupLocation || "Selected Location"}</p>
            </div>
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
};

export default Map;
