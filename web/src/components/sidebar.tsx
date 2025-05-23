'use client'

import type React from 'react'

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  ChevronLeft,
  CreditCard,
  Home,
  PieChart,
  Settings,
  Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isActive?: boolean
  collapsed?: boolean
}

function NavItem({ icon, title, href, isActive, collapsed }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          'flex w-full items-center justify-start gap-2 px-4 py-2 transition-all',
          isActive
            ? 'bg-primary/10 font-medium text-primary dark:bg-primary/20'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {icon}
        {!collapsed && <span>{title}</span>}
      </Button>
    </Link>
  )
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-border/40 bg-card/50 transition-all duration-300 dark:border-border/20 dark:bg-card/30',
        collapsed ? 'w-[70px]' : 'w-[240px]',
      )}
    >
      <div className="flex h-14 items-center border-b border-border/40 px-4 dark:border-border/20">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Menu</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'ml-auto text-muted-foreground hover:text-foreground',
            collapsed && 'mx-auto',
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              'h-5 w-5 transition-transform',
              collapsed ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-2">
        <NavItem
          icon={<Home className="h-5 w-5" />}
          title="Dashboard"
          href="/"
          isActive={location.pathname === '/'}
          collapsed={collapsed}
        />
        <NavItem
          icon={<CreditCard className="h-5 w-5" />}
          title="Transações"
          href="/transactions"
          isActive={location.pathname === '/transactions'}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Tag className="h-5 w-5" />}
          title="Categorias"
          href="/categories"
          isActive={location.pathname === '/categories'}
          collapsed={collapsed}
        />
        <NavItem
          icon={<BarChart3 className="h-5 w-5" />}
          title="Orçamentos"
          href="/budgets"
          isActive={location.pathname === '/budgets'}
          collapsed={collapsed}
        />
        <NavItem
          icon={<PieChart className="h-5 w-5" />}
          title="Relatórios"
          href="/reports"
          isActive={location.pathname === '/reports'}
          collapsed={collapsed}
        />

        {/* <NavItem //IMPLEMTNAR FUTURAMENTE
          icon={<PieChart className="h-5 w-5" />}
          title="Goals"
          href="/goals"
          isActive={location.pathname === '/goals'}
          collapsed={collapsed}
        />
        <NavItem
          icon={<PieChart className="h-5 w-5" />}
          title="Calendar"
          href="/calendar"
          isActive={location.pathname === '/calendar'}
          collapsed={collapsed}
        /> */}
      </nav>

      <div className="border-t border-border/40 p-2 dark:border-border/20">
        <NavItem
          icon={<Settings className="h-5 w-5" />}
          title="Configurações"
          href="/settings"
          isActive={location.pathname === '/settings'}
        />
      </div>
    </aside>
  )
}
