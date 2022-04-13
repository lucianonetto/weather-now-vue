<template>
    <main :class="$style.climates">
        <img v-if="loading" :src="loader" :class="$style.loader" alt="Loading" />
        <div v-else :class="$style.list">
            <Card v-for="item in data" :key="item.id" :item="item" :loading="isFetching" />
        </div>
        <!-- {isLoading ? (
            
        ) : error ? (
            <div className={styles.error}>
                <div className={styles.message}>Something went wrong</div>
                <button className={styles.button} type="button" onClick={() => window.location.reload(false)}>Try Again</button>
            </div>
        ) : (
            <div className={styles.list}>
                {data.map((item) => (
                    <Card key={item.id} item={item} loading={isFetching} />
                ))}
            </div>
        )} -->
    </main>
</template>

<script lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, onMounted } from 'vue';
import axios from '@/services/api';
import loader from '@/assets/loader.svg';

export default {
  name: 'climates-component',
  components: {
    Card,
  },
  setup() {
    const loading = ref(true);
    const data = ref([]);
    
    onMounted(async () => {
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
                updated: new Date().toLocaleTimeString('en-US'),
                color: color(Number(d.main.temp.toFixed(0)))
            }
        });
        data.value = climates;
        loading.value = false;
    });
    return {
      data,
      loader,
      loading,
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