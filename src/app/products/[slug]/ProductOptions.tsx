import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductDetailsProps {
  product: products.Product;
  selectedOption: Record<string, string>;

  setSelectedOptions: (option: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOption,
  setSelectedOptions,
}: ProductDetailsProps) {
  return (
    <div className="space-y-2.5">
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className="space-y-1.5">
          <legend>
            <Label asChild>
              <span>{option.name}</span>
            </Label>
          </legend>

          <div className="flex flex-wrap items-center gap-1.5">
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                <input
                  type="radio"
                  id={choice.description}
                  name={option.name}
                  value={choice.description}
                  checked={
                    selectedOption[option.name || ""] === choice.description
                  }
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOption,
                      [option.name || ""]: choice.description || "",
                    })
                  }
                  className="peer hidden"
                />
                <Label
                  htmlFor={choice.description}
                  className={cn(
                    "peer-checked:border-primary flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border p-2",
                    !checkInStock(product, {
                      ...selectedOption,
                      [option.name || ""]: choice.description || "",
                    }) && "opacity-50",
                  )}
                >
                  {option.optionType === products.OptionType.color && (
                    <span
                      className="size-4 rounded-full border"
                      style={{ backgroundColor: choice.value }}
                    ></span>
                  )}
                  <span>{choice.description}</span>
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
