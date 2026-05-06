# LifeFlow — Accessibility Features Report

All features below are active for every user by default — no profile selection required.

---

## Physical Accessibility

| WCAG Guideline | Screen | What You See |
|---|---|---|
| **Keyboard Access** — All features work via keyboard, no mouse needed | Step Runner | Arrow keys (← →) move between steps. Space/Enter confirms. Escape exits the task. Keyboard shortcuts are shown on screen at all times |
| **No Complex Gestures** — No drag, swipe, or multi-touch required | Entire App | Everything works with a simple single tap or click. No drag-and-drop anywhere in the app |
| **Large Touch Targets** — Buttons are big enough to tap easily | Entire App | All buttons, links, and inputs are at minimum 52×52px — well above the WCAG minimum of 24px |
| **Confirm Before Actions** — No accidental completions or exits | Step Runner | A confirmation dialog appears before completing or exiting a task, preventing accidental taps |
| **Visible Focus Indicator** — Keyboard users can always see where they are | Entire App | A thick coloured outline (3px) appears on whichever button or link is currently focused |
| **Consistent Navigation** — The menu never moves or changes | Entire App | Sidebar on desktop and bottom bar on mobile are in the same place on every single screen |
| **Form Labels** — Every input field is clearly labelled | Create Task, Settings | Each field has a visible label directly above it (e.g. "Task title", "Description", "Est. minutes") |

---

## Visual Accessibility

| WCAG Guideline | Screen | What You See |
|---|---|---|
| **Labels on Icons** — Nothing relies on an icon alone | Navigation, Header, Settings | Every icon button has a text label next to or below it. E.g. Settings icon always shows "Settings" text |
| **Colour Not Used Alone** — Information is never conveyed by colour only | Dashboard, Task Manager | Completed tasks show a green icon AND strikethrough text — not just a colour change |
| **High Contrast** — Text is dark and clearly readable | Entire App | High Contrast toggle in Settings switches all text to near-black on light backgrounds for stronger readability |
| **Resizable Text** — Text can be made bigger | Settings | Text size control (− / +) in Settings. Ranges from Small to Largest, applied across the whole app |
| **Responsive Layout** — Content adapts to screen size | Entire App | Layout switches from single-column on mobile to multi-column on desktop. Nothing gets cut off or requires sideways scrolling |
| **Clear Headings** — Sections are clearly titled | All Screens | Every section has a visible heading (e.g. "Active Tasks", "Visual Settings", "Steps") — screen readers can also jump between them |
| **Underlined Links** — Links in text are always distinct | Entire App | Any link inside a paragraph is always underlined, never relying on colour alone to indicate it is clickable |

---

## Auditory Accessibility

| WCAG Guideline | Screen | What You See |
|---|---|---|
| **No Auto-Playing Audio** — App never plays sound without permission | Entire App | The app is completely silent. No sound effects, no audio alerts, no voice instructions anywhere |
| **Visual Error Messages** — Errors are shown on screen, not announced by sound | Create Task, Settings | When a field is left empty, a red error message appears directly under it with a clear description |
| **Written Labels Everywhere** — All actions have clear written instructions | Entire App | Every button, toggle, and input has a text label — nothing depends on hearing or audio |
| **Visual Notifications** — Status changes are shown on screen clearly | Step Runner | A bold green "Step complete ✓" banner appears on screen after every step — clearly visible without any sound |
| **Extended Alert Duration** — Notifications stay visible long enough to read | Step Runner, Task Completion | Success messages stay on screen for 8 seconds so there is no risk of missing them |
| **Progress Always Visible** — Current status is always on screen | Step Runner | A progress bar at the top of every task shows exactly how many steps are done and how many remain |

---

## Cognitive Accessibility

| WCAG Guideline | Screen | What You See |
|---|---|---|
| **Dyslexia-Friendly Font** — Easier to read typeface | Entire App | Lexend font is used throughout — a typeface specifically designed for people with dyslexia and reading difficulties |
| **Wider Spacing** — Text is not cramped | Entire App | Line height (1.7) and letter spacing (0.03em) are increased app-wide. Line length is capped at 65 characters — making reading much less tiring |
| **Consistent Navigation** — UI is predictable, no surprises | Entire App | Same layout, same menu, same button positions on every screen — users never have to re-learn where things are |
| **Clear Error Messages** — Errors are friendly, not confusing | Create Task | Error messages say exactly what went wrong: "Task title is required." — no vague or technical messages |
| **Error Fix Suggestions** — App tells you how to fix mistakes | Create Task | Below each error, a helpful hint appears: "Type a short name for your task." |
| **Step-by-Step Guidance** — Tasks broken into small manageable steps | Step Runner | Every task is presented one step at a time with a clear title and instruction — never the whole task at once |

---