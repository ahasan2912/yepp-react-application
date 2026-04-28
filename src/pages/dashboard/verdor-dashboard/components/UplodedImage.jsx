import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const UploadedImage = ({ setImagesFiles, getAllImages, setValue, imageError, setImageError, className = "w-full md:w-1/2" }) => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const func = () => {
      if (getAllImages && getAllImages.length > 0) {
        setImages(getAllImages);
      }
    }
    func();
  }, [getAllImages]);


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 3) return;
    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newUrls]);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setImagesFiles((prev) => [...prev, ...selectedFiles]);
    setImageError?.("");

    e.target.value = null;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const removeImage = (index) => {
    if (files[index]) URL.revokeObjectURL(images[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImagesFiles((prev) => prev.filter((_, i) => i !== index));

    setCurrentIndex((prev) =>
      prev > 0 && prev === images.length - 1 ? prev - 1 : prev
    );
  };

  const notMatch = getAllImages?.filter(value => !images.includes(value));
  setValue("deletedImages", notMatch);

  return (
    <div className={className}>
      <h1 className="text-xl font-bold text-primary">Media</h1>
      <p className="mt-1 text-sm font-medium text-[#737373]">
        You can upload up to 3 images to showcase your deal.
      </p>

      <div className={`relative mt-5 flex h-72 cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-slate-50 shadow-inner transition-all ${imageError ? "border-red-500" : "border-slate-200 hover:border-[#2B9DAE]/50 hover:bg-white"}`}>
        {images.length > 0 ? (
          <>
            <img
              src={images[currentIndex]}
              alt="preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 rounded-full bg-white/80 p-2 text-[#262626] shadow-md transition-all hover:bg-white active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 rounded-full bg-white/80 p-2 text-[#262626] shadow-md transition-all hover:bg-white active:scale-95"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-3 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="rounded-full bg-white p-4 text-[#262626] shadow-md transition-all hover:text-primary active:scale-95"
            >
              <Plus size={32} />
            </button>
            <span className="text-sm font-medium text-[#737373]">Upload Photos</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative">
            <div
              onClick={() => images[index] && setCurrentIndex(index)}
              className={`flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-lg border transition-all
                ${images[index] ? "border-primary bg-white shadow-sm" : "border-slate-200 bg-slate-50"}
                ${currentIndex === index ? "scale-105 ring-2 ring-green-600" : ""}
              `}
            >
              {images[index] ? (
                <img
                  src={images[index]}
                  alt="thumb"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-300 text-xs">{index + 1}</span>
              )}
            </div>

            {images[index] && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white shadow-sm transition-all hover:bg-red-600 active:scale-90"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}

        {images.length > 0 && images.length < 3 && (
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-primary bg-white text-primary transition-all hover:bg-primary/5 active:scale-95"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/*"
      />
      {imageError && (
        <p className="mb-2 mt-2 text-sm text-red-500">
          {imageError}
        </p>
      )}
    </div>
  );
};

export default UploadedImage; 
