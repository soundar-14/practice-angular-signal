import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { concatMap, exhaustMap, from, mergeMap, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs-map',
  templateUrl: './rxjs-map.component.html',
  styleUrls: ['./rxjs-map.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class RxjsMapComponent implements OnInit {
  http: HttpClient = inject(HttpClient);

  data = signal<any[]>([]);

  constructor() { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((d: any) => {
        this.data.set((d as any[]).splice(0, 10));
      });
  }

  mergeMapExample() {
    const first10 = this.data();
    from(first10)
      .pipe(
        mergeMap(todo =>
          this.http.get(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        )
      )
      .subscribe({
        next: result => console.log('mergeMap result:', result),
        error: err => console.error('mergeMap error:', err),
        complete: () => console.log('mergeMap completed')
      });
  }

  switchMapExample() {
    const first10 = this.data();
    from(first10)
      .pipe(
        switchMap(todo =>
          this.http.get(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        )
      )
      .subscribe({
        next: result => console.log('switchMap result:', result),
        error: err => console.error('switchMap error:', err),
        complete: () => console.log('switchMap completed')
      });
  }

  concatMapExample() {
    const first10 = this.data();
    from(first10)
      .pipe(
        concatMap(todo =>
          this.http.get(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        )
      )
      .subscribe({
        next: result => console.log('concatMap result:', result),
        error: err => console.error('concatMap error:', err),
        complete: () => console.log('concatMap completed')
      });
  }

  exhaustMapExample() {
    const first10 = this.data();
    from(first10)
      .pipe(
        exhaustMap(todo =>
          this.http.get(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        )
      )
      .subscribe({
        next: result => console.log('exhaustMap result:', result),
        error: err => console.error('exhaustMap error:', err),
        complete: () => console.log('exhaustMap completed')
      });
  }
}
