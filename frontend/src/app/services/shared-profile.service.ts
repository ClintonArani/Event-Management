import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedProfileService {
  private profileImageSource = new BehaviorSubject<string>('../assets/bill.jpg'); // initial default image path
  currentProfileImage = this.profileImageSource.asObservable();

  changeProfileImage(newImage: string) {
    this.profileImageSource.next(newImage);
  }
}