// components/Chat/ChatHeader.jsx
import React from 'react';
import { Bot, MoreVertical, Phone, Video } from 'lucide-react';

const ChatHeader = ({ onClearChat }) => {
    return (
        <>
            {/* Mobile Header - Komunikator Style */}
            <div className="md:hidden flex items-center justify-between p-4 bg-blue-600 text-white">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-semibold">HR Asystent</h1>
                        <p className="text-xs text-blue-100">Online</p>
                    </div>
                </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-gray-800">HR Asystent</h1>
                        <p className="text-sm text-gray-500">Zadaj pytanie o HR i prawo pracy</p>
                    </div>
                </div>
                <button
                    onClick={onClearChat}
                    className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Wyczyść czat
                </button>
            </div>
        </>
    );
};

export default ChatHeader;