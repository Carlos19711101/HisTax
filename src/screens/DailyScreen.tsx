import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent, { CameraComponentRef } from '../components/CameraComponent';

type JournalEntry = {
  id: string;
  text: string;
  date: Date;
  image?: string;
};

// Cambia la clave para que sea exclusiva de esta pantalla
const STORAGE_KEY = '@journal_entries_daily';

const DailyScreen = ({ navigation }: any) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Manejo de cámara
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef<CameraComponentRef>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  // Guardar entradas en AsyncStorage con clave exclusiva
  const saveEntries = async (entriesToSave: JournalEntry[]) => {
    try {
      const jsonValue = JSON.stringify(entriesToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Error guardando entradas:', e);
    }
  };

  // Cargar entradas de AsyncStorage con clave exclusiva
  const loadEntries = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const loadedEntries = JSON.parse(jsonValue).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        }));
        setEntries(loadedEntries);
      }
    } catch (e) {
      console.error('Error cargando entradas:', e);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openCamera = () => setCameraVisible(true);
  const closeCamera = () => setCameraVisible(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      const uri = await cameraRef.current.takePicture();
      if (uri) {
        setSelectedImage(uri);
        closeCamera();
      }
    }
  };

  const addEntry = () => {
    if (!newEntry.trim() && !selectedImage) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      text: newEntry,
      date: new Date(date),
      image: selectedImage || undefined,
    };

    setEntries([entry, ...entries]);
    setNewEntry('');
    setSelectedImage(null);
    setDate(new Date());
  };

  const deleteEntry = (id: string) => {
    Alert.alert(
      'Eliminar entrada',
      '¿Estás seguro de que quieres borrar este mensaje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setEntries(entries.filter(entry => entry.id !== id));
          },
        },
      ]
    );
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entryContainer}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>
          {item.date.toLocaleDateString()} - {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={20} color="#ff5252" />
        </TouchableOpacity>
      </View>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.entryImage} />
      )}

      {item.text && <Text style={styles.entryText}>{item.text}</Text>}

      <View style={styles.timelineConnector} />
    </View>
  );

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <LinearGradient
      colors={['#090FFA', '#242afb', '#58fd03']}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Todo')}
      >
        <AntDesign name="doubleleft" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Historia Diaria</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.entriesList}
          ListHeaderComponent={<View style={styles.listFooter} />}
        />

        <View style={styles.inputContainer}>
          {/* Botón para abrir cámara */}
          <TouchableOpacity onPress={openCamera} style={styles.mediaButton}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>

          {/* Botón para seleccionar imagen de galería */}
          <TouchableOpacity onPress={pickImage} style={styles.mediaButton}>
            <Ionicons name="image" size={24} color="white" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={newEntry}
            onChangeText={setNewEntry}
            placeholder="Escribe tu comentario aquí..."
            placeholderTextColor="#aaa"
            multiline
          />

          <TouchableOpacity onPress={addEntry} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Modal con el componente de cámara externo */}
      <Modal visible={cameraVisible} animationType="slide">
        <CameraComponent ref={cameraRef} onClose={closeCamera} />
        <TouchableOpacity
          onPress={takePicture}
          style={{
            position: 'absolute',
            bottom: 40,
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 20,
            borderRadius: 50,
          }}
        >
          <Ionicons name="camera" size={50} color="white" />
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 30,
    zIndex: 10,
  },
  entriesList: {
    paddingBottom: 20,
  },
  entryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    position: 'relative',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryDate: {
    color: '#555',
    fontSize: 12,
  },
  deleteButton: {
    padding: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  entryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  timelineConnector: {
    position: 'absolute',
    left: -15,
    top: 30,
    bottom: -8,
    width: 2,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    maxHeight: 100,
    color: '#333',
  },
  mediaButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
    marginLeft: 5,
  },
  imagePreviewContainer: {
    position: 'relative',
    padding: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 2,
  },
  listFooter: {
    height: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginTop: 30,
    right: -5,
  },
});

export default DailyScreen;
