# Turns the two single-file builds into blocks that can be pasted into a
# WordPress page. A single-file build is a WHOLE html document; a page needs
# just the bit that goes inside the theme's content area.
#
# Two things have to be neutralised on the way:
#
# 1. The page reset <style>html,body{...background:#FFDBE0}</style> exists so the
#    demo is pink edge to edge. Dropped into Vienna's site it would repaint HIS
#    WHOLE SITE pink, header and footer included.
#
# 2. Every "<" inside the <script>. WordPress runs wptexturize over post
#    content, which is supposed to skip <script> - but it finds tags by scanning
#    from "<" to the next ">", so a plain comparison like `i < r.body.length`
#    opens a tag that only "closes" pages later inside an HTML string. After
#    that the filter no longer believes it is inside a script, and it rewrote
#    `&&` as `&#038;&#038;`, which breaks the quiz with "Invalid or unexpected
#    token". Escaping every "<" in the script means no fake tag can ever open.
#    Comparisons are flipped (a < b -> b > a); every other "<" is inside a
#    string literal, where \x3c is the identical character to the browser.
import io, re, sys

D = "/var/lib/freelancer/projects/40647965/"
RESET = "<style>html,body{margin:0;padding:0;background:#FFDBE0;}</style>"

# Real comparisons in quiz.js. These are FLIPPED (a < b -> b > a) rather than
# escaped, because \x3c is only a "<" inside a string; as an operator it is a
# syntax error. Everything else is inside an HTML string and gets escaped.
#
# The list is not trusted: after flipping, anything still matching "<" not
# followed by a letter, "/" or "!" is a comparison this list missed, and the
# build stops. That check is what caught `j < r.next.length` on a line that also
# built "<li>" - grepping for lines "with a comparison" had classified it as an
# HTML line and skipped it.
FLIPS = [
    ("for (var i = 0; i < q.options.length; i++)", "for (var i = 0; q.options.length > i; i++)"),
    ("if (index < QUESTIONS.length - 1)",          "if (QUESTIONS.length - 1 > index)"),
    ("for (var i = 0; i < answers.length; i++)",   "for (var i = 0; answers.length > i; i++)"),
    ("for (var i = 0; i < RESULTS.length; i++)",   "for (var i = 0; RESULTS.length > i; i++)"),
    ("if (score <= RESULTS[i].upTo)",              "if (RESULTS[i].upTo >= score)"),
    ("for (var i = 0; i < r.body.length; i++)",    "for (var i = 0; r.body.length > i; i++)"),
    ("for (var j = 0; j < r.next.length; j++)",    "for (var j = 0; r.next.length > j; j++)"),
]


def harden_script(js):
    for a, b in FLIPS:
        if js.count(a) != 1:
            print("ABORT: expected exactly one %r in quiz.js, found %d - quiz.js has "
                  "changed and this list needs updating" % (a, js.count(a)))
            sys.exit(1)
        js = js.replace(a, b)
    js = js.replace("an <img>,", "an img tag,")

    left = [m.start() for m in re.finditer(r"<(?![A-Za-z/!])", js)]
    if left:
        print("ABORT: %d comparison(s) left unflipped in quiz.js - add them to FLIPS:" % len(left))
        for i in left[:5]:
            print("   ...%s..." % js[max(0, i - 60):i + 40].replace("\n", " "))
        sys.exit(1)

    js = js.replace("<", "\\x3c")
    if "<" in js:
        print("ABORT: script still contains a bare '<'")
        sys.exit(1)
    return js


def fragment(src, want_id):
    s = io.open(D + src, encoding="utf-8").read()
    if RESET not in s:
        print("ABORT: page reset not found in", src, "- has the build changed?")
        sys.exit(1)
    head = s.split("</head>")[0]
    body = s.split("<body>")[1].split("</body>")[0]

    styles = [x for x in re.findall(r"<style>.*?</style>", head, re.S) if x != RESET]
    if not styles:
        print("ABORT: no styles kept for", src)
        sys.exit(1)
    # CSS comments quoting markup would open fake tags too. Sanitise the CSS
    # INSIDE the tags only - an earlier version ran this over the whole string
    # and ate the <style> and </style> delimiters themselves, so the page shipped
    # with its stylesheet as inert text and the quiz rendered completely unstyled.
    # CSS has no legitimate "<", so removing every one of them inside is safe.
    def clean_css(block):
        inner = block[len("<style>"):-len("</style>")]
        return "<style>" + inner.replace("<", "") + "</style>"
    styles = [clean_css(x) for x in styles]
    for x in styles:
        if not (x.startswith("<style>") and x.endswith("</style>")):
            print("ABORT: style block lost its tags"); sys.exit(1)

    def fix(m):
        return "<script>" + harden_script(m.group(1)) + "</script>"
    body = re.sub(r"<script>(.*?)</script>", fix, body, flags=re.S)

    out = "\n".join(styles) + "\n" + body.strip() + "\n"

    if 'id="%s"' % want_id not in out:
        print("ABORT:", src, "fragment lost", want_id)
        sys.exit(1)
    for stray in ("<html", "</html>", "<head", "</head>", "<body", "</body>", "<!doctype"):
        if stray in out.lower():
            print("ABORT:", src, "fragment still carries", stray)
            sys.exit(1)
    return out


def node_check(js, label):
    """The transformation is only trustworthy if a JS engine still accepts it."""
    import subprocess, tempfile, os
    fh, path = tempfile.mkstemp(suffix=".js")
    os.write(fh, js.encode("utf-8")); os.close(fh)
    r = subprocess.run(["node", "--check", path], capture_output=True, text=True)
    os.unlink(path)
    if r.returncode != 0:
        print("ABORT: hardened script for %s does not parse:" % label)
        print("   ", r.stderr.strip().split("\n")[0:4])
        sys.exit(1)
    print("   node --check %s: OK" % label)


for src, dst, want_id in (
    ("quiz-single-file.html",  "wordpress-quiz-block.html",  "tq-quiz"),
    ("intro-single-file.html", "wordpress-intro-block.html", "vw-intro"),
):
    out = fragment(src, want_id)
    io.open(D + dst, "w", encoding="utf-8").write(out)
    scripts = re.findall(r"<script>(.*?)</script>", out, re.S)
    for sc in scripts:
        node_check(sc, dst)
    print("%-28s %7d bytes  scripts:%d  bare '<' in script: %d"
          % (dst, len(out), len(scripts), sum(x.count("<") for x in scripts)))
