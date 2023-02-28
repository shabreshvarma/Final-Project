import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'src/app/api-service.service';
import { AuPurchaseOrderComponent } from '../au-purchase-order/au-purchase-order.component';


@Component({
  selector: 'app-au-home',
  templateUrl: './au-home.component.html',
  styleUrls: ['./au-home.component.scss']
})
export class AuHomeComponent implements OnInit {

  constructor(
    private apiService : ApiServiceService,
    private dialog : MatDialog,
    private spinnerService : NgxSpinnerService
  ) { }
 
  getDistUrl : string = `https://localhost:44321/api/Authorizer/getDistributers`;
  matDistributorsList = new MatTableDataSource();
  displayedColumns : string[] = ['ID', 'FirstName', 'EmailID', 'PhoneNumber', 'City', 'FirmName', 'CreditLimit', 'PurchaseOrders']
  
  ngOnInit(): void {
    this.spinnerService.show();
    this.apiService.getMethod(`${this.getDistUrl}`).subscribe((e : any) => {
      this.matDistributorsList = new MatTableDataSource(e);
      setTimeout(() => {
        this.spinnerService.hide()
      }, 1000);
    })
  }

  onClickPODialog(distID : string){
    this.dialog.open(AuPurchaseOrderComponent, {
      height : '95%',
      width : '50%',
      data : distID
    }).afterClosed().subscribe({ next : () => {
      this.ngOnInit()
    }})
  }
}
