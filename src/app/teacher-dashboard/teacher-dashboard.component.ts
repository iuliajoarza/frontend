import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // For template-driven forms (ngModel, ngForm)
import { CommonModule } from '@angular/common';  // For directives like ngIf and ngClass

import { QuestionsService } from '../services/questions.service'; // Assuming your service is in the "services" folder
import { Router, RouterModule } from '@angular/router'; // You can use this for redirection after creating a question

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class TeacherDashboardComponent {
  // Variables for the form fields
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  correct_answer: number = 1; // Default is 1 (first answer is correct)
  category: string = '';

  // List of categories for the dropdown selection
  categories: string[] = ['Math', 'Science', 'History', 'Geography'];

  constructor(private questionsService: QuestionsService, private router: Router) { }

  // Method to create a new question
  createQuestion() {
    // Check if the question text and answers are not empty
    if (!this.question || !this.answer1 || !this.answer2 || !this.answer3 || !this.answer4 || !this.category) {
      alert('Please fill in all fields.');
      return;
    }

    // Create the question object that will be sent to the backend
    const newQuestion = {
      question: this.question,
      answer1: this.answer1,
      answer2: this.answer2,
      answer3: this.answer3,
      answer4: this.answer4,
      correct_answer: this.correct_answer, // The correct answer index (1-4)
      category: this.category
    };

    // Call the service to create the question
    this.questionsService.createQuestion(newQuestion).subscribe(
      response => {
        console.log('Question created successfully:', response);
        this.resetForm(); // Reset the form after successful creation
        this.router.navigate(['/dashboard']); // Redirect to the dashboard after creation
      },
      error => {
        console.error('There was an error creating the question:', error);
        alert('An error occurred while creating the question.');
      }
    );
  }

  // Method to reset the form after submission
  resetForm() {
    this.question = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.correct_answer = 1;
    this.category = '';
  }
}
