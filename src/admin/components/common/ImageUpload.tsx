import { useState, type ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState(value || '');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      onChange(urlInput);
      setShowUrlInput(false);
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
              onChange('');
              setUrlInput('');
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition">
          {!showUrlInput ? (
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
              <div className="flex gap-2">
                <label
                  htmlFor="file-upload-input"
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg cursor-pointer transition"
                >
                  Choose File
                </label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Paste URL
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              />
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  className="px-3 py-1 text-xs font-semibold bg-amber-500 text-white rounded-lg"
                >
                  Save URL
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(false)}
                  className="px-3 py-1 text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
