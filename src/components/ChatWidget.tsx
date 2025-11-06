import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Content } from '@google/genai';
import { useTranslation } from '../i18n/context';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { CloseIcon } from './icons/CloseIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

type Message = {
    sender: 'user' | 'ai' | 'error';
    text: string;
};

const FALLBACK_ERROR = 'Sorry, I am quite busy right now. Please try again in a moment.';

const ChatWidget: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'ai', text: t('chatWidget.welcomeMessage') }]);
        }
    }, [isOpen, messages.length, t]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleExternalClose = () => setIsOpen(false);
        window.addEventListener('chat:close', handleExternalClose);
        return () => window.removeEventListener('chat:close', handleExternalClose);
    }, []);

    const handleSend = async () => {
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const apiKey = process.env.GEMINI_API_KEY as string | undefined;
            if (!apiKey) {
                console.error('Missing GEMINI_API_KEY. Please set it in your environment variables.');
                setMessages(prev => [...prev, { sender: 'error', text: FALLBACK_ERROR }]);
                setIsLoading(false);
                return;
            }

            const ai = new GoogleGenAI({ apiKey });

            const systemInstruction = `You are GIPS GJENVINNING Chat Assistant for Gipsgjenvinning AS.
- Primary language: Norwegian (Bokmål). If the user writes in English, answer in English.
- Always give short, tidy replies without markdown bold styling.
- Contact facts (only mention the ones requested and keep the wording clean):
  • E-post: post@gipsgjenvinn.no
  • Telefon: +47 410 06 505
  • Organisasjonsnummer: 923 266 054
  • Adresse: Habornveien 59, 1630 Gamle Fredrikstad, Norge
- Stay focused on Gipsgjenvinning AS services, processes, team, and contact information.
- Politely refuse unrelated, harmful, or sensitive requests (e.g., API keys, code, security details).`;

            const chatHistory: Content[] = messages.map(msg => ({
                role: msg.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }],
            }));
            chatHistory.push({ role: 'user', parts: [{ text: inputValue }] });

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: chatHistory,
                config: {
                    systemInstruction,
                },
            });

            const aiResponseText = response.text;
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages(prev => [...prev, { sender: 'error', text: FALLBACK_ERROR }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className={`fixed bottom-0 right-0 m-3 sm:m-5 transition-all duration-500 ease-out z-[1000] ${
                    isOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                }`}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-accent text-white rounded-full p-3 shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent btn-lift transition-transform duration-300 hover:scale-105"
                    aria-label="Open chat"
                >
                    <ChatBubbleIcon className="h-5 w-5" />
                </button>
            </div>

            <div
                className={`fixed bottom-0 right-0 m-4 sm:m-6 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[600px] bg-background shadow-2xl rounded-lg flex flex-col transition-all duration-500 ease-out origin-bottom-right z-[1000] ${
                    isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-6 pointer-events-none'
                }`}
            >
                {/* Header */}
                <div className="flex-shrink-0 bg-primary-dark text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div className="flex items-center space-x-2">
                        <img src="/assets/LOGO_ONLY.png" alt="Gipsgjenvinning AI Assistant" className="h-6 w-6" />
                        <h3 className="font-bold font-heading text-lg">{t('chatWidget.title')}</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-full p-1 transition hover:bg-white/20">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white text-text-main shadow-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-text-main shadow-sm rounded-lg p-3 max-w-xs flex items-center space-x-2">
                                    <span className="animate-pulse">...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="flex-shrink-0 p-4 border-t bg-white rounded-b-lg">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder={t('chatWidget.inputPlaceholder')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || inputValue.trim() === ''}
                            className="bg-accent text-white p-3 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatWidget;
