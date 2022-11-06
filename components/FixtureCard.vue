<template>
    <div class="w-96 pb-2">
        <div class="text-sm w-full justify-between flex gap-2 text-gray-500 font-medium items-center my-4">
            <p>{{ props.fixture.category }}</p>
            <p v-if="props.type === 'Upcoming'">{{ date }}</p>
            <div v-if="props.type === 'Live'" class="flex gap-1 items-center">
                <span>Live</span>
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
        </div>
        <div class="flex gap-1 justify-between items-center mt-2">
            <div class="flex gap-4 items-center">
                <img width="50" class="rounded-md" :src="`/images/logos/${props.fixture.teamA}.png`" alt="">
                <p class="text-base text-gray-700 font-semibold">{{ props.fixture.teamA }}</p>
            </div>
            <div class="bg-gray-400 text-xs py-1 px-2 text-gray-50">
                <p>{{ props.fixture.scoreA ? props.fixture.scoreA : 0 }} - {{ props.fixture.scoreA ?
                        s.fixture.scoreA : 0
                }}</p>
            </div>
            <div class="flex gap-4 items-center">
                <p class="text-base text-gray-700 font-semibold">{{ props.fixture.teamB }}</p>
                <img width="50" class="rounded-md" :src="`/images/logos/${props.fixture.teamB}.png`" alt="">
            </div>
        </div>
        <div class="mt-2" v-if="props.type === 'Upcoming'">
            <div class="flex flex-row w-full items-start gap-1 text-gray-50 text-xs">
                <div @click="bet('TEAMA_WIN')" class="p-2 justify-between w-full " :class="{
                    'bg-blue-500': predictions.userPrediction === 'TEAMA_WIN',
                    'bg-red-500 cursor-pointer': predictions.userPrediction !== 'TEAMA_WIN'
                }">
                    <p>{{ props.fixture.teamA }}</p>
                    <p>{{ predictions.totalUsers * predictionCost / (predictions.teamA ? predictions.teamA : 1) }}</p>
                </div>
                <div @click="bet('DRAW')" class=" p-2 justify-between  w-full" :class="{
                    'bg-blue-500': predictions.userPrediction === 'DRAW',
                    'bg-red-500 cursor-pointer': predictions.userPrediction !== 'DRAW',
                }">
                    <p>Draw</p>
                    <p>{{ predictions.totalUsers * predictionCost / (predictions.draw ? predictions.draw : 1) }}</p>
                </div>
                <div @click="bet('TEAMB_WIN')" class="p-2 justify-between  w-full" :class="{
                    'bg-blue-500': predictions.userPrediction === 'TEAMB_WIN',
                    'bg-red-500 cursor-pointer': predictions.userPrediction !== 'TEAMB_WIN',
                }">
                    <p>{{ props.fixture.teamB }}</p>
                    <p>{{ predictions.totalUsers * predictionCost / (predictions.teamB ? predictions.teamB : 1) }}</p>
                </div>
            </div>
            <p v-if="predictions.userPrediction" class="text-xs mt-1 text-gray-500">*You can change your prediction
                before the game
                starts.
            </p>
        </div>
        <div v-else="props.type==='Live'" class="mt-2">
            <button class="w-full bg-green-500 text-gray-100 py-2">See all predictions</button>
        </div>

        <transition name="toast">
            <Toast v-if="showToast" :message="toastMessage" />
        </transition>
    </div>
</template>
<script setup>
import moment from 'moment'

const props = defineProps({
    fixture: {
        type: Object,
        required: true
    }
    , type: {
        type: String,
        required: true
    }
})

let predictionCost;
switch (props.fixture.category) {
    case 'GROUP_STAGE':
        predictionCost = 50;
        break;
    case 'ROUND_OF_16':
        predictionCost = 100;
        break;
    case 'QUARTER_FINALS':
        predictionCost = 200;
        break;
    case 'SEMI_FINALS':
        predictionCost = 500;
        break;
    case 'FINAL':
        predictionCost = 1000;
        break;
    default:
        break;
}

const showToast = ref(false)
const toastMessage = ref('')
const triggerToast = (msg) => {
    toastMessage.value = msg
    showToast.value = true
    setTimeout(() => (showToast.value = false), 3000)
}

const date = moment(new Date(props.fixture.date)).format('ddd hh:mm')

const { data: predictions, refresh } = await useAsyncData(`prediction-${props.fixture.id}`, () => useGetData(`predictions/${props.fixture.id}`), { initialCache: false })

const bet = async (result) => {
    try {
        if (predictions.value.userPrediction) {
            await useSendData('PATCH', `predictions/update`, {
                fixtureId: props.fixture.id,
                result
            })
        }
        else if (predictions.value.userPrediction === result) return
        else await useSendData('POST', `predictions/create`, {
            fixtureId: props.fixture.id,
            result
        })
        refresh()
    } catch (err) {
        triggerToast(err.response.message)
        refresh()
    }
}
</script>

