import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private apiUrl = 'http://localhost:8080/questions'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Fetch all questions
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Create a new question
  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, question);
  }

  // Fetch questions by category
  getQuestionsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  // Fetch a specific question by ID
  getQuestionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update a question
  updateQuestion(id: number, question: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, question);
  }

  // Delete a question
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
