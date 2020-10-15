import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public data: any;
  constructor(private http:HttpClient) { }
  getAll(pageNo, pageSize){
    if (pageNo) {
      pageNo = pageNo - 1;
    }
    return this.http.get(`http://192.168.2.139:8080/employee/getAll/${pageNo}/${pageSize}`);
  }
  addEmp(data){
    return this.http.post('http://192.168.2.139:8080/employee/saveorupdate', data)
  }
  deleteRecord(id) {
    return this.http.delete('http://192.168.2.139:8080/employee/delete/' + id, id);
  }
  GetId(id){
    return this.data = this.http.get('http://192.168.2.139:8080/employee/getById/' + id);
  }
  update(id){
    return this.data = this.http.put('http://192.168.2.139:8080/employee/saveorupdate/' + id, id);
  }
}
