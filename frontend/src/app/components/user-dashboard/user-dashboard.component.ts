import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SharedProfileService } from '../../services/shared-profile.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  profileImage!: string;
  constructor(private router:Router, private route:ActivatedRoute, private sharedProfileService: SharedProfileService){}

  ngOnInit() {
    this.sharedProfileService.currentProfileImage.subscribe(image => {
      this.profileImage = image;
    });
  }
  showDashboard(){
    this.router.navigate(['dashboard'],{relativeTo: this.route})
  }
  showProfile(){
    this.router.navigate(['profile'],{relativeTo: this.route})
  }
  showBookings(){
    this.router.navigate(['bookings'],{relativeTo: this.route})
  }
  showHistory(){
    this.router.navigate(['history'],{relativeTo: this.route})
  }
  exit(){
    this.router.navigate(['login'])
  }
}
