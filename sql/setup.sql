DROP TABLE IF EXISTS kts CASCADE;
DROP TABLE IF EXISTS soups CASCADE;
DROP TABLE IF EXISTS kts_soups;

CREATE TABLE kts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mood TEXT NOT NULL,
    temp INTEGER NOT NULL
);

CREATE TABLE soups (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    flavor TEXT NOT NULL,
    savory TEXT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE kts_soups (
    kts_id BIGINT REFERENCES kts(id),
    soups_id BIGINT REFERENCES soups(id),
    PRIMARY KEY(kts_id, soups_id )
);


