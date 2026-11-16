
(function(){
    /* =====================================================================
       CONFIG: edit these and you're done
       ===================================================================== */
    var CONFIG = {
      // The three lightings. Fill in date ("2026-12-07"), start/end ("17:00", 24-hour), venue and address.
      // Anything left "" shows "Coming soon" on the page, so it's safe to publish before every detail is set.
      // The Add to calendar and Directions buttons appear by themselves once date and address are filled in.
      events: [
        {
          id: "eastchester", town: "Eastchester", title: "Eastchester Lighting & Gelt Drop", lead: true, gelt: true,
          date: "", start: "", end: "",
          venue: "", address: "",
          blurb: "Our biggest night of the year. Gather around the menorah for the lighting, then watch chocolate gelt come raining down for the kids. Hot latkes, donuts and Chanukah music for the whole family.",
          image: ""
        },
        {
          id: "bronxville", town: "Bronxville", title: "Bronxville Menorah Lighting",
          date: "", start: "", end: "",
          venue: "", address: "",
          blurb: "Light up the Village with us. A joyful menorah lighting with Chanukah music, warm donuts and latkes, and a chance to celebrate with neighbors.",
          image: ""
        },
        {
          id: "tuckahoe", town: "Tuckahoe", title: "Tuckahoe Menorah Lighting",
          date: "", start: "", end: "",
          venue: "", address: "",
          blurb: "Bring the family for a menorah lighting in Tuckahoe, with Chanukah songs, treats and plenty of holiday cheer.",
          image: ""
        }
      ],
    
      rsvpUrl:    "https://www.chabadjewishcenter.com/templates/articlecco_cdo/aid/4570631/jewish/Menorah-Lighting-RSVP.htm",
      menorahUrl: "https://www.chabadjewishcenter.com/templates/articlecco_cdo/aid/3848248/jewish/Request-a-Menorah.htm",
      learnUrl:   "https://www.chabadjewishcenter.com/article.asp?aid=4956728",
      donateUrl:  "https://www.jewishbronxville.com/templates/donate_cdo/aid/4970020/jewish/Donate.htm",
      contactUrl: "https://www.jewishbronxville.com/tools/feedback.htm",
      phone: "",   // e.g. "914-555-1234" shows a call/text link in the footer
      email: "",   // e.g. "rabbi@chabadjewishcenter.com"
    
      // Optional deadline line for menorah requests, e.g. "Requests must be in by December 1".
      menorahDeadline: "",
    
      links: {
        womens:  "https://www.chabadjewishcenter.com/templates/articlecco_cdo/aid/7580025/jewish/Upcoming-Event-The-Miracle-of-Chocolate-A-Pre-Chanukah-Womens-Night-Out.htm",
        shabbat: "https://www.chabadjewishcenter.com/templates/articlecco_cdo/aid/7101391/jewish/Community-Shabbat-Dinner.htm",
        touch:   "https://www.jewishbronxville.com/templates/articlecco_cdo/aid/4822473/jewish/Touch-of-Love-Project.htm"
      },
    
      // Goal. Update "raised" by hand as gifts come in; at 0 the page simply shows the goal.
      goal:   10000,
      raised: 0,
    
      // The same levels as the sponsorship options on the RSVP form.
      sponsorLevels: [
        { name: "Dreidel Sponsor",    amount: 36,   candles: 1, story: "Double chai. Keeps the dreidels spinning and the kids smiling at every lighting." },
        { name: "Latke Sponsor",      amount: 72,   candles: 2, story: "Keeps the latkes frying hot and golden on a cold December night." },
        { name: "Donut Sponsor",      amount: 100,  candles: 3, story: "Sweet, jelly-filled and gone in a minute. Your gift keeps the donuts coming." },
        { name: "Menorah Sponsor",    amount: 500,  candles: 5, story: "Raises the big menorahs so all of Bronxville, Eastchester and Tuckahoe can see the light." },
        { name: "Judah the Maccabee", amount: 1000, candles: 8, story: "Carries a whole celebration, from the menorah to the music to the gelt drop." }
      ]
    };
    
    /* ===================================================================== */
    var root = document.getElementById('luec'); if(!root) return;
    var NS='http://www.w3.org/2000/svg';
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
    function money(n){return '$'+Number(n).toLocaleString('en-US');}
    function esc(t){return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
    function etDate(d){return d.toLocaleDateString('en-CA',{timeZone:'America/New_York'});}
    var ORD=['','1st','2nd','3rd','4th','5th','6th','7th','8th'];
    
    /* ---------- Where are we in Chanukah? (approximate Eastchester lighting times) ---------- */
    var starts=[];
    for(var i=0;i<8;i++){
      var day=4+i, t=(i===0)?'16:10':(i===1?'17:14':'16:58');
      starts.push(new Date('2026-12-'+(day<10?'0'+day:day)+'T'+t+':00-05:00'));
    }
    var endAll=new Date('2026-12-12T17:00:00-05:00'), now=new Date(), tonight=0, phase='before';
    if(now>=starts[0] && now<endAll){ phase='during'; for(var j=0;j<8;j++){ if(now>=starts[j]) tonight=j+1; } }
    else if(now>=endAll) phase='after';
    var today=etDate(now);
    
    (function(){
      var c=document.getElementById('luec-count'), ord=['','first','second','third','fourth','fifth','sixth','seventh','eighth'];
      if(phase==='before'){
        if(today==='2026-12-04'){ c.innerHTML='Tonight we light the <b>first candle</b>, before Shabbat begins'; return; }
        var days=Math.ceil((starts[0]-now)/86400000);
        c.innerHTML='The first candle is <b>'+days+' day'+(days===1?'':'s')+'</b> away';
      } else if(phase==='during'){
        if(today==='2026-12-12') c.innerHTML='Today is the <b>last day</b> of Chanukah';
        else c.innerHTML='It’s the <b>'+ord[tonight]+' night</b> of Chanukah. '+tonight+' candle'+(tonight>1?'s':'')+' tonight!';
      } else c.innerHTML='Thank you for lighting up our towns. <b>See you next Chanukah!</b>';
    })();
    
    /* ---------- Menorah builder ---------- */
    function buildMenorah(svg,o){
      var p=o.id, defs=el('defs',{},svg);
      var g1=el('radialGradient',{id:'luec-glow-'+p},defs);
      el('stop',{offset:'0','stop-color':'rgba(255,200,110,.85)'},g1);el('stop',{offset:'.4','stop-color':'rgba(255,150,60,.35)'},g1);el('stop',{offset:'1','stop-color':'rgba(255,120,40,0)'},g1);
      var g2=el('linearGradient',{id:'luec-fl-'+p,x1:'0',y1:'1',x2:'0',y2:'0'},defs);
      el('stop',{offset:'0','stop-color':'#f2591a'},g2);el('stop',{offset:'.45','stop-color':'#ffa23a'},g2);el('stop',{offset:'1','stop-color':'#ffe9a8'},g2);
      var g3=el('linearGradient',{id:'luec-wax-'+p,x1:'0',y1:'0',x2:'1',y2:'0'},defs);
      el('stop',{offset:'0','stop-color':'#fffaf0'},g3);el('stop',{offset:'1','stop-color':'#e9d8b6'},g3);
      var cx=180,top=150,s=36,cupH=8,wax=34,rise=32, body=el('g',{'class':'m-body'},svg);
      for(var k=1;k<=4;k++) el('path',{d:'M'+(cx-s*k)+' '+top+' L'+cx+' '+(top+s*k)+' L'+(cx+s*k)+' '+top},body);
      el('path',{d:'M'+cx+' '+(top-rise)+' V'+(top+4*s+22)},body);
      el('path',{'class':'m-solid',d:'M146 '+(top+4*s+34)+' H214 L200 '+(top+4*s+18)+' H160 Z',stroke:'none'},svg);
      var xs=[]; for(var a=4;a>=1;a--) xs.push(cx-s*a); for(var b=1;b<=4;b++) xs.push(cx+s*b);
      var all=xs.map(function(x,i){return {x:x,y:top,shamash:false,i:i};}); all.splice(4,0,{x:cx,y:top-rise,shamash:true,i:-1});
      var cupsG=el('g',{},svg), candlesG=el('g',{},svg), list=[];
      all.forEach(function(pt){
        el('rect',{'class':'m-solid',x:pt.x-11,y:pt.y-cupH,width:22,height:cupH,rx:2},cupsG);
        var cg=el('g',{'class':'candle'},candlesG), ct=pt.y-cupH-wax;
        el('rect',{x:pt.x-6,y:ct,width:12,height:wax,rx:3,fill:'url(#luec-wax-'+p+')'},cg);
        el('line',{'class':'wick',x1:pt.x,y1:ct,x2:pt.x,y2:ct-5},cg);
        el('circle',{'class':'glow',cx:pt.x,cy:ct-18,r:30,fill:'url(#luec-glow-'+p+')'},cg);
        var fl=el('g',{'class':'flame'},cg), fi=el('g',{'class':'flame-inner'},fl);
        el('path',{d:'M'+pt.x+' '+(ct-2)+' c9 -5 10 -18 0 -33 c-10 15 -9 28 0 33z',fill:'url(#luec-fl-'+p+')'},fi);
        el('path',{d:'M'+pt.x+' '+(ct-4)+' c4 -3 5 -10 0 -17 c-5 7 -4 14 0 17z',fill:'#fff6cf'},fi);
        list.push({g:cg,x:pt.x,shamash:pt.shamash});
      });
      return list;
    }
    (function(){
      var cs=buildMenorah(document.getElementById('luec-menorah'),{id:'h'});
      var sh=cs.filter(function(c){return c.shamash;})[0], reg=cs.filter(function(c){return !c.shamash;}).sort(function(a,b){return a.x-b.x;});
      var n=(phase==='during'&&tonight>0)?tonight:8, toLight=reg.slice(8-n);
      if(reduce){ sh.g.classList.add('lit'); toLight.forEach(function(c){c.g.classList.add('lit');}); return; }
      setTimeout(function(){sh.g.classList.add('lit');},500);
      toLight.forEach(function(c,k){setTimeout(function(){c.g.classList.add('lit');},950+k*230);});
    })();
    (function(){
      var svg=document.getElementById('luec-kit-svg'), defs=el('defs',{},svg);
      var bg=el('linearGradient',{id:'luec-boxg',x1:'0',y1:'0',x2:'0',y2:'1'},defs);
      el('stop',{offset:'0','stop-color':'#f27730'},bg); el('stop',{offset:'1','stop-color':'#c9531a'},bg);
      el('ellipse',{cx:180,cy:424,rx:150,ry:9,fill:'rgba(0,0,0,.28)'},svg);
      el('rect',{x:36,y:326,width:288,height:94,rx:10,fill:'url(#luec-boxg)'},svg);
      el('rect',{x:36,y:326,width:288,height:28,rx:8,fill:'#ff9a3c'},svg);
      el('rect',{x:164,y:326,width:32,height:94,fill:'#f6c453'},svg);
      [['Menorah',100],['+ candles',260]].forEach(function(t){
        el('text',{x:t[1],y:392,'text-anchor':'middle','font-family':'Lilita One, Arial Rounded MT Bold, sans-serif','font-size':24,fill:'#ffe9c8'},svg).textContent=t[0];
      });
      buildMenorah(svg,{id:'k'}).forEach(function(c){c.g.classList.add('lit');});
    })();
    function miniMenorah(n){
      var svg=el('svg',{viewBox:'0 0 72 40','aria-hidden':'true'});
      el('path',{d:'M6 22 H66 M36 22 V36 M28 37 H44',stroke:'#f6c453','stroke-width':'2.2','stroke-linecap':'round',fill:'none'},svg);
      [6,13,20,27,36,45,52,59,66].forEach(function(x,i){
        var sh=(i===4), top=sh?8:12, ri=i>4?i-1:i, lit=sh||ri>=8-n;
        el('rect',{x:x-1.5,y:top,width:3,height:(sh?14:10),rx:1,fill:'#fff5e6'},svg);
        el('ellipse',{cx:x,cy:top-3.4,rx:1.9,ry:3.2,fill:lit?'#ffa23a':'rgba(198,205,236,.22)',style:lit?'filter:drop-shadow(0 0 3px rgba(255,150,60,.9))':''},svg);
      });
      return svg;
    }
    
    /* ---------- Events from CONFIG ---------- */
    (function(){
      var box=document.getElementById('luec-events'), gl=document.getElementById('luec-glance');
      var DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      function t12(s){ var p=s.split(':'), h=+p[0], m=p[1]; return {t:((h%12)||12)+(m!=='00'?':'+m:''), ap:h<12?'AM':'PM'}; }
      function when(e){
        if(!e.date) return null;
        var d=new Date(e.date+'T12:00:00'), s=DAYS[d.getDay()]+', '+d.toLocaleDateString('en-US',{month:'long',day:'numeric'});
        if(e.start){ var a=t12(e.start); if(e.end){ var b=t12(e.end); s+=', '+a.t+(a.ap!==b.ap?' '+a.ap:'')+' to '+b.t+' '+b.ap; } else s+=' at '+a.t+' '+a.ap; }
        return s;
      }
      var list=CONFIG.events.slice().sort(function(a,b){ return (a.date||'9')<(b.date||'9')?-1:1; });
      list.sort(function(a,b){ return (b.lead?1:0)-(a.lead?1:0); });
      list.forEach(function(e){
        var w=when(e), night=0;
        if(e.date && /^2026-12-(0[4-9]|1[0-1])$/.test(e.date)) night=+e.date.slice(8)-3;
        var where=[e.venue,e.address].filter(Boolean).join(', ');
        var cal='', dir='';
        if(e.date && e.start){
          var dd=e.date.replace(/-/g,''), st=e.start.replace(':','')+'00', en=(e.end||e.start).replace(':','')+'00';
          cal='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(e.title)+'&dates='+dd+'T'+st+'/'+dd+'T'+en+
            '&ctz=America/New_York&location='+encodeURIComponent(where)+'&details='+encodeURIComponent('Chanukah with the Chabad Jewish Center. RSVP: '+CONFIG.rsvpUrl);
        }
        if(e.address) dir='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(e.address);
        var h='<article class="ev'+(e.lead?' ev-lead ev-wide':'')+'" id="luec-ev-'+esc(e.id)+'">'+
          (e.image?'<div class="ev-img"><img loading="lazy" src="'+esc(e.image)+'" alt="'+esc(e.title)+'"></div>':'')+
          '<div class="ev-main">'+
          (night?'<div class="ev-night"><span class="mini" data-lit="'+night+'"></span><span>'+ORD[night]+' night of Chanukah</span></div>':'')+
          '<h3>'+esc(e.title)+' <span class="tag">Free</span></h3>'+
          '<p class="ev-when'+(w?'':' tba')+'">'+(w?esc(w):'Date and time coming soon')+'</p>'+
          '<p class="ev-where">'+(where?esc(where):'Location coming soon')+'</p>'+
          (e.gelt?'<div class="geltdrop"><div class="gd-rain" aria-hidden="true"><i style="left:1%;animation-delay:-.4s"></i><i style="left:4%;animation-delay:-2.3s;width:16px;height:16px"></i><i style="right:3%;animation-delay:-1.1s"></i><i style="right:1%;animation-delay:-2.8s;width:16px;height:16px"></i><i style="right:6%;animation-delay:-1.9s;width:18px;height:18px"></i></div><div><b>The gelt drop is back</b><span>Chocolate coins come raining down on Eastchester. Bring the kids and bring your catching hands.</span></div></div>':'')+
          '<p class="ev-what">'+esc(e.blurb)+'</p>'+
          '<div class="ev-actions"><a class="btn btn-fire" target="_blank" rel="noopener" href="'+esc(CONFIG.rsvpUrl)+'">RSVP</a>'+
          (cal?'<a class="btn btn-ghost btn-small cal" target="_blank" rel="noopener" href="'+esc(cal)+'">Add to calendar</a>':'')+
          (dir?'<a class="btn btn-ghost btn-small" target="_blank" rel="noopener" href="'+esc(dir)+'">Directions</a>':'')+
          '</div></div></article>';
        box.insertAdjacentHTML('beforeend',h);
        var chip=e.date?new Date(e.date+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}):'Date soon';
        gl.insertAdjacentHTML('beforeend','<li'+(e.lead?' class="pub"':'')+'><a href="#luec-ev-'+esc(e.id)+'"><b>'+esc(chip)+'</b><span>'+esc(e.town)+(e.gelt?' · gelt drop':'')+'</span></a></li>');
      });
      Array.prototype.forEach.call(root.querySelectorAll('.mini'),function(m){ m.appendChild(miniMenorah(+m.getAttribute('data-lit'))); });
      // Apple devices get a downloadable .ics instead of Google Calendar
      if(/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)){
        Array.prototype.forEach.call(root.querySelectorAll('a.cal'),function(a){
          var q=new URL(a.href).searchParams, d=(q.get('dates')||'').split('/'); if(d.length<2) return;
          function x(t){return String(t||'').replace(/([,;\\])/g,'\\$1');}
          var ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Chabad Jewish Center//Chanukah//EN','BEGIN:VEVENT','UID:'+d[0]+'-'+(q.get('text')||'').replace(/\W+/g,'')+'@chabadjewishcenter.com',
            'DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z','DTSTART;TZID=America/New_York:'+d[0],'DTEND;TZID=America/New_York:'+d[1],
            'SUMMARY:'+x(q.get('text')),'LOCATION:'+x(q.get('location')),'DESCRIPTION:'+x(q.get('details')),'END:VEVENT','END:VCALENDAR'].join('\r\n');
          a.href='data:text/calendar;charset=utf-8,'+encodeURIComponent(ics); a.setAttribute('download',(q.get('text')||'chanukah').replace(/[^\w]+/g,'-')+'.ics'); a.removeAttribute('target');
        });
      }
    })();
    
    /* ---------- Links ---------- */
    (function(){
      var mb=document.getElementById('luec-menorah-btn'); mb.href=CONFIG.menorahUrl; mb.target='_blank'; mb.rel='noopener';
      if(CONFIG.menorahDeadline) document.getElementById('luec-kit-when').textContent=CONFIG.menorahDeadline;
      Array.prototype.forEach.call(root.querySelectorAll('[data-learn]'),function(a){a.href=CONFIG.learnUrl;a.target='_blank';a.rel='noopener';});
      Array.prototype.forEach.call(root.querySelectorAll('[data-link]'),function(a){a.href=CONFIG.links[a.getAttribute('data-link')]||CONFIG.contactUrl;a.target='_blank';a.rel='noopener';});
      var ft=document.getElementById('luec-foot-text'), bits=[];
      if(CONFIG.phone) bits.push('call or text <a href="tel:+1'+CONFIG.phone.replace(/\D/g,'')+'">'+esc(CONFIG.phone)+'</a>');
      if(CONFIG.email) bits.push('email <a href="mailto:'+esc(CONFIG.email)+'">'+esc(CONFIG.email)+'</a>');
      ft.insertAdjacentHTML('afterend','<p style="margin-top:10px">Questions? '+(bits.length?bits.join(' or ')+'.':'<a target="_blank" rel="noopener" href="'+esc(CONFIG.contactUrl)+'">Get in touch with us</a>.')+'</p>');
    })();
    
    /* ---------- Sponsor ---------- */
    (function(){
      document.getElementById('luec-sponsor-intro').textContent='The Chabad Jewish Center invests over '+money(CONFIG.goal)+' so every Chanukah celebration is free for everyone in our community. Your gift goes straight to the lights, the latkes and the gelt.';
      var gc=root.querySelector('.goal-candles'), gr=document.getElementById('luec-raised'), grl=document.getElementById('luec-raised-lbl'), gb=document.getElementById('luec-goal-bar');
      for(var i=0;i<8;i++) gc.appendChild(document.createElement('span'));
      var raised=Math.max(0,CONFIG.raised||0), pct=Math.min(1,raised/CONFIG.goal), lit=raised>0?Math.max(1,Math.floor(pct*8+1e-9)):8;
      Array.prototype.forEach.call(gc.children,function(sp,i){ sp.className=i>=8-lit?'on':''; });
      if(raised>0){ gr.textContent=money(raised); grl.innerHTML='raised toward our <em>'+money(CONFIG.goal)+'</em> goal'; gb.firstChild.style.width=Math.max(3,pct*100)+'%'; gb.setAttribute('aria-valuenow',Math.round(pct*100)); }
      else { gr.textContent=money(CONFIG.goal); grl.innerHTML='keeps Chanukah free for the whole community'; gb.classList.add('zero'); }
    
      var wrap=document.getElementById('luec-levels'), pay=document.getElementById('luec-pay');
      function openPay(amount,level){
        pay.hidden=false;
        pay.innerHTML='<h3>'+(level?'Become a '+esc(level):'Give '+money(amount))+(level?' · '+money(amount):'')+'</h3>'+
          '<p>Thank you for helping light up Bronxville, Eastchester and Tuckahoe. '+(level?'Choose <b style="color:var(--text)">'+esc(level)+'</b> on the RSVP form, or enter '+money(amount)+' on our donate page.':'Enter '+money(amount)+' on our secure donate page.')+'</p>'+
          '<div class="pay-opts">'+
            (level?'<a class="btn btn-fire" target="_blank" rel="noopener" href="'+esc(CONFIG.rsvpUrl)+'">Sponsor with my RSVP</a><a class="btn btn-ghost" target="_blank" rel="noopener" href="'+esc(CONFIG.donateUrl)+'">Donate page</a>'
                   :'<a class="btn btn-fire" target="_blank" rel="noopener" href="'+esc(CONFIG.donateUrl)+'">Go to the donate page</a>')+
          '</div>';
        if(!reduce) gelt(14);
        pay.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'});
      }
      CONFIG.sponsorLevels.forEach(function(L){
        var b=document.createElement('button'); b.type='button'; b.className='level'; b.setAttribute('aria-pressed','false');
        var cs=''; for(var q=0;q<(L.candles||1);q++) cs+='<span class="c"></span>';
        b.innerHTML='<span class="cs" aria-hidden="true">'+cs+'</span><span class="amt">'+money(L.amount)+'</span><span class="nm">'+esc(L.name)+'</span><span class="st">'+esc(L.story)+'</span>';
        b.addEventListener('click',function(){ Array.prototype.forEach.call(wrap.children,function(x){x.setAttribute('aria-pressed','false');}); b.setAttribute('aria-pressed','true'); openPay(L.amount,L.name); });
        wrap.appendChild(b);
      });
      document.getElementById('luec-any').addEventListener('submit',function(e){
        e.preventDefault();
        var v=Math.round(parseFloat(document.getElementById('luec-any-amt').value));
        if(!(v>=1&&v<=25000)){ toast('Enter an amount between $1 and $25,000'); return; }
        Array.prototype.forEach.call(wrap.children,function(x){x.setAttribute('aria-pressed','false');});
        openPay(v,'');
      });
    })();
    
    function toast(msg){var t=document.getElementById('luec-toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show');},1800);}
    function gelt(count){
      var coin='<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#e9a92a"/><circle cx="20" cy="20" r="14" fill="#f6c453"/><path d="M13 16 L20 23 L27 16 M16.5 16 L20 19.5 L23.5 16 M20 13 V27" stroke="#a86f08" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
      for(var i=0;i<count;i++){
        var d=document.createElement('div'); d.className='gelt'; d.innerHTML=coin;
        d.style.left=(Math.random()*96)+'vw'; d.style.animationDuration=(2.4+Math.random()*2)+'s'; d.style.animationDelay=(Math.random()*.9)+'s';
        d.style.width=d.style.height=(28+Math.random()*16)+'px'; root.appendChild(d);
        setTimeout((function(x){return function(){x.remove();};})(d),5200);
      }
    }
    
    /* ---------- Sparkle mode ---------- */
    (function(){
      var sbtn=document.getElementById('luec-sparkle'), cvs=null, ctx=null, parts=[], running=false, raf=0;
      function size(){var dpr=Math.min(2,window.devicePixelRatio||1);cvs.width=innerWidth*dpr;cvs.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
      function spawn(){return {x:Math.random()*innerWidth,y:innerHeight+10,vx:(Math.random()-.5)*.5,vy:-(0.6+Math.random()*1.6),r:1+Math.random()*2.6,life:0,max:220+Math.random()*260};}
      function frame(){
        ctx.clearRect(0,0,innerWidth,innerHeight); ctx.globalCompositeOperation='lighter';
        if(parts.length<90) parts.push(spawn());
        parts.forEach(function(p){
          p.life++; p.x+=p.vx+Math.sin((p.life+p.r*40)/30)*.35; p.y+=p.vy;
          var a=Math.max(0,1-p.life/p.max), g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);
          g.addColorStop(0,'rgba(255,236,180,'+a+')'); g.addColorStop(.35,'rgba(255,160,60,'+(a*.6)+')'); g.addColorStop(1,'rgba(242,119,48,0)');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2); ctx.fill();
        });
        parts=parts.filter(function(p){return p.life<p.max&&p.y>-20;});
        if(running) raf=requestAnimationFrame(frame); else ctx.clearRect(0,0,innerWidth,innerHeight);
      }
      sbtn.addEventListener('click',function(){
        running=!running; sbtn.setAttribute('aria-pressed',running);
        if(running){ if(!cvs){cvs=document.createElement('canvas');cvs.className='embers';root.appendChild(cvs);ctx=cvs.getContext('2d');size();addEventListener('resize',size);} parts=[]; frame(); gelt(24); }
        else { cancelAnimationFrame(raf); if(ctx) ctx.clearRect(0,0,innerWidth,innerHeight); }
      });
    })();
    
    /* ---------- Sticky section nav ---------- */
    (function(){
      var wrap=document.getElementById('luec-navwrap'), nav=document.getElementById('luec-nav'), queued=false;
      function headerBottom(){
        var b=0;
        Array.prototype.forEach.call(document.querySelectorAll('header, #header, .Header, [role="banner"]'),function(h){
          if(root.contains(h)) return; var cs=getComputedStyle(h), r=h.getBoundingClientRect();
          if((cs.position==='fixed'||cs.position==='sticky')&&r.height>0&&r.top<=2&&r.bottom>b) b=r.bottom;
        });
        return Math.round(b);
      }
      function update(){ queued=false; var off=headerBottom(); root.style.setProperty('--luec-top',off+'px');
        var w=wrap.getBoundingClientRect(), r=root.getBoundingClientRect(); nav.classList.toggle('is-fixed',w.top<=off&&r.bottom>off+nav.offsetHeight+10); }
      function queue(){ if(!queued){queued=true;requestAnimationFrame(update);} }
      addEventListener('scroll',queue,{passive:true}); addEventListener('resize',queue); update();
      var links={}; Array.prototype.forEach.call(nav.querySelectorAll('a[data-sec]'),function(a){links[a.getAttribute('data-sec')]=a;});
      if('IntersectionObserver' in window){
        var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return;
          Object.keys(links).forEach(function(k){links[k].removeAttribute('aria-current');}); var a=links[e.target.id]; if(a) a.setAttribute('aria-current','true'); }); },{rootMargin:'-35% 0px -60% 0px'});
        Object.keys(links).forEach(function(id){var s=document.getElementById(id); if(s) io.observe(s);});
      }
    })();
    })();