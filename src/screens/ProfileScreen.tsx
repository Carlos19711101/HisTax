import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ProfileScreen.styles';

const { height } = Dimensions.get('window');
const SQUARE_SIZE = 20;
const NUM_COLS = 4;
const CHECKERBOARD_HEIGHT = height * 0.5;
const NUM_ROWS = Math.ceil(CHECKERBOARD_HEIGHT / SQUARE_SIZE) + 2;

// Gradiente de opacidad vertical
const opacities = Array.from({ length: NUM_ROWS }, (_, i) =>
  +(0.60 + (0.6 * i) / (NUM_ROWS - 1)).toFixed(2)
);

const ProfileScreen = ({ navigation }: any) => {
  const [avatar, setAvatar] = useState(require('../../assets/imagen/taxi1.png'));
  const [modalVisible, setModalVisible] = useState(false);

  const [editExtracontractualModalVisible, setEditExtracontractualModalVisible] = useState(false);
  const [editSoatModalVisible, setEditSoatModalVisible] = useState(false);
  const [editPicoyplacaModalVisible, setEditPicoyplacaModalVisible] = useState(false);
  const [editTecnicoModalVisible, setEditTecnicoModalVisible] = useState(false);

  const [tabData, setTabData] = useState({
    extracontractual: '',
    soat: '',
    picoyplaca: '',
    tecnico: '',
  });
  const [editExtracontractualValue, setEditExtracontractualValue] = useState('');
  const [editSoatValue, setEditSoatValue] = useState('');
  const [editPicoyplacaValue, setEditPicoyplacaValue] = useState('');
  const [editTecnicoValue, setEditTecnicoValue] = useState('');

  const [editMotoModalVisible, setEditMotoModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    Marca: '',
    Placa: '',
  });
  const [editMotoValues, setEditMotoValues] = useState(userData);

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
          setTabData({
            extracontractual: tabs.extracontractual || '',
            soat: tabs.soat || '',
            picoyplaca: tabs.picoyplaca || '',
            tecnico: tabs.tecnico || '',
          });
          setEditExtracontractualValue(tabs.extracontractual || '');
          setEditSoatValue(tabs.soat || '');
          setEditPicoyplacaValue(tabs.picoyplaca || '');
          setEditTecnicoValue(tabs.tecnico || '');
        } else {
          setTabData({ extracontractual: '', soat: '', picoyplaca: '', tecnico: '' });
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

  const handleSaveEditExtracontractual = () => {
    const newTabData = { ...tabData, extracontractual: editExtracontractualValue.trim() || '' };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditExtracontractualModalVisible(false);
  };

  const handleSaveEditSoat = () => {
    const newTabData = { ...tabData, soat: editSoatValue.trim() || '' };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditSoatModalVisible(false);
  };

  const handleSaveEditPicoyplaca = () => {
    const newTabData = { ...tabData, picoyplaca: editPicoyplacaValue.trim() || '' };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditPicoyplacaModalVisible(false);
  };

  const handleSaveEditTecnico = () => {
    const newTabData = { ...tabData, tecnico: editTecnicoValue.trim() || '' };
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

  // Checkerboard diagonal en la parte inferior izquierda, mitad de pantalla
  const renderCheckerboard = () => (
    <View style={styles.checkerboardWrapper} pointerEvents="none">
      {Array.from({ length: NUM_ROWS }).map((_, rowIdx) => (
        <View key={`row-${rowIdx}`} style={styles.row}>
          {Array.from({ length: NUM_COLS }).map((_, colIdx) => {
            const isBlack = (rowIdx + colIdx) % 2 === 0;
            return (
              <View
                key={`cell-${rowIdx}-${colIdx}`}
                style={{
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  backgroundColor: isBlack
                    ? `rgba(0,0,0,${opacities[rowIdx]})`
                    : 'transparent',
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={['#fcf1b3', '#FFC300', '#FFA300']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {renderCheckerboard()}

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="doubleleft" size={34} color="black" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image
                source={avatar}
                style={styles.avatar}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.editAvatarButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.editAvatarButtonText}>✏️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={handleOpenEditMoto}>
                <Text style={styles.editButtonText}>Editar Información</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.centeredInfoContainer}>
              <Text style={styles.resultText}>{userData.Marca}</Text>
              <Text style={styles.resultText}>{userData.Placa}</Text>
            </View>
          </View>

          <View style={styles.verticalButtonRow}>
            {/* Extracontractual */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => {
                  setEditExtracontractualValue(tabData.extracontractual);
                  setEditExtracontractualModalVisible(true);
                }}
              >
                <Text style={styles.editButtonText}>Extracontractual</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {tabData.extracontractual ? tabData.extracontractual : 'Editar'}
              </Text>
            </View>
            {/* SOAT */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => {
                  setEditSoatValue(tabData.soat);
                  setEditSoatModalVisible(true);
                }}
              >
                <Text style={styles.editButtonText}>Vence Soat</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {tabData.soat ? tabData.soat : 'Editar'}
              </Text>
            </View>
            {/* Pico y Placa */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => {
                  setEditPicoyplacaValue(tabData.picoyplaca);
                  setEditPicoyplacaModalVisible(true);
                }}
              >
                <Text style={styles.editButtonText}>Pico y Placa</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {tabData.picoyplaca ? tabData.picoyplaca : 'Editar'}
              </Text>
            </View>
            {/* Técnico Mecánica */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => {
                  setEditTecnicoValue(tabData.tecnico);
                  setEditTecnicoModalVisible(true);
                }}
              >
                <Text style={styles.editButtonText}>Vence Técnico Mecánica</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {tabData.tecnico ? tabData.tecnico : 'Editar'}
              </Text>
            </View>
          </View>

          {/* MODALES */}

          {/* Modal para seleccionar imagen */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.imagePickerModalOverlay}>
              <View style={styles.imagePickerModalContent}>
                <TouchableOpacity style={styles.imagePickerModalOption} onPress={openCamera}>
                  <Text style={styles.imagePickerModalOptionText}>Abrir cámara</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imagePickerModalOption} onPress={openGallery}>
                  <Text style={styles.imagePickerModalOptionText}>Abrir galería</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imagePickerModalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.imagePickerModalCancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal para editar información del Taxi */}
          <Modal
            visible={editMotoModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setEditMotoModalVisible(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Editar Información</Text>
                <TextInput 
                  style={styles.editModalInput} 
                  value={editMotoValues.Marca} 
                  onChangeText={text => setEditMotoValues(prev => ({ ...prev, Marca: text }))} 
                  placeholder="Marca" 
                  placeholderTextColor="#888" 
                />
                <TextInput 
                  style={styles.editModalInput} 
                  value={editMotoValues.Placa} 
                  onChangeText={text => setEditMotoValues(prev => ({ ...prev, Placa: text }))} 
                  placeholder="Placa" 
                  placeholderTextColor="#888" 
                />
                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity style={styles.editModalSaveButton} onPress={handleSaveEditMoto}>
                    <Text style={styles.editModalSaveButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editModalCancelButton} onPress={() => setEditMotoModalVisible(false)}>
                    <Text style={styles.editModalCancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal para editar Extracontractual */}
          <Modal
            visible={editExtracontractualModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setEditExtracontractualModalVisible(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Extracontractual</Text>
                <TextInput 
                  style={styles.editModalInput} 
                  value={editExtracontractualValue} 
                  onChangeText={setEditExtracontractualValue} 
                  multiline 
                  placeholder="Escribe aquí..." 
                  placeholderTextColor="#888" 
                />
                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity style={styles.editModalSaveButton} onPress={handleSaveEditExtracontractual}>
                    <Text style={styles.editModalSaveButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editModalCancelButton} onPress={() => setEditExtracontractualModalVisible(false)}>
                    <Text style={styles.editModalCancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal para editar SOAT */}
          <Modal
            visible={editSoatModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setEditSoatModalVisible(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Vencimiento Soat</Text>
                <TextInput 
                  style={styles.editModalInput} 
                  value={editSoatValue} 
                  onChangeText={setEditSoatValue} 
                  multiline 
                  placeholder="Escribe aquí..." 
                  placeholderTextColor="#888" 
                />
                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity style={styles.editModalSaveButton} onPress={handleSaveEditSoat}>
                    <Text style={styles.editModalSaveButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editModalCancelButton} onPress={() => setEditSoatModalVisible(false)}>
                    <Text style={styles.editModalCancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          
          {/* Modal para editar Pico y Placa */}
          <Modal
            visible={editPicoyplacaModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setEditPicoyplacaModalVisible(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Pico y Placa</Text>
                <TextInput 
                  style={styles.editModalInput} 
                  value={editPicoyplacaValue} 
                  onChangeText={setEditPicoyplacaValue} 
                  multiline 
                  placeholder="Escribe aquí..." 
                  placeholderTextColor="#888" 
                />
                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity style={styles.editModalSaveButton} onPress={handleSaveEditPicoyplaca}>
                    <Text style={styles.editModalSaveButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editModalCancelButton} onPress={() => setEditPicoyplacaModalVisible(false)}>
                    <Text style={styles.editModalCancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal para editar Técnico Mecánica */}
          <Modal
            visible={editTecnicoModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setEditTecnicoModalVisible(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Vencimiento Técnico Mecánica</Text>
                <TextInput 
                  style={styles.editModalInput} 
                  value={editTecnicoValue} 
                  onChangeText={setEditTecnicoValue} 
                  multiline 
                  placeholder="Escribe aquí..." 
                  placeholderTextColor="#888" 
                />
                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity style={styles.editModalSaveButton} onPress={handleSaveEditTecnico}>
                    <Text style={styles.editModalSaveButtonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editModalCancelButton} onPress={() => setEditTecnicoModalVisible(false)}>
                    <Text style={styles.editModalCancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default ProfileScreen;