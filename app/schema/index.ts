import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const schema = zfd.formData({
  image: z.instanceof(File),
  name: z.string().min(4),
});
