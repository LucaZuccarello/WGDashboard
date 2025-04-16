<script>
import {DashboardConfigurationStore} from "@/stores/DashboardConfigurationStore.js";
import {fetchGet, fetchPost} from "@/utilities/fetch.js";
import NewDestinationComponent from "./dashboardNotificationComponents/newDestinationComponent.vue";
import DestinationComponent from "./dashboardNotificationComponents/destinationComponent.vue";
import { NotificationConfigurationsStore } from "@/stores/notificationConfigurationStore";

export default {
	name: "dashboardNotificationSetup",
	components: {DestinationComponent, NewDestinationComponent},
	setup(){
		const store = DashboardConfigurationStore();
		const notifStore = NotificationConfigurationsStore();
		const oldDestinationData = {
			service: notifStore.Services[0],
			tag: notifStore.Tags[0]
		}
		return {store, notifStore, oldDestinationData};
	},
	data(){
		return {
			value: this.store.Configuration.Server.dashboard_notification,
			newDestination: false,
			updateDestination: false,
			destinationsConfigs: [],
			timers: ["None","Every 30 minutes", "Every hour", "Every 3 hours", "Every day", "Every 3 days", "Every week", "Every mouth"],
			currentSelection : "None"
		}
	},
	methods: {
		getNotificationConfig(){
			fetchGet("/api/getAllNotificationConfig", {}, (res) => {
				if (res.status){
					this.destinationsConfigs = res.data
					console.log(this.destinationsConfigs)
				}
				else{
					this.store.newMessage("Server", res.message, "danger")
				}
			})
		},
		async toggleDashboardNotificationSystem(){
			await fetchPost("/api/updateDashboardConfigurationItem", {
				section: "Server",
				key: "dashboard_notification",
				value: this.value
			}, (res) => {
				if (res.status){
					this.store.newMessage("Server", 
						`Notification System is successfully ${this.value ? 'enabled':'disabled'}`, "success")
				}else{
					this.store.newMessage("Server",
						`Notification System is failed ${this.value ? 'enabled':'disabled'}`, "danger")
				}
			})
		},
		updateOldDestination(data){
			this.oldDestinationData.service = this.notifStore.Services.find(x => x.name === data.name),
			this.oldDestinationData.tag = this.notifStore.Tags.find(x => x.name === data.tag)
			this.oldDestinationData.service.dataRequired[0].value = data.Id
			this.oldDestinationData.service.dataRequired[1].value = data.Token
			this.updateDestination = true
		},

		newTimer(x){
			this.currentSelection = x
		}
	},
	async mounted(){
		await this.getNotificationConfig()
	}
}
</script>

<template>
	<div class="accordion" id="NotificationAccordion" >
		<div class="card mb-4 shadow rounded-3">
			<div class="card-header d-flex">
				<div class="accordion-header" style="width: 75%;">
					<button class="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#NotificationAccordionCollapse">
						Notification Settings
					</button>
				</div>
				<div class="dropdown" style="margin: auto;">
					<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						Report Timer
					</button>
					<ul class="dropdown-menu rounded-3 shadow" style="font-size: 0.875rem; width: 200px">
						<li v-for="x in this.timers">
							<a class="dropdown-item d-flex align-items-center" role="button" @click="this.newTimer(x)">
								<samp>{{x}}</samp>
								<i class="bi bi-check ms-auto" v-if="x === this.currentSelection"></i>
							</a>
						</li>
					</ul>	
				</div>
				<h5 class="form-check form-switch align-items-center ms-auto" style="margin: auto;">
					<input class="form-check-input" type="checkbox"
						v-model="this.value"
						@change="this.toggleDashboardNotificationSystem()"
						role="switch" id="allowNotificationSwitch">
					<label class="form-check-label" for="allowNotificationSwitch" style="font-size: 1.20em;">
						{{this.value ? 'Enabled':'Disabled'}}
					</label>
				</h5>
				
			</div>
			<div id="NotificationAccordionCollapse" 
				class="accordion-collapse collapse" data-bs-parent="#NotificationAccordion">
				<div class="card-body position-relative d-flex flex-column gap-2">
					<button class="ms-auto btn bg-primary-subtle text-primary-emphasis border-1 border-primary-subtle rounded-3 shadow-sm"
						@click="this.newDestination = true">
						<i class="bi bi-send-plus me-2"></i> Add
					</button>
					<div class="card" style="height: 300px" v-if="this.destinationsConfigs.length === 0">
						<div class="card-body d-flex text-muted">
								<span class="m-auto">
									No Destination
								</span>
						</div>
					</div>
					<div class="d-flex flex-column gap-2 position-relative" v-else style="min-height: 300px">
						<TransitionGroup name="Destination">
							<DestinationComponent v-for="dest in this.destinationsConfigs" 
											:destinationConfig = dest
											@deleted="(data) => this.destinationsConfigs = data"
											@update="(data) => this.updateOldDestination(data)">
							</DestinationComponent>
						</TransitionGroup>
					</div>
					<Transition name="addNewDestination">
						<NewDestinationComponent v-if="this.newDestination"
							:oldDestination = undefined
							@created="(data) => this.destinationsConfigs = data"
							@close="this.newDestination = false"
						></NewDestinationComponent>
					</Transition>
					<Transition name="updateOldDestination">
						<NewDestinationComponent v-if="this.updateDestination"
							:oldDestination = oldDestinationData
							@created="(data) => this.destinationsConfigs = data"
							@close="this.updateDestination = false"
						></NewDestinationComponent>
					</Transition>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>