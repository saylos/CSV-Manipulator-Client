<template>
	<nav class="navbar navbar-expand-lg navbar-dark navbar-3 bg-default">
		<router-link class="navbar-brand" to="/">CSV Manipulator</router-link>
		<!-- Collapse button -->
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent15"
			aria-controls="navbarSupportedContent15"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<!-- Collapsible content -->
		<div class="collapse navbar-collapse" id="navbarSupportedContent15">
			<!-- Links -->
			<ul class="navbar-nav mr-auto">
				<router-link
					class="nav-item"
					to="/"
					tag="li"
					active-class="active"
					exact
					><a class="nav-link">Home</a>
				</router-link>
				<router-link
					class="nav-item"
					to="documentation"
					tag="li"
					active-class="active"
					exact
					><a class="nav-link">Documentation</a>
				</router-link>
				<router-link
					class="nav-item"
					to="contacts"
					tag="li"
					active-class="active"
					exact
					><a class="nav-link">Contacts</a>
				</router-link>
			</ul>
			<!-- Links -->
		</div>
		<!-- Collapsible content -->
	</nav>
</template>

<script lang="ts">
export default {};
</script>

<style>
.navbar.navbar-3 .navbar-toggler-icon {
	background-image: url("https://mdbootstrap.com/img/svg/hamburger1.svg?color=6a1b9a");
}
.bg-default {
	background-color: #2bbbad !important;
}
</style>
