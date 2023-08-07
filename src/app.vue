<script setup lang="ts">
import { appName } from "./constants"

useHead({
  title: appName,
})

const { isMobile } = useDevice()

onMounted(() => {
  if (isMobile) {
    useHead({
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
    })
  }
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NConfigProvider inline-theme-disabled>
      <NMessageProvider>
        <NNotificationProvider>
          <NLoadingBarProvider>
            <NDialogProvider>
              <NuxtPage />
            </NDialogProvider>
          </NLoadingBarProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NConfigProvider>
  </NuxtLayout>
</template>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";

html,
body,
#__nuxt {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  color: black;
  display: flex;
  background: #f5f5f5;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.vue-flow__node-custom {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
