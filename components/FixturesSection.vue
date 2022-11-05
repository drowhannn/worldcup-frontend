<template>
    <div>
        <h5 class="text-3xl text-blue-500 font-bold">Upcoming Matches</h5>
        <FixtureCard :fixture="fixtures[0]" />
    </div>
</template>

<script setup >
const props = defineProps({
    type: {
        type: String,
        required: true

    }
})

const { data: fixtures } = await useAsyncData('fixtures', () => useGetData(`fixtures/${props.type}`), { initialCache: false })
</script>