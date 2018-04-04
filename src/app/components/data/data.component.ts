import { Component } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators, FormArray } from '@angular/forms'; 
import { Observable } from 'rxjs/Rx';
import { resolve } from 'url';
import { reject } from 'q';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;
  usuario:object={
    nombreCompleto:{
    nombre:'anass',
     apellido:'khayat'
    },
  correo:'figo1899@gmail.com',
 /*  pasatiempo:['Correr','viajar','nadar'] */
  }

  constructor() {
    this.forma=new FormGroup({
      'nombreCompleto': new FormGroup({
           'nombre': new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(5)
                                     ]),
            'apellido': new FormControl('',[
                                            Validators.required,
                                            this.nokhayat
                                          ]),
      }),
    
      'correo':new FormControl('',[
                                  Validators.required,
                                  Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")   
                                ]),
      'pasatiempo':new FormArray([
        new FormControl('Correr',[
                Validators.required
        ])
      ]),
      'usename':new FormControl('',Validators.required , this.existeUser),
      'password1':new FormControl('',Validators.required),
      'password2':new FormControl('',)
    })
    /* this.forma.setValue(this.usuario); */
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noigual.bind(this.forma)
    ])

    this.forma.valueChanges
              .subscribe( data=>{
                console.log(data)
              })

   this.forma.controls['usename'].statusChanges
                                 .subscribe(name=>{
                                   console.log(name)
                                 })
   }
  





   guardarPasa(){
     (<FormArray>this.forma.controls['pasatiempo']).push(
       new FormControl('viajar',Validators.required)
     )
   }

   nokhayat( control: FormControl ):{[s:string]:boolean}{
     if(control.value === "khayat" ){
       return  {nokhayat:true};
     }
     return null;
   }

   noigual( control: FormControl ):{[s:string]:boolean}{
     let forma:any=this;
    if(control.value !== forma.controls['password1'].value ){
      return  {noiguales:true};
    }
    return null;
  }

  existeUser( control: FormControl ): Promise<any>|Observable<any>{

    let promesa=new  Promise(
      (resolve,reject)=>{

        setTimeout( ()=>{
         if(control.value==="anass"){
         resolve( { existe:true})
         }else{
           resolve(null)
         }
        },3000 )
      }
    )
    return promesa;
  }

   guardar(){
     console.log(this.forma.value);
     console.log(this.forma)
     this.forma.reset({
       nombreCompleto:{
        nombre:'',
        apellido:''
       },
       correo:''
     })
   }



}
