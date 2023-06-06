const connection = require('../db');

const findbyID = async (req, res) => {
    const id = req.params.id;
    await connection.query(`SELECT * FROM customers WHERE _id = ${id}`, (err, result) => {
        res.send(result);
    })
}
const addCustomer = async (req, res) => {
    const {name, gender, phone, address, company, username, password} = req.body;
    await connection.query(`INSERT INTO customers (name, gender, phone, address, company, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, gender, phone, address, company, username, password], (err, result) => {
        res.send(result);
    })
}

const login = async (req, res) => {
    const {username, password} = req.body;
    await connection.query(`SELECT * FROM customers WHERE username = ? AND password = ?`,
    [username, password], (err, result) => {
        res.send(result);
    })
}

const inventory = async (req, res) => {
    await connection.query(`SELECT * FROM inventory`, (err, result) => {
        res.send(result);
    })
}

const addPolicy = async(req, res) => {
    const {customer_id, id, policy, price, payment, balance} = req.body;
    await connection.query(`INSERT INTO policies (customer_id, id, policy, price, payment, balance) VALUES (?, ?, ?, ?, ?, ?)`,
    [customer_id, id, policy, price, payment, balance], (err, result) => {
        res.send(result);
    })
}

const addCard = async(req, res) => {
    const {customer_id, name, typeOf, number, expiration} = req.body;
    await connection.query(`INSERT INTO card (customer_id, name, typeOf, number, expiration) VALUES (?, ?, ?, ?, ?)`,
    [customer_id, name, typeOf, number, expiration], (err, result) => {
        res.send(result);
    })
}

const getCard = async(req, res) => {
    const id = req.params.id;
    await connection.query(`SELECT * FROM card WHERE customer_id = ${id}`, (err, result) => {
        res.send(result);
    })
}

const getPolicy = async(req, res) => {
    const id = req.params.id;
    await connection.query(`SELECT * FROM policies WHERE customer_id = ${id}`, (err, result) => {
        res.send(result);
    })
}

module.exports = {
    findbyID,
    addCustomer,
    login,
    inventory,
    addPolicy,
    addCard,
    getCard,
    getPolicy,
}