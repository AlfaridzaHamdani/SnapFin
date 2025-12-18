import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function Layout({ children, title = "Catatan Keuangan" }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="w-full max-w-md bg-retro-beige border-2 border-retro-black shadow-retro rounded-retro overflow-hidden flex flex-col h-[80vh] sm:h-[600px]">
        {/* Retro Header / Title Bar */}
        <header className="bg-white border-b-2 border-retro-black p-3 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-retro-black"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-retro-black"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 border border-retro-black"></div>
          </div>
          <h1 className="font-bold uppercase tracking-wider text-sm">{title}</h1>
          <div className="w-8"></div> {/* Spacer for balance */}
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-retro-beige">
          {children}
        </main>
        
        {/* Footer (Optional status bar) */}
        <footer className="border-t-2 border-retro-black p-2 bg-retro-pink/20 text-xs text-center">
          <span className="opacity-60">RETRO FINANCE OS v1.0</span>
        </footer>
      </div>
    </div>
  );
}
