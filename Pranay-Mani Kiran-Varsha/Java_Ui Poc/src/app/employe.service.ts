import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http:HttpClient) { }
  getEmpData()
{
return this.http.get("http://192.168.3.89:9080/employee/getallemployees")
}
posEmpData(data){
  return this.http.post("http://192.168.3.89:9080/employee/addemployee",data)
}
deletedata(id:number)
{
  return this.http.delete("http://192.168.3.89:9080/employee/deletebyemployeeid/"+id)
}
updateEmp(i){
  return this.http.put("http://192.168.3.89:9080/employee/updateemployee/"+i.id,i)
}
getByPage(pageNo:any,pageitem:any){
return this.http.get(`http://192.168.3.89:9080/employee/employeesearchByname/${pageNo}/${pageitem}/undefined`)
}
}
