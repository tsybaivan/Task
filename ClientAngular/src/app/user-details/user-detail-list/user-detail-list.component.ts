import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserTask } from 'src/app/shared/user-detail.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-detail-list',
  templateUrl: './user-detail-list.component.html',
  styles: []
})
export class UserDetailListComponent implements OnInit {

  constructor(private service: UserDetailService,
    private toastr: ToastrService) { }
   
  ngOnInit() {
    this.resetFormTask();
    this.service.refreshListTasks();
  }

  populateForm(pd: UserTask)
  {
    this.service.formDataTask = Object.assign({}, pd);
  }

  onSubmitTask(form: NgForm)
  {
    if(this.service.formDataTask.id==0)
    this.insertRecordTask(form);
    else
    this.updateRecordTask(form);
  }

  insertRecordTask(form:NgForm)
  {
    this.service.postTask().subscribe(
      res => {
        this.resetFormTask(form);
        this.toastr.success('Submited successfully', 'User Register');
        this.service.refreshListTasks();
      },
      err => {
        console.log(err)
      }
    )    
  }

  OnDeleteTask(id){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteTask(id)
      .subscribe(res =>{
        this.service.refreshListTasks();
        this.toastr.warning('Deleted successfulle', 'User Register');
      },
        err => {
          console.log(err);
        });        
    }      
  }

  resetFormTask(form?: NgForm)
  {
    if(form!=null)
      form.resetForm();
      this.service.formDataTask = {
        id: 0,
        taskName: '',
        description: '',   
        clientAddress: '',
        startTime: '' ,
        endTime: ''                      
      }
    }

  updateRecordTask(form:NgForm)
  {
    this.service.putTask().subscribe(
      res => {
        this.resetFormTask(form);
        this.toastr.info('Submited successfully', 'User Register');
        this.service.refreshListTasks();
      },
      err => {
        console.log(err)
      }
    )    
  }
}
