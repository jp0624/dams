import { Component, Inject, AfterViewChecked, OnInit, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";
import { DOCUMENT } from '@angular/common';
import {ElementRef} from '@angular/core';
import {ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Route } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { ModalService } from './modules/modal/modal.service';
import { MessagingService } from './modules/messaging/messaging.service';
import { LoginService } from './modules/login/login.service';
import { GlobalService } from './services/global.service';
import { ContextMenuService } from './core/shell/menus/context/contextmenu.service';
// import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
	providers: [
    ModalService,
    MessagingService,
    ContextMenuService
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
	title = 'POST Request';
	username: string;
	password: string;
	results = [];
  userService: any;
  users: any;
  keys: any;
  created: boolean = false;
  fontSize: any;
  wrapper: any;
  debug: boolean = false;
  cars1: Car[];
  public userFullName: string = '';
  public email: string = '';

	constructor(
    public router: Router,
    public modalService: ModalService,
    public messagingService: MessagingService,
    public loginService: LoginService,
    private elRef:ElementRef,
    private globalService: GlobalService,
    public contextmenuService: ContextMenuService
    // , public keycloak: KeycloakService
  ) {
    
  }
  
  ngOnChanges() {
  }
  
  ngAfterViewInit(){
    this.wrapper = this.elRef.nativeElement.querySelector('div.page-wrapper');

    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        //window.scrollTo(0, 0)
        if(this.wrapper){
          this.wrapper.scrollTop = 0;
        }
    });
  }
  
	ngOnInit() {
    /*
    this.globalService
      .getServerData()
      .subscribe((data) => {
        //console.error('SERVERS: ', data)

      this.globalService.apiurl = data.servers.admin_be;
      this.globalService.lfa_fe = data.servers.lfa_fe;
      this.globalService.assetsurl = data.servers.assets;
    });
    */

    // if (this.keycloak.isLoggedIn) {
    //   this.keycloak.loadUserProfile(true)
    //     .then((profile) => {
    //       this.userFullName = profile.firstName + ' ' + profile.lastName;
    //       this.email = profile.email;
    //     })
    //     .catch((err) => {
    //       alert('Failed to load user profile' + err);
    //     });
    // }
    
    var $body = $('body'); //Cache this for performance
    
    var setBodyScale = function() {
        var scaleSource = $body.width(),
            scaleFactor = 0.1,                     
            maxScale = 100,
            minScale = 60; //Tweak these values to taste

        var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

        if (fontSize > maxScale) fontSize = maxScale;
        if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

        $('body').css('font-size', fontSize + '%');
    }

    $(window).resize(function(){
        setBodyScale();
    });

    //Fire it when the page first loads:
    setBodyScale();
  }


}

export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}