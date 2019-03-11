<template>
  <div id="nav">
    <router-link to="/">Music</router-link>
    <router-link to="/audio">Audio</router-link>
    <router-link to="/video">Video</router-link>
    <router-link to="/chat">Chat</router-link>
  </div>
</template>

<style lang="less" scoped>
#nav {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 175, 118, 0.6);
  border-radius: 3px;
  a {
    display: inline-block;
    flex: 1;
    text-align: center;
    font-size: 0.3rem;
    text-shadow: 0px 0px 3px #f00;
    color: #ffffff;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
