import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

const Dashboard = ({ route }) => {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('/appointments');

    setAppointments(response.data);
  }

  useFocusEffect(() => {
    if (route.params && route.params.appointmentsChanged) {
      route.params.appointmentsChanged = false;
      loadAppointments();
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) =>
            !item.canceled_at && (
              <Appointment onCancel={() => handleCancel(item.id)} data={item} />
            )
          }
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
