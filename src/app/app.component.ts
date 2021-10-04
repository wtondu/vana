import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HandicapResponse } from './models/handicap-response.model';
import { HandicapService } from './services/handicap.service';
import { ApiResponse } from './models/api-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  savedName: string;
  savedScores: string;

  golfForm = new FormGroup({
    fName: new FormControl('', Validators.required),
    scores: new FormControl('', Validators.required),
  });
  handicapData: HandicapResponse;

  constructor(private http: HttpClient, private handicapService: HandicapService) { }

  keyPressValidation(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 32 && charCode !== 44 && charCode !== 13) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  cleanScores(): string {
    let scores = this.golfForm.controls.scores.value;
    scores = scores.replace(/^,/, '').replace(/,/g, ' ').replace(/  +/g, ' ').replace(/ /g, ', ').replace(/,\s*$/, '');
    this.golfForm.controls.scores.setValue(scores);
    return scores;
  }

  onSubmit(): void {
    this.savedName = this.golfForm.controls.fName.value;
    this.savedScores = this.cleanScores();
    this.handicapService.getHandicap(this.golfForm.controls.fName.value, this.savedScores)
      .subscribe(
        (response: HandicapResponse) => {
        this.handicapData = response;
      },
        (response: HttpErrorResponse) => {
          console.error(response);
      });
  }

}
