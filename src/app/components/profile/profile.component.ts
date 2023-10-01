import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "@angular/fire/auth";
import {ImageUploadService} from "../../services/image-upload.service";
import {HotToastService} from "@ngneat/hot-toast";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  user$=this.authService.currentUser$
  constructor(private authService:AuthenticationService,private imageUploadService:ImageUploadService,
              private toast:HotToastService) {
  }

  uploadImage(event:any,user:User){
    this.imageUploadService.uploadImageToDatabase(event.target.files[0],`images/profile/${user.uid}`).pipe(
      this.toast.observe({
        loading:'Image is being uploaded...',
        success:'Image uploaded successfully',
        error:'There was an error uploading the image'
      }),concatMap((photoURL)=>this.authService.updateProfileData({photoURL}))
    ).subscribe();

  }


}
