import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faVolcano } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/volcano';
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const refreshPage = () => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const submit = () => {
    const data = {
      name: name,
      location: location,
      status: status,
    };

    fetch(`http://10.0.2.2:3000/volcano/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data tersimpan');
        setName('');
        setLocation('');
        setStatus('');
        refreshPage();
      })
      .catch((error) => console.error(error));
  };

  const selectItem = (item) => {
    setSelectedUser(item);
    setName(item.name);
    setLocation(item.location);
    setStatus(item.status);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "danger":
                return "darkred";
            case "alert":
                return "orangered";
            case "standby":
                return "orange";
            case "normal":
                return "green";
            default:
                return "black"; 
    }
  };

  return (
    <SafeAreaView>
      <View>
        {isLoading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.cardTitle}>Loading...</Text>
          </View>
        ) : (
          <ScrollView>
            <View>
              <Text style={styles.title}>Data Volcano</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={(value) => setName(value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Status"
                  value={status}
                  onChangeText={(value) => setStatus(value)}
                />
                <TouchableOpacity style={styles.button} onPress={submit}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList 
              style={styles.container}
              data={dataUser}
              onRefresh={refreshPage}
              refreshing={refresh}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <View style={styles.card}>
                    <View style={styles.avatar}>
                      <FontAwesomeIcon icon={faVolcano} size={50} />
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <Text>{item.location}</Text>
                      <Text style={{ color: getStatusColor(item.status), fontWeight: 'bold' }}>
                        {item.status}
                      </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <FontAwesomeIcon icon={faPenToSquare} size={20} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
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
    marginBottom: 10, // Ubah warna latar belakang
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
    backgroundColor: '#fffaf0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#a7b92f',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    borderRadius: 100,
    width: 80,
},
cardtitle: {
    fontSize: 20,
    fontWeight: 'bold',
},
card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a7b92f',
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
