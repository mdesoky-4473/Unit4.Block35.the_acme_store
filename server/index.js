const client = require('./db');
const express = require('express');
const {
    createCustomer,
    createRestaurant,
    createReservation,
    destroyReservation,
    fetchCustomers,
    fetchRestaurants,
    fetchReservations
} = require('./db-methods');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//API routes
app.get('/api/customers', async (req, res, next) => {
    console.log('📥 GET /api/customers hit');
    try {
      const customers = await fetchCustomers();
      res.send(customers);
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/api/restaurants', async (req, res, next) => {
    try {
      res.send(await fetchRestaurants());
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/api/reservations', async (req, res, next) => {
    try {
      res.send(await fetchReservations());
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/api/customers/:id/reservations', async (req, res, next) => {
    try {
      const reservation = await createReservation({
        customer_id: req.params.id,
        restaurant_id: req.body.restaurant_id,
        reservation_date: req.body.reservation_date,
      });
      res.status(201).send(reservation);
    } catch (err) {
      next(err);
    }
  });
  
  app.delete('/api/customers/:customer_id/reservations/:id', async (req, res, next) => {
    try {
      await destroyReservation({ id: req.params.id, customer_id: req.params.customer_id });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
  

  const init = async () => {
    try {
      await client.connect();
      //const result = await client.query('SELECT NOW()');
      console.log('Connected to PostgreSQL');
  
    
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('Error starting server:', err);
    }
  };
  
  init();

  
  
  
