import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';
import { TestModule } from '../../shared/test.module';
import { L10nLoader } from 'angular-l10n';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;
  let l10nLoader: L10nLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ IconButtonComponent ]
    })
    .compileComponents();
    l10nLoader = TestBed.get(L10nLoader);
    l10nLoader.load();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    component.iconUrl = 'assets/images/icons/train-re-gen.svg';
    component.content = 'train_re_gen_text';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onClick should work', () => {
    component.onclick.subscribe((selectedEvent) => expect(selectedEvent).toBe('Button Clicked!'));
    component.onClick('Button Clicked!');
  });
});
