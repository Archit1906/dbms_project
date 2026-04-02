const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrations');
const certificateRoutes = require('./routes/certificates');
const adminRoutes = require('./routes/admin');
const app = express();

app.use(cors({ origin: '*' })); // Allows all for development
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/registrations', registrationRoutes);
app.use('/api/v1/certificates', certificateRoutes);
app.use('/api/v1/admin', adminRoutes);
// Error middleware
app.use(errorHandler);

module.exports = app;
