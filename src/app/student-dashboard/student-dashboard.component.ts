import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../services/quizzes.service';
import { QuestionsService } from '../services/questions.service';
import { StudentService } from '../services/student.service';

import { FormsModule } from '@angular/forms';  // For template-driven forms (ngModel, ngForm)
import { CommonModule } from '@angular/common';  // For directives like ngIf and ngClass
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],  // Add required modules here
})
export class StudentDashboardComponent implements OnInit {
  categories: string[] = ['Math', 'Science', 'History', 'Geography']; // Predefined categories
  selectedCategory: string = ''; // Holds the selected category
  questions: any[] = []; // Array to hold questions for the selected category
  answers: number[] = []; // Array to hold student's answers
  feedback: string[] = []; // Array to hold feedback for the quiz
  finalScore: number = 0; // The final score after quiz submission
  quizStarted: boolean = false; // Flag to check if the quiz has started
  currentQuestionIndex: number = 0; // Current question index
  students: any[] = []; // Array to hold all students with averages
  currentStudent: any = {}; // Holds the current student information
  studentId: string | null = null;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve studentId from localStorage (if it exists)
    if (typeof window !== 'undefined' && window.localStorage) {
      this.studentId = localStorage.getItem('studentId');
    }

    if (!this.studentId) {
      console.error('No studentId found in localStorage. Redirecting to login.');
      this.router.navigate(['/login']); // Redirect to login page if no student ID
    } else {
      console.log('Student ID from localStorage:', this.studentId);
    }

    // Fetch all students with their averages
    this.studentService.getAllStudentsWithAverages().subscribe(
      (students) => {
        this.students = students;
        // Find the current student by matching the ID
        this.currentStudent = students.find(student => student.id.toString() === this.studentId);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Handle category selection
  onCategorySelect(): void {
    this.quizStarted = false; // Reset quizStarted flag when category is selected
    this.finalScore = 0; // Reset final score
    this.feedback = []; // Clear feedback
    this.answers = []; // Clear any previous answers
  }

  // Start the quiz by fetching questions for the selected category
  startQuiz(): void {
    this.quizStarted = true;
    console.log('Selected Category:', this.selectedCategory);

    this.questionsService.getQuestionsByCategory(this.selectedCategory).subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('Fetched Question IDs:', data);
          this.questions = [];

          // For each question ID, fetch its details (text and options)
          data.slice(0, 10).forEach((question) => {
            this.questionsService.getQuestionById(question.id).subscribe(
              (questionDetails) => {
                this.questions.push(questionDetails); // Push the detailed question
              },
              (error) => {
                console.error('Error fetching question by ID:', error);
              }
            );
          });
        } else {
          console.error('No questions found for category:', this.selectedCategory);
          alert('No questions available for this category. Please try another category.');
        }
      },
      (error) => {
        console.error('Error fetching questions for category:', error);
        alert('Error fetching questions. Please try again later.');
      }
    );
  }

  // Navigate to the next question
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  // Navigate to the previous question
  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  // Check if the current question is the last one
  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  // Check if the form is valid (all answers are selected)
  isFormValid(): boolean {
    return this.answers.every(answer => answer !== undefined && answer !== null);
  }

  // Submit the quiz and update the student's average score
  submitQuiz(): void {
    let correctCount = 0;
    this.feedback = [];

    this.questions.forEach((question, i) => {
      if (this.answers[i] === question.correct_answer - 1) {
        correctCount++;
        this.feedback.push(`Question ${i + 1}: Correct!`);
      } else {
        this.feedback.push(`Question ${i + 1}: Incorrect. The correct answer was "${question[`answer${question.correct_answer}`]}"`);
      }
    });

    this.finalScore = Math.round((correctCount / this.questions.length) * 100);
    alert(`Your final score is: ${this.finalScore}%`);

    // Update the student's average score if studentId exists
    if (this.studentId) {
      this.studentService.updateStudentAverage(Number(this.studentId), this.finalScore).subscribe(
        () => {
          console.log('Student average updated successfully');
        },
        (error) => {
          console.error('Error updating student average:', error);
        }
      );
    } else {
      console.error('Student ID not found. Cannot update average.');
    }
  }
  isCurrentStudent(studentId: string): boolean {
    return this.studentId === studentId;
  }
}
