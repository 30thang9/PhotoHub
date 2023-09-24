import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventMap: { [key: string]: BehaviorSubject<any> } = {};

  registerEvent(eventName: string) {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = new BehaviorSubject<any>(null);
    }
    return this.eventMap[eventName].asObservable();
  }

  emitEvent(eventName: string, data: any) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].next(data);
    }
  }
}
