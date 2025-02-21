<script setup lang="ts">
defineEmits(['new-game'])
</script>

<template>
  <div class="game-winner">
    <div class="pokeball">
      <header class="red-part"></header>
      <main class="center">
        <div class="circle-center">
          <div class="circle-center-interior">
            <div class="circle-center-interior"></div>
          </div>
        </div>
      </main>
      <footer class="white-part"></footer>
    </div>
    <h2 class="color-white">Congratulations, you have completed the challenge</h2>
    <button class="btn" @click="$emit('new-game')">New Game</button>
  </div>
</template>

<style scoped>
.game-winner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pokeball {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 50%);
  border-radius: 50%;
  border: 1px solid black;
  margin: 2rem;
}

.red-part {
  position: relative;
  width: 100%;
  height: 45%;
  background-color: red;
  box-sizing: border-box;
  clip-path: ellipse(50% 100% at 50% 100%);
  z-index: 2;
}

.center {
  background-color: black;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-center {
  position: relative;
  width: 40%;
  height: 300%;
  background-color: black;
  border-radius: 50%;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-center-interior {
  background-color: white;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}

.white-part {
  background-color: white;
  width: 100%;
  height: 45%;
  clip-path: ellipse(50% 100% at 50% 0);
}
</style>
