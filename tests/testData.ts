import { faker } from "@faker-js/faker";

export const generateRandomRoomsPayload = () => {
    return {
        "category": faker.helpers.arrayElement(['Double', 'Single', 'Twin']),
        "number": faker.number.int({ min: 1, max: 100 }),
        "floor": faker.number.int({ min: 1, max: 10 }),
        "available": true,
        "price": faker.number.int({ min: 50, max: 500 }),
        "features": faker.helpers.arrayElements(['Balcony', 'Ensuite', 'Sea View', 'Penthouse'], { min: 1, max: 3 }),

    }
};

export const generateEditRoomsPayload = () => {
    return {
        "category": 'Test category',
        "number": faker.number.int({ min: 1, max: 100 }),
        "floor": faker.number.int({ min: 1, max: 10 }),
        "available": true,
        "price": faker.number.int({ min: 50, max: 500 }),
        "features": 'test'
    }
};

export const generateRandomClientsPayload = () => {
    return {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "telephone": faker.phone.number(),
    }
};

export const generateRandomBillsPayload = () => {
    return {

        "value": faker.number.int({ min: 1000, max: 5000 }),
        "paid": faker.datatype.boolean()
    }
};

export const generateRandomReservationPayload = () => {
    return {
        "Start": faker.date.soon({ days: 10 }).toISOString().split('T')[0],
        "End": faker.date.soon({ days: 4, }).toISOString().split('T')[0],
        "Client": faker.person.fullName(),
        "Room": faker.number.int({ min: 1, max: 500 }),
        "Bill": faker.number.int({ min: 1, max: 1000 })
    }
}