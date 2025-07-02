import { products } from "@wix/stores";
import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";

interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutaion = useAddItemToCart();

  return (
    <LoadingButton
      onClick={() => mutaion.mutate({ product, selectedOptions, quantity })}
      loading={mutaion.isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCartIcon />
      Add to cart
    </LoadingButton>
  );
}
