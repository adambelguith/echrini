module.exports = (app) => {
    const buyers = require('../controllers/buyer.controller.js');


    app.post('/buyers', buyers.create);

    
    app.get('/buyers', buyers.findAll);

   
    app.get('/buyers/:buyerId', buyers.findOne);

    
    app.put('/buyers/:buyerId', buyers.update);

    
    app.delete('/buyers/:buyerId', buyers.delete);
}
