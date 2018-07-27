import { Component, OnInit } from '@angular/core';
import { DateTimeRange } from 'date-time-range-picker/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {}

  onDateTimeRangeSelected(range: DateTimeRange) {
    console.log(`From ${range.start} until ${range.end}`);
  }
}
