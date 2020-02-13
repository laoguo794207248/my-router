<template>
  <div class="hello">
    <h1>this is About page</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
