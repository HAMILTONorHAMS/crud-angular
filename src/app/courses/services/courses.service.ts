import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import {  first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpCllient: HttpClient) { }

  list() {
    return this.httpCllient.get<Course[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      tap( courses => console.log(courses))
    );
  }
  save(record: Partial<Course>){ //Envio do Body para a API
    return this.httpCllient.post<Course>(this.API, record).pipe(first());
  }

}
