f = open('index.html', 'rb').read()

# 1. Zomato: add View Report link
i = f.find(b'Bangalore-Restaurant-Zomato--analyst" target="_blank"><i')
end = f.find(b'</div>', i)
old1 = f[i:end+6]
new1 = b'Bangalore-Restaurant-Zomato--analyst" target="_blank"><i class="fab fa-github"></i></a>\r\n                  <a href="https://github.com/RAJ-15012006/Bangalore-Restaurant-Zomato--analyst/blob/main/Zomato.pdf" target="_blank" class="live-demo-btn"><i class="fas fa-file-pdf"></i> View Report</a>\r\n                </div>'
print('old1:', repr(old1))
f = f.replace(old1, new1, 1)

# 2. Stock Market: add Live Demo
i = f.find(b'stock-market-analysis" target="_blank"><i')
end = f.find(b'</div>', i)
old2 = f[i:end+6]
new2 = b'stock-market-analysis" target="_blank"><i class="fab fa-github"></i></a>\r\n                  <a href="https://stock-market-analysis-ee2sibi9b3msyeijlgvxxc.streamlit.app/" target="_blank" class="live-demo-btn"><i class="fas fa-play"></i> Live Demo</a>\r\n                </div>'
print('old2:', repr(old2))
f = f.replace(old2, new2, 1)

# 3. COVID: add Live Demo
i = f.find(b'covid19_dataset" target="_blank"><i')
end = f.find(b'</div>', i)
old3 = f[i:end+6]
new3 = b'covid19_dataset" target="_blank"><i class="fab fa-github"></i></a>\r\n                  <a href="https://covid19dataset-qpjozfwf2memgbu2qiut9t.streamlit.app/" target="_blank" class="live-demo-btn"><i class="fas fa-play"></i> Live Demo</a>\r\n                </div>'
print('old3:', repr(old3))
f = f.replace(old3, new3, 1)

# 4. Remove Time Series card
start = f.find(b'<!-- Project 4: Time Series -->')
# find the closing </div></div></div></div> of this card
# The card ends with </div>\r\n          </div>\r\n\r\n          <!-- Project 5
end_marker = b'<!-- Project 5: Stock Market -->'
end = f.find(end_marker)
old4 = f[start:end]
print('old4 len:', len(old4))
f = f.replace(old4, b'', 1)

open('index.html', 'wb').write(f)
print('DONE')
