import express from 'express';
import fetch from 'node-fetch';

const BOT_TOKEN = '9014837960:AAHNByxINa4G_SDbDiQYZKTN_QwLNsoQBEs';
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Список товаров (звёзды)
const products = [
  { id: 1, stars: 50, price: 100, name: '50 ⭐' },
  { id: 2, stars: 100, price: 180, name: '100 ⭐' },
  { id: 3, stars: 250, price: 400, name: '250 ⭐' },
  { id: 4, stars: 500, price: 750, name: '500 ⭐' },
];

// Отдаём список товаров сайту
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Приём заказа от бота (когда бот хочет узнать цену)
app.post('/api/order', (req, res) => {
  const { productId, userId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: 'not found' });

  // Здесь в будущем будет создание счёта на оплату через СБП
  // Пока просто возвращаем подтверждение
  res.json({
    ok: true,
    message: `Заказ на ${product.name} создан. Оплата СБП будет добавлена позже.`,
    orderId: `order_${userId}_${Date.now()}`
  });
});

app.get('/', (req, res) => res.send('Shop backend is running'));

app.listen(PORT, () => console.log(`Shop server on port ${PORT}`));
