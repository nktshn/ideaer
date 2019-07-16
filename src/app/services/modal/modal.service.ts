import { Injectable, Injector, InjectionToken } from '@angular/core';
import { Overlay, ComponentType, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

/**
 * provides creating modal windows
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public injectorTokens: WeakMap<InjectionToken<string>, any> = new WeakMap();

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) { }

  openModal<CType, InjectingDataType>(
    component: ComponentType<CType>,
    data?: InjectingDataType,
    config?: OverlayConfig
  ): OverlayRef {
    const resultConfig = config || this.getDefaultModalOverlayConfig();
    const overlayRef = this.overlay.create(resultConfig);
    const componentPortal = new ComponentPortal(component, null, this.createInjector<InjectingDataType>(data, 'idea'));
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

  private createInjector<DataType>(dataToPass: DataType, tokenName: string): PortalInjector {
    this.injectorTokens.set(INJECTION_TOKENS[tokenName], dataToPass);
    return new PortalInjector(this.injector, this.injectorTokens);
  }
}

export const INJECTION_TOKENS: { [tokenName: string]: InjectionToken<string> } = {
  idea: new InjectionToken<string>('idea'),
};

