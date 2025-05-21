import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './pages/_layouts/auth-layout'
import { SignInPage } from './pages/auth/sign-in-page'
import { SignUpPage } from './pages/auth/sign-up-page'
import { AppLayout } from './pages/_layouts/app-layout'
import { DashboardPage } from './pages/app/dashboard-page'
import { TransactionsPage } from './pages/app/transactions-page'
import { CategoriesPage } from './pages/app/categories-page'
import { BudgetsPage } from './pages/app/budgets-page'
import { ReportsPage } from './pages/app/reports-page'
import { SettingsPage } from './pages/app/settings-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/budgets',
        element: <BudgetsPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
])
