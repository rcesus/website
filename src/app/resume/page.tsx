import ProfileShell from "../ProfileShell";

export const metadata = {
  title: "Resume",
};

export default function Resume() {
  return (
    <ProfileShell>
      <section className="blog-section">
        <header className="main-section-header">
          <h2 className="main-section-h2">RC&apos;s Resume</h2>
        </header>
        <p className="blog-excerpt">Coming soon.</p>
      </section>
    </ProfileShell>
  );
}
