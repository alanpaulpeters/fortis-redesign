"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin loading bar pinned to the very top of the viewport. Since the App Router
 * exposes no router events, we start the bar on internal link clicks and finish
 * it when the pathname actually changes (i.e. the new route has rendered).
 */
export function TopProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const activeRef = useRef(false);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimers() {
    if (trickleRef.current) clearInterval(trickleRef.current);
    if (hideRef.current) clearTimeout(hideRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
    if (failsafeRef.current) clearTimeout(failsafeRef.current);
  }

  function start() {
    if (activeRef.current) return;
    activeRef.current = true;
    clearTimers();
    setVisible(true);
    setProgress(8);
    // Trickle toward 90% and hold there until the route resolves.
    trickleRef.current = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.max(0.5, (90 - p) * 0.08)));
    }, 200);
    // Safety net so the bar never sticks if a navigation is aborted.
    failsafeRef.current = setTimeout(done, 10000);
  }

  function done() {
    if (!activeRef.current) return;
    activeRef.current = false;
    clearTimers();
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      resetRef.current = setTimeout(() => setProgress(0), 250);
    }, 200);
  }

  // Finish the bar once the route change lands. Skips the initial mount because
  // no navigation is in flight (activeRef is false).
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Kick the bar off the moment an internal link is clicked.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Ignore same-page links (hash jumps or a click on the current route).
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }
      start();
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => () => clearTimers(), []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5"
    >
      <div
        className="h-full bg-gradient-to-r from-mint2 to-mint shadow-[0_0_10px_rgba(6,214,160,0.7)] transition-all duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
