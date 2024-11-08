import{$ as w,r as c,H as x,D as B,o as _,a as l,c as b,b as t,d as o,n as D,m as $,s as N,B as m,i as v,q as M,g as T}from"./index-DIelKkcO.js";import{L as s}from"./localeText-Cw5crWHt.js";const I={class:"peerSettingContainer w-100 h-100 position-absolute top-0 start-0 overflow-y-scroll"},R={class:"container d-flex h-100 w-100"},S={class:"m-auto modal-dialog-centered dashboardModal",style:{width:"700px"}},V={class:"card rounded-3 shadow flex-grow-1 bg-danger-subtle border-danger-subtle",id:"deleteConfigurationContainer"},A={class:"card-header bg-transparent d-flex align-items-center gap-2 border-0 p-4 pb-0"},L={class:"mb-0"},P={class:"card-body px-4 text-muted"},W={class:"mb-0"},q={key:0},z={key:1},E={key:2,class:"d-flex align-items-center gap-2"},G=["placeholder"],H=["disabled"],J={__name:"deleteConfiguration",emits:["backup"],setup(O,{emit:k}){const i=w().params.id,g=c(""),h=x(),p=B(),r=c(!1),y=()=>{clearInterval(p.Peers.RefreshInterval),r.value=!0,M("/api/deleteWireguardConfiguration",{Name:i},n=>{n.status?(h.push("/"),p.newMessage("Server","Configuration deleted","success")):r.value=!1})},u=c(!0),d=c([]),f=()=>{u.value=!0,T("/api/getWireguardConfigurationBackup",{configurationName:i},n=>{d.value=n.data,u.value=!1})};_(()=>{f()});const C=k;return(n,e)=>(l(),b("div",I,[t("div",R,[t("div",S,[t("div",V,[t("div",A,[t("h5",L,[o(s,{t:"Are you sure to delete this configuration?"})]),t("button",{type:"button",class:"btn-close ms-auto",onClick:e[0]||(e[0]=a=>n.$emit("close"))})]),t("div",P,[t("p",W,[o(s,{t:"Once you deleted this configuration:"})]),t("ul",null,[t("li",null,[o(s,{t:"All connected peers will get disconnected"})]),t("li",null,[o(s,{t:"Both configuration file (.conf) and database table related to this configuration will get deleted"})])]),t("div",{class:D(["alert",[u.value?"alert-secondary":d.value.length>0?"alert-success":"alert-danger"]])},[u.value?(l(),b("div",q,[e[5]||(e[5]=t("i",{class:"bi bi-search me-2"},null,-1)),o(s,{t:"Checking backups..."})])):d.value.length>0?(l(),b("div",z,[e[6]||(e[6]=t("i",{class:"bi bi-check-circle-fill me-2"},null,-1)),o(s,{t:"This configuration have "+d.value.length+" backups"},null,8,["t"])])):(l(),b("div",E,[e[9]||(e[9]=t("i",{class:"bi bi-x-circle-fill me-2"},null,-1)),o(s,{t:"This configuration have no backup"}),t("a",{role:"button",onClick:e[1]||(e[1]=a=>C("backup")),class:"ms-auto btn btn-sm btn-primary rounded-3"},[e[7]||(e[7]=t("i",{class:"bi bi-clock-history me-2"},null,-1)),o(s,{t:"Backup"})]),t("a",{role:"button",onClick:e[2]||(e[2]=a=>f()),class:"btn btn-sm btn-primary rounded-3"},e[8]||(e[8]=[t("i",{class:"bi bi-arrow-clockwise"},null,-1)]))]))],2),e[11]||(e[11]=t("hr",null,null,-1)),t("p",null,[o(s,{t:"If you're sure, please type in the configuration name below and click Delete"})]),$(t("input",{class:"form-control rounded-3 mb-3",placeholder:m(i),"onUpdate:modelValue":e[3]||(e[3]=a=>g.value=a),type:"text"},null,8,G),[[N,g.value]]),t("button",{class:"btn btn-danger w-100",onClick:e[4]||(e[4]=a=>y()),disabled:g.value!==m(i)||r.value},[e[10]||(e[10]=t("i",{class:"bi bi-trash-fill me-2 rounded-3"},null,-1)),r.value?(l(),v(s,{key:1,t:"Deleting..."})):(l(),v(s,{key:0,t:"Delete"}))],8,H)])])])])]))}};export{J as default};
