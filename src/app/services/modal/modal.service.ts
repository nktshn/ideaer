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
    const resultConfig = config || this.getDefaultModalOverlayConfig();
    const overlayRef = this.overlay.create(resultConfig);
    const componentPortal = new ComponentPortal(component);
    overlayRef.attach(componentPortal);
    return overlayRef;
  }

  private getDefaultModalOverlayConfig(): OverlayConfig {
    return {
      hasBackdrop: true,
      backdropClass: 'cdk-backdrop',
      panelClass: 'cdk-panel-popup',
      positionStrategy: null,
    };
  }

}
