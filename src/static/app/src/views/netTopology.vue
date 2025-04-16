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
            nodes : {
                node0: { name: "Server", status: 'stopped', showText: false},
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
            /*eventHandlers: {
                "node:contextmenu": this.showNodeContextMenu,
            },*/
            configs : vNG.defineConfigs({
                view: {
                    layoutHandler: new ForceLayout({
                        positionFixedByDrag: false,
                        createSimulation: (d3, nodes, edges) => {
                            const forceLink = d3.forceLink(edges).id(d => d.id)
                            return d3
                                .forceSimulation(nodes)
                                .force("edge", forceLink.distance(60).strength(0.5))
                                .force("charge", d3.forceManyBody().strength(-800))
                                .alphaMin(0.001)
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
                    marker: {
                        target: {
                            type: "arrow",
                            width: 4,
                            height: 4,
                            margin: -1,
                            offset: 0,
                            units: "strokeWidth",
                            color: null,
                        },
                    }
                },
                node: {
                    normal: {
                        radius: 20,
                        color: "#6013ad",
                        strokeWidth: 2,
                        strokeColor: n => (this.getColor(n))
                    },
                    hover: {
                        color: "#430d78"
                    },
                    label: {
                        visible: true,
                        fontFamily: 'Arial',
                        fontSize: 14,
                        color: "white",
                        direction: "south",
                        directionAutoAdjustment: true,
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
            this.nodes['node0'].status = (this.configurationInfo.Status ? 'running' : 'stopped')
            this.configurationPeers.forEach((x) => {
                const nodeId = `node${this.counter}`
                const edgeId = `edge${this.counter}`
                this.nodes[nodeId] = {name: x.name, status: (x.restricted ? 'restricted' : x.status ), showText: false}
                this.edges[edgeId] = {source: "node0", target: nodeId }
                this.counter++
            })
        },

        getColor(n){
            if (n.status === 'restricted'){
                return '#ffd700'
            }
            else
                return (n.status === 'running' ? "#008000" : "#ff0000")
        },
        /*
        showNodeContextMenu(params) {
            const { node, event } = params
            // Disable browser's default context menu
            event.stopPropagation()
            event.preventDefault()
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
        },
*/
        showText(nodeId){
            this.nodes[nodeId].showText = true
        },

        hideText(nodeId){
            this.nodes[nodeId].showText = false
        },

        getTextWidth(text, fontSize, fontFamily) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            context.font = `${fontSize}px ${fontFamily}`;
            const width = context.measureText(text).width;
            return width;
        },


        getTranslateX(x, text, fontSize, fontFamily){
            if(x == 0){
                return 0
            }
            else if(x < 0){
                return x - (this.getTextWidth(text, fontSize, fontFamily)) / 2
            }
            else{
                return x + (this.getTextWidth(text, fontSize, fontFamily)) / 2
            }
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
                    node0: { name: "Server", status: 'stopped', showText: false},
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
                
            > 
                <!-- :event-handlers="this.eventHandlers" -->
                <template
                    #override-node-label="{
                        nodeId, scale, text, x, y, config, textAnchor, dominantBaseline
                    }"
                    >
                    <foreignObject 
                        v-show="this.nodes[nodeId].showText"
                        :x="x * scale - (this.getTextWidth(text, config.fontSize * scale, config.fontFamily) + 20) / 2" 
                        :y="y * scale - (config.fontSize * scale + 20 )/ 2" 
                        :width="this.getTextWidth(text, config.fontSize * scale, config.fontFamily) + 20" 
                        :height="config.fontSize * scale + 20" 
                        :transform="`translate(${this.getTranslateX(x, text, config.fontSize * scale, config.fontFamily)} ${y})`"
                    >
                        <div 
                            xmlns="http://www.w3.org/1999/xhtml"
                            :style="{
                            fontSize: config.fontSize * scale + 'px', 
                            fontFamily: config.fontFamily,
                            textAlign: 'center',
                            color: config.color, 
                            backgroundColor: 'black',
                            padding: '5px', 
                            borderRadius: '5px',
                            whiteSpace: 'nowrap'}"
                        >
                            {{ text }}
                        </div>
                    </foreignObject>
                    
                </template>

                <template #override-node="{ nodeId, scale, config, ...slotProps}">
                    <svg 
                        v-if="this.nodes[nodeId].name === 'Server'" 
                        class="server"
                        xmlns="http://www.w3.org/2000/svg"
                        :x="-config.radius * scale"
                        :y="-config.radius * scale"
                        :width="config.radius * scale * 2" 
                        :height="config.radius * scale * 2"  
                        :fill="'#ffffff'" 
                        viewBox="-5 -5 26 26"
                        @mouseenter="() => {
                            this.showText(nodeId)
                        }"
                        @mouseleave="() => {
                            this.hideText(nodeId)
                        }"
                    >
                        <circle 
                            cx="8" 
                            cy="8" 
                            r="12"
                            :fill="config.color" 
                            v-bind="slotProps" 
                            :stroke-width="config.strokeWidth" 
                            :stroke="config.strokeColor"
                        />
                        <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4z"/>
                        <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.5 6.5 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8s-3.809-.317-5.208-.876a6.5 6.5 0 0 1-1.458-.79z"/>
                        <path d="M14.667 11.668a6.5 6.5 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.5 6.5 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667z"/>   
                        <title>{{ this.nodes[nodeId].name}}</title>
                    </svg>
                    <svg 
                        v-else 
                        class="host" 
                        xmlns="http://www.w3.org/2000/svg"
                        :x="-config.radius * scale"
                        :y="-config.radius * scale"
                        :width="config.radius * scale * 2" 
                        :height="config.radius * scale * 2"  
                        :fill="'#ffffff'" 
                        viewBox="-5 -5 26 26"
                        @mouseenter="() => {
                            this.showText(nodeId)
                        }"
                        @mouseleave="() => {
                            this.hideText(nodeId)
                        }"
                    >
                        <circle 
                            cx="8" 
                            cy="8" 
                            r="12"
                            :fill="config.color" 
                            v-bind="slotProps" 
                            :stroke-width="config.strokeWidth" 
                            :stroke="config.strokeColor"
                        />
                        <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z"/>
                        <title>{{ this.nodes[nodeId].name}}</title>
                    </svg>
                </template>
            </v-network-graph>
            <!-- <div ref="nodeMenu" class="context-menu">
                Menu for the nodes
                <div>{{ menuTargetNode }}</div>
            </div> -->
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
    color: black;
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