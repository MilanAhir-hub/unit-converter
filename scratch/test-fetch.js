import http from 'http';

http.get('http://localhost:4323/unit-converters/length', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const idx = data.indexOf('navbar-dropdown-search-input');
    if (idx !== -1) {
      console.log('Found navbar-dropdown-search-input! Snippet:\n', data.substring(idx - 100, idx + 500));
    } else {
      console.log('navbar-dropdown-search-input NOT found in HTML!');
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});

