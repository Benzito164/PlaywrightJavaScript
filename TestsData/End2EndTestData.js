const {createEmail, createPassword} = require("./FakerDataGenerator");
const data = {
    userEmail :'rassured@rs.com',
    userPassword : 'Rassured@rs1',
    productName : 'ZARA COAT 3'
}

const arrayDataSet = [
    {
        userEmail:createEmail(),
        userPassword:createPassword(),
        productName:''
    },
    {
        userEmail:createEmail(),
        userPassword:createPassword(),
        productName:''
    }
]
 module.exports = {data,arrayDataSet}
