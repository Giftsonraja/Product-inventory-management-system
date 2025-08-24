import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  onRegister(form: any): void {
    if (form.valid) {
      this.authService.register(form.value).subscribe({
        next: () => alert('Registered successfully!'),
        error: (err) => alert(err.message) 
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}

