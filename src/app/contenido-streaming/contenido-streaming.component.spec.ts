import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoStreamingComponent } from './contenido-streaming.component';

describe('ContenidoStreamingComponent', () => {
  let component: ContenidoStreamingComponent;
  let fixture: ComponentFixture<ContenidoStreamingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenidoStreamingComponent]
    });
    fixture = TestBed.createComponent(ContenidoStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
