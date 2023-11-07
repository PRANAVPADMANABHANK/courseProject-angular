import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodbyeComponent } from './goodbye.component';

describe('GoodbyeComponent', () => {
  let component: GoodbyeComponent;
  let fixture: ComponentFixture<GoodbyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodbyeComponent]
    });
    fixture = TestBed.createComponent(GoodbyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
