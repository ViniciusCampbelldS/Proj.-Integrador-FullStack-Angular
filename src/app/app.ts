import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [AppHeader, NgIf, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private readonly router: Router) {}

  get showHeader(): boolean {
    return this.router.url !== '/login';
  }
}
