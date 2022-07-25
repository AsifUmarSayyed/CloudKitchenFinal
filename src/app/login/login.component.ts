import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../site-layout/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  public loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (data) => {
        const user = data.find((a: any) => {
          return (
            a.email == this.loginForm.value.email &&
            a.password == this.loginForm.value.password
          );
        });
        if (user) {
          alert('Successfully Login!!');
          this.loginForm.reset();
          // this.router.navigate(['/', user.id]);
          localStorage.setItem('userId', JSON.stringify(user.id));
          if (user.type == 'Customer') {
            this.router.navigate(['/view-all/', user.id]);
          } else {
            this.router.navigate(['/admin/', user.id]);
          }
        } else {
          alert('Invalid Login!!');
        }
      },
      (err) => {
        alert('Something went wrong!!');
      }
    );
  }
  signup() {
    this.router.navigate(['/signup']);
  }
}
