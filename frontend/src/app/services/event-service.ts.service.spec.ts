import { TestBed } from '@angular/core/testing';

import { EventServiceTsService } from './event-service.ts.service';

describe('EventServiceTsService', () => {
  let service: EventServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
