import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SerService } from '../ser.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage=1;
  itemsPerPage=3;
  fdata;
  collection;
  totalItems:number;
  btn='Submit';
  submitted = false;
  constructor(private se:SerService,private fb:FormBuilder) { }
ngOnInit(){
    this.getData();
  }
  eForm=this.fb.group({
    id:['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    name:['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
   salary:['', [Validators.required, Validators.min(10000), Validators.max(1000000), Validators.pattern("^[0-9]*$")]],
    city:['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
   phone:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
});
get f() { 
  return this.eForm.controls}
save(a){
if(this.eForm.invalid){
return this.submitted=true;
}
  if(this.btn=='Submit'){
  this.se.postData(a).subscribe(res=>this.getData())
    this.eForm.reset();
  }
  else{
  this.se.postData(a).subscribe(res=>this.getData())
    this.eForm.reset();
    this.btn='Submit';
  }
 }

resetForm(){
  this.btn='Submit';
  this.eForm.reset();
 return this.submitted=false;
  }

editData(a){
this.eForm.setValue({
  id:a.id,
  name:a.name,
 salary:a.salary,
  city:a.city,
 phone:a.phone
})
this.btn='Update';

}

  getData(){
  this.se.getAll(this.currentPage,this.itemsPerPage).subscribe(res=>{
    this.fdata=res['empList'];
    this.totalItems = res['totalRecords']})
}

pageChange(pageNo: number): void {
  if (pageNo) {
    this.currentPage = pageNo;
    this.getData();
  }
}
deleteData1(id){
  this.se.deleteData(id).subscribe(res=>this.getData());
    }
}
