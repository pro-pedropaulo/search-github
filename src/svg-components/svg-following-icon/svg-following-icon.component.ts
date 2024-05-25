import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-following-icon',
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5091 5.97423L12 6.49115L11.4908 5.97415C10.5625 5.0311 9.29461 4.50003 7.97132 4.50003C6.64804 4.50003 5.38012 5.0311 4.45182 5.97415V5.97415C2.51606 7.9634 2.51606 11.1323 4.45182 13.1215L9.84447 18.5972C10.413 19.1747 11.1896 19.5 12 19.5C12.8105 19.5 13.587 19.1747 14.1556 18.5972L19.5482 13.1216C21.4839 11.1324 21.4839 7.9635 19.5482 5.97424V5.97424C18.6199 5.03115 17.3519 4.50007 16.0286 4.50007C14.7053 4.50007 13.4374 5.03114 12.5091 5.97423Z"
        stroke="#4A5568"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  styles: [``],
})
export class SvgFollowingIconComponent {}
