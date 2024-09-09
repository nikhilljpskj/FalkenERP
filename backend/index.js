const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profileRoutes');
// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(bodyParser.json());
app.use('/api', profileRoutes);
app.use('/images', express.static('public/images'));

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
