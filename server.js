// const app = require("./app");
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is listening on ${PORT}`);
// })

const app = require("./app.js");
const PORT = process.env.PORT || 3000;
const db = require('./db');

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})