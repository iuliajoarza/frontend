import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { CreateAccountComponent } from './app/create-account/create-account.component';
import { TeacherDashboardComponent } from './app/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './app/student-dashboard/student-dashboard.component';  // Import the Student Dashboard component
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
}).catch((err) => console.error(err));
