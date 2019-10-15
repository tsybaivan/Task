import { AppUser, UserTask } from './user-detail.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  formData: AppUser;
  readonly url = 'http://localhost:50590/api/';
  list: AppUser[];

  formDataTask: UserTask;
  listTask: UserTask[];


  constructor(private http: HttpClient) { }

  postUser()
  {
      return this.http.post(this.url+'/AppUser', this.formData)
  }

  postTask()
  {
    return this.http.post(this.url + '/UserTask', this.formDataTask)
  }

  putUser()
  {
      return this.http.put(this.url+'/AppUser/'+this.formData.id, this.formData)
  }
  
  putTask()
  {
    return this.http.put(this.url + '/UserTask/' + this.formDataTask.id, this.formDataTask)
  }

  deleteUser(id)
  {
      return this.http.delete(this.url+'/AppUser/'+id)
  }

  deleteTask(id)
  {
    return this.http.delete(this.url +'/UserTask/'+id)
  }

  refreshList(){
    this.http.get(this.url+'/AppUser')
    .toPromise()
    .then(res => this.list = res as AppUser[]);
  }

  refreshListTasks()
  {
    this.http.get(this.url + '/UserTask')
    .toPromise()
    .then(res => this.listTask = res as UserTask[]);
  }

  sortByName(){    
    this.list.sort(function(a, b)
    {
      if(a.firstName < b.firstName) { return -1; }
      if(a.firstName > b.firstName) { return 1; }
    return 0;
    });
  }

  sortByCity(){    
    this.list.sort(function(a, b)
    {
      if(a.address < b.address) { return -1; }
      if(a.address > b.address) { return 1; }
    return 0;
    });
  }
}
