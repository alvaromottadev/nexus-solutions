# 🚀 Nexus Solutions - Backend

## 📄 Descrição do Projeto

Sistema backend desenvolvido para gerenciamento de almoxarifado, construído com arquitetura moderna, seguindo princípios SOLID e Clean Code, integrando serviços cloud e IA.

## 🔨 Tecnologias e Recursos Principais

☁️ Integrações Cloud (AWS)

- Amazon S3 para armazenamento de imagens
- Upload e gerenciamento de imagens

🤖 Inteligência Artificial

- Integração com Google Gemini AI
- Sistema de Oráculo para consultas inteligentes
- Respostas contextualizadas sobre produtos e movimentações

📱 Recursos Técnicos

- Geração de QR Code para produtos
- Sistema de autenticação JWT
- Envio de e-mails automatizados
- Alertas de estoque baixo

🏗️ Arquitetura e Padrões

- Clean Architecture
- Princípios SOLID
- Design Patterns
- Documentação Swagger/OpenAPI

🛠️ Tecnologias Utilizadas

- Java 23
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- Maven
- Docker
- AWS SDK
- Google Gemini AI

## ⚙️ Pré-requisitos

- Java 23
- Maven
- PostgreSQL
- Docker (opcional)

## 🍃 Variavéis de Ambiente

Você pode encontrar todas na documentação oficial no tópico 5.3:
[Documentação](https://docs.google.com/document/d/1gKFfJxrnLelBjZeokoBdLd6GXIpz2Wc-8LqyNorXZfY/edit?tab=t.0#heading=h.owhi1pm9rhcf)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/alvaromottadev/nexus-solutions.git
```

2. Acesse a pasta do backend:

```bash
cd nexus-solutions/backend
```

3. Configure as variavéis de ambiente

4. Instale as dependências:

```bash
mvn clean install
```

5. Inicie o docker:

```bash
docker-compose up -d
```

6. Execute o projeto:

```bash
mvn spring-boot:run
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature: git checkout -b feature/nova-feature
3. Commit suas mudanças: git commit -m 'Adiciona nova feature'
4. Push para a branch: git push origin feature/nova-feature
5. Abra um Pull Request

## 🧩 Licença

Este projeto está sob a [licença MIT](https://github.com/alvaromottadev/nexus-solutions/blob/main/LICENSE).

Desenvolvido com 💜 por Alvaro Motta
