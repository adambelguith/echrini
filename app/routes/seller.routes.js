module.exports = (app) => {
    const sellers = require('../controllers/seller.controller.js');


    app.post('/sellers', sellers.create);

    
    app.get('/sellers', sellers.findAll);

   
    app.get('/sellers/:sellerId', sellers.findOne);

    
    app.put('/sellers/:sellerId', sellers.update);

    
    app.delete('/sellers/:sellerId', sellers.delete);
}
