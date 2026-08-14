/* ============================================================
   Reflection Quiz — logic (vanilla JS, no dependencies)
   ------------------------------------------------------------
   Everything you are likely to change lives in the two blocks
   below: QUESTIONS and RESULTS. Nothing else needs touching.

   Each option has a "weight" (0–3). The weights add up and the
   total decides which RESULTS entry is shown.
   Max possible score = 8 questions x 3 = 24.

   Want ONE ending for everybody instead of three?
   Delete the first two entries in RESULTS and leave the last
   one (upTo: 24). The quiz will show it to every visitor.
   ============================================================ */

var QUESTIONS = [
  {
    eyebrow: "Your experience",
    text: "After a painful episode, they become warm and loving again. How does that shift usually leave you feeling?",
    options: [
      { text: "Relieved and settled — it feels like things are fine again", weight: 3 },
      { text: "Relieved, but bracing for the next downturn",               weight: 2 },
      { text: "Confused — I can't tell which version of them is real",     weight: 2 },
      { text: "It doesn't really change how I feel",                        weight: 0 }
    ]
  },
  {
    eyebrow: "Your experience",
    text: "How often do you find yourself explaining or softening their behaviour to other people?",
    options: [
      { text: "Almost always — I'd rather people didn't judge them", weight: 3 },
      { text: "Fairly often",                                        weight: 2 },
      { text: "Occasionally",                                        weight: 1 },
      { text: "Rarely or never",                                     weight: 0 }
    ]
  },
  {
    eyebrow: "Your experience",
    text: "When you picture yourself leaving, what comes up most strongly?",
    options: [
      { text: "A fear that I couldn't cope on my own",       weight: 3 },
      { text: "Guilt — that I'd be abandoning them",         weight: 3 },
      { text: "Sadness, but also a quiet sense of relief",   weight: 1 },
      { text: "I haven't let myself picture it",             weight: 2 }
    ]
  },
  {
    eyebrow: "Day to day",
    text: "How much of your day goes into reading or managing their mood?",
    options: [
      { text: "Most of it — I'm always half-watching",  weight: 3 },
      { text: "A good part of most days",               weight: 2 },
      { text: "Only when things are already tense",     weight: 1 },
      { text: "Very little",                            weight: 0 }
    ]
  },
  {
    eyebrow: "Looking back",
    text: "Growing up, how safe did it feel to say what you needed?",
    options: [
      { text: "Not safe — needing things caused trouble",        weight: 3 },
      { text: "It depended entirely on the mood in the house",   weight: 3 },
      { text: "Mostly safe, with some exceptions",               weight: 1 },
      { text: "Safe — I was heard",                              weight: 0 }
    ]
  },
  {
    eyebrow: "Looking back",
    text: "When something hurts you in this relationship, what do you tend to do first?",
    options: [
      { text: "Look for what I did to cause it",            weight: 3 },
      { text: "Go quiet and wait for it to pass",           weight: 2 },
      { text: "Say something, then apologise for saying it", weight: 2 },
      { text: "Name it calmly and expect to be heard",      weight: 0 }
    ]
  },
  {
    eyebrow: "You, right now",
    text: "How would you describe your sense of who you are at the moment?",
    options: [
      { text: "I've lost track of what I want or like",     weight: 3 },
      { text: "It's there, but faint",                      weight: 2 },
      { text: "Mostly intact — this has shaken it, though", weight: 1 },
      { text: "Clear and steady",                           weight: 0 }
    ]
  },
  {
    eyebrow: "You, right now",
    text: "Outside this relationship, how much support do you have?",
    options: [
      { text: "Almost none — I've drifted from most people", weight: 3 },
      { text: "One or two people, but I hold a lot back",    weight: 2 },
      { text: "A few people I can be honest with",           weight: 1 },
      { text: "A strong circle around me",                   weight: 0 }
    ]
  }
];

/* The little flower above the ending. Swap for your own SVG,
   an <img>, or set "mark" to "" on a result to hide it. */
var FLOWER =
  '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">' +
  '<circle cx="12"   cy="6.6"  r="4.3"/>' +
  '<circle cx="17.1" cy="10.3" r="4.3"/>' +
  '<circle cx="15.1" cy="16.4" r="4.3"/>' +
  '<circle cx="8.9"  cy="16.4" r="4.3"/>' +
  '<circle cx="6.9"  cy="10.3" r="4.3"/>' +
  '<circle cx="12"   cy="12"   r="2.9" fill="#fff"/></svg>';

/* Shown once, after the final question. "upTo" is the highest
   total score that lands on this ending. Keep them in order. */
var RESULTS = [
  {
    upTo: 8,
    mark: FLOWER,
    title: "You're noticing something — and noticing is where it starts",
    body: [
      "From your answers, you still have a good deal of your own ground under you. You can see the relationship from the outside, you have people around you, and your sense of yourself hasn't disappeared.",
      "That doesn't make what you're feeling small. Something brought you here, and it's worth listening to."
    ],
    next: [
      "Write down the moments that made you look for this quiz",
      "Say one honest sentence about it to someone you trust",
      "Notice when you shrink a need — and let yourself keep it"
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  },
  {
    upTo: 16,
    mark: FLOWER,
    title: "The pattern is starting to cost you",
    body: [
      "Your answers describe a relationship you're constantly managing — reading moods, softening the story for others, putting your own reactions last. That takes an enormous amount of energy, and it rarely stays inside the relationship.",
      "Very often this pattern feels familiar because it is. When needing things wasn't safe early on, staying attuned to someone else's mood became the way to stay safe. It made sense then. It's costing you now."
    ],
    next: [
      "Track a week: note the moments you edited yourself",
      "Reconnect with one person you've drifted from",
      "Work with someone who understands trauma bonding, not just conflict"
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  },
  {
    upTo: 24,
    mark: FLOWER,
    title: "You've been carrying this for a long time",
    body: [
      "What you've described has the shape of a trauma bond: relief and fear taking turns until the two become hard to tell apart, self-blame arriving before anger, and a sense of yourself that has quietly gone faint.",
      "This isn't weakness, and it isn't a failure of judgement. Bonds like this form precisely because the nervous system is doing what it learned to do early — stay close, stay attuned, stay safe. You didn't choose it, and you don't have to unpick it alone."
    ],
    next: [
      "Be gentle with yourself today — this took something to answer",
      "Tell one safe person where you actually are",
      "Reach out for structured support; this is very workable with the right help"
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  }
];

/* Small print under the ending. Edit or set to "" to remove. */
var SAFETY_NOTE = "If you are in immediate danger, please contact your local emergency services.";

/* ============================================================
   Below here is the machinery. You shouldn't need to edit it.
   ============================================================ */

(function () {
  "use strict";

  var screenEl = document.getElementById("tq-screen");
  var barFill  = document.getElementById("tq-bar-fill");
  var barOuter = document.getElementById("tq-bar-outer");
  var stepEl   = document.getElementById("tq-step-label");
  var pctEl    = document.getElementById("tq-pct");
  var backBtn  = document.getElementById("tq-back");
  var progress = document.querySelector(".tq-progress");
  var noteEl   = document.getElementById("tq-note");

  var index       = 0;          // current question
  var answers     = [];         // chosen weight per question
  var selectedIdx = [];         // which option was picked (for the Back view)

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function setProgress(step) {
    // "where you are in the sequence": Q1 of 8 = 12%, Q8 of 8 = 100%.
    var done = step >= QUESTIONS.length;
    var pct  = done ? 100 : Math.round(((step + 1) / QUESTIONS.length) * 100);
    barFill.style.width = pct + "%";
    barOuter.setAttribute("aria-valuenow", String(pct));
    pctEl.textContent = pct + "%";
    stepEl.textContent = done
      ? "Complete"
      : "Question " + (step + 1) + " of " + QUESTIONS.length;
  }

  function renderQuestion() {
    var q = QUESTIONS[index];
    var html = "";

    if (q.eyebrow) html += '<p class="tq-eyebrow">' + esc(q.eyebrow) + "</p>";
    html += '<h1 class="tq-q">' + esc(q.text) + "</h1>";
    html += '<ul class="tq-options">';

    for (var i = 0; i < q.options.length; i++) {
      var selected = selectedIdx[index] === i;
      html += "<li><button type=\"button\" class=\"tq-option" +
              (selected ? " is-selected" : "") +
              "\" data-i=\"" + i + "\">" + esc(q.options[i].text) +
              "</button></li>";
    }

    html += "</ul>";
    screenEl.innerHTML = html;

    setProgress(index);
    backBtn.hidden = index === 0;
    progress.hidden = false;
    if (noteEl) noteEl.hidden = false;

    var first = screenEl.querySelector(".tq-option");
    if (first && index > 0) first.focus();
  }

  function choose(optIndex) {
    var q = QUESTIONS[index];
    answers[index]     = q.options[optIndex].weight;
    selectedIdx[index] = optIndex;

    if (index < QUESTIONS.length - 1) {
      index++;
      renderQuestion();
    } else {
      renderResult();
    }
  }

  function totalScore() {
    var t = 0;
    for (var i = 0; i < answers.length; i++) t += (answers[i] || 0);
    return t;
  }

  function pickResult(score) {
    for (var i = 0; i < RESULTS.length; i++) {
      if (score <= RESULTS[i].upTo) return RESULTS[i];
    }
    return RESULTS[RESULTS.length - 1];
  }

  function renderResult() {
    var r = pickResult(totalScore());
    var html = '<div class="tq-result">';

    if (r.mark) html += '<div class="tq-result-mark" aria-hidden="true">' + r.mark + "</div>";
    html += "<h2>" + esc(r.title) + "</h2>";

    for (var i = 0; i < r.body.length; i++) {
      html += "<p>" + esc(r.body[i]) + "</p>";
    }

    if (r.next && r.next.length) {
      html += '<div class="tq-next"><p class="tq-next-title">Where to go from here</p><ul>';
      for (var j = 0; j < r.next.length; j++) html += "<li>" + esc(r.next[j]) + "</li>";
      html += "</ul></div>";
    }

    if (r.ctaText) {
      html += '<a class="tq-cta" href="' + esc(r.ctaHref || "#") + '">' + esc(r.ctaText) + "</a>";
    }

    html += '<button type="button" class="tq-restart" id="tq-restart">Take the quiz again</button>';
    html += "</div>";

    screenEl.innerHTML = html;

    setProgress(QUESTIONS.length);
    backBtn.hidden = true;
    if (noteEl) noteEl.textContent = SAFETY_NOTE || "";
    if (noteEl && !SAFETY_NOTE) noteEl.hidden = true;

    var h = screenEl.querySelector("h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }

  /* --- events (delegated, so re-rendering never loses them) --- */

  screenEl.addEventListener("click", function (e) {
    var opt = e.target.closest(".tq-option");
    if (opt) { choose(Number(opt.getAttribute("data-i"))); return; }

    if (e.target.id === "tq-restart") {
      index = 0;
      answers = [];
      selectedIdx = [];
      if (noteEl) noteEl.textContent = "This is a gentle self-reflection, not a diagnosis.";
      renderQuestion();
    }
  });

  backBtn.addEventListener("click", function () {
    if (index > 0) { index--; renderQuestion(); }
  });

  renderQuestion();
})();
