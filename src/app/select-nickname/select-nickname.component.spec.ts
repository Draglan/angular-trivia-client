import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNicknameComponent } from './select-nickname.component';

describe('SelectNicknameComponent', () => {
  let component: SelectNicknameComponent;
  let fixture: ComponentFixture<SelectNicknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectNicknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
