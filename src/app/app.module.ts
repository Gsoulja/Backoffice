import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { AuthGuard } from "./shared/auth.guard";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgChartsModule  } from 'ng2-charts';
import { CategoryComponent } from './category/category.component';
import { WorkerComponent } from './worker/worker.component';
import { QueueManagementComponent } from './queue-management/queue-management.component';
import { ClientComponent } from './client/client.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    WorkerComponent,
    QueueManagementComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'category', component: CategoryComponent,canActivate: [AuthGuard]},
      {path: 'worker', component: WorkerComponent, canActivate: [AuthGuard]},
      {path: 'queuemanager', component: QueueManagementComponent, canActivate: [AuthGuard]},
      {path: 'cliente', component: ClientComponent, canActivate: [AuthGuard]},
      
    ]),
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
