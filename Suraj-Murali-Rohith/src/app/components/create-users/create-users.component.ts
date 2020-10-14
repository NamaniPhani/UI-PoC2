import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.sass'],
})
export class CreateUsersComponent implements OnInit {
  employeeObje = {
    Id: '',
    Name: '',
    City: '',
    Salary: '',
    Phone: '',
  };

  display = false;
  constructor(
    private formbuilder: FormBuilder,
    private service: ApiservicesService,
    private router: Router
  ) {}
  createUserForm: FormGroup;
  submitted: boolean = false;
  addUser: any;
  employeeId: any;
  addeditstatus: any;
  updateEmpData: any;
  ngOnInit(): void {
    this.createUserForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    this.employeeId = localStorage.getItem('id');
    if (this.employeeId != null) {
      this.service.getById(this.employeeId).subscribe((resp) => {
        this.employeeObje = resp['body']['data'];
        console.log('ll', this.employeeObje);
      });
      this.display = false;
    } else {
      this.display = true;
    }
  }
  get f() {
    return this.createUserForm.controls;
  }

  onSubmit() {
    const newUser = {
      id: this.createUserForm.value.id,
      name: this.createUserForm.value.name,
      city: this.createUserForm.value.city,
      salary: this.createUserForm.value.salary,
      phone: this.createUserForm.value.phone,
    };
    this.submitted = true;
    if (this.createUserForm.invalid) {
      return;
    }
    this.service.CreateUser(newUser).subscribe(
      (resp: any) => {
        this.addUser = resp;
        if (this.addUser.body.statusCode == '200') {
          this.router.navigate(['/getall-user']);
          alert(this.addUser.body.msg);
        }
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  UpdateEmployee() {
    this.service.updateEmployee(this.employeeId, this.employeeObje).subscribe(
      (resp) => {
        console.log(resp);
        this.updateEmpData = resp;
        if (this.updateEmpData.body.statusCode == '200') {
          this.router.navigate(['getall-user']);
          alert(this.updateEmpData.body.msg);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  BacktoAll() {
    this.router.navigate(['getall-user']);
  }
}
