const {Schema} = require('mongoose');


const userShema = Schema ({
    name: String,
    email: String
})

module.exports = {userShema}