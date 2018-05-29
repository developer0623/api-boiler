import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainRatingComponent } from './train-rating.component';
import { TestModule } from '../../shared/test.module';
import { L10nLoader } from 'angular-l10n';

describe('TrainRatingComponent', () => {
  let component: TrainRatingComponent;
  let fixture: ComponentFixture<TrainRatingComponent>;
  let l10nLoader: L10nLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ TrainRatingComponent ]
    })
    .compileComponents();
    l10nLoader = TestBed.get(L10nLoader);
    l10nLoader.load();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainRatingComponent);
    component = fixture.componentInstance;
    component.rate = 4.67;
    component.state = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
