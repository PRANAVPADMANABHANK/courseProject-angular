import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesComponent } from './examples.component';

describe('ExamplesComponent', () => {
  let component: ExamplesComponent;
  let fixture: ComponentFixture<ExamplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesComponent]
    });
    fixture = TestBed.createComponent(ExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
