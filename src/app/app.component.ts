import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {Observable} from 'rxjs';
import {Feature} from './interfaces/feature';
import {map} from 'rxjs/operators';

declare var ol: any;

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
  map: any;
  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.features = this.data.get().pipe(map(resp => resp.features));

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
  }
}
