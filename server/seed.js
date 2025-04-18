const client = require('./db');
const {
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants
} = require('./db-methods'); // 

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;

    CREATE TABLE customers (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE restaurants (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE reservations (
      id UUID PRIMARY KEY,
      customer_id UUID REFERENCES customers(id) NOT NULL,
      restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
      reservation_date DATE NOT NULL
    );
  `;
  await client.query(SQL);
};

const init = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    await createTables();
    console.log('✅ Tables created');

    await createCustomer('John Doe');
    await createRestaurant('Pizza Place');

    console.log('Customers:', await fetchCustomers());
    console.log('Restaurants:', await fetchRestaurants());
  } catch (err) {
    console.error('Error starting server:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
};

init();
