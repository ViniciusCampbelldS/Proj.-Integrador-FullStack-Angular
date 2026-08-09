import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbreTurmaTreinamento } from './AbreTurmaTreinamento';

describe('AbreTurmaTreinamento', () => {
  let component: AbreTurmaTreinamento;
  let fixture: ComponentFixture<AbreTurmaTreinamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbreTurmaTreinamento],
    }).compileComponents();

    fixture = TestBed.createComponent(AbreTurmaTreinamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
