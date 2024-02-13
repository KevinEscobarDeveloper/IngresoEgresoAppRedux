import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  formGroup: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.formGroup = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  crearUsuario() {
    if(this.formGroup.invalid) {return;}

    const {name, email, password} = this.formGroup.value;

    Swal.fire({
      title: 'Espere por favor....',
      timer: 90000,
      didOpen: () => {
        Swal.showLoading(null)
      }
    })

    this.authService.crearUsuario(name, email, password).then( credenciales => {
      Swal.close();
      console.log(credenciales);
      this.router.navigate(['/']);
    }).catch(err => { 
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message
      });
    });
  }



}
