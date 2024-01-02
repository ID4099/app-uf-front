import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfConverterComponent } from './uf-converter.component';

describe('UfConverterComponent', () => {
  let component: UfConverterComponent;
  let fixture: ComponentFixture<UfConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfConverterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
