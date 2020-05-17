import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecuperadosPage } from './recuperados.page';

describe('RecuperadosPage', () => {
  let component: RecuperadosPage;
  let fixture: ComponentFixture<RecuperadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
