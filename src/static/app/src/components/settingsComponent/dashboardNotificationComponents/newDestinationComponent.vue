<script>
import {ref} from "vue";
import dayjs from "dayjs";
import {fetchPost} from "@/utilities/fetch.js";
import {NotificationConfigurationsStore} from "@/stores/notificationConfigurationStore"
import {DashboardConfigurationStore} from "@/stores/DashboardConfigurationStore.js";
import VueDatePicker from "@vuepic/vue-datepicker";
import NotificationDrodown from "./notificationDrodown.vue";

export default {
	name: "newDestinationComponent",
	components: {VueDatePicker, NotificationDrodown},
	data(){
		return{
			newKeyData:{
				ExpiredAt: dayjs().add(7, 'd').format("YYYY-MM-DD HH:mm:ss"),
				neverExpire: false
			},
			submitting: false,
			edit: false,
			warningText: "L'URL deve essere della forma 'discord://webhook_id/webhook_token' oppure 'discord://avatar@webhook_id/webhook_token'"
		}
	},
	setup(){
		const tags = ['info','error','debug']
        const notificationService = ['Discord','Telegram','Slack']
		const serviceSelected = ref(notificationService[0])
		const tagSelected = ref(tags[0])
		const store = DashboardConfigurationStore();
		return {store, serviceSelected, tagSelected, tags, notificationService};
	},
	mounted() {
		console.log(this.newKeyData.ExpiredAt)
	},
	
	methods: {
		submitNewAPIKey(){
			this.submitting = true;
			fetchPost('/api/newDashboardAPIKey', this.newKeyData, (res) => {
				if (res.status){
					this.$emit('created', res.data);
					this.store.newMessage("Server", "New API Key created", "success");
					this.$emit('close')
				}else{
					this.store.newMessage("Server", res.message, "danger")
				}
				this.submitting = false;
			})
		},
		fixDate(date){
			console.log(dayjs(date).format("YYYY-MM-DDTHH:mm:ss"))
			return dayjs(date).format("YYYY-MM-DDTHH:mm:ss")
		},
		parseTime(modelData){
			if(modelData){
				this.newKeyData.ExpiredAt = dayjs(modelData).format("YYYY-MM-DD HH:mm:ss");
			}else{
				this.newKeyData.ExpiredAt = undefined
			}
		}
	},
}
</script>

<template>
	<div class="position-absolute w-100 h-100 top-0 start-0 rounded-bottom-3 p-3 d-flex"
	     style="background-color: #00000060; backdrop-filter: blur(3px)">
		<div class="card m-auto rounded-3 mt-5">
			<div class="card-header bg-transparent d-flex align-items-center gap-2 border-0 p-4 pb-0">
				<h6 class="mb-0">Add New Destination</h6>
				<button type="button" class="btn-close ms-auto" @click="this.$emit('close')"></button>
			</div>
			<div class="card-body d-flex gap-2 p-4 flex-column">
				<div class="d-flex gap-2 align-items-center mb-2">
					<samp>
						Service: 
					</samp>
					<NotificationDrodown
						:options="this.notificationService"
						:data="serviceSelected"
						@update="(value) => {serviceSelected = value}"
					></NotificationDrodown>
					<samp>
						URL: 
					</samp>
					<input class="form-control form-control-sm form-control-dark rounded-3 flex-grow-1" 
						:disabled="!edit"
						style="width: auto">
					<samp>
						Tag: 
					</samp> 
					<NotificationDrodown
						:options="this.tags"
						:data="tagSelected"
						@update="(value) => {tagSelected = value}"
					></NotificationDrodown>	
				</div>
				<div class="px-2 py-1 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2 d-inline-block mt-1">
					<small><i class="bi bi-exclamation-triangle-fill me-2"></i><span v-html="this.warningText"></span></small>
				</div>
				<button class="ms-auto btn bg-success-subtle text-success-emphasis border-1 border-success-subtle rounded-3 shadow-sm"
					:class="{disabled: this.submitting}"
						@click="this.submitNewAPIKey()"
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