import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-blog-icon',
  standalone: true,
  template: `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0147 18.0147L11.4853 19.5442C9.54415 21.4853 6.39697 21.4853 4.45584 19.5442V19.5442C2.51472 17.603 2.51472 14.4559 4.45584 12.5147L6.44975 10.5208C7.38743 9.58315 8.6592 9.05637 9.98529 9.05637C11.3114 9.05637 12.5831 9.58315 13.5208 10.5208"
        stroke="#4A5568"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.9852 5.98528L12.5147 4.45584C14.4558 2.51472 17.603 2.51472 19.5441 4.45584V4.45584C21.4852 6.39697 21.4852 9.54415 19.5441 11.4853L17.5502 13.4792C15.5976 15.4318 12.4317 15.4318 10.4791 13.4792"
        stroke="#4A5568"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  styles: [``],
})
export class SvgBlogIconComponent {}
