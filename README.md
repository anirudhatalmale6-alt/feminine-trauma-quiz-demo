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

## Making the pink run edge to edge

The pink fills the full width of whatever container it is dropped into, and
the questions stay centred at a comfortable reading width inside it.

If your page wraps its content in a narrow column, the pink will stop where
that column stops. Two ways round it, either is fine:

1. Set the section holding the quiz to full width in your page builder — in
   Elementor that is **Section → Layout → Content Width: Full Width**.
2. Or add a second class to the quiz div and change nothing else:

```html
<div id="tq-quiz" class="tq tq-bleed">
```

`tq-bleed` breaks the quiz out of its column and stretches it to the edges of
the screen. It measures the desktop scrollbar first, so it will not give the
page a sideways scroll.

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
  --tq-pink-deep:  #BF4064;   /* headings, small labels         */
  --tq-pink-deep-hover: #A63656; /* same rose, deeper           */
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
readable text needs 4.5:1. `--tq-pink-deep` (#BF4064) is a deeper rose of the
same hue, used anywhere the pink has to be *read* rather than *seen*.

`--tq-pink-deep-hover` (#A63656) is that same rose one step deeper again. It
is used for the small text that sits on the pink page background rather than
on the white card — the percentage, and the Back link on hover — where #BF4064
would drop to 4.0:1.

The **Book a free 15 minute call** button is your actual site pink #F47C9E
with charcoal text, not white text: white on that pink is 2.6:1, charcoal is
4.95:1. Selected answers do the same thing for the same reason.

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

The button under each result is set to **Book a free 15 minute call**, pointing
at `https://stan.store/ViennaWoodTherapy`. Both live on the `ctaText` and
`ctaHref` lines of each result, so different endings can send people to
different places if you ever want that.

## Collecting email addresses

There is an optional screen between the last question and the result that asks
for a first name and an email address. It is **switched off** until a mailing
list is connected, so the quiz currently runs exactly as before.

Two preview pages show it working, with nothing connected behind them:

- `preview-email.html` — asks, but a "no thanks" link lets people through
- `preview-email-required.html` — no result without an email

Everything about it lives in the `EMAIL_CAPTURE` block at the top of `quiz.js`
— the wording, the consent line, the button text. To switch it on:

```js
enabled:    true,
action:     "<the form address your mailing tool gives you>",
nameField:  "<the field name it expects for a first name>",
emailField: "<the field name it expects for an email>"
```

The form posts into a hidden frame, so the page never reloads and the visitor
goes straight to their result.

**Check a real signup arrives before you rely on it.** Because the form posts
without waiting for an answer, a wrong address fails silently — the visitor
still sees their result and nothing looks broken, but nobody joins the list.
Sign yourself up once and confirm you appear in the list.

A few notes on the data, since these are people in a vulnerable moment:

- The consent box starts unticked and the form will not submit without it
- Turn on double opt-in in your mailing tool, so nobody is added by a typo
- Add your privacy page to `privacyText` / `privacyHref` and it appears as a
  link under the consent line

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
- Button reads "Book a free 15 minute call" and points at the Stan store link
- Pink background measured as full-width at every one of those widths
- `tq-bleed` checked inside a narrow 900px column at 360 / 768 / 1280 / 1600 px,
  including the scrollbar arithmetic, with no sideways scroll
- No console errors, no JavaScript errors
- Zero horizontal overflow at 320 / 360 / 390 / 412 / 430 / 540 / 767 / 1024 px
- Contrast measured on the rendered page rather than on paper: every piece of
  text on the question, email and result screens meets WCAG AA against the
  background it actually sits on

On the email screen specifically:

- The main quiz is unchanged with the screen switched off — it still runs
  straight from the last question to the result
- Empty email, malformed email and an unticked consent box are each refused,
  and none of them let anyone slip through to the result
- A real signup was posted to a test server: first name, email and consent all
  arrived with the right field names, and the page did not reload
- Skip link, Back to question 8 with the answer still selected, and restart
  all behave
- No sideways scrolling at 320 / 360 / 390 / 412 / 430 / 540 / 767 px
