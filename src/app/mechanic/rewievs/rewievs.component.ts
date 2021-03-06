import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {Vehicles} from '../../classes/vehicles';
import { Reviews } from 'src/app/classes/reviews';

export interface PeriodicElement {
  vehicle: string;
  type: string;
  owner: string;
  rewiev_done_by: string;
}
@Component({
  selector: 'app-rewievs',
  templateUrl: './rewievs.component.html',
  styleUrls: ['./rewievs.component.css']
})
export class RewievsComponent implements OnInit {
  displayedColumns: string[] = [ 'vehicle', 'type', 'owner' , 'rewiev_done_by'];
  
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  vehicles:Vehicles;
  reviews:Reviews[]
  constructor(private apiService:ApiService) { }
  
  ngOnInit() : void{
    this.apiService.getDoneRviews('ZAVRSEN').subscribe(r=>{

      this.reviews = r;
      r.forEach(element => {
        this.apiService.getRelatedVehicles(element).subscribe(v => {
          this.vehicles = v;
          this.apiService.getRelatedUsers(element).subscribe(u => {
            let prevod: string;
            if(v.type=="PUTNICKO") {
              prevod="PASSENGER VEHICLE";
            } else if(v.type=="TERETNO") {
              prevod="TRUCK";
            } else if(v.type=="PRIKLJUCNO") {
              prevod="TRAILER VEHICLE";
            }
            this.ELEMENT_DATA.push({ vehicle: v.brand , type: prevod, owner: v.owner_name ,rewiev_done_by: u.first_name });
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          });
        });    
      });
    })
  }
}
