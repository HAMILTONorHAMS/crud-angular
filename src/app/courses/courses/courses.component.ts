import { Component, OnInit } from '@angular/core';
import { config, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  courses$: Observable <Course[]>;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error =>{
        this.onError('Erro ao carregar Cursos.');
        return of([])
      })
    );
   }
   
   onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
   }
    ngOnInit(): void {
    }
    onAdd(){
      this.router.navigate(['new'], { relativeTo: this.route });
    }
}





