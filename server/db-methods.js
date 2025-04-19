// server/db-methods.js
const client = require('./db');
const { v4: uuidv4 } = require('uuid');

const createUser = async (name) => {
  const SQL = `
    INSERT INTO users(id, name)
    VALUES ($1, $2)
    RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), name]);
  return response.rows[0];
};

const createProduct = async (name) => {
  const SQL = `
    INSERT INTO products(id, name)
    VALUES ($1, $2)
    RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), name]);
  return response.rows[0];
};

const createFavorite = async ({ user_id, product_id }) => {
  const SQL = `
    INSERT INTO favorites(id, user_id, product_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    user_id,
    product_id,
  ]);
  return response.rows[0];
};

const destroyFavorite = async ({ id, user_id }) => {
  const SQL = `
    DELETE FROM favorites
    WHERE id = $1 AND user_id = $2
  `;
  await client.query(SQL, [id, user_id]);
};

const fetchUsers = async () => {
  const response = await client.query('SELECT * FROM users');
  return response.rows;
};

const fetchProducts = async () => {
  const response = await client.query('SELECT * FROM products');
  return response.rows;
};

const fetchFavorites = async () => {
  const response = await client.query('SELECT * FROM favorites');
  return response.rows;
};

const fetchUserFavorites = async (user_id) => {
  const SQL = `SELECT * FROM favorites WHERE user_id = $1`;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};


module.exports = {
  createUser,
  createProduct,
  createFavorite,
  destroyFavorite,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  fetchUserFavorites
};
