import { Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) { }

  initialize() {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Your navigation logic here
        if (event.id === 1) {
          // Initial navigation (first page load)
          console.log('Initial Navigation');
        } else if (event.url === event.urlAfterRedirects) {
          // Forward navigation
          console.log('Forward Navigation');
        } else {
          // Back navigation
          console.log('Back Navigation');
        }
      });
  }
}
