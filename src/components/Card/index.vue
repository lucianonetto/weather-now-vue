<template>
<div :class="$style.card">
    <div :class="$style.title">
        {{ item.name }}, {{ item.sys.country }}
    </div>
    <div v-if="loading" :class="$style.loading">
        <img :src="loader" :class="$style.loader" alt="Loading" />
    </div>
    <template v-else>
        <div :class="$style.content">
            <div :class="[$style.temperature, $style[item.color]]">
                {{ item.main.temp.toFixed(0) }}<span>o</span>
            </div>
        </div>
        <div :class="$style.info">
            <div :class="$style.position">
                <div :class="$style.values">
                    <div :class="$style.label">
                        HUMIDITY
                        <div :class="$style.value">{{ item.main.humidity }}<span>%</span></div>
                    </div>
                    <div :class="$style.label">
                        PRESSURE
                        <div :class="$style.value">{{ item.main.pressure }}<span>hPa</span></div>
                    </div>
                </div>
                <div :class="$style.updated">
                    Updated at {{ new Date(item.updated).toLocaleTimeString('en-US') }}
                    <!-- Updated at {{ item.updated.toLocaleTimeString('en-US') }} -->
                </div>
            </div>
        </div>
    </template>
</div>
</template>

<script lang="ts">
import loader from '../../assets/loader.svg';

export default {
  name: 'card-component',
  props: {
    item: Object,
    loading: Boolean,
  },
  setup() {
    return {
      loader,
    };
  },
};
</script>

<style lang="sass" module>
.card
    width: 250px
    background-color: var(--white)
    box-shadow: 2px 2px 5px 2px rgba(var(--box-shadow),0.1)
    border-radius: 5px
    overflow: hidden
    .title
        height: 42px
        display: flex
        align-items: center
        justify-content: center
        box-shadow: 0px 0px 2px 2px rgba(var(--box-shadow),0.1)
        color: var(--grey)
        font-size: 1.2rem
    .content
        height: 140px
        display: flex
        align-items: center
        justify-content: center
        .temperature
            font-size: 6rem
            display: inline-flex
            letter-spacing: -0.25rem
            span
                font-size: 1.5rem
                line-height: 4rem
                font-weight: bold
        .blue
            color: var(--blue)
        .orange
            color: var(--orange)
        .red
            color: var(--red)
    .info
        background-color: rgba(var(--background), .5)
        overflow: hidden
        height: 40px
        position: relative
        transition: height .3s
        .position
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            .values
                height: 46px
                display: flex
                align-items: flex-end
                justify-content: space-between
                padding: 0 30px 0 30px
                .label
                    text-align: center
                    color: var(--grey-medium)
                    font-size: .75rem
                    .value
                        display: block
                        color: var(--grey)
                        font-size: 1.2rem
                        span
                            font-size: .75rem
            .updated
                height: 40px
                display: flex
                align-items: center
                justify-content: center
                font-size: .70rem
                color: var(--grey-medium)
    &:hover
        .info
            height: 86px
    .loading
        display: flex
        align-items: center
        justify-content: center
        height: 180px

@media (max-width: 890px)
    .card
        margin-bottom: 30px
        .info
            height: 86px
        .loading
            height: 226px
        &:last-child
            margin-bottom: 0
</style> 