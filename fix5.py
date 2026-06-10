f = open('index.html', 'rb').read()

f = f.replace(b'assets/datascience_page-0001.jpg', b'DP100.pdf')
f = f.replace(b'assets/fabric data engineer_page-0001.jpg', b'DATAFABRIC.pdf')
f = f.replace(b'assets/ai-102_page-0001.jpg', b'AI-102.pdf')

open('index.html', 'wb').write(f)
print('DP100.pdf:', open('index.html','rb').read().count(b'DP100.pdf'))
print('DATAFABRIC.pdf:', open('index.html','rb').read().count(b'DATAFABRIC.pdf'))
print('AI-102.pdf:', open('index.html','rb').read().count(b'AI-102.pdf'))
