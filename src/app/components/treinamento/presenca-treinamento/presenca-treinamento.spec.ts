import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresençaTreinamento } from './presenca-treinamento';

describe('PresençaTreinamento', () => {
  let component: PresençaTreinamento;
  let fixture: ComponentFixture<PresençaTreinamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresençaTreinamento],
    }).compileComponents();

    fixture = TestBed.createComponent(PresençaTreinamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
