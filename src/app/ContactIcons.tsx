'use client';

import { useState } from "react";

// Interactive contact icons for the profile sidebar. Two icons do something:
//  - "Send Message" on mobile opens the OS default mail app directly via
//    mailto: (Mail on iOS, Gmail on Android); on desktop it opens a chooser
//    for a specific provider's pre-filled compose window (Gmail / Outlook web),
//    plus a default-mail-app option (mailto:) for Apple Mail / Outlook desktop.
//  - "Forward to a Friend" opens the native share sheet on mobile via the Web
//    Share API, falling back to copying the page link where it's unsupported.
//  - "Add to Friends" opens RC's LinkedIn profile so the visitor can Connect.
const TO = "robertccowie@gmail.com";
const SUBJECT = "Wanted To Get In Touch!";
const BODY = "Hi RC,\n\n";

function openCompose(provider: "gmail" | "outlook" | "default") {
  const su = encodeURIComponent(SUBJECT);
  const body = encodeURIComponent(BODY);
  if (provider === "gmail") {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${TO}&su=${su}&body=${body}`,
      "_blank",
      "noopener,noreferrer",
    );
  } else if (provider === "outlook") {
    window.open(
      `https://outlook.office.com/mail/deeplink/compose?to=${TO}&subject=${su}&body=${body}`,
      "_blank",
      "noopener,noreferrer",
    );
  } else {
    window.location.href = `mailto:${TO}?subject=${su}&body=${body}`;
  }
}

async function addToFavorites() {
  // No browser lets a page add a bookmark via JS. On mobile the closest
  // native path is the OS share sheet: iOS Safari surfaces "Add Bookmark" /
  // "Add to Home Screen" there, and Android exposes the browser's save
  // options. So on mobile we open that sheet; on desktop we fall back to the
  // keyboard shortcut, since desktop share sheets don't offer bookmarking.
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  if (isMobile && navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Bookmark RC's page",
        url: window.location.href,
      });
    } catch {
      // User cancelled the share sheet — nothing to do.
    }
    return;
  }

  if (isMobile) {
    // Mobile browser without the Web Share API (e.g. some Android browsers):
    // point the user at the native bookmark control.
    alert("Open your browser menu and tap ☆ (or “Add bookmark”) to save this page.");
    return;
  }

  const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
  const shortcut = isMac ? "⌘ + D" : "Ctrl + D";
  alert(`Press ${shortcut} to bookmark this page.`);
}

function openLinkedIn() {
  // "Add to Friends" opens RC's LinkedIn profile (the LinkedIn app on mobile if
  // installed) so the visitor can tap Connect there. A site can't send a
  // connection request programmatically — LinkedIn's API doesn't allow it.
  window.open(
    "https://www.linkedin.com/in/rccowie/",
    "_blank",
    "noopener,noreferrer",
  );
}

async function forwardToFriend() {
  const shareData = {
    title: document.title,
    text: "Check out RC's page",
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // User cancelled the share sheet — nothing to do.
    }
    return;
  }
  // Desktop / unsupported: copy the link instead.
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard.");
  } catch {
    alert(window.location.href);
  }
}

export default function ContactIcons() {
  const [mailMenuOpen, setMailMenuOpen] = useState(false);

  // On mobile, skip the provider chooser and go straight to the OS default
  // mail app via mailto: (Mail on iOS, Gmail on Android). The chooser menu is
  // a plain toggle that can't be dismissed by tapping away, which is a poor
  // touch experience — so we only show it on desktop.
  function handleSendMessage() {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (isMobile) {
      openCompose("default");
      return;
    }
    setMailMenuOpen((o) => !o);
  }

  return (
    <figure className="contact-images">
      <span className="contact-icon-wrap">
        <img
          src="/pictures/sendMailIcon.gif"
          alt="Send Message"
          role="button"
          tabIndex={0}
          onClick={handleSendMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSendMessage();
          }}
        />
        {mailMenuOpen && (
          <span className="mail-menu">
            <button type="button" onClick={() => { openCompose("gmail"); setMailMenuOpen(false); }}>Gmail</button>
            <button type="button" onClick={() => { openCompose("outlook"); setMailMenuOpen(false); }}>Outlook</button>
            <button type="button" onClick={() => { openCompose("default"); setMailMenuOpen(false); }}>Default mail app</button>
          </span>
        )}
      </span>

      <img
        src="/pictures/forwardMailIcon.gif"
        alt="Forward to Friend"
        role="button"
        tabIndex={0}
        onClick={forwardToFriend}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") forwardToFriend();
        }}
      />
      <img
        src="/pictures/addFriendIcon.gif"
        alt="Add to Friends"
        role="button"
        tabIndex={0}
        onClick={openLinkedIn}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openLinkedIn();
        }}
      />
      <img
        src="/pictures/addFavoritesIcon.gif"
        alt="Add to Favorites"
        role="button"
        tabIndex={0}
        onClick={addToFavorites}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") addToFavorites();
        }}
      />
      <img src="/pictures/messagefriend.gif" alt="Instant Message" />
      <img src="/pictures/blockUser.gif" alt="Block User" />
      <img src="/pictures/addToGroupIcon.gif" alt="Add to Group" />
      <img src="/pictures/rankUserIcon.gif" alt="Rank User" />
    </figure>
  );
}
