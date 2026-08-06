import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	
	const router = inject(Router);
	// Busca o token salvo no navegador
	const token = localStorage.getItem('token');
	// Se existir token, adiciona no cabeçalho
	if (token) {
		const reqClone = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
		return next(reqClone);
	}
	// Se não tiver token, envia normal
	else {
		return next(req);
	}

};
