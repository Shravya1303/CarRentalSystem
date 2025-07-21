import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcarComponent } from './admin-addcar.component';

describe('AdminAddcarComponent', () => {
  let component: AdminAddcarComponent;
  let fixture: ComponentFixture<AdminAddcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddcarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
