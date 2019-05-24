import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rig-searchbar',
  styleUrls: ['./rig.searchbar.css'],
  templateUrl: './rig.searchbar.html'
})
export class RigSearchBarComponent {
  @Input() searchText: string;
  @Output() searchTextChange = new EventEmitter<string>();

  change(searchText) {
    this.searchText = searchText;
    this.searchTextChange.emit(this.searchText);
  }
}
