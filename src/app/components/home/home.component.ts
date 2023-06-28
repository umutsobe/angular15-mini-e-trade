import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  template: `<p>home works</p>`,
})
export class HomeComponent {
  constructor(private titleService: Title) {
    titleService.setTitle('E-Trade Home');
  }
}
