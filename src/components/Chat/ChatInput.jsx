// components/Chat/ChatInput.jsx
import React from 'react';
import { Send, Plus, Smile } from 'lucide-react';

const ChatInput = ({ message, setMessage, onSendMessage, disabled }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            {/* Mobile Input - Komunikator Style */}
            <div className="md:hidden border-t bg-white p-3">
                <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                    <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600"
                    >
                        <Plus className="w-6 h-6" />
                    </button>

                    <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Wpisz wiadomość..."
                className="flex-1 bg-transparent border-none outline-none resize-none py-3 text-sm max-h-20"
                rows="1"
                disabled={disabled}
            />
                        <button
                            type="button"
                            className="p-1 text-gray-400 hover:text-gray-600"
                        >
                            <Smile className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={!message.trim() || disabled}
                        className={`p-3 rounded-full transition-colors ${
                            message.trim() && !disabled
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500'
                        }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>

            {/* Desktop Input */}
            <div className="hidden md:block border-t bg-gray-50 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                    <div className="flex-1">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Zadaj pytanie o HR..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="1"
                disabled={disabled}
            />
                    </div>
                    <button
                        type="submit"
                        disabled={!message.trim() || disabled}
                        className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                            message.trim() && !disabled
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <Send className="w-4 h-4" />
                        <span>Wyślij</span>
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChatInput;