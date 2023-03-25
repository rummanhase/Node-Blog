const express = require('express');
const mongoose = require('mongoose');
const marioRoutes = require('./routes/marioRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mario-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

app.use(express.json());
app.use('/mario', marioRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));