<template>
  <div class="vote">
    {{ title }}
  </div>
</template>

<script>

export default {
  props: ['title']
}
</script>

<style lang="scss" scoped>
  .vote{
    color: rgb(228, 228, 228);
    font-size: 20px;
    height: 100px;
    width: 200px;
    text-align: center;
    line-height: 100px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .vote:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    bottom: 5px;
  }
</style>
