<template>
  <div class="spinner lds-dual-ring"></div>
</template>

<style scoped lang="scss">

$size: 10px;

.lds-dual-ring {
  display: inline-block;
  width: $size;
  height: $size;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: $size;
  height: $size;
  border-radius: 50%;
  border: 8px solid $primary;
  border-color: $primary transparent $primary transparent;
  animation: lds-dual-ring 1.2s linear infinite;
  box-sizing: border-box;
}
@keyframes lds-dual-ring {
  0% {
    transform: translateY(-20%) rotate(0deg);
  }
  100% {
    transform: translateY(-20%) rotate(360deg);
  }
}

</style>