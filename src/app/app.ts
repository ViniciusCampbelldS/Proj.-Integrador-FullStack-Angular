import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';

@Component({
  selector: 'app-root',
  imports: [AppHeader, NgIf, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private readonly router: Router) {}

  get showHeader(): boolean {
    return this.router.url !== '/login';
  }
}
