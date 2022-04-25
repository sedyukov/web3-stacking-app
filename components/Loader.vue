<template>
  <transition name="fade">
    <div class="loader">
      <div class="loader__body">
        <div class="loader__anim">
          <div class="lds-dual-ring" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
export default {}
</script>
<style lang="scss" scoped>
.loader {
  padding: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(#000000, .6);
  z-index: 1500;
  align-items: center;
  justify-content: center;
  display: flex;
  &_hider {
    background: #FFFFFF;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__text {
    background: #FAEEEB;
    padding: 1px 8px;
    font-weight: bold;
    font-size: 12px;
    color: #000000;
    border-radius: 5px;
  }
}

.dots {
  padding-right: 10px;
  &:after {
    margin-left: -3px;
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }
}

$dotsColor: #000000;

@keyframes dots {
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: $dotsColor;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 $dotsColor,
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 $dotsColor,
      .5em 0 0 $dotsColor;}}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ffffff;
  border-color: #ffffff transparent #FAEEEB transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
