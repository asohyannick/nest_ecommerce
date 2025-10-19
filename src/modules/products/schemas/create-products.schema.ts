import * as yup from 'yup';

export const createProductSchema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Product description is required'),
  price: yup
    .number()
    .required('Product price is required')
    .min(0, 'Price cannot be negative'),
  stock: yup
    .number()
    .required('Stock is required')
    .min(0, 'Stock cannot be negative'),
  isFeatured: yup.boolean().optional(),
  images: yup.array().of(yup.string()).optional(),
  category: yup.string().optional(),
});
