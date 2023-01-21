import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {  }

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      {id:1, nombre: 'Metal Gear'},
      {id:2, nombre: 'DeathStranding'},
    ]
  }



  guardar(miFormulario: NgForm){
    console.log('Formulario posteado', miFormulario);
    
  }

  eliminar(index: number){
    this.persona.favoritos.splice(index, 1);
    //console.log('index', index);
    //console.log('favoritos', this.persona.favoritos);
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito}); //con {...x} se asegura de no mandar ninguna referencia de la variable nuevoFavorito
    this.nuevoJuego = '';

  }

}
