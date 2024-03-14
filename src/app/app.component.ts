import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UniverSheetComponent } from './univerSheets/univerSheets.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UniverSheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-univer-sheets';
}
