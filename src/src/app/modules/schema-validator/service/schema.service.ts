import { Injectable } from '@angular/core';
import { resource } from '../../../resources/routes'
import { ISchema, IValidation } from '../../models/entity-group';
import { TypeSolicitationEnum } from '../../models/enums/type-solicitation';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor() { }

  getSchema(solicitationType: number, endpointId: number, entityId: number): ISchema | undefined {
    let schema = this.searchSchema(endpointId, entityId)
    let typeIsResponse: boolean = solicitationType == TypeSolicitationEnum.Response;

    return typeIsResponse ? schema?.response : schema?.request;
  }

  searchSchema(endpointId: number, entityId: number): IValidation | undefined {
    const entity = resource.entities.find(entity => entity.id == entityId);
    return entity?.endpoint.find(endpoint => endpoint.id == endpointId)?.validation;
  }
}

