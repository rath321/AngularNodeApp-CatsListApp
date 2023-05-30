import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cat } from '../shared/models/cat.model';

@Injectable()
export class CatService {

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>('http://localhost:3001/api/cats');
  }

  countCats(): Observable<number> {
    return this.http.get<number>('http://localhost:3001/api/cats/count');
  }

  addCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>('http://localhost:3001/api/cat', cat);
  }

  getCat(cat: Cat): Observable<Cat> {
    return this.http.get<Cat>(`http://localhost:3001/api/cat/${cat._id}`);
  }

  editCat(cat: Cat): Observable<string> {
    return this.http.put(`http://localhost:3001/api/cat/${cat._id}`, cat, { responseType: 'text' });
  }

  deleteCat(cat: Cat): Observable<string> {
    return this.http.delete(`http://localhost:3001/api/cat/${cat._id}`, { responseType: 'text' });
  }

}
