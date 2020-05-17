import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CasosPage } from './casos.page';

describe('CasosPage', () => {
  let component: CasosPage;
  let fixture: ComponentFixture<CasosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CasosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
