// components/Chat/ChatContainer.jsx
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../../hooks/useChat';

const ChatContainer = () => {
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