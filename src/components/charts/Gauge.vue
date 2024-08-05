<template>
  <q-card square class="bg-transparent q-pa-sm no-shadow bordered-card">
    <span class="text-white bordered-card-label">{{ title }}</span>
    <div class="row items-center justify-center">
      <div class="chart-wrapper">
        <apexchart :key="keyValue" type="radialBar" :options="chartOptions" :series="series" class="full-width">
        </apexchart>
      </div>
    </div>
    <div class="text-red text-center q-mb-md">forecasted <span class="text-yellow">{{ forecasted }}</span></div>
  </q-card>
</template>

<script setup>
import { ref, toRefs, watchEffect } from 'vue'
const props = defineProps(['value', 'keyValue', 'title', 'forecasted'])
const { value } = toRefs(props)
const series = ref([value])
watchEffect(() => {
  series.value = [(value.value)]
})
const chartOptions = ref({
  chart: {
    fontFamily: 'TTLakes, sans-serif',
    height: 350,
    type: 'radialBar'
  },
  plotOptions: {
    radialBar: {
      startAngle: -130,
      endAngle: 130,
      hollow: {
        margin: 0,
        size: '70%',
        background: '#202020',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '100%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: 15,
          show: true,
          color: 'white',
          fontSize: '10px'
        },
        value: {
          offsetY: -15,
          color: 'white',
          fontSize: '14px',
          show: true,
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return w
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      colorStops: [
        {
          offset: 0,
          color: '#F80000'
        },
        {
          offset: 50,
          color: '#FFDC64'
        }
      ],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Completed'],
})

</script>

<style lang="scss" scoped></style>
