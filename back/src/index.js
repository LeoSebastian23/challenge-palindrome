import { app } from './app.js';
import { PORT } from './config/config.js';

app.listen(PORT, () => {
  console.log("Hello World!");
  console.log("App listening on http://localhost:${PORT}!");
});  