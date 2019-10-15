import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { NgForm } from '@angular/forms';
import { AppUser } from 'src/app/shared/user-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  constructor(private service: UserDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.refreshList();
  }
  sortByName()
    {
      this.service.sortByName();
    }

    sortByCity()
    {
      this.service.sortByCity();
    }
  
  populateForm(pd: AppUser)
  {
    this.service.formData = Object.assign({}, pd);
  }

  OnDelete(id){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteUser(id)
      .subscribe(res =>{
        this.service.refreshList();
        this.toastr.warning('Deleted successfulle', 'User Register');
      },
        err => {
          console.log(err);
        });
        
    }      
  }

  resetForm(form?: NgForm)
  {
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        id: 0,
        firstName: '',
        lastName: '',   
        address: '',
        phoneNumber: ''                                       
      }
    
  }

  onSubmit(form: NgForm)
  {
    if(this.service.formData.id==0)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postUser().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submited successfully', 'User Register');
        this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
    
  }

  updateRecord(form:NgForm)
  {
    this.service.putUser().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submited successfully', 'User Register');
        this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
  }
}
