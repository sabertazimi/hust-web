import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    console.log(HEROES.find(hero => hero.id === id));
    return of(HEROES.find(hero => hero.id === id));
  }

  getHeroes(): Observable<Hero []> {
    this.messageService.add('HeroService: fetched heroes.');
    return of(HEROES);
  }
}
