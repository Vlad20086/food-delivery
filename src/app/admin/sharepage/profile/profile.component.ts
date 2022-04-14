import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  picture:boolean = false;
  pictureFile:any ="";
  picturalUrl:any;
  sentPicutre:string = "false";
  profileImage:any
  adminId!:number;
  sameEmail:string = "false";
  teamEmail:string = "";
  disabledBtn:boolean = true;
  constructor(private api:ApiService) { }

  getTeam(){
    this.api.getOneTeam(localStorage.getItem("sessionEmail")).subscribe({
      next:data=>{
        let member = data.body;
        this.adminId  = member.admin_id;
        this.profileImage = member.profile;
        this.teamEmail= member.email;
        this.profileForm.patchValue({"name":member.name, "email":member.email, "id":`Member Id : ${member.admin_id}`, "role":`Role : Member`})
      },
      error: error=>{
        console.warn(error.message);
      }
    })
  }
  imageProcessing(event:any){
    this.picture = true;
    this.pictureFile = event.target.files[0];
    if(event.target.files.length > 0 ){
      this.picture = true;
      const reader = new FileReader();
      this.sentPicutre = "true";
      reader.onload = () => {
        this.picturalUrl= reader.result as string;
      }
      reader.readAsDataURL(this.pictureFile)
    }else {
      this.picture = false;
    }
  }
  profileForm = new FormGroup({
    "name":new FormControl("", [Validators.required]),
    "id":new FormControl("", [Validators.required]),
    "role":new FormControl("", [Validators.required]),
    "email":new FormControl("", [Validators.required, Validators.email]),
    "oldpassword":new FormControl("", [Validators.required]),
    "npassword":new FormControl("",),
    "cpassword":new FormControl("",),
    "profile":new FormControl(""),
  });

  get name(){
    return this.profileForm.get("name");
  }
  get email(){
    return this.profileForm.get("email");
  }  
  get password(){
    return this.profileForm.get("password");
  }
  get cpassword(){
    return this.profileForm.get("cpassword");
  }
  get profile(){
    return this.profileForm.get("profile");
  }

  message:string = "";
  updateProfile(){
    this.disabledBtn = false;
    const formData  = new FormData();
    var adminId = this.profileForm.value.id.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2');
    if(this.profileForm.value.email==localStorage.getItem("sessionEmail")){
       this.sameEmail = "true";
    }
    if(this.profileForm.value.npassword == this.profileForm.value.cpassword ) {
      formData.append("name", this.profileForm.value.name);
      formData.append("email", this.profileForm.value.email);
      formData.append("npassword", this.profileForm.value.npassword);
      formData.append("oldpassword", this.profileForm.value.oldpassword);
      formData.append("picture", this.pictureFile);
      formData.append("admin_id", adminId);
      formData.append("sameEmail", this.sameEmail);
      formData.append("sentPicture", this.sentPicutre);
      this.api.updateProfile(formData).subscribe({
        next:data=>{
          // console.warn(this.pictureFile);
          // console.warn(data);
          this.disabledBtn = true;
          if(data.status ==2){
            alert("Password is wrong");
          }else if(data.status==1){
            this.getTeam();
            localStorage.setItem("sessionEmail",this.profileForm.value.email);
            alert("Profile Updated");
          }else if(data.status==0){
            alert("server side occured");
          }else {
            alert("server side occured");
          }
        },
        error:error=>{
          this.message = error.message;
        }
      })
    }else {
      alert("Confirm entered password wrong");
    }
  }

  ngOnInit(): void {
    this.getTeam();
  }

}
