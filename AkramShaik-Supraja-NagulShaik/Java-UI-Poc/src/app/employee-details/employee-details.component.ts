import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  fetchData:any;
  empForm: any;
  constructor(private service: ServiceService , private router:Router) { }

  ngOnInit(): void {
    this.service.data.subscribe(res=>{
      //console.log(res, "com2");  
      this.fetchData = res['data'];
      console.log(this.fetchData,"Test");
    })
  }
  backFunc(){
    this.router.navigate(['']);
  }
}
