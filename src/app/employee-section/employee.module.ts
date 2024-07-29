import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralDetailsComponent } from './general-details/general-details.component';
import { CalendarModule } from 'primeng/calendar';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { BankPfEsiComponent } from './bank-pf-esi/bank-pf-esi.component';
import { ContactAddressComponent } from './contact-address/contact-address.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import { ExperienceEducationComponent } from './experience-education/experience-education.component';
import { AssetsDocsComponent } from './assets-docs/assets-docs.component';
import { SalaryComponent } from './salary/salary.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfirmationDetailsComponent } from './confirmation-details/confirmation-details.component';


const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee/general-details', component: GeneralDetailsComponent },
  { path: 'employee/personal-details', component: PersonalDetailsComponent },
  { path: 'employee/account-details', component: BankPfEsiComponent },
  { path: 'employee/contact-details', component: ContactAddressComponent },
  { path: 'employee/family-details', component: FamilyDetailsComponent },
  { path: 'employee/experience-education-details', component: ExperienceEducationComponent },
  { path: 'employee/assets-docs-details', component: AssetsDocsComponent },
  { path: 'employee/salary-details', component: SalaryComponent },
  { path: 'employee/confirmation-details', component: ConfirmationDetailsComponent },
];

@NgModule({
  declarations: [
    EmployeeListComponent,
    GeneralDetailsComponent,
    PersonalDetailsComponent,
    BankPfEsiComponent,
    ContactAddressComponent,
    FamilyDetailsComponent,
    ExperienceEducationComponent,
    AssetsDocsComponent,
    SalaryComponent,
    ConfirmationDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    SharedModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    TooltipModule,
    TabViewModule,
    FormsModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    CalendarModule,
    BsDatepickerModule
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeModule { 

  
}