import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEntity, IEndpoint } from '../models/entity-group';
import { IFormSubmit } from '../models/form-submit';
import { TypeSolicitationEnum } from '../models/enums/type-solicitation';
import { IMyErrorObject, ValidatorService } from './service/validator.service';
import { HTTPMethodEnum } from '../models/enums/http-method';
import { ITypeSolicitation } from '../models/type-solicitation';

@Component({
  selector: 'app-schema-validator',
  templateUrl: './schema-validator.component.html',
  styleUrls: ['./schema-validator.component.scss']
})
export class SchemaValidatorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: ValidatorService) {
    this.form = this.formBuilder.group({
      endpointIdAndEntityId: [undefined, [Validators.nullValidator, Validators.required]],
      solicitationType: [TypeSolicitationEnum.Response, [Validators.nullValidator, Validators.required]],
      json: [undefined, [Validators.nullValidator, Validators.required]]
    });
  }

  readonly NO_ERRORS_MESSAGE?: string = "No errors found. JSON validates against the schema.";

  readonly form: FormGroup<IFormSubmit>;
  get formControls() { return this.form.controls; }

  showResult: boolean = false;
  isValid: boolean = false;

  selectedEndpoint: { endpoint: string, type: string } = {
    endpoint: "",
    type: ""
  };

  private errors: any[] | IMyErrorObject[] = [];
  get getErrors(): any[] | IMyErrorObject[] { return this.errors; }

  private solicitationTypes: ITypeSolicitation[] = [{ name: (TypeSolicitationEnum)[TypeSolicitationEnum.Request], id: TypeSolicitationEnum.Request }, { name: (TypeSolicitationEnum)[TypeSolicitationEnum.Response], id: TypeSolicitationEnum.Response }];
  get getSolicitationTypes(): ITypeSolicitation[] { return this.solicitationTypes; }

  private entityGroups?: IEntity[];
  get getEntityGroups(): IEntity[] | undefined { return this.entityGroups; }

  ngOnInit(): void {
    this.populateEntityGroups()
  }

  onSubmit(): void {
    const { solicitationEndpointId, solicitationEntityId } = this.splitFormValues(this.formControls.endpointIdAndEntityId.value)
    const result = this.service.validate(this.formControls.json.value, this.formControls.solicitationType.value, solicitationEndpointId, solicitationEntityId);
    this.checkValidationResult(result);
  }

  checkValidationResult(result: boolean): void {
    this.showResult = true
    if (result) {
      this.isValid = true
      return
    }
    this.isValid = false
    this.errors = this.service.getValidationErrorsMessages
  }

  populateEntityGroups(): void {
    this.entityGroups = this.service.getEntityGroups()
  }

  splitFormValues(endpointIdAndEntityId: Array<number>): { solicitationEndpointId: number, solicitationEntityId: number, } {
    const INDEX_ENTITY: number = 0
    const INDEX_ENDPOINT: number = 1

    let solicitationEntityId = endpointIdAndEntityId[INDEX_ENTITY]
    let solicitationEndpointId = endpointIdAndEntityId[INDEX_ENDPOINT]

    return { solicitationEndpointId, solicitationEntityId }
  }

  checkIfSolicitationTypeIsValid(): boolean {
    return this.formControls.solicitationType.invalid && (this.formControls.solicitationType.touched || this.formControls.solicitationType.dirty)
  }

  setSelectedEndpoint(endpoint: IEndpoint): void {
    this.selectedEndpoint = {
      endpoint: endpoint.name,
      type: endpoint.type
    }
    this.disableSolicitationTypeButton(this.isGet(endpoint.type))
  }

  isGet(endpointType: string): boolean {
    return endpointType === HTTPMethodEnum.GET
  }

  disableSolicitationTypeButton(isGet: boolean): void {
    if (isGet) {
      this.formControls.solicitationType.setValue(TypeSolicitationEnum.Response)
      this.formControls.solicitationType.disable()
      return
    }
    this.enableSolicitationTypeButton()
  }

  enableSolicitationTypeButton(): void {
    this.formControls.solicitationType.enable()
  }
}
