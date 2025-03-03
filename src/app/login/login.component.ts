import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // For template-driven forms (ngModel, ngForm)
import { CommonModule } from '@angular/common';  // For directives like ngIf and ngClass
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../services/student.service';  // Import the StudentService
import { TeacherService } from '../services/teacher.service'

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],  // Add required modules here
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  accountType: string = '';  // Default to 'student'
  responseMessage: string = '';
  responseClass: string = '';

  constructor(private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router) { }

  onSubmit() {
    if (this.accountType === 'student') {
      this.studentService.findStudentByNameAndPassword(this.username, this.password).subscribe(
        (student) => {
          if (student) {
            // Store the student's id in localStorage (for persistent access)
            localStorage.setItem('studentId', student.id.toString());  // Save student ID
            

            // Display success message
            this.responseMessage = 'Login successful!';
            this.responseClass = 'success';

            // Redirect to the student dashboard
            setTimeout(() => this.router.navigate(['/student-dashboard']), 2000);
          } else {
            this.handleLoginFailure();
          }
        },
        (error) => this.handleError(error)
      );
    }
    else if (this.accountType === 'teacher') {
      this.teacherService.getTeachers().subscribe(
        (teachers) => {
          const teacher = teachers.find(
            (t) => t.name === this.username && t.password === this.password
          );

          if (teacher) {
            this.handleLoginSuccess('/teacher-dashboard');
          } else {
            this.handleLoginFailure();
          }
        },
        (error) => this.handleError(error)
      );
    }
  }

  private handleLoginSuccess(redirectUrl: string) {
    this.responseMessage = 'Login successful!';
    this.responseClass = 'success';
    setTimeout(() => this.router.navigate([redirectUrl]), 2000);
  }

  private handleLoginFailure() {
    this.responseMessage = 'Invalid credentials. Please try again.';
    this.responseClass = 'error';
  }

  private handleError(error: any) {
    this.responseMessage = `Error fetching data: ${error.message}`;
    this.responseClass = 'error';
    console.error('Error:', error);
  }

}
