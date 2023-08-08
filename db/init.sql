DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS peers;

CREATE TABLE peers (
  id SERIAL PRIMARY KEY,
  peer_id INT UNIQUE,
  is_allowed BOOLEAN
);

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  username TEXT,
  peer_id INT UNIQUE REFERENCES peers(peer_id),
  subscribe_days INT NOT NULL DEFAULT 0
);

CREATE TABLE subscribe_transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  days_amount INT
);

CREATE FUNCTION update_subscribe_days() RETURNS TRIGGER AS $$
BEGIN
  UPDATE users SET subscribe_days = subscribe_days + NEW.days_amount WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscribe_days_trigger
AFTER INSERT ON subscribe_transactions
FOR EACH ROW
EXECUTE PROCEDURE update_subscribe_days();
