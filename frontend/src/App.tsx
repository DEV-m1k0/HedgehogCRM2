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
import { ClientDetailsPage } from './pages/Clients/ClientDetailsPage';
import { DealsPage } from './pages/Deals/DealsPage';
import { TasksPage } from './pages/Tasks/TasksPage';
import { AnalyticsPage } from './pages/Analytics/AnalyticsPage';
import { MessagesPage } from './pages/Messages/MessagesPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { LessonFormPage } from './pages/Schedule/LessonFormPage';
import { ArchivePage } from './pages/Archive/ArchivePage';
import { ArchiveDetailsPage } from './pages/Archive/ArchiveDetailsPage';
import { NotificationsProvider } from './components/feedback/Notifications';
import { AdminActivityPage } from './pages/Admin/AdminActivityPage';
import { TeacherStudentsPage } from './pages/TeacherStudents/TeacherStudentsPage';
import { TeacherStudentEditPage } from './pages/TeacherStudents/TeacherStudentEditPage';
import { MakeupsPage } from './pages/Makeups/MakeupsPage';
import type { User } from './types/crm.types';

const HomePageRedirect = () => {
  const raw = localStorage.getItem('user');
  if (!raw) {
    return <Navigate to="/login" replace />;
  }
  try {
    const user = JSON.parse(raw) as User;
    const roleName = user.role?.name?.toLowerCase() ?? '';
    if (roleName.includes('преподаватель') || roleName.includes('teacher')) {
      return <Navigate to="/calendar" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }
  return <DashboardPage />;
};

const ClientsPageGuard = () => {
  const raw = localStorage.getItem('user');
  if (!raw) {
    return <Navigate to="/login" replace />;
  }
  try {
    const user = JSON.parse(raw) as User;
    const roleName = user.role?.name?.toLowerCase() ?? '';
    if (roleName.includes('преподаватель') || roleName.includes('teacher')) {
      return <Navigate to="/my-students" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }
  return <ClientsPage />;
};

function App() {
  return (
    <NotificationsProvider>
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
          <Route index element={<HomePageRedirect />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/clients" element={<ClientsPageGuard />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="/my-students" element={<TeacherStudentsPage />} />
          <Route path="/my-students/:clientId/edit" element={<TeacherStudentEditPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<SchedulePage />} />
          <Route path="/calendar/new" element={<LessonFormPage />} />
          <Route path="/calendar/:lessonId/edit" element={<LessonFormPage />} />
          <Route path="/makeups" element={<MakeupsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/messages/inbox" element={<MessagesPage box="inbox" />} />
          <Route path="/messages/sent" element={<MessagesPage box="sent" />} />
          <Route path="/messages/drafts" element={<MessagesPage box="drafts" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/:entity/:entityId" element={<ArchiveDetailsPage />} />
          <Route path="/admin/activity" element={<AdminActivityPage />} />
        </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
  );
}

export default App;
