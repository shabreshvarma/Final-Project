import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/api-service.service';
import { WhAddStockComponent } from '../wh-add-stock/wh-add-stock.component';

@Component({
  selector: 'app-wh-home',
  templateUrl: './wh-home.component.html',
  styleUrls: ['./wh-home.component.scss']
})
export class WhHomeComponent implements OnInit {
  
  getProductsURL : string = 'https://localhost:44321/api/UserLogin/getProducts'
  products : any = [];

  constructor(
    private apiService : ApiServiceService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.apiService.getMethod(this.getProductsURL).subscribe((products : any) => {
      this.products = products;
      // this.products.paginator = this.paginator
    });
  }

  onClickUpdateStock(product : any){
    this.dialog.open(WhAddStockComponent, {
      height:'95%',
      width : '58%',
      data : product
    })
  }

  onClickAddDialog(){
    this.dialog.open(WhAddStockComponent, {
      height:'95%',
      width : '58%'
    })
  }
}
