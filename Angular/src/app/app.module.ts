import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { VideoListComponent } from './video-list/video-list.component';
import { SingleVideoComponent } from './video-list/single-video/single-video.component';
import { VideoFormComponent } from './video-list/video-form/video-form.component';
import { HeaderComponent } from './header/header.component';
import { VideosService } from './services/videos.service';
import { AuthService } from './services/auth.service'; 
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'videos', canActivate: [AuthGuardService], component: VideoListComponent},
  { path: 'videos/new', canActivate: [AuthGuardService], component: VideoListComponent},
  { path: 'videos/view/:id', canActivate: [AuthGuardService], component: SingleVideoComponent},
  { path: '', redirectTo: 'videos', pathMatch: 'full'},
  { path: '**', redirectTo: 'videos'}
]; 

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VideoListComponent,
    SingleVideoComponent,
    VideoFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [AuthService, VideosService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
