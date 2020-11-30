const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var cors = require('cors');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function(req, res) {
	return res.send('pong');
});

app.get('/', function(req, res) {
	res.send('HELLO');
	// res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
// });

// app.use(cors());

// var corsOptions = {
// 	origin: '*',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.get('/emoface/', (req, res) => {
	request({ url: 'http://127.0.0.1:8000/emoface/' }, (error, response, body) => {
		if (error || response.statusCode !== 200) {
			return res.status(500).json({ type: 'error', message: err.message });
		}

		const result = res.json(JSON.parse(body));
		console.log(result);
	});
});
app.get('/hey', (req, res) => res.send('ho!'));

app.listen(process.env.PORT || 8080);
