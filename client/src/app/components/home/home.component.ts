import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkedCar } from 'src/app/models/parkedCar';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cars: ParkedCar[] = [];
  numParked: number = 0;
  filterOptions: String[] = ["PARKING", "PARKED", "REQUESTED", "RETRIEVING", "RETRIEVED", "RETURNED", "ALL"];
  currentFilter: String = "ALL";
  interval : any;

  constructor(private carAPI: CarService, private router: Router) { }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.populateCars();

    this.interval = setInterval(() => {this.populateCarsFiltered() }, 5000);
  }

  populateCars() {
    this.carAPI.getAll().subscribe(cars => {
      this.cars = cars;
      this.numParked = 0;
      cars.forEach(car => {
        if (car.status == "PARKED") {
          this.numParked++;
        }
      })

    });
  }

  navigateToInfo(id: String): void {
    this.router.navigate(['/home/info'], { queryParams: { id: id } });
  }

  onChange(value: any) {
    this.populateCarsFiltered();
  }

  populateCarsFiltered() {
    // Reload with the new filter
    if (this.currentFilter != "ALL") {
      this.carAPI.getAllFiltered(this.currentFilter).subscribe(cars => {
        this.cars = cars;
      });
    }
    else {
      this.populateCars();
    }
  }

}
