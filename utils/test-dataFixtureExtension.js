const base = require("@playwright/test");
import {createEmail, createPassword} from "../TestsData/FakerDataGenerator";
const username =createEmail()
const password =createPassword()

exports.customTest =  base.test.extend(
    {
        testDataForOrder:{
            username,
            password,
            productName:"Zara Coat 3"
        }
    }
)