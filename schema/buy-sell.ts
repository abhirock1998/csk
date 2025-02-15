import { z } from "zod";

const AllowedValues = ["BUY", "SELL"];

export const buySellFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(
      /^\+\d{1,4}\s\d{6,14}$/,
      "Phone must include dial code (e.g., +1 1234567890)"
    ),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  message: z.string().optional(),
  intendFor: z.string().optional(),
});

export type BuySellFormType = z.infer<typeof buySellFormSchema>;
