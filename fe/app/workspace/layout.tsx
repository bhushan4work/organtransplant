'use client';
import React from 'react';

import { WorkspaceNavbar } from '@/components/WorkspaceNavbar';
import { useAuth } from '@/lib/AuthContext';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8fb]">
        <div className="w-8 h-8 border-4 border-[#97002f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#172236] font-sans" style={{ zoom: 1.1 }}>
      <WorkspaceNavbar />
      <main className="ml-0 lg:ml-[224px] xl:ml-[248px] min-h-screen transition-all">
        <div className="max-w-[1600px] mx-auto p-[21px_13px_30px] sm:p-[25px_20px_35px] lg:p-[27px_23px_34px] xl:p-[30px_34px_40px]">
          {children}
        </div>
      </main>
    </div>
  );
}
