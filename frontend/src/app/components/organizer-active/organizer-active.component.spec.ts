import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerActiveComponent } from './organizer-active.component';

describe('OrganizerActiveComponent', () => {
  let component: OrganizerActiveComponent;
  let fixture: ComponentFixture<OrganizerActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
