import{_ as h,W as y,D as p,f as w,G as M,o as n,c as l,a as t,b as s,w as i,F as x,r as C,n as v,d as g,t as b,e as u,g as f,T as $,h as N,i as T,S as D}from"./index.js";import{L}from"./localeText.js";import{M as G}from"./message.js";import"./dayjs.min.js";const V={name:"navbar",components:{LocaleText:L},setup(){const o=y(),e=p();return{wireguardConfigurationsStore:o,dashboardConfigurationStore:e}},data(){return{updateAvailable:!1,updateMessage:"Checking for update...",updateUrl:""}},mounted(){w("/api/getDashboardUpdate",{},o=>{o.status?(o.data&&(this.updateAvailable=!0,this.updateUrl=o.data),this.updateMessage=o.message):(this.updateMessage=M("Failed to check available update"),console.log(`Failed to get update: ${o.message}`))})}},B=["data-bs-theme"],W={id:"sidebarMenu",class:"bg-body-tertiary sidebar border h-100 rounded-3 shadow overflow-y-scroll"},F={class:"sidebar-sticky"},R={class:"nav flex-column px-2"},U={class:"nav-item"},z={class:"nav-item"},A={class:"nav-item"},H={class:"nav-link rounded-3",target:"_blank",href:"https://donaldzou.github.io/WGDashboard-Documentation/user-guides.html"},I={class:"sidebar-heading px-3 mt-4 mb-1 text-muted text-center"},O={class:"nav flex-column px-2"},q={class:"nav-item"},E={class:"sidebar-heading px-3 mt-4 mb-1 text-muted text-center"},P={class:"nav flex-column px-2"},j={class:"nav-item"},J={class:"nav-item"},K={class:"nav flex-column px-2 mb-3"},Q={class:"nav-item"},X={class:"nav-item",style:{"font-size":"0.8rem"}},Y=["href"],Z={class:"nav-link text-muted rounded-3"},tt={key:1,class:"nav-link text-muted rounded-3"};function et(o,e,k,c,S,_){const a=u("LocaleText"),r=u("RouterLink");return n(),l("div",{class:v(["col-md-3 col-lg-2 d-md-block p-2 navbar-container",{active:this.dashboardConfigurationStore.ShowNavBar}]),"data-bs-theme":c.dashboardConfigurationStore.Configuration.Server.dashboard_theme},[t("nav",W,[t("div",F,[e[8]||(e[8]=t("h5",{class:"text-white text-center m-0 py-3 mb-3 btn-brand"},"WGDashboard",-1)),t("ul",R,[t("li",U,[s(r,{class:"nav-link rounded-3",to:"/","exact-active-class":"active"},{default:i(()=>[e[1]||(e[1]=t("i",{class:"bi bi-house me-2"},null,-1)),s(a,{t:"Home"})]),_:1})]),t("li",z,[s(r,{class:"nav-link rounded-3",to:"/settings","exact-active-class":"active"},{default:i(()=>[e[2]||(e[2]=t("i",{class:"bi bi-gear me-2"},null,-1)),s(a,{t:"Settings"})]),_:1})]),t("li",A,[t("a",H,[e[3]||(e[3]=t("i",{class:"bi bi-question-circle me-2"},null,-1)),s(a,{t:"Help"})])])]),e[9]||(e[9]=t("hr",{class:"text-body"},null,-1)),t("h6",I,[e[4]||(e[4]=t("i",{class:"bi bi-body-text me-2"},null,-1)),s(a,{t:"WireGuard Configurations"})]),t("ul",O,[(n(!0),l(x,null,C(this.wireguardConfigurationsStore.Configurations,d=>(n(),l("li",q,[s(r,{to:"/configuration/"+d.Name+"/peers",class:"nav-link nav-conf-link rounded-3","active-class":"active"},{default:i(()=>[t("span",{class:v(["dot me-2",{active:d.Status}])},null,2),g(" "+b(d.Name),1)]),_:2},1032,["to"])]))),256))]),e[10]||(e[10]=t("hr",{class:"text-body"},null,-1)),t("h6",E,[e[5]||(e[5]=t("i",{class:"bi bi-tools me-2"},null,-1)),s(a,{t:"Tools"})]),t("ul",P,[t("li",j,[s(r,{to:"/ping",class:"nav-link rounded-3","active-class":"active"},{default:i(()=>[s(a,{t:"Ping"})]),_:1})]),t("li",J,[s(r,{to:"/traceroute",class:"nav-link rounded-3","active-class":"active"},{default:i(()=>[s(a,{t:"Traceroute"})]),_:1})])]),e[11]||(e[11]=t("hr",{class:"text-body"},null,-1)),t("ul",K,[t("li",Q,[t("a",{class:"nav-link text-danger rounded-3",onClick:e[0]||(e[0]=d=>this.dashboardConfigurationStore.signOut()),role:"button",style:{"font-weight":"bold"}},[e[6]||(e[6]=t("i",{class:"bi bi-box-arrow-left me-2"},null,-1)),s(a,{t:"Sign Out"})])]),t("li",X,[this.updateAvailable?(n(),l("a",{key:0,href:this.updateUrl,class:"text-decoration-none rounded-3",target:"_blank"},[t("small",Z,[s(a,{t:this.updateMessage},null,8,["t"]),e[7]||(e[7]=g(" (")),s(a,{t:"Current Version:"}),g(" "+b(c.dashboardConfigurationStore.Configuration.Server.version)+") ",1)])],8,Y)):(n(),l("small",tt,[s(a,{t:this.updateMessage},null,8,["t"]),g(" ("+b(c.dashboardConfigurationStore.Configuration.Server.version)+") ",1)]))])])])])],10,B)}const st=h(V,[["render",et],["__scopeId","data-v-461d2bae"]]),at={name:"index",components:{Message:G,Navbar:st},async setup(){return{dashboardConfigurationStore:p()}},computed:{getMessages(){return this.dashboardConfigurationStore.Messages.filter(o=>o.show)}}},ot=["data-bs-theme"],nt={class:"row h-100"},it={class:"col-md-9 col-lg-10 overflow-y-scroll mb-0 pt-2"},rt={class:"messageCentre text-body position-fixed d-flex"};function lt(o,e,k,c,S,_){const a=u("Navbar"),r=u("RouterView"),d=u("Message");return n(),l("div",{class:"container-fluid flex-grow-1 main","data-bs-theme":this.dashboardConfigurationStore.Configuration.Server.dashboard_theme},[t("div",nt,[s(a),t("main",it,[(n(),f(D,null,{default:i(()=>[s(r,null,{default:i(({Component:m})=>[s(N,{name:"fade2",mode:"out-in",appear:""},{default:i(()=>[(n(),f(T(m)))]),_:2},1024)]),_:1})]),_:1})),t("div",rt,[s($,{name:"message",tag:"div",class:"position-relative flex-sm-grow-0 flex-grow-1 d-flex align-items-end ms-sm-auto flex-column gap-2"},{default:i(()=>[(n(!0),l(x,null,C(_.getMessages.slice().reverse(),m=>(n(),f(d,{message:m,key:m.id},null,8,["message"]))),128))]),_:1})])])])],8,ot)}const gt=h(at,[["render",lt],["__scopeId","data-v-ce114a8b"]]);export{gt as default};
