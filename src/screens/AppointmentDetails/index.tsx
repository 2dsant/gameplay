import React, { useState, useEffect } from "react";
import { ImageBackground, Text, View, FlatList, Alert, Platform, Share } from "react-native";
import { styles } from "./styles";
import * as Linking from 'expo-linking';
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { Icon, Button } from 'react-native-elements';
import { theme } from "../../global/styles/theme";
import BannerImg from '../../assets/banner.png';
import { ListHeader } from "../../components/ListHeader";
import Member, { MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppointmentsProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Params = {
  guildSelected: AppointmentsProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const { primary } = theme.colors;
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { guildSelected } = route.params as Params;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true)

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Verifique as configuração do servidor. O widget está habilitado?');
      navigation.navigate('Home');
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios' ?
      `Junte-se a ${guildSelected.guild.name}` :
      widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <Button
            type="clear"
            icon={<Icon name="share" size={24} color={primary} />}
            onPress={handleShareInvitation}
          />
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }
      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      }

    </Background>
  )
}
