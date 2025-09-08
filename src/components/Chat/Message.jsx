// components/Chat/Message.jsx
import React from 'react';
import { Bot, User } from 'lucide-react';

const Message = ({ message }) => {
    const isUser = message.type === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end space-x-2 max-w-xs md:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>

                {/* Avatar */}
                {!isUser && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                )}

                {isUser && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mb-1">
                        <User className="w-5 h-5 text-white" />
                    </div>
                )}

                {/* Message Bubble */}
                <div className="flex flex-col">
                    <div
                        className={`rounded-2xl px-4 py-3 ${
                            isUser
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        }`}
                    >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                        </p>
                    </div>

                    {/* Timestamp */}
                    <div className={`text-xs text-gray-500 mt-1 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
                        {new Date(message.timestamp || Date.now()).toLocaleTimeString('pl-PL', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;