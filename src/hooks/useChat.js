// hooks/useChat.js
import { useState, useCallback } from 'react';
import { getAIResponse } from '../utils/aiService';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback(async () => {
        if (!currentMessage.trim()) return;

        const userMessage = {
            type: 'user',
            content: currentMessage.trim(),
            timestamp: Date.now()
        };

        // Dodaj wiadomość użytkownika
        setMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setIsTyping(true);

        try {
            // Pobierz odpowiedź AI
            const aiResponse = await getAIResponse(currentMessage.trim(), messages);

            const aiMessage = {
                type: 'ai',
                content: aiResponse,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Błąd AI:', error);

            const errorMessage = {
                type: 'ai',
                content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.',
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [currentMessage, messages]);

    const clearChat = useCallback(() => {
        setMessages([]);
        setCurrentMessage('');
        setIsTyping(false);
    }, []);

    return {
        messages,
        currentMessage,
        setCurrentMessage,
        isTyping,
        sendMessage,
        clearChat
    };
};