import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function BookCard({ book, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: 'https://img.freepik.com/free-vector/text-books-library-isolated-icon_24877-83372.jpg' }} style={styles.imagem} /> */}
      <View style={styles.imageWrapper}>
        <Image
            source={{ uri: 'https://img.freepik.com/free-vector/text-books-library-isolated-icon_24877-83372.jpg' }}
            style={styles.imagem}
        />
        <View
            style={[
            styles.selo,
            { backgroundColor: book.emprestimo ? '#43a047' : '#e53935' },
            ]}
        >
            <Text style={styles.seloTexto}>
                {book.emprestimo ? 'Disponível' : 'Indisponível'}
            </Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{book.title}</Text>
        <Text style={styles.editora}>Autor: {book.author}</Text>
        <Text style={styles.editora}>Gênero: {book.genero}  |  {book.anoPub}</Text>
        <View style={styles.botoes}>
          <Button title="Editar" onPress={() => onEditar(book)} />
          <Button title="Excluir" onPress={() => onExcluir(book)} color="#c00" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  imagem: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editora: {
    fontSize: 14,
    color: '#666',
  },
  botoes: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  selo: {
    position: 'absolute',
    top: -5,
    left: -5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },
  seloTexto: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
