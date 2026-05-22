import https from 'https';

https.get('https://swfrpc-resiliency-tbrpc.hub.arcgis.com/', (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => {
    const matches = chunks.match(/#([a-fA-F0-9]{3,6})/g);
    if (matches) {
       const unique = [...new Set(matches)];
       console.log("Colors found:", unique.join(', '));
    }
  });
});
