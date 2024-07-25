import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SharedProfileService } from '../../services/shared-profile.service';

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.css'
})
export class OrganizerComponent implements OnInit {
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
  showCreateEventForm(){
    this.router.navigate(['create-event'],{relativeTo: this.route})
  }
  exit(){
    this.router.navigate(['login'])
  }
}
