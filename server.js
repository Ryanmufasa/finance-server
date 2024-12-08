const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;
const authKey = '6GP4I62WL2A4WF688MUR';

const cors = require('cors');
app.use(cors()); 

app.use('/api', (req,res,next) => {
  console.log(`Original URL: ${req.url}`);
  if(req.url.includes('$AUTH')){
    req.url = req.url.replace('$AUTH', authKey);
  }
  next();
})

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://ecos.bok.or.kr/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  })
);

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/local/test', (req, res) => {
  res.send('Test Success!');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});