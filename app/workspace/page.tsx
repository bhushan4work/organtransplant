import React from 'react';
import { WorkspaceNavbar } from '@/components/WorkspaceNavbar';

export default function Workspace() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#172236] font-sans">
      <WorkspaceNavbar />
      <main className="ml-0 lg:ml-[224px] xl:ml-[248px] min-h-screen transition-all p-8">
        <h1 className="text-2xl font-bold mb-4">Workspace Dashboard</h1>
        <p className="text-gray-600">This is the live demo workspace.</p>
      </main>
    </div>
  );
}
