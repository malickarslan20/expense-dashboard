import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

function ProfilePicSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {!image ? (
        <div
          onClick={onChooseFile}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 
          flex flex-col justify-center items-center cursor-pointer 
          border border-purple-200 shadow-sm 
          hover:shadow-md transition-all duration-200"
        >
          <LuUser className="text-3xl text-purple-500 mb-1" />

          <button
            type="button"
            className="flex items-center gap-1 text-[11px] font-medium 
            text-purple-700 bg-purple-300/40 px-3 py-[3px] rounded-full
            hover:bg-purple-300 transition"
          >
            <LuUpload className="text-purple-600" />
            Upload
          </button>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-2 -right-2 bg-red-500 text-white 
            rounded-full p-1 shadow-md 
            hover:scale-110 transition"
          >
            <LuTrash className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePicSelector;