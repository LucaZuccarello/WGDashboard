import{_ as Y,u as S,r as p,$ as R,D as L,x as F,a as r,c as d,b as e,d as a,w as C,e as _,T as B,t as $,f as w,B as P,n as N,q as D,o as T,g as M,F as V,h as H,i as W,k as j}from"./index-BQ9jnFZu.js";import{d as z}from"./dayjs.min-BjPotxO2.js";import{L as n}from"./localeText-BzleuEA0.js";const A={class:"card my-0 rounded-3"},G={class:"card-body position-relative"},I={key:0,class:"position-absolute w-100 h-100 confirmationContainer start-0 top-0 rounded-3 d-flex p-2"},q={class:"m-auto"},E={class:"d-flex gap-2 align-items-center justify-content-center"},J=["disabled"],K=["disabled"],O={key:0,class:"position-absolute w-100 h-100 confirmationContainer start-0 top-0 rounded-3 d-flex p-2"},Q={class:"m-auto"},U={class:"d-flex gap-2 align-items-center justify-content-center"},X=["disabled"],Z=["disabled"],ee={class:"d-flex gap-3"},se={class:"d-flex flex-column"},te={class:"text-muted"},ae={class:"d-flex flex-column"},oe={class:"text-muted"},ne={class:"d-flex gap-2 align-items-center ms-auto"},le={class:"card rounded-3"},ie={key:0,class:"card-body"},re=["value"],de={class:"d-flex"},ue={__name:"backup",props:["b","delay"],emits:["refresh","refreshPeersList"],setup(c,{emit:y}){S(g=>({"6919ade8":h.value}));const u=c,i=p(!1),l=p(!1),k=R(),v=y,b=L(),o=p(!1),t=()=>{o.value=!0,D("/api/deleteWireguardConfigurationBackup",{configurationName:k.params.id,backupFileName:u.b.filename},g=>{o.value=!1,g.status?(v("refresh"),b.newMessage("Server","Backup deleted","success")):b.newMessage("Server","Backup failed to delete","danger")})},m=()=>{o.value=!0,D("/api/restoreWireguardConfigurationBackup",{configurationName:k.params.id,backupFileName:u.b.filename},g=>{o.value=!1,l.value=!1,g.status?(v("refresh"),b.newMessage("Server","Backup restored with "+u.b.filename,"success")):b.newMessage("Server","Backup failed to restore","danger")})},h=F(()=>u.delay+"s"),x=p(!1);return(g,s)=>(r(),d("div",A,[e("div",G,[a(B,{name:"zoomReversed"},{default:C(()=>[i.value?(r(),d("div",I,[e("div",q,[e("h5",null,[a(n,{t:"Are you sure to delete this backup?"})]),e("div",E,[e("button",{class:"btn btn-danger rounded-3",disabled:o.value,onClick:s[0]||(s[0]=f=>t())},[a(n,{t:"Yes"})],8,J),e("button",{onClick:s[1]||(s[1]=f=>i.value=!1),disabled:o.value,class:"btn bg-secondary-subtle text-secondary-emphasis border-secondary-subtle rounded-3"},[a(n,{t:"No"})],8,K)])])])):_("",!0)]),_:1}),a(B,{name:"zoomReversed"},{default:C(()=>[l.value?(r(),d("div",O,[e("div",Q,[e("h5",null,[a(n,{t:"Are you sure to restore this backup?"})]),e("div",U,[e("button",{disabled:o.value,onClick:s[2]||(s[2]=f=>m()),class:"btn btn-success rounded-3"},[a(n,{t:"Yes"})],8,X),e("button",{onClick:s[3]||(s[3]=f=>l.value=!1),disabled:o.value,class:"btn bg-secondary-subtle text-secondary-emphasis border-secondary-subtle rounded-3"},[a(n,{t:"No"})],8,Z)])])])):_("",!0)]),_:1}),e("div",ee,[e("div",se,[e("small",te,[a(n,{t:"Backup"})]),e("samp",null,$(c.b.filename),1)]),e("div",ae,[e("small",oe,[a(n,{t:"Backup Date"})]),w(" "+$(P(z)(c.b.backupDate,"YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss")),1)]),e("div",ne,[e("button",{onClick:s[4]||(s[4]=f=>l.value=!0),class:"btn bg-warning-subtle text-warning-emphasis border-warning-subtle rounded-3 btn-sm"},s[7]||(s[7]=[e("i",{class:"bi bi-clock-history"},null,-1)])),e("button",{onClick:s[5]||(s[5]=f=>i.value=!0),class:"btn bg-danger-subtle text-danger-emphasis border-danger-subtle rounded-3 btn-sm"},s[8]||(s[8]=[e("i",{class:"bi bi-trash-fill"},null,-1)]))])]),s[12]||(s[12]=e("hr",null,null,-1)),e("div",le,[e("a",{role:"button",class:N(["card-header d-flex text-decoration-none align-items-center",{"border-bottom-0":!x.value}]),style:{cursor:"pointer"},onClick:s[6]||(s[6]=f=>x.value=!x.value)},[e("small",null,[s[9]||(s[9]=w(".conf ")),a(n,{t:"File"})]),s[10]||(s[10]=e("i",{class:"bi bi-chevron-down ms-auto"},null,-1))],2),x.value?(r(),d("div",ie,[e("textarea",{class:"form-control rounded-3",value:c.b.content,disabled:"",style:{height:"300px","font-family":"var(--bs-font-monospace),sans-serif !important"}},null,8,re)])):_("",!0)]),s[13]||(s[13]=e("hr",null,null,-1)),e("div",de,[e("span",null,[s[11]||(s[11]=e("i",{class:"bi bi-database me-1"},null,-1)),a(n,{t:"Database File"})]),e("i",{class:N(["bi ms-auto",[c.b.database?"text-success bi-check-circle-fill":"text-danger bi-x-circle-fill"]])},null,2)])])]))}},ce=Y(ue,[["__scopeId","data-v-a575be12"]]),be={class:"peerSettingContainer w-100 h-100 position-absolute top-0 start-0 overflow-y-scroll",ref:"editConfigurationContainer"},me={class:"d-flex h-100 w-100"},fe={class:"modal-dialog-centered dashboardModal w-100 h-100 overflow-x-scroll flex-column gap-3 mx-3"},pe={class:"my-5 d-flex gap-3 flex-column position-relative"},ve={class:"title"},ge={class:"d-flex mb-3"},ke={class:"mb-0"},xe={class:"position-relative d-flex flex-column gap-3"},_e={class:"text-center title",key:"spinner"},ye={class:"card my-0 rounded-3",key:"noBackups"},he={class:"card-body text-center text-muted"},Ce={__name:"configurationBackupRestore",emits:["close","refreshPeersList"],setup(c,{emit:y}){const u=R(),i=p([]),l=p(!0),k=y;T(()=>{v()});const v=()=>{l.value=!0,M("/api/getWireguardConfigurationBackup",{configurationName:u.params.id},o=>{i.value=o.data,l.value=!1})},b=()=>{M("/api/createWireguardConfigurationBackup",{configurationName:u.params.id},o=>{i.value=o.data,l.value=!1})};return(o,t)=>(r(),d("div",be,[e("div",me,[e("div",fe,[e("div",pe,[e("div",ve,[e("div",ge,[e("h4",ke,[a(n,{t:"Backup & Restore"})]),e("button",{type:"button",class:"btn-close ms-auto",onClick:t[0]||(t[0]=m=>o.$emit("close"))})]),e("button",{onClick:t[1]||(t[1]=m=>b()),class:"btn bg-primary-subtle text-primary-emphasis border-primary-subtle rounded-3 w-100"},[t[4]||(t[4]=e("i",{class:"bi bi-plus-circle-fill me-2"},null,-1)),a(n,{t:"Create Backup"})])]),e("div",xe,[a(j,{name:"list1"},{default:C(()=>[l.value&&i.value.length===0?(r(),d("div",_e,t[5]||(t[5]=[e("div",{class:"spinner-border"},null,-1)]))):!l.value&&i.value.length===0?(r(),d("div",ye,[e("div",he,[t[6]||(t[6]=e("i",{class:"bi bi-x-circle-fill me-2"},null,-1)),a(n,{t:"No backup yet, click the button above to create backup."})])])):_("",!0),(r(!0),d(V,null,H(i.value,m=>(r(),W(ce,{onRefresh:t[2]||(t[2]=h=>v()),onRefreshPeersList:t[3]||(t[3]=h=>k("refreshPeersList")),b:m,key:m.filename},null,8,["b"]))),128))]),_:1})])])])])],512))}},Ne=Y(Ce,[["__scopeId","data-v-1f718118"]]);export{Ne as default};
