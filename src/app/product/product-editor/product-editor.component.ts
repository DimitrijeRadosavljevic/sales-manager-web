import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private router: Router) { }

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
      image: new FormControl(null),
      dx: [product ? product.dimensions.x : null],
      dy: [product ? product.dimensions.x : null],
      dz: [product ? product.dimensions.x : null],
      staffSalePrice: [product ? product.staffSalePrice : null, Validators.required],
      staffSaleType: [product ? product.staffSaleType : null, Validators.required],
      homeDelivery: [product ? product.homeDelivery : false],
      quantity: [product ? product.quantity : null]
    })
    this.formActive = true;
  }

  public onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    if(!this.productId) {
      const productForCreation: Product = { ...this.form.value, dimensions: { x: this.form.value.dx, y: this.form.value.dy, z: this.form.value.dz }}
      this.productService.postProduct(productForCreation, this.form.value.image).subscribe(
        response => {
          //this.createdProduct = response.data;
          this.toastrService.success("Product successfully created");
          this.router.navigate(['/products']);
        },
        error => {
          this.toastrService.error("Some error ocured please try leater");
        }
      )
    } else {
      const productForUpdate: Product = { ...this.form.value, dimensions: {  x: this.form.value.dx, y: this.form.value.dy, z: this.form.value.dz }, imagePath: this.productForUpdate.imagePath }
      this.productService.updateProduct(productForUpdate, this.form.value.image).subscribe(
        response => {
          this.toastrService.success("Product successfully updated")
          this.router.navigate([`/products/${response.data._id}`]);
        },
        error => {
          this.toastrService.error("Some error ocured please try leater");
        }
      )
    }
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
