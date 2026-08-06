import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiFilter } from './epi-filter';

describe('EpiFilter', () => {
  let component: EpiFilter;
  let fixture: ComponentFixture<EpiFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpiFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(EpiFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
