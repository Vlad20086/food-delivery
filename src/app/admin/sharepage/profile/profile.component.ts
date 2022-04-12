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
  pictureFile:any;
  picturalUrl:any; 

  adminId!:number;
  sameEmail:string = "false";
  constructor(private api:ApiService) { }

  getTeam(){
    this.api.getOneTeam(localStorage.getItem("sessionEmail")).subscribe({
      next:data=>{
        let member = data.body;
        this.adminId  = member.admin_id;
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
      formData.append("profile", this.pictureFile);
      formData.append("admin_id", adminId);
      formData.append("sameEmail", this.sameEmail);
      this.api.updateProfile(formData).subscribe({
        next:data=>{
          console.warn(data);
          // this.profileForm.reset();
          // this.message = "Profile has been updated";
          alert("Profile Updated");
          setTimeout(()=>{
            this.message = "";
          },4000)
        },
        error:error=>{
          this.message = error.message;
          setTimeout(()=>{
            this.message = "";
          },4000)
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
