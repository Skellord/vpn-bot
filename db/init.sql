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
    peer_id INT UNIQUE REFERENCES peers(peer_id)
    -- FOREIGN KEY (peer_id) REFERENCES peers(peer_id)
);
