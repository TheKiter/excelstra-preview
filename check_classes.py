import glob
import re

classes = set()
for html_file in glob.glob('v5/*.html'):
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        for match in re.finditer(r'class=["\']([^"\']+)["\']', content):
            for cls in match.group(1).split():
                classes.add(cls)

print(f"Total unique classes: {len(classes)}")

with open('v4/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    v4_css = f.read()

with open('v5/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    v5_css = f.read()

missing_in_v5 = []
for c in sorted(classes):
    pattern = r'\.' + re.escape(c) + r'(?![a-zA-Z0-9_-])'
    in_v4 = bool(re.search(pattern, v4_css))
    in_v5 = bool(re.search(pattern, v5_css))
    if in_v4 and not in_v5:
        missing_in_v5.append(c)

print(f"Classes present in v4/style.css but MISSING from v5/style.css: {len(missing_in_v5)}")
print("Sample missing:", missing_in_v5[:30])
