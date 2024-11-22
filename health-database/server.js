const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path'); // 경로 모듈 추가
const app = express();
const PORT = process.env.PORT || 3001; // 포트 설정

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('./new_database.db');

// 루트 경로에 대한 라우트 추가
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// 사용자 등록 엔드포인트
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], function (err) {
        if (err) {
            console.error("Error during user registration:", err.message);
            return res.status(500).send("사용자 등록 실패");
        }
        res.status(200).send("사용자 등록 성공");
    });
});

// 사용자 로그인 엔드포인트 추가
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error("Error during login:", err.message);
            return res.status(500).send("로그인 실패");
        }
        if (row) {
            res.status(200).send("로그인 성공");
        } else {
            res.status(401).send("아이디 또는 비밀번호가 잘못되었습니다");
        }
    });
});

// PHR 데이터 삽입 엔드포인트
app.post('/phr', (req, res) => {
    const { user_id, name, age, height, weight, bloodSugar, blood, exercise, allergies } = req.body;
    db.run('INSERT INTO PHR (user_id, name, age, height, weight, bloodSugar, blood, exercise, allergies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_id, name, age, height, weight, bloodSugar, blood, exercise, allergies], function (err) {
        if (err) {
            return res.status(500).send("PHR 데이터 삽입 실패");
        }
        res.status(200).send("PHR 데이터 삽입 성공");
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
