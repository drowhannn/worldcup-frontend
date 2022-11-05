<template>
    <div class="w-fit">
        <div class="text-xl w-full justify-between flex gap-2 text-gray-500 font-medium items-center my-4">
            <p>{{ props.fixture.category }}</p>
            <p>{{ date }}</p>
        </div>
        <div class="flex gap-8 items-center mt-2">
            <div class="flex gap-4 items-center">
                <img width="100" class="rounded-md" :src="`/images/logos/${props.fixture.teamA}.png`" alt="">
                <p class="text-3xl text-gray-700 font-semibold">{{ props.fixture.teamA }}</p>
            </div>
            <div class="bg-gray-400 text-sm py-1 px-2 text-gray-50">
                <p>{{ props.fixture.scoreA ? props.fixture.scoreA : 0 }} - {{ props.fixture.scoreA ?
                        s.fixture.scoreA : 0
                }}</p>
            </div>
            <div class="flex gap-4 items-center">
                <p class="text-3xl text-gray-700 font-semibold">{{ props.fixture.teamB }}</p>
                <img width="100" class="rounded-md" :src="`/images/logos/${props.fixture.teamB}.png`" alt="">
            </div>
        </div>
        <div class="mt-2 w-fit bg-gray-100 px-4 pt-2 pb-3 rounded-md">
            <div class="flex flex-col w-fit items-start gap-1 text-gray-50">
                <p class="text-xl font-bold uppercase text-orange-500">Place Your Bet Now</p>
                <div @click="bet('TEAMA_WIN')"
                    class="relative cursor-pointer p-2 flex justify-between bg-gray-300 hover:text-white w-full rounded-md">
                    <div class="w-[2%] bg-blue-500 rounded-md h-full absolute top-0 left-0 z-40">
                    </div>
                    <p class="z-50">{{ props.fixture.teamA }}</p>
                    <p class="z-50">{{ predictions.teamA }} votes</p>
                </div>
                <div @click="bet('DRAW')"
                    class="p-2 relative cursor-pointer bg-gray-300 flex justify-between hover:text-white w-full rounded-md">
                    <div class="w-[2%] bg-blue-500 rounded-md h-full absolute top-0 left-0 z-40"></div>
                    <p class="z-50">Draw</p>
                    <p class="z-50">{{ predictions.draw }} votes</p>
                </div>
                <div @click="bet('TEAMB_WIN')"
                    class="p-2 relative cursor-pointer bg-gray-300 flex justify-between hover:text-white w-full rounded-md">
                    <div class="w-[2%] bg-blue-500 rounded-md h-full absolute top-0 left-0 z-40"></div>
                    <p>{{ props.fixture.teamB }}</p>
                    <p>{{ predictions.teamB }} votes</p>
                </div>
            </div>
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
})

const showToast = ref(false)
const toastMessage = ref('')
const triggerToast = (msg) => {
    toastMessage.value = msg
    showToast.value = true
    setTimeout(() => (showToast.value = false), 3000)
}

const date = moment(new Date(props.fixture.date)).format('ddd hh:mm')

const { data: predictions, refresh } = await useAsyncData('predictions', () => useGetData(`predictions/${props.fixture.id}`), { initialCache: false })

const bet = async (result) => {
    try {
        await useSendData('POST', `predictions/create`, {
            fixtureId: props.fixture.id,
            result
        })
        refresh()
    } catch (err) {
        triggerToast(err.response.message)
    }
}
</script>

