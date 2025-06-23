import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  // Datos de ejemplo del usuario
  const user = {
    name: 'Kawasaki Ninja',
    username: '@mariagonz',
    bio: 'Desarrolladora móvil | Amante del café | Viajera frecuente',
    followers: 1243,
    following: 567,
    posts: 86,
    avatar: require('../../assets/imagen/perfil_Moto.png'), // Cambia esto por la URL de tu imagen
    website: 'mariagonzalez.dev',
    joinedDate: 'Junio 2020',
  };

  // Tamaños responsivos
  const avatarSize = width * 0.8;
  const editButtonSize = avatarSize * 0.20;

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
        {/* icono usado para devolver a todoScreen */}
        <AntDesign name="doubleleft" size={34} color="black" />
      </TouchableOpacity>
      {/* Encabezado del perfil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={user.avatar}
            style={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2
              }
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
                bottom: editButtonSize * 0.2
              }
            ]}
          >
            <Text style={styles.editAvatarButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
        </View>

      {/* Información del usuario */}
        <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>

        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailText}>🌐 {user.website}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>📅 {user.joinedDate}</Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}
          onPress={() => navigation.navigate('General')}
        >

          <Text style={styles.shareButtonText}>General</Text>
        </TouchableOpacity>
      </View>

      {/* Pestañas de contenido */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>Publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Guardado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Etiquetado</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido del perfil */}
      <View style={styles.contentPlaceholder}>
        <Text style={styles.placeholderText}>Contenido del perfil</Text>
      </View>
    </ScrollView>
  );
};

// Estilos mejorados
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
    marginTop: height * 0.02, // Agregar margen superior
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: width * 0.05,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.02,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginBottom: height * 0.005,
  },
  statLabel: {
    fontSize: width * 0.032,
    color: '#666',
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.008,
  },
  detailText: {
    fontSize: width * 0.038,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.025,
  },
  editButton: {
    flex: 3,
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
  shareButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: height * 0.015,
    borderRadius: 8,
    alignItems: 'center',
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
  shareButtonText: {
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
    fontWeight: '600',
    fontSize: width * 0.038,
  },
  contentPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.1,
  },
  placeholderText: {
    fontSize: width * 0.04,
    color: '#999',
  },
});

export default ProfileScreen;