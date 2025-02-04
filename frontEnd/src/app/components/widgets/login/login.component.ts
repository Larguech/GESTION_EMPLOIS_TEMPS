import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  formGroup!: FormGroup;
  @Input()
  showLogin : boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  login() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const username = this.username?.value;
    const password = this.password?.value;

    this.authService.login(username, password).subscribe(
      {
        next: (response) => {
          console.log(response)
          if (response.authentificated) {
            // Save authentication data
            this.authService.saveAuthData(response.token, response.user);
            console.log("wajih ")
            this.authService.loggedIn= true
            // Navigate to home page
          } else {
            Swal.fire('Échec', 'Nom d\'utilisateur ou mot de passe incorrect', 'error');
          }
        },
        error: (error) => {
          Swal.fire('Échec', 'Une erreur s\'est produite lors de la connexion', 'error');
        }
      }
    ).add(() => {
      this.showLogin = false
      this.router.navigate(['/home']) ;
    }
    )
  }
}

