const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/warehouse.db');
 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');


// Initial GET Route
app.get('/', (req, res) => {
	let noMatch = null;
	if (req.query.search) {
		let productId= req.query.search;
		db.all('SELECT * FROM products WHERE productId=$productId',
			{
				$productId: productId
			},
			(err, rows) => {
				if (err) {
					console.log(err);
				} else {
					let products = rows;
	  				res.render('index', {products: products});
				}
			}
		);
	} else {
		db.all('SELECT * FROM products', (err, rows) =>{
			let products = rows;
	  		res.render('index', {products: products});
		});
	}
});

// Initial POST Route
app.post('/', (req, res) => {

	var productId = req.body.productId;
	var productName = req.body.productName;
	var productType = req.body.productType;
	var dateOfIn = req.body.dateOfIn;
	db.run(
		'INSERT INTO products VALUES ($productId, $productName, $productType, $dateOfIn)',
		{
			$productId: productId,
			$productName: productName,
			$productType: productType,
			$dateOfIn: dateOfIn
		},
		(err) => {
			if (err) {
				res.render('errorForUniqueId');
			} else {
				res.redirect('/');
			}
		}
	);
});

// Info Route
app.get('/info/:id', (req, res) => {
	let id = req.params.id;

	db.all('SELECT * FROM products WHERE productId=$productId',
		{
			$productId: id
		},
		(err, rows) => {
			if (err) {
				console.log(err);
			} else {
				let products= rows;
				res.render('info', {products: products});
			}
		}
	);	
});

// Delete Route
app.post('/delete/:id', (req, res) =>{
	let id = req.params.id;
	db.all('DELETE FROM products WHERE productId=$productId',
		{
			$productId: id
		},
		(err) => {
			if(err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		}
	)	
});

// Add Products GET Route
app.get('/addProducts', (req, res) => {
  res.render('addProducts');
});

// Localhost Route
app.listen(3000, function () {
  console.log('Server has started');
});