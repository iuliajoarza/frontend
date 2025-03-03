import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  private apiUrl = 'http://localhost:8080/quizzes'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Fetch all quizzes
  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch all quizzes by category (make sure backend has the endpoint for this)
  getQuizzesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  // Fetch a specific quiz by ID
  getQuizById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new quiz (not required as per your current setup)
  createQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, quiz);
  }

  // Update a quiz (optional, if you have the backend for this)
  updateQuiz(id: number, quiz: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, quiz);
  }

  // Delete a quiz (optional, if you have the backend for this)
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Start a quiz
  startQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/start?studentId=${quiz.studentId}&category=${quiz.category}`, quiz);
  }


  // Submit the quiz
  submitQuiz(submission: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, submission);
  }
}
