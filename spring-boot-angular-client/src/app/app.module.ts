import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { AddTodoModalComponent } from './modals/add-todo-modal/add-todo-modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        skipWhenExpired: true
      }
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TodoDetailsComponent,
    HeaderComponent,
    FooterComponent,
    AddTodoModalComponent,
    LoginComponent,
    RegisterComponent
  ],
  entryComponents: [
    AddTodoModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
