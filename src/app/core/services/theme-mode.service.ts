import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService {
  theme = 'dark';
  renderer: Renderer2;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2,
    private localStorageSer: LocalstorageService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  switchTheme(val: string) {
    this.document.body.classList.remove(this.theme);
    this.theme = val;
    this.document.body.classList.add(val);
    this.localStorageSer.setItem('mode', val);
  }

  initializeTheme(): void {
    if (this.localStorageSer.getItem('mode') !== undefined && this.localStorageSer.getItem('mode') !== null) {
      if (this.localStorageSer.getItem('mode') === 'light') this.theme = 'light';
      else this.theme = 'dark';

      this.renderer.addClass(this.document.body, this.localStorageSer.getItem('mode'));
    } else {
      this.renderer.addClass(this.document.body, 'dark');
    }
  }

}
