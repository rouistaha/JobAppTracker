import { Component } from '@angular/core';

@Component({
  selector: 'custom-side-bar',
  standalone: false,
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
