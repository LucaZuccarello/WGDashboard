<script>
export default{
	name: "notificationDropdown",
	props: {
		options: Array,
		data: String
	},
	setup(props, { emit }) {
		if (props.data === ''){
			emit('update', props.options[0])
		}
	},
	computed:{
		currentSelection(){
			return this.options.find(x => x === this.data)
		}
	}
}
</script>

<template>
	<div class="dropdown">
		<button class="btn btn-sm btn-outline-primary rounded-3" 
				type="button" data-bs-toggle="dropdown" aria-expanded="false">
			{{ this.currentSelection }}
		</button>
		<ul class="dropdown-menu rounded-3 shadow" style="font-size: 0.875rem; width: 200px">
			<li v-for="x in this.options">
				<a class="dropdown-item d-flex align-items-center" role="button" @click="$emit('update', x)">
					<samp>{{x}}</samp>
					<i class="bi bi-check ms-auto" v-if="x === this.currentSelection"></i>
				</a>
			</li>
		</ul>
	</div>
</template>

<style scoped>
</style>