<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li class="search-item" v-for="(item, index) in searches" :key="item">
        <span class="text">{{item}}</span>
        <span class="icon-box" @click.stop="deleteOne(index)">
          <i class="iconfont icon-deletorerror"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props:{
    searches:{
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    deleteOne(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search-list 
    .search-item 
      display flex
      align-items center
      height 40px
      overflow hidden
      &.list-enter-active, &.list-leave-active 
        transition all 0.1s
      &.list-enter, &.list-leave-to 
        height 0
      .text 
        flex 1
        color hsla(0,0%,100%,.5)
      .icon-box 
        .iconfont
          font-size 18px
          color hsla(0,0%,100%,.3)
</style>