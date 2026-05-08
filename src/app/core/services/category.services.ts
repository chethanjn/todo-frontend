import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Observable} from 'rxjs';
import {Category} from '../../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryServices{
  private readonly baseUrl = `${environment.apiUrl}/categories`;
  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl);
  }

  createCategories(payload: Category): Observable<Category>{
    return this.http.post<Category>(this.baseUrl, payload);
  }

  updateCategories(id: string, payload: Category): Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/${id}`, payload);
  }

  deleteCategory(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
