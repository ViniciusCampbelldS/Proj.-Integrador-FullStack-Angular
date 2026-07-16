import { Router } from '@angular/router';
import { EpiService } from '../epi';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
  // OBS:
  // FormControl: controla um campo, como nome.
  // FormGroup: agrupa os campos; neste caso, todo o formulario de EPI.
  // FormBuilder: um "construtor" que torna mais facil criar o FormGroup.
  // Validators: regras como "obrigatorio" ou "minimo de caracteres".
  // ReactiveFormsModule: habilita no HTML diretivas como [formGroup] e formControlName.
} from '@angular/forms';

@Component({
	selector: 'app-epi-form',
	imports: [ReactiveFormsModule], // importação do componente
	templateUrl: './epi-form.html',
	styleUrl: './epi-form.scss'
})


export class EpiForm {
	// fb é uma instância de FormBuilder, que facilita a criação do formulário reativo.
	private fb = inject(FormBuilder);
	// epiService é uma instância de EpiService, que fornece métodos para interagir com a API de EPI.
	private epiService = inject(EpiService);
	// router é uma instância de Router, que permite navegar entre páginas do aplicativo.
	private router = inject(Router);

	// --- início do código trabalhado para validação do formulário ---
	formulario = this.fb.nonNullable.group({
		nome: ['', [
			// não pode ser vazio
			Validators.required,
			// entre 3 e 80 characteres
			Validators.minLength(3),
			Validators.maxLength(80),
			// Validação para permitir de A a Z, de a a z, acentos e espaços. Não permite números nem caracteres especiais. A validação deve ser aplicada desde ^ (indica o início da string) até $ (indica o final da string), ou seja, toda a string.
			Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
		]],
		categoria: ['', Validators.required],
		ca: ['', [
			// não pode ser vazio
			Validators.required,
			// Validação para permitir apenas números.
			Validators.pattern(/^\d+$/)
		]],
		funcionarios: ['', [Validators.required, Validators.minLength(3)]],
		// não pode ser vazio
		vencimento: ['',
			Validators.required,
			// Validação para permitir apenas datas no formato ano(4 caractéres)/mês(2)/dia(2).
			Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)
		]
	});

	// Método para salvar os dados do formulário.
	salvar(): void {
		if (this.formulario.invalid) {
			// Se o formulário for inválido, marca todos os campos como “tocados” para exibir mensagens de erro.
			this.formulario.markAllAsTouched();
			return;
		}
		// payload recebe getRawValue(), que retorna os valores do formulário.
		const payload = this.formulario.getRawValue();
		// Chama o método create() ou cadastrar() do EpiService para enviar os dados para a API.
		this.epiService.cadastrar(payload).subscribe({
			// Se a requisição for bem-sucedida, navega para a página de listagem de EPIs.
			next: () => this.router.navigate(['/epi']),
			// Se houver um erro, exibe no console.
			error: (erro) => console.error('Erro ao cadastrar EPI:', erro)
		});
	}

}