import Cropper from 'react-easy-crop';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark,faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import getCroppedImg from "./cropImage.jsx";
import Button from './Button.jsx'

const AvatarEditor = ({ imageSrc, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [image, setImage] = useState(imageSrc);  // State to hold the selected image

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels); // Returns base64 image string
    onSave(croppedImage);  // Pass the base64 string to parent
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Update the image state with the file's base64 string
      };
      reader.readAsDataURL(file);  // Convert image to base64
    }
  };

  return (
    <div className="fixed h-[100vh] w-[100vw] inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-[600px] border border-gray-200">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Edit Profile Picture</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-xl" title="Close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="relative w-full h-80 bg-gray-100 rounded-md overflow-hidden mb-4">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 ">
          <span>Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-3/4"
          />
        </div>

        {/* File Input for picking a new image */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
           <Button
            text="UPLOAD" 
            type="button"
            icon={<FontAwesomeIcon icon={faCloudArrowUp} />}
            className="bg-gray-200 text-black rounded-sm font-semibold shadow-xs px-4 py-2 text-sm hover:bg-gray-300"
            onClick={() => document.querySelector('input[type="file"]').click()}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarEditor;
