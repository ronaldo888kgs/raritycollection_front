(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[11],{1073:function(e,n,t){"use strict";t.r(n);var a,i,r,o,c,l,u,s,d,p,m,f,g,h=t(33),v=t(3),b=t.n(v),w=t(8),_=t(210),x=t(53),k=t(1),j=t.n(k),O=t(941),E=t(29),y=t(938),C=t(939),S=t(920),z=t(1070),D=t(930),M=t.n(D),L=t(32),B=t(933),I=t(953),N=t(926),F=t(928);function P(e){var n=e.image,t=e.name,a=e.slug,i=(e.address,e.description,e.isPresale,e.loading),r=e.className,o=e.size,c=e.discord_url,l=e.external_link,u=e.telegram_url,s=e.mint_date,d=e.reveal,p=e.featured,m=e.blockchain,f=(e.children,Object(k.useState)("")),g=Object(x.a)(f,2),h=g[0],v=g[1],b=Object(k.useState)(""),w=Object(x.a)(b,2),_=w[0],O=w[1],E=Object(k.useState)(),y=Object(x.a)(E,2),C=y[0],D=y[1],L=n,P=Object(k.useState)(L||M.a),R=Object(x.a)(P,2),A=R[0],T=R[1];Object(k.useEffect)((function(){var e=new Date,n=e.getFullYear(),t=e.getMonth()+1,a=e.getDate();if(D(n+"-"+(t<10?"0":"")+t+"-"+a),s==n+"-"+(t<10?"0":"")+t+"-"+a)v(F.b[1]),O(F.b[1]);else if(d==n+"-"+(t<10?"0":"")+t+"-"+a)v(F.b[3]),O(F.b[3]);else{var i=null,r="";""!=s&&(r=(i=new Date(s)).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}));var o=null,c="";""!=d&&(c=(o=new Date(d)).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})),null!=i&&null!=o?i>e&&o>e?i>o?(v(F.b[4]),O(F.b[6]+c)):(v(F.b[2]),O(F.b[5]+r)):i>e?(v(F.b[2]),O(F.b[5]+r)):o>e&&(v(F.b[4]),O(F.b[6]+c)):null!=i?i>e&&(v(F.b[2]),O(F.b[5]+r)):null!=o&&o>e&&(v(F.b[4]),O(F.b[6]+c))}}),[]);var U=function(e,n){"null"!=n&&void 0!=n&&window.open(n,"_blank")};return j.a.createElement(G.Card,{className:"".concat(r," ").concat(o||"")},j.a.createElement(G.TopDiv,null,j.a.createElement(G.Content,null,j.a.createElement("div",null,j.a.createElement(G.LinkDiv,null,j.a.createElement(G.Link,{onClick:function(e){return U(0,c)}},j.a.createElement(I.a,null)),j.a.createElement(G.Link,{onClick:function(e){return U(0,u)}},j.a.createElement(I.c,null)),j.a.createElement(G.Link,{onClick:function(e){return U(0,l)}},j.a.createElement(I.b,null))),j.a.createElement(G.MoreDiv,null,s==C&&j.a.createElement("a",{href:N.a.opensea_collection_info_url+a,target:"_blank"},"Mint one now"))),j.a.createElement("div",null,"yes"==p&&j.a.createElement(G.Featured,null,"Featured"),j.a.createElement(G.Chain,null,m),""!=h&&j.a.createElement(G.Stats,null,h)))),j.a.createElement(G.BottomDiv,null,j.a.createElement(G.BottomContent,null,j.a.createElement("div",null,t),""!=_&&j.a.createElement("div",null,_))),j.a.createElement(G.BoxImage,{className:""===L?"bg-fail":""},j.a.createElement(G.Img,{src:Object(B.a)(A,120),className:A===M.a?"img-fail":"",onError:function(){T(M.a)},alt:t||"not found",hidden:!!i,loading:"lazy"}),j.a.createElement(S.a,{indicator:j.a.createElement(z.a.Avatar,{active:!0,size:64,shape:"circle"}),spinning:!!i})))}var R,A,G={Featured:E.c.span(a||(a=Object(h.a)(["\n    padding: 5px 10px;\n    color: white;\n    border-radius: 5px;\n    background: #924df9;\n    font-size: 13px;\n    font-weight: 400;\n\n    @media (min-width: ",") {\n      font-size: 15px;\n    }\n  "])),(function(e){return e.theme.viewport.desktop})),Chain:E.c.span(i||(i=Object(h.a)(["\n    padding: 5px 10px;\n    color: ",";\n    border-radius: 5px;\n    background: ",";\n    margin-left: 5px;\n    font-size: 13px;\n    font-weight: 400;\n\n    @media (min-width: ",") {\n      font-size: 15px;\n    }\n  "])),(function(e){return e.theme.gray[0]}),(function(e){return e.theme.gray[3]}),(function(e){return e.theme.viewport.desktop})),Stats:E.c.span(r||(r=Object(h.a)(["\n    padding: 5px 10px;\n    color: white;\n    border-radius: 5px;\n    background: #2db34d;\n    margin-left: 5px;\n    font-size: 13px;\n    font-weight: 400;\n\n    @media (min-width: ",") {\n      font-size: 15px;\n    }\n  "])),(function(e){return e.theme.viewport.desktop})),LinkDiv:E.c.div(o||(o=Object(h.a)(["\n    display: inline-block;\n    vertical-align: sub;\n    width: 100% !important;\n    padding-left: 100px;\n\n    @media (min-width: ",") {\n      padding-left: 0;\n      width: 30% !important;\n    }\n  "])),(function(e){return e.theme.viewport.tablet})),MoreDiv:E.c.div(c||(c=Object(h.a)(["\n    width: 100% !important;\n    display: inline-block;\n    text-align: left !important;\n    padding-left: 100px;\n\n    @media (min-width: ",") {\n      padding-left: 0;\n      width: 70% !important;\n    }\n  "])),(function(e){return e.theme.viewport.tablet})),Link:E.c.span(l||(l=Object(h.a)(["\n    align-items: center;\n    margin-right: 15px;\n    font-weight: 600;\n    font-size: 17px;\n    color: ",";\n\n    @media (min-width: ",") {\n      margin-right: 20px;\n      font-size: 20px;\n    }\n  "])),L.a.blue1,(function(e){return e.theme.viewport.desktop})),Card:E.c.div(u||(u=Object(h.a)(["\n    border: 1px solid ",";\n    box-sizing: border-box;\n    height: 202px;\n    border-radius: 20px;\n    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.05);\n    background: ",";\n\n    @media (min-width: ",") {\n      height: 102px;\n    }\n  "])),(function(e){return e.theme.gray[2]}),(function(e){return e.theme.white}),(function(e){return e.theme.viewport.tablet})),TopDiv:E.c.div(s||(s=Object(h.a)(["\n    background: ",";\n    padding: 0 15px;\n    height: 150px;\n    line-height: 45px;\n    border-top-right-radius: 20px;\n    border-top-left-radius: 20px;\n\n    @media (min-width: ",") {\n      padding-left: 100px;\n      line-height: 50px;\n      height: 50px;\n    }\n  "])),(function(e){return e.theme.white}),(function(e){return e.theme.viewport.tablet})),BottomDiv:E.c.div(d||(d=Object(h.a)(["\n    background: ",";\n    padding: 0 15px;\n    height: 50px;\n    line-height: 50px;\n    border-bottom-right-radius: 20px;\n    border-bottom-left-radius: 20px;\n\n    @media (min-width: ",") {\n      padding-left: 100px;\n    }\n  "])),(function(e){return e.theme.gray[0]}),(function(e){return e.theme.viewport.tablet})),BoxImage:E.c.div(p||(p=Object(h.a)(["\n    display: block;\n    align-items: center;\n    margin-top: -190px;\n    width: 80px;\n    margin-left: 10px;\n\n    @media (min-width: ",") {\n      margin-top: -90px;\n    }\n\n    .ant-skeleton {\n      height: 80px;\n      display: flex;\n      align-items: center;\n    }\n  "])),(function(e){return e.theme.viewport.tablet})),Img:E.c.img(m||(m=Object(h.a)(["\n    width: 80px;\n    height: 80px;\n    border-radius: 15px;\n  "]))),Content:E.c.div(f||(f=Object(h.a)(["\n    width: 100%;\n    font-size: 17px;\n    font-weight: 500;\n    color: ",";\n\n    @media (min-width: ",") {\n      display: inline-flex;\n    }\n\n    @media (min-width: ",") {\n      font-size: 20px;\n    }\n\n    div:nth-child(1) {      \n      @media (min-width: ",") {\n        width: 55%;\n      }\n      @media (min-width: ",") {\n        width: 60%;\n      }\n\n      a {\n        font-size: 14px;\n        text-decoration: underline;\n        margin-right: 1rem;\n        color: ",";\n\n        @media (min-width: ",") {\n          font-size: 16px;\n        }\n        @media (min-width: ",") {\n          margin-right: 2rem;\n          font-size: 20px;\n        }\n      }\n    }\n\n    div:nth-child(2) {     \n      @media (min-width: ",") {\n        width: 45%;\n      }\n      @media (min-width: ",") {\n        width: 40%;\n      }\n      text-align: right;\n    }\n  "])),(function(e){return e.theme.gray[4]}),(function(e){return e.theme.viewport.tablet}),(function(e){return e.theme.viewport.desktop}),(function(e){return e.theme.viewport.tablet}),(function(e){return e.theme.viewport.desktop}),(function(e){return e.theme.gray[3]}),(function(e){return e.theme.viewport.tablet}),(function(e){return e.theme.viewport.desktop}),(function(e){return e.theme.viewport.tablet}),(function(e){return e.theme.viewport.desktop})),BottomContent:E.c.div(g||(g=Object(h.a)(["\n    width: 100%;\n    display: inline-flex;\n    font-size: 13px;\n    font-weight: 500;\n    color: ",";\n\n    div:nth-child(1) {\n      width: 50%;\n    }\n    div:nth-child(2) {\n      width: 50%;\n      text-align: right;\n    }\n\n    @media (min-width: ",") {\n      font-size: 17px;\n    }\n    "])),(function(e){return e.theme.gray[4]}),(function(e){return e.theme.viewport.tablet}))},T=t(168),U=t(269),J=t(934);function Y(){var e=Object(k.useState)([]),n=Object(x.a)(e,2),t=n[0],a=n[1],i=Object(k.useState)(0),r=Object(x.a)(i,2),o=r[0],c=r[1],l=Object(k.useState)(!1),u=Object(x.a)(l,2),s=u[0],d=u[1],p=Object(k.useState)(!1),m=Object(x.a)(p,2),f=m[0],g=m[1],h=Object(k.useState)(!0),v=Object(x.a)(h,2),E=v[0],S=v[1],z=j.a.createElement(q.CardsContainer,null,Object(_.a)(Array(T.d)).map((function(){return j.a.createElement(P,{key:"loading-".concat(Math.random()),loading:!0},j.a.createElement(y.a,{loading:!0}))}))),D=Object(k.useCallback)((function(e){a(e)}),[]),M=Object(k.useCallback)((function(e){a(t.concat(e))}),[t,D]);Object(k.useEffect)((function(){(function(){var e=Object(w.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),S(!0),e.next=4,Object(J.a)().getCollections(T.d,0,"","yes");case 4:n=e.sent,D(n),c(n.length),d(!1),n.length<T.d&&S(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[T.d,D]);var L=Object(k.useCallback)(function(){var e=Object(w.a)(b.a.mark((function e(n,t){var a,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),e.next=3,Object(J.a)().getCollections(t||T.d,n||o,"","yes");case 3:(a=e.sent)&&(i=o+a.length,M(a),c(i));case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),[M,o,T.d]);return Object(k.useEffect)((function(){f&&(L(0,100),g(!1))}),[f,L]),j.a.createElement(j.a.Fragment,null,j.a.createElement(U.a,{bgGray:!0},j.a.createElement(q.LatestDiv,null,"\ud83d\udd25 Upcoming Collections "),!s&&!t.length&&j.a.createElement(C.a,null),j.a.createElement(O.a,{next:L,hasMore:E,loader:z,dataLength:t.length},j.a.createElement(q.CardsContainer,null,t.map((function(e){return j.a.createElement(P,{key:"".concat(e.id)+Math.random(),image:String(null===e||void 0===e?void 0:e.image),name:String(null===e||void 0===e?void 0:e.name),slug:String(null===e||void 0===e?void 0:e.slug),address:String(null===e||void 0===e?void 0:e.address),description:String(null===e||void 0===e?void 0:e.description),discord_url:String(null===e||void 0===e?void 0:e.discord),external_link:String(null===e||void 0===e?void 0:e.website),telegram_url:String(null===e||void 0===e?void 0:e.telegram),mint_date:String(null===e||void 0===e?void 0:e.mint_date),reveal:String(null===e||void 0===e?void 0:e.reveal),featured:String(null===e||void 0===e?void 0:e.featured),blockchain:String(null===e||void 0===e?void 0:e.blockchain)})}))))))}t.d(n,"default",(function(){return Y})),t.d(n,"S",(function(){return q}));var q={LatestDiv:E.c.div(R||(R=Object(h.a)(["\n    padding-top: 3rem;\n    font-size: 20px;\n    font-weight: 500;\n    color: ",";\n\n    @media (min-width: ",") {\n      font-size: 30px;\n    }\n  "])),(function(e){return e.theme.black}),(function(e){return e.theme.viewport.tablet})),CardsContainer:E.c.div(A||(A=Object(h.a)(["\n    display: grid;\n    grid-template-columns: repeat(1, 1fr);\n    gap: 1vw;\n    justify-content: flex-start;\n    align-items: flex-start;\n\n    @media (min-width: ",") {\n      margin: 2vw 5rem 0 5rem;\n    }\n\n    > div:last-of-type {\n      margin-bottom: 2vw;\n    }\n  "])),(function(e){return e.theme.viewport.desktop}))}},926:function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));var a={opensea_asset_url:"https://opensea.io/assets/",opensea_collection_info_url:"https://opensea.io/collection/",opensea_collections_url:"https://api.opensea.io/api/v1/collections?",opensea_nft_url:"https://api.opensea.io/api/v1/assets?",opensea_collection_url:"https://api.opensea.io/api/v1/collection/",server_url:"http://raritycollection222.us-3.evennode.com",discord_server:"https://discord.gg/nftrarity",cookie_expire:60,user_login:"/user/login",user_opt_verify:"/user/opt_verify",user_register:"/user/register",user_forgot:"/user/forgot",collection_image:"/images/collection/",collection_image_upload:"/media/",collection_add:"/collection/add",collection_list:"/collection/list",collection_json:"/collection/json",collection_rarity:"/collection/rarity",collection_traits:"/collection/traits"}},927:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"a",(function(){return o}));var a=t(1071),i=t(454),r=function(e){i.b.warning(e)},o=function(e,n){i.b.error(e),n&&(a.a(n),console.error(n))}},928:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return i}));var a={5001:"Request failed"},i={1:"Minting Now",2:"Minting Soon",3:"Revealing",4:"Revealing Soon",5:"Minting on ",6:"Revealing on "}},930:function(e,n,t){e.exports=t.p+"static/media/notfound.106f27a7.svg"},933:function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));t(168);var a=t(926);var i=function(e,n){if(void 0!=e)return e.includes("https://lh3")?e.split("=s")[0]+"=s"+n+"-c":e.includes("/static")?e:a.a.server_url+a.a.collection_image+e}},934:function(e,n,t){"use strict";t.d(n,"a",(function(){return p}));var a=t(3),i=t.n(a),r=t(8),o=t(932),c=t.n(o),l=t(926),u=t(928),s=t(927),d=t(166),p=function(){return{getCollections:function(e){var n=arguments;return Object(r.a)(i.a.mark((function t(){var a,r,o,d,p;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:0,r=n.length>2&&void 0!==n[2]?n[2]:"",o=n.length>3&&void 0!==n[3]?n[3]:"",d=[],p={featured:r,upcoming:o,paginationLimit:e,offset:a},t.next=7,c.a.post(l.a.server_url+l.a.collection_list,p).then((function(e){if(200===e.status){var n=e.data;if(n.status)for(var t=n.data,a=0;a<t.length;a++){var i={id:"",name:"",slug:"",opensea:"",discord:"",telegram:"",website:"",description:"",blockchain:"",address:"",mint_date:"",reveal:"",image:"",upcoming:"",featured:"",discord_tag:"",ticket:""};i.id=t[a]._id,i.name=t[a].name,i.slug=t[a].slug,i.opensea=t[a].opensea,i.discord=t[a].discord,i.telegram=t[a].telegram,i.website=t[a].website,i.description=t[a].description,i.blockchain=t[a].blockchain,i.address=t[a].address,i.mint_date=t[a].mint_date,i.reveal=t[a].reveal_date,i.image=t[a].image,i.featured=t[a].featured,i.upcoming=t[a].upcoming,i.discord_tag=t[a].discord_tag,i.ticket=t[a].ticket,d.push(i)}Object(s.b)(n.message)}})).catch((function(e){Object(s.a)(u.a[5001],e)}));case 7:return t.abrupt("return",d);case 8:case"end":return t.stop()}}),t)})))()},getCollectionInfor:function(e){return Object(r.a)(i.a.mark((function n(){var t,a,r,o,d,p,m,f,g,h,v,b,w,_;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t={},n.next=3,c.a.get(l.a.opensea_collection_url+e);case 3:return a=n.sent,r=a.data,o=r.collection,t.count=o.stats.count,t.floor=Math.round(1e3*o.stats.floor_price)/1e3,t.volume=Math.round(1e3*o.stats.total_volume)/1e3,d=[],p={slug:e},n.next=13,c.a.post(l.a.server_url+l.a.collection_traits,p).then((function(e){if(200===e.status){var n=e.data;n.status&&(d=n.data)}})).catch((function(e){Object(s.a)(u.a[5001],e)}));case 13:for(m=t.count,f=[],g=0;g<d.length;g++){for((h={}).title=d[g].key,h.show=!1,v=d[g].counts,b=[],w=0;w<v.length;w++)(_={}).title=v[w].value,_.value=v[w].count+"("+Math.round(100*v[w].count/m*100)/100+"%)",_.active=!1,b.push(_);h.data=b,h.value=v.length,f.push(h)}return t.traits=f,n.abrupt("return",t);case 18:case"end":return n.stop()}}),n)})))()},getItems:function(e,n,t,a,o,d,p,m,f,g){var h=arguments;return Object(r.a)(i.a.mark((function r(){var v,b,w,_,x,k,j,O,E,y,C,S;return i.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return v=h.length>10&&void 0!==h[10]?h[10]:0,i.prev=1,b=[],w={token_id:t,address:e,slug:n,paginationLimit:f,offset:v,orderDirection:g,filter_button:a,filter_price:o,rarity_min:d,rarity_max:p,filter_traits:m},i.next=6,c.a.post(l.a.server_url+l.a.collection_rarity,w).then((function(e){if(200===e.status){var n=e.data;n.status&&(b=n.data)}})).catch((function(e){Object(s.a)(u.a[5001],e)}));case 6:for(_="",x=0;x<b.length;x++)_=_+"&token_ids="+b[x].token_id;if(""!=_){i.next=10;break}return i.abrupt("return",[]);case 10:return i.next=12,c.a.get(l.a.opensea_nft_url+"asset_contract_address="+e+_);case 12:for(k=i.sent,j=k.data,O=j.assets,E=[],y=0;y<O.length;y++){for((C={id:0,token_id:"",name:"",description:"",token_metadata:"",banner:"",image:"",isPresale:!1,presaleDate:null,traits:[],rarity:0,ranking:0,price:0,collection:{name:"",description:"",image:"",discord:"",telegram:""}}).id=O[y].id,C.token_id=O[y].token_id,C.name=O[y].name?O[y].name:O[y].collection.name,C.description=O[y].description,C.token_metadata=O[y].token_metadata,C.banner=O[y].collection.banner_image_url,C.image=O[y].image_thumbnail_url,C.isPresale=O[y].is_presale,C.presaleDate=O[y].collection.created_date,C.traits=O[y].traits,C.collection.name=O[y].collection.name,C.collection.description=O[y].collection.description,C.collection.address=O[y].asset_contract.address,C.collection.image=O[y].collection.image_url,C.collection.discord=O[y].collection.discord_url,C.collection.telegram=O[y].collection.telegram_url,null!=O[y].sell_orders&&(C.price=O[y].sell_orders[0].current_price/1e18),S=0;S<b.length;S++)b[S].token_id==O[y].token_id&&(C.rarity=Math.round(100*b[S].rarity)/100,C.ranking=b[S].ranking?b[S].ranking:y+1);a.includes("BUY_NOW")||""!=o?C.price>0&&E.push(C):E.push(C)}return E.sort((function(e,n){return e.ranking-n.ranking})),i.abrupt("return",E);case 21:return i.prev=21,i.t0=i.catch(1),i.abrupt("return",[]);case 24:case"end":return i.stop()}}),r,null,[[1,21]])})))()},imageUpload:function(e){return Object(r.a)(i.a.mark((function n(){var t,a;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=!1,"",a=l.a.server_url+l.a.collection_image_upload,n.next=5,c.a.post(a,e).then((function(e){if(200===e.status){var n=e.data;t=n.status}})).catch((function(e){Object(s.a)(u.a[5001],e)}));case 5:return n.abrupt("return",t);case 6:case"end":return n.stop()}}),n)})))()},addCollection:function(e){return Object(r.a)(i.a.mark((function n(){var t,a,r;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=!1,a=new d.a,r={headers:{"content-type":"application/json",Authorization:"Bearer "+a.get("token")}},n.next=5,c.a.post(l.a.server_url+l.a.collection_add,e,r).then((function(e){if(console.log(e),200===e.status){var n=e.data;n.status&&(t=n.status),Object(s.b)(n.message)}})).catch((function(e){Object(s.a)(u.a[5001],e)}));case 5:return n.abrupt("return",t);case 6:case"end":return n.stop()}}),n)})))()}}}},938:function(e,n,t){"use strict";t.d(n,"a",(function(){return l}));var a,i=t(33),r=t(1),o=t.n(r),c=t(29),l=function(e){e.loading;return o.a.createElement(u.Content,null)},u={Content:c.c.div(a||(a=Object(i.a)(["\n    height: 0px;\n  "])))}},939:function(e,n,t){"use strict";t.d(n,"a",(function(){return s}));var a,i=t(33),r=t(138),o=t(1),c=t.n(o),l=t(29),u=t(32);function s(){return c.a.createElement(d.Container,null,c.a.createElement(r.a,{image:r.a.PRESENTED_IMAGE_SIMPLE}))}var d={Container:l.c.div(a||(a=Object(i.a)(["\n    margin: 0 auto 24px;\n    div {\n      &.ant-empty-normal {\n        margin: 0 auto 32px;\n      }\n      &.ant-empty-description {\n        color: ",";\n      }\n    }\n    @media (min-width: ",") {\n      margin-bottom: ",";\n    }\n\n    @media (min-width: ",") {\n      margin-bottom: ",";\n    }\n  "])),(function(e){return e.theme.black}),u.f.tablet,u.e.tablet,u.f.desktop,u.e.desktop)}}}]);