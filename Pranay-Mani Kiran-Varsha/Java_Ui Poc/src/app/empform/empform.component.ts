import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from '../employe.service';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {
  empdata: any;
  registerForm: FormGroup;
  submitted = false;
  loading = false
  data: any;
  itemsPerPage = 5;
  currentPage = 0;
  totalItems:number;
  editData: any;
  constructor(private service: EmployeService, private fm: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fm.group({
      id: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      name: ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      sal: ['',[Validators.required, Validators.min(10000), Validators.max(1000000), Validators.pattern("^[0-9]*$")]],
      city: ['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      phone: ['', [Validators.required, Validators.minLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
    this.tabledata();
    this.getAllPage();
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.service.posEmpData(this.registerForm.value).subscribe(res =>{
      console.log(res)
      this.tabledata();
    })

  }
  tabledata() {
    this.service.getEmpData().subscribe(res=>{
      this.empdata=res;
      console.log(res);
       //this.empdata = res['list'];
      //  alert(this.empdata)
      //   this.totalItems = res['toatalNoOfElements'];
  })
  }
  delete(i) {
   this.service.deletedata(i).subscribe(res=>this.tabledata());

  }
  edit(data) {
   this.registerForm.setValue({
      id:data.id,
      name: data.name,
      sal: data.sal,
      city: data.city,
      phone: data.phone,
    })
}
  update() {
  this.service.updateEmp( this.registerForm.value).subscribe(res =>this.tabledata())
  }
getAllPage(){
  this.service.getByPage(this.currentPage,this.itemsPerPage).subscribe(resp=>{
console.log(resp);
  })
}
  pageChange(pageNo: number): void {
    if (pageNo) {
      this.currentPage = pageNo;
      this.tabledata();
    }
  }
}
