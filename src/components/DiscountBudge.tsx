import { products } from "@wix/stores";
import Budge from "./ui/budge";

interface DiscountBudgeProps {
  data: products.Discount;
}

export default function DiscountBudge({ data }: DiscountBudgeProps) {
  if (data.type !== "PERCENT") {
    return null;
  }
  return <Budge>-{data.value}%</Budge>;
}
