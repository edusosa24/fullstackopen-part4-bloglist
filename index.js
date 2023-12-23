const app = require('./src/server/app');
const { PORT } = require('./src/config/environment');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
