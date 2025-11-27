<template>
  <div class="absolute top-4 right-4 flex flex-col gap-2">
    <button class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50">
      🗺️ Map
    </button>
    <button class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50">
      🎒 Inventory
    </button>
    <button class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50">
      🏪 Shop
    </button>
  </div>

  <div class="absolute bottom-4 left-4 p-3 bg-black/50 text-white rounded-lg backdrop-blur-sm">
    <p class="text-sm font-bold">Current Zone: Garden</p>
    <p class="text-xs opacity-80">Weather: Sunny</p>
  </div>
</template>
