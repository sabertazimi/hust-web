import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string): void {
    this.messageService.add(`HeroService - ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}.`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}.`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHeroes(): Observable<Hero []> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes.')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
}
