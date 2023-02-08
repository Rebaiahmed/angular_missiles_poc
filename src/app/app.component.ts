import { Component } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 result: string='';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(map((response:any) => response['title']))
      .toPromise()
      .then((title: string) => {
        this.result = title;
      });

      this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(
        map((response:any) => response['title']),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe(
        (title) => {
          console.log(title);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
