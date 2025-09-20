// components/Chat/ChatContainer.jsx
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import AITestComponent from '../AITestComponent';
import { useChat } from '../../hooks/useChat';

const ChatContainer = () => {
    const [showAITest, setShowAITest] = useState(false);
    const [showPDFUploader, setShowPDFUploader] = useState(false);
    const {
        messages,
        currentMessage,
        setCurrentMessage,
        isTyping,
        sendMessage,
        clearChat
    } = useChat();

    return (
        <div className="flex flex-col h-full bg-white md:rounded-xl md:shadow-lg overflow-hidden">
            <ChatHeader onClearChat={clearChat} />

            {/* Dev Tools - tylko w development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="p-2 bg-yellow-50 border-b flex space-x-2">
                    <button
                        onClick={() => setShowAITest(!showAITest)}
                        className="text-xs bg-yellow-200 px-2 py-1 rounded text-yellow-800 hover:bg-yellow-300"
                    >
                        {showAITest ? 'Ukryj' : 'Test OpenAI'}
                    </button>
                    <button
                        onClick={() => setShowPDFUploader(!showPDFUploader)}
                        className="text-xs bg-blue-200 px-2 py-1 rounded text-blue-800 hover:bg-blue-300"
                    >
                        {showPDFUploader ? 'Ukryj' : 'Baza Wiedzy'}
                    </button>
                </div>
            )}

            {/* Test Components */}
            {showAITest && (
                <div className="p-4 bg-gray-50 border-b">
                    <AITestComponent />
                </div>
            )}

            {showPDFUploader && (
                <div className="p-4 bg-gray-50 border-b">
                    <PDFUploader />
                </div>
            )}

            <ChatMessages messages={messages} isTyping={isTyping} />
            <ChatInput
                message={currentMessage}
                setMessage={setCurrentMessage}
                onSendMessage={sendMessage}
                disabled={isTyping}
            />
        </div>
    );
};

export default ChatContainer;