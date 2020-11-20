# login-ui

Frontend sistema de login genérico desenvolvido em <a href="(https://angular.io/docs" target="_blank">Angular v10</a>

## Primeng
 <a href="https://www.primefaces.org/primeng/showcase/#/" target="_blank">Documentação</a>

## Validação Captcha - Primeng/Google
 <a href="https://www.primefaces.org/primeng/showcase/#/captcha" target="_blank">Documentação Primeng</a>

 <a href="https://w3path.com/how-to-integrate-recaptcha-in-angular-8" target="_blank">Fonte estudo</a>
## Login Google - angularx-social-login
 <a href="https://www.npmjs.com/package/angularx-social-login" target="_blank">Fonte estudo</a>
## Express para variáveis de ambiente
 <a href="https://medium.com/@felipemendes1994/como-usar-variaveis-de-ambiente-no-angular-para-deploy-no-heroku-a385d156249b" target="_blank">Fonte estudo</a>
## Hospedagem AWS Amplify com Integração Github
 <a href="https://aws.amazon.com/pt/mobile/AWS-Amplify-landing-angular/" target="_blank">Fonte estudo</a>

configuração build
 ```yam
 version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
 
 ```

## Exemplo Execução 

<a href="https://main.d1hy8lvuqymmbz.amplifyapp.com/login" target="_blank">Link</a>

<a href="https://nestjs-login-api.herokuapp.com/api-docs" target="_blank">Backend</a>

