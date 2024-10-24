// const express = require('express');
// const authRoutes = require('./routes/auth');
// const app = express();

// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors'); // Importar cors
const authRoutes = require('./routes/auth');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // Permitir solo este origen
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
