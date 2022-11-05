<template>
    <!-- login form -->
    <div class="w-screen h-screen grid place-content-center">
        <h5 class="mb-6 text-4xl uppercase text-blue-500 font-extrabold">Log In to Play</h5>
        <form action="" class="flex gap-3 flex-col" @submit.prevent="login">
            <div>
                <label for="email" class="text-xl">Email</label>
                <input v-model="email" type="email" name="email" id="email"
                    class="w-full mt-1 border-2 border-gray-300 rounded-md p-2" required>
            </div>
            <div>
                <label for="password" class="text-xl">Password</label>
                <input v-model="password" type="password" name="password" id="password"
                    class="w-full border-2 mt-1 border-gray-300 rounded-md p-2" required>
            </div>
            <button type="submit" :disabled="disableLoginButton"
                class="py-4 rounded-md text-xl uppercase bg-blue-500 hover:bg-blue-600 text-gray-100 hover:text-gray-200 transition-all">Log
                In</button>
        </form>
        <transition name="toast">
            <Toast v-if="showToast" :message="toastMessage" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { useLoginStore } from '~~/store/login';

const config = useRuntimeConfig()
const loginStore = useLoginStore()
const route = useRoute()

const disableLoginButton = ref(false)

const showToast: Ref<boolean> = ref(false)
const toastMessage: Ref<string> = ref('')
const triggerToast = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
    setTimeout(() => (showToast.value = false), 3000)
}

if (route.query.error === 'user-not-found') {
    triggerToast('User not found')
} else if (route.query.error === 'session-expired') {
    triggerToast('Session expired. Log in again')
}

const email: Ref<null | string> = ref(null)
const password: Ref<null | string> = ref(null)

const login = async () => {
    disableLoginButton.value = true
    const data = {
        email: email.value,
        password: password.value
    }
    const response = await useSendData('POST', 'auth/signin', data)
    const json = await response.json()
    if (response.status === 201) {
        loginStore.onLogin(json.access_token)
    } else {
        triggerToast(json.message)
    }
    disableLoginButton.value = false
}
</script>

<style>
.toast-enter-active {
    animation: wobble 0.5s ease;
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
}

.toast-leave-active {
    transition: all 0.3s ease;
}

@keyframes wobble {
    0% {
        transform: translateY(-100px);
        opacity: 0;
    }

    50% {
        transform: translateY(0px);
        opacity: 1;
    }

    60% {
        transform: translateX(8px);
        opacity: 1;
    }

    70% {
        transform: translateX(-8px);
        opacity: 1;
    }

    80% {
        transform: translateX(4px);
        opacity: 1;
    }

    90% {
        transform: translateX(-4px);
        opacity: 1;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>