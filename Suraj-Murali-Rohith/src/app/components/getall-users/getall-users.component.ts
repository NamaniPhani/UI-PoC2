import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/service/apiservices.service';

@Component({
  selector: 'app-getall-users',
  templateUrl: './getall-users.component.html',
  styleUrls: ['./getall-users.component.sass'],
})
export class GetallUsersComponent implements OnInit {
  btn: boolean;
  constructor(private service: ApiservicesService, private router: Router) {}
  resultData: any;
  itemsPerPage = 7;
  currentPage = 1;
  deleteByID: any;
  ngOnInit(): void {
    this.getAllEmployee();
  }
  private getAllEmployee() {
    this.service
      .getAllbyPage(this.currentPage, this.itemsPerPage)
      .subscribe((resp: any) => {
        this.resultData = resp['body']['data'];
        console.log(this.resultData);
      });
  }

  pageChange(page: number) {
    this.currentPage = page;
    console.log(page);
    this.getAllEmployee();
  }

  editById(a) {
    localStorage.setItem('id', a);
  }
  deleteData(id) {
    this.service.deleteEmployee(id).subscribe(
      (res) => {
        this.deleteByID = res;
        if (this.deleteByID.body.statusCode == '200') {
          alert(this.deleteByID.body.msg);
          this.getAllEmployee();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  BacktoForm() {
    this.router.navigate(['']);
    localStorage.removeItem('id');
  }
}
