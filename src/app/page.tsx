import Link from "next/link";
import ProfileShell from "./ProfileShell";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 5);
  return (
    <ProfileShell>

      <section className="user-network">
        <header>
          <h2>RC is in your extended network</h2>
        </header>
      </section>

      <section className="blog">
        <p><b>RC&apos;s Latest Blog Entry</b> [<a href="#">Subscribe to this Blog</a>]</p>
        {latestPosts.map((post) => (
          <p key={post.slug}>
            {post.title} (<Link href={`/blog/${post.slug}`}>view more</Link>){" "}
          </p>
        ))}
        <p>[<Link href="/blog">View All Blog Entries</Link>]</p>
      </section>

      <section className="blurbs">
        <header className="main-section-header">
          <h2 className="main-section-h2">RC&apos;s Blurbs</h2>
        </header>

        <h3>About me:</h3>
        <p>Sales engineer by day, which is a fancy way of saying I get paid to demo software and explain why the API does that. Somehow turned &quot;being the person who reads the docs&quot; into a career.</p>

        <p>Outside of work I&apos;m a lifelong Philly sports masochist (Go Birds), a pop-punk/emo kid who never fully grew out of it, and a Star Trek lifer.</p>

        <h3>Who I&apos;d like to meet:</h3>
        <p>People who can hold a conversation about a great record and a bad bullpen decision in the same breath. Bonus points if you&apos;ve seen a band in a basement before they got big.</p>
      </section>

      <section className="friends">
        <header className="main-section-header">
          <h2 className="main-section-h2">RC&apos;s Friend Space</h2>
        </header>

        <p><b>RC has <span className="focus-highlight">2824</span> Friends.</b></p>

        <div className="friend-pic-container">
          <figure>
            <figcaption><a href="https://en.wikipedia.org/wiki/Tom_Anderson">Tom</a></figcaption>
            <img src="/pictures/tom-pic.jpg" alt="Tom" />
          </figure>

          <figure>
            <figcaption><a href="#">xX_Ļ£Ah_Xx</a></figcaption>
            <img src="/pictures/leah.png" alt="leah" />
          </figure>

          <figure>
            <figcaption><a href="#">Jessica Sandford</a></figcaption>
            <img src="/pictures/jessica.jpg" alt="Jessica Sandford" />
          </figure>

          <figure>
            <figcaption><a href="#">tanner</a></figcaption>
            <img src="/pictures/tanner.jpg" />
          </figure>

          <figure>
            <figcaption><a href="https://philliesnation.com">Phillies<br />Nation</a></figcaption>
            <img src="/pictures/philliesnation.jpg" alt="Phillies Nation" />
          </figure>

          <figure>
            <figcaption><a href="#">XxnickxX</a></figcaption>
            <img src="/pictures/nick.JPG" alt="XxnickxX" />
          </figure>

          <figure>
            <figcaption><a href="#">J-e-n-n-i</a></figcaption>
            <img src="/pictures/jenni.jpg" />
          </figure>

          <figure>
            <figcaption><a href="#">Elias G</a></figcaption>
            <img src="/pictures/lou.jpg" alt="Lou" />
          </figure>
        </div>

        <p className="friends-list-link"><a href="#">View All of RC&apos;s Friends</a></p>
      </section>

    </ProfileShell>
  );
}
