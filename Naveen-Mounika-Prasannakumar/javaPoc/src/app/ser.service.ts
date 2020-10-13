import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SerService {
 constructor(private http:HttpClient) { }
  getAll(pageNo,pageSize){
    return this.http.get(`http://192.168.2.227:8081/emp/readAll/${pageNo}/${pageSize}`);
  }
  // postData(){
  //   return this.http.post()
  // }
  deleteData(id){
    return this.http.delete(`http://192.168.2.227:8081/emp/delete/${id}`);
  }

  postData(a){
    return this.http.post(`http://192.168.2.227:8081/emp/saveOrUpdate`,a);
  }
 
}
