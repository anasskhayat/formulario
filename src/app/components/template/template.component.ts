import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
    `
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
    `
  ]
})
export class TemplateComponent  {
  usuario:object = {
    nombre:null,
    apellido:null,
    correo:""

  }

  constructor() { }

  guardar(forme:NgForm){

 console.log("guardar")
 console.log("ngform",forme)
 console.log("ngform",forme.value)
}}
