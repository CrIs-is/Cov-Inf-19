import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MuertesPage } from './muertes.page';

describe('MuertesPage', () => {
  let component: MuertesPage;
  let fixture: ComponentFixture<MuertesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuertesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MuertesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
