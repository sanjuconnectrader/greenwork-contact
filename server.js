import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import sequelize from './config/db.js';

dotenv.config();
const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', contactRoutes);

app.get('/', (_, res) => res.send('Contact‑backend running'));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();          // create table if not exists
    console.log('✓ MySQL connected');

    app.listen(PORT, () =>
      console.log(`✓ Server listening at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
})();
