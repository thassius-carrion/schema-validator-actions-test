import { FormControl } from "@angular/forms";

export interface IFormSubmit {
    endpointIdAndEntityId: FormControl
    solicitationType: FormControl
    json: FormControl
}