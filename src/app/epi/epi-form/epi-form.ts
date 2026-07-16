import { Router } from '@angular/router';
import { EpiService } from '../epi';
import { Component } from '@angular/core';

// alteração feita
import { inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
// até aqui



@Component({
  selector: 'app-epi-form',
  imports: [ReactiveFormsModule], // importação do componente
  templateUrl: './epi-form.html',
  styleUrl: './epi-form.scss'
})
export class EpiForm {
  // -- código trabalhado para validação do formulário --
  private fb = inject(FormBuilder);
  private epiService = inject(EpiService);
  private router = inject(Router);

  formulario = this.fb.nonNullable.group({
  nome: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(80),
    Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
  ]],
  categoria: ['', Validators.required],
  ca: ['', [
    Validators.required,
    Validators.pattern(/^\d+$/)
  ]],
  funcionarios: ['', [Validators.required, Validators.minLength(3)]],
  vencimento: ['', Validators.required]
});

  // --- fim do código trabalhado para validação do formulário ---
  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const payload = this.formulario.getRawValue();
    this.epiService.create(payload).subscribe({
      next: () => this.router.navigate(['/epi']),
      error: (erro) => console.error('Erro ao cadastrar EPI:', erro)
    });
  }

}