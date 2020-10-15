import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  currentPage = 0;
  itemsPerPage = 5;
  fdata: any;
  collection;
  btn = 'Submit';
  submitted = false;
  public noDataFound: boolean;
  totalRecords: any;
  constructor(private ser: ServiceService, private fb: FormBuilder, private myRoute: Router) { }
  ngOnInit() {
    this.getData();
  }
  empForm = this.fb.group({
    id: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
    sal: ['', [Validators.required, Validators.min(10000), Validators.max(1000000), Validators.pattern("^[0-9]*$")]],
    city: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  });
  get f() {
    return this.empForm.controls
  }
  save() {
    let empObj = {
      id: this.empForm.value.id,
      name: this.empForm.value.name,
      sal: this.empForm.value.sal,
      city: this.empForm.value.city,
      phone: this.empForm.value.phone
    }
    // alert(empObj.name)
    if (this.empForm.invalid) {
      return
    }
    this.ser.addEmp(empObj).subscribe(resp => {
      console.log(resp);
      this.getData()
    })
  }
  resetForm() {
    this.btn = 'Submit';
    this.empForm.reset();
    return this.submitted = false;
  }

  editData(a) {
    this.empForm.setValue({
      id: a.id,
      name: a.name,
      sal: a.sal,
      city: a.city,
      phone: a.phone
    })
    this.btn = 'Update';
  }
  getData() {
    this.ser.getAll(this.currentPage, this.itemsPerPage).subscribe(res => {
      // console.log(res);
      this.fdata = res['data'];
      //console.log(this.fdata);
      this.totalRecords = res['totalRecords']
      // alert(this.totalItems);
    })
  }
  pageChange(pageNo: number): void {
    this.currentPage = pageNo;
    this.getData();
  }
  deleteData(id) {
    this.ser.deleteRecord(id).subscribe(res => this.getData());
  }
}