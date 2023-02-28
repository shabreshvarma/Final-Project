import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-wh-orders',
  templateUrl: './wh-orders.component.html',
  styleUrls: ['./wh-orders.component.scss']
})
export class WhOrdersComponent implements OnInit {

  getOrdersUrl : string = 'https://localhost:44321/api/Distributer/getOrders';
  dispatchUrl : string = 'https://localhost:44321/api/Warehouse/dispatch';
  matOrders = new MatTableDataSource();
  displayedColumns : string[] = ['OrderID', 'OrderPlacedDate', 'ProductName', 'ProductID', 'Quantity', 'TotalCost', 'OrderStatus', 'Dispatch'];
  constructor(
    private apiService : ApiServiceService
  ) { }

  ngOnInit(): void {
    this.apiService.getMethod(this.getOrdersUrl).subscribe((orders : any) => {
      let filtered : any = orders.filter((e : string | any) => e.OrderStatus === 'Accepted' || e.OrderStatus == 'Dispatched')
      this.matOrders = new MatTableDataSource(filtered);
    })
  }

  onClickDispatch(orderID : string){
    this.apiService.getMethod(`${this.dispatchUrl}/${orderID}`).subscribe(e => console.log(e));
  }

}
