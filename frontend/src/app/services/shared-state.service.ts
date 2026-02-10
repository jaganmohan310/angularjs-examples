import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedStateService {
    private saveTriggerSource = new Subject<void>();
    saveTriggered$ = this.saveTriggerSource.asObservable();

    triggerSave() {
        this.saveTriggerSource.next();
    }

    constructor() { }
}
