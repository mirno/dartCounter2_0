import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teletext-display',
  templateUrl: './teletext-display.component.html',
  styleUrls: ['./teletext-display.component.css']
})
export class TeletextDisplayComponent implements OnInit {
  headerTime: string = '';

  ngOnInit(): void {
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    const currTime = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currMin = currTime.getMinutes().toString().padStart(2, '0');
    const currHour = currTime.getHours().toString().padStart(2, '0');
    this.headerTime = `${days[currTime.getDay()]} ${months[currTime.getMonth()]} ${currTime.getDate()} ${currHour}:${currMin}`;
  }
}
