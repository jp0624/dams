import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSearchComponent } from './lesson-search.component';

describe('LessonSearchComponent', () => {
  let component: LessonSearchComponent;
  let fixture: ComponentFixture<LessonSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
