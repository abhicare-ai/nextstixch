import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import Budge from "./ui/budge";
import { formatCurrency } from "@/lib/utils";
import DiscountBudge from "./DiscountBudge";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link href={`/products/${product.slug}`} className="bg-card h-full border">
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={product.name}
          //   scaleToFill={false}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Budge>{product.ribbon}</Budge>}
          {product.discount && <DiscountBudge data={product.discount} />}
          <Budge className="bg-secondary text-secondary-foreground font-semibold">
            {getFromatedPrice(product)}
          </Budge>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>

        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
}

function getFromatedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
