import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { elementAt, Observable, of } from 'rxjs';
import { Mission } from '../models/mission'

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  missions: Mission[] = []
  mission: any

  private url = 'https://api.spacexdata.com/v3/launches';
  
  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Object>{
    return this.httpClient.get(this.url)
  }

  getMission() {
    this.mission = this.getData()
    return this.getMissionList()
  }

  getMissionList(): Mission[] {
    this.mission.forEach((element: any) => {
      element.forEach((eachData: any) => {
        const { flight_number, mission_name, launch_year, details, links, launch_date_local, launch_site, rocket } = eachData
        const mission_patch_small: string = links.mission_patch_small
        const video_link: string = links.video_link
        const site_name_long: string = launch_site.site_name_long
        const rocket_name: string = rocket.rocket_name
        const rocket_type: string = rocket.rocket_type
        const m: Mission = { flight_number, mission_name, launch_year, details, mission_patch_small, launch_date_local,
                             video_link, site_name_long, launch_site, rocket, rocket_name, rocket_type }
        this.missions.push(m)
      })
    });
    return this.missions
  }

  getMissionDetails(id: number): any {
    const allMissions = this.getMission()
    return allMissions.find(mission => mission.flight_number == id)
  }
}
