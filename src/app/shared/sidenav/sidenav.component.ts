import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private expandedMenus: { [key: string]: boolean } = {};

  toggleMenu(menu: string) {
    this.expandedMenus[menu] = !this.expandedMenus[menu];
  }

  isExpanded(menu: string): boolean {
    return !!this.expandedMenus[menu];
  }
}
