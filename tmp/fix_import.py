import pathlib

f = pathlib.Path(r"C:\Users\alienware\Documents\宠物网站20\src\app\layout.tsx")
content = f.read_text(encoding="utf-8")

# The file uses double quotes in imports
content = content.replace(
    'import { Toaster } from "@/components/ui/sonner";',
    'import { Toaster } from "@/components/ui/sonner";' + "\n" + 'import { CookieConsent } from "@/components/ui/cookie-consent";'
)

f.write_text(content, encoding="utf-8")
print("Fixed import")
