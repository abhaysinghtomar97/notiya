import LogoutButton from '@/components/LogoutButton';
import { cookies } from 'next/headers';

// 1. Make the layout component 'async'
export default async function AdminLayout({ children }) {
  
  // 2. Add 'await' before cookies()
  const cookieStore = await cookies();
  
  // 3. Get the token (make sure the name matches your login route)
  const token = cookieStore.get('token')?.value; 

  let user = null;

  if (token) {
    try {
      const base64Payload = token.split('.')[1];
      const payloadString = Buffer.from(base64Payload, 'base64').toString('utf-8');
      user = JSON.parse(payloadString);
     
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  return (
    <div>
      <div className="bg-amber-600 text-white p-2 text-center text-sm">
        Logged in as: <strong>{ user?.email || 'Admin'}</strong>
      </div>
       {/* TOP NAVIGATION BAR */}
      <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600/10 text-amber-600 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hidden sm:block">
              Welcome,{user?.name || 'Admin'} 
            </span>
            <LogoutButton className="bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}