<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <router-link :to="{name: 'hi1', params: {name:'xxx'}}">hi-1</router-link>
    <span style="display:inline-block; width: 50px"></span>
    <router-link to="/hi/hi2">hi-2</router-link>
    <span style="display:inline-block; width: 50px"></span>
    <router-link to= "/abc">404</router-link>
    <div>
      {{$route.query.name}}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "hi",
  data() {
    return {
      msg: "Hi, I am wn",
    }
  },
 
  beforeRouteEnter: (to, from, next) => {
    console.log('zhunbeijinru')
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    console.log('zhunbeilikai')
    next()
  },
};
</script>

<style>
</style>