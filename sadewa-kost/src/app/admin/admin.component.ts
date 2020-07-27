import { Component, OnInit } from '@angular/core';
//import modul dialog
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import halaman dialog yang sudah dibuat pada tahap sebelumnya
import { TambahDataComponent } from '../tambah-data/tambah-data.component';
import { DetailDataComponent } from '../detail-data/detail-data.component';
import { DialogKonfirmasiComponent } from '../dialog-konfirmasi/dialog-konfirmasi.component';
import {ApiService} from '../api.service'; //kode tambahan

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public api:ApiService
  ) {
    this.getData(); //kode tambahan
  }
   //mengambil data pada server (kode tambahan)
   dataKwitansi:any=[];
   getData()
   {
     this.api.baca().subscribe(res=>{
       this.dataKwitansi=res;
     })
   }

  ngOnInit(): void {
  }

//fungsi untuk menampilkan dialog penambahan alamat baru
buatKwitansi() {
  const dialogRef = this.dialog.open(TambahDataComponent, {
    width: '450px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getData();
  });
}

//membuka dialog detail alamat
detailKwitansi(item)
{
  const dialogRef = this.dialog.open(DetailDataComponent, {
    width: '450px',
    data:item // tambahan kode
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');     
  });
}

konfirmasiHapus(id)
 {
		const dialogRef = this.dialog.open(DialogKonfirmasiComponent, {
			width: '450px',      
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == true)
			{
				console.log('Menghapus data');
        this.api.hapus(id).subscribe(res=>{
          this.getData();
        })
      }   
    });
  }

 editKwitansi(data)
 {
   const dialogRef = this.dialog.open(TambahDataComponent, {
     width: '450px',
     data:data
   });
   dialogRef.afterClosed().subscribe(result => {
     this.getData();    
   });
 }
}

