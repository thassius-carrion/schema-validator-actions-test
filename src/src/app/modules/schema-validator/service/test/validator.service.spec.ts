import { ValidatorService } from '../validator.service';

import * as orderDetails from '../../../../resources/schemas/order/order-details.json';
import * as orderDetailsTestJson from './resource/order-details-test.json';
import { IEntity, ISchema, IValidation } from 'src/app/modules/models/entity-group';
import { EndpointIdEnum } from 'src/app/resources/endpoint-id';
import { TypeSolicitationEnum } from 'src/app/modules/models/enums/type-solicitation';

describe('ValidatorService', () => {
  let validatorService: ValidatorService;

  const mockValidSchema = orderDetails;

  let mockResponse: ISchema = {
    type: "",
    required: [""],
    properties: {}
  }
  let mockRequest: ISchema = {
    type: "",
    required: [""],
    properties: {}
  }

  let mockValidation: IValidation =
  {
    request: mockRequest,
    response: mockResponse
  }

  const mockEntityGroup: IEntity[] = [{
    name: "",
    id: 1,
    endpoint: [{
      type: "",
      name: "",
      id: 1,
      validation: mockValidation
    }]
  }]

  let schemaService = jasmine.createSpyObj('SchemaService', {
    getSchema: mockValidSchema.response
  })
  beforeEach(() => {
    validatorService = new ValidatorService(schemaService);
  });

  it('should be created', () => {
    expect(validatorService).toBeTruthy();
  });

  it("should return True for a valid json when the validateSchemaToJson method is called", () => {
    let json = JSON.parse(JSON.stringify(orderDetailsTestJson))
    expect(validatorService.validateJsonToSchema(json, schemaService.getSchema())).toBeTrue()
  });

  it("should return False for a incorrect json when the validateSchemaToJson method is called", () => {
    let incorrectJson = JSON.parse("{}");
    expect(validatorService.validateJsonToSchema(incorrectJson, schemaService.getSchema())).toBeFalse()

    
  })

  it("should return False for a invalid json when the validate method is called", () => {
    let invalidJson: string = "{12345,qwert";
    expect(validatorService.validate(invalidJson, TypeSolicitationEnum.Response, EndpointIdEnum.orderDetails, EndpointIdEnum.orderDetails)).toBeFalse();
  });

  it("should return False for a incorrect json when the validate method is called", () => {
    let incorrectJson: string = "{}";
    expect(validatorService.validate(incorrectJson, TypeSolicitationEnum.Response, EndpointIdEnum.orderDetails, EndpointIdEnum.orderDetails)).toBeFalse();
  });

  it("should return entityGroups when the getEntityGroups method is called", () => {
    spyOn(validatorService, 'getEntityGroups').and.returnValues(mockEntityGroup)
    expect(validatorService.getEntityGroups()).toEqual(mockEntityGroup);
  })
});
