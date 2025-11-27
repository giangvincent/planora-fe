import { ref, onUnmounted } from 'vue';

export function useGameLoop(callback: (deltaTime: number) => void) {
  const isRunning = ref(false);
  let lastTime = 0;
  let animationFrameId: number;

  function loop(timestamp: number) {
    if (!isRunning.value) return;

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    callback(deltaTime);

    animationFrameId = requestAnimationFrame(loop);
  }

  function start() {
    if (isRunning.value) return;
    isRunning.value = true;
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(loop);
  }

  function stop() {
    isRunning.value = false;
    cancelAnimationFrame(animationFrameId);
  }

  onUnmounted(() => {
    stop();
  });

  return {
    start,
    stop,
    isRunning,
  };
}
