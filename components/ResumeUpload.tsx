import { File, UploadCloud, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';

import LoadingWapper from './LoadingWapper';

function ResumeUpload({
  saving,
  onChange,
  value,
}: {
  saving: boolean;
  onChange: (_x: File | null) => void;
  value: File | null;
}) {
  const [file, setFile] = useState<File | null>(value);
  const [dragActive, setDragActive] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <LoadingWapper loading={saving}>
      <div className='flex flex-col gap-1'>
        {!file ? (
          <div
            className={`relative mt-2 flex justify-center rounded-lg border border-dashed bg-muted ${
              dragActive ? 'bg-background' : 'bg-background'
            } px-6 py-6`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className='flex w-full flex-col items-center justify-center gap-2 text-center'>
              <UploadCloud
                className='h-12 w-12 text-muted-foreground'
                aria-hidden='true'
                strokeWidth={1.2}
              />
              <div>
                <div className='flex flex-row gap-2 text-sm leading-6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-primary/80'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='absolute left-0 top-0 z-20 h-full w-full cursor-pointer opacity-0'
                      onChange={handleFileChange}
                      accept='.pdf,.doc,.docx'
                    />
                  </label>

                  <p className='text-muted-foreground'> or drag and drop</p>
                </div>
                <p className='text-xs leading-5 text-muted-foreground'>
                  PDF, DOC up to 10MB
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-2'>
            <div className='flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-4 shadow-none'>
              <div className='flex items-center gap-3'>
                <File
                  size={24}
                  strokeWidth={1.5}
                  className='text-muted-foreground'
                />
                <span className='text-md truncate'>{value?.name}</span>
              </div>

              <Button
                type='button'
                variant='ghost'
                onClick={() => {
                  onChange(null);
                  setFile(null);
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
        )}
      </div>
    </LoadingWapper>
  );
}

export default ResumeUpload;
