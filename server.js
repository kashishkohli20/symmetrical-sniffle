const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method}, ${req.url}`
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to load file');
		}
	});
	next();
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	// res.send('<h1>Hey</h1>');
	res.render('home.hbs');
});

app.get('/about', (req, res) => {
	// res.send('This is the about page');
	res.render('about.hbs', {
		contact: 0123457896
	});
});

app.listen(3000, () => {
	console.log('Server is up.');
});
