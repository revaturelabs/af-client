import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResolveComponent } from './admin-resolve.component';

describe('AdminResolveComponent', () => {
  let component: AdminResolveComponent;
  let fixture: ComponentFixture<AdminResolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
