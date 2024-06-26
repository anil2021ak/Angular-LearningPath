import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCardsComponent } from './skill-cards.component';

describe('SkillCardsComponent', () => {
  let component: SkillCardsComponent;
  let fixture: ComponentFixture<SkillCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
