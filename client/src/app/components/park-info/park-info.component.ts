import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { ParkedCar } from 'src/app/models/parkedCar';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-park-info',
  templateUrl: './park-info.component.html',
  styleUrls: ['./park-info.component.css']
})
export class ParkInfoComponent implements OnInit {
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
  employee: String = '';
  loaded: boolean = false;
  statuses: String[] = ["PARKING", "PARKED", "REQUESTED", "RETRIEVING", "RETRIEVED", "RETURNED"];

  constructor(private carAPI: CarService, private userAPI: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // pull id from query param
    this.route.queryParams
      .subscribe(params => {
        this.parkedCar._id = params['id'];
        this.loadCar(this.parkedCar._id);
      });
  }

  loadCar(cid: String): void {
    this.carAPI.getById(cid).subscribe(parkedCar => {
      if (parkedCar) {
        this.parkedCar = parkedCar;
        this.car = parkedCar.car;
        // Load the employee so we have access to their name
        this.userAPI.getById(this.parkedCar.enteredBy).subscribe(user => {
          this.employee = user.name;
          this.loaded = true;
        })
      }
    });
  }

  update(): void {
    this.carAPI.updatePark(this.parkedCar).subscribe( () => {
      this.router.navigate(['/home']);
    })
  }

  delete(): void {
    this.carAPI.delete(this.parkedCar._id).subscribe( () => {
      this.router.navigate(['/home']);
    });
  }

}
