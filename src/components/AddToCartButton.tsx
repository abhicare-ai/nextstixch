
import { products } from "@wix/stores";
import { Button } from "./ui/button";
import { addToCart } from "@/wix-api/cart";
import { wixBrawsorClient } from "@/lib/wix-client.brawosor";

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

  return (
    <Button
    className={className}
      onClick={() =>
       addToCart(
        wixBrawsorClient,
        {
        product,
        selectedOptions,
        quantity
       })
      }
      
      {...props}
    >
    
      Add to cart
    </Button>
  );
}