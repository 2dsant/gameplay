import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { Appointment, AppointmentsProps } from "../../components/Appointment";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";
import { styles } from "./styles";
import { ListDivider } from '../../components/ListDivider';
import { Background } from "../../components/Background";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
  const navigation = useNavigation<any>();
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleAppointmentDetails(guildSelected: AppointmentsProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }

  function handleTrash(id: string) {
    Alert.alert('Logout', `Deseja excluir o agendamento?`,
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            setAppointments(appointments.filter(item => item.id !== id))
            updateStorage(id)
          }
        }
      ])
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  async function updateStorage(id: string) {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentsProps[] = response ? JSON.parse(response) : [];
    const storageFilter: AppointmentsProps[] = storage ? storage.filter(item => item.id !== id) : [];

    if (storageFilter)
      await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(storageFilter));
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentsProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage)
    }
    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Partidas Agendadas"
              subtitle={`Total: ${appointments.length}`}
            />

            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                  handleTrash={() => handleTrash(item.id)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
      }
    </Background>
  );
}