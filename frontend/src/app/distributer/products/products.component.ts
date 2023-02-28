import { AfterContentInit, AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ApiServiceService } from 'src/app/api-service.service';
import { RaiseOrderComponent } from '../raise-order/raise-order.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  getProductsURL : string = 'https://localhost:44321/api/UserLogin/getProducts'
  products : any = [];
  qtyInput : number = 0;

  constructor(
    private apiService : ApiServiceService,
    private dialog : MatDialog,
    ) { }

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngOnInit(): void {
    this.apiService.getMethod(this.getProductsURL).subscribe((products : any) => {
      this.products = products;
      // this.products.paginator = this.paginator
    });
  }

  onKeyUp(event : any){
    this.qtyInput = Number((event.target).value);
  }

  // onClickAddToPO(){

  // }

  onclickRaiseOrder(product : any){
    if(this.qtyInput >= 70)
    this.dialog.open(RaiseOrderComponent, {
      height : '98%',
      width : '48%',
      data : {
        product : product,
        qty : this.qtyInput
      },
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
    else
    alert('Please enter mininum order Quantity');
  }

  onclickPurchase(){}
}
