import { Component, OnInit } from '@angular/core';

import { VehicleService } from '../../vehicle.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../../../core/elements/dialog/delete/delete.component';

@Component({
  selector: 'app-vehicle-list',
	providers: [
    VehicleService
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles;

	constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {	}

  ngOnInit() {
    this.getVehicles()
  }

	getVehicles() {
    this.vehicleService
      .getVehicles()
      .subscribe((data) => {
        this.vehicles = data;
      })
  }

  onRowSelect(event) {
    this.router.navigate([`/vehicle/${event.data.vehicle_id}`]);
  }

  deleteLink(event: Event, id) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialog = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.deleteVehicle(id)
                    .subscribe(result => {
                      //console.log('success');
                      if (result) {
                        this.updateTable(id);
                        this.snackbar.open('Succesfully deleted', 'Close', {
                          duration: 4000,
                        });
                      }
                    },
                    error => {
                      this.snackbar.open('Not deleted:' + error.error.sqlMessage, 'Close', {
                        duration: 4000,
                      });
                      console.log(error);
                    },
                    () => {
                      //no error logic here
                    }); 
      }
    });

    event.stopPropagation();
    
    return;
  }
  
  updateTable(id) {
    let index = this.vehicles.findIndex( (item): boolean => {
                if (item.vehicle_id == id){
                  return true;
                }
              });
              
    if (index > -1) {
      this.vehicles.splice(index, 1);
    }
  }

}