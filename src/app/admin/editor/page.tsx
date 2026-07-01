import ProfileShell from '../../ProfileShell';
import AdminEditorContent from '../AdminEditorContent';

export default async function EditorPage() {
  return (
    <ProfileShell>
      <AdminEditorContent />
    </ProfileShell>
  );
}
