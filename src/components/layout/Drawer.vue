<template>
  <v-navigation-drawer
    persistent
    v-model="isOpen"
    clipped
    disable-route-watcher
    enable-resize-watcher
    app>
    <div class="pt-4 pr-4 pb-4 pl-4">
      <slot></slot>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: Boolean,
    toggle: Function
  },
  computed: {
    isOpen: {
      get () {
        return this.drawer
      },
      set () {
        // this.toggle()
      }
    }
  }
}
</script>

