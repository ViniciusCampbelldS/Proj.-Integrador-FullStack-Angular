import { HttpInterceptorFn } from '@angular/common/http';

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
	if (!token) {
		return next(req);
	}

};
