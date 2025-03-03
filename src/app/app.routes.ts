import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';


export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Explicit login route
  { path: 'create-account', component: CreateAccountComponent }, // Create Account Route
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
];
