import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    this.initializeSidebar();
  }

  initializeSidebar() {
    jQuery("#sidebarToggle, #sidebarToggleTop").on("click", () => {
      jQuery("body").toggleClass("sidebar-toggled");
      jQuery(".sidebar").toggleClass("toggled");
      if (jQuery(".sidebar").hasClass("toggled")) {
        jQuery('.sidebar .collapse').collapse('hide');
      }
    });
  
    jQuery(window).resize(() => {
      if (jQuery(window).width() < 768) {
        jQuery('.sidebar .collapse').collapse('hide');
      }
      if (jQuery(window).width() < 480 && !jQuery(".sidebar").hasClass("toggled")) {
        jQuery("body").addClass("sidebar-toggled");
        jQuery(".sidebar").addClass("toggled");
        jQuery('.sidebar .collapse').collapse('hide');
      }
    });
  
    jQuery("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", (e: any) => {
      if (jQuery(window).width() > 768) {
        const e0 = e.originalEvent;
        const delta = e0.wheelDelta || -e0.detail;
        document.documentElement.scrollTop += (delta < 0 ? 1 : -1) * 30;
        document.body.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  
    jQuery(document).on("scroll", () => {
      const scrollDistance = jQuery(this).scrollTop();
      if (scrollDistance > 100) {
        jQuery('.scroll-to-top').fadeIn();
      } else {
        jQuery('.scroll-to-top').fadeOut();
      }
    });
  
    jQuery(document).on("click", "a.scroll-to-top", (e: any) => {
      const $anchor = jQuery(e.target);
      jQuery('html, body').stop().animate({
        scrollTop: (jQuery($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      e.preventDefault();
    });
  }

}
