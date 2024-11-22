-- SQLite
-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- PHR 테이블 생성
CREATE TABLE IF NOT EXISTS PHR (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    age INTEGER,
    height INTEGER,
    weight INTEGER,
    bloodSugar INTEGER,
    blood TEXT,
    exercise TEXT,
    allergies TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
