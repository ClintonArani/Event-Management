import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeDashboardComponent } from './attendee-dashboard.component';

describe('AttendeeDashboardComponent', () => {
  let component: AttendeeDashboardComponent;
  let fixture: ComponentFixture<AttendeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



// <div class="calendar-card">
//         <p id="title">Book Apointment</p>
//         <form [formGroup]="appointmentForm" (ngSubmit)="scheduleMeeting()">
//           <div class="form-group">
//             <label for="appointmentTime">Meeting Time </label>
//             <input type="datetime-local" id="appointmentTime" formControlName="appointmentTime" />
//           </div>
//           <div class="form-group">
//             <label for="email">Email </label>
//             <input type="email" id="email" class="form-control" formControlName="email" />
//           </div>
//           <br />
//           <button type="submit" id="schedule-button">Schedule Appointment</button>
//         </form>
//       </div>
  


