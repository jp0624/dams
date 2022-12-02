import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//core
//elements
//forms
import { FormComponent } from './forms/form/form.component';
import { InputComponent } from './forms/input/input.component';
import { TextareaComponent } from './forms/textarea/textarea.component';
import { ButtonComponent } from './forms/button/button.component';
import { SelectComponent } from './forms/select/select.component';
import { OptgroupComponent } from './forms/optgroup/optgroup.component';
import { OptionComponent } from './forms/option/option.component';
import { LabelComponent } from './forms/label/label.component';

//links
import { AComponent } from './links/a/a.component';
import { NavComponent } from './links/nav/nav.component';

//lists
import { DdComponent } from './lists/dd/dd.component';
import { DlComponent } from './lists/dl/dl.component';
import { DtComponent } from './lists/dt/dt.component';
import { LiComponent } from './lists/li/li.component';
import { OlComponent } from './lists/ol/ol.component';
import { UlComponent } from './lists/ul/ul.component';

//semantics
import { SpanComponent } from './semantics/span/span.component';
import { IComponent } from './semantics/i/i.component';

//table
import { TableComponent } from './tables/table/table.component';
import { ColgroupComponent } from './tables/colgroup/colgroup.component';
import { ColComponent } from './tables/col/col.component';
import { TheadComponent } from './tables/thead/thead.component';
import { TbodyComponent } from './tables/tbody/tbody.component';
import { TrComponent } from './tables/tr/tr.component';
import { TdComponent } from './tables/td/td.component';
import { ThComponent } from './tables/th/th.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { CustomInputWithValidationComponent } from './forms/custom-input-with-validation/custom-input-with-validation.component';
import { InputRefDirective } from './forms/custom-input-with-validation/input-ref.directive';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    TableComponent,
    ColgroupComponent,
    ColComponent,
    TheadComponent,
    TbodyComponent,
    TrComponent,
    TdComponent,
    ThComponent,
    SpanComponent,
    AComponent,
    NavComponent,
    DdComponent,
    DlComponent,
    DtComponent,
    LiComponent,
    OlComponent,
    UlComponent,
    IComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    SelectComponent,
    OptgroupComponent,
    OptionComponent,
    LabelComponent,
    DeleteDialogComponent,
    CustomInputWithValidationComponent,
    InputRefDirective,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    ColgroupComponent,
    ColComponent,
    TheadComponent,
    TbodyComponent,
    TrComponent,
    TdComponent,
    ThComponent,
    SpanComponent,
    AComponent,
    NavComponent,
    DdComponent,
    DlComponent,
    DtComponent,
    LiComponent,
    OlComponent,
    UlComponent,
    IComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    SelectComponent,
    OptgroupComponent,
    OptionComponent,
    LabelComponent,
    DeleteDialogComponent,
    CustomInputWithValidationComponent,
    InputRefDirective,
    PaginationComponent
  ],
  entryComponents: [DeleteDialogComponent]
})
export class ElementsModule {

}
