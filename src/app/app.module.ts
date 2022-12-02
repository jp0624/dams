import { BrowserModule }      from '@angular/platform-browser';
import { NgModule,
         CUSTOM_ELEMENTS_SCHEMA,
         ApplicationRef,
         AfterViewChecked,
         APP_INITIALIZER }   from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { HttpClientModule }        from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//routing
import { AppRoutes }                 from './app.routing';
import { RouterModule,
         Resolve,
         ActivatedRouteSnapshot,
         Routes }    from '@angular/router';


import 'rxjs/Observable';

//bootstrap
import { AppComponent }    from './app.component';

//directives
import { ContenteditableModel }    from './directives/contenteditable.directive';

//modules
import { CountryModule }    from './modules/country/country.module';
import { LanguageModule }   from './modules/language/language.module';
import { UserModule }       from './modules/user/user.module';
import { CourseModule }     from './modules/course/course.module';
import { LessonModule }     from './modules/lesson/lesson.module';
import { TaskModule }       from './modules/task/task.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { StatusModule }     from './modules/status/status.module';
import { VehicleModule }    from './modules/vehicle/vehicle.module';
import { TranslationModule }  from './modules/translation/translation.module';
import { LocalizationModule } from './modules/localization/localization.module';
import { ModalModule }      from './modules/modal/modal.module';
import { MediaModule }      from './modules/media/media.module';
import { MessagingModule }  from './modules/messaging/messaging.module';
import { LoginModule }      from './modules/login/login.module';
import { AlertModule } from './modules/alert/alert.module';

import { ElementsModule }   from './core/elements/elements.module';
import { ShellModule }      from './core/shell/shell.module';

//services
import { GlobalService }    from './services/global.service';
import { WindowRef }        from './services/window.service';

import { Animations }       from './lib/animations';

//core
import { HomeComponent }    from './modules/home/home.component';

//material
import {MaterialModule} from './material/material.module';
//shell
  
import { DataTablesModule } from 'angular-datatables';
    //forms
// import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
// import { initializer } from './utils/app-init';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';
import { ArraySortPipe } from './pipes/sort.pipe';
import { OrderBy } from './pipes/sorttable.pipe';
import { DataTableModule } from 'primeng/datatable';
import { fakeBackendProvider } from './services/fakebackend.service';
import { fakeBackendPostProvider } from './services/fakebackendPost.service';

import { VersionModule } from './modules/version/version.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContenteditableModel,
    CapitalizePipe,
    OrderByPipe,
    ArraySortPipe,
    OrderBy
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    //RouterModule.forRoot(AppRoutes, { enableTracing: true }),
    ReactiveFormsModule,
    //modules
    ElementsModule,
    CountryModule,
    LanguageModule,
    UserModule,
    CourseModule,
    CourseModule,
    LessonModule,
    TaskModule,
    DictionaryModule,
    StatusModule,
    VehicleModule,
    TranslationModule,
    LocalizationModule,
    ModalModule,
    MediaModule,
    MessagingModule,
    LoginModule,
    ShellModule,
    MaterialModule,
    DataTablesModule,
    AlertModule,
    // KeycloakAngularModule,
    DataTableModule,
    VersionModule
  ],
  schemas: [
    //CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [    
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializer,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
    GlobalService, 
    Animations,
    WindowRef
  ],
  exports: [
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
