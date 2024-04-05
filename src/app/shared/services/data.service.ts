import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData(): Observable<{fullName: string}> {
    // Simulating an asynchronous operation with delay
    return of({fullName: "Juan Dela Cruz"}).pipe(delay(2000));
  }
}