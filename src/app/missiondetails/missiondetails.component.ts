import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})

export class MissiondetailsComponent implements OnInit {

  @Input() mission?: Mission

  constructor( 
    private spacexapiService: SpacexapiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMissionDetails();
  }

  getMissionDetails(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id != null){
      this.mission = this.spacexapiService.getMissionDetails(Number(id))
    }
  }


}
