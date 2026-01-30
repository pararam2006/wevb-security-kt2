const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// "База данных" комментариев
const comments = [];

// Форма для комментариев (уязвима к XSS)
app.get('/', (req, res) => {
    res.render('index', { comments });
});

// Сохранение комментария (без санитизации)
app.post('/comment', (req, res) => {
    comments.push(req.body.text);
    res.redirect('/');
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));