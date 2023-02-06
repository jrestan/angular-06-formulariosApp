import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal ......... AHORA estas variables estan en shared/validators
  //nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  //emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  //emailErrorMsg: string = "";


  constructor(  private fb: FormBuilder,
                private validatorSerice: ValidatorService,
                private emailValidator: EmailValidatorService) { }  //Otra forma de usar las validaciones es por sercivio
                                                                //Se inyecta el servicio aqui en el contructor


  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Javier Restan',
      email: 'javier.restan@microfost.com',
      username: 'jrestan',
      password: '123456',
      repassword: '123456'
    })
  }

  //Validador Personalizado SINCRONO... aun no se han visto los validadores asincronos
  //......... AHORA esta funcion esta en shared/validators
  //
  // noPuedeSerStrider(control: FormControl){
  //   const valor: string = control.value?.trim().toLowerCase();
  //   //console.log(valor);
  //   if(valor==='strider'){
  //     return {  //si se escribe esa palabra el Validador Personalizado devolvera este objeto
  //       noStrider:true
  //     }
  //   }
  //   return null;
  // }

  /*
  //Aqui se usa las constantes declaradas en el shared/validators
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    username: ['', [Validators.required, noPuedeSerStrider]]
  });
  */
  //Aqui se usa las variables y funciones declaradas en el servicio
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.validatorSerice.nombreApellidoPattern )]],
    email: ['', [Validators.required, Validators.pattern( this.validatorSerice.emailPattern )], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorSerice.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    repassword: ['', [Validators.required ]]
  }, {
    validators: [this.validatorSerice.camposIguales('password', 'repassword')]
  });


  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched;
  }


  submitFormulario(){

    console.log(this.miFormulario.value);
    
    this.miFormulario.markAllAsTouched();

  }

  getErrorsCampo(campo: string){
    return this.miFormulario.get(campo)?.errors;
  }

  /*
  emailRequired(){
    return this.miFormulario.get('email')?.errors?.['required'] &&
           this.miFormulario.get('email')?.touched;
  }
  emailFormato(){
    return this.miFormulario.get('email')?.errors?.['pattern'] &&
           this.miFormulario.get('email')?.touched;
  }
  emailTomado(){
    return this.miFormulario.get('email')?.errors?.['emailTomado'] &&
           this.miFormulario.get('email')?.touched;
  }*/
  //Esta solucion es mas practica que la anterior comentada
  get emailErrorMsg(): string 
  {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return "El correo es obligatorio";
    }
    else if(errors?.['pattern']){
      return "Debe ser un formato de correo valido";
    }
    else if(errors?.['emailTomado']){
      return "El correo ya fue tomado";
    }
    return "";
  }

}
