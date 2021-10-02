import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'golf-scores';
  url = 'https://vana-handicap-walter-tondu.azurewebsites.net/api/httptrigger2';
  savedName: string;
  savedScores: string;

  golfForm = new FormGroup({
    fName: new FormControl('', Validators.required),
    scores: new FormControl('', Validators.required)
  });
  handicapData: any;

  constructor(
    private http: HttpClient
  ) {}

  onSubmit(): void {
    this.getHandicap(this.golfForm.controls.fName.value, this.golfForm.controls.scores.value).subscribe(
      (response: any) => {
        this.handicapData = response;
      }
    );
  }

  public getHandicap(name: string, scores: string): Observable<any> {
    this.savedName = name;
    this.savedScores = scores;
    const data = { name, scores };
    return this.http.post(this.url, data);
  }
}
