import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss'],
})
export class HorizontalChartComponent implements OnInit {

  @ViewChild('canvas',{static:true}) canvas;
  constructor() { }

  private bars;
  ngOnInit() {}

 

}
