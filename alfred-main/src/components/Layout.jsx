
import React from 'react';
import Sidebar from '@/components/ui/sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray">
      <Sidebar />
      <main className="flex-1 ml-[10rem]"> 
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;