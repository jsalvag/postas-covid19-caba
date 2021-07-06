import {Component, ElementRef, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {Observable} from 'rxjs';
import {Feature} from './interfaces/feature';
import {map} from 'rxjs/operators';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as Proj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>POSTAs C.A.B.A</h1>
      <div id="map" class="map"></div>
      <ul class="list-group">
        <li class="list-group-item" *ngFor="let feature of features | async; index as i">{{feature.properties.direccion}}</li>
      </ul>
    </div>`
})
export class AppComponent implements OnInit {
  title = 'Postas';
  features: Observable<Feature[]>;
  map: Map;
  private mapEl: HTMLElement;
  private center: number[] = [-34.60378, -58.38167];

  constructor(private data: DataService, private elementRef: ElementRef) {
    this.map = this.elementRef.nativeElement.querySelector('#map');
  }

  ngOnInit(): void {
    this.features = this.data.get().pipe(map(resp => resp.features));

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: Proj.fromLonLat(this.center),
        zoom: 8
      }),
      controls: defaultControls().extend([])
    });
  }
}
