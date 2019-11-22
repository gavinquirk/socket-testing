const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});

// Static Files
app.use(express.static('public'));
