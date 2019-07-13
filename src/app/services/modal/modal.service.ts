import { Injectable } from '@angular/core';
import { Overlay, ComponentType, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

/**
 * provides creating modal windows
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private overlay: Overlay
  ) { }

  openModal<CType, InjectingData>(
    component: ComponentType<CType>,
    data?: InjectingData,
    config?: OverlayConfig
  ): OverlayRef {
    const _config = config || this.getDefaultOverlayConfig();
    const overlayRef = this.overlay.create(_config);
    const componentPortal = new ComponentPortal(component);
    overlayRef.attach(componentPortal);
    return overlayRef;
  }

  private getDefaultOverlayConfig(): OverlayConfig {
    return {
      hasBackdrop: true,
      backdropClass: 'cdk-backdrop',
      panelClass: 'cdk-panel',
      positionStrategy: this.overlay.position().global()
    }
  }

}
