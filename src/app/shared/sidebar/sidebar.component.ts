import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  logout() {
    Swal.fire({
      title: 'Cerrando sesión....',
      timer: 90000,
      didOpen: () => {
        Swal.showLoading(null)
      }
    })
    this.authService.logout().then(() => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }
}
