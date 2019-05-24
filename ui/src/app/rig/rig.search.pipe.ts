import { Pipe, PipeTransform } from '@angular/core';
import { Rig } from './rig';
import * as _ from 'lodash';

@Pipe({
  name: 'search'
})
export class RigSearchPipe implements PipeTransform {
  transform(value: Rig[], searchText: string) {
    if (searchText) {
      searchText = searchText.toLowerCase();
      return _.filter(value, rig => {
        const hostname = rig.hostname.toLowerCase();
        const minerNames = _.join(
          _.map(rig.miners, m => {
            return m.config.name.toLowerCase();
          }),
          ''
        );
        return hostname.includes(searchText) || minerNames.includes(searchText);
      });
    } else {
      return value;
    }
  }
}
