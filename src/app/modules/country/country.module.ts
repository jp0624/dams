import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// containers
import { CountryDashboardComponent } from './containers/country-dashboard/country-dashboard.component';

// components
import { CountryListComponent }         from './components/country-list/country-list.component';
import { CountryDetailComponent }       from './components/country-detail/country-detail.component';
import { CountryAttributeComponent }    from './components/country-attribute/country-attribute.component';
import { AttributeGroupComponent }      from './components/country-attribute/attribute-group/attribute-group.component';
import { AttributeTypeComponent }       from './components/country-attribute/attribute-type/attribute-type.component';
import { TypeOptionComponent }          from './components/country-attribute/attribute-type/type-option/type-option.component';
import { DataTableModule } from 'primeng/datatable';

// services
import { CountryService } from './country.service';
import { CountryHomeComponent } from './components/country-home/country-home.component';
import { CountryDetailFormComponent } from './components/country-detail/country-detail-form/country-detail-form.component';
import { LanguageListComponent } from './components/language-list/language-list.component';
const countryRoutes: Routes = [
    {
        path: 'country',
        component: CountryDashboardComponent,
            children: [
                {
                    path: '',
                    component: CountryHomeComponent
                },
                {
                    path: 'list',
                    component: CountryListComponent
                },
                {
                    path: ':id',
                    component: CountryDetailComponent
                },
                {
                    path: 'create',
                    component: CountryDetailComponent
                }
        ]
    }
]

@NgModule({
    declarations: [
        //containers
        CountryDashboardComponent,
        //components
        CountryListComponent,
        CountryDetailComponent,
        CountryAttributeComponent,
        AttributeGroupComponent,
        AttributeTypeComponent,
        TypeOptionComponent,
        CountryHomeComponent,
        CountryDetailFormComponent,
        LanguageListComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(countryRoutes),
        ReactiveFormsModule,
        ElementsModule,
        ShellModule,
        DataTableModule
    ],
    providers: [
        //services
        CountryService
    ],
    exports: [
      RouterModule
    ]
})
export class CountryModule {

}