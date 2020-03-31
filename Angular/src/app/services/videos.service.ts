import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Video } from '../models/video.model'; 
import * as firebase from 'firebase'; 
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class VideosService {

  videos: Video[] = []; 
  videosSubject = new Subject<Video[]>(); 

  constructor() {
    this.saveVideos(); 
   }

  emitVideos(){
    this.videosSubject.next(this.videos); 
  }

  saveVideos() {
    firebase.database().ref('/videos').set(this.videos); 
  }

  getVideos(){
    firebase.database().ref('/videos')
      .on('value', (data: DataSnapshot) => {
          this.videos = data.val() ? data.val() : [];
          this.emitVideos();  
        }
      );

  }

  getSingleVideo(id: number){
    
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/videos/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewVideo(newVideo: Video){
    this.videos.push(newVideo);
    this.saveVideos();
    this.emitVideos(); 
  }

  removeVideo(video: Video){
    if(video.image){
      const storageRef = firebase.storage().refFromURL(video.image);
      storageRef.delete().then(
        () => {
          console.log('Image supprimée!');
        },
        (error) => {
          console.log('Image non supprimée! : ' + error);
        }
      );
    }

    const videoIndexToRemove = this.videos.findIndex(
      (videoEl) => {
        if(videoEl === video) {
          return true;
        }
      }
    );
    this.videos.splice(videoIndexToRemove, 1);
    this.saveVideos();   
    this.emitVideos();     
    
  }

  uploadFile(file: File){
    
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );

  }
 
}
