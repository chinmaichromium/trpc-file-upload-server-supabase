import { Readable } from 'stream';

import { schema } from '@/app/schema';

import { createPublicClient } from '../../db';
import { publicProcedure } from '../trpc';

const bucketName = 'files';

export const upload = publicProcedure
  .input(schema)
  .mutation(async ({ input: { image, name } }) => {
    const supabase = createPublicClient();
    const fileExt = image.name.split('.').pop() as string;
    const fileName = `${Date.now()}.${fileExt}`;
    const resUpload = await func(image, fileName);
    const resFiles = (
      await supabase
        .from('files')
        .insert({
          name,
          url: resUpload.url,
          extension: fileExt,
        })
        .select()
        .single()
        .throwOnError()
    ).data;
    return resFiles;
  });

export const func = async (file: File, fileName: string) => {
  const fileStream = Readable.fromWeb(
    // @ts-expect-error - unsure why this is not working
    file.stream(),
  );

  const contentType = file.type;

  const supabase = createPublicClient();

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileStream, {
      cacheControl: '3600',
      upsert: false,
      duplex: 'half',
      contentType,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return {
    url: publicUrl,
    name: file.name,
  };
};
