f = open('index.html', 'rb').read()

i = f.find(b'RAG_MODEL_FLOWER" target="_blank"><i')
end = f.find(b'</div>', i)
old = f[i:end+6]
new = b'RAG_MODEL_FLOWER" target="_blank"><i class="fab fa-github"></i></a>\r\n                  <a href="https://ragmodelflower-raj1.streamlit.app/" target="_blank" class="live-demo-btn"><i class="fas fa-play"></i> Live Demo</a>\r\n                </div>'
print('found:', repr(old))
f = f.replace(old, new, 1)
open('index.html', 'wb').write(f)
print('DONE')
