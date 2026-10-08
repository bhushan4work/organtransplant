import React from 'react';

export function LoginModal({ isOpen, onClose, email, setEmail, password, setPassword, error, onSubmit }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[420px] p-6 sm:p-8 shadow-2xl relative animate-[fadeIn_0.2s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8b98aa] hover:text-[#172236] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        

        <div className="mb-6">
          <h2 className="text-[22px] font-[800] text-[#172236] tracking-[-0.5px]">Sign in</h2>
          <p className="text-[#62728a] text-[14px] mt-1">Access your clinical workspace</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-[#fff0f0] border border-[#ffcfcf] text-[#aa4848] text-[13px] font-[600]">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-[700] text-[#3f5068] mb-1.5">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[46px] px-4 rounded-xl border border-[#dfeae9] bg-[#f8fcfb] text-[#172236] text-[14px] focus:outline-none focus:border-[#29a18b] focus:ring-2 focus:ring-[#29a18b]/20 transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-[12px] font-[700] text-[#3f5068] mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[46px] px-4 rounded-xl border border-[#dfeae9] bg-[#f8fcfb] text-[#172236] text-[14px] focus:outline-none focus:border-[#29a18b] focus:ring-2 focus:ring-[#29a18b]/20 transition-all"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="mt-2 w-full h-[46px] rounded-xl bg-[#97002f] text-white font-[700] text-[15px] shadow-[0_5px_15px_rgba(151,0,47,0.15)] hover:bg-[#760025] hover:-translate-y-[1px] transition-all cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
