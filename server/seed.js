const client = require('./db');
const {
  createUser,
  createProduct,
  fetchUsers,
  fetchProducts
} = require('./db-methods'); // 

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS favorites;

    CREATE TABLE users (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE products (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE favorites (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
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

    await createUser('John Doe');
    await createProduct('Electric Kettle');

    console.log('Users:', await fetchUsers());
    console.log('Products:', await fetchProducts());

  } catch (err) {
    console.error('Error starting server:', err);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
};

init();
