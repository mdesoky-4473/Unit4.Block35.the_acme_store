// server/db-methods.js
const client = require('./db');
const { v4: uuidv4 } = require('uuid');

const createCustomer = async (name) => {
  const SQL = `
    INSERT INTO customers(id, name)
    VALUES ($1, $2)
    RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), name]);
  return response.rows[0];
};

const createRestaurant = async (name) => {
  const SQL = `
    INSERT INTO restaurants(id, name)
    VALUES ($1, $2)
    RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), name]);
  return response.rows[0];
};

const createReservation = async ({ customer_id, restaurant_id, reservation_date }) => {
  const SQL = `
    INSERT INTO reservations(id, customer_id, restaurant_id, reservation_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    customer_id,
    restaurant_id,
    reservation_date,
  ]);
  return response.rows[0];
};

const destroyReservation = async ({ id, customer_id }) => {
  const SQL = `
    DELETE FROM reservations
    WHERE id = $1 AND customer_id = $2
  `;
  await client.query(SQL, [id, customer_id]);
};

const fetchCustomers = async () => {
  const response = await client.query('SELECT * FROM customers');
  return response.rows;
};

const fetchRestaurants = async () => {
  const response = await client.query('SELECT * FROM restaurants');
  return response.rows;
};

const fetchReservations = async () => {
  const response = await client.query('SELECT * FROM reservations');
  return response.rows;
};


module.exports = {
  createCustomer,
  createRestaurant,
  createReservation,
  destroyReservation,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations
};
