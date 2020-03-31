import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideosService } from '../services/videos.service'; 
import { Video } from '../models/video.model';
import { Subscription } from 'rxjs/Subscription'; 
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnDestroy {

  videos: Video[];
  videosSubscription: Subscription; 

  constructor(private videosService: VideosService, private router: Router) {}

  ngOnInit() {
    this.videosSubscription = this.videosService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
    this.videosService.emitVideos();
  }

  onNewVideo(){
    this.router.navigate(['/videos','new']); 
  }

  onDeleteVideo(video: Video){
    this.videosService.removeVideo(video);
  }

  onViewVideo(id: number){
    this.router.navigate(['/videos', 'view', id]); 
  }

  ngOnDestroy(){
    this.videosSubscription.unsubscribe(); 
  }

}
