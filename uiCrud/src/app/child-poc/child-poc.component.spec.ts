import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPOCComponent } from './child-poc.component';

describe('ChildPOCComponent', () => {
  let component: ChildPOCComponent;
  let fixture: ComponentFixture<ChildPOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildPOCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildPOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
