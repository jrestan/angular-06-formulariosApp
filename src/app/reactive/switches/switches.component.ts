import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: false
  }

  ngOnInit(): void {
    //this.miFormulario.setValue(this.persona);

    //this.miFormulario.reset(this.persona); //con esto el valor iniciar de "condiciones" es null
    
    //Con esto le estamos concatenando un valor iniciar a condiciones
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });


    //Con esto se imprime en tiempo real cada vez que hago un cambio solo en el campo condiciones
    this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValue=>{
      console.log("condiciones", newValue);
    })

    
    //Con esto se imprime en tiempo real cada vez que hago un cambio en el formulario
    this.miFormulario.valueChanges.subscribe(form=>{
      console.log(form);

      //delete form.condiciones;  //De esta manera sincronizo this.persona con miFormulario
      //this.persona = form;      //aunque es innecesario porque tengo miFormulario.value para los datos del formulario.. solo es un ejemplo
    });


    //Con esto se imprime en tiempo real cada vez que hago un cambio en el formulario
    this.miFormulario.valueChanges.subscribe(({condiciones, ...form})=>{  //se desestructura el valor y se extrae condiciones y el resto se almacena en form
      this.persona = form;                                                //ya no hace falta eliminar condiciones con el delete
    });

  }

  onGuardar(){

    const formValue = this.miFormulario.value;

    //ELIMINAR UN ELEMENTO DEL JSON.....
    delete formValue.condiciones;

    console.log(formValue);

    this.persona = formValue;
    

  }

}
