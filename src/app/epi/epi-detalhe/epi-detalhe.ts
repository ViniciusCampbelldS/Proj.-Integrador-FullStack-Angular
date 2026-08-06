import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-epi-detalhe',
  imports: [RouterModule],
  templateUrl: './epi-detalhe.html',
  styleUrl: './epi-detalhe.scss',
})
export class EpiDetalhe implements OnInit {

    id: number = 0; // Variável que vai armazenar o ID vindo da URL​

    // O Angular injeta o serviço ActivatedRoute automaticamente​

    // Ele nos dá acesso aos parâmetros da URL (query string nesse caso)​

  constructor(private route: ActivatedRoute) { }​

  ngOnInit() {  // Método executado quando o componente é carregado​

    // queryParams é um observable (fluxo de dados da URL)​

    this.route.queryParams.subscribe(params => {    // subscribe = "ficar escutando mudanças na URL"​

      // Pegamos o valor do parâmetro 'id' vindo da URL​

      // Exemplo de URL: /epi/detalhe?id=10​

      this.id = params['id'];​

      // Agora o valor pode ser usado no HTML:​

      // Exemplo: {{ id }}​

    });​

  }​

}