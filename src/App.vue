<template>
	<div class="main">
		<app-navbar class="app-navbar"></app-navbar>
		<h1 class="app-header text-center">CSV Manipulator</h1>
		<router-view class="app-content"></router-view>
		<app-footer class="app-footer"></app-footer>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/shared/TheNavbar.vue";
import Footer from "./components/shared/TheFooter.vue";

export default {
	name: "app",
	components: {
		"app-navbar": Navbar,
		"app-footer": Footer
	}
};
</script>

<style>
.main {
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-areas:
		"n n n"
		"h h h"
		"m m m"
		"f f f";
	grid-template-rows: auto auto 3fr auto;
}
.app-navbar {
	grid-area: n;
	justify-self: stretch;
}
.app-header {
	grid-area: h;
}
.app-content {
	grid-area: m;
	align-self: center;
}
.app-footer {
	grid-area: f;
}
</style>
