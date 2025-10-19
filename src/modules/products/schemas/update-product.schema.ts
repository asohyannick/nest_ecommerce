import * as yup from 'yup';

export const updateProductSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  price: yup.number().min(0, 'Price cannot be negative').optional(),
  stock: yup.number().min(0, 'Stock cannot be negative').optional(),
  isFeatured: yup.boolean().optional(),
  images: yup.array().of(yup.string()).optional(),
  category: yup.string().optional(),
});
