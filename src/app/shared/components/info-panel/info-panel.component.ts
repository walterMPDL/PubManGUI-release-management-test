import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MessagingComponent } from '..//messaging/messaging.component';

@Component({
  selector: 'pure-info-panel',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, MessagingComponent],
  templateUrl: './info-panel.component.html'
})
export class InfoPanelComponent { 
  isScrolled = false;

  message = {
    type: 'warning', 
    title: 'Page Not Found ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in vestibulum urna, sed tempus massa. Proin porta consectetur risus. Vestibulum eu lectus felis. Proin mollis id libero a tincidunt. Duis enim dolor, accumsan at sem sed, varius aliquet dolor. Maecenas tincidunt dolor in turpis blandit sagittis. Proin in quam auctor, efficitur odio nec, facilisis tortor. Duis at justo nunc. Maecenas in sem laoreet, tincidunt turpis vel, dignissim mi. Donec mattis urna imperdiet erat accumsan, nec pellentesque enim maximus. Donec sit amet sodales enim, vitae porta nibh. ',
    text: 'The page you are looking for was not found.'
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50 ? true : false;
  }
}
