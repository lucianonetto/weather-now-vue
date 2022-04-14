<template>
    <main :class="$style.climates">
        <div v-if="error" :class="$style.error">
            <div :class="$style.message">Something went wrong</div>
            <button :class="$style.button" type="button" @click="refetch">Try Again</button>
        </div>
        <template v-else>
            <img v-if="isLoading" :src="loader" :class="$style.loader" alt="Loading" />
            <div v-else :class="$style.list">
                <Card v-for="item in data" :key="item.id" :item="item" :loading="isFetching" />
            </div>
        </template>
       
    </main>
</template>

<script lang="ts">
import Card from '@/components/Card/index.vue';
import axios from '@/services/api';
import loader from '@/assets/loader.svg';
import { onMounted, ref } from 'vue';

export default {
  name: 'climates-component',
  components: {
    Card,
  },
  setup() {
    const data = ref([]);
    const isLoading = ref(true);
    const isFetching = ref(false);
    const error = ref(false);

    const getClimates = async () => {
        const color = (temp: number) => {
            if (temp < 6) return 'blue'
            else if (temp > 25) return 'red'
            return 'orange'
        }
        const response = await axios.get(`group?id=3421319,3445709,184745&appid=${process.env.VUE_APP_API_KEY}&units=metric`);
        const climates = response.data.list.map((d: { name: string; sys: object; main: { temp: number; }; id: number; }) => {
            return {
                name: d.name,
                sys: d.sys,
                main: d.main,
                id: d.id,
                updated: new Date(),
                color: color(Math.round(d.main.temp))
            }
        });
        data.value = climates;
        localStorage.setItem("climates", JSON.stringify(climates));
        isLoading.value = false;
        isFetching.value = false;
    }

    setInterval(() => {
        isFetching.value = true;
        getClimates();
    }, 600000);
    
    onMounted(() => {
        if (localStorage.climates) {
            const dataStorage = JSON.parse(localStorage.climates);
            const date1 = new Date(dataStorage[0].updated).getTime();
            const date2 = new Date().getTime();
            const diff = Math.round((date2 - date1) / 1000);
            if (diff > 600) getClimates()
            else {
                data.value = JSON.parse(localStorage.climates)
                isLoading.value = false;
            }
        } else getClimates();
    });
    return {
      data,
      isLoading,
      isFetching,
      error,
      loader,
    };
  },
};
</script>

<style lang="sass" module>
.climates
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    min-height: calc(100vh - 56px)
    padding-top: 56px
    position: relative
    z-index: 1
    .list
        width: 100%
        padding: 30px
        min-height: 268px
        max-width: 850px
        display: flex
        align-items: center
        justify-content: space-between
    .error
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        .message
            color: var(--red)
            margin-bottom: 20px
        .button
            height: 40px
            width: 100px
            font-size: 1rem
            background: none
            border: solid 2px var(--grey)
            color: var(--grey)
            border-radius: 40px
            cursor: pointer
            &:hover
                opacity: .7
    @media (max-width: 890px)
        .list
            flex-direction: column
</style> 