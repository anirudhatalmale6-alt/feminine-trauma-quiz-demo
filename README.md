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
  --tq-pink-deep:  #F47C9E;   /* SITE - headings, small labels  */
  --tq-rose-ink:   #333333;   /* SITE - body text               */
  --tq-muted:      #333333;   /* SITE - small print             */
  --tq-line:       #FFC9D4;   /* hairlines / card border        */
  --tq-track:      #FFFFFF;   /* empty part of the progress bar */
}
```

Change those values and the whole quiz follows. If you change them, change the
copy of the palette in the `@media (prefers-color-scheme: dark)` block at the
bottom of the same file too — that block is what stops Android phones in auto
dark mode from repainting the quiz in their own grey colours.

**Headings use your own #F47C9E**, exactly as they do on your website, and
every other piece of text is either that pink or your charcoal `#333333`.
There are no invented shades in here at all.

All the small print — "Question 3 of 8", the Back link, "8 questions, about
three minutes" and "This is a gentle self-reflection, not a diagnosis" — uses
the charcoal. It is all driven by one variable, `--tq-muted`, so if you ever
want that print softer, change that one line rather than hunting for it.

One thing to be aware of, so that it is your decision and not a surprise:
#F47C9E on white measures **2.6:1**, and the accepted standard for readable
text is 4.5:1 for normal sizes, or 3:1 for large headings. Your own website
already uses the pink this way, so the quiz now matches it — but the small
uppercase labels are the ones some people will struggle with. If that ever
comes up, change `--tq-pink-deep` to `#333333` and every label turns charcoal
in one edit. The big headings will still be pink.

Two places deliberately do **not** use the pink, because there it sits on the
pale pink background rather than a white card and drops to 2.0:1, which is
close to invisible. Those use your charcoal instead: the percentage on the
progress bar, and "Take this quiz to find out" on the intro page.

Buttons use the pink as a *background* with charcoal text, not white text:
white on that pink is the same unreadable 2.6:1, while charcoal on it is
4.95:1 and passes comfortably. Selected answers do the same thing.

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

## The intro page

`intro.html` is the landing page that sits in front of the quiz — your copy,
your logo, your photo, and a button through to the questions.

| File | Purpose |
|---|---|
| `intro.html` | The page. The drop-in block is `<div id="vw-intro">` |
| `intro.css` | Layout only — no colours |
| `intro-single-file.html` | Everything inlined, images included. One file |
| `logo.jpg`, `vienna.jpg` | Resized for the web from the originals you sent |

**It has no colours of its own.** `intro.css` is layout, and every colour and
the font stack come from the `:root` block in `quiz.css`. Load `quiz.css`
first, then `intro.css`, and the intro page and the quiz can never drift apart
— change a pink once and both follow.

**Point the button at your quiz.** Both "Start the quiz" links are set to
`index.html` so they work in the demo. On your own site, change the two
`href` values to the address of the page holding the quiz.

The logo is used inside the white card rather than on the pink, because the
file you sent is a JPEG with a white background baked into it — on the pink it
would show as a white rectangle. If you ever get a PNG version with a
transparent background from your designer, it can sit anywhere.

`intro-single-file.html` has both images embedded in the file itself, so there
is nothing to upload alongside it. If you would rather serve them from your
media library, use `intro.html` and change the two `src` values.

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
- Contrast measured on the rendered page rather than on paper. Everything meets
  WCAG AA against the background it actually sits on, apart from the pink text
  on white, which is your brand colour and your decision — that is listed as a
  known exception in the checks, so anything *else* slipping below the line
  still shows up as a failure

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

On the intro page:

- Both builds load with no console errors and no failed requests
- Logo and photo both render at their real size, in both builds
- Every link on the page checked for a real 200 response, not just for
  being present
- Pink runs full width, and no sideways scrolling at 320 through 1280 px —
  tested by actually scrolling sideways, since `scrollWidth` can under-report
- Every piece of text meets WCAG AA against the background it sits on
