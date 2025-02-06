<script>
import * as vNG from "v-network-graph"
import {ForceLayout} from "v-network-graph/lib/force-layout"
import {fetchGet} from "@/utilities/fetch.js";
import Peer from "@/components/configurationComponents/peer.vue";

export default {
    name: "netTopology",
    components: {Peer},
    data(){
        return{
            configurationInfo: [],
            configurationPeer: [],
            loading: false,
            nodeMenu: {},
            menuTargetNode: "",
            zoomLevel : 1.5,
            counter: 1,
            layers : {
                badge: "nodes",
            },
            nodes : {
                node0: { name: "Server", active: false, },
            },
            edges : {},
            layouts: {
                nodes: {
                    node0: {
                        x: 0,
                        y: 0,
                        fixed: true,
                    }
                }
            },
            eventHandlers: {
                "node:contextmenu": this.showNodeContextMenu,
            },
            configs : vNG.defineConfigs({
                view: {
                    layoutHandler: new ForceLayout({
                        positionFixedByDrag: false,
                        createSimulation: (d3, nodes, edges) => {
                        // d3-force parameters
                            const forceLink = d3.forceLink(edges).id(d => d.id)
                            return d3
                                .forceSimulation(nodes)
                                .force("edge", forceLink.distance(60).strength(0.5))
                                .force("charge", d3.forceManyBody().strength(-800))
                                //.force("center", d3.forceCenter().strength(0.05))
                                .alphaMin(0.001)
                            // * The following are the default parameters for the simulation.
                            // const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
                            /*return d3
                                .forceSimulation(nodes)
                                .force("edge", forceLink.distance(100))
                                .force("charge", d3.forceManyBody())
                                .force("collide", d3.forceCollide(50).strength(0.2))
                                .force("center", d3.forceCenter().strength(0.05))
                                .alphaMin(0.001)*/
                        }
                    }),
                    scalingObjects: true,
                    minZoomLevel: 0.5,
                    maxZoomLevel: 15,
                },
                edge: {
                    normal: {
                        width: 2,
                        dasharray: "4", 
                        animate: true,
                    },
                },
                node: {
                    normal: {
                        radius: 20,
                        color: "#6013ad",
                        //color: n => (n.name === "Server" ? "#ff0000" : "#6013ad"),
                        strokeWidth: 3,
                        strokeColor: n => (n.active ? "#808000" : "#ff0000")
                    },
                    hover: {
                        color: "#430d78"
                        //color: n => (n.name === "Server" ? "#8b0000" : "#430d78"),
                    },
                    label: {
                        fontSize: 18,
                        color: "#ff0000",
                        directionAutoAdjustment: true,
                        visible: n => (n.name === "Server")
                    }
                },
            })
        }
    },
    methods:{
        getPeers(id = this.$route.params.id){
            fetchGet("/api/getWireguardConfigurationInfo",
                {
                    configurationName: id
                }, (res) => {
                    this.configurationInfo = res.data.configurationInfo;
                    this.configurationPeers = res.data.configurationPeers;
                    this.configurationPeers.forEach(x => {
                        x.restricted = false;
                    })
                    res.data.configurationRestrictedPeers.forEach(x => {
                        x.restricted = true;
                        this.configurationPeers.push(x)
                    })
                    this.populateNodesAndEdges()
                    this.loading = false
                }
            )
        },

        populateNodesAndEdges() {
            this.counter = 1
            this.configurationPeers.forEach((x) => {
                const nodeId = `node${this.counter}`
                const edgeId = `edge${this.counter}`
                this.nodes[nodeId] = {name: x.name, active: true}
                this.edges[edgeId] = {source: "node0", target: nodeId }
                this.counter++
            })
        },

        showNodeContextMenu(params) {
            const { node, event } = params
            // Disable browser's default context menu
            event.stopPropagation()
            event.preventDefault()
                console.log(JSON.stringify(this.$refs.nodeMenu))
                if (this.$refs.nodeMenu) {
                    this.menuTargetNode = this.nodes[node].name ?? ""
                    this.showContextMenu(this.$refs.nodeMenu, event)
                }
        },

        showContextMenu(element, event) {
            element.style.left = event.x + "px";
            element.style.top = event.y + "px";
            element.style.visibility = "visible";

            const handler = (event) => {
                if (!event.target || !element.contains(event.target)) {
                element.style.visibility = "hidden";
                document.removeEventListener("pointerdown", handler, { capture: true });
                }
            };
            
            document.addEventListener("pointerdown", handler, { passive: true, capture: true });
        }

    },
    watch: {
        '$route': {
            immediate: true,
            handler(){
                //clearInterval(this.dashboardConfigurationStore.Peers.RefreshInterval);
                this.loading = true;
                const id = this.$route.params.id;
                this.configurationInfo = [];
                this.configurationPeers = [];
                this.nodes = {
                    node0: { name: "Server", active: false},
                }
                this.edges = {}
                if (id){
                    this.getPeers(id)
                    //this.setPeerInterval();
                }

            }
        }
    }
}
</script>

<template>
    <div class="container" v-if="!this.loading">
        <div class="mb-4">
            <RouterLink to="peers" is="div" class="d-flex align-items-center gap-4 text-decoration-none">
                <h3 class="mb-0 text-body">
                    <i class="bi bi-chevron-left"></i>
                </h3>
                <h3 class="text-body mb-0">Network Graph</h3>
            </RouterLink>
        </div>
        <div class="card mb-4">
            <v-network-graph 
                v-model:zoom-level="this.zoomLevel"
                :nodes="this.nodes" 
                :edges="this.edges" 
                :configs="this.configs" 
                :layouts="this.layouts"
                :layers="this.layers"
                :event-handlers="this.eventHandlers"
            >

                <template #override-node="{ nodeId, scale, config, ...slotProps}">
                    <circle 
                        :r="config.radius * scale" 
                        :fill="config.color" 
                        v-bind="slotProps" 
                        :stroke-width="config.strokeWidth" 
                        :stroke="config.strokeColor"
                    />
                    <!-- <image
                        class="icon"
                        :x="-config.radius * scale + 7"  
                        :y="-config.radius * scale + 7"
                        :width="config.radius * scale * 2 - 15" 
                        :height="config.radius * scale * 2 - 15"
                        :xlink:href="`/static/img/pc.svg`"
                    /> -->
                    <svg 
                        v-if="this.nodes[nodeId].name === 'Server'" 
                        class="server"
                        xmlns="http://www.w3.org/2000/svg"
                        :y="-config.radius * scale + 7" 
                        :x="-config.radius * scale + 7"
                        :width="config.radius * scale * 2 - 15" 
                        :height="config.radius * scale * 2 - 15"  
                        :fill="'#ffffff'" 
                        viewBox="0 0 16 16"
                    >
                        <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4z"/>
                        <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.5 6.5 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8s-3.809-.317-5.208-.876a6.5 6.5 0 0 1-1.458-.79z"/>
                        <path d="M14.667 11.668a6.5 6.5 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.5 6.5 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667z"/>
                    </svg>
                    <svg 
                        v-else 
                        class="host" 
                        xmlns="http://www.w3.org/2000/svg"
                        :y="-config.radius * scale + 7" 
                        :x="-config.radius * scale + 7"
                        :width="config.radius * scale * 2 - 15" 
                        :height="config.radius * scale * 2 - 15"  
                        :fill="'#ffffff'" 
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z"/>
                    </svg>
                    
                </template>
            </v-network-graph>
            <div ref="nodeMenu" class="context-menu">
                Menu for the nodes
                <div>{{ menuTargetNode }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div{
	transition: 0.2s ease-in-out;
}

.card {
    width: 100%;
    height: 76vh;
}

.context-menu {
  width: 180px;
  background-color: #efefef;
  padding: 10px;
  position: fixed;
  visibility: hidden;
  font-size: 12px;
  border: 1px solid #aaa;
  box-shadow: 2px 2px 2px #aaa;
  > div {
    border: 1px dashed #aaa;
    padding: 4px;
    margin-top: 8px;
  }
}
</style>