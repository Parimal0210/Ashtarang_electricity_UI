import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Invoice } from './model/Invoice';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.vfs;

// class Product{
//   name: string;
//   price: number;
//   qty: number;
// }
// class Invoice{
//   customerName: string;
//   address: string;
//   contactNo: number;
//   email: string;
  
//   products: Product[] = [];
//   additionalDetails: string;

//   constructor(){
//     // Initially one empty product row we will show 
//     this.products.push(new Product());
//   }
// }
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  invoice = new Invoice(); 
  emptyCheck:boolean=true;
  title:string="title";

  constructor(private http: HttpClient,private router: Router){}

  
  // generatePDF(action = 'open') {
  //   let docDefinition = {
  //     content: [
  //       {
  //         text: 'ELECTRONIC SHOP',
  //         fontSize: 16,
  //         alignment: 'center',
  //         color: '#047886'
  //       },
  //       {
  //         text: 'INVOICE',
  //         fontSize: 20,
  //         bold: true,
  //         alignment: 'center',
  //         decoration: 'underline',
  //         color: 'skyblue'
  //       },
  //       {
  //         text: 'Customer Details',
  //         style: 'sectionHeader'
  //       },
  //       {
  //         columns: [
  //           [
  //             {
  //               text: "Ashtarang",
  //               bold:true
  //             },
  //             { text: this.invoice.address },
  //             { text: this.invoice.email },
  //             { text: this.invoice.contactNo }
  //           ],
  //           [
  //             {
  //               text: `Date: ${new Date().toLocaleString()}`,
  //               alignment: 'right'
  //             },
  //             { 
  //               text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
  //               alignment: 'right'
  //             }
  //           ]
  //         ]
  //       },
  //       {
  //         text: 'Order Details',
  //         style: 'sectionHeader'
  //       },
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: ['*', 'auto', 'auto', 'auto'],
  //           body: [
  //             ['Product', 'Price', 'Quantity', 'Amount'],
  //             ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
  //             [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
  //           ]
  //         }
  //       },
  //       {
  //         text: 'Additional Details',
  //         style: 'sectionHeader'
  //       },
  //       {
  //           text: this.invoice.additionalDetails,
  //           margin: [0, 0 ,0, 15]          
  //       },
  //       {
  //         columns: [
  //           [{ qr: `${this.invoice.customerName}`, fit: '50' }],
  //           [{ text: 'Signature', alignment: 'right', italics: true}],
  //         ]
  //       },
  //       {
  //         text: 'Terms and Conditions',
  //         style: 'sectionHeader'
  //       },
  //       {
  //           ul: [
  //             'Order can be return in max 10 days.',
  //             'Warrenty of the product will be subject to the manufacturer terms and conditions.',
  //             'This is system generated invoice.',
  //           ],
  //       }
  //     ],
  //     styles: {
  //       sectionHeader: {
  //         bold: true,
  //         decoration: 'underline',
  //         fontSize: 14,
  //         margin: [0, 15,0, 15]          
  //       }
  //     }
  //   };

  //   if(action==='download'){
  //     pdfMake.createPdf(docDefinition).download();
  //   }else if(action === 'print'){
  //     pdfMake.createPdf(docDefinition).print();
  //     window.print();      
  //   }else{
  //     pdfMake.createPdf(docDefinition).open();      
  //   }

  // }

  // addProduct(){
  //   this.invoice.products.push(new Product());
  // }
  calculate(){
    var x1: number = +this.invoice.newDateUnit;
    var y1: number = +this.invoice.lastDateUnit;
    this.invoice.unitsUsedThisMonth = x1 - y1
    this.invoice.amt = this.invoice.unitsUsedThisMonth * 12
    this.invoice.discountedAmount = this.invoice.amt - this.invoice.amt * 0.05
    this.invoice.totalAmount = this.invoice.prevAmt + this.invoice.discountedAmount
  }
  generate(){
    this.generateInvoice().subscribe((data:Invoice)=>{
      console.log(data)
      this.invoice=data
    })
  }
  save(){
    this.saveInvoice(this.invoice).subscribe((data:any)=>{
      console.log(data)
      alert(data.response)
      if(data.statusCode == 200){
        window.print()
        window.location.reload()
      }
    })
  }

  emptyInvoiceCheck(){
    if(this.invoice == null)
      this.emptyCheck=true;
    else  
    this.emptyCheck=false;
  }

  saveInvoice(invoice:Invoice):Observable<any>{
  //  return this.http.post<any>("http://localhost:8080/invoice/saveInvoice",invoice);
  return this.http.post<any>("https://ashtarang-electricity.onrender.com/invoice/saveInvoice",invoice);
  }

  generateInvoice():Observable<any>{
    // return this.http.get<any>("http://localhost:8080/invoice/generate");
    return this.http.get<any>("https://ashtarang-electricity.onrender.com/invoice/generate");
  }
}
