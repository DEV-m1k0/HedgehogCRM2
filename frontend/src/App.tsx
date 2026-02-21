import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';
import { RegistrationPage } from './pages/Registration/RegistrationPage';
import { AccountPage } from './pages/Account/AccountPage';
import Layout from './components/layout/Layout';
import { SchedulePage } from './pages/Schedule/SchedulePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ClientsPage } from './pages/Clients/ClientsPage';
import { DealsPage } from './pages/Deals/DealsPage';
import { TasksPage } from './pages/Tasks/TasksPage';
import { AnalyticsPage } from './pages/Analytics/AnalyticsPage';
import { MessagesPage } from './pages/Messages/MessagesPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

        <Route
          element={(
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          )}
        >
          <Route index element={<DashboardPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<SchedulePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/messages/inbox" element={<MessagesPage box="inbox" />} />
          <Route path="/messages/sent" element={<MessagesPage box="sent" />} />
          <Route path="/messages/drafts" element={<MessagesPage box="drafts" />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
