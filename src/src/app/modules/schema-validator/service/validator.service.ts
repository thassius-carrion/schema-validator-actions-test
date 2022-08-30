import { Injectable } from '@angular/core';
import { IEntity } from '../../models/entity-group';
import { SchemaService } from './schema.service';
import { resource } from '../../../resources/routes'
import JsonValidator, { ErrorObject } from 'ajv';
import JsonValidatorAdditionalFormats from 'ajv-formats';

export interface IMyErrorObject {
    message: string
}

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

    constructor(private schemaService: SchemaService) { }

    private readonly JSON_INVALID_MESSAGE: string = "Error parsing JSON. JSON data is incomplete.";
    private readonly JSON_SCHEMA_INVALID_MESSAGE: string = "Schema invalid or Schema not provided for the route selected.";

    private validationErrors: ErrorObject[] | IMyErrorObject[] = [];
    get getValidationErrorsMessages(): ErrorObject[] | IMyErrorObject[] {
        return this.validationErrors
    }

    getEntityGroups(): IEntity[] {
        let entityGroups = [];

        for (let index = 0; index < resource.entities.length; index++) {
            entityGroups[index] = resource.entities[index];
        }
        return entityGroups
    }

    validate(solicitationJson: string, solicitationType: number, solicitationEndpointId: number, solicitationEntityId: number): boolean {
        let json;

        try { json = JSON.parse(solicitationJson) }
        catch {
            this.validationErrors = [{
                message: this.JSON_INVALID_MESSAGE
            }]
            return false
        }

        let schema = this.schemaService.getSchema(solicitationType, solicitationEndpointId, solicitationEntityId);
        return this.validateJsonToSchema(json, schema);
    }

    validateJsonToSchema(json: JSON, schema: any): boolean {
        try {
            const jsonValidator = new JsonValidator({ allErrors: true })
            JsonValidatorAdditionalFormats(jsonValidator);

            const validate = jsonValidator.compile(schema);
            const isValid: boolean = validate(json)

            if (validate.errors == null)
                return isValid

            this.validationErrors = validate.errors
            return isValid
        }
        catch (e) {

            console.log("Error", e)
            this.validationErrors = [{
                message: this.JSON_SCHEMA_INVALID_MESSAGE
            }]
            return false;
        }
    }
}
