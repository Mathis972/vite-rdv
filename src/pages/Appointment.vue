<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '../supabase';
const session = ref();
const doctors = ref<any[]>([]);
const selectedDoctorId = ref('');
const selectedDate = ref('');
const address = ref('');
const lon = ref(0);
const lat = ref(0);
const loading = ref(true);
const hasError = ref(false);
const userId = ref('');
const notificationInfos = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    console.log(data.session);
    if (data.session?.user?.id) {
      userId.value = data.session.user.id;
    }
    getDoctors();
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });

  navigator.geolocation.getCurrentPosition((nav) => {
    lon.value = nav.coords.longitude;
    lat.value = nav.coords.latitude;
  });
});

async function getDoctors() {
  try {
    loading.value = true;
    let { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('isDoctor', true);
    if (error) throw error;
    if (data) {
      doctors.value = data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function bookAppointment() {
  if (selectedDoctorId.value && selectedDate.value && address.value) {
    console.log(
      `booking reservation with doctor number ${selectedDoctorId.value} on ${selectedDate.value} at ${address.value}`
    );
    hasError.value = false;
    try {
      await supabase.from('appointments').insert({
        client_id: userId.value,
        doctor_id: selectedDoctorId.value,
        date: selectedDate.value,
        address: address.value,
        lon: lon.value,
        lat: lat.value,
      });
      notificationInfos.value = {
        doctorId: selectedDoctorId.value,
        date: selectedDate.value,
      };
      setTimeout(() => {
        notificationInfos.value = null;
      }, 5000);
    } catch (err) {
      console.error(err);
    }
  } else {
    hasError.value = true;
  }
}

async function selectDoctor(doctorId: string) {
  selectedDoctorId.value !== doctorId
    ? (selectedDoctorId.value = doctorId)
    : (selectedDoctorId.value = '');
}
</script>

<template>
  <form class="form-widget">
    <p v-if="hasError" class="text-red-500">
      Une date, un practicien et une addresse sont nécessaires
    </p>
    <div>
      <label class="text-black p-5" for="date">Date</label>
      <input id="date" type="date" v-model="selectedDate" />
    </div>
    <div>
      <label class="text-black p-5" for="address">addresse</label>
      <input id="address" v-model="address" />
    </div>

    <div>
      <label class="text-black" for="username"
        >Practiciens disponibles à cet horaire</label
      >
      <div v-if="loading" class="flex justify-center items-center">
        <span class="text-black animate-spin">ça tourne...</span>
      </div>
      <div
        v-for="doctor in doctors"
        @click="selectDoctor(doctor.id)"
        :class="{ 'bg-blue-300': selectedDoctorId === doctor.id }"
        class="text-black cursor-pointer"
      >
        {{ doctor.first_name }} {{ doctor.last_name }}
      </div>
    </div>
    <button
      type="button"
      @click="bookAppointment"
      class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      Prendre RDV
    </button>
    <div
      v-if="notificationInfos"
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute bottom-10 right-10"
      role="alert"
    >
      <div class="flex">
        <div class="py-1">
          <svg
            class="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            />
          </svg>
        </div>
        <div>
          <p class="font-bold">Votre rendez vous a été créé</p>
          <p class="text-sm">
            Notez bien ce rendez vous avec le docteur
            {{
              doctors.find((doc) => doc.id === notificationInfos.doctorId)
                ?.last_name
            }}
            le
            {{ notificationInfos.date }}
          </p>
        </div>
      </div>
    </div>
  </form>
</template>
