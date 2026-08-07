import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppHeader } from './components/geral/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private readonly router: Router) {}

  get showHeader(): boolean {
    return this.router.url !== '/login';
  }
}
