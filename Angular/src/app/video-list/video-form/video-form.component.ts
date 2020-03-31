import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../models/video.model';
import { VideosService } from '../../services/videos.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {

  videoForm: FormGroup; 
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false; 

  constructor(private formBuilder: FormBuilder, private videosService: VideosService, 
              private router: Router) { }

  ngOnInit() {
    this.initForm(); 
  }

  initForm(){
    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });

  }

  onSaveVideo(){
    const title = this.videoForm.get('title').value;
    const author = this.videoForm.get('author').value;
    const synopsis = this.videoForm.get('synopsis').value;
    const newVideo = new Video(title, author);
    newVideo.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== ''){
      newVideo.image = this.fileUrl;
    }
    this.videosService.createNewVideo(newVideo);
    this.router.navigate(['/videos']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.videosService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]); 
  }

}
