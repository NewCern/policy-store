// // const accounts = './database.json';
// const accounts = './database/data.json';
// const inventory = './database/inventory.json';
// const fs = require('fs'); //JSON interpreter

// const saveData = (data) => { // 
//     const makeString = JSON.stringify(data, null, 2); //convert 'data' argument to JSON string('null,2' keeps json structured)
//     fs.writeFileSync(accounts, makeString); //write over existing JSON string
// }

// const getData = () => {
//     const getJSONData = fs.readFileSync(accounts); //get JSON data
//     return JSON.parse(getJSONData); //return it as a string
// }

// const getInventory = () => {
//   const getJSONData = fs.readFileSync(inventory); //get JSON data
//   return JSON.parse(getJSONData); //return it as a string
// }


// const editByID = (array, req, id) => {
//   let update;
//     for(let item = 0; item < array.length; item++){
//       if(array[item]._id == id){
//         array[item] = {
//           ...array[item],
//           ...req.body,
//         }
//         update = array[item];
//       }
//     }
//     return update;
// }

// const findByID = (array, id) => {
//   for(let item = 0; item < array.length; item++){
//     if(array[item]._id == id){
//      return array[item];
//     }
//   }
// }

// const findByIDandDelete = (array, id) => {
//   const excludeByID = array.filter(item => item._id !== id);
//   return excludeByID;
// }

// // USE THIS FOR LOGIN
// const findOne = (username, password, accounts) => {
//   const account = accounts.filter(account => account.username == username && account.password == password);
//   return account;
// }


// module.exports = {
//     saveData,
//     getData,
//     editByID,
//     findOne,
//     findByID,
//     getInventory,
//     findByIDandDelete,
// }