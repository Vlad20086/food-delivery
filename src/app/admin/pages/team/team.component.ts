import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css' ,'./../../admin-global.css']
})
export class TeamComponent implements OnInit {

  teamTable:boolean = false;
  constructor(private api:ApiService, public loginService:LoginService) { }

  addTeamForm = new FormGroup({
    "name": new FormControl("",[Validators.required,Validators.minLength(3)]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.minLength(4)]),
    "cpassword": new FormControl("", [Validators.required, Validators.minLength(4)]),
  });

    get name(){
      return this.addTeamForm.get("name");
    }
    get email(){
      return this.addTeamForm.get("email");
    }
    get password(){
      return this.addTeamForm.get("password");
    }
    get cpassword(){
      return this.addTeamForm.get("cpassword");
    }

  message:string = "";
  addTeam(){
    const formData:FormData = new FormData();
    if(this.addTeamForm.value.password == this.addTeamForm.value.cpassword){
      formData.append("name", this.addTeamForm.value.name);
      formData.append("password", this.addTeamForm.value.password);
      formData.append("email", this.addTeamForm.value.email);
      this.api.addTeam(formData).subscribe({
        next:data=>{
          console.warn(data);
          if(data.status==1){
            this.backToTable();
            this.message = "New Team member is added";
            this.addTeamForm.reset();
            this.getTeam();
          }else if(data.status==2){
            this.message = "Email address is already exits";
          }else if(data.status==0) {
            this.message = "Something wrong from backend service";
          }else {
            this.message = "Something wrong";
          }
        },
        error:errorMessage=>{
          this.message = "Error: "+errorMessage.message;
        }
      });
    }else {
      this.message = "Please enter same password";
    }
    setTimeout(()=>{
      this.message = "";
    }, 4000);
  }

  itemCount!:number;
  teamMember:any; 
  getTeam(){
    this.api.getTeam().subscribe({
      next:data=>{
        console.warn(data);
        this.itemCount = data.itemCount;
        this.teamMember = data.body;
      },
      error: error=>{
        console.warn(error.message);
      }
    })
  }
  deleteMember(id:number){
    console.warn(localStorage.getItem("sessionEmail"))
      this.api.deleteMember(id, localStorage.getItem("sessionEmail")).subscribe({
        next:data=>{
          if(data.status==1){
            this.getTeam();
            window.scroll({ top: 0, left: 0, behavior: 'smooth'});
            this.message = "One Team Member has been deleted";
          }else if(data.status=2){
            window.scroll({ top: 0, left: 0, behavior: 'smooth'});
            this.message = "Please logout this session email before delete";
          }else if(data.status==0){
            window.scroll({ top: 0, left: 0, behavior: 'smooth'});
            this.message = "Server Side problems occurred";
          }else {
            window.scroll({ top: 0, left: 0, behavior: 'smooth'});
            this.message = "Something wrong";
          }
        },
        error: error=>{
          console.warn(error.message);
          this.message = error.message;
        }
      })
      setTimeout(()=>{
        this.message = "";
      },4000);
  }
  updateMember(id:number){
  }
  editMember(id:number){
    window.scroll({ top: 0, left: 0, behavior: 'smooth'});
      this.message = "This feature is only for super admin | thats is not implemented";
      setTimeout((  )=>{
        this.message = "";
      },4000);
  }
  addTeamPage(){
    this.teamTable = false;
  }
  backToTable(){
    this.teamTable = true;
    this.addTeamForm.reset();
  }
  ngOnInit(): void {
    this.getTeam();
    this.teamTable = true;
  }

}
