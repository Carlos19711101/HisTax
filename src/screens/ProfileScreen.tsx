import React, { useState, useEffect, useCallback } from 'react';
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
  Platform,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
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

type TabData = {
  extracontractual: string;
  soat: string;
  picoyplaca: string;
  tecnico: string;
  
  // Recordatorios
  extracontractualReminderDaysBefore?: number | null;
  extracontractualNotificationId?: string | null;
  soatReminderDaysBefore?: number | null;
  soatNotificationId?: string | null;
  tecnicoReminderDaysBefore?: number | null;
  tecnicoNotificationId?: string | null;

  // Nuevos campos para recordatorios múltiples
  extracontractualNotificationIds?: string[] | null;
  soatNotificationIds?: string[] | null;
  tecnicoNotificationIds?: string[] | null;
  extracontractualDailyWindowDays?: number | null;
  soatDailyWindowDays?: number | null;
  tecnicoDailyWindowDays?: number | null;
  extracontractualReminderHour?: number;
  extracontractualReminderMinute?: number;
  soatReminderHour?: number;
  soatReminderMinute?: number;
  tecnicoReminderHour?: number;
  tecnicoReminderMinute?: number;
};

const ProfileScreen = ({ navigation }: any) => {
  // Estados existentes
  const [avatar, setAvatar] = useState(require('../../assets/imagen/taxi1.png'));
  const [modalVisible, setModalVisible] = useState(false);

  const [editExtracontractualModalVisible, setEditExtracontractualModalVisible] = useState(false);
  const [editSoatModalVisible, setEditSoatModalVisible] = useState(false);
  const [editPicoyplacaModalVisible, setEditPicoyplacaModalVisible] = useState(false);
  const [editTecnicoModalVisible, setEditTecnicoModalVisible] = useState(false);
  const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const openPicoDaySelector = () => setShowPicoDayModal(true);

  const pickPicoDay = async (day: string) => {
    const newTab = { ...tabData, picoyplaca: day };
    setTabData(newTab);
    await saveTabData(newTab);
    setShowPicoDayModal(false);
  };
  const [tabData, setTabData] = useState<TabData>({
    extracontractual: '',
    soat: '',
    picoyplaca: '',
    tecnico: '',
    extracontractualReminderDaysBefore: null,
    extracontractualNotificationId: null,
    soatReminderDaysBefore: null,
    soatNotificationId: null,
    tecnicoReminderDaysBefore: null,
    tecnicoNotificationId: null,
    extracontractualNotificationIds: null,
    soatNotificationIds: null,
    tecnicoNotificationIds: null,
    extracontractualDailyWindowDays: null,
    soatDailyWindowDays: null,
    tecnicoDailyWindowDays: null,
    extracontractualReminderHour: 9,
    extracontractualReminderMinute: 0,
    soatReminderHour: 9,
    soatReminderMinute: 0,
    tecnicoReminderHour: 9,
    tecnicoReminderMinute: 0,
  });

  // Valores temporales para edición de texto
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

  // Nuevos estados para calendario y recordatorios (COPIADO DEL SEGUNDO SCREEN)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDocType, setActiveDocType] = useState<'extracontractual' | 'soat' | 'tecnico' | null>(null);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [pendingDueISO, setPendingDueISO] = useState<string | null>(null);

  // Hora para recordatorios (COPIADO DEL SEGUNDO SCREEN)
  const [reminderTime, setReminderTime] = useState<Date>(() => {
    const d = new Date();
    d.setHours(9, 0, 0, 0);
    return d;
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPicoDayModal, setShowPicoDayModal] = useState(false);
  // ------- Helpers (COPIADO DEL SEGUNDO SCREEN) -------
  const toISODate = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const formatYYYYMMDD = (iso: string) => iso;

  // ------- Persistencia de datos -------
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
          const saved = JSON.parse(tabDataString);
          setTabData((prev) => ({
            ...prev,
            ...saved,
          }));
          setEditExtracontractualValue(saved.extracontractual || '');
          setEditSoatValue(saved.soat || '');
          setEditPicoyplacaValue(saved.picoyplaca || '');
          setEditTecnicoValue(saved.tecnico || '');

          // Preparar hora (COPIADO DEL SEGUNDO SCREEN)
          const h = saved.soatReminderHour ?? 9;
          const m = saved.soatReminderMinute ?? 0;
          const d = new Date();
          d.setHours(h, m, 0, 0);
          setReminderTime(d);
        } else {
          setTabData({ 
            extracontractual: '', 
            soat: '', 
            picoyplaca: '', 
            tecnico: '',
            extracontractualReminderDaysBefore: null,
            extracontractualNotificationId: null,
            soatReminderDaysBefore: null,
            soatNotificationId: null,
            tecnicoReminderDaysBefore: null,
            tecnicoNotificationId: null,
            extracontractualNotificationIds: null,
            soatNotificationIds: null,
            tecnicoNotificationIds: null,
            extracontractualDailyWindowDays: null,
            soatDailyWindowDays: null,
            tecnicoDailyWindowDays: null,
            extracontractualReminderHour: 9,
            extracontractualReminderMinute: 0,
            soatReminderHour: 9,
            soatReminderMinute: 0,
            tecnicoReminderHour: 9,
            tecnicoReminderMinute: 0,
          });
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

  const saveTabData = async (data: TabData) => {
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

  // ------- Notificaciones (COPIADO DEL SEGUNDO SCREEN) -------
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const perm = await Notifications.getPermissionsAsync();
        if (perm.status !== 'granted') {
          await Notifications.requestPermissionsAsync();
        }
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      } catch (e) {
        console.log('No se pudo preparar notificaciones:', e);
      }
    };
    setupNotifications();
  }, []);

  const makeDateTrigger = (triggerDate: Date): any => {
    const anyNotif: any = Notifications as any;
    const ms = triggerDate.getTime();
    const dateType =
      anyNotif?.SchedulableTriggerInputTypes?.DATE ?? 'date';
    return {
      type: dateType,
      date: ms,
      ...(Platform.OS === 'android' ? { channelId: 'default', allowWhileIdle: true } : {}),
    } as any;
  };

  // Cancelar recordatorios previos (COPIADO DEL SEGUNDO SCREEN)
  const cancelPreviousFor = useCallback(async (doc: 'extracontractual' | 'soat' | 'tecnico') => {
    try {
      const ids = 
        doc === 'extracontractual' ? tabData.extracontractualNotificationIds :
        doc === 'soat' ? tabData.soatNotificationIds :
        tabData.tecnicoNotificationIds;
      
      if (ids && ids.length) {
        await Promise.all(ids.map(id => Notifications.cancelScheduledNotificationAsync(id).catch(() => {})));
      }
      
      const legacyId = 
        doc === 'extracontractual' ? tabData.extracontractualNotificationId :
        doc === 'soat' ? tabData.soatNotificationId :
        tabData.tecnicoNotificationId;
      
      if (legacyId) {
        await Notifications.cancelScheduledNotificationAsync(legacyId).catch(() => {});
      }
    } catch {}
  }, [tabData]);

  const applyTime = (base: Date, hour: number, minute: number) => {
    const d = new Date(base);
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  // Programar recordatorio simple (COPIADO DEL SEGUNDO SCREEN)
  const scheduleSingleReminder = useCallback(
    async ({
      doc,
      dueISO,
      daysBefore,
      hour,
      minute,
    }: {
      doc: 'extracontractual' | 'soat' | 'tecnico';
      dueISO: string;
      daysBefore: number;
      hour: number;
      minute: number;
    }): Promise<string | null> => {
      try {
        await cancelPreviousFor(doc);

        const due = new Date(dueISO + 'T00:00:00');
        const triggerDate = new Date(due);
        triggerDate.setDate(triggerDate.getDate() - daysBefore);
        const finalDate = applyTime(triggerDate, hour, minute);

        if (finalDate.getTime() <= Date.now()) {
          Alert.alert('Aviso', 'El recordatorio quedó en el pasado. No se programó notificación.');
          return null;
        }

        const trigger = makeDateTrigger(finalDate);
        const docName = 
          doc === 'extracontractual' ? 'Extracontractual' :
          doc === 'soat' ? 'SOAT' : 'Técnico Mecánica';
        
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: '📄 Vencimiento de documento',
            body: `Tu ${docName} vence el ${formatYYYYMMDD(dueISO)}`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { doc, dueISO, daysBefore, hour, minute },
          },
          trigger,
        });

        return id;
      } catch (e) {
        console.log('Error programando recordatorio simple:', e);
        return null;
      }
    },
    [cancelPreviousFor]
  );

  // Programar recordatorios diarios (COPIADO DEL SEGUNDO SCREEN)
  const scheduleDailyWindowReminders = useCallback(
    async ({
      doc,
      dueISO,
      windowDays,
      hour,
      minute,
    }: {
      doc: 'extracontractual' | 'soat' | 'tecnico';
      dueISO: string;
      windowDays: 5 | 10 | 15;
      hour: number;
      minute: number;
    }): Promise<string[]> => {
      const ids: string[] = [];
      try {
        await cancelPreviousFor(doc);

        const due = new Date(dueISO + 'T00:00:00');
        const docName = 
          doc === 'extracontractual' ? 'Extracontractual' :
          doc === 'soat' ? 'SOAT' : 'Técnico Mecánica';
        
        for (let i = windowDays; i >= 1; i--) {
          const day = new Date(due);
          day.setDate(day.getDate() - i);
          const finalDate = applyTime(day, hour, minute);
          if (finalDate.getTime() <= Date.now()) continue;

          const trigger = makeDateTrigger(finalDate);
          const id = await Notifications.scheduleNotificationAsync({
            content: {
              title: '⏰ Recordatorio de documento (diario)',
              body: `${docName} vence el ${formatYYYYMMDD(dueISO)} · Faltan ${i} día(s)`,
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
              data: { doc, dueISO, dayOffset: i, hour, minute },
            },
            trigger,
          });
          ids.push(id);
        }
      } catch (e) {
        console.log('Error programando ventana diaria:', e);
      }
      return ids;
    },
    [cancelPreviousFor]
  );

  // ------- Funciones existentes (cámara, galería, etc.) -------
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

  // ------- Funciones de guardado existentes (para compatibilidad) -------
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

  // ------- NUEVAS FUNCIONES PARA CALENDARIO (COPIADAS EXACTAMENTE DEL SEGUNDO SCREEN) -------
  const openDueDatePicker = (doc: 'extracontractual' | 'soat' | 'tecnico') => {
    setActiveDocType(doc);
    const prevISO = doc === 'extracontractual' ? tabData.extracontractual :
                   doc === 'soat' ? tabData.soat : tabData.tecnico;
    setTempDate(prevISO ? new Date(prevISO + 'T00:00:00') : new Date());

    // pre-cargar hora según doc (EXACTA COPIADA DEL SEGUNDO SCREEN)
    const hour = (doc === 'extracontractual' ? tabData.extracontractualReminderHour : 
                 doc === 'soat' ? tabData.soatReminderHour : 
                 tabData.tecnicoReminderHour) ?? 9;
    const minute = (doc === 'extracontractual' ? tabData.extracontractualReminderMinute : 
                   doc === 'soat' ? tabData.soatReminderMinute : 
                   tabData.tecnicoReminderMinute) ?? 0;
    const t = new Date();
    t.setHours(hour, minute, 0, 0);
    setReminderTime(t);

    setShowDatePicker(true);
  };

  const onDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selected) {
        setShowDatePicker(false);
        const iso = toISODate(selected);
        setPendingDueISO(iso);
        setShowReminderModal(true);
      } else if (event.type === 'dismissed') {
        setShowDatePicker(false);
      }
    } else {
      if (selected) setTempDate(selected);
    }
  };

  const confirmIOSDate = () => {
    const iso = toISODate(tempDate);
    setShowDatePicker(false);
    setPendingDueISO(iso);
    setShowReminderModal(true);
  };

  const onTimePicked = (_evt: DateTimePickerEvent, selected?: Date) => {
    setShowTimePicker(false);
    if (selected) setReminderTime(selected);
  };

  // Elegir opción simple (EXACTA COPIADA DEL SEGUNDO SCREEN)
  const pickSimpleReminder = async (daysBefore: number | null) => {
    if (!activeDocType || !pendingDueISO) {
      setShowReminderModal(false);
      return;
    }

    let notificationId: string | null = null;
    let ids: string[] | null = null;

    if (daysBefore !== null) {
      const id = await scheduleSingleReminder({
        doc: activeDocType,
        dueISO: pendingDueISO,
        daysBefore,
        hour: reminderTime.getHours(),
        minute: reminderTime.getMinutes(),
      });
      notificationId = id;
    } else {
      // cancelar todos
      await cancelPreviousFor(activeDocType);
    }

    const newTab: TabData = { ...tabData };
    if (activeDocType === 'extracontractual') {
      newTab.extracontractual = pendingDueISO;
      newTab.extracontractualReminderDaysBefore = daysBefore ?? null;
      newTab.extracontractualNotificationId = notificationId ?? null;
      newTab.extracontractualNotificationIds = ids; // null en simple
      newTab.extracontractualDailyWindowDays = null;
      newTab.extracontractualReminderHour = reminderTime.getHours();
      newTab.extracontractualReminderMinute = reminderTime.getMinutes();
    } else if (activeDocType === 'soat') {
      newTab.soat = pendingDueISO;
      newTab.soatReminderDaysBefore = daysBefore ?? null;
      newTab.soatNotificationId = notificationId ?? null;
      newTab.soatNotificationIds = ids; // null en simple
      newTab.soatDailyWindowDays = null;
      newTab.soatReminderHour = reminderTime.getHours();
      newTab.soatReminderMinute = reminderTime.getMinutes();
    } else {
      newTab.tecnico = pendingDueISO;
      newTab.tecnicoReminderDaysBefore = daysBefore ?? null;
      newTab.tecnicoNotificationId = notificationId ?? null;
      newTab.tecnicoNotificationIds = ids; // null en simple
      newTab.tecnicoDailyWindowDays = null;
      newTab.tecnicoReminderHour = reminderTime.getHours();
      newTab.tecnicoReminderMinute = reminderTime.getMinutes();
    }
    
    setTabData(newTab);
    await saveTabData(newTab);

    setShowReminderModal(false);
    setPendingDueISO(null);
    setActiveDocType(null);

    Alert.alert(
      'Guardado',
      daysBefore === null
        ? 'Fecha guardada sin recordatorio.'
        : 'Recordatorio programado correctamente.'
    );
  };

  // Elegir opción "diaria por ventana" (EXACTA COPIADA DEL SEGUNDO SCREEN)
  const pickDailyWindow = async (windowDays: 5 | 10 | 15) => {
    if (!activeDocType || !pendingDueISO) {
      setShowReminderModal(false);
      return;
    }

    const ids = await scheduleDailyWindowReminders({
      doc: activeDocType,
      dueISO: pendingDueISO,
      windowDays,
      hour: reminderTime.getHours(),
      minute: reminderTime.getMinutes(),
    });

    const newTab: TabData = { ...tabData };
    if (activeDocType === 'extracontractual') {
      newTab.extracontractual = pendingDueISO;
      newTab.extracontractualNotificationIds = ids;
      newTab.extracontractualNotificationId = null;
      newTab.extracontractualReminderDaysBefore = null;
      newTab.extracontractualDailyWindowDays = windowDays;
      newTab.extracontractualReminderHour = reminderTime.getHours();
      newTab.extracontractualReminderMinute = reminderTime.getMinutes();
    } else if (activeDocType === 'soat') {
      newTab.soat = pendingDueISO;
      newTab.soatNotificationIds = ids;
      newTab.soatNotificationId = null;
      newTab.soatReminderDaysBefore = null;
      newTab.soatDailyWindowDays = windowDays;
      newTab.soatReminderHour = reminderTime.getHours();
      newTab.soatReminderMinute = reminderTime.getMinutes();
    } else {
      newTab.tecnico = pendingDueISO;
      newTab.tecnicoNotificationIds = ids;
      newTab.tecnicoNotificationId = null;
      newTab.tecnicoReminderDaysBefore = null;
      newTab.tecnicoDailyWindowDays = windowDays;
      newTab.tecnicoReminderHour = reminderTime.getHours();
      newTab.tecnicoReminderMinute = reminderTime.getMinutes();
    }
    
    setTabData(newTab);
    await saveTabData(newTab);

    setShowReminderModal(false);
    setPendingDueISO(null);
    setActiveDocType(null);

    Alert.alert(
      'Guardado',
      ids.length
        ? `Programado: 1 recordatorio por día durante los últimos ${windowDays} días.`
        : 'No se programaron recordatorios (todas las fechas quedaron en el pasado).'
    );
  };

  // Helper para mostrar labels (COPIADO DEL SEGUNDO SCREEN)
  const rightLabelFor = (key: 'extracontractual' | 'soat' | 'tecnico' | 'picoyplaca') => {
    if (key === 'picoyplaca') {
      return tabData.picoyplaca ? tabData.picoyplaca : 'Editar';
    }
    const iso = tabData[key];
    if (!iso) return 'Editar';
    return `Vence ${formatYYYYMMDD(iso)}`;
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
            <AntDesign name="double-left" size={44} color="black" />
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
            {/* Extracontractual - AHORA CON CALENDARIO */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => openDueDatePicker('extracontractual')}
              >
                <Text style={styles.editButtonText}>Extracontractual</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {rightLabelFor('extracontractual')}
              </Text>
            </View>
            {/* SOAT - AHORA CON CALENDARIO */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => openDueDatePicker('soat')}
              >
                <Text style={styles.editButtonText}>Vence Soat</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {rightLabelFor('soat')}
              </Text>
            </View>
            {/* Pico y Placa - MANTIENE TEXTO ORIGINAL */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={openPicoDaySelector}
              >
                <Text style={styles.editButtonText}>Pico y Placa</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {rightLabelFor('picoyplaca')}
              </Text>
            </View>
          
            {/* Técnico Mecánica - AHORA CON CALENDARIO */}
            <View style={styles.buttonWithResult}>
              <TouchableOpacity
                style={styles.editButtonCompact}
                onPress={() => openDueDatePicker('tecnico')}
              >
                <Text style={styles.editButtonText}>Técnico Mecánica</Text>
              </TouchableOpacity>
              <Text style={styles.resultTextRight}>
                {rightLabelFor('tecnico')}
              </Text>
            </View>
          </View>

          {/* MODALES EXISTENTES */}

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

          {/* Modales de texto existentes (para compatibilidad) */}
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

          {/* NUEVOS MODALES PARA CALENDARIO Y RECORDATORIOS (COPIADOS DEL SEGUNDO SCREEN) */}

          {/* Date Picker para Extracontractual, SOAT y Técnico */}
          {showDatePicker && (
            <Modal
              visible={showDatePicker}
              transparent
              animationType="fade"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.editModalOverlay}>
                <View style={styles.editModalContent}>
                  <Text style={styles.editModalTitle}>
                    {activeDocType === 'extracontractual' ? 'Elige fecha de vencimiento Extracontractual' : 
                     activeDocType === 'soat' ? 'Elige fecha de vencimiento SOAT' : 
                     'Elige fecha de vencimiento Técnico'}
                  </Text>

                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display={Platform.OS === 'android' ? 'calendar' : 'inline'}
                    onChange={onDateChange}
                  />

                  {Platform.OS === 'ios' && (
                    <View style={styles.editModalButtonRow}>
                      <TouchableOpacity style={styles.editModalSaveButton} onPress={confirmIOSDate}>
                        <Text style={styles.editModalSaveButtonText}>Confirmar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.editModalCancelButton}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.editModalCancelButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          )}

          {/* Modal de recordatorios (COPIADO EXACTAMENTE DEL SEGUNDO SCREEN) */}
          <Modal
            visible={showReminderModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowReminderModal(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Recordatorio</Text>

                {/* Hora seleccionada */}
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                    Hora actual: {reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.editModalSaveButton}>
                    <Text style={styles.editModalSaveButtonText}>Cambiar hora</Text>
                  </TouchableOpacity>
                </View>

                {showTimePicker && (
                  <DateTimePicker
                    value={reminderTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onTimePicked}
                  />
                )}

                {/* Diario (uno por día) */}
                <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 6, marginBottom: 4 }}>Diario (uno por día):</Text>
                <TouchableOpacity
                  style={{ paddingVertical: 10, alignItems: 'center' }}
                  onPress={() => pickDailyWindow(5)}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>
                    Últimos 5 días (un recordatorio cada día)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 10, alignItems: 'center' }}
                  onPress={() => pickDailyWindow(10)}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>
                    Últimos 10 días (un recordatorio cada día)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 10, alignItems: 'center' }}
                  onPress={() => pickDailyWindow(15)}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>
                    Últimos 15 días (un recordatorio cada día)
                  </Text>
                </TouchableOpacity>

                {/* Separador */}
                <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 10, width: '100%' }} />

                {/* Una sola vez */}
                <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 6 }}>Una sola vez:</Text>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(null)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>Sin recordar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(0)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>Mismo día</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(1)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>1 día antes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(3)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>3 días antes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(7)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>7 días antes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(10)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>10 días antes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, alignItems: 'center' }} onPress={() => pickSimpleReminder(15)}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>15 días antes</Text>
                </TouchableOpacity>

                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity
                    style={styles.editModalCancelButton}
                    onPress={() => {
                      setShowReminderModal(false);
                      setPendingDueISO(null);
                      setActiveDocType(null);
                    }}
                  >
                    <Text style={styles.editModalCancelButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Modal para seleccionar día de Pico y Placa */}
          <Modal
            visible={showPicoDayModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowPicoDayModal(false)}
          >
            <View style={styles.editModalOverlay}>
              <View style={styles.editModalContent}>
                <Text style={styles.editModalTitle}>Día de Pico y Placa</Text>
                {DAYS.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={{ paddingVertical: 12, alignItems: 'center' }}
                    onPress={() => pickPicoDay(day)}
                  >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#090FFA' }}>{day}</Text>
                  </TouchableOpacity>
                ))}

                <View style={styles.editModalButtonRow}>
                  <TouchableOpacity
                    style={styles.editModalCancelButton}
                    onPress={() => setShowPicoDayModal(false)}
                  >
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