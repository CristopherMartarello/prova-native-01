---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
https://github.com/CristopherMartarello/prova-native-01.git
cd ProvaGerenciamentoLivros
```

### 2. Instalar as dependências
```bash
node -v   # Deve retornar a versão do Node.js, caso contrário baixar em: https://nodejs.org/pt
npm install   # Para instalar as dependências
```

### 3. Rodar com Expo
```bash
npx expo start # Iniciar a aplicação Expo
```

### 4. 🧠 Tecnologias e Recursos Utilizados
#### ⚛️ React Native
Base do aplicativo mobile com uso de componentes como View, Text, FlatList, Image, TouchableOpacity, Modal, etc.
#### 🚀 Expo
Facilita o desenvolvimento e o acesso a APIs nativas.
#### 🧩 Redux Toolkit
Gerencia o estado global da quantidade total de livros cadastrados:
- Arquivo: redux/bookSlice.js
  - Ações: incrementar, decrementar, resetar
- Arquivo: redux/store.js
  - Configuração da store Redux
- Usado em: CadastroLivros.js e WelcomeScreen.js
  - Acesso via useDispatch() e useSelector()
#### 🎨 Context API
- Gerencia o tema claro/escuro da aplicação.
  - Arquivo: context/TemaContext.js
- TemaProvider e hook useTema
  - Usado em:
    - WelcomeScreen.js
    - CadastroLivros.js
    - Configuracoes.js
#### ⚙️ React Hooks
- Utilizados em todo o projeto:
  - useState para controle de inputs, lista de livros, modais, imagem selecionada, etc.
  - useEffect (se necessário para comportamentos reativos).
  - useDispatch / useSelector para interações com Redux.
  - useTema para acessar o tema atual.
