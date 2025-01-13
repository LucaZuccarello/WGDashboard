<script>
export default{
	name: "notificationDropdown",
	props: {
		options: Array,
		data: Object
	},
	setup(props, { emit }) {
		if (props.data === undefined){
			emit('update', props.options[0])
		}
	},
	computed:{
		currentSelection(){
			return this.options.find(x => x.name === this.data.name)
		}
	}
}
</script>

<template>
	<div class="dropdown">
		<button class="btn btn-sm btn-outline-primary rounded-3" 
				type="button" data-bs-toggle="dropdown" aria-expanded="false">
			{{ this.currentSelection.display }}
		</button>
		<ul class="dropdown-menu rounded-3 shadow" style="font-size: 0.875rem; width: 200px">
			<li v-for="x in this.options">
				<a class="dropdown-item d-flex align-items-center" role="button" @click="$emit('update', x)">
					<samp>{{x.display}}</samp>
					<i class="bi bi-check ms-auto" v-if="x.name === this.currentSelection.name"></i>
				</a>
			</li>
		</ul>
	</div>
</template>

<style scoped>
</style>