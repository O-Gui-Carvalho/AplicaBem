import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);
        onFileSelect?.(file);
    }, [onFileSelect])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false, accept: {'application/pdf' : ['.pdf']}, maxSize: 20 * 1024 * 1024,})

  return (
    <div className='w-full bg-[#1f1f1f] p-8'>
        <div {...getRootProps()} role='button' tabIndex={0}>
            <input {...getInputProps()} />
            
            <div className="space-y-4 cursor-pointer">
                {selectedFile ? (
                    <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                        <img src="/images/pdf.png" alt="PDF" className="size-10" />
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="text-sm font-medium text-white truncate max-w-xs">
                                {selectedFile.name}
                                </p>
                                <p className="text-sm text-white">
                                    {formatSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>
                        <button className='p-2 cursor-pointer' onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            onFileSelect?.(null);
                        }}>
                            <img src="/icons/cross.svg" alt="Remove File" className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                            <img src="/icons/info.svg" alt="upload" className="size-20" />
                        </div>
                        <p className="text-lg text-white">
                            <span className="font-semibold">
                                Clique para enviar
                            </span> ou arraste e solte
                        </p>
                        <p className="text-lg text-[#808080]">PDF (máx 20mb)</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default FileUploader