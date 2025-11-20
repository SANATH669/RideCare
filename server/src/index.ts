// MUST be first import to load environment variables
import './loadEnv';

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import rideRoutes from './routes/rides';
import mechanicRoutes from './routes/mechanics';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/mechanics', mechanicRoutes);

app.get('/', (req, res) => {
    res.send('Bright Ride API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
