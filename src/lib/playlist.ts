import fs from "node:fs";
import path from "node:path";
import type { Track } from "@/app/MusicPlayer";

// Auto-build the playlist from whatever lives in /public/music.
// Name your files "Artist - Title.mp3" and they'll be parsed accordingly.
// Drop a same-named image (e.g. "Artist - Title.jpg") next to it for cover art.
export function loadPlaylist(): Track[] {
  const dir = path.join(process.cwd(), "public", "music");
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  const images = files.filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
  const tracks = files
    .filter((f) => /\.mp3$/i.test(f))
    .sort()
    .map((file) => {
      const base = file.replace(/\.mp3$/i, "");
      const [artist, title] = base.includes(" - ")
        ? [base.slice(0, base.indexOf(" - ")), base.slice(base.indexOf(" - ") + 3)]
        : ["", base];
      // Prefer art named exactly like the song ("Artist - Title.jpg");
      // otherwise fall back to any image by the same artist ("Artist - Album.jpg").
      const artFile =
        images.find((img) => img.replace(/\.[^.]+$/, "") === base) ??
        (artist
          ? images.find((img) => img.startsWith(`${artist.trim()} - `))
          : undefined);
      return {
        name: title.trim(),
        artist: artist.trim(),
        src: `/music/${encodeURIComponent(file)}`,
        art: artFile ? `/music/${encodeURIComponent(artFile)}` : "",
      };
    });

  // Keep the alphabetical order, but pin Taking Back Sunday to the top.
  const isTBS = (t: Track) => /taking back sunday/i.test(t.artist);
  return [...tracks.filter(isTBS), ...tracks.filter((t) => !isTBS(t))];
}
