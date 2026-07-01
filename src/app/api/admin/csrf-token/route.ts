import { generateCSRFToken, setCSRFToken } from '@/app/admin/auth';

export async function GET() {
  const token = generateCSRFToken();
  await setCSRFToken(token);
  return Response.json({ csrfToken: token });
}
