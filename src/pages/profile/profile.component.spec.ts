import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ProfileComponent } from './profile.component';
import { GithubService } from '../../services/github.service';
import { SvgFollowersIconComponent } from '../../svg-components/svg-followers-icon/svg-followers-icon.component';
import { SvgTwitterIconComponent } from '../../svg-components/svg-twitter-icon/svg-twitter-icon.component';
import { SvgFollowingIconComponent } from '../../svg-components/svg-following-icon/svg-following-icon.component';
import { SvgLocationIconComponent } from '../../svg-components/svg-location-icon/svg-location-icon.component';
import { SvgEmailIconComponent } from '../../svg-components/svg-email-icon/svg-email-icon.component';
import { SvgBlogIconComponent } from '../../svg-components/svg-blog-icon/svg-blog-icon.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let githubService: GithubService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        ProfileComponent,
        MockComponent(SvgFollowersIconComponent),
        MockComponent(SvgTwitterIconComponent),
        MockComponent(SvgFollowingIconComponent),
        MockComponent(SvgLocationIconComponent),
        MockComponent(SvgEmailIconComponent),
        MockComponent(SvgBlogIconComponent),
      ],
      providers: [
        MockProvider(GithubService),
        MockProvider(Router),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'testuser',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data', () => {
    const userMock = { login: 'testuser' };
    const reposMock = [
      { stargazers_count: 5, created_at: '2024-05-20T00:00:00Z' },
      { stargazers_count: 10, created_at: '2024-05-19T00:00:00Z' },
    ];

    spyOn(githubService, 'getUser').and.returnValue(of(userMock));
    spyOn(githubService, 'getRepos').and.returnValue(of(reposMock));

    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.user).toEqual(userMock);
      expect(component.userNotFound).toBeFalse();
      expect(component.repos).toEqual(
        reposMock.sort((a, b) => {
          if (b.stargazers_count === a.stargazers_count) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }
          return b.stargazers_count - a.stargazers_count;
        }),
      );
    });
  });

  it('should handle user not found', () => {
    spyOn(githubService, 'getUser').and.returnValue(
      throwError(() => new Error('User not found')),
    );
    spyOn(githubService, 'getRepos').and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.user).toBeNull();
      expect(component.userNotFound).toBeTrue();
      expect(component.repos).toEqual([]);
    });
  });

  it('should navigate back', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should paginate repositories', () => {
    component.repos = Array.from({ length: 12 }, (_, i) => ({
      stargazers_count: i + 1,
      created_at: new Date().toISOString(),
    }));
    component.currentPage = 2;
    const paginatedRepos = component.sortedRepos();
    expect(paginatedRepos.length).toBe(5);
    expect(paginatedRepos[0].stargazers_count).toBe(6);
  });

  it('should calculate total pages correctly', () => {
    component.repos = Array.from({ length: 12 });
    expect(component.totalPages()).toBe(3);
  });

  it('should set the current page', () => {
    component.setPage(3);
    expect(component.currentPage).toBe(3);
  });

  it('should fetch user data on search', () => {
    const fetchUserDataSpy = spyOn(component, 'fetchUserData');
    component.searchQuery = 'newuser';
    component.searchUser();
    expect(fetchUserDataSpy).toHaveBeenCalledWith('newuser');
  });

  it('should calculate days ago correctly', () => {
    const currentDate = new Date('2024-05-24T00:00:00Z');
    jasmine.clock().mockDate(currentDate); // Mock the current date
    const daysAgo = component.getDaysAgo('2024-05-20T00:00:00Z');
    expect(daysAgo).toBe(4);
  });

  it('should update URL and fetch new user data on search', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const fetchUserDataSpy = spyOn(component, 'fetchUserData');
    component.searchQuery = 'newuser';
    component.searchUser();
    expect(navigateSpy).toHaveBeenCalledWith(['/profile', 'newuser'], {
      replaceUrl: true,
    });
    expect(fetchUserDataSpy).toHaveBeenCalledWith('newuser');
  });
});
