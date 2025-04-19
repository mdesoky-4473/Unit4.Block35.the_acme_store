const client = require('./db');
const morgan = require('morgan');
const express = require('express');
const {
    createUser,
    createProduct,
    createFavorite,
    destroyFavorite,
    fetchUsers,
    fetchProducts,
    fetchFavorites,
    fetchUserFavorites
} = require('./db-methods');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//API routes
app.get('/api/users', async (req, res, next) => {
    console.log('GET /api/users hit');
    try {
      const users = await fetchUsers();
      res.send(users);
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/api/products', async (req, res, next) => {
    try {
      res.send(await fetchProducts());
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/api/favorites', async (req, res, next) => {
    try {
      res.send(await fetchFavorites());
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/users/:id/favorites', async (req, res, next) => {
    try {
      res.send(await fetchUserFavorites(req.params.id));
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/api/users/:id/favorites', async (req, res, next) => {
    try {
      const favorite = await createFavorite({
        user_id: req.params.id,
        product_id: req.body.product_id,
      });
      res.status(201).send(favorite);
    } catch (err) {
      next(err);
    }
  });
  
  app.delete('/api/users/:userId/favorites/:id', async (req, res, next) => {
    try {
      await destroyFavorite({ id: req.params.id, user_id: req.params.userId });
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

  
  
  
