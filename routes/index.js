const {Router} = require('express');
const router = Router();
// const connection = require('../db');
const controllers = require('../controllers');


router.get('/', (req, res) => res.send('I AM GROOT!'))
router.get('/findcustomer/:id', controllers.findbyID);
router.get('/getcard', controllers.getCard);
router.get('/policies/:id', controllers.getPolicy);
router.post('/addcustomer', controllers.addCustomer);
router.post('/login', controllers.login);
router.post('/addcard/:id', controllers.addCard);
router.get('/inventory', controllers.inventory);
router.put('/addpolicy', controllers.addPolicy);

module.exports = router;