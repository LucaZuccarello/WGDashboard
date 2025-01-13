<script>
import {fetchPost} from "@/utilities/fetch.js";
import {DashboardConfigurationStore} from "@/stores/DashboardConfigurationStore.js";
import { NotificationConfigurationsStore } from "@/stores/notificationConfigurationStore";

export default {
	name: "destinationComponent",
	props: {
		destinationConfig: Object
	},
	setup(){
		const store = DashboardConfigurationStore()
		const notifStore = NotificationConfigurationsStore()
		return {store, notifStore};
	},
	data(){
		return {
			confirmDelete: false
		}
	},
	methods: {
		deleteNotificationConfig(){
			fetchPost("/api/deleteNotificationConfig", this.destinationConfig, (res) => {
				if (res.status){
					this.$emit('deleted', res.data);
					this.store.newMessage("Server", "Destination deleted", "success");
				}else{
					this.store.newMessage("Server", res.message, "danger")
				}
			})
		},
		currentServiceSelection(){
			return this.notifStore.Services.find(x => x.name === this.destinationConfig.name)
		},
		currentTagSelection(){
			return this.notifStore.Tags.find(x => x.name === this.destinationConfig.tag)
		}
	}
}
</script>

<template>
	<div class="card border-success rounded-3 shadow-sm">
		<div class="card-body d-flex gap-3 align-items-center destination-card-body" v-if="!this.confirmDelete">
			<div class="d-flex align-items-center gap-2" style="min-width: 150px;">
				<small class="text-muted">NAME:</small>
				<span style="word-break: break-all">{{this.currentServiceSelection().display}}</span>
			</div>
			<div class="d-flex align-items-center gap-2" style="max-width: 300px; min-width: 135px;">
				<small class="text-muted">{{ this.currentServiceSelection().dataRequired[0].display }}</small>
				<span style="word-break: break-all">{{this.destinationConfig.Id }}</span>
			</div>
			<div class="d-flex align-items-center gap-2" style="max-width: 700px;">
				<small class="text-muted">{{ this.currentServiceSelection().dataRequired[1].display }}:</small>
				<span style="word-break: break-all">{{this.destinationConfig.Token}}</span>
			</div>
			<div class="d-flex align-items-center gap-2 ms-auto" style="min-width: 100px;">
				<small class="text-muted">TAG:</small>
				<span style="word-break: break-all">{{ this.currentTagSelection().display }}</span>
			</div>
			<a role="button" class="btn btn-sm bg-warning-subtle text-warning-emphasis rounded-3"
			   @click="$emit('update', this.destinationConfig)">
				<i class="bi bi-gear-fill"></i>
			</a>
			<a role="button" class="btn btn-sm bg-danger-subtle text-danger-emphasis rounded-3"
			   @click="this.confirmDelete = true">
				<i class="bi bi-trash-fill"></i>
			</a>
		</div>
		<div v-else class="card-body d-flex gap-3 align-items-center justify-content-end">
			Are you sure to delete this destination?
			<a role="button" class="btn btn-sm bg-success-subtle text-success-emphasis rounded-3"
				@click="this.deleteNotificationConfig()"
			>
				<i class="bi bi-check-lg"></i>
			</a>
			<a role="button" class="btn btn-sm bg-secondary-subtle text-secondary-emphasis rounded-3" 
			   @click="this.confirmDelete = false">
				<i class="bi bi-x-lg"></i>
			</a>
		</div>
	</div>
</template>

<style scoped>
@media screen and (max-width: 992px) {
	.destination-card-body{
		flex-direction: column !important;
		align-items: start !important;
		
		div.ms-auto{
			margin-left: 0 !important;
		}
		
		div{
			width: 100%;
		}
		
		small{
			margin-right: auto;
		}
	}
}
</style>