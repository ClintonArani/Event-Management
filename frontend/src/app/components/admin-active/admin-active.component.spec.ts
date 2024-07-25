import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActiveComponent } from './admin-active.component';

describe('AdminActiveComponent', () => {
  let component: AdminActiveComponent;
  let fixture: ComponentFixture<AdminActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
