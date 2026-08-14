/* ============================================================
   Are You in a Trauma Bond? — logic (vanilla JS, no dependencies)
   ------------------------------------------------------------
   Everything you are likely to change lives in the two blocks
   below: QUESTIONS and RESULTS. Nothing else needs touching.

   Each option has a "weight". Your scoring is:
       A = 0    B = 1    C = 2    D = 3
   The weights add up and the total decides which RESULTS entry
   is shown. Max possible score = 8 questions x 3 = 24.

   Your four score bands:
       0–5    Healthy & Secure Dynamics
       6–11   Mild to Moderate Dysfunctional Attachment
       12–18  Moderate Trauma Bond Dynamics
       19–24  Severe Trauma Bond & Survival Mode

   Want ONE ending for everybody instead of four?
   Delete the first three entries in RESULTS and leave the last
   one (upTo: 24). The quiz will show it to every visitor.
   ============================================================ */

var QUESTIONS = [
  {
    eyebrow: "The “Walking on Eggshells” Pattern",
    text: "When you think about communicating your boundaries, needs, or feelings to your partner, what goes through your mind?",
    options: [
      { text: "I feel safe and comfortable expressing myself, even if we end up disagreeing.", weight: 0 },
      { text: "I hesitate, but I usually bring things up after a little while.", weight: 1 },
      { text: "I carefully gauge their mood first and often decide it’s safer to keep my feelings to myself to avoid a blowout or cold shoulder.", weight: 2 },
      { text: "I feel intense anxiety or terror. I hide my true self because speaking up usually results in severe emotional punishment, rage, or total withdrawal.", weight: 3 }
    ]
  },
  {
    eyebrow: "The Highs and Lows (Intermittent Reinforcement)",
    text: "How would you describe the emotional rhythm of your relationship?",
    options: [
      { text: "Steady, consistent, and generally calm, even when life gets stressful.", weight: 0 },
      { text: "Mostly stable, though we have occasional rough patches like any couple.", weight: 1 },
      { text: "A constant roller coaster. When things are good, they are amazing, but the low periods are deeply confusing and painful.", weight: 2 },
      { text: "Extreme hot and cold. I am constantly chasing the excitement of the early days or waiting for the loving, attentive version of them to return.", weight: 3 }
    ]
  },
  {
    eyebrow: "Taking the Blame (The Inner Child Defender)",
    text: "When a conflict occurs or your partner hurts your feelings, how do you usually respond internally?",
    options: [
      { text: "I evaluate the situation objectively and address the issue together as a team.", weight: 0 },
      { text: "I sometimes doubt myself, but I can recognise when my partner is in the wrong.", weight: 1 },
      { text: "I quickly blame myself, wondering what I did wrong or how I can change my behaviour to fix their mood.", weight: 2 },
      { text: "I feel overwhelming shame, as if I am “bad” or broken. I apologise profusely, even for things I didn’t do, just to restore peace and stop the tension.", weight: 3 }
    ]
  },
  {
    eyebrow: "Isolation and Guilt",
    text: "How does your relationship impact your connections with friends, family, or personal interests?",
    options: [
      { text: "My partner encourages me to maintain my independence, friendships, and hobbies.", weight: 0 },
      { text: "I spend a bit less time with others than I used to, but I still keep my core support network.", weight: 1 },
      { text: "I feel guilty spending time away from my partner or find myself hiding details of our relationship from loved ones to protect my partner’s image.", weight: 2 },
      { text: "I have become largely isolated. I feel like I have to choose between my partner and everyone else, or I feel too exhausted and ashamed to talk to anyone.", weight: 3 }
    ]
  },
  {
    eyebrow: "Childhood Familiarity (Schema Activation)",
    text: "Does the way you feel in this relationship ever remind you of how you felt growing up?",
    options: [
      { text: "No, this relationship feels fundamentally different, safer, and healthier than my childhood dynamic.", weight: 0 },
      { text: "Occasionally, a conflict triggers an old memory, but I can process it and separate the past from the present.", weight: 1 },
      { text: "Yes, the feeling of having to “earn” love, prove my worth, or prevent someone from abandoning me feels uncomfortably familiar.", weight: 2 },
      { text: "Deeply. I feel the exact same desperate, unsafe, or invisible feeling I experienced as a child trying to keep an unpredictable parent calm or loving.", weight: 3 }
    ]
  },
  {
    eyebrow: "Physical and Emotional Hypervigilance",
    text: "How does your body physically react when you are around your partner or expecting them home?",
    options: [
      { text: "My body feels relaxed, grounded, and at ease.", weight: 0 },
      { text: "Mostly neutral or relaxed, unless we are in the middle of an active argument.", weight: 1 },
      { text: "I often feel a slight physical tightness (stomach knots, shallow breathing, neck tension) as I brace for their reaction or mood.", weight: 2 },
      { text: "My nervous system is constantly on high alert. I monitor their tone of voice, footsteps, or text messaging cadence to sense danger before it happens.", weight: 3 }
    ]
  },
  {
    eyebrow: "Protecting and Justifying",
    text: "When your partner treats you poorly, breaks a promise, or crosses a major boundary, how do you handle it?",
    options: [
      { text: "I address it directly, hold them accountable, and re-evaluate if this relationship is healthy for me.", weight: 0 },
      { text: "I express my disappointment, though it sometimes takes a few conversations to resolve.", weight: 1 },
      { text: "I focus heavily on their past trauma, stress, or good intentions to make excuses for their behaviour.", weight: 2 },
      { text: "I defend them fiercely to others and myself. I minimise the behaviour, telling myself “If only I were more supportive/patient, they wouldn’t act like this.”", weight: 3 }
    ]
  },
  {
    eyebrow: "Leaving vs. Staying",
    text: "Have you ever tried to leave or distance yourself from this relationship?",
    options: [
      { text: "If a relationship isn’t working or becomes unhealthy, I am capable of ending it and staying end-focused.", weight: 0 },
      { text: "I’ve thought about leaving during bad fights, but we’ve always been able to talk through our issues constructively.", weight: 1 },
      { text: "I’ve tried to break up or pull away multiple times, but the intense panic, guilt, or their sudden return to being loving brings me right back.", weight: 2 },
      { text: "The idea of leaving fills me with unbearable grief and pain, even though staying causes me severe psychological distress. I don’t think I can live without them. I feel trapped in a cycle I can’t break.", weight: 3 }
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
   total score that lands on this ending. Keep them in order.

   Each "body" item can be either:
     - a plain string            -> renders as a paragraph
     - { label: "...", text: "..." } -> renders with a small
       pink heading above the paragraph                        */
var RESULTS = [
  {
    upTo: 5,
    mark: FLOWER,
    title: "Healthy & Secure Dynamics",
    body: [
      { label: "What your results mean",
        text: "Your responses suggest that your relationship is grounded in mutual respect, emotional safety, and open communication. While no relationship is perfect, you do not display the core signs of a trauma bond." },
      { label: "An Inner Child Perspective",
        text: "Your wounded inner child is not leading the dynamic in your current relationship. You are able to access your Wise Adult self to set boundaries, express your authentic feelings, and protect your emotional well-being without fear of abandonment or retaliation." }
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  },
  {
    upTo: 11,
    mark: FLOWER,
    title: "Mild to Moderate Dysfunctional Attachment",
    body: [
      { label: "What your results mean",
        text: "You are experiencing some red flags commonly seen in unhealthy or insecure relationships. While you may not be fully trapped in a trauma bond, there are patterns of people-pleasing, boundary neglect, or emotional anxiety surfacing in your connection." },
      { label: "An Inner Child Perspective",
        text: "Parts of your young self may be activating when tension arises, leading you to walk on eggshells or minimise your own needs to preserve peace. Recognising these early warning signs is a powerful way to re-parent your inner child and practice setting firmer boundaries before deeper toxicity sets in." }
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  },
  {
    upTo: 18,
    mark: FLOWER,
    title: "Moderate Trauma Bond Dynamics",
    body: [
      { label: "What your results mean",
        text: "Your scores indicate a clear presence of a trauma bond. You likely find yourself stuck in a painful cycle of high highs and low lows, often questioning your own perception, taking on unfair blame, or feeling unable to walk away despite ongoing distress." },
      { label: "An Inner Child Perspective",
        text: "A trauma bond forms when an adult relationship mirrors the unresolved attachment wounds of childhood - where love was intermittent, conditional, or tied to keeping a caregiver calm. Your inner child is currently driving your relationship choices out of a deep survival desire to “fix” the dynamic and finally win the safe love you deserved as a child." }
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  },
  {
    upTo: 24,
    mark: FLOWER,
    title: "Severe Trauma Bond & Survival Mode",
    body: [
      { label: "What your results mean",
        text: "You are currently in a high-intensity trauma bond. Your nervous system is likely in a state of chronic hypervigilance (fight, flight, freeze, or fawn). The cycle of unpredictable warmth followed by emotional withdrawal or punishment has locked your body into a chemical attachment loop that feels almost impossible to break on your own." },
      { label: "An Inner Child Perspective",
        text: "Your frightened inner child is currently running your system in survival mode. The intense terror or panic you feel at the thought of leaving is not true emotional intimacy; it is an abandonment depression response rooted in childhood developmental trauma. Please know: this is not a weakness on your part, it is a physiological and psychological biological response to chronic unpredictability." }
    ],
    ctaText: "Book a free 20-minute call",
    ctaHref: "#"
  }
];

/* Small print. Edit or set to "" to remove. */
var QUIZ_NOTE   = "This is a gentle self-reflection, not a diagnosis.";
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
      var b = r.body[i];
      if (b && typeof b === "object") {
        if (b.label) html += '<p class="tq-body-label">' + esc(b.label) + "</p>";
        html += "<p>" + esc(b.text) + "</p>";
      } else {
        html += "<p>" + esc(b) + "</p>";
      }
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
    if (noteEl) {
      noteEl.textContent = SAFETY_NOTE || "";
      noteEl.hidden = !SAFETY_NOTE;
    }

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
      if (noteEl) noteEl.textContent = QUIZ_NOTE;
      renderQuestion();
    }
  });

  backBtn.addEventListener("click", function () {
    if (index > 0) { index--; renderQuestion(); }
  });

  if (noteEl) noteEl.textContent = QUIZ_NOTE;
  renderQuestion();
})();
