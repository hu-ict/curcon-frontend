import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'breadcrumbs',
  template: `
  <template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item" *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/' || breadcrumb.label.title&&last" [ngClass]="{active: last}">
      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
    </li>
  </template>
  `
})
export class BreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    // routing met filter doe je anders in ng6 [0]
    this.router.events.pipe(

    filter(event => event instanceof NavigationEnd)
  ).subscribe(event => {
    this.breadcrumbs = [];
    let currentRoute = this.route.root,
    url = '';
    do {
      let childrenRoutes = currentRoute.children;
      currentRoute = null;
      childrenRoutes.forEach(route => {
        if (route.outlet === 'primary') {
          let routeSnapshot = route.snapshot;
          url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
          this.breadcrumbs.push({
            label: route.snapshot.data,
            url: url
          });
          currentRoute = route;
        }
      });
    } while (currentRoute);
  });
  }
}

// [0]: https://stackoverflow.com/questions/50353164/angular-6-router-events-filter-filter-does-not-exist-on-type-observableevent
