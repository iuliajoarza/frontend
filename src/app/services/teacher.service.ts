import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Makes this service globally available throughout the app
})
export class TeacherService {
  private apiUrl = 'http://localhost:8080/teachers'; // Backend API URL for teachers

  constructor(private http: HttpClient) { }

  // Method to get all teachers
  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Sends a GET request to /teachers
  }

  // Method to get a teacher by ID
  getTeacherById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);  // Sends a GET request to /teachers/{id}
  }

  // Method to create a new teacher
  createTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, teacher);  // Sends a POST request to /teachers
  }

  // Method to update an existing teacher
  updateTeacher(id: number, teacher: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, teacher);  // Sends a PUT request to /teachers/{id}
  }

  // Method to delete a teacher by ID
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  // Sends a DELETE request to /teachers/{id}
  }
}
