import {Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../../models/task.model';

@Injectable({'providedIn': 'root'})
export class TaskService {
  private readonly baseUrl=`${environment.apiUrl}/tasks`;
  constructor(
    private http: HttpClient
  ) {}

  getTasks(filters?: {
    search?: string;
    category?: string;
    createdFrom?: string;
    createdTo?: string;
  }):Observable<Task[]>{
    let params = new HttpParams();
    if(filters?.search) params = params.set('search', filters.search);
    if(filters?.category) params = params.set('category', filters.category);
    if(filters?.createdFrom) params = params.set('createdFrom', filters.createdFrom);
    if(filters?.createdTo) params = params.set('createdTo', filters.createdTo);

    return this.http.get<Task[]>(this.baseUrl, {params: params});
  }

  getTaskById(id: string): Observable<Task>{
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  createTask(payload: Task): Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}`, payload);
  }

  updateTask(id:string,payload:Task): Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}/${id}`, payload);
  }

  deleteTask(id: string){
    return this.http.delete<Task>(`${this.baseUrl}/${id}`);
  }




}
