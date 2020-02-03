import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaRoomComponent } from './trivia-room.component';

describe('TriviaRoomComponent', () => {
  let component: TriviaRoomComponent;
  let fixture: ComponentFixture<TriviaRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
