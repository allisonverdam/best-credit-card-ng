import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = { username: '', password: '' };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.obterToken()) {
      this.router.navigate(['/cartoes']);
    }
  }

  autenticar(event) {
    event.preventDefault();
    const url = 'https://best-credit-card.herokuapp.com';
    this.http
      .post(`${url}/v1/login`, {
        username: this.usuario.username,
        password: this.usuario.password
      })
      .subscribe((res: any) => {
        this.salvarToken(res.token);
        this.router.navigate(['/cartoes']);
      }, e => {
        alert(e.error.message);
      });
  }

  salvarToken(token) {
    localStorage.setItem('token', token);
  }

  obterToken() {
    return localStorage.getItem('token');
  }

}
