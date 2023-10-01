import { Injectable } from '@angular/core';
import {from, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage:Storage) { }
  uploadImageToDatabase(image:File,path:string):Observable<string>{
    const storageRef=ref(this.storage,path);
    const uploadTask=from(uploadBytes(storageRef,image));
    return uploadTask.pipe(
      switchMap((result)=>getDownloadURL(result.ref))
    )
  }
}
