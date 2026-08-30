from pathlib import Path
from textwrap import wrap

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas


OUT_DIR = Path("public/downloads")
PAGE_W, PAGE_H = letter
MARGIN = 0.55 * inch
ACCENT = colors.HexColor("#2563eb")
TEXT = colors.HexColor("#172033")
MUTED = colors.HexColor("#5f6b7a")
LINE = colors.HexColor("#d8dee8")
SOFT = colors.HexColor("#eef5ff")


def draw_wrapped(c, text, x, y, width, size=9.5, leading=12, color=TEXT, font="Helvetica"):
    c.setFont(font, size)
    c.setFillColor(color)
    max_chars = max(30, int(width / (size * 0.46)))
    for line in wrap(text, max_chars):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_checkbox(c, x, y, label, width, size=9.5):
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1)
    c.rect(x, y - 2, 9, 9)
    return draw_wrapped(c, label, x + 15, y, width - 15, size=size, leading=12)


def header(c, title, subtitle):
    c.setFillColor(ACCENT)
    c.rect(0, PAGE_H - 0.95 * inch, PAGE_W, 0.95 * inch, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN, PAGE_H - 0.43 * inch, title)
    c.setFont("Helvetica", 9.5)
    c.drawString(MARGIN, PAGE_H - 0.68 * inch, subtitle)


def section_title(c, title, y):
    c.setFillColor(SOFT)
    c.roundRect(MARGIN, y - 0.19 * inch, PAGE_W - 2 * MARGIN, 0.31 * inch, 6, stroke=0, fill=1)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(MARGIN + 0.12 * inch, y - 0.07 * inch, title)
    return y - 0.36 * inch


def footer(c):
    c.setStrokeColor(LINE)
    c.line(MARGIN, 0.55 * inch, PAGE_W - MARGIN, 0.55 * inch)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(MARGIN, 0.38 * inch, "PetVitals - educational planning resource, not veterinary, insurance, or financial advice.")
    c.drawRightString(PAGE_W - MARGIN, 0.38 * inch, "getpetvitals.com")


def draw_note_box(c, y, title, body):
    c.setFillColor(colors.HexColor("#f8fafc"))
    c.roundRect(MARGIN, y - 0.8 * inch, PAGE_W - 2 * MARGIN, 0.72 * inch, 7, stroke=0, fill=1)
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN + 0.15 * inch, y - 0.26 * inch, title)
    return draw_wrapped(c, body, MARGIN + 0.15 * inch, y - 0.43 * inch, PAGE_W - 2 * MARGIN - 0.3 * inch, size=8.5, leading=11, color=MUTED)


def insurance_checklist(path):
    c = canvas.Canvas(str(path), pagesize=letter)
    header(c, "Pet Insurance Cost Comparison Checklist", "Use the same settings on every quote before choosing the lowest price.")
    y = PAGE_H - 1.25 * inch
    y = section_title(c, "1. Match the quote settings", y)
    for item in [
        "Same pet profile: species, breed, age, sex, ZIP code, and spay/neuter status.",
        "Same plan type: accident-only, accident and illness, or wellness add-on.",
        "Same annual deductible, reimbursement rate, and annual limit.",
        "Same optional add-ons, especially exam fees, dental illness, wellness, and behavioral coverage.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    y = section_title(c, "2. Check the exclusions before price", y - 0.05 * inch)
    for item in [
        "Pre-existing condition definition and lookback period.",
        "Waiting periods for accidents, illnesses, orthopedic issues, cruciate ligament injuries, and dental disease.",
        "Breed-specific, hereditary, congenital, bilateral, or chronic-condition limits.",
        "Whether emergency exam fees, specialists, diagnostics, prescriptions, and hospitalization are reimbursed.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    y = section_title(c, "3. Provider comparison table", y - 0.05 * inch)
    cols = ["Provider", "Monthly", "Deductible", "Reimb.", "Limit", "Notes"]
    widths = [1.25, 0.85, 0.95, 0.75, 0.85, 1.55]
    x = MARGIN
    c.setFillColor(colors.HexColor("#f8fafc"))
    c.rect(MARGIN, y - 0.2 * inch, PAGE_W - 2 * MARGIN, 0.28 * inch, stroke=0, fill=1)
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8)
    for col, width in zip(cols, widths):
        c.drawString(x + 4, y - 0.1 * inch, col)
        x += width * inch
    y -= 0.22 * inch
    c.setStrokeColor(LINE)
    for _ in range(5):
        c.line(MARGIN, y, PAGE_W - MARGIN, y)
        y -= 0.34 * inch
    c.line(MARGIN, y + 0.34 * inch, MARGIN, y + 2.02 * inch)
    x = MARGIN
    for width in widths:
        x += width * inch
        c.line(x, y + 0.34 * inch, x, y + 2.02 * inch)

    draw_note_box(
        c,
        y - 0.12 * inch,
        "Decision rule",
        "A cheaper policy is not automatically better. Choose the quote that keeps a large emergency affordable after deductible, coinsurance, annual limit, and exclusions.",
    )
    footer(c)
    c.save()


def emergency_checklist(path):
    c = canvas.Canvas(str(path), pagesize=letter)
    header(c, "Emergency Vet Cost Planning Checklist", "Prepare the money, records, and decisions before an urgent visit happens.")
    y = PAGE_H - 1.25 * inch
    y = section_title(c, "Emergency contacts", y)
    for item in [
        "Nearest 24-hour emergency hospital: name, phone, address, and driving time.",
        "Backup emergency hospital if the first clinic is full.",
        "Primary veterinarian phone number and after-hours instructions.",
        "Poison control phone number and your pet insurance claim contact.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    y = section_title(c, "Payment and insurance readiness", y - 0.05 * inch)
    for item in [
        "Know whether the clinic requires payment at checkout.",
        "Save a credit card, emergency fund, or financing option for upfront payment.",
        "Write down your deductible, reimbursement rate, annual limit, and waiting periods.",
        "Keep policy number, provider login, and claim submission steps easy to find.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    y = section_title(c, "What to bring", y - 0.05 * inch)
    for item in [
        "Medication names, doses, and timing.",
        "Medical records, vaccine records, and recent lab results if available.",
        "Product label, plant photo, food package, or toxin package if exposure is possible.",
        "Timeline: when signs started, what changed, what your pet ate, and any first-aid steps already taken.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    draw_note_box(
        c,
        y - 0.1 * inch,
        "Emergency rule",
        "Do not wait for severe symptoms after toxin exposure, inability to urinate, breathing trouble, collapse, seizure, major trauma, repeated vomiting, or pale gums. Call a veterinarian or emergency clinic.",
    )
    footer(c)
    c.save()


def cleaning_checklist(path):
    c = canvas.Canvas(str(path), pagesize=letter)
    header(c, "Pet-Safe Cleaning Checklist", "Use this before mopping, disinfecting, or cleaning pet-contact surfaces.")
    y = PAGE_H - 1.25 * inch
    y = section_title(c, "Before cleaning", y)
    for item in [
        "Move dogs and cats to another room before spraying, mopping, or disinfecting.",
        "Pick up food bowls, water bowls, toys, beds, litter mats, and chew items.",
        "Read the product label for dilution, contact time, ventilation, and rinse instructions.",
        "Avoid mixing cleaners, especially bleach with ammonia, vinegar, or acids.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    y = section_title(c, "Choose the lower-residue option", y - 0.05 * inch)
    for item in [
        "Routine sealed floors: steam if floor-compatible, or a tiny amount of mild unscented soap.",
        "Urine, vomit, or stool: enzymatic pet accident cleaner used as directed.",
        "Cat homes: avoid essential oils, phenols, pine-oil cleaners, ammonia, strong fragrance, and wet residue.",
        "Disinfecting: use only when needed, complete contact time, ventilate, rinse if required, and dry fully.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    y = section_title(c, "Before pets return", y - 0.05 * inch)
    for item in [
        "Surfaces are fully dry, not sticky, slippery, strongly scented, or visibly wet.",
        "Bowls, toys, litter boxes, and feeding areas are rinsed when the label requires it.",
        "Windows or ventilation are used until strong odor is gone.",
        "Cleaner bottles, wipes, pods, and buckets are secured behind closed doors.",
    ]:
        y = draw_checkbox(c, MARGIN + 0.1 * inch, y, item, PAGE_W - 2 * MARGIN - 0.2 * inch) - 0.08 * inch

    draw_note_box(
        c,
        y - 0.1 * inch,
        "Exposure rule",
        "If a pet licks a wet cleaner, walks through chemicals and grooms, vomits, drools, coughs, trembles, seems weak, or has skin or eye irritation, save the product label and call a veterinarian or poison hotline.",
    )
    footer(c)
    c.save()


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    insurance_checklist(OUT_DIR / "pet-insurance-cost-comparison-checklist.pdf")
    emergency_checklist(OUT_DIR / "emergency-vet-cost-checklist.pdf")
    cleaning_checklist(OUT_DIR / "pet-safe-cleaning-checklist.pdf")


if __name__ == "__main__":
    main()
