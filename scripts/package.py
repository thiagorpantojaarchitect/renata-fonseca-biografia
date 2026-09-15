from pathlib import Path
import base64,re,zipfile
R=Path(__file__).resolve().parents[1];P=R/'public';D=R/'dist';D.mkdir(exist_ok=True)
s=(P/'index.html').read_text()
s=s.replace('<link rel="stylesheet" href="styles.css">','<style>'+(P/'styles.css').read_text()+'</style>')
s=s.replace('<script src="app.js" defer></script>','')
s=s.replace('</body>','<script>'+(P/'app.js').read_text()+'</script></body>')
for path in set(re.findall(r'(?:assets/[\w-]+\.webp|favicon\.svg)',s)):
 mime='image/svg+xml' if path.endswith('.svg') else 'image/webp'
 s=s.replace(path,'data:'+mime+';base64,'+base64.b64encode((P/path).read_bytes()).decode())
(D/'preview-renata-biografia.html').write_text(s)
with zipfile.ZipFile(D/'renata-biografia-site.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in R.rglob('*'):
  if f.is_file() and 'dist' not in f.relative_to(R).parts and '.git' not in f.relative_to(R).parts:z.write(f,Path('renata-biografia')/f.relative_to(R))
 z.write(D/'preview-renata-biografia.html','renata-biografia/preview-renata-biografia.html')
print('Created',D/'preview-renata-biografia.html',D/'renata-biografia-site.zip')
