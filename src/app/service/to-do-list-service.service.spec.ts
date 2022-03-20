import { TestBed } from '@angular/core/testing';

import { ToDoListServiceService } from './to-do-list-service.service';

describe('ToDoListServiceService', () => {
  let service: ToDoListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
