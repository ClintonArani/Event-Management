import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// loadHistory(): void {
//   this.eventService.getHistory().subscribe((history) => {
//     this.historyEvents = history;
//     this.filterHistory();
//   });
// }
// filterHistory(): void {
//   const query = this.searchQuery.toLowerCase();
//   this.filteredHistoryEvents = this.historyEvents.filter(event =>
//     event.date.toLowerCase().includes(query) ||
//     event.time.toLowerCase().includes(query) ||
//     event.location.toLowerCase().includes(query) ||
//     event.description.toLowerCase().includes(query)
//   );
// }

// onSearchQueryChange(): void {
//   this.filterHistory();
//}