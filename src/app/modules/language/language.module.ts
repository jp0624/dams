import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// containers
import { LanguageDashboardComponent } from './containers/language-dashboard/language-dashboard.component';

// components
import { LanguageListComponent } from './components/language-list/language-list.component';
import { LanguageMultiselectListComponent } from './components/language-multiselect-list/language-multiselect-list.component';
import { LanguageDetailComponent } from './components/language-detail/language-detail.component';

// services
import { LanguageService } from './language.service';
import { LanguageHomeComponent } from './components/language-home/language-home.component';
import { LanguageDetailFormComponent } from './components/language-detail/language-detail-form/language-detail-form.component';
import { DataTableModule } from 'primeng/datatable';

const languageRoutes: Routes = [
    {
        path: 'language',
        component: LanguageDashboardComponent,
            children: [
                {
                    path: '',
                    component: LanguageHomeComponent
                },
                {
                    path: 'list',
                    component: LanguageListComponent
                },
                {
                    path: ':id',
                    component: LanguageDetailComponent
                },
                {
                    path: 'create',
                    component: LanguageDetailComponent
                }
            ]
    }
]

@NgModule({
    declarations: [
        //containers
        LanguageDashboardComponent,

        //components
        LanguageListComponent,
        LanguageDetailComponent,
        LanguageHomeComponent,
        LanguageDetailFormComponent,
        LanguageMultiselectListComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(languageRoutes),
        ReactiveFormsModule,
        ElementsModule,
        ShellModule,
        DataTableModule
    ],
    providers: [
        //services
        LanguageService
    ],
    exports: [
      RouterModule,
      LanguageListComponent,
      LanguageMultiselectListComponent
    ]
})
export class LanguageModule {

}