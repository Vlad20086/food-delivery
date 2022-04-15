import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-webcontent',
  templateUrl: './webcontent.component.html',
  styleUrls: ['./webcontent.component.css']
})
export class WebcontentComponent implements OnInit {

  constructor(private api:ApiService, private datePipe:DatePipe) { }

  theme1:boolean = false;
  theme1File:any ="";
  theme1lUrl:any;
  sentTheme1:string = "false";

  theme2:boolean = false;
  theme2File:any ="";
  theme2lUrl:any;
  sentTheme2:string = "false";

  theme3:boolean = false;
  theme3File:any ="";
  theme3lUrl:any;
  sentTheme3:string = "false";

  imageProcessing1(event:any){
    this.theme1 = true;
    this.theme1File = event.target.files[0];
    if(event.target.files.length > 0 ){
      this.theme1 = true;
      const reader = new FileReader();
      this.sentTheme1 = "true";
      reader.onload = () => {
        this.theme1lUrl= reader.result as string;
      }
      reader.readAsDataURL(this.theme1File)
    }else {
      this.theme1 = false;
    }
  }

  imageProcessing2(event:any){
    this.theme2 = true;
    this.theme2File = event.target.files[0];
    if(event.target.files.length > 0 ){
      this.theme2 = true;
      const reader = new FileReader();
      this.sentTheme2 = "true";
      reader.onload = () => {
        this.theme2lUrl= reader.result as string;
      }
      reader.readAsDataURL(this.theme2File)
    }else {
      this.theme2 = false;
    }
  }

  imageProcessing3(event:any){
    this.theme3 = true;
    this.theme3File = event.target.files[0];
    if(event.target.files.length > 0 ){
      this.theme3 = true;
      const reader = new FileReader();
      this.sentTheme3 = "true";
      reader.onload = () => {
        this.theme3lUrl= reader.result as string;
      }
      reader.readAsDataURL(this.theme3File)
    }else {
      this.theme3 = false;
    }
  }

  webContentForm = new FormGroup({
    "websitename": new FormControl("", [Validators.required]),
    "homeheading": new FormControl("", [Validators.required]),
    "homebuttontext": new FormControl("", [Validators.required]),
    "aboutheading": new FormControl("", [Validators.required]),
    "aboutdescription": new FormControl("", [Validators.required]),

    "navbarhome": new FormControl("", [Validators.required]),
    "navbarmenu": new FormControl("", [Validators.required]),
    "navbartrackorder": new FormControl("", [Validators.required]),
    "navbarabout": new FormControl("", [Validators.required]),
    "navbarcontact": new FormControl("", [Validators.required]),

    "linkfacebook": new FormControl("", [Validators.required]),
    "linkyoutube": new FormControl("", [Validators.required]),
    "linkwhatsapp": new FormControl("", [Validators.required]),
    "linkemail": new FormControl("", [Validators.required]),
    "lastupdatedate": new FormControl("", [Validators.required]),
    "homeheadingtheme1": new FormControl("1", [Validators.required]),
    "homeheadingtheme2": new FormControl("1", [Validators.required]),
    "homeheadingtheme3": new FormControl("1", [Validators.required]),

  })
  formmWebContent = new FormData();
  updateConents(){
    // let linkwhatsapp = `https://wa.me/${this.webContentForm.value.linkwhatsapp}`;
    // let linkemail = `mailto:${this.webContentForm.value.linkemail}?subject = ${this.webContentForm.value.websitename}&body = Hello Dear, How can i help You ?`; 

    this.formmWebContent.append("website_name",this.webContentForm.value.websitename),
    this.formmWebContent.append("home_heading",this.webContentForm.value.homeheading),
    this.formmWebContent.append("home_center_button",this.webContentForm.value.homebuttontext),
    this.formmWebContent.append("about_heading",this.webContentForm.value.aboutheading),
    this.formmWebContent.append("about_description",this.webContentForm.value.aboutdescription),

    this.formmWebContent.append("navbar_home",this.webContentForm.value.navbarhome),
    this.formmWebContent.append("navbar_menu",this.webContentForm.value.navbarmenu),
    this.formmWebContent.append("navbar_contact",this.webContentForm.value.navbarcontact),
    this.formmWebContent.append("navbar_about",this.webContentForm.value.navbarabout),
    this.formmWebContent.append("navbar_status",this.webContentForm.value.navbartrackorder),

    this.formmWebContent.append("link_email",this.webContentForm.value.linkemail),
    this.formmWebContent.append("link_whatsapp",this.webContentForm.value.linkwhatsapp),
    this.formmWebContent.append("link_youtube",this.webContentForm.value.linkyoutube),
    this.formmWebContent.append("link_facebook",this.webContentForm.value.linkfacebook),
    this.formmWebContent.append("theme1",this.sentTheme1),
    this.formmWebContent.append("theme2",this.sentTheme2),
    this.formmWebContent.append("theme3",this.sentTheme3),
    this.formmWebContent.append("home_heading_theme1",this.theme1File),
    this.formmWebContent.append("home_heading_theme2",this.theme2File),
    this.formmWebContent.append("home_heading_theme3",this.theme3File),
    this.api.updateWebConent(this.formmWebContent).subscribe({
      next:data=>{
        console.warn(data);
      },
      error:error=>{
        console.warn(error.message);
      }
    })
  }
  getTheme1!:any;
  getTheme2!:any;
  getTheme3!:any;
  getWebContent(){
    this.api.getWebContent().subscribe({
      next:data=>{
        this.getTheme1 = data.body.home_heading_theme1;
        this.getTheme2 = data.body.home_heading_theme2;
        this.getTheme3 = data.body.home_heading_theme3;
        console.log(data.body);
        this.webContentForm.patchValue({
          "websitename":data.body.website_name,
          "homeheading":data.body.home_heading,
          "homebuttontext":data.body.home_center_button,
          "aboutheading":data.body.about_heading,
          "aboutdescription":data.body.about_description,

          "navbarhome":data.body.navbar_home,
          "navbarmenu":data.body.navbar_menu,
          "navbartrackorder":data.body.navbar_status,
          "navbarabout":data.body.navbar_about,
          "navbarcontact":data.body.navbar_contact,

          "linkfacebook":data.body.facebook_link,
          "linkyoutube":data.body.youtube_link,
          "linkwhatsapp":data.body.whatsapp_link,
          "linkemail":data.body.email_link,
          "lastupdatedate":this.datePipe.transform(data.body.timestamp,'yyyy-MM-dd')
        })
      },
      error:error=>{
        console.warn(error.message);
      }
    })
  }

  ngOnInit(): void {
    this.getWebContent();
  }

}
