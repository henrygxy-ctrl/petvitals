import pathlib

f = pathlib.Path(r"C:\Users\alienware\Documents\宠物网站20\src\app\layout.tsx")
content = f.read_text(encoding="utf-8")
content = content.replace('hreflang="en-US"', 'hrefLang="en-US"')
content = content.replace('hreflang="x-default"', 'hrefLang="x-default"')
f.write_text(content, encoding="utf-8")
print("Fixed hreflang -> hrefLang")
