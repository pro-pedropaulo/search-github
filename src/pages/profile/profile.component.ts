import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SvgFollowersIconComponent } from '../../svg-components/svg-followers-icon/svg-followers-icon.component';
import { SvgTwitterIconComponent } from '../../svg-components/svg-twitter-icon/svg-twitter-icon.component';
import { SvgFollowingIconComponent } from '../../svg-components/svg-following-icon/svg-following-icon.component';
import { SvgLocationIconComponent } from '../../svg-components/svg-location-icon/svg-location-icon.component';
import { SvgEmailIconComponent } from '../../svg-components/svg-email-icon/svg-email-icon.component';
import { SvgBlogIconComponent } from '../../svg-components/svg-blog-icon/svg-blog-icon.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [GithubService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    SvgFollowersIconComponent,
    SvgTwitterIconComponent,
    SvgFollowingIconComponent,
    SvgLocationIconComponent,
    SvgEmailIconComponent,
    SvgBlogIconComponent,
  ],
})
export class ProfileComponent implements OnInit {
  user!: any;
  repos!: any[];
  currentPage: number = 1;
  reposPerPage: number = 5;
  searchQuery: string = '';
  userNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubService: GithubService,
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.searchQuery = username;
      this.fetchUserData(username);
    }
  }

  fetchUserData(username: string) {
    this.githubService.getUser(username).subscribe({
      next: (user: any) => {
        this.user = user;
        this.userNotFound = false;
      },
      error: () => {
        this.userNotFound = true;
        this.user = null;
        this.repos = [];
      },
    });

    this.githubService.getRepos(username).subscribe((repos: any[]) => {
      this.repos = repos.sort(
        (
          a: { stargazers_count: number; created_at: string },
          b: { stargazers_count: number; created_at: string },
        ) => {
          if (b.stargazers_count === a.stargazers_count) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }
          return b.stargazers_count - a.stargazers_count;
        },
      );
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  sortedRepos() {
    return this.repos.slice(
      (this.currentPage - 1) * this.reposPerPage,
      this.currentPage * this.reposPerPage,
    );
  }

  getDaysAgo(date: string): number {
    const updatedDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = Math.abs(
      currentDate.getTime() - updatedDate.getTime(),
    );
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }

  totalPages(): number {
    return Math.ceil(this.repos.length / this.reposPerPage);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  searchUser() {
    if (this.searchQuery) {
      this.fetchUserData(this.searchQuery);
    }
  }
}
