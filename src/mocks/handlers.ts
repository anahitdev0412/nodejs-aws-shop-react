import { http, HttpResponse } from "msw";
import API_PATHS from "~/constants/apiPaths";
import { availableProducts, orders, products, cart } from "~/mocks/data";

export const handlers = [
  http.get(`${API_PATHS.bff}/product`, async () => {
    return HttpResponse.json(products, { status: 200 });
  }),

  http.put(`${API_PATHS.bff}/product`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.delete(`${API_PATHS.bff}/product/:id`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get(`${API_PATHS.bff}/product/available`, async () => {
    return HttpResponse.json(availableProducts, { status: 200 });
  }),

  http.get(`${API_PATHS.bff}/product/:id`, async ({ params }) => {
    const product = availableProducts.find((p) => p.id === params.id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product, { status: 200 });
  }),

  http.get(`${API_PATHS.cart}/profile/cart`, async () => {
    return HttpResponse.json(cart, { status: 200 });
  }),

  http.put(`${API_PATHS.cart}/profile/cart`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get(`${API_PATHS.order}/order`, async () => {
    return HttpResponse.json(orders, { status: 200 });
  }),

  http.put(`${API_PATHS.order}/order`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get(`${API_PATHS.order}/order/:id`, async ({ params }) => {
    const order = orders.find((p) => p.id === params.id);

    if (!order) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(order, { status: 200 });
  }),

  http.delete(`${API_PATHS.order}/order/:id`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.put(`${API_PATHS.order}/order/:id/status`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
