"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export const ActiveToggleDropdownItem = ({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};

export const DeleteDropdownItem = ({
  id,
  orders,
}: {
  id: string;
  orders: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="bg-destructive text-destructive-foreground focus:text-destructive-foreground  focus:bg-destructive/80 focus:cursor-pointer"
      disabled={orders || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id, orders);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};

const ErrorMessage = ({ error }: { error: string[] }) => {
  return <div className="text-destructive">{error}</div>;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
