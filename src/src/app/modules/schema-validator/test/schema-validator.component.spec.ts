import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { IEntity } from '../../models/entity-group';
import { SchemaValidatorComponent } from '../schema-validator.component';
import { ValidatorService } from '../service/validator.service';

describe('SchemaValidatorComponent', () => {

  const mockEntityGroup: IEntity[] = [{
    name: "",
    id: 1,
    endpoint: [{
      type: "",
      name: "",
      id: 1,
      validation: {
        request: {
          type: "",
          required: [""],
          properties: {}
        },
        response: {
          type: "",
          required: [""],
          properties: {}
        }
      }
    }]
  }]

  const mockValidate = true
  const mockValidationErrors = ["data must have required property 'id'", "data must have required property 'type'"]

  let component: SchemaValidatorComponent;
  let fixture: ComponentFixture<SchemaValidatorComponent>;
  let validatorService = jasmine.createSpyObj('ValidatorService', {
    getEntityGroups: mockEntityGroup,
    validate: mockValidate
  }, {
    validationErrors: mockValidationErrors
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchemaValidatorComponent],
      providers: [{ provide: ValidatorService, useValue: validatorService }, FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SchemaValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function detectChanges(): void {
    fixture.detectChanges()
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should showResult and isValid to be true when checkValidationResult method is called', () => {
    expect(component.isValid).toBeFalse()

    component.checkValidationResult(validatorService.validate())
    detectChanges()

    expect(component.showResult).toBeTrue()
    expect(component.isValid).toBeTrue()
  })

  it('should isValid to be false when checkValidationResult method is called', () => {
    expect(component.isValid).toBeFalse()
    const validate = jasmine.createSpy('ValidatorService', validatorService.validate()).and.returnValue(false)
    component.checkValidationResult(validate())
    expect(component.isValid).toBeFalse()
    expect(component.getErrors).toEqual(validatorService.getValidationErrors)
  })

  it('should isValid to be true if result is valid', () => {
    component.checkValidationResult(true)
    expect(component.isValid).toBeTrue()
  })

  it('should isValid to be false if result is invalid', () => {
    component.checkValidationResult(false)
    expect(component.isValid).toBeFalse()
  })

  it('should return same value the service method', () => {
    expect(component.getEntityGroups).toEqual(validatorService.getEntityGroups())
  })

  it("should endpointIdAndEntityId to be invalid if value is null or undefined", () => {
    const controlEndpointIdAndEntityId = component.form.get('endpointIdAndEntityId')
    controlEndpointIdAndEntityId?.setValue(null)
    detectChanges()

    expect(controlEndpointIdAndEntityId?.valid).toBeFalsy()

    controlEndpointIdAndEntityId?.setValue(undefined)
    detectChanges()

    expect(controlEndpointIdAndEntityId?.valid).toBeFalsy()
  })

  it("should endpointIdAndEntityId to be valid if expected value is correct", () => {
    const correctValue = [0, 1]
    const controlEndpointIdAndEntityId = component.form.get('endpointIdAndEntityId')
    controlEndpointIdAndEntityId?.setValue(correctValue)
    detectChanges()

    expect(controlEndpointIdAndEntityId?.valid).toBeTruthy()
  })

  it("should solicitationType to be invalid if value is null or undefined", () => {
    const controlSolicitationType = component.form.get('solicitationType')
    controlSolicitationType?.setValue(null)
    detectChanges()
    expect(controlSolicitationType?.valid).toBeFalsy()

    controlSolicitationType?.setValue(undefined)
    detectChanges()
    expect(controlSolicitationType?.valid).toBeFalsy()
  })

  it("should solicitationType to be valid if expected value is correct", () => {
    const correctValue = 1
    const controlSolicitationType = component.form.get('solicitationType')
    controlSolicitationType?.setValue(correctValue)
    detectChanges()
    expect(controlSolicitationType?.valid).toBeTruthy()
  })

  it("should json to be invalid if value is null or undefined", () => {
    const controlJson = component.form.get('json')
    controlJson?.setValue(null)
    detectChanges()
    expect(controlJson?.valid).toBeFalsy()

    controlJson?.setValue(undefined)
    detectChanges()
    expect(controlJson?.valid).toBeFalsy()
  })
});
