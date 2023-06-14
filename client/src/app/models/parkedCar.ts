import { Car } from "./car";

export interface ParkedCar {
    _id : String,
    enteredBy : String,
    client : String,
    phone : String,
    date : String,
    status : String,
    location : String,
    car : Car
}