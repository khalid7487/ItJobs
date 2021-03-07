import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/details.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CompanniesService } from './services/compannies.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';
 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//For search option
import {MatChipsModule} from '@angular/material/chips';
import {  MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    NgSelectModule,
    InfiniteScrollModule,
    NgMultiSelectDropDownModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule

  ],
  providers: [CompanniesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
