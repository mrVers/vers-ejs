const server = require('../server').server;
const mongoose = require('mongoose');

module.exports = function () {


	server.get('/app', function (req, res) {

		res.render('index');

	});

	server.get('/', function (req, res) {

		const Store = mongoose.model('Store');
		const Items = mongoose.model('Item');

		const front = Store.find({
			active: true,
			status: 'Front'
		});
		const about = Store.find({
			active: true,
			status: 'About'
		});
		const contact = Store.find({
			active: true,
			status: 'Contact'
		});
		
		const x = Items.find({
			active: true
		});
		
		var frontArray = {
			name: '',
			body: ''
		};
		var contactArray = {
			name: '',
			body: ''
		};
		var aboutArray = {
			name: '',
			body: ''
		};

		//q.populate('Item');

		front.exec()
			.then((docs) => {
			frontArray = docs;
			})
			.catch((err) => {
				res.status(400).send(err);
			});
		about.exec()
			.then((docs) => {
			aboutArray = docs;
			})
			.catch((err) => {
				res.status(400).send(err);
			});
		contact.exec()
			.then((docs) => {
				contactArray = docs;	
			})
			.catch((err) => {
				res.status(400).send(err);
			});
		
		x.exec()
			.then((docs) => {
				res.render('index', {
					items: docs,
					front: frontArray,
					about: aboutArray,
					contact: contactArray
				});
			})
			.catch((err) => {
				res.status(400).send(err);
			});

	});

	server.get('/store/item/:id', function (req, res) {

		const itemId = req.params.id;

		const Item = mongoose.model('Item');

		Item.findById(itemId, function (err, docs) {

			if (!err && docs && docs.active) {
				res.render('item', {
					item: docs
				});
			} else {
				res.status(400).redirect('/');
				console.log(err);
			}

		});

	});
	

}