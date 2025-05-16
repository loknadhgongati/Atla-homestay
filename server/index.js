const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/dev');
const { provideErrorHandler } = require('./middlewares');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users'); // ✅ Import Users Route

const bookingRoutes = require('./routes/bookings');

const { onlyAuthUser } = require('./controllers/users');

// models
require('./models/rental');
require('./models/user');
require('./models/bookings');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000', // ✅ Allow frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(express.json());
// ✅ Middleware
app.use(bodyParser.json());
app.use(provideErrorHandler);

app.get('/api/secret', onlyAuthUser, (req, res) => {
  const user = res.locals.user
  return res.json({ message: `Super secret message to: ${user.username}` })
})

// ✅ API Routes
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes); // ✅ Use Users Route
app.use('/api/bookings', bookingRoutes)
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('Connected to DB!'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
