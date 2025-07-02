import { wixBrawsorClient } from "@/lib/wix-client.brawosor";
import {
  addToCart,
  AddToCartValue,
  getCart,
  removeCartItems,
  updateCartItemQuantity,
  UpdateCartItemQuantityValue,
} from "@/wix-api/cart";
import {
  MutationKey,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getCart(wixBrawsorClient),
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: AddToCartValue) => addToCart(wixBrawsorClient, value),
    onSuccess(data) {
      toast.success("Item added to cart");
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to add item to cart. Please try again.");
    },
  });
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();
  const mutaionKey: MutationKey = ["useUpdatedCartItemQuantity"];
  return useMutation({
    mutationKey: mutaionKey,
    mutationFn: (value: UpdateCartItemQuantityValue) =>
      updateCartItemQuantity(wixBrawsorClient, value),
    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);
      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((lineItem) =>
          lineItem._id === productId
            ? { ...lineItem, quantity: newQuantity }
            : lineItem,
        ),
      }));
      return { previousState };
    },
    onError(error, _, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    },
    onSettled() {
      if (queryClient.isMutating({ mutationKey: mutaionKey }) === 1) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      removeCartItems(wixBrawsorClient, productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.filter(
          (lineItem) => lineItem._id !== productId,
        ),
      }));

      return { previousState };
    },
    onError(error, _, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
