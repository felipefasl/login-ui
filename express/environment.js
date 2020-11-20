const fs = require('fs');
const teste = `export const environment = {
   production: true,
   googleClientId: '${process.env.AMPLIFY_GOOGLE_CLIENT_ID}',
   siteKeyCaptcha: '${process.env.AMPLIFY_GOOGLE_SITEKEY_CAPTCHA}',
   backend: '${process.env.BACKEND}'
}`
fs.writeFile('src/environments/environment.prod.ts', teste, (err, result) => {

  if (err) {

    console.log('Falha ao escrever arquivo');
  } else {

    console.log('Variáveis e ambiente atualizadas!');
  }
});
