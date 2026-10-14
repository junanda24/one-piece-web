import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Pause, Play, SkipForward, VolumeX } from "lucide-react";

const TRACKS = [
  { id: "HB4iNVa746E", title: "We Are! — Hiroshi Kitadani (THE FIRST TAKE)" },
  { id: "YoeP9w5UIlg", title: "We Are! — Hiroshi Kitadani (OP 1)" },
  { id: "-bCTlrXlnTM", title: "We Go! — Hiroshi Kitadani (OP 15)" },
  { id: "V3r-YGGsKpk", title: "Overtaken — Epic Battle Mix" },
  { id: "Yy3mPwvhdx4", title: "Memories — Maki Otsuki (ED 1)" },
];

let apiPromise = null;
function loadYouTubeAPI() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(tag, first);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      resolve(window.YT);
    };
    setTimeout(() => resolve(window.YT || null), 12000);
  });
  return apiPromise;
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const playerRef = useRef(null);
  const holderRef = useRef(null);
  const trackIdxRef = useRef(0);
  const errorCountRef = useRef(0);

  trackIdxRef.current = trackIdx;

  const ensurePlayer = useCallback(async () => {
    if (playerRef.current) return playerRef.current;
    const YT = await loadYouTubeAPI();
    if (!YT) return null;
    const player = new YT.Player(holderRef.current, {
      height: "1",
      width: "1",
      videoId: TRACKS[trackIdxRef.current].id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        rel: 0,
      },
      events: {
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            setPlaying(true);
            setBlocked(false);
            errorCountRef.current = 0;
          } else if (e.data === YT.PlayerState.PAUSED) {
            setPlaying(false);
          } else if (e.data === YT.PlayerState.ENDED) {
            setTrackIdx((i) => (i + 1) % TRACKS.length);
          }
        },
        onError: () => {
          errorCountRef.current += 1;
          if (errorCountRef.current >= TRACKS.length) {
            setBlocked(true);
            setPlaying(false);
          } else {
            setTrackIdx((i) => (i + 1) % TRACKS.length);
          }
        },
      },
    });
    playerRef.current = player;
    return player;
  }, []);

  /* load new video when track changes while player exists */
  useEffect(() => {
    const p = playerRef.current;
    if (p && p.loadVideoById) {
      try {
        p.loadVideoById(TRACKS[trackIdx].id);
      } catch {
        /* player not ready yet */
      }
    }
  }, [trackIdx]);

  const toggle = useCallback(async () => {
    const player = await ensurePlayer();
    if (!player) {
      setBlocked(true);
      return;
    }
    try {
      const state = player.getPlayerState();
      if (state === 1) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } catch {
      setBlocked(true);
    }
  }, [ensurePlayer]);

  const next = useCallback(async () => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    const player = await ensurePlayer();
    if (player && player.playVideo) {
      setTimeout(() => {
        try {
          player.playVideo();
        } catch {
          /* noop */
        }
      }, 600);
    }
  }, [ensurePlayer]);

  return (
    <div className="fixed right-5 bottom-5 z-50 md:right-8 md:bottom-8">
      <div
        ref={holderRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      />

      {/* now playing ticker */}
      <div
        className={`mb-2 max-w-[240px] overflow-hidden bg-[#16100a] transition-all duration-300 ${
          playing ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="flex items-center gap-2 px-3 py-2 font-mono2 text-[10px] tracking-[0.15em] text-[#ece0bd] uppercase">
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2].map((b) => (
              <span
                key={b}
                className="w-[3px] animate-pulse bg-[#b3121f]"
                style={{ height: `${8 + b * 4}px`, animationDelay: `${b * 150}ms` }}
              />
            ))}
          </span>
          <span className="min-w-0 truncate">{TRACKS[trackIdx].title}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={next}
          aria-label="Next track"
          title={TRACKS[(trackIdx + 1) % TRACKS.length].title}
          className="grid h-12 w-12 place-items-center border border-white/25 bg-[#0c141c] text-white/80 transition-colors hover:border-white hover:text-white"
        >
          <SkipForward size={18} />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play One Piece music"}
          aria-pressed={playing}
          className={`grid h-14 w-14 place-items-center transition-colors ${
            blocked
              ? "cursor-not-allowed bg-[#3a3a3a] text-white/40"
              : "bg-[#b3121f] text-white hover:bg-[#7d0b14]"
          }`}
        >
          {blocked ? (
            <VolumeX size={22} />
          ) : playing ? (
            <Pause size={22} />
          ) : (
            <Music size={22} />
          )}
        </button>
      </div>

      {!playing && !blocked && (
        <p className="mt-2 text-right font-mono2 text-[9px] tracking-[0.25em] text-white/50 uppercase">
          ♪ One Piece OST
        </p>
      )}
    </div>
  );
}
