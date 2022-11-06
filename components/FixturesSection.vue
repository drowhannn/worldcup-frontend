<template>
    <div>
        <h5
            class="text-3xl w-fit pb-1 px-3 rounded-md text-blue-500 font-bold border-b border-l border-r border-gray-200">
            {{
                    props.type
            }}
            Matches</h5>
        <div v-for="fixture, index in fixtures" :key="`${props.type}-${fixture.id}`">
            <FixtureCard :fixture="fixture" :type="props.type" :class="{
                'mt-2 border-t border-gray-200': index !== 0
            }" />
        </div>
    </div>
</template>

<script setup >
const props = defineProps({
    type: {
        type: String,
        required: true

    }
})
const { data: fixtures } = await useAsyncData(`${props.type}-fixtures`, () => useGetData(`fixtures/${props.type.toLowerCase()}`), { initialCache: false })
</script>