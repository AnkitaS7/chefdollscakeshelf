/* =============================================================
   Intro sequence timing.

   The brand loading screen plays once per browser session: first-time
   visitors get the full animation, and someone bouncing between the
   menu and the order page lands straight on the content.

   The decision is made here at module load - before any component
   mounts - because both LoadingScreen and HeroSection need the same
   answer, and reading the flag inside each component would let
   whichever mounted first change the answer for the other.
   ============================================================= */

const SESSION_KEY = "cdcs:intro-played";

function alreadyPlayed(): boolean {
  try {
    const played = sessionStorage.getItem(SESSION_KEY) === "1";
    sessionStorage.setItem(SESSION_KEY, "1");
    return played;
  } catch {
    // Private mode or storage disabled: just play it.
    return false;
  }
}

/** Whether the loading screen renders at all this page load. */
export const INTRO_PLAYS = !alreadyPlayed();

/** Loading screen starts fading at this point. */
export const INTRO_FADE_MS = 800;

/** Loading screen is fully gone at this point (fade is 600ms). */
export const INTRO_DONE_MS = 1400;

/** When the hero should reveal itself, in either case. */
export const HERO_REVEAL_MS = INTRO_PLAYS ? INTRO_DONE_MS : 80;
