import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ChatMessage from './components/ChatMessage';
import QuickPrompts from './components/QuickPrompts';
import ChatInput from './components/ChatInput';
import ConversationHistory from './components/ConversationHistory';
import AIInsights from './components/AIInsights';

const AIChatPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const chatContainerRef = useRef(null);
  const [conversations, setConversations] = useState([
    { id: 'conv-1', title: 'Análisis de ingresos', lastActivity: new Date() },
    { id: 'conv-2', title: 'Asistencia de personal', lastActivity: new Date(Date.now() - 86400000) }
  ]);
  const [currentConversationId, setCurrentConversationId] = useState('conv-1');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Datos de ejemplo
  const aiInsights = [
    { type: 'warning', title: 'Contratos por Vencer', description: 'Hay 3 contratos que vencen en los próximos 30 días.', actions: [{ label: 'Ver Contratos', route: '/contracts' }] },
    { type: 'trend', title: 'Oportunidad de Crecimiento', description: 'Aumento del 35% en consultas de servicios en la Zona Norte.', actions: [{ label: 'Asignar Personal', route: '/assign-personnel' }] }
  ];

  useEffect(() => {
    // Simula la carga de mensajes para la conversación actual
    setMessages([
      { id: 1, content: "¡Hola! Soy tu asistente de IA de Orbiax. ¿Cómo puedo ayudarte?", isUser: false, timestamp: new Date() }
    ]);
  }, [currentConversationId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = (messageContent) => {
    if (!messageContent.trim()) return;

    const userMessage = { id: Date.now(), content: messageContent, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = { id: Date.now() + 1, content: `He recibido tu consulta sobre "${messageContent}". Como modelo de demostración, aquí tienes una respuesta simulada.`, isUser: false, timestamp: new Date(),
        actionCards: [{
          title: 'Resumen de Servicios Activos', icon: 'Shield', type: 'metric',
          metrics: [{ label: 'Total', value: '24' }, { label: 'Críticos', value: '3' }],
          actions: [{ label: 'Ver Dashboard', route: '/dashboard' }]
        }]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = { id: newId, title: 'Nueva Conversación', lastActivity: new Date() };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newId);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header isCollapsed={isSidebarCollapsed} onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          <h1 className="text-3xl font-bold text-foreground">Asistente de IA</h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 px-6" style={{ height: 'calc(100vh - 150px)' }}>
          <div className="hidden xl:flex flex-col space-y-6">
            <ConversationHistory
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={setCurrentConversationId}
              onNewConversation={handleNewConversation}
              onDeleteConversation={(id) => setConversations(prev => prev.filter(c => c.id !== id))}
            />
            <AIInsights insights={aiInsights} />
          </div>

          <div className="xl:col-span-3 bg-card border border-border rounded-xl flex flex-col h-full">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.length <= 1 ? (
                <QuickPrompts onPromptSelect={handleSendMessage} />
              ) : (
                messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} isUser={msg.isUser} timestamp={msg.timestamp} />
                ))
              )}
              {isLoading && <div className="flex justify-center"><p className="text-muted-foreground">Analizando...</p></div>}
              <div />
            </div>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChatPage;