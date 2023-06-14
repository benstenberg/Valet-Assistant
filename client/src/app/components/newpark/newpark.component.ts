import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { ParkedCar } from 'src/app/models/parkedCar';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-newpark',
  templateUrl: './newpark.component.html',
  styleUrls: ['./newpark.component.css']
})
export class NewparkComponent implements OnInit {

  @Input() make: string = 'Acura'
  @Input() model: string = 'TLX';
  @Input() color: string = '';
  @Input() plate: string = '';
  @Input() client: string = '';
  @Input() phone: string = '';
  @Input() spot: string = '';

  makes: String[] = [];
  models: String[] = [];

  constructor(private carAPI: CarService, private router: Router) { }

  ngOnInit(): void {
    this.carAPI.getAllMakes().subscribe(data => {
      this.makes = data;
      // API is limited to one request per second
      this.delay(1000).then(() => this.getModels(this.make));
    })
  }

  submit(): void {
    if (this.client && this.phone && this.make && this.model)
      this.carAPI.addNewCar({
        _id: '',
        enteredBy: '',
        client: this.client,
        phone: this.phone,
        date: '',
        status: '',
        location: this.spot,
        car: {
          make: this.make,
          model: this.model,
          color: this.color,
          plate: this.plate
        }
      }).subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  onChange(value: any): void {
    this.delay(1000).then( () => this.getModels(this.make) );
  }

  getModels(make: String): void {
    this.carAPI.getAllModels(this.make).subscribe(data => {
      this.models = data;
    })
  }

  delay(time: any) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


}
