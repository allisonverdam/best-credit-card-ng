import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit {
  cartoes: any = [];
  token;
  url = 'https://best-credit-card.herokuapp.com';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.obterToken();
  }

  obterCartoes() {
    return this.http
        .get(`${this.url}/v1/cards`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .subscribe(res => {
            this.cartoes = res;
        }, e => alert(e.error.message));
}

deslogar(history) {
    localStorage.clear();
    this.router.navigate(['/login']);
}

obterToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar autenticado.');
        this.router.navigate(['/login']);
        return;
    }
    this.token = token;
    return this.obterCartoes();
}

}
