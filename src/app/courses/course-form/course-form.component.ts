import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})

export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group(
    {
      name: [''],
      category: ['']
    }
  );

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.service.save(this.form.value)
      .subscribe(result => this.onSucess(), error => this.onError());
  }

  onCancel(){
    this.location.back()
  }

  private onSucess(){
    this.snackBar.open('Curso Salvo com sucesso!' , '' ,{duration: 5000}); // Tratamento de Erro com tempo.
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Curso!' , '' ,{duration: 5000}); // Tratamento de Erro com tempo.
  }

  private onDelete(){

  }
}
