import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  courses$: Observable <Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar

  ) {
    this.refresh();
   }

   refresh(){
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

    onEdit(Course:Course) {
      this.router.navigate(['edit', Course._id], { relativeTo: this.route });
      }
    onRemove(Course:Course){
      this.coursesService.remove(Course._id).subscribe(
        () => {
          this.refresh();
          this.snackBar.open('Curso removido com sucesso!' , 'X' ,{
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          }); // Tratamento de Erro com tempo.

        },
        () => this.onError('Erro ao remover o curso.')
      );
    }
    }






