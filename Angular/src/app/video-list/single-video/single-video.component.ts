import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {

  video: Video;

  constructor(private route: ActivatedRoute, private videosService: VideosService, 
              private router: Router) { }

  ngOnInit() {
    this.video = new Video('', '');
    const id = this.route.snapshot.params['id'];
    this.videosService.getSingleVideo(+id).then(
      (video: Video) => {
        this.video = video;
      }
    );
  }

  onBack(){
    this.router.navigate(['/videos']); 
  }

}
