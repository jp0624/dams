import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ElementsModule }  from '../../core/elements/elements.module';
import { ShellModule }  from '../../core/shell/shell.module';

// containers
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { GroupDashboardComponent } from './containers/group-dashboard/group-dashboard.component';

// components
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { DataTableModule } from 'primeng/datatable';

// services
import { UserService } from './user.service';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserDetailFormComponent } from './components/user-detail/user-detail-form/user-detail-form.component';
import { GroupDetailFormComponent } from './components/group-detail/group-detail-form/group-detail-form.component';

const userRoutes: Routes = [
    {
        path: 'user',
        component: UserDashboardComponent,
            children: [
                {
                    path: '',
                    component: UserHomeComponent
                },
                {
                    path: 'list',
                    component: UserListComponent
                },
                {
                    path: ':id',
                    component: UserDetailComponent
                },
                {
                    path: 'create',
                    component: UserDetailComponent
                }
            ]
    },
    {   path: 'group',
        component: UserDashboardComponent,
            children: [
                {
                    path: '',
                    component: UserHomeComponent
                },
                {
                    path: 'list',
                    component: GroupListComponent
                },
                {
                    path: ':id',
                    component: GroupDetailComponent
                },
                {
                    path: 'create',
                    component: GroupDetailComponent
                }
            ]
    }
]

@NgModule({
    declarations: [
        //containers
        UserDashboardComponent,
        GroupDashboardComponent,

        //components
        UserListComponent,
        UserDetailComponent,
        GroupListComponent,
        GroupDetailComponent,
        UserHomeComponent,
        UserDetailFormComponent,
        GroupDetailFormComponent

    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(userRoutes),
        ReactiveFormsModule,
        ElementsModule,
        ShellModule,
        DataTableModule
    ],
    providers: [
        //services
        UserService
    ],
    exports: [
      RouterModule
    ]
})
export class UserModule {

}