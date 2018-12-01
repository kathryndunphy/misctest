/* For reference only
DROP DATABASE IF EXISTS ani_db;
CREATE DATABASE ani_db;
USE ani_db;

CREATE TABLE Animals (
    id        INT NOT NULL AUTO_INCREMENT,
    fullname  VARCHAR(100) NOT NULL,
    email     VARCHAR(100) NOT NULL UNIQUE,
    username  VARCHAR(32)  NOT NULL UNIQUE,
    hash      VARCHAR(60)  NOT NULL,

    url_photo VARCHAR(256),
    flagged   BOOLEAN DEFAULT false,

    PRIMARY KEY (id)
);

CREATE TABLE Stories (
    id        INT NOT NULL AUTO_INCREMENT,
    AnimalID  INT NOT NULL,
    title     VARCHAR(256) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (AnimalID) REFERENCES Animals(id) ON DELETE CASCADE
);

CREATE TABLE Photos (
    id         INT NOT NULL AUTO_INCREMENT,
    StoryID    INT NOT NULL,
    url        VARCHAR(256) NOT NULL,
    caption    TEXT NOT NULL,
    time_taken DATETIME,

    PRIMARY KEY (id),
    FOREIGN KEY (StoryID) REFERENCES Stories(id) ON DELETE CASCADE
);

CREATE TABLE Dogs (
    id       INT NOT NULL AUTO_INCREMENT,
    AnimalID INT NOT NULL,
    DogID    INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (AnimalID) REFERENCES Animals(id) ON DELETE CASCADE
);
*/