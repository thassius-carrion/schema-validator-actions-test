import * as _orderDetails from './schemas/order/order-details.json'
import * as _merchant from './schemas/merchant/merchant.json'
import { EntityIdEnum } from './entity-id'
import { EndpointIdEnum } from './endpoint-id'
import { IResource } from '../modules/models/entity-group'
import { HTTPMethodEnum } from '../modules/models/enums/http-method'

export const resource: IResource = {
  entities: [
    {
      name: "Order",
      id: EntityIdEnum.Order,
      endpoint: [
        {
          type: HTTPMethodEnum.GET,
          name: "/v1/orders/{orderId}",
          id: EndpointIdEnum.orderDetails,
          validation: _orderDetails
        }
      ]
    },
    {
      name: "Merchant",
      id: EntityIdEnum.Merchant,
      endpoint: [
        {
          type: HTTPMethodEnum.GET,
          name: "/v1/merchant",
          id: EndpointIdEnum.merchant,
          validation: _merchant
        }
      ]
    },
  ]
}
