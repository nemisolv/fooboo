/* eslint-disable react/prop-types */
import { Fragment, useRef } from 'react';
import { BiSolidImageAdd } from 'react-icons/bi';
import { LiaTimesCircleSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';

function UploadImage({ images, setImages, ...rest }) {
  const areaDropRef = useRef(null);
  const inputFileRef = useRef(null);

  const hanldeChangeImages = (e) => {
    const files = Array.from(e.target.files);
    // before sending the images to the server, we need to check file size must be less than 2MB and files must be less than 10MB
    checkValidImage(files);
    

    // drag and drop

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result]);
      };
    });
  };

  const handleDropImages = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
      // before sending the images to the server, we need to check file size must be less than 2MB and files must be less than 10MB
    checkValidImage(files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result]);
      };
    });
  };

  const checkValidImage = (files) => {
    if (files.length > 5) {
      toast.error('You can only upload 5 images at a time', { pauseOnHover: false });
      return;
    }
    const checkSize = files.every((file) => file.size <= 1024 * 1024 * 2);
    if (!checkSize) {
      toast.error('Images must be less than 2MB', { pauseOnHover: false });
      return;
    }
    if(files.size > 10 * 1024 * 1024) {
      toast.error('Images must be less than 10MB', { pauseOnHover: false });
      return;
    }
    // we need to check the file type
    const checkType = files.every((file) => file.type.includes('image'));
    if (!checkType) {
      toast.error('You can only upload images', { pauseOnHover: false });
      return;
    }

    // we also need to check image type
    const checkImageType = files.every((file) => file.type.includes('image/jpeg') || file.type.includes('image/png' ));
    if (!checkImageType) {
      toast.error('You can only upload images with jpeg or png format', { pauseOnHover: false });
      return;
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    areaDropRef.current.classList.add('border-blue-500');
  };

  return (
    <label
      ref={areaDropRef}
      onDragOver={handleDragOver}
      onDrop={handleDropImages}
      className=" overflow-auto border border-slate-300  rounded-lg min-h-[200px] max-h-[400px] h-full block p-2 hover:bg-gray-100 bg-gray-50 cursor-pointer"
    >
      <input
        type="file"
        // name={name}
        ref={inputFileRef}
        className="hidden"
        accept="image/png,image/jpeg"
        multiple
        onChange={hanldeChangeImages}
        {...rest}
      />

      {images.length === 0 && (
        <div className=" relative h-[200px] flex-center overflow-hidden  bg-gray-200 rounded-lg ">
          <span
            className="absolute right-0 top-0 p-3"
            onClick={(e) => {
              // e.stopPropagation();
              e.preventDefault();
              setImages(null);
            }}
          >
            <LiaTimesCircleSolid size={25} />
          </span>

          <div className="flex-center flex-col gap-2">
            <span className="">
              <BiSolidImageAdd size={40} opacity={0.6} />
            </span>
            <p className="font-semibold">Add Photos/Videos</p>
            <span className="text-xs">or drag and drop</span>
          </div>
        </div>
      )}
      <div className="">
        {images.length > 0 && (
          <div
            className={`${
              images.length === 1 || images.length === 2
                ? 'preview-create-post12'
                : images.length === 3
                  ? 'preview-create-post3'
                  : images.length === 4
                    ? 'preview-create-post4'
                    : 'preview-create-post5'
            }
                      relative min-h-[200px] max-h-[430px] h-full    bg-gray-200 rounded-lg 
                `}
          >
            <span
              className="absolute right-0 top-0 p-3 text-slate-300 hover:text-slate-500"
              onClick={(e) => {
                // e.stopPropagation();
                e.preventDefault();
                setImages(null);
              }}
            >
              <LiaTimesCircleSolid size={34} />
            </span>
            {images.map((img, index) => {
              return (
                <Fragment key={index}>
                  <img src={img} className="object-cover w-full h-[200px] " alt="" />
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </label>
  );
}

export default UploadImage;
