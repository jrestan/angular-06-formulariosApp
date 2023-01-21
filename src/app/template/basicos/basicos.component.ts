import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  //@Input() class: Class;
  //@Output() methodName = new EventEmitter<Class>();
  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean{
    return this.miFormulario?.controls?.['producto']?.invalid &&
           this.miFormulario?.controls?.['producto']?.touched;
  }

  precioValido(): boolean{
    return this.miFormulario?.controls?.['precio']?.invalid &&
           this.miFormulario?.controls?.['precio']?.touched;
  }

  /*guardar(miFormulario: NgForm){
    console.log('Guardado', miFormulario);
  }*/

  guardar(){
    console.log(this.miFormulario);
    
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });

  }

}
