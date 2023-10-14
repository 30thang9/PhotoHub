import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {

  isShow: boolean = false;
  constructor(private eventService: EventService) { }


  toggleMenuDropdown() {
    this.isShow = !this.isShow;
  }

  hideMenu() {
    this.eventService.emitEvent('hideMenuFromIconClose', false);
  }

}
