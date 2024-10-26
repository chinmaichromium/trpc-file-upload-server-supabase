'use client';

import { useState } from 'react';
import { type z } from 'zod';

import { schema } from '@/app/schema';
import { api } from '@/app/trpc/client';
import { Loader } from '@/components/Loader';
import ResumeUpload from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useZodFormData } from '@/components/zod-form-data';

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const form = useZodFormData({
    schema: schema,
  });

  const {
    control,
    setValue,
    clearErrors,
    formState: { isDirty },
  } = form;

  const { mutateAsync, isPending } = api.upload.useMutation({
    onError(err) {
      console.error(err);
    },
    trpc: {
      context: {
        upload: true,
      },
    },
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const data: z.infer<typeof schema> = {
        ...form.getValues(),
      };
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const res = await mutateAsync(formData);
      if (res?.url) setUrl(res.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full max-w-lg'>
      {url ? (
        <>
          <div className='mb-4 w-full'>
            <Card className='w-full border-none bg-white shadow-none'>
              <CardContent className='flex w-full flex-col gap-4'>
                <div className='flex w-full flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-sm text-gray-500'>File URL</span>
                    <a href={url} target='_blank'>
                      {url}
                    </a>
                  </div>
                  <Button
                    size={'sm'}
                    className='w-full'
                    onClick={() => {
                      setUrl(null);
                      form.reset();
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <span>Upload Another</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Form {...form}>
          <form
            className='mb-4 w-full'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className='border-none bg-white shadow-none'>
              <CardContent className='mt-6'>
                <div className='flex flex-col gap-4'>
                  <FormField
                    control={control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder='Enter file name'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name='image'
                    render={({ field: { value } }) => (
                      <FormItem>
                        <FormLabel>Upload Resume</FormLabel>
                        <FormControl>
                          <ResumeUpload
                            saving={isPending}
                            onChange={(file: File | null) => {
                              if (file) {
                                setValue('image', file);
                                clearErrors('image');
                              }
                            }}
                            value={value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className='w-full' type='submit' disabled={!isDirty}>
                    <div className='flex items-center gap-2'>
                      {isPending && <Loader />}
                      <span>Upload</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      )}
    </div>
  );
}
