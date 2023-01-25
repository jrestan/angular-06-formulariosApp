import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5)
  // });


  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void { 
    
    /* //esto genera un error porque falta existencias ,,, no es recomendable usar setValue
    this.miFormulario.setValue({
      nombre: 'RTX 1080tx',
      precio: 1525
    });*/

    //es mejor usar reset
    this.miFormulario.reset({
      nombre: 'RTX 1080tx',
      precio: 1525
    });

    //existencias: 5


  }
  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: ['', [Validators.required, Validators.min(0)] ],
    existencias: ['', [Validators.required, Validators.min(0)] ],
  });

  campoEsInvalido(campo: string){
    
    /* //Con esto funciona igualmente bien 
    return this.miFormulario?.controls?.[campo]?.invalid &&
           this.miFormulario?.controls?.[campo]?.touched;*/

    return this.miFormulario?.controls?.[campo]?.errors &&
           this.miFormulario?.controls?.[campo]?.touched;

  }

  onGuardar() {
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);

    this.miFormulario.reset();
    

  }

}
