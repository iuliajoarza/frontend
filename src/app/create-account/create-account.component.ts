import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // For template-driven forms (ngModel, ngForm)
import { CommonModule } from '@angular/common';  // For directives like ngIf and ngClass
import { Router ,RouterModule} from '@angular/router';
import { StudentService } from '../services/student.service';  // Import the StudentService
import { TeacherService } from '../services/teacher.service'

@Component({
  selector: 'app-create-account',
  standalone: true,
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
  imports: [FormsModule, CommonModule,RouterModule]
})
export class CreateAccountComponent {
  username: string = '';
  password: string = '';
  accountType: string = '';
  responseMessage: string = '';
  responseClass: string = '';

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private rounter :Router,
  ) { }

  onSubmit(): void {
    if (!this.accountType || !this.username || !this.password) {
      this.responseMessage = 'Fill in all fields';
      this.responseClass = 'error';
      return;

    }
    if (this.accountType === 'student') {
      this.studentService.createStudent({ name: this.username, password: this.password }).subscribe({
        next: (response) => {
          this.responseMessage = 'Student account was generated';
          this.responseClass = 'success';
          setTimeout(() => this.rounter.navigate(["/login"]), 2000);
        },
        error: (err) => {
          this.responseMessage = 'Failed to create student account';
          this.responseClass = 'error';
        }
      });
    } else if (this.accountType === 'teacher') {
      this.teacherService.createTeacher({ name: this.username, password: this.password }).subscribe({
        next: (response) => {
          this.responseMessage = 'Teacher account was generated';
          this.responseClass = 'success';
          setTimeout(() => this.rounter.navigate(["/login"]), 2000);
        },
        error: (err) => {
          this.responseMessage = 'Failed to create teacher account';
          this.responseClass = 'error';
        }
      });

    }
      
  }

}
