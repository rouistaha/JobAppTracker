import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SideBar } from './Components/Global/side-bar/side-bar';
import { JobsApplications } from './Components/Pages/jobs-applications/jobs-applications';
import { Stats } from './Components/Pages/stats/stats';
import { InfoPage } from './Components/Pages/info-page/info-page';
import { Footer } from './Components/Global/footer/footer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    App,
    SideBar,
    JobsApplications,
    Stats,
    InfoPage,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FullCalendarModule,
    AutoCompleteModule,
    DialogModule,
    DatePickerModule,
    SelectModule,
    ToastModule,
    InputNumber,
    ConfirmDialog,
    ChartModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
