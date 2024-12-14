import { SafeAreaView, Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:4000/qanda'; // API untuk emulator mengakses localhost komputer
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const submit = () => {
    const data = {
      question: question,
      answer: answer,
    };
    fetch(`http://10.0.2.2:4000/qanda/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data berhasil diperbarui');
        setQuestion('');
        setAnswer('');
        refreshPage();
      });
  };

  const createData = () => {
    const data = {
      question: question,
      answer: answer,
    };
    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data berhasil dibuat');
        setQuestion('');
        setAnswer('');
        refreshPage();
      });
  };

  const deleteItem = (id) => {
    fetch(`http://10.0.2.2:4000/qanda/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Item berhasil dihapus');
          refreshPage();
        } else {
          alert('Gagal menghapus item');
        }
      })
      .catch((error) => console.error(error));
  };

  function refreshPage() {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const selectItem = (item) => {
    setSelectedUser(item);
    setQuestion(item.question);
    setAnswer(item.answer);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isLoading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.cardtitle}>Loading...</Text>
          </View>
        ) : (
          <View>
            <ScrollView>
              <View>
                <Text style={styles.title}>Question & Answer</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="Question"
                    value={question}
                    onChangeText={(value) => setQuestion(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Answer"
                    value={answer}
                    onChangeText={(value) => setAnswer(value)}
                  />
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={createData}>
                      <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={submit}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.devider}></View>
              <FlatList
                style={{ marginBottom: 10 }}
                data={dataUser}
                onRefresh={() => {
                  refreshPage();
                }}
                refreshing={refresh}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.avatar}>
                      <FontAwesomeIcon icon={faQuestion} size={30} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardtitle} numberOfLines={2}>
                        {item.question}
                      </Text>
                      <Text numberOfLines={1}>{item.answer}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <TouchableOpacity onPress={() => selectItem(item)}>
                        <FontAwesomeIcon icon={faPenToSquare} size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#7c7074',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 20,
  },
  form: {
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
  justifyContent: 'center', // Memusatkan tombol secara horizontal
  alignItems: 'center',    // Memusatkan tombol secara vertikal
  gap: 10,                 // Memberikan jarak antar tombol
  marginVertical: 5,
  },
  button: {
    backgroundColor: '#a7b92f',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dc7b28',
    backgroundColor: '#f8f8ff',
    shadowColor: '#000',
    shadowOffset: {
        width: 1,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
});
