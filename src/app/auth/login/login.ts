import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { FormsModule } from '@angular/forms';
@Component({
selector: 'app-login',
standalone: true, // ajuste
imports: [FormsModule], // ajuste
templateUrl: './login.html'
})
export class LoginComponent {
email = '';
senha = '';
constructor(private authService: AuthService) {}
entrar() {
this.authService.login({
email: this.email,
senha: this.senha
}).subscribe({
next: (res) => {
console.log('Resposta da API:', res);
this.authService.salvarToken(res.access_token);
},
error: () => {
console.log('Erro no login');
}
});
}
}