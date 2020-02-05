import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUserListComponent } from './game-user-list.component';

describe('GameUserListComponent', () => {
  let component: GameUserListComponent;
  let fixture: ComponentFixture<GameUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
