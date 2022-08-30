import { ISchema, IValidation } from 'src/app/modules/models/entity-group';
import { TypeSolicitationEnum } from 'src/app/modules/models/enums/type-solicitation';
import { SchemaService } from '../schema.service';

describe('SchemaService', () => {
  let schemaService: SchemaService;
  
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

  beforeEach(() => {
    schemaService = new SchemaService();
  });

  it('should be created', () => {
    expect(schemaService).toBeTruthy();
  });

  it("should return the Request type when getSchema method is called", () => {
    spyOn(schemaService, 'getSchema').and.returnValue(mockValidation.request)
    expect(schemaService.getSchema(TypeSolicitationEnum.Request, 0, 0)).toEqual(mockValidation.request)
  })

  it("should return the Response type when getSchema method is called", () => {
    spyOn(schemaService, 'getSchema').and.returnValue(mockValidation.response)
    expect(schemaService.getSchema(TypeSolicitationEnum.Response, 0, 0)).toEqual(mockValidation.response)
  })

  it("should return Undefined when the getSchema method is called", () => {
    spyOn(schemaService, 'getSchema').and.returnValue(undefined)
    expect(schemaService.getSchema(3, 0, 0)).toBeUndefined();
  })

  it("should return an object of type IValidation when the searchSchema method is called", () => {
    spyOn(schemaService, 'searchSchema').and.returnValue(mockValidation)
    expect(schemaService.searchSchema(0, 0)).toEqual(mockValidation)
  })

  it("should return Undefined when the searchSchema method is called", () => {
    spyOn(schemaService, 'searchSchema').and.returnValue(undefined)
    expect(schemaService.searchSchema(0, 0)).toBeUndefined();
  })

});
