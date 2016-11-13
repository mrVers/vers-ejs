const server 			= require('../../server').server;
const mongoose 			= require('mongoose');
const multer  			= require('multer');
const mime 				= require('mime');
const crypto 			= require('crypto');
const authMiddleware 	= require('../auth');
const URL 				= require('../../config').URL;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(4, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

const upload  = multer({ storage: storage });

module.exports = function () {
	
    server.post('/api/upload', upload.single('file'), function(req,res){

        console.log(req.file);
        res.send(req.file);

    });


	server.get('/api/items', function (req, res) {

		const Item = mongoose.model('Item');
		
        const q = Item.find();

        q.populate('store');

        q.exec()
            .then((docs)=>{
                res.send(docs);
            })
            .catch((err)=>{
                res.status(400).send(err);
            });

	});

	server.post('/api/item', function(req, res){
		
		const itemData = req.body;
		
		const data = {
			title 		: req.body.title,
			body  		: req.body.body,
			coverImage 	: req.body.coverImage,
			url 		: req.body.url
		};
		
		const Item = mongoose.model('Item');
		const newItem = new Item(data);

		newItem.save(function(err){

			if(!err){
				res.send(newItem);
			}else{
				res.status(400).send(err);
				console.log(err);
			}

		});

	});

	server.delete('/api/item/:id', authMiddleware, function(req, res){

		const itemId = req.params.id;
		const Item = mongoose.model('Item');

		Item.findByIdAndRemove(itemId, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

	server.get('/api/item/:id', function(req, res){

			const itemId = req.params.id;

			const Item = mongoose.model('Item');

			Item.findById(itemId, function(err, doc){

				if(!err){
					res.send(doc);
				}else{
					res.status(400).send(err);
					console.log(err);
				}

			});

	});

	server.put('/api/item/:id', function(req, res){

		const itemId = req.params.id;
		const data = req.body;
		const Item = mongoose.model('Item');

		Item.findByIdAndUpdate(itemId, data, {new:true}, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

};
