

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// containers
import { LoginFormComponent }    from './components/login-form/login-form.component';
import { LoginWrapperComponent } from './containers/login-wrapper/login-wrapper.component';

// services
import { LoginService } from './login.service';

@NgModule({
    declarations: [
        //containers
        LoginFormComponent,
        LoginWrapperComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ElementsModule,
        ShellModule
    ],
    providers: [
        //services
        LoginService
    ],
    exports: [
      RouterModule,
      LoginWrapperComponent,
      LoginFormComponent
    ]
})

export class LoginModule { }