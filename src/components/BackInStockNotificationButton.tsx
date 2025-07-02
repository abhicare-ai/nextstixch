import { Button, buttonVariants } from "./ui/button";

import { VariantProps } from "class-variance-authority";
import { products } from "@wix/stores";
import { useCreateBackInStockNotificationRequest } from "@/hooks/back-in-stock";
import { z } from "zod";
import { requiredString } from "@/lib/vallidations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { env } from "@/env";

const formaSchema = z.object({
  email: requiredString.email(),
});

type FromValues = z.infer<typeof formaSchema>;
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface BackInStockNotificationButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButtonProps) {
  const form = useForm<FromValues>({
    resolver: zodResolver(formaSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutaion = useCreateBackInStockNotificationRequest();
  async function onSubmit({ email }: FromValues) {
    mutaion.mutate({
      email,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
      product,
      selectedOptions,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Notify when available</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notify when available</DialogTitle>
          <DialogDescription>
            {" "}
            Enter your email address and we&apos;ll let you know when this
            product is back in stock.{" "}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={mutaion.isPending}>
              Notify me
            </LoadingButton>
          </form>
        </Form>
        {mutaion.isSuccess && (
          <div className="py-2.5 text-green-500">
            Thank you! We&apos;ll notify you when this product is back in stock.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
