const express = require('express');
const app = express();
const DOMPurify = require('dompurify');
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],  // Блокирует inline-скрипты
    }
}));
app.set('view engine', 'ejs');

// "База данных" комментариев
const comments = [];

// Форма для комментариев (уязвима к XSS)
app.get('/', (req, res) => {
    res.render('index', { comments });
});

// Сохранение комментария (без санитизации)
app.post('/comment', (req, res) => {
    const cleanText = DOMPurify.sanitize(req.body.text);  // Санитизация
    comments.push(cleanText);
    res.redirect('/');
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));