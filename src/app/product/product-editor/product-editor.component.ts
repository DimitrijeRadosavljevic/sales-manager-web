import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_shared/models/product';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  public productId: string;
  public productForUpdate: Product;
  public form: FormGroup;
  public formActive: boolean = false;
  public imageSelected;
  public createdProduct: Product;
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.route.paramMap.subscribe(params => {
      if(params.has('productId')) {
        this.productId = params.get('productId');
        this.getProduct(this.productId);
      } else {
        this.buildForm();
      }
    })
  }

  public getProduct(productId: string) {
    this.productService.getProduct(productId).subscribe(
      response => {
        this.productForUpdate = response.data;
        this.buildForm(this.productForUpdate);
        this.imageSelected = this.productForUpdate.imagePath;
      },
      error => { console.log("Product for update not fached")}
    )
  }

  public buildForm(product?: Product): void {
    this.form = this.formBuilder.group({
      _id: [product ? product._id : null],
      name: [product ? product.name : null, Validators.required],
      color: [product ? product.color : null],
      code: [product ? product.code : null, Validators.required],
      image: new FormControl(null)
    })
    this.formActive = true;
  }

  public onSubmit() {

    this.productService.postProduct(this.form.value as Product, this.form.value.image).subscribe(
      response => {
        this.createdProduct = response.data;
        console.log(this.createdProduct);
      }
    )
  }

  public onImageSelect(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: image});
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if(image && allowedTypes.includes(image.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSelected = reader.result as string;
      }
      reader.readAsDataURL(image);
    }
  }

}
