class ParkedCar {
    constructor(client, car, date, status, location) {
       this.client = client;
       this.car = car; // Car obj
       this.date = date;
       this.status = status;
       this.location = location;
    }
 }

 module.exports = ParkedCar;