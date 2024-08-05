<template>
  <q-layout view="hhh lpR fFf">
    <div class="q-gutter-sm" v-if="!stripe.enabled">
      <q-banner class="bg-yellow text-black">
        Stripe integration is not enabled. Your staff will not be able to make payments. Head to the settings page to
        enable it. ( Manager only )
      </q-banner>
    </div>
    <q-header class="bg-transparent relative-position row q-mt-sm" :class="!stripe.enabled ? 'q-mt-xl' : ''">
      <div class="col-12 q-mb-xl">
        <q-toolbar style="justify-content: space-between;">
          <q-avatar>
            <img src="/identity/logo.png">
          </q-avatar>
          <hr class="q-mx-lg" style="flex: 2;">
          <NavigationLinks class="q-mx-auto" />
          <hr class="q-mx-lg" style="flex: 2;">
          <q-btn :label="`Hi, ${username} `" class="cut-with-hover user-btn q-px-md no-border-radius no-shadow font-16"
            color="red" outline icon="img:/icons/user-logo.png">
            <q-menu class="bg-accent text-white" transition-show="jump-down" transition-hide="jump-up" fit>
              <q-list style="min-width: 100px">
                <q-item :to="{ name: 'Edit Account' }" clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item @click="logout" clickable>
                  <q-item-section><span><q-icon name="logout" /> Logout</span></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </div>
    </q-header>
    <q-page-container>
      <router-view class="q-mt-md" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import NavigationLinks from 'components/router/NavigationLinks.vue'
import { computed } from 'vue'
import 'overlayscrollbars/overlayscrollbars.css'
import { useOverlayScrollbars } from 'overlayscrollbars-vue'
import { onMounted } from 'vue'


// eslint-disable-next-line no-unused-vars
const [initBodyOverlayScrollbars] =
  useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        theme: 'os-theme-dark',
        autoHide: 'never'
      },
    },
  })

onMounted(() => initBodyOverlayScrollbars(document.body))

const authStore = useAuthStore()
const username = computed(() => authStore.user.name)
const stripe = computed(() => authStore.stripe)
const logout = () => {
  authStore.logout()
}
</script>

<style lang="scss">
.q-drawer.q-drawer--left {
  top: 50px !important;
  z-index: $z-top;
}

.user-btn {
  padding: 11px 20px;

  .q-btn__content {
    color: white;
  }
}
</style>
