# 📱 Nexus Solutions - Mobile

## 📄 Descrição do Projeto

Aplicativo móvel desenvolvido para o sistema de gestão de almoxarifado Nexus Solutions, permitindo aos usuários acessar e gerenciar produtos, movimentações e informações do estoque de forma prática e remota.

## 🔨 Tecnologias Utilizadas

- React Native
- TypeScript
- Axios
- React Navigation
- Phosphor Icons
- React Native DateTime Picker

## ⚙️ Recursos Principais

- Autenticação de usuários
- Gestão de produtos
- Controle de estoque
- Movimentações de entrada/saída
- Leitor QR Code
- Interface intuitiva

## 📃 Pré-requisitos

Node.js
JDK 11 ou superior  
Android Studio (para Android)  
Xcode (para iOS)  
CocoaPods (para iOS)

## 🍃 Variavéis de Ambiente

As variáveis de ambiente estão descritas na [documentação oficial (seção 5.3)](https://docs.google.com/document/d/1gKFfJxrnLelBjZeokoBdLd6GXIpz2Wc-8LqyNorXZfY/edit?tab=t.0#heading=h.6290p190mk2q).

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/alvaromottadev/nexus-solutions.git
```

2. Acesse a pasta do mobile:

```bash
cd nexus-solutions/mobile
```

3. Instale as dependências:

```bash
npm install
```

5. Para iOS, instale as dependências do CocoaPods:

```bash
cd ios && pod install && cd ..
```

5. Configure as váriaveis de ambiente.

6. Execute o projeto:

```bash
npm run android
npm run ios
```

## 📄 Scripts Disponíveis

npm start: Inicia o Metro Bundler  
npm run android: Executa o app no Android  
npm run ios: Executa o app no iOS  
npm run test: Executa os testes  
npm run lint: Executa o linter

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature: git checkout -b feature/nova-feature
3. Commit suas mudanças: git commit -m 'Adiciona nova feature'
4. Push para a branch: git push origin feature/nova-feature
5. Abra um Pull Request

## 🧩 Licença

Este projeto está sob a [licença MIT](https://github.com/alvaromottadev/nexus-solutions/blob/main/LICENSE).

Desenvolvido com 💜 por Alvaro Motta
