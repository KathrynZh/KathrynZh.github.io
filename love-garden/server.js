const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './data.json';

if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify({ startTime: null }));
}

app.get('/start-time', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  res.json({ startTime: data.startTime });
});

app.post('/start-time', (req, res) => {
  const { startTime } = req.body;

  // 如果传的是 null，表示清零
  if (startTime === null) {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ startTime: null }));
    return res.json({ success: true, message: 'Start time cleared.' });
  }

  // 否则就是正常写入时间
  fs.writeFileSync(FILE_PATH, JSON.stringify({ startTime }));
  res.json({ success: true });
});


app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});