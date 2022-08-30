export interface IResource {
    entities: IEntity[]
}

export interface IEntity {
    name: string
    id: number
    endpoint: IEndpoint[]
}

export interface IEndpoint {
    type: string
    name: string
    id: number
    validation: IValidation
}

export interface IValidation {
    request: ISchema,
    response: ISchema
}

export interface ISchema {
    type: string | null,
    required: string[] | null,
    properties: object | null
}