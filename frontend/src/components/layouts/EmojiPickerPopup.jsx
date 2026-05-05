import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from 'react-icons/lu'

function EmojiPickerPopup({ icon, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Icon</label>

            <div className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-14 h-14 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-violet-50 hover:border-violet-300 transition-all cursor-pointer text-2xl"
                >
                    {icon ? (
                        <span>{icon}</span>
                    ) : (
                        <LuImage className="w-5 h-5 text-gray-400" />
                    )}
                </button>

                {/* Picker Popup */}
                {isOpen && (
                    <div className="absolute top-16 left-0 z-50 shadow-xl rounded-xl overflow-hidden border border-gray-100">
                        {/* Close button */}
                        <div className="flex justify-end bg-white px-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <LuX className="w-4 h-4" />
                            </button>
                        </div>

                        <EmojiPicker
                            onEmojiClick={(emojiData) => {
                                onSelect(emojiData.emoji);
                                setIsOpen(false);
                            }}
                            searchDisabled={false}
                            skinTonesDisabled
                            height={350}
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmojiPickerPopup