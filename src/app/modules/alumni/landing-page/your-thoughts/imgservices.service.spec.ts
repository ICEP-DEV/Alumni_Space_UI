import { TestBed } from '@angular/core/testing';

import { ImgservicesService } from './imgservices.service';

describe('ImgservicesService', () => {
  let service: ImgservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
