// components/Chat/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { Bot } from 'lucide-react';

const ChatMessages = ({ messages, isTyping }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="flex-1 overflow-y-auto">
            {/* Welcome Message */}
            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Bot className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Cześć, jestem asystentem HR!
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base max-w-md">
                        Zadaj pytanie o HR, prawo pracy, rekrutację i zarządzanie zespołem.
                        Mogę pomóc z procedurami, przepisami i najlepszymi praktykami.
                    </p>
                    <div className="mt-4 space-y-2 w-full max-w-xs">
                        <div className="text-xs text-gray-500 text-left">Przykładowe pytania:</div>
                        <div className="text-xs bg-gray-100 p-2 rounded text-left">
                            Ile wynosi urlop?
                        </div>
                        <div className="text-xs bg-gray-100 p-2 rounded text-left">
                            Jaka jest stawka za nadgodziny?
                        </div>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="p-4 space-y-4">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-xs">
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 px-2">AI pisze...</div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ChatMessages;