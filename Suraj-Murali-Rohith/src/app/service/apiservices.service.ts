import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiservicesService {
  constructor(private http: HttpClient) {}

  baseurl: string = 'http://192.168.3.18:8087/employee/save';

  CreateUser(object: any) {
    return this.http.post(this.baseurl, object);
  }
  getAllbyPage(pageno, pagesize) {
    return this.http.get(
      `http://192.168.3.18:8087/employee/getall/${pageno}/${pagesize}`
    );
  }
  updateEmployee(id: any, data: any) {
    return this.http.put(
      'http://192.168.3.18:8087/employee/update/',
      data
    );
  }
  getById(id: number) {
    return this.http.get(`http://192.168.3.18:8087/employee/getbyid/${id}`);
  }
  deleteEmployee(id: any) {
    return this.http.delete(
      `http://192.168.3.18:8087/employee/deletebyid/${id}`
    );
  }
}
