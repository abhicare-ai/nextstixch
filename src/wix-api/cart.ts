import { WIX_STORES_APP_ID } from "@/lib/constant";
import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

export async function getCart(wixClient: WixClient) {
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND"
    ) {
      return null;
    } else {
      throw error;
    }
  }
}

export interface AddToCartValue {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}
export async function addToCart(
  wixClient: WixClient,
  { product, selectedOptions, quantity }: AddToCartValue,
) {
  const selectedVariant = findVariant(product, selectedOptions);

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : { options: selectedOptions },
        },
        quantity,
      },
    ],
  });
}

export interface UpdateCartItemQuantityValue {
  productId: string;
  newQuantity: number;
}

export async function updateCartItemQuantity(
  wixClient: WixClient,
  { productId, newQuantity }: UpdateCartItemQuantityValue,
) {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    {
      _id: productId,
      quantity: newQuantity,
    },
  ]);
}

export async function removeCartItems(wixClient: WixClient, productId: string) {
  return wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
}
