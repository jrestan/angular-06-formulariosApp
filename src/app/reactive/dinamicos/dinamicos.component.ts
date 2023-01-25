import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Dead Stranding', Validators.required]
    ], Validators.required)
  });
  
  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

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
    this.favoritosArr.clear();
    
  }


  agregarFavorito(){
    if(this.nuevoFavorito.invalid){return;}

    //((this.miFormulario.get('favoritos')) as FormArray).push

    //this.favoritosArr.push(new FormControl( this.nuevoFavorito.value, Validators.required ));

    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();

  }

  borrarFavorito(index: number){
    
    this.favoritosArr.removeAt(index);

  }

}
