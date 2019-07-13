import { TestBed } from '@angular/core/testing';
import { BoredService } from './bored.service';


describe('BoredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoredService = TestBed.get(BoredService);
    expect(service).toBeTruthy();
  });
});
