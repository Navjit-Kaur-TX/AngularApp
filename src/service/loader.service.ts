import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading$ = new Subject<boolean>();
  

  show(): void {
    console.log('show123')
    this.isLoading$.next(true);
  }
  hide(): void {
    console.log('hide')
    this.isLoading$.next(false);
  }
}