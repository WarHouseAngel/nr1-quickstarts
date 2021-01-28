(this["webpackJsonpnr-quickstarts-website"]=this["webpackJsonpnr-quickstarts-website"]||[]).push([[0],{21:function(e,t,a){e.exports=a(32)},31:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(19),s=a.n(c),l=a(6),i=a(7),o=a(9),m=a(8),u=a(10),d=a(1),h=a(13),p=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={screenshot:r.props.quickstart.dashboards[Math.floor(Math.random()*r.props.quickstart.dashboards.length)].screenshots[0]},r}return Object(i.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"col-md-3 col-lg-2 col-sm-4"},n.a.createElement("div",{className:"card mb-4 shadow-sm"},n.a.createElement("img",{src:"https://newrelic.github.io/quickstarts/data/"+this.props.quickstart.id+"/dashboards/"+this.state.screenshot,className:"card-img-top",alt:"..."}),n.a.createElement("div",{className:"card-body"},n.a.createElement("h5",{className:"card-title"},n.a.createElement(u.b,{className:"",to:"/view/"+this.props.quickstart.id},this.props.quickstart.name,this.props.quickstart.authors.length>0&&n.a.createElement("span",{className:"d-block"},n.a.createElement("small",{className:"text-muted text-small"},"Created by ",this.props.quickstart.authors.join(", "))))))))}}]),a}(n.a.Component),b=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={search:""},r.setSearch=r.setSearch.bind(Object(h.a)(r)),r.search=r.search.bind(Object(h.a)(r)),r}return Object(i.a)(a,[{key:"setSearch",value:function(e,t){this.setState({search:e.target.value})}},{key:"search",value:function(e){var t=this.state.search.toLowerCase();return!!e.name.toLowerCase().includes(t)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("section",{className:"jumbotron text-center"},n.a.createElement("div",{className:"container"},n.a.createElement("h1",null,"New Relic - Quick start library Preview"),n.a.createElement("p",{className:"lead text-muted"},"Library of curated dashboards & alerts with their dependencies.")),n.a.createElement("div",{className:"container",id:"root"},n.a.createElement("div",{className:"row pt-5"},n.a.createElement("input",{type:"text",className:"form-control",id:"search","aria-describedby":"search",placeholder:"Search for name or technology",value:this.state.search,onChange:this.setSearch})))),n.a.createElement("div",{className:"album bg-light"},n.a.createElement("div",{className:"container-fluid",id:"root"},n.a.createElement("div",{className:"row py-3"},this.props.data.quickstarts.filter(this.search).map((function(e,t){return n.a.createElement(p,{key:e.name,quickstart:e})}))))))}}]),a}(n.a.Component),v=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).modalCallback=void 0,r.state=a.getState(e),r}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return this.state.quickstart?n.a.createElement("div",{className:"container",id:"root"},n.a.createElement("div",{className:"row header"},n.a.createElement("div",{className:"col-8"},n.a.createElement("h1",null,"New Relic Quickstarts")),n.a.createElement("div",{className:"col-4 text-right"},n.a.createElement(u.b,{className:"btn btn-primary",to:"/"},"Back to listing"))),n.a.createElement("div",{className:"row pt-4"},n.a.createElement("div",{className:"col-12 pl-4"},n.a.createElement("h2",{className:"pt-2 pb-4"},this.state.quickstart.name),n.a.createElement("div",{className:"row"},this.state.quickstart.dashboards.map((function(t){return t.screenshots.map((function(a){return n.a.createElement("div",{className:"col-4",key:t.name+a},n.a.createElement("img",{src:"https://newrelic.github.io/quickstarts/data/"+e.state.quickstart.id+"/dashboards/"+a,className:"card-img-top",alt:"..."}))}))}))),n.a.createElement("p",{className:"description mt-4"},this.state.quickstart.description),n.a.createElement("p",null,n.a.createElement("b",null,"Installation: "),"Please follow the ",n.a.createElement("a",{href:"https://github.com/newrelic/quickstarts/blob/main/INSTALLATION.md",rel:"noopener noreferrer",target:"_BLANK"},"instructions here")," to install the Quickstarts Nerdlet into your New Relic account which will allow you to import these dashboards.")))):n.a.createElement("div",{className:"container",id:"root"},n.a.createElement("div",{className:"album py-2"},n.a.createElement("div",{className:"container",id:"root"},n.a.createElement("div",{className:"row py-4"},n.a.createElement("div",{className:"col-8"},n.a.createElement("h2",null,"Quickstart not found")),n.a.createElement("div",{className:"col-4 text-right"},n.a.createElement(u.b,{className:"btn btn-primary",to:"/"},"Back to listing"))))))}}],[{key:"getState",value:function(e){return{quickstart:e.data.quickstarts.find((function(t){return t.id===e.match.params.handle})),path:e.match.path}}},{key:"getDerivedStateFromProps",value:function(e,t){return t.quickstart&&t.quickstart.id===e.match.params.handle?null:a.getState(e)}}]),a}(n.a.Component),E=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return null}}]),a}(n.a.Component),k=Object(d.f)(E),N=(a(31),function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={loading:!0,data:void 0},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://newrelic.github.io/quickstarts/data.json").then((function(e){return e.json()})).then((function(t){e.setState({loading:!1,data:t})}))}},{key:"render",value:function(){var e=this;return this.state.loading?n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 text-center loading"},n.a.createElement("p",null,"Loading ...")))):n.a.createElement(u.a,null,n.a.createElement("main",{role:"main"},n.a.createElement(d.c,null,n.a.createElement(d.a,{path:"/view/:handle",render:function(t){return n.a.createElement(v,Object.assign({data:e.state.data},t))}}),n.a.createElement(d.a,{path:"/",render:function(t){return n.a.createElement(b,Object.assign({data:e.state.data},t))}})),n.a.createElement(k,null)))}}]),a}(n.a.Component));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(N,null)),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.b18cbb63.chunk.js.map