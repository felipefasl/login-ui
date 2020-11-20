const path = require('path');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 4200));

app.use(express.static(path.join(__dirname, '../dist')));
// redireciona todas as requições para o Angular
app.all('*', (req, res) => {
  res.status(200).sendFile(
  	path.join(__dirname, '../dist', 'index.html'));
});

app.listen(app.get('port'), () =>  {
  console.log('Node executando na porta ', app.get('port'));
});
