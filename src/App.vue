<script setup lang="ts">
import LoadingScreen from './components/LoadingScreen.vue';
import CanvasLayer from './components/CanvasLayer.vue';
import HeaderNav from './components/HeaderNav.vue';
import SectionHero from './components/SectionHero.vue';
import SectionMapVideo from './components/SectionMapVideo.vue';
import SectionCulture from './components/SectionCulture.vue';
import SectionJourneyIntro from './components/SectionJourneyIntro.vue';
import SectionMoonExplore from './components/SectionMoonExplore.vue';
import { useHeaderInteractions } from './composables/useHeaderInteractions';
import { useLenisScroll } from './composables/useLenisScroll';
import { useMoonScenes } from './composables/useMoonScenes';
import { useScrollAnimations } from './composables/useScrollAnimations';

useLenisScroll();
useMoonScenes();
useHeaderInteractions();
useScrollAnimations();
</script>

<template>
  <LoadingScreen />
  <div class="turning-screen"></div>
  <CanvasLayer />
  <HeaderNav />
  <SectionHero />
  <SectionMapVideo />
  <SectionCulture />
  <SectionJourneyIntro />
  <SectionMoonExplore />
  <audio src="/audio-video/silent.mp3" class="silent-audio"></audio>
</template>
