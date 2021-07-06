import {FeatureType} from '../enums/feature-type.enum';
import {GeometryType} from '../enums/geometry-type.enum';
import {Properties} from './properties';

export interface Feature {
  type: FeatureType;
  properties: Properties;
  geometry: {
    type: GeometryType;
    coordinates: number[]
  };
}
