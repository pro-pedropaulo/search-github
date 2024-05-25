import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve user data from API', () => {
    const dummyUser = { login: 'testuser', id: 1 };

    service.getUser('testuser').subscribe((user) => {
      expect(user.login).toBe('testuser');
    });

    const request = httpMock.expectOne('https://api.github.com/users/testuser');
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
