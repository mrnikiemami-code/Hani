import { apiGet } from "@/lib/hani/api";
import { sessionGet } from "@/lib/hani/server-api";
import type {
  CheckoutOrder,
  CheckoutProduct
} from "../domain/checkout";

export async function getCheckoutProduct(
  productId: string,
  locale: string
): Promise<CheckoutProduct | null> {
  return apiGet<CheckoutProduct>(
    `/market/v1/products/${encodeURIComponent(productId)}/compare?locale=${encodeURIComponent(locale)}`
  );
}

export type CheckoutPaymentStatus = {
  paymentIntentId: string;
  orderId: string;
  status: string;
  redirectUrl: string | null;
};

export async function getPaymentIntent(
  paymentIntentId: string
): Promise<CheckoutPaymentStatus | null> {
  const result = await sessionGet<CheckoutPaymentStatus>(
    `/market/v1/payments/intents/${encodeURIComponent(paymentIntentId)}`
  );
  return result.status === 200 ? result.data : null;
}

export async function getOrder(orderId: string): Promise<CheckoutOrder | null> {
  const result = await sessionGet<CheckoutOrder>(
    `/market/v1/orders/${encodeURIComponent(orderId)}`
  );
  return result.status === 200 ? result.data : null;
}
