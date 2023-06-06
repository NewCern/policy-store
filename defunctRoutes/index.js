// const {Router} = require('express');
// const router = Router();
// const fs = require('fs');
// const utility = require('../utility');
// // const inventory = require('../inventory');

//   // GET ALL CUSTOMERS
// router.get('/', (req, res) => {
//   try {
//     const accounts = utility.getData()
//     const customers = accounts.customers;
//     res.status(201).send(customers)
//   } catch(err) {
//     console.error(err)
//   }})

//   router.post('/login', (req, res) => {
//     const database = utility.getData();
//     const customers = database.customers;
//     const username = req.body.username;
//     const password = req.body.password;
//     const filteredArray = utility.findOne(username, password, customers);
//     const validated = filteredArray[0];
//     if(typeof validated == 'undefined' || typeof validated == 'null'){
//       return res.status(201).json({error: 'NOT FOUND'})
//     }
//     return res.status(201).send(validated)
//   })

//   //INVENTORY
// router.get('/inventory', (req, res) => {
//   const database = utility.getInventory()
//   const policies = database.policies_by_name;
//   res.status(201).send(policies)
// })

//   router.put('/addpaymentmethod/:id', (req, res) => {
//     try{
//       const database =  utility.getData();
//       const customers = database.customers;
//       const id = req.params['id'];
//       const customer = utility.findByID(customers, id); 
//       customer.paymentmethods.push({
//         ...req.body
//       })
//       utility.saveData(customers);
//       return res.status(201).send(customer);
//     } catch (error) {
//       return res.status(500).send({error: 'PROBLEM'})
//   }})

// router.get('/findcustomer/:id', (req, res) => {
//   try {
//     const database = utility.getData();
//     const items = database.customers;
//     const id = req.params['id'];
//     const item = utility.findByID(items, id);
//     return res.status(201).send(item);
//   } catch (err) {
//     console.error(err)
//   }
// })

// router.post('/addcustomer', (req, res) => {
//   try {
//     const database = utility.getData();
//     const items = database.customers;
//     const randomNum = Math.round(Math.floor(Math.random()*1000000));
//     const id = String((parseInt(items[items.length-1]._id) + 1));
//     items.push({
//       _id: id,
//       ...req.body,        // Captured by user
//       paymentmethods:[],
//       policies:[],
//       friends:[]
//     });
//     utility.saveData(database);
//     return res.status(201).send({
//       _id: id,
//        ...req.body
//       });
//   } catch (err) {
//     console.error(err)
//   }

// })

// // ADMIN ONLY
// router.delete('/deletecustomer/:id', (req, res) => {
//   try{
//     const database = utility.getData();
//     const items = database.customers;
//     const id = req.params['id'];
//     const updatedList = utility.findByIDandDelete(items, id);
//     utility.saveData({
//       customers: updatedList
//     });
//     return res.status(201).send('item DELETED');
//   } catch (err) {
//     console.error(err)
//   }
// })

// router.put('/editcustomer/:id', (req, res) => {
//   try{
//     const allCustomers =  utility.getData();
//     const customers = allCustomers.customers;
//     const customerID = req.params['id'];
//     const updateCustomer = utility.editByID(customers, req, customerID)    
//     utility.saveData(allCustomers);
//     return res.status(201).send(updateCustomer);
//   } catch (error) {
//     return res.status(500).send({error: 'PROBLEM'})
// }})

// module.exports = router;