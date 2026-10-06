import React from 'react';
import { WorkspaceNavbar } from '@/components/WorkspaceNavbar';
import { WorkspaceOverview } from '@/components/WorkspaceOverview';

export default function Workspace() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#172236] font-sans">
      <WorkspaceNavbar />
      <main className="ml-0 lg:ml-[224px] xl:ml-[248px] min-h-screen transition-all">
        <div className="max-w-[1600px] mx-auto p-[21px_13px_30px] sm:p-[25px_20px_35px] lg:p-[27px_23px_34px] xl:p-[30px_34px_40px]">
          <WorkspaceOverview />
        </div>
      </main>
    </div>
  );
}
