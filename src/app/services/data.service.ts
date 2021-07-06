import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Feature} from '../interfaces/feature';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<{ features: Feature[] }> {
    return this.http.get<{ features: Feature[] }>('assets/data.json');
  }
}
