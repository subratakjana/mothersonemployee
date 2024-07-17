import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly durationInSeconds = 182;
  private remainingTimeSubject = new BehaviorSubject<number>(this.durationInSeconds);
  private timerSubscription: any;

  constructor() {}

  startTimer(): void {
    this.timerSubscription = timer(0, 1000).pipe(
      map(tick => this.durationInSeconds - tick),
      takeWhile(remainingTime => remainingTime >= 0)
    ).subscribe(remainingTime => {
      this.remainingTimeSubject.next(remainingTime);
      if (remainingTime === 0) {
        this.stopTimer();
      }
    });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.remainingTimeSubject.next(0);
  }

  getRemainingTime(): BehaviorSubject<number> {
    return this.remainingTimeSubject;
  }
}
