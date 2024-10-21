import {faker} from "@faker-js/faker";

export function createEmail() {
     return faker.internet.email();
}

export function createPassword(){
    return faker.internet.password()
}