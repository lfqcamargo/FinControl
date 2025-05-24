import { DashboardHeader } from '@/components/header'
import { ProtectedRoute } from '@/components/route-guard/protected-route'
import { DashboardSidebar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-screen flex-col bg-background dark:bg-background/95">
        <DashboardHeader />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto bg-muted/30 p-6 dark:bg-muted/5">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
