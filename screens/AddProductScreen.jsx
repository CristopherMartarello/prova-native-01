import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import { VStack, Tooltip, Box } from 'native-base';
import { incrementar } from '../redux/bookSlice';
import { useDispatch } from 'react-redux';

export default function AddProductScreen({ navigation, route, books, setBooks }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genero, setGenero] = useState('drama');
  const [anoPub, setAnoPub] = useState('');
  const [emprestimo, setEmprestimo] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { editBook = null } = route.params || {};

      if (editBook) {
        setTitle(editBook.title);
        setAuthor(editBook.author);
        setGenero(editBook.genero);
        setEmprestimo(editBook.emprestimo);
        setAnoPub(editBook.anoPub);
        setIsEditMode(true);
      } else {
        setTitle('');
        setAuthor('');
        setGenero('drama');
        setEmprestimo(false);
        setAnoPub('');
        setIsEditMode(false);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleSaveBook = () => {
    if (isEditMode) {
      setBooks(books.map(p =>
        p.id === (route.params?.editBook?.id || 0) ? { ...route.params.editBook, title, author, genero, emprestimo, anoPub } : p
      ));
    } else {
      setBooks([
        ...books,
        { id: Date.now(), title, author, genero, emprestimo, anoPub }
      ]);
      dispatch(incrementar());
    }
    navigation.navigate('Home');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditMode ? "Editar Produto" : "Adicionar Produto"} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <VStack space={4}>
          <Tooltip label="Digite o nome do Livro" placement="top">
            <Box>
              <TextInput
                label="Nome do Livro"
                value={title}
                onChangeText={setTitle}
                left={<TextInput.Icon icon="tag" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <Tooltip label="Digite o nome do autor" placement="top">
            <Box>
              <TextInput
                label="Autor"
                value={author}
                onChangeText={setAuthor}
                left={<TextInput.Icon icon="account" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <Tooltip label="Informe o ano de publicação" placement="top">
            <Box>
              <TextInput
                label="Ano de Publicação"
                value={anoPub}
                onChangeText={setAnoPub}
                keyboardType="numeric"
                left={<TextInput.Icon icon="pen" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <RadioButton.Group onValueChange={setGenero} value={genero}>
            <RadioButton.Item label="Drama" value="drama" />
            <RadioButton.Item label="Romance" value="romance" />
            <RadioButton.Item label="Ficção" value="ficcao" />
            <RadioButton.Item label="Aventura" value="aventura" />
          </RadioButton.Group>

          <Checkbox.Item
            label="Disponível para emprestimo?"
            status={emprestimo ? 'checked' : 'unchecked'}
            onPress={() => setEmprestimo(!emprestimo)}
          />

          <Button 
            mode="contained" 
            onPress={handleSaveBook}
            style={{ marginTop: 10 }}
            icon={isEditMode ? "pencil" : "content-save"}
          >
            {isEditMode ? "Atualizar Produto" : "Salvar Produto"}
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
}
