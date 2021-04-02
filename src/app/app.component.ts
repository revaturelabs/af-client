import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'project3frontend';
  constructor(private toastr: ToastrService) { }
  ngOnInit() { }
  // can add this to app.component.html as a click event to test
  // probably add method with custom inputs as seperate notification service or to app-confirm?
  showToaster(){
    this.toastr.success("Hello there, toaster here!")
  }
  // -- previous toastr settings
    //    timeOut: 5000,
    //    positionClass: 'toast-top-right',
    //    progressBar: true,
    //    newestOnTop: false,
    //    maxOpened: 4
}
