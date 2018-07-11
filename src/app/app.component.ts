import { Component } from '@angular/core';
import { DayState } from 'date-time-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dayStatuses = DayState;

  title = 'app';

  onDaySelected(day: number) {
    console.log('day selected', day);
  }

  onDayHovered(day: number) {
    console.log('day hovered', day);
  }
}
