import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-admin-allorders',
  templateUrl: './admin-allorders.component.html',
  styleUrls: ['./admin-allorders.component.scss']
})
export class AdminAllordersComponent implements OnInit {

  getOrdersUrl : string = `https://localhost:44321/api/Admin/orders`;
  matOrders = new MatTableDataSource();
  displayedColumns : string[] = ['OrderPlacedDate', 'OrderID', 'ProductID', 'ProductName', 'Quantity', 'TotalCost', 'OrderStatus']
  constructor(
    private apiService : ApiServiceService
  ) { }

  ngOnInit(): void {
    this.apiService.getMethod(this.getOrdersUrl).subscribe((orders : any) => {
      this.matOrders = new MatTableDataSource(orders)
    })
  }

}
