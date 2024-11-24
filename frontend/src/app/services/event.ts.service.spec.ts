import { TestBed } from '@angular/core/testing';

import { EventTsService } from './event.ts.service';

describe('EventTsService', () => {
  let service: EventTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
