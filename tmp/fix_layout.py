import pathlib

f = pathlib.Path(r"C:\Users\alienware\Documents\宠物网站20\src\app\layout.tsx")
content = f.read_text(encoding="utf-8")

# 1. Add CookieConsent import
content = content.replace(
    "import { Toaster } from '@/components/ui/sonner';",
    "import { Toaster } from '@/components/ui/sonner';\nimport { CookieConsent } from '@/components/ui/cookie-consent';"
)

# 2. Add hreflang links in head
content = content.replace(
    "      </head>",
    '        {/* hreflang tags for US market */}\n        <link rel="alternate" hreflang="en-US" href={SITE_BASE_URL} />\n        <link rel="alternate" hreflang="x-default" href={SITE_BASE_URL} />\n      </head>'
)

# 3. Add CookieConsent in body
content = content.replace(
    "      </body>",
    "        <CookieConsent />\n      </body>"
)

f.write_text(content, encoding="utf-8")
print("Done")
