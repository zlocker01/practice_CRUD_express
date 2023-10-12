import express  from "express";
import morgan from "morgan";

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // middleware para parsear a json los datos que mando al server

let products = [
    {
        id: '1',
        nombre: 'cpu',
        precio: '1000'
    }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products/', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1};
    products.push(newProduct);
    res.send(newProduct);
});

app.put('/products/:id', (req, res) => {
    const newData = req.body;

    const productsFound = products.find(product => {
        return product.id === req.params.id;
    });

    if(!productsFound) return res.status(404).send('No se encontró el producto que deseas actualizar');

    // itera en un nuevo array los productos y si encuentras uno que coincida en su id entonces modificalo else retornalo
    products = products.map(product => product.id === req.params.id ? {...product, ...newData} : product);

    res.send('Actualizando productos');
});

app.delete('/products/:id', (req, res) => {
    const productsFound = products.find(product => {
        return product.id === req.params.id;
    });

    if(!productsFound) return res.status(404).send('No se encontró el producto que deseas eliminar');

    products = products.filter(product => product.id === parseInt(req.params.id)); // actualizamos el array

    res.sendStatus(204); //el status 204 es para infomrar qur todo ha ido bien 👌
});

app.get('/products/:id', (req, res) => {
    const productsFound = products.find(product => {
        return product.id === req.params.id;
    });

    if(!productsFound) return res.status(404).send('No se encontró ningun producto');

    const product = products.filter(product => product.id === req.params.id);

    res.send(product);
});

app.listen(3000);

console.log(`server on port ${3000}`);
