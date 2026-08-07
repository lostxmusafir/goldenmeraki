import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud, X, ArrowUpDown, RefreshCw, Trash2, Image as ImageIcon } from 'lucide-react';
import { productService } from '../../services/product.service';

export interface ProductImageItem {
  id: string; // local temporary id or image url
  url: string;
  file?: File; // present only for new unsaved images
  isUploading?: boolean;
}

interface ProductImagesManagerProps {
  productId?: string; // empty if adding a new product
  images: ProductImageItem[];
  onChange: (images: ProductImageItem[]) => void;
  onRefreshProduct?: () => void;
}

export function ProductImagesManager({
  productId,
  images,
  onChange,
  onRefreshProduct,
}: ProductImagesManagerProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(productId);

  // File Validation
  const validateFile = (file: File): string | null => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      return `File "${file.name}" has an invalid extension. Only jpg, jpeg, png, and webp are allowed.`;
    }
    if (file.size > 10 * 1024 * 1024) {
      return `File "${file.name}" exceeds the 10 MB limit.`;
    }
    return null;
  };

  // Add new files (Upload if Edit mode, otherwise add to local state)
  const handleFiles = async (filesList: FileList) => {
    setGlobalError(null);
    const newItems: ProductImageItem[] = [];
    
    // Validate all files first
    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      const err = validateFile(file);
      if (err) {
        setGlobalError(err);
        return;
      }
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        url: URL.createObjectURL(file),
        file,
      });
    }

    if (isEdit && productId) {
      // In Edit Mode, upload immediately
      let currentImages = [...images];
      for (const item of newItems) {
        if (!item.file) continue;
        
        // Add temporary uploading state
        const tempId = item.id;
        const tempItem: ProductImageItem = {
          id: tempId,
          url: item.url,
          isUploading: true,
        };
        onChange([...currentImages, tempItem]);

        try {
          const updatedProduct = await productService.uploadImage(productId, item.file);
          // Refresh from server
          if (onRefreshProduct) {
            onRefreshProduct();
          } else {
            // Update local URL mapping
            const serverUrls = updatedProduct.images || [];
            const newServerUrl = serverUrls[serverUrls.length - 1];
            currentImages = [
              ...currentImages.filter(img => img.id !== tempId),
              { id: newServerUrl, url: newServerUrl }
            ];
            onChange(currentImages);
          }
        } catch (err: any) {
          setGlobalError(err.response?.data?.message || err.message || 'Failed to upload image');
          // Remove the temporary uploading item on failure
          onChange(currentImages.filter(img => img.id !== tempId));
        }
      }
    } else {
      // In Create Mode, just add to local state
      onChange([...images, ...newItems]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Drag and Drop Zone events
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Replace Image
  const handleReplaceClick = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target?.files?.[0];
      if (!file) return;

      const err = validateFile(file);
      if (err) {
        setGlobalError(err);
        return;
      }

      const targetItem = images[index];

      if (isEdit && productId) {
        // Edit mode: upload and replace immediately
        const updatedItems = [...images];
        updatedItems[index] = { ...targetItem, isUploading: true };
        onChange(updatedItems);

        try {
          const updatedProduct = await productService.replaceImage(productId, targetItem.url, file);
          if (onRefreshProduct) {
            onRefreshProduct();
          } else {
            const serverUrls = updatedProduct.images || [];
            const replacedUrl = serverUrls[index] || targetItem.url;
            updatedItems[index] = { id: replacedUrl, url: replacedUrl };
            onChange(updatedItems);
          }
        } catch (err: any) {
          setGlobalError(err.response?.data?.message || err.message || 'Failed to replace image');
          // Revert upload state
          updatedItems[index] = { ...targetItem, isUploading: false };
          onChange(updatedItems);
        }
      } else {
        // Create mode: update local file
        const updatedItems = [...images];
        updatedItems[index] = {
          ...targetItem,
          url: URL.createObjectURL(file),
          file,
        };
        onChange(updatedItems);
      }
    };
    input.click();
  };

  // Delete Image
  const handleDeleteClick = async (index: number) => {
    setGlobalError(null);
    const targetItem = images[index];

    if (isEdit && productId) {
      // Edit mode: delete immediately
      const updatedItems = [...images];
      updatedItems[index] = { ...targetItem, isUploading: true };
      onChange(updatedItems);

      try {
        await productService.deleteImage(productId, targetItem.url);
        if (onRefreshProduct) {
          onRefreshProduct();
        } else {
          onChange(images.filter((_, idx) => idx !== index));
        }
      } catch (err: any) {
        setGlobalError(err.response?.data?.message || err.message || 'Failed to delete image');
        updatedItems[index] = { ...targetItem, isUploading: false };
        onChange(updatedItems);
      }
    } else {
      // Create mode: remove from local array
      onChange(images.filter((_, idx) => idx !== index));
    }
  };

  // HTML5 Drag and Drop for Reordering
  const handleItemDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleItemDragOver = (e: DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
  };

  const handleItemDrop = async (e: DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reordered = [...images];
    const [draggedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);
    onChange(reordered);
    setDraggedIndex(null);

    if (isEdit && productId) {
      // Update reordered list immediately in edit mode
      try {
        const reorderedUrls = reordered.map(img => img.url);
        await productService.reorderImages(productId, reorderedUrls);
        if (onRefreshProduct) onRefreshProduct();
      } catch (err: any) {
        setGlobalError(err.response?.data?.message || err.message || 'Failed to reorder images');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Images</label>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Upload one or multiple images (jpg, jpeg, png, webp). Max size: 10 MB per image. Drag and drop cards to reorder.
        </p>
      </div>

      {globalError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400">
          {globalError}
        </div>
      )}

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[140px] ${
          isDragOver
            ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/10'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
        }`}
      >
        <UploadCloud className="w-8 h-8 text-amber-500 mb-2" />
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Drag & drop images here, or <span className="text-amber-600">click to browse</span>
        </p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((item, index) => (
            <div
              key={item.id}
              draggable={!item.isUploading}
              onDragStart={() => handleItemDragStart(index)}
              onDragOver={(e) => handleItemDragOver(e, index)}
              onDrop={(e) => handleItemDrop(e, index)}
              className={`relative group rounded-xl overflow-hidden border bg-slate-50 dark:bg-slate-900 shadow-sm flex flex-col justify-between select-none cursor-move transition ${
                draggedIndex === index ? 'opacity-40 scale-95 border-amber-500' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Image Preview */}
              <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-950">
                <img
                  src={item.url}
                  alt={`Product Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Index Badge */}
                <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  #{index + 1}
                </div>

                {/* Uploading overlay */}
                {item.isUploading && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white text-[10px] font-semibold gap-1.5">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex border-t border-slate-200 dark:border-slate-800 p-1.5 gap-1 justify-between bg-white dark:bg-slate-900">
                <button
                  type="button"
                  title="Replace image"
                  disabled={item.isUploading}
                  onClick={() => handleReplaceClick(index)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition disabled:opacity-50"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Drag handles to reorder"
                  className="p-1.5 rounded-lg text-slate-400 cursor-move"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Delete image"
                  disabled={item.isUploading}
                  onClick={() => handleDeleteClick(index)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 transition disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
