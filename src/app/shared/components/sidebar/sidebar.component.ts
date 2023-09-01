import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  get tags(): string[] {
    return this.gifsService.tagHistory;
  }

  buscaGif( oldTag: string ):void {
    // const oldTag = this.btnBuscar.nativeElement.innerHTML;

    this.gifsService.searchTag(oldTag);
  }

}
