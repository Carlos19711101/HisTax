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
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  // Estados
  const [avatar, setAvatar] = useState(require('../../assets/imagen/perfil_Moto.png'));
  const [modalVisible, setModalVisible] = useState(false);

  const [editSoatModalVisible, setEditSoatModalVisible] = useState(false);
  const [editPicoyplacaModalVisible, setEditPicoyplacaModalVisible] = useState(false);
  const [editTecnicoModalVisible, setEditTecnicoModalVisible] = useState(false);

  const [tabData, setTabData] = useState({
    soat: 'Editar vencimiento del Soat',
    picoyplaca: 'Editar Pico y Placa',
    tecnico: 'Editar Técnico Mecánica',
  });
  const [editSoatValue, setEditSoatValue] = useState('');
  const [editPicoyplacaValue, setEditPicoyplacaValue] = useState('');
  const [editTecnicoValue, setEditTecnicoValue] = useState('');

  const [editMotoModalVisible, setEditMotoModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    Marca: '',
    Placa: '',
    Propietario: '',
    Ciudad: '',
  });
  const [editMotoValues, setEditMotoValues] = useState(userData);

  const avatarSize = width * 0.7;
  const editButtonSize = avatarSize * 0.20;

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
          const tabs = JSON.parse(tabDataString);
          setTabData(tabs);
          setEditSoatValue(tabs.soat);
          setEditPicoyplacaValue(tabs.picoyplaca);
          setEditTecnicoValue(tabs.tecnico);
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

  // Guardar edición Soat (primero)
  const handleSaveEditSoat = () => {
    const newTabData = { ...tabData, soat: editSoatValue };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditSoatModalVisible(false);
  };

  // Guardar edición Pico y Placa (segundo)
  const handleSaveEditPicoyplaca = () => {
    const newTabData = { ...tabData, picoyplaca: editPicoyplacaValue };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditPicoyplacaModalVisible(false);
  };

  // Guardar edición Técnico Mecánica (último)
  const handleSaveEditTecnico = () => {
    const newTabData = { ...tabData, tecnico: editTecnicoValue };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditTecnicoModalVisible(false);
  };

  const handleOpenEditMoto = () => {
    setEditMotoValues(userData);
    setEditMotoModalVisible(true);
  };

  const handleSaveEditMoto = () => {
    setUserData(editMotoValues);
    saveUserData(editMotoValues);
    setEditMotoModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#090FFA', '#6E45E2', '#88D3CE']}
      style={styles.container}
    >
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

          <View style={[styles.actionsContainer, { marginTop: 20 }]}>
            <TouchableOpacity style={styles.editButton} onPress={handleOpenEditMoto}>
              <Text style={styles.editButtonText}>Editar Información</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centeredInfoContainer}>
            <Text style={styles.resultText}>{userData.Marca}</Text>
            <Text style={styles.resultText}>{userData.Placa}</Text>
            <Text style={styles.resultText}>{userData.Propietario}</Text>
            <Text style={styles.resultText}>{userData.Ciudad}</Text>
          </View>
        </View>

        {/* Botones verticales con texto resultado a la derecha */}
        <View style={styles.verticalButtonRow}>
          <View style={styles.buttonWithResult}>
            <TouchableOpacity
              style={styles.editButtonCompact}
              onPress={() => setEditSoatModalVisible(true)}
            >
              <Text style={styles.editButtonText}>Vence Soat</Text>
            </TouchableOpacity>
            <Text style={styles.resultTextRight}>{tabData.soat}</Text>
          </View>

          <View style={styles.buttonWithResult}>
            <TouchableOpacity
              style={styles.editButtonCompact}
              onPress={() => setEditPicoyplacaModalVisible(true)}
            >
              <Text style={styles.editButtonText}> Pico y Placa</Text>
            </TouchableOpacity>
            <Text style={styles.resultTextRight}>{tabData.picoyplaca}</Text>
          </View>

          <View style={styles.buttonWithResult}>
            <TouchableOpacity
              style={styles.editButtonCompact}
              onPress={() => setEditTecnicoModalVisible(true)}
            >
              <Text style={styles.editButtonText}>Vence Técnico Mecánica</Text>
            </TouchableOpacity>
            <Text style={styles.resultTextRight}>{tabData.tecnico}</Text>
          </View>
        </View>

        {/* Modales */}
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
                value={editMotoValues.Propietario}
                onChangeText={text =>
                  setEditMotoValues(prev => ({ ...prev, Propietario: text }))
                }
                placeholder="Propietario"
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

        <Modal
          visible={editSoatModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setEditSoatModalVisible(false)}
        >
          <View style={editTabModalStyles.overlay}>
            <View style={editTabModalStyles.content}>
              <Text style={editTabModalStyles.title}>Vencimiento Soat</Text>
              <TextInput
                style={editTabModalStyles.input}
                value={editSoatValue}
                onChangeText={setEditSoatValue}
                multiline
                placeholder="Escribe aquí..."
                placeholderTextColor="#888"
              />
              <View style={editTabModalStyles.buttonRow}>
                <TouchableOpacity
                  style={editTabModalStyles.saveButton}
                  onPress={handleSaveEditSoat}
                >
                  <Text style={editTabModalStyles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={editTabModalStyles.cancelButton}
                  onPress={() => setEditSoatModalVisible(false)}
                >
                  <Text style={editTabModalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={editPicoyplacaModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setEditPicoyplacaModalVisible(false)}
        >
          <View style={editTabModalStyles.overlay}>
            <View style={editTabModalStyles.content}>
              <Text style={editTabModalStyles.title}> Pico y Placa</Text>
              <TextInput
                style={editTabModalStyles.input}
                value={editPicoyplacaValue}
                onChangeText={setEditPicoyplacaValue}
                multiline
                placeholder="Escribe aquí..."
                placeholderTextColor="#888"
              />
              <View style={editTabModalStyles.buttonRow}>
                <TouchableOpacity
                  style={editTabModalStyles.saveButton}
                  onPress={handleSaveEditPicoyplaca}
                >
                  <Text style={editTabModalStyles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={editTabModalStyles.cancelButton}
                  onPress={() => setEditPicoyplacaModalVisible(false)}
                >
                  <Text style={editTabModalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={editTecnicoModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setEditTecnicoModalVisible(false)}
        >
          <View style={editTabModalStyles.overlay}>
            <View style={editTabModalStyles.content}>
              <Text style={editTabModalStyles.title}>Vencimiento Técnico Mecánica</Text>
              <TextInput
                style={editTabModalStyles.input}
                value={editTecnicoValue}
                onChangeText={setEditTecnicoValue}
                multiline
                placeholder="Escribe aquí..."
                placeholderTextColor="#888"
              />
              <View style={editTabModalStyles.buttonRow}>
                <TouchableOpacity
                  style={editTabModalStyles.saveButton}
                  onPress={handleSaveEditTecnico}
                >
                  <Text style={editTabModalStyles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={editTabModalStyles.cancelButton}
                  onPress={() => setEditTecnicoModalVisible(false)}
                >
                  <Text style={editTabModalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

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
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: height * 0.02,
    shadowColor: '#000',
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
    top: 30,
    left: 10,
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: width * 0.05,
  },
  editButton: {
    backgroundColor: '#71e4e9',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonCompact: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: width * 0.038,
    color: '#333',
  },
  centeredInfoContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  resultText: {
    fontSize: width * 0.05,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  resultTextRight: {
    flex: 1,
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 15,
    alignSelf: 'center',
  },
  verticalButtonRow: {
    marginTop: 20,
    paddingHorizontal: width * 0.05,
  },
  buttonWithResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default ProfileScreen;
