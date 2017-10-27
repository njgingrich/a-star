<template>
  <v-toolbar app dark color="primary">
    <v-toolbar-side-icon @click.stop="click()"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
  </v-toolbar>
</template>
<script>
export default {
  props: {
    title: String,
    click: Function
  }
}
</script>
