import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  // Estados
  const [avatar, setAvatar] = useState(require('../../assets/imagen/perfil_Moto.png'));
  const [modalVisible, setModalVisible] = useState(false);

  const [editTabModalVisible, setEditTabModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'picoyplaca' | 'soat' | 'tecnico' | null>(null);
  const [tabData, setTabData] = useState({
    picoyplaca: 'Editar Pico y Placa',
    soat: 'Editar vencimiento del Soat',
    tecnico: 'Editar Técnico Mecánica',
  });
  const [editValue, setEditValue] = useState('');

  const [editMotoModalVisible, setEditMotoModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    Marca: 'Marca de la Moto',
    Placa: 'Placa de la Moto',
    Transito: 'Transito de la Moto',
    Ciudad: 'Ciudad de la Moto',
  });
  const [editMotoValues, setEditMotoValues] = useState(userData);

  // Tamaños responsivos
  const avatarSize = width * 0.8;
  const editButtonSize = avatarSize * 0.20;

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('@userData');
        if (userDataString) {
          const parsedUserData = JSON.parse(userDataString);
          setUserData(parsedUserData);
          setEditMotoValues(parsedUserData);
        }
        const tabDataString = await AsyncStorage.getItem('@tabData');
        if (tabDataString) {
          setTabData(JSON.parse(tabDataString));
        }
        const avatarUri = await AsyncStorage.getItem('@avatarUri');
        if (avatarUri) {
          setAvatar({ uri: avatarUri });
        }
      } catch (e) {
        console.error('Error cargando datos', e);
      }
    };
    loadData();
  }, []);

  // Guardar en AsyncStorage
  const saveUserData = async (data: typeof userData) => {
    try {
      await AsyncStorage.setItem('@userData', JSON.stringify(data));
    } catch (e) {
      console.error('Error guardando userData', e);
    }
  };

  const saveTabData = async (data: typeof tabData) => {
    try {
      await AsyncStorage.setItem('@tabData', JSON.stringify(data));
    } catch (e) {
      console.error('Error guardando tabData', e);
    }
  };

  const saveAvatar = async (uri: string) => {
    try {
      await AsyncStorage.setItem('@avatarUri', uri);
    } catch (e) {
      console.error('Error guardando avatar', e);
    }
  };

  // Funciones para cámara y galería
  const openCamera = async () => {
    setModalVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setAvatar({ uri });
      saveAvatar(uri);
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setAvatar({ uri });
      saveAvatar(uri);
    }
  };

  // Abrir modal edición pestañas
  const handleOpenEditTab = (tab: 'picoyplaca' | 'soat' | 'tecnico') => {
    setActiveTab(tab);
    setEditValue(tabData[tab]);
    setEditTabModalVisible(true);
  };

  // Guardar edición pestañas
  const handleSaveEditTab = () => {
    if (activeTab) {
      const newTabData = { ...tabData, [activeTab]: editValue };
      setTabData(newTabData);
      saveTabData(newTabData);
    }
    setEditTabModalVisible(false);
  };

  // Abrir modal edición info moto
  const handleOpenEditMoto = () => {
    setEditMotoValues(userData);
    setEditMotoModalVisible(true);
  };

  // Guardar edición info moto
  const handleSaveEditMoto = () => {
    setUserData(editMotoValues);
    saveUserData(editMotoValues);
    setEditMotoModalVisible(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Todo')}
      >
        <AntDesign name="doubleleft" size={34} color="black" />
      </TouchableOpacity>

      {/* Encabezado del perfil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatar}
            style={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
              },
            ]}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[
              styles.editAvatarButton,
              {
                width: editButtonSize,
                height: editButtonSize,
                borderRadius: editButtonSize / 2,
                right: editButtonSize * 0.2,
                bottom: editButtonSize * 0.2,
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.editAvatarButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal cámara/galería */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            <TouchableOpacity style={modalStyles.option} onPress={openCamera}>
              <Text style={modalStyles.optionText}>Abrir cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.option} onPress={openGallery}>
              <Text style={modalStyles.optionText}>Abrir galería</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyles.cancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal edición pestañas */}
      <Modal
        visible={editTabModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditTabModalVisible(false)}
      >
        <View style={editTabModalStyles.overlay}>
          <View style={editTabModalStyles.content}>
            <Text style={editTabModalStyles.title}>
              {activeTab === 'picoyplaca' && 'Editar Pico y Placa'}
              {activeTab === 'soat' && 'Editar Soat'}
              {activeTab === 'tecnico' && 'Editar Técnico Mecánica'}
            </Text>
            <TextInput
              style={editTabModalStyles.input}
              value={editValue}
              onChangeText={setEditValue}
              multiline
              placeholder="Escribe aquí..."
              placeholderTextColor="#888"
            />
            <View style={editTabModalStyles.buttonRow}>
              <TouchableOpacity
                style={editTabModalStyles.saveButton}
                onPress={handleSaveEditTab}
              >
                <Text style={editTabModalStyles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={editTabModalStyles.cancelButton}
                onPress={() => setEditTabModalVisible(false)}
              >
                <Text style={editTabModalStyles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal edición info moto */}
      <Modal
        visible={editMotoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditMotoModalVisible(false)}
      >
        <View style={editTabModalStyles.overlay}>
          <View style={editTabModalStyles.content}>
            <Text style={editTabModalStyles.title}>Editar Información de la Moto</Text>

            <TextInput
              style={editTabModalStyles.input}
              value={editMotoValues.Marca}
              onChangeText={text =>
                setEditMotoValues(prev => ({ ...prev, Marca: text }))
              }
              placeholder="Marca"
              placeholderTextColor="#888"
            />
            <TextInput
              style={editTabModalStyles.input}
              value={editMotoValues.Placa}
              onChangeText={text =>
                setEditMotoValues(prev => ({ ...prev, Placa: text }))
              }
              placeholder="Placa"
              placeholderTextColor="#888"
            />
            <TextInput
              style={editTabModalStyles.input}
              value={editMotoValues.Transito}
              onChangeText={text =>
                setEditMotoValues(prev => ({ ...prev, Transito: text }))
              }
              placeholder="Transito"
              placeholderTextColor="#888"
            />
            <TextInput
              style={editTabModalStyles.input}
              value={editMotoValues.Ciudad}
              onChangeText={text =>
                setEditMotoValues(prev => ({ ...prev, Ciudad: text }))
              }
              placeholder="Ciudad"
              placeholderTextColor="#888"
            />

            <View style={editTabModalStyles.buttonRow}>
              <TouchableOpacity
                style={editTabModalStyles.saveButton}
                onPress={handleSaveEditMoto}
              >
                <Text style={editTabModalStyles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={editTabModalStyles.cancelButton}
                onPress={() => setEditMotoModalVisible(false)}
              >
                <Text style={editTabModalStyles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Información del usuario */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{userData.Marca}</Text>
        <Text style={styles.username}>{userData.Placa}</Text>
        <Text style={styles.username}>{userData.Transito}</Text>
        <Text style={styles.bio}>{userData.Ciudad}</Text>
      </View>

      {/* Botón para editar info moto */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleOpenEditMoto}>
          <Text style={styles.editButtonText}>Editar Información Moto</Text>
        </TouchableOpacity>
      </View>

      {/* Pestañas de contenido */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'picoyplaca' && styles.activeTab]}
          onPress={() => handleOpenEditTab('picoyplaca')}
        >
          <Text style={styles.tabText}>Pico y Placa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'soat' && styles.activeTab]}
          onPress={() => handleOpenEditTab('soat')}
        >
          <Text style={styles.tabText}> Soat </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tecnico' && styles.activeTab]}
          onPress={() => handleOpenEditTab('tecnico')}
        >
          <Text style={styles.tabText}>Tecnico Mecanica</Text>
        </TouchableOpacity>
      </View>

      {/* Información de las pestañas */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{tabData.picoyplaca}</Text>
        <Text style={styles.name}>{tabData.soat}</Text>
        <Text style={styles.name}>{tabData.tecnico}</Text>
      </View>
    </ScrollView>
  );
};

// Estilos modal cámara/galería
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  option: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 19,
    color: '#090FFA',
    fontWeight: 'bold',
  },
  cancel: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#888',
  },
});

// Estilos modal edición pestañas e info moto (compartidos)
const editTabModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 48,
    marginBottom: 20,
    color: '#222',
    backgroundColor: '#fafafa',
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#090FFA',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: height * 0.02,
    shadowColor: '#000',
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 10,
    padding: 10,
  },
  editAvatarButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  editAvatarButtonText: {
    fontSize: width * 0.04,
  },
  infoContainer: {
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  name: {
    fontWeight: 'bold',
    fontSize: width * 0.055,
    marginBottom: height * 0.005,
  },
  username: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.015,
  },
  bio: {
    fontSize: width * 0.038,
    lineHeight: height * 0.025,
    marginBottom: height * 0.015,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.025,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: height * 0.015,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: width * 0.03,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: width * 0.038,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontWeight: '800',
    fontSize: width * 0.040,
  },
});

export default ProfileScreen;
