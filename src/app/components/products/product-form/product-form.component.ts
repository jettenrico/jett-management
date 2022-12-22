import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductService } from 'src/app/services/product.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  @Input() product:IProduct = {} as IProduct;
  showMore:boolean = false;
  showToast:boolean = false;
  isConfirmDelete:boolean = false;
  // product!:IProduct

  constructor(private productService: ProductService, private toasterService: ToasterService) {}
  
  ngOnInit(): void {
    
  }

  showToggle(){
    this.showMore = !this.showMore
  }

  setProduct(product:IProduct){
    this.product = JSON.parse(JSON.stringify(this.product));
  }

  cancel():void{
    this.product = {} as IProduct;
    this.showMore = false;
  }

  onCreate(){
    this.productService.create(this.product)
      .subscribe(
        (response: IProduct) => {
          this.showMore = false;
          this.product = {} as IProduct;
          this.toasterService.showToast = true;
          this.toasterService.message = `Berhasil menyimpan data ${response.title}`;
        }
      )
  }

  onUpdate(){
    this.productService.update(this.product)
      .subscribe(
        (response: IProduct) => {
          this.showMore = false;
          this.product = {} as IProduct;
          this.toasterService.showToast = true;
          this.toasterService.message = `Berhasil update data dengan ID: ${response.id}`;
        }
      )
  }

  onDelete(){
    this.productService.delete(this.product)
    .subscribe(
      (response: IProduct) => {
        this.showMore = false;
        this.product = {} as IProduct;
        this.isConfirmDelete = false;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil delete data dengan ID: ${response.id}`;
      }
    )
  }
}
