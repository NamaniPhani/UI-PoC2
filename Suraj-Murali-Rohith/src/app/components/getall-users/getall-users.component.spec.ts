import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallUsersComponent } from './getall-users.component';

describe('GetallUsersComponent', () => {
  let component: GetallUsersComponent;
  let fixture: ComponentFixture<GetallUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetallUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
