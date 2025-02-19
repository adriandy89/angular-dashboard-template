import { Component } from '@angular/core';

@Component({
  selector: 'app-bg-animation',
  standalone: true,
  imports: [],
  template: `
    <ul class="backg bg-surface-50 dark:bg-surface-950 dark:bg-opacity-50">
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
      <li class="bg-primary bg-opacity-50"></li>
    </ul>
  `,
  styles: [
    `
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }

      .backg {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: -1;
      }
      .backg li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        animation: animate 19s linear infinite;
      }

      .backg li:nth-child(0) {
        left: 36%;
        width: 160px;
        height: 160px;
        bottom: -160px;
        animation-delay: 1s;
      }
      .backg li:nth-child(1) {
        left: 33%;
        width: 111px;
        height: 111px;
        bottom: -111px;
        animation-delay: 4s;
      }
      .backg li:nth-child(2) {
        left: 10%;
        width: 163px;
        height: 163px;
        bottom: -163px;
        animation-delay: 1s;
      }
      .backg li:nth-child(3) {
        left: 18%;
        width: 137px;
        height: 137px;
        bottom: -137px;
        animation-delay: 15s;
      }
      .backg li:nth-child(4) {
        left: 64%;
        width: 78px;
        height: 78px;
        bottom: -78px;
        animation-delay: 7s;
      }
      .backg li:nth-child(5) {
        left: 28%;
        width: 112px;
        height: 112px;
        bottom: -112px;
        animation-delay: 18s;
      }
      .backg li:nth-child(6) {
        left: 71%;
        width: 139px;
        height: 139px;
        bottom: -139px;
        animation-delay: 15s;
      }
      .backg li:nth-child(7) {
        left: 7%;
        width: 88px;
        height: 88px;
        bottom: -88px;
        animation-delay: 17s;
      }
      .backg li:nth-child(8) {
        left: 24%;
        width: 87px;
        height: 87px;
        bottom: -87px;
        animation-delay: 17s;
      }
      .backg li:nth-child(9) {
        left: 62%;
        width: 120px;
        height: 120px;
        bottom: -120px;
        animation-delay: 23s;
      }
      .backg li:nth-child(10) {
        left: 50%;
        width: 142px;
        height: 142px;
        bottom: -142px;
        animation-delay: 36s;
      }
      .backg li:nth-child(11) {
        left: 68%;
        width: 133px;
        height: 133px;
        bottom: -133px;
        animation-delay: 49s;
      }
    `,
  ],
})
export class AppBgAnimation {}
