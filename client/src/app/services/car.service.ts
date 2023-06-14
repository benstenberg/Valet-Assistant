import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { ParkedCar } from '../models/parkedCar';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  private URL: string = 'api/v1'

  getByPhone(phone: String) : Observable<ParkedCar> {
    return this.http.get<ParkedCar>(this.URL + '/clients/' + phone);
  }

  getAll() : Observable<ParkedCar[]> {
    return this.http.get<ParkedCar[]>(this.URL + '/');
  }

  getAllFiltered(filter : String) : Observable<ParkedCar[]> {
    return this.http.get<ParkedCar[]>(this.URL + '/?filter=' + filter);
  }

  addNewCar(park: ParkedCar) : Observable<ParkedCar> {
    return this.http.post<ParkedCar>(this.URL + '/', park);
  }

  updatePark(park: ParkedCar) : Observable<ParkedCar> {
    return this.http.post<ParkedCar>(this.URL + '/cids/' + park._id, park);
  }

  getById(cid: String) : Observable<ParkedCar> {
    return this.http.get<ParkedCar>(this.URL + '/cids/' + cid);
  }

  delete(cid: String) : Observable<void> {
    return this.http.delete<void>(this.URL + '/cids/' + cid);
  }

  getAllMakes() : Observable<String[]> {
    return this.http.get<String[]>(this.URL + '/makes');
  }

  getAllModels(make: String) : Observable<String[]> {
    return this.http.get<String[]>(this.URL + '/makes/' + make);
  }
}
