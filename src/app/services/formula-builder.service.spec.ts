import { TestBed } from '@angular/core/testing';

import { FormulaBuilderService } from './formula-builder.service';

describe('FormulaBuilderService', () => {
  let service: FormulaBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
