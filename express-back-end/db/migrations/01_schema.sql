DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS plaid_accounts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS monthly_balances CASCADE;
DROP TABLE IF EXISTS plant_goals CASCADE;
DROP TABLE IF EXISTS category_goals;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
 
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  current_balance DECIMAL(10,2) NOT NULL
);

CREATE TABLE plaid_accounts (
  account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
  plaid_account_id VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  transaction_amount DECIMAL(10,2) NOT NULL,
  name TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  is_credit_card BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE monthly_balances (
  id SERIAL PRIMARY KEY NOT NULL,
  account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
  end_of_month DATE NOT NULL,
  balance DECIMAL(10,2) NOT NULL
);

CREATE TABLE plant_goals (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  interactive_image VARCHAR(255) NULL DEFAULT 'https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js',
  tracked_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  target_amount DECIMAL(10,2) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE category_goals (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);