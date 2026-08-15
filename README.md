# Are You in a Trauma Bond? — quiz

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
| `quiz.js` | Questions, results and logic |
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

## The colours

These are taken from viennawoodtherapy.co.uk, so the quiz matches the site it
will sit on. They all live at the top of `quiz.css`:

```css
:root {
  --tq-blush:      #FFDBE0;   /* SITE - page / outer background */
  --tq-card:       #FFFFFF;   /* card surface                   */
  --tq-pink-soft:  #FEAEC6;   /* SITE - answer buttons          */
  --tq-pink:       #F47C9E;   /* SITE - selected answer, bar    */
  --tq-pink-hover: #FE9CBA;   /* answer button hover            */
  --tq-pink-deep:  #C1053B;   /* headings, labels, CTA          */
  --tq-pink-deep-hover: #A40532;
  --tq-rose-ink:   #333333;   /* SITE - body text               */
  --tq-muted:      #8A4257;   /* small print                    */
  --tq-line:       #FFC9D4;   /* hairlines / card border        */
  --tq-track:      #FEAEC6;   /* empty part of the progress bar */
}
```

Change those values and the whole quiz follows. If you change them, change the
copy of the palette in the `@media (prefers-color-scheme: dark)` block at the
bottom of the same file too — that block is what stops Android phones in auto
dark mode from repainting the quiz in their own grey colours.

**Why headings are not #F47C9E.** Your site pink is lovely as a background but
it cannot be used as text: against white it reaches only 2.6:1 contrast, and
readable text needs 4.5:1. `--tq-pink-deep` (#C1053B) is a darker version of
the same pink, used anywhere the pink has to be *read* rather than *seen*.
Selected answers use charcoal text on the pink rather than white for the same
reason — white on #F47C9E is also 2.6:1.

The body font stack starts with `Montserrat`, which your site already loads, so
on viennawoodtherapy.co.uk the quiz picks up your own typeface automatically.
Anywhere else it falls back to the system sans.

## Changing the questions and results

Both live at the top of `quiz.js`, in plain readable arrays. Each answer has a
`weight`: A = 0, B = 1, C = 2, D = 3. The weights add up and the total picks
the result.

- 8 questions × max weight 3 = **24** possible points
- `RESULTS` entries fire at `upTo: 5`, `upTo: 11`, `upTo: 18`, `upTo: 24` —
  matching your bands 0–5, 6–11, 12–18, 19–24

Each result's `body` is a list of `{ label, text }` pairs, which is what draws
the small pink "What your results mean" and "An Inner Child Perspective"
headings. A plain string in that list renders as an ordinary paragraph.

Want **one result for everyone** instead of four? Delete the first three
entries in `RESULTS` and leave the last one. Every visitor then sees that
message.

Adding or removing a question needs no other change — the progress bar, the
"Question _n_ of _n_" label and the scoring all read the array length.

The button under each result points at `ctaHref: "#"` — change that to your
booking or contact page, and change `ctaText` to the wording you want.

## What it does

- One question per screen, no splash screen
- Progress bar + "Question 3 of 8" + percentage
- Back button (keeps the previous answer highlighted)
- A single concluding message with a call-to-action
- Fully keyboard accessible; screen-reader labels on the progress bar
- Honours `prefers-reduced-motion`
- Small print swaps to a safety line on the result screen
- No animations or sound beyond the bar sliding — remove the `transition` line
  in `.tq-bar-fill` for zero motion at all

## Tested

Checked in Chromium via Playwright:

- All 8 screens advance in order; label, percentage and bar width agree at every step
- Weights confirmed as A=0, B=1, C=2, D=3 on all 8 questions
- **All 25 possible scores (0–24)** land in the right one of your four bands,
  not just the four all-same-letter runs
- Boundary case checked directly (4×D + 4×A = 12 → "Moderate Trauma Bond Dynamics")
- Back button returns to the previous question with the earlier answer still marked
- Restart resets score and progress
- No console errors, no JavaScript errors
- Zero horizontal overflow at 320 / 360 / 390 / 412 / 430 / 540 / 767 / 1024 px
- Every text/background pair in the palette meets WCAG AA (4.5:1 or better)
