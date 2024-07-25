import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SharedProfileService } from '../../services/shared-profile.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
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
  showUsers(){
    this.router.navigate(['users'],{relativeTo: this.route})
  }
  exit(){
    this.router.navigate(['login'])
  }
}
