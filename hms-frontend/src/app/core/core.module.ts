import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedStateService } from './services/shared-state.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SharedStateService,
        // Global services, interceptors, guards go here
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}
