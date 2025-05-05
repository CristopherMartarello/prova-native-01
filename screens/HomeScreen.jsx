import React, { useState } from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import { Appbar, FAB, Banner, Dialog, Portal, Button, Text, ActivityIndicator, Chip } from 'react-native-paper';
import { useThemeContext } from '../contexts/ThemeContext';
import BookCard from '../components/BookCard'
import { decrementar } from '../redux/bookSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen({ navigation, books, setBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [generoFiltro, setGeneroFiltro] = useState('Todos');
  const { toggleTheme } = useThemeContext();

  const dispatch = useDispatch();
  const total = useSelector((state) => state.livros.total);

  const handleDeleteBook = () => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== selectedBook?.id));
    dispatch(decrementar());
    setSelectedBook(null);
    setVisibleDialog(false);
  };

  const openDeleteDialog = (book) => {
    setSelectedBook(book);
    setVisibleDialog(true);
  };

  const openEditScreen = (book) => {
    navigation.navigate('Adicionar', { editBook: book });
  };

  const openAddScreen = () => {
    navigation.navigate('Adicionar', { editBook: null });
  };

  const livrosFiltrados = generoFiltro === 'Todos'
    ? books
    : books.filter(p => p.genero === generoFiltro.toLowerCase());
    

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gerenciador de Livros" />
        <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
      </Appbar.Header>

      <ScrollView style={{ margin: 10 }}>
        <Banner
          visible={bannerVisible}
          actions={[
            { label: 'OK', onPress: () => setBannerVisible(false) }
          ]}
          icon="information"
        >
          Adicione, edite ou remova livros com facilidade!
        </Banner>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'Todos'}
            onPress={() => setGeneroFiltro('Todos')}
          >
            Todos
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'drama'}
            onPress={() => setGeneroFiltro('drama')}
          >
            Drama
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'romance'}
            onPress={() => setGeneroFiltro('romance')}
          >
            Romance
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'ficcao'}
            onPress={() => setGeneroFiltro('ficcao')}
          >
            Ficção
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={generoFiltro === 'aventura'}
            onPress={() => setGeneroFiltro('aventura')}
          >
            Aventura
          </Chip>
        </View>

        <View
            style={{
                marginTop: 20,
                marginBottom: 10,
                padding: 10,
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                elevation: 2,
            }}
            >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                Total de Livros: {total}
            </Text>
        </View>

        {livrosFiltrados.length === 0 ? (
          <ActivityIndicator animating={true} style={{ marginTop: 20 }} />
        ) : (
            <FlatList
                data={livrosFiltrados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <BookCard book={item} onEditar={openEditScreen} onExcluir={openDeleteDialog} />}
            />
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Confirmação</Dialog.Title>
          <Dialog.Content>
            <Text>Deseja realmente excluir "{selectedBook?.title}"?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Cancelar</Button>
            <Button onPress={handleDeleteBook}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={openAddScreen}
      />
    </>
  );
}
