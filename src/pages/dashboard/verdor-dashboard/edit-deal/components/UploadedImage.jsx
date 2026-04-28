import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import { useRef, useState } from "react";

const UploadedImage = ({ setImagesFiles }) => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 3) {
      return;
    }

    const newUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...newUrls]);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setImagesFiles((prev) => [...prev, ...selectedFiles]);

    e.target.value = null;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));

    setCurrentIndex((prev) =>
      prev > 0 && prev === images.length - 1 ? prev - 1 : prev
    );
  };

  // not used this file
  console.log(files);

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-primary text-xl font-bold">Media:</h1>
      <p className="text-[#262626] text-base font-medium">
        You can upload up to 3 images to showcase your deal.
      </p>
      <div className="relative bg-linear-to-b from-gray-100 to-gray-300 rounded-xl aspect-video flex items-center justify-center overflow-hidden mt-4 h-70">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentIndex]}
              alt="preview"
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 p-2 bg-white/40 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 p-2 bg-white/40 rounded-full"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-3 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-white p-4 rounded-full shadow"
            >
              <Plus size={32} />
            </button>
            <span className="text-gray-600">Upload Photos</span>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3 mt-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative">
            <div
              onClick={() => images[index] && setCurrentIndex(index)}
              className={`w-14 h-14 rounded-full border-2 overflow-hidden flex items-center justify-center cursor-pointer
                ${images[index]
                  ? "border-cyan-500"
                  : "border-gray-200 bg-gray-100"
                }
                ${currentIndex === index ? "scale-110" : ""}
              `}
            >
              {images[index] ? (
                <img
                  src={images[index]}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-300 text-xs">
                  {index + 1}
                </span>
              )}
            </div>

            {images[index] && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
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
            className="w-14 h-14 rounded-full border-2 border-dashed border-cyan-500 flex items-center justify-center"
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
    </div>
  );
};

export default UploadedImage;
