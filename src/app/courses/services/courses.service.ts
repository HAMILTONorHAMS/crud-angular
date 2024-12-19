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
     // tap( courses => console.log(courses))
    );
  }
  loadById(id:string){
    return this.httpCllient.get<Course>(`${this.API}/${id}`);

  }

  save(record: Partial<Course>){ //Envio do Body para a API
    console.log("...",record._id);
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httpCllient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpCllient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }
  remove(id:string){
    return this.httpCllient.delete(`${this.API}/${id}`).pipe(first());
  }

}
