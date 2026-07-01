import ProfileShell from '../ProfileShell';
import AdminLoginForm from './AdminLoginForm';

export default async function AdminPage() {
  return (
    <ProfileShell>
      <AdminLoginForm />
    </ProfileShell>
  );
}
