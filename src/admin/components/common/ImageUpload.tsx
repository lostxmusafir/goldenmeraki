import { type ChangeEvent } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, file?: File) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl, file);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</label>}

      {value ? (
        <div className="relative group w-36 h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <img src={value} alt="Upload preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => {
              onChange('', undefined);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition">
          <div className="flex flex-col items-center">
            <UploadCloud className="w-8 h-8 text-amber-500 mb-2" />
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Drag & drop or <span className="font-semibold text-amber-600">click to browse</span>
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="px-4 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg cursor-pointer transition shadow-sm"
            >
              Choose File
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
