<template>
  <div class="hello">{{msg}}</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  color: brown;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
}
</style>
