const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(5000, () => console.log('Server running on port 5000'));
});
