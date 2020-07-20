const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(4000);
// npm start: .env.development.local, .env.development, .env.local, .env
// npm run build: .env.production.local, .env.production, .env.local, .env
// npm test: .env.test.local, .env.test, .env (note .env.local is missing)