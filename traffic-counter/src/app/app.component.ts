import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from './services/report.service';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'traffic-counter';
  constructor(public reportService: ReportService, public snackBar: MatSnackBar) { }
  public getDetails: any = {}
  ngOnInit(): void {
    this.getDetails = JSON.parse(localStorage.getItem("trafficUserDet"));
    let count_interval = this.getDetails.count_interval;
    setInterval(()=> {
      this.sendReport();
    }, count_interval)
  }

  sendReport() {
    let getCount = JSON.parse(localStorage.getItem("CountArray"));
    if (getCount != null) {
      this.reportService.saveReport(getCount).subscribe(data => {
        console.log(data)
        if (data.inserted == true) {
          localStorage.removeItem("CountArray");
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {message: "Successfully Saved Count"},
            duration: 3000
         })
        }
      })
    }
  }


}
