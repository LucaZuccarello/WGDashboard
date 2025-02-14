<script>
import {ref} from "vue";
import {fetchPost} from "@/utilities/fetch.js";
import {NotificationConfigurationsStore} from "@/stores/notificationConfigurationStore"
import {DashboardConfigurationStore} from "@/stores/DashboardConfigurationStore.js";
import NotificationDrodown from "./notificationDrodown.vue";

export default {
	name: "newDestinationComponent",
	components: {NotificationDrodown},
	props: {
		oldDestination: Object
	},
	data(){
		return{
			submitting: false,
		}
	},
	setup(props){
		const store = DashboardConfigurationStore()
		const notifStore = NotificationConfigurationsStore()
		const newDestinationData = (props.oldDestination) ? ref(JSON.parse(JSON.stringify(props.oldDestination))) : ref({service: notifStore.Services[0], tag: notifStore.Tags[0]})
		const sendingData = {}
		
		return {store, newDestinationData, notifStore, sendingData};
	},
	
	methods: {
		submitNewDestination(){
			this.submitting = true;
			this.sendingData = {
				name: this.newDestinationData.service.name,
				Id: this.newDestinationData.service.dataRequired[0].value,
				Token: this.newDestinationData.service.dataRequired[1].value,
				tag: this.newDestinationData.tag.name
			}
			if(this.oldDestination){
				this.sendingData.oldName = this.oldDestination.service.name
				this.sendingData.oldId = this.oldDestination.service.dataRequired[0].value
				this.sendingData.oldToken = this.oldDestination.service.dataRequired[1].value
				this.sendingData.oldTag = this.oldDestination.tag.name
				fetchPost('/api/updateNotificationConfig', this.sendingData, (res) => {
					if (res.status){
						this.$emit('created', res.data);
						this.store.newMessage("Server", "New Destination created", "success");
						this.$emit('close')
					}else{
						this.store.newMessage("Server", res.message, "danger")
					}
					this.submitting = false;
				})
			}
			else{
				fetchPost('/api/addNotificationConfig', this.sendingData, (res) => {
					if (res.status){
						this.$emit('created', res.data);
						this.store.newMessage("Server", "New Destination created", "success");
						this.$emit('close')
					}else{
						this.store.newMessage("Server", res.message, "danger")
					}
					this.submitting = false;
				})
			}
		},
	},
}
</script>

<template>
	<div class="position-absolute w-100 h-100 top-0 start-0 rounded-bottom-3 p-3 d-flex"
	     style="background-color: #00000060; backdrop-filter: blur(3px)">
		<div class="card m-auto rounded-3 mt-5">
			<div class="card-header bg-transparent d-flex align-items-center gap-2 border-0 p-4 pb-0">
				<h6 class="mb-0">{{(!this.oldDestination)? "Add your new Destination..." : "Change your Destination..."}}</h6>
				<button type="button" class="btn-close ms-auto" @click="this.$emit('close')"></button>
			</div>
			<div class="card-body d-flex gap-2 p-4 flex-column">
				<div class="d-flex gap-2 align-items-center mb-2">
					<div class="card-body flex-column d-flex align-items-center" style="margin: auto;">
						<samp class="gap-2 d-flex">
							Service: 
						</samp>
						<NotificationDrodown
							:options="this.notifStore.Services"
							:data="newDestinationData.service"
							@update="(value) => {newDestinationData.service = value}"
						></NotificationDrodown>
					</div>
					<div class="card-body flex-column d-flex align-items-center " v-for="x in newDestinationData.service.dataRequired" style="margin: auto;">
						<samp class="gap-2 d-flex">
							{{ x.display }}: 
						</samp>
						<input class="form-control form-control-sm form-control-dark rounded-3 flex-grow-1" 
							v-model="x.value"
							style="width: auto">
					</div>
					<div class="card-body flex-column d-flex align-items-center" style="margin: auto;">
						<samp class="gap-2 d-flex">
							Tag: 
						</samp> 
						<NotificationDrodown
							:options="this.notifStore.Tags"
							:data="newDestinationData.tag"
							@update="(value) => {newDestinationData.tag = value}"
						></NotificationDrodown>	
					</div>
				</div>
				<button class="ms-auto btn bg-success-subtle text-success-emphasis border-1 border-success-subtle rounded-3 shadow-sm"
					:class="{disabled: this.submitting}"
						@click="this.submitNewDestination()"
				>
					<i class="bi bi-check-lg me-2" v-if="!this.submitting"></i>
					{{this.submitting ? 'Creating...':'Done'}}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.btn.disabled{
	opacity: 1;
	background-color: rgba(13, 110, 253, 0.09);
	border-color: transparent;
}
</style>