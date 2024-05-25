import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'profile/:username', component: DummyComponent },
        ]),
        HomeComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to profile on search', async () => {
    component.username = 'testuser';
    component.searchUser();

    await fixture.whenStable();

    expect(location.path()).toBe('/profile/testuser');
  });

  it('should not navigate if username is empty', async () => {
    component.username = '';
    const navigateSpy = spyOn(router, 'navigate');

    component.searchUser();

    await fixture.whenStable();

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});

@Component({ template: '' })
class DummyComponent {}
