import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = fb.group({});
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  loginUsuario() {
    const { email, password} = this.loginForm.value;
    if(this.loginForm.invalid) {return;}

    Swal.fire({
      title: 'Espere por favor....',
      timer: 90000,
      didOpen: () => {
        Swal.showLoading(null)
      }
    })
    
    this.authService.loginUsuario(email, password).then( credenciales => {
      console.log(credenciales);
      Swal.close();  
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
