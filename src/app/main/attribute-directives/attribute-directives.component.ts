import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-directives',
  templateUrl: './attribute-directives.component.html',
  styleUrls: ['./attribute-directives.component.scss']
})
export class AttributeDirectivesComponent implements OnInit {

  isHighlighted: boolean = false;

  textStyle = {
    "font-size": "20px",
    "color": "red",
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }

}
