import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //validate(control: AbstractControl): Observable<ValidationErrors | null> {
    
    const email = control.value;
    console.log('email', email);
    
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
              .pipe(
                //delay(3000),  //Se pone este delay para simular una demora en la respuesta del http
                map( resp=>{
                  return (resp.length===0)?null:{emailTomado: true}
                }
                )
               );
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
