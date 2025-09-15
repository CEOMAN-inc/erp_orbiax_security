import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <form onSubmit={handleSubmit} className="space-y-3 max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta aquí... (Shift + Enter para nueva línea)"
            className="w-full pl-4 pr-28 py-3 bg-input border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[50px] max-h-[120px]"
            disabled={isLoading}
            rows={1}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!message.trim() || isLoading}
              loading={isLoading}
              iconName="Send"
              iconPosition="right"
            >
              Enviar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;