# Reflection Quiz — working demo

An 8-question, one-question-per-screen quiz with a progress bar and a single
concluding message. Vanilla HTML/CSS/JS, no build step, no dependencies,
nothing loaded from a CDN.

**Live demo:** https://anirudhatalmale6-alt.github.io/feminine-trauma-quiz-demo/

---

## What's in here

| File | Purpose |
|---|---|
| `index.html` | The quiz markup — the drop-in block is the `<div id="tq-quiz">` |
| `quiz.css` | All styling. Every colour is a variable at the top of the file |
| `quiz.js` | Questions, endings and logic |
| `quiz-single-file.html` | The same quiz with CSS + JS inlined — one file, paste and go |

## Dropping it into a site

**Option A — one file.** Upload `quiz-single-file.html`, or paste its
`<div id="tq-quiz">` block plus the `<style>` and `<script>` blocks into a
custom-HTML element on your page.

**Option B — three files.** Upload `quiz.css` and `quiz.js`, then paste the
`<div id="tq-quiz">` block into your page and reference the two files:

```html
<link rel="stylesheet" href="/path/to/quiz.css">
<div id="tq-quiz" class="tq"> ... </div>
<script src="/path/to/quiz.js"></script>
```

Everything is scoped under the `.tq` class, so it will not collide with your
theme's styles and your theme will not break it.

## Changing the pinks

Top of `quiz.css`:

```css
:root {
  --tq-blush:     #fdf3f6;   /* outer background        */
  --tq-card:      #ffffff;   /* card surface            */
  --tq-pink-soft: #fbe4ec;   /* answer buttons, bar track */
  --tq-pink:      #e8799f;   /* primary pink            */
  --tq-pink-deep: #c04d78;   /* selected state, headings */
  --tq-rose-ink:  #4a2337;   /* body text               */
  ...
}
```

Change those six values and the whole quiz follows. If you change them, change
the copy of the palette in the `@media (prefers-color-scheme: dark)` block at
the bottom of the same file too — that block is what stops Android phones in
auto dark mode from repainting the quiz in their own grey colours.

## Changing the questions and endings

Both live at the top of `quiz.js`, in plain readable arrays. Each answer has a
`weight` from 0–3; the weights add up and the total picks the ending.

- 8 questions × max weight 3 = **24** possible points
- `RESULTS` entries fire at `upTo: 8`, `upTo: 16`, `upTo: 24`

Want **one ending for everyone** instead of three? Delete the first two entries
in `RESULTS` and leave the last one. Every visitor then sees that message.

Adding or removing a question needs no other change — the progress bar, the
"Question _n_ of _n_" label and the scoring all read the array length.

The button under each ending points at `ctaHref: "#"` — change that to your
booking or contact page.

## Notes on the demo content

The questions and endings are placeholder copy I wrote so you could see the
thing working end to end. You know your clients; please replace the wording
with your own. The structure will hold whatever you put in it.

## What it does

- One question per screen, no splash screen
- Progress bar + "Question 3 of 8" + percentage
- Back button (keeps the previous answer highlighted)
- Single concluding message with next steps and a call-to-action
- Fully keyboard accessible; screen-reader labels on the progress bar
- Honours `prefers-reduced-motion`
- No animations or sound beyond the bar sliding — remove the `transition` line
  in `.tq-bar-fill` for zero motion at all

## Tested

Checked in Chromium via Playwright:

- All 8 screens advance in order; label, percentage and bar width agree at every step
- All three endings reached with the intended answer combinations
- Back button returns to the previous question with the earlier answer still marked
- Restart resets score and progress
- No console errors, no JavaScript errors
- Zero horizontal overflow at 320 / 360 / 390 / 412 / 430 / 540 / 767 / 1024 px
