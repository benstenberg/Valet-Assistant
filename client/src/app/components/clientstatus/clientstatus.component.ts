import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { ParkedCar } from 'src/app/models/parkedCar';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-clientstatus',
  templateUrl: './clientstatus.component.html',
  styleUrls: ['./clientstatus.component.css']
})
export class ClientstatusComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private carAPI: CarService) { }

  phone: string = '';
  car: Car = {
    make: '',
    model: '',
    color: '',
    plate: ''
  }
  parkedCar: ParkedCar = {
    _id: '',
    enteredBy: '',
    client: '',
    phone: '',
    date: '',
    status: '',
    location: '',
    car: this.car
  }
  loaded: boolean = false;
  valid: boolean = false;
  canBeRetrieved: boolean = true;

  ngOnInit(): void {
    // pull phone number from query param
    this.route.queryParams
      .subscribe(params => {
        this.phone = params['phone'];
        // do api call
        this.carAPI.getByPhone(this.phone).subscribe(parkedCar => {
          if (parkedCar) {
            this.parkedCar = parkedCar;
            this.car = parkedCar.car;
            this.valid = true;
            if (this.parkedCar.status == "RETURNED" || this.parkedCar.status == "RETRIEVING" || this.parkedCar.status == "REQUESTED" || this.parkedCar.status == "RETRIEVED") {
              this.canBeRetrieved = false;
            }
          }
          else {
            this.valid = false;
          }
          this.loaded = true;
        });
      });
  }

  requestRetrieval(): void {
    this.parkedCar.status = "REQUESTED"
    this.carAPI.updatePark(this.parkedCar).subscribe(() => {
      this.canBeRetrieved = false;
    });
  }



}