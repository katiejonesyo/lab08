const app = require('./app.js');
const port = 3002;

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});


