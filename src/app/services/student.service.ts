import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class StudentService {
   // Backend API URL
  private apiUrl = 'http://localhost:8080/students';
  constructor(private http: HttpClient) { }  // Inject HttpClient to perform HTTP requests

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  
  }

  createStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);  
  }
   findStudentByNameAndPassword(name: string, password: string): Observable<any> {
     const url = `${this.apiUrl}/find?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;
     return this.http.get<any>(url);
  }

  updateStudentAverage(studentId: number, newScore: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${studentId}/update-average`, newScore);
  }

  getAllStudentsWithAverages(): Observable<any[]> {
    const url = `${this.apiUrl}/averages`;  // Endpoint to get all students with averages
    return this.http.get<any[]>(url);
  }

}
