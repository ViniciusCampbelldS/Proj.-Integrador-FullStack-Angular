import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
// ApplicationConfig é uma interface que define a configuração do aplicativo Angular, incluindo provedores de serviços e interceptadores de erros globais. provideBrowserGlobalErrorListeners é uma função que permite que o Angular capture erros globais do navegador, como erros de rede e erros de script, e exiba mensagens de erro amigáveis para o usuário.

export const appConfig: ApplicationConfig = {
  providers: [
	// permite que o Angular capture erros globais do navegador, como erros de rede e erros de script, e exiba mensagens de erro amigáveis para o usuário
    provideBrowserGlobalErrorListeners(),
	// permite que o Angular faça o roteamento entre as páginas do aplicativo, como a página de listagem de EPIs, a página de detalhes de um EPI e a página de cadastro de um novo EPI
    provideRouter(routes),
	// permite que o Angular faça requisições HTTP para APIs externas, como a API do GitHub e RESTful
    provideHttpClient()
  ]
};
