import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrgenPageComponent } from './qrgen-page.component';

describe('QrgenPageComponent', () => {
  let component: QrgenPageComponent;
  let fixture: ComponentFixture<QrgenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrgenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrgenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
