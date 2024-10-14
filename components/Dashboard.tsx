"use client"

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { MainMenu } from '@/components/MainMenu';
import { ClientCard } from '@/components/ClientCard';
import { mockClients } from '@/lib/mockData';

export default function Dashboard() {
  const [clients] = useState(mockClients);
  const [activeTab, setActiveTab] = useState('all');

  const filteredClients = useMemo(() => {
    if (activeTab === 'all') return clients;
    return clients.filter(client => client.membershipType.toLowerCase() === activeTab);
  }, [clients, activeTab]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
      <MainMenu />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300">Clientes Importantes</h1>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === 'all' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('flex')}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === 'flex' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Flex
          </button>
          <button
            onClick={() => setActiveTab('my office')}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === 'my office' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            My Office
          </button>
          <button
            onClick={() => setActiveTab('my desk')}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === 'my desk' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            My Desk
          </button>
          <button
            onClick={() => setActiveTab('virtual')}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === 'virtual' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Virtual
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </div>
  );
}