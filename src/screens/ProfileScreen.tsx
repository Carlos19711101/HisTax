// screens/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

// 1. IMPORTAMOS LOS ESTILOS CONSOLIDADOS
import styles from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }: any) => {
  // Estados (sin cambios)
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

  // Lógica y funciones (sin cambios)
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

  const handleSaveEditSoat = () => {
    const newTabData = { ...tabData, soat: editSoatValue };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditSoatModalVisible(false);
  };

  const handleSaveEditPicoyplaca = () => {
    const newTabData = { ...tabData, picoyplaca: editPicoyplacaValue };
    setTabData(newTabData);
    saveTabData(newTabData);
    setEditPicoyplacaModalVisible(false);
  };

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
            <Text style={styles.resultText}>{userData.Propietario}</Text>
            <Text style={styles.resultText}>{userData.Ciudad}</Text>
          </View>
        </View>

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
              <Text style={styles.editButtonText}>Pico y Placa</Text>
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

        {/* --- MODALES CON ESTILOS ACTUALIZADOS --- */}
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

        {/* Modal para editar información de la moto */}
        <Modal
          visible={editMotoModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setEditMotoModalVisible(false)}
        >
          <View style={styles.editModalOverlay}>
            <View style={styles.editModalContent}>
              <Text style={styles.editModalTitle}>Editar Información de la Moto</Text>
              <TextInput style={styles.editModalInput} value={editMotoValues.Marca} onChangeText={text => setEditMotoValues(prev => ({ ...prev, Marca: text }))} placeholder="Marca" placeholderTextColor="#888" />
              <TextInput style={styles.editModalInput} value={editMotoValues.Placa} onChangeText={text => setEditMotoValues(prev => ({ ...prev, Placa: text }))} placeholder="Placa" placeholderTextColor="#888" />
              <TextInput style={styles.editModalInput} value={editMotoValues.Propietario} onChangeText={text => setEditMotoValues(prev => ({ ...prev, Propietario: text }))} placeholder="Propietario" placeholderTextColor="#888" />
              <TextInput style={styles.editModalInput} value={editMotoValues.Ciudad} onChangeText={text => setEditMotoValues(prev => ({ ...prev, Ciudad: text }))} placeholder="Ciudad" placeholderTextColor="#888" />
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
              <TextInput style={styles.editModalInput} value={editSoatValue} onChangeText={setEditSoatValue} multiline placeholder="Escribe aquí..." placeholderTextColor="#888" />
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
        
        {/* Los otros modales (Pico y Placa, Técnico) usan los mismos estilos 'editModal...' */}
        {/* ... */}

      </ScrollView>
    </LinearGradient>
  );
};

// 2. TODOS LOS StyleSheet.create HAN SIDO REMOVIDOS DE AQUÍ
export default ProfileScreen;