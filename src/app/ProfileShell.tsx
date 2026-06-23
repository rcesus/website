import Link from "next/link";
import MusicPlayer from "./MusicPlayer";
import ContactIcons from "./ContactIcons";
import { loadPlaylist } from "@/lib/playlist";

// Static MySpace chrome shared by the home page and the blog pages:
// header + the left profile sidebar (always static) + footer, with the
// right `main` column supplied by `children`.
export default function ProfileShell({ children }: { children: React.ReactNode }) {
  const playlist = loadPlaylist();
  return (
    <div className="master-container">

      {/* Main Header Begins */}
      <header className="main-header">
        <nav className="search-bar">

          {/* the input and button are disabled so the chrome reads correctly without
              implying a working search. */}
          <form>
            <input type="text" name="search" placeholder="Search" disabled />
            <input className="submit-btn" type="submit" name="submit-button" value="Search" disabled />
          </form>
        </nav>

        <nav className="navbar">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/resume">Resume</Link></li>
            <li><a href="https://github.com/rcesus" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

      </header>
      {/* Main Header Ends */}

      <div className="page-content-container">

        {/* Profile Sidebar Begins */}
        <aside className="profile-sidebar">

          <header>
            <h1>RC</h1>
          </header>

          {/* Profile Picture */}
          <div className="profile-picture-container">
            <img className="profile-pic" src="/pictures/rc.JPG" alt="A profile picture of RC." />

            <p className="personal-msg"><b>&quot;:-)&quot;</b></p>

            <ul className="gender-age">
              <li>Male</li>
              <li>41 years old</li>
              <li>Royersford,</li>
              <li>Pennsylvania</li>
              <li>United States</li>
            </ul>

            <ul className="last-login">
              <li>Last Login:</li>
              <li>4/22/2006</li>
            </ul>

            <p className="pics-videos">View My: <a href="#"><b>Pics</b></a> | <a href="#"><b>Videos</b></a></p>
          </div>

          {/* Contact Box */}
          <section className="contact-box">
            <h2>Contacting RC</h2>

            <ContactIcons />
          </section>

          {/* MySpace URL */}
          <section className="myspace-url-box">
            <h3><b>MySpace URL:</b></h3>
            <p>http://www.rccowie.com/</p>
          </section>

          {/* Profile Music Player */}
          <MusicPlayer tracks={playlist} />

          {/* Interests Section */}
          <section className="interests">
            <table className="sidebar-table">

              <caption>
                <h2 className="sidebar-table-h2">RC&apos;s Interests</h2>
              </caption>

              <tbody>
                <tr>
                  <th className="sidebar-table-header" scope="row">General</th>
                  <td className="sidebar-table-data">
                    <p>Go Birds!</p>
                  </td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Music</th>
                  <td className="sidebar-table-data">Pop Punk/Emo

                  </td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Movies</th>
                  <td className="sidebar-table-data">
                    Anything with superheroes, aliens, or explosions.
                  </td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Television</th>
                  <td className="sidebar-table-data">
                    <p>Star Trek. The Phillies.</p>
                  </td>
                </tr>

              </tbody>
            </table>
          </section>

          {/* RC's Details Section */}
          <section className="details">
            <table className="sidebar-table">

              <caption>
                <h2 className="sidebar-table-h2">RC&apos;s Details</h2>
              </caption>

              <tbody>
                <tr>
                  <th className="sidebar-table-header" scope="row">Status:</th>
                  <td className="sidebar-table-data">Married</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Here For:</th>
                  <td className="sidebar-table-data">Vibes</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Hometown:</th>
                  <td className="sidebar-table-data">Philadelphia</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Ethnicity:</th>
                  <td className="sidebar-table-data">White / Caucasian</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Zodiac Sign:</th>
                  <td className="sidebar-table-data">Aries</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Smoke / Drink:</th>
                  <td className="sidebar-table-data">No / No</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">Occupation:</th>
                  <td className="sidebar-table-data">Sales Engineering</td>
                </tr>

              </tbody>
            </table>
          </section>

          {/* RC's Schools Section */}
          <section className="schools">
            <table className="sidebar-table">

              <caption>
                <h2 className="sidebar-table-h2">RC&apos;s Schools</h2>
              </caption>

              <tbody>
                <tr>
                  <th className="sidebar-table-header" scope="row">
                    <ul>
                      <li><a href="#">Southern New Hampshire University</a></li>
                      <li>Manchester, New Hampshire</li>
                      <li>Graduated: <a href="#">2026</a></li>
                      <li>Degree: Master&apos;s Degree</li>
                      <li>Major: Business Administration</li>
                    </ul>
                  </th>
                  <td className="sidebar-table-data">2024 to 2026</td>
                </tr>

                <tr>
                  <th className="sidebar-table-header" scope="row">
                    <ul>
                      <li><a href="#">The Pennsylvania State University</a></li>
                      <li>University Park, Pennsylvania</li>
                      <li>Graduated: <a href="#">2012</a></li>
                      <li>Student status: Alumni</li>
                      <li>Degree: Bachelor&apos;s Degree</li>
                      <li>Major: History</li>
                    </ul>
                  </th>
                  <td className="sidebar-table-data">2010 to 2012</td>
                </tr>

              </tbody>
            </table>

          </section>
        </aside>
        {/* Profile Side Bar Ends */}

        {/* Main Section */}
        <main>
          {children}
        </main>

      </div>
      {/* Footer */}
      <footer className="footer">

        <nav>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Contact Myspace</a></li>
            <li><a href="#">Report Inappropriate Content</a></li>
            <li><a href="#">Promote!</a></li>
            <li><a href="#">Advertise</a></li>
            <li id="last"><a href="#">MySpace International</a></li>
          </ul>
        </nav>

        <small>©2003-2006 MySpace.com. All Rights Reserved.</small>
      </footer>
    </div>
  );
}
