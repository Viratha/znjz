<template>
  <div>
    <div class="vote">
      {{ title }}
    </div>
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
    width: 100%;
    min-width: 100px;
    min-height: 100px;
    margin:100px 50px;
    text-align: center;
    line-height: 100px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .vote:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    bottom: 5px;
  }
</style>
