import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/enums/status';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'app-structural-directives',
  templateUrl: './structural-directives.component.html',
  styleUrls: ['./structural-directives.component.scss']
})
export class StructuralDirectivesComponent implements OnInit {

  isUserLoggedIn: boolean = true;
  fullName: string = "Lance Chester Malaluan";
  status: string = "active";
  statuses: string[] = [Status.ACTIVE, Status.INACTIVE];
  customers: Customer[] = [
      { firstName: 'Jonelle', lastName: 'Mesa', age: 20 },
      { firstName: 'Geraldine', lastName: 'Candelaria', age: 33 },
      { firstName: 'Jerald', lastName: 'Constantino', age: 50 },
      { firstName: 'Deborah', lastName: 'Espiritu', age: 45 },
    ];  

  constructor() { }

  ngOnInit(): void {
  }

  setToActive(): void{
    this.status = "active";
  }

  setToInactive(): void{
    this.status = "inactive";
  }

}
