imgPath = 'img/'
document.ondragstart = function() { return false; };
document.onselectstart = function() { return false; };
game=document.getElementById("game");
left=document.getElementById("left");
right=document.getElementById("right");
cialo=document.getElementById("cialo");
glowa=document.getElementById("glowa");
reka=document.getElementById("reka");
reka.style.transition=("margin 100ms");
widz=document.getElementById("widz");

mruganie=setInterval(mrugaj, 4000); m_i=1; mruganie_a=false;
function mrugaj(){
	if(m_i<8){
		if(m_i==1) mruganie_a=setInterval(mrugaj,60);
		glowa.src=imgPath+"mruganie/"+m_i+".png";
		m_i++;
	}else{
		glowa.src=imgPath+"mruganie/1.png";
		clearInterval(mruganie_a); mruganie_a=false;
		m_i=1;
	}
}
function mrugaj_min(){
	if(m_i<9){
		if(m_i==1) mruganie_a=setInterval(mrugaj_min,100);
		glowa.src=imgPath+"mruganie_min/"+m_i+".png";
		m_i++;
	}else{
		glowa.src=imgPath+"mruganie_min/1.png";
		clearInterval(mruganie_a); mruganie_a=false;
		m_i=1;
	}
}

prawa=[1,1]; reka.style.marginLeft="-2px";
right.onmousemove = function(event){
	x_h = event.offsetX?(event.offsetX):event.pageX-document.getElementById("right").offsetLeft;
	y_h = event.offsetY?(event.offsetY):event.pageY-document.getElementById("right").offsetTop;
	if(x_h<448&&y_h<504&&x_h>0&&y_h>0){
		plusl=0; plusg=0;
		if(event.target.id=="ign"){
			plusl=event.target.offsetLeft; plusg=event.target.offsetTop;
		}
		if(x_h>event.target.offsetWidth) x_h=0; 
		if(y_h>event.target.offsetHeight) y_h=0;
		jaka_reka=""; maxminus=0;
		if(stan==1){ jaka_reka="_max"; maxminus=10; }
		if(stan==3) jaka_reka="_min"
		if(11-Math.ceil((x_h+plusl)/44.8)!=prawa[0]&&(x_h+plusl)>0){
			reka.src=imgPath+"reka"+jaka_reka+"/"+(11-Math.ceil((x_h+plusl)/44.8))+".png"; prawa[0]=11-Math.ceil((x_h+plusl)/44.8); }
		if(11-Math.ceil((y_h+plusg)/50.4)!=prawa[1]&&(y_h+plusg)>0){
			reka.style.marginTop=((11-Math.floor((y_h+plusg)/50.4))*1.4-maxminus)+"px"; prawa[1]=11-Math.ceil((y_h+plusg)/50.4);}
	}
}

kom=document.createElement("span"); kom.style.position="relative"; kom.style.transition="opacity 1s"
kom.style.color='#c9c9c9'; kom.style.marginLeft="10px"; kom.style.marginTop="5px";
kom.style.display="block"; kom.style.opacity=0; kom.style.fontSize="12px"; kom.style.pointerEvents="none";

function newv(){
	if(Math.random()*100<80){ viewers++;
	}else if(viewers>0){ viewers--; }
	clearInterval(widzowanie); widz.innerHTML="Viewers: "+viewers;
	widzowanie=setInterval(newv,Math.ceil(Math.random()*20000)+1000);
}

function komentarz(){
	if(viewers>0){
		if((((new Date()).getHours()).toString()).length==1) czas="0"+(new Date()).getHours(); else czas=(new Date()).getHours();
		if((((new Date()).getMinutes()).toString()).length==1) czas+=":0"+(new Date()).getMinutes(); else czas+=":"+(new Date()).getMinutes();
		if(Math.random()*10<8){ kom.innerHTML=czas+' | login: comment<br>';
		}else{
			donate=(Math.random()*4+0.01).toFixed(2); kom.innerHTML=czas+' | login donated '+donate+"$"; kom.style.color="#bff471"; 
			kom.style.fontSize="13px"; balans=(parseFloat(balans)+parseFloat(donate)).toFixed(2);
			if(zak==2) eve_balans.innerHTML=balans+"$";
			if(zak==3) hakzug_balans.innerHTML=balans+"$";
		}
		chat.appendChild(kom.cloneNode(true)); chat.scrollTop = chat.scrollHeight; chat.lastChild.style.opacity=1;
		kom.style.color='#c9c9c9'; kom.style.fontSize="12px";
		if(viewers<4800)viewbonus=[viewers*0.6,viewers*0.5];
		if(viewers<14000)viewbonus[1]=viewers*0.8;
	}
	clearInterval(komentowanie); komentowanie=setInterval(komentarz, Math.ceil(Math.random()*(15000-viewbonus[1]))+5000-viewbonus[0]);
}

zakl=document.createElement("img");
zakl.style.position="absolute";
zakl.style.zIndex="1";
zakl.id='ign';
zakl.style.width="95.9px";
zakl.style.height="41.3px";
zakl.style.marginTop="462.7px";
zakl.style.opacity=0.9;
zakl.style.transition="opacity 500ms"; 
zak1=zakl.cloneNode(true); zak2=zakl.cloneNode(true); zak3=zakl.cloneNode(true);
zak1.src=imgPath+"basic/z1.png"; zak2.src=imgPath+"basic/z2.png"; zak3.src=imgPath+"basic/z3.png";
zak2.style.marginLeft="75px"; zak3.style.marginLeft="150px";
right.appendChild(zak3); right.appendChild(zak2); right.appendChild(zak1);

zak1.onmouseover = function(){ if(zak!=1&&blok==0) upzak(zak1,0) }; zak1.onmouseout = function(){ if(zak!=1&&blok==0) upzak(zak1,1) };
zak2.onmouseover = function(){ if(zak!=2&&blok==0) upzak(zak2,0) }; zak2.onmouseout = function(){ if(zak!=2&&blok==0) upzak(zak2,1) };
zak3.onmouseover = function(){ if(zak!=3&&blok==0) upzak(zak3,0) }; zak3.onmouseout = function(){ if(zak!=3&&blok==0) upzak(zak3,1) };
function upzak(ob,checker){
	if(checker==0) ob.style.opacity=0.7; else ob.style.opacity=1;
}

white1=document.createElement("div"); white1.style.position="absolute";  white1.style.pointerEvents="none";
white1.style.backgroundColor="#f0f2f8"; white1.style.width="100%"; white1.style.height="42px";
white1.style.marginTop="112px"; white1.style.transition="width 0.8s ease-in-out";
white2=document.createElement("div"); white2.style.position="absolute"; white2.style.pointerEvents="none";
white2.style.backgroundColor="#f0f2f8"; white2.style.width="100%"; white2.style.height="350px";
white2.style.marginTop="154px"; white2.style.transition="height 0.8s ease-in-out";
atlo=document.createElement("div"); atlo.style.position="absolute";
atlo.style.backgroundSize="cover"; atlo.style.width="100%"; atlo.style.height="504px";
atlo2=atlo.cloneNode(true);
tlo=document.createElement("div"); tlo.style.position="absolute";
tlo.style.backgroundImage="url("+imgPath+"basic/right1.png)"; tlo.style.backgroundSize="cover";
tlo.style.width="100%"; tlo.style.height="437.5px";
tlo_d=document.createElement("div"); tlo_d.style.position="absolute";
tlo_d.style.backgroundImage="url("+imgPath+"basic/right1_.png)"; tlo_d.style.backgroundSize="cover";
tlo_d.style.width="100%"; tlo_d.style.height="66.5px"; tlo_d.style.marginTop="437.5px";
tlo.style.pointerEvents="none"; tlo_d.style.pointerEvents="none";
karma=document.createElement("img"); karma.style.position="absolute";
karma.src=imgPath+"basic/karma.png"; karma.style.width="83.3px"; karma.style.height="59.5px";
karma.style.marginTop="437.5px"; karma.style.marginLeft="40.8%";
karma.style.pointerEvents="none"; karma.style.transition='margin 500ms';
		
rec=document.createElement("img"); rec.style.position="absolute";
rec.src= imgPath+'basic/rec.png'; rec.style.width="100%"; rec.style.height="437.5px";
rec.style.pointerEvents='none'; rec.style.opacity=0; rec.style.transition='opacity 100ms';
		
kot=document.createElement("img");
kot.src=imgPath+"kot/1.png"; kot.style.pointerEvents="none";
kot.style.width="110.6px"; kot.style.height="177.1px";
kot.style.marginLeft="40%"; kot.style.marginTop="55%";
kot.style.position="absolute";
		
kot_amu=document.createElement("img");
kot_amu.style.pointerEvents="none"; kot_amu.style.width="110.6px"; kot_amu.style.height="177.1px";
kot_amu.src=imgPath+"basic/pusty.png"; kot_amu.style.marginTop="57%"; kot_amu.style.position="absolute";
kot_amu.style.marginLeft="39.5%"; kot_amu.style.transition='margin 500ms';
puszka=document.createElement("img"); puszka.src=imgPath+"puszka/1.png"; puszka.style.position="absolute";

buy_button=document.createElement("img"); buy_button.id="ign"; buy_button.src=imgPath+"z2/buy.png";
buy_button.style.width="56px"; buy_button.style.height="16.1px"; buy_button.style.position="absolute";
buy_button.style.marginLeft="131.5px";
bu1=buy_button.cloneNode(true); bu2=buy_button.cloneNode(true); bu3=buy_button.cloneNode(true);
bu1.style.marginTop="234.5px"; bu2.style.marginTop="324.5px"; bu3.style.marginTop="416.5px";
bu1.onmouseover = function(){ if(bu1.src.includes("z2/buy")&&blok==0) bu1.src=imgPath+"z2/buy_hover.png" };
bu1.onmouseout = function(){ if(bu1.src.includes("z2/buy")&&blok==0) bu1.src=imgPath+"z2/buy.png" };
bu2.onmouseover = function(){ if(bu2.src.includes("z2/buy")&&blok==0) bu2.src=imgPath+"z2/buy_hover.png" };
bu2.onmouseout = function(){ if(bu2.src.includes("z2/buy")&&blok==0) bu2.src=imgPath+"z2/buy.png" };
bu3.onmouseover = function(){ if(bu3.src.includes("z2/buy")&&blok==0) bu3.src=imgPath+"z2/buy_hover.png" };
bu3.onmouseout = function(){ if(bu3.src.includes("z2/buy")&&blok==0) bu3.src=imgPath+"z2/buy.png" };

buy_button=document.createElement("img"); buy_button.id="ign"; buy_button.src=imgPath+"z2/acquire.png";
buy_button.style.width="88.9px"; buy_button.style.height="25.9px"; buy_button.style.position="absolute";
buy_button.style.marginLeft="131.5px";
bup1=buy_button.cloneNode(true); bup2=buy_button.cloneNode(true); bup3=buy_button.cloneNode(true);
bup1.style.marginTop="217.5px"; bup2.style.marginTop="308.5px"; bup3.style.marginTop="400.5px";
bup1.onmouseover = function(){ if(bup1.src.includes("z2/acquire")&&blok==0) bup1.src=imgPath+"z2/acquire_hover.png" };
bup1.onmouseout = function(){ if(bup1.src.includes("z2/acquire")&&blok==0) bup1.src=imgPath+"z2/acquire.png" };
bup2.onmouseover = function(){ if(bup2.src.includes("z2/acquire")&&blok==0) bup2.src=imgPath+"z2/acquire_hover.png" };
bup2.onmouseout = function(){ if(bup2.src.includes("z2/acquire")&&blok==0) bup2.src=imgPath+"z2/acquire.png" };
bup3.onmouseover = function(){ if(bup3.src.includes("z2/acquire")&&blok==0) bup3.src=imgPath+"z2/acquire_hover.png" };
bup3.onmouseout = function(){ if(bup3.src.includes("z2/acquire")&&blok==0) bup3.src=imgPath+"z2/acquire.png" };

oferta=document.createElement("div"); oferta.style.position="absolute"; oferta.style.backgroundSize="cover";
oferta.style.width="100%"; oferta.style.height="84px"; oferta.style.pointerEvents="none";
cena_everugi=document.createElement("span"); cena_everugi.style.position="absolute"; cena_everugi.style.display="block";
cena_everugi.style.pointerEvents="none"; cena_everugi.style.fontSize="13px"; cena_everugi.style.color="#808080";
cena_everugi.style.marginLeft="163.8px"; cena_everugi.style.marginTop="33.6px";
effect_everugi=document.createElement("span"); effect_everugi.style.position="absolute"; effect_everugi.style.display="block";
effect_everugi.style.pointerEvents="none"; effect_everugi.style.fontSize="11.5px"; effect_everugi.style.color="#c59d88";
effect_everugi.style.textAlign="center"; effect_everugi.style.width="182px"; 
effect_everugi.style.marginLeft="261px"; effect_everugi.style.marginTop="48px"; 
oferta.appendChild(effect_everugi); ofp1=oferta.cloneNode(true); ofp2=oferta.cloneNode(true); ofp3=oferta.cloneNode(true);
oferta.removeChild(effect_everugi); oferta.appendChild(cena_everugi); oferta.appendChild(effect_everugi);
of1=oferta.cloneNode(true); of2=oferta.cloneNode(true); of3=oferta.cloneNode(true);

eve_balans=document.createElement("p"); eve_balans.style.position="absolute"; 
eve_balans.style.width="96.6px"; eve_balans.style.height="14px"; eve_balans.style.pointerEvents="none";
eve_balans.style.fontSize="12px"; eve_balans.style.letterSpacing="1px"; eve_balans.style.fontFamily="'Russo One', sans-serif";
eve_balans.style.textAlign="center"; eve_balans.style.color="#c59d88";
eve_balans.style.marginTop="130.5px"; eve_balans.style.marginLeft="338.8px";

eve_next=document.createElement("img"); eve_next.id="ign"; eve_next.style.width="59.5px";
eve_next.style.height="14.7px"; eve_next.style.position="absolute"; eve_next.src=imgPath+"basic/pusty.png";
eve_next.style.marginTop="480px"; eve_next.style.marginLeft="378px";
eve_prev=eve_next.cloneNode(true); eve_prev.style.width="82.6px"; eve_prev.style.marginTop="480.3px";
eve_prev.style.height="14px"; eve_prev.style.marginLeft="288px";
eve_next.onmouseover = function(){ if(eve_next.src.includes(imgPath+"z2/next.png")&&blok==0) eve_next.src=imgPath+"z2/next_hover.png"; }
eve_next.onmouseout = function(){ if(eve_next.src.includes(imgPath+"z2/next_hover.png")&&blok==0) eve_next.src=imgPath+"z2/next.png"; }
eve_prev.onmouseover = function(){ if(eve_prev.src.includes(imgPath+"z2/prev.png")&&blok==0) eve_prev.src=imgPath+"z2/prev_hover.png"; }
eve_prev.onmouseout = function(){ if(eve_prev.src.includes(imgPath+"z2/prev_hover.png")&&blok==0) eve_prev.src=imgPath+"z2/prev.png"; }
eve_next.onclick = function(){ if(eve_next.src.includes(imgPath+"z2/next")&&blok==0){ strona[0]++; usuwanie(2); zmiana(); }}; 
eve_prev.onclick = function(){ if(eve_prev.src.includes(imgPath+"z2/prev")&&blok==0){ strona[0]--; usuwanie(2); zmiana(); }};

eve_pop=document.createElement("img"); eve_pop.style.pointerEvents="none"; eve_pop.style.position="absolute";
eve_pop.style.width="100%"; eve_pop.style.height="100%"; eve_pop.style.transition="opacity 1s"; eve_pop.style.opacity=0;
eve_popbutton=document.createElement("img"); eve_popbutton.id="ign"; eve_popbutton.style.position="absolute";
eve_popbutton.style.width="125.3px"; eve_popbutton.style.height="107.1px"; eve_popbutton.style.transition="opacity 1s"; eve_popbutton.style.opacity=0;
eve_popbutton.style.marginLeft="253.4px"; eve_popbutton.style.marginTop="212.8px";
eve_pop.src=imgPath+"z2/popup.png"; eve_popbutton.src=imgPath+"z2/ok.png";
eve_poptext=document.createElement("p"); eve_poptext.style.position="absolute"; 
eve_poptext.style.width="151.9px"; eve_poptext.style.height="103.6px"; eve_poptext.style.pointerEvents="none";
eve_poptext.style.fontSize="12px"; eve_poptext.style.textAlign="center"; eve_poptext.style.color="white";
eve_poptext.style.marginTop="231px"; eve_poptext.style.marginLeft="51.8px";
eve_poptext.style.opacity=0; eve_poptext.style.transition="opacity 1s";
eve_popbutton.onmouseover = function(){ eve_popbutton.src=imgPath+"z2/ok_hover.png"; }
eve_popbutton.onmouseout = function(){ eve_popbutton.src=imgPath+"z2/ok.png"; }
eve_popbutton.onmousedown = function(){ eve_popbutton.src=imgPath+"z2/ok_onpress.png"; }
eve_popbutton.onmouseup = function(){
	eve_popbutton.src=imgPath+"z2/ok.png"; right.removeChild(eve_pop);
	right.removeChild(eve_popbutton); right.removeChild(eve_poptext);
	eve_pop.style.opacity=0; eve_popbutton.style.opacity=0; eve_poptext.style.opacity=0;
	check_popups();
}
eve_plakat=document.createElement("img"); eve_plakat.id="ign"; eve_plakat.style.position="absolute";
eve_plakat.style.width="101.5px"; eve_plakat.style.height="32.2px"; eve_plakat.src=imgPath+"z2/free.png";
eve_plakat.style.marginLeft="337.4px"; eve_plakat.style.marginTop="441px";
eve_plakat.onmouseover = function(){ if(blok==0)eve_plakat.src=imgPath+"z2/free_hover.png"; }
eve_plakat.onmouseout = function(){ if(blok==0)eve_plakat.src=imgPath+"z2/free.png"; }
eve_plakat.onclick = function(){ if(blok==0){ if(nowy_plakat==1){ nowy_plakat=0; right.removeChild(eve_nowy_plakat); }
	usuwanie(2); eve_zak=2; strona=[1,1]; eve_buy=[-1,-1,-1]; zmiana();}}
eve_nowy_plakat=document.createElement("img"); eve_nowy_plakat.style.pointerEvents="none"; eve_nowy_plakat.src=imgPath+"z2/free_new.png";
eve_nowy_plakat.style.position="absolute"; eve_nowy_plakat.style.width="100%"; eve_nowy_plakat.style.height="100%";

eve_back=document.createElement("img"); eve_back.id="ign"; eve_back.style.position="absolute";
eve_back.style.width="88.2px"; eve_back.style.height="32.2px"; eve_back.src=imgPath+"z2/back.png";
eve_back.style.marginLeft="351px"; eve_back.style.marginTop="441px";
eve_back.onmouseover = function(){ if(blok==0)eve_back.src=imgPath+"z2/back_hover.png"; }
eve_back.onmouseout = function(){ if(blok==0)eve_back.src=imgPath+"z2/back.png"; }
eve_back.onclick = function(){ if(blok==0){ usuwanie(2); eve_zak=1; strona=[1,1]; eve_buy=[-1,-1,-1]; zmiana();}}

sciana_plakat=document.createElement("img"); sciana_plakat.style.pointerEvents="none"; sciana_plakat.style.position="absolute";
sciana_plakat.style.width="100%"; sciana_plakat.style.height="100%"; sciana_plakat.style.opacity=0;
sciana_plakat.style.transition="opacity 1s"; sciana_plakat.src=imgPath+"basic/pusty.png"; left.appendChild(sciana_plakat);

black1=document.createElement("div"); black1.style.position="absolute"; 
black1.id="ign"; black1.style.backgroundColor="#000000";
black2=document.createElement("div"); black2.style.position="absolute"; 
black2.id="ign"; black2.style.backgroundColor="#000000";
fire=document.createElement("img"); fire.style.position="absolute"; fire.style.pointerEvents="none";
fire.style.width="100%"; fire.style.height="100%"; fire.src=imgPath+"z3/og1.png";

hakzug_button=document.createElement("img"); hakzug_button.style.position="absolute"; hakzug_button.id="ign";
hakzug_button.style.height="21px"; hakzug_button.style.marginLeft="40.6px"; hakzug_button2=hakzug_button.cloneNode(true);
hakzug_button3=hakzug_button.cloneNode(true); hakzug_button.style.marginTop="312.2px"; 
hakzug_button2.style.marginTop="342.3px"; hakzug_button.style.width="261.8px"; hakzug_button2.style.width="144.9px";
hakzug_button.src=imgPath+"z3/virus.png"; hakzug_button2.src=imgPath+"z3/implant.png"; hakzug_button3.style.marginTop="230.3px";
hakzug_button3.src=imgPath+"z3/back.png"; hakzug_button3.style.width="134.4px"; hakzug_button3.style.height="14.7px";

hakzug_balans=document.createElement("p"); hakzug_balans.style.position="absolute"; 
hakzug_balans.style.width="96.6px"; hakzug_balans.style.height="20px"; hakzug_balans.style.pointerEvents="none";
hakzug_balans.style.fontSize="18px"; hakzug_balans.style.letterSpacing="1px"; hakzug_balans.style.fontFamily="'Amatic SC', cursive;";
hakzug_balans.style.color="white"; hakzug_balans.style.marginTop="143.5px"; hakzug_balans.style.marginLeft="260px";

hakzug_div=document.createElement("div"); hakzug_div.style.position="absolute"; hakzug_div.id="ign";
hakzug_div.style.width="372.4px"; hakzug_div.style.height="190px"; hakzug_div.style.marginTop="259.7px";
hakzug_div.style.overflowY="auto"; hakzug_div.style.overflowX="auto"; hakzug_div.style.marginLeft="40.6px";
hakzug_div2=document.createElement("div"); hakzug_div2.style.position="relative"; hakzug_div2.style.backgroundSize="cover";
hakzug_div2.style.width="100%"; hakzug_div2.style.height="57.4px"; hakzug_div2.style.pointerEvents="none";
hakzug_cena=document.createElement("p"); hakzug_cena.style.position="absolute"; hakzug_cena.style.pointerEvents="none";
hakzug_cena.style.fontSize="11px"; hakzug_cena.style.height="11px"; hakzug_cena.style.width="60px";
hakzug_cena.style.marginTop="28.8px"; hakzug_cena.style.marginLeft="119px";

helpline=document.createElement("div"); helpline.style.position="absolute"; helpline.id="ign";
helpline.style.width="1px"; helpline.style.height="190px";
helpline.style.marginTop="259.7px"; helpline.style.marginLeft="40.6px";
helpline_right=helpline.cloneNode(true); helpline_right.style.height="100%"; helpline_right.style.margin="0";

zak3.onclick = function(){
	if(zak!=3&&blok==0){
		right.removeChild(zak2); right.removeChild(zak3);
		right.appendChild(zak2); right.appendChild(zak3); upzak(zak3,1);
		usuwanie(zak); zak=3; zmiana();
	}
}
zak2.onclick = function(){
	if(zak!=2&&blok==0){
		right.removeChild(zak2); right.appendChild(zak2); upzak(zak2,1);
		usuwanie(zak); zak=2; zmiana(); 
	}
}
zak1.onclick = function(){
	if(zak!=1&&blok==0){
		right.removeChild(zak3); right.removeChild(zak2); right.removeChild(zak1);
		right.appendChild(zak3); right.appendChild(zak2); right.appendChild(zak1);
		upzak(zak1,1);
		usuwanie(zak); zak=1; zmiana();
	}
}

//fajniutkie zmienne
karma_h=437.5; balans=60.23; energole=[]; emo=[]; energia=[80,100]; 
ile_wysyp=70; ile_wcinaj=400; ile_energia=4000; stan=2; balans_wydany=0;
viewers=0; viewbonus=[0,0]; popupy=[]; plakaty=[]; nowy_plakat=0;
wirusy=[]; implanty=[];
//te trochę mniej
blok=0; hakzug_zak=1; eve_zak=1; blok_special=0; strona=[1,1]; eve_buy=[-1,-1,-1];

widz.innerHTML="Viewers: "+viewers;
widzowanie = setInterval(newv,Math.ceil(Math.random()*20000)+1000);
komentowanie=setInterval(komentarz, Math.ceil(Math.random()*(15000-viewbonus[1]))+5000-viewbonus[0]);

function energol(acces, cost, energy, effect, source){
	this.acces=acces; this.cost=cost; this.energy=energy; this.effect=effect; this.source=source; emo.push([0,0]);
}
if(energole.length==0){
	energole.push(new energol(1,3.99,"15","replenish 15 points of energy",imgPath+"z2/chash.png"));
	energole.push(new energol(1,51.11,"20","replenish 20 points of energy",imgPath+"z2/chash.png"));
	energole.push(new energol(1,2.69,"25","replenish 25 points of energy",imgPath+"z2/chash.png"));
	energole.push(new energol(1,3.30,"0","gives good vibes",imgPath+"z2/chash.png"));
	energole.push(new energol(1,3.99,"15","replenish 15 points of energy",imgPath+"z2/chash.png"));
	energole.push(new energol(1,5.99,"20","replenish 20 points of energy",imgPath+"z2/chash.png"));
	energole.push(new energol(1,2.69,"25","replenish 25 points of energy",imgPath+"z2/chash.png"));
	energole.push(new energol(1,3.30,"0","gives good vibes",imgPath+"z2/chash.png"));
	energole.push(new energol(1,8.30,"50","DAJE KOPA",imgPath+"z2/chash.png"));
	energole.push(new energol(1,8.30,"50","Power",imgPath+"z2/chash.png"));
}

function popup(acces, peak, info){
	this.acces=acces; this.peak=peak; this.info=info;
}
if(popupy.length==0){
	popupy.push(new popup(1,50.00,"You've just spent over 50$ in our store! As a gift, we grant you special access to our gift subpage, wherefrom free prizes can be acquired. Have a nice day!"));
}
function plakat(acces, source, effect, wall){
	this.acces=acces; this.source=source; this.effect=effect; this.wall=wall;
}
if(plakaty.length==0){
	plakaty.push(new plakat(0,imgPath+"z2/ufo.png","none",imgPath+"plakaty/ufo.png"));
}

function wirus(acces, cost, number, effect, source){
	this.acces=acces; this.cost=cost; this.number=number; this.effect=effect; this.source=source;
}
if(wirusy.length==0){
	wirusy.push(new wirus(1,29.99,"20%","replenish 15 points of energy",imgPath+"z3/chash20.png"));
	wirusy.push(new wirus(1,19.99,"20%","replenish 15 points of energy",imgPath+"z3/chash20.png"));
	wirusy.push(new wirus(1,29.99,"20%","replenish 15 points of energy",imgPath+"z3/chash20.png"));
	wirusy.push(new wirus(1,19.99,"20%","replenish 15 points of energy",imgPath+"z3/chash20.png"));
	wirusy.push(new wirus(1,29.99,"20%","replenish 15 points of energy",imgPath+"z3/chash20.png"));
	wirusy.push(new wirus(1,19.99,"20%","replenish 15 points of energy",imgPath+"z3/chash20.png"));
}

zak=1; zmiana();
function zmiana(){
	if(zak==1){
		right.appendChild(tlo); right.appendChild(kot); right.appendChild(karma); 
		right.appendChild(tlo_d); right.appendChild(kot_amu); right.appendChild(rec);
		
		miganie=setInterval(migaj,1000);
		function migaj(){
			if(rec.style.opacity=="0")rec.style.opacity=0.6; else rec.style.opacity=0;
		}
		
		machanie=setInterval(machaj,110); kot_j=0; kot_i=1;
		function machaj(){
			kot_i=(kot_i)%6+1;
			kot.src=imgPath+"kot/"+kot_i+".png";
		}
		
		jem=[0,1]; kot_je=[0,0];
		right.onclick = function(event){
			if(zak==1&&jem[0]==0&&karma_h>380&&blok==0){
				x_h = event.offsetX?(event.offsetX):event.pageX-document.getElementById("board").offsetLeft;
				y_h = event.offsetY?(event.offsetY):event.pageY-document.getElementById("board").offsetTop;
				if(y_h>112&&y_h<427){
					jem[0]=1; puszka_p=Math.ceil(Math.random()*10);
					karma_h-=1.5;
					karma.style.marginTop=karma_h+"px";
					if(puszka_p<6) puszka.setAttribute('style','transform:scale(-1, 1);'); else puszka.setAttribute('style','transform:scale(1, 1);');
					if(puszka_p<6) puszka.style.marginLeft=(puszka_p*5)+"%"; else puszka.style.marginLeft=(30+puszka_p*5)+"%"
					puszka.style.width="79.1px"; puszka.style.height="91.7px"; puszka.style.marginTop="65%"; puszka.style.pointerEvents="none";
					right.appendChild(puszka);
					wysypywanie=setInterval(wysyp,ile_wysyp);
					if(kot_je[0]==0&&karma_h<420){
						kot_je[0]=1; kot.src=imgPath+"kot/_2.png"; kot_amu.src=imgPath+"kot/_1.png";
						kot_je[1]=0; clearInterval(machanie); wcinanie=setInterval(wcinaj,ile_wcinaj); 
					}
				}
			}
		}
		
		function wcinaj(){
			if(zak==1){
				if(karma_h>=437.5){
					clearInterval(wcinanie); kot.src=imgPath+"kot/1.png"; machanie=setInterval(machaj,110); kot_je[0]=0; kot_amu.src=imgPath+"basic/pusty.png";
				}else{
					if(kot_je[1]==0){ kot_amu.style.marginTop="58%"; kot_je[1]=1;
					}else{ kot_amu.style.marginTop="56%"; kot_je[1]=0; }
					karma_h+=1.5; karma.style.marginTop=karma_h+"px";
				}
			}
		}
		
		function wysyp(){
			if(zak==1){
				if(jem[1]<12){ jem[1]++; puszka.src=imgPath+"puszka/"+jem[1]+".png";
				}else{ jem=[0,1]; clearInterval(wysypywanie); right.removeChild(puszka); }
			}
		}
	}else if(zak==2){
		atlo.style.backgroundImage="url("+imgPath+"z2/tlo.png)"; right.appendChild(atlo);
		right.appendChild(eve_balans); eve_balans.innerHTML=balans+"$";
		right.appendChild(eve_next); right.appendChild(eve_prev); ile_stron=0;
		if(eve_zak==1){
			for(let i=0;i<energole.length;i++){ if(energole[i].acces==1) ile_stron++; }
			if(popupy[0].acces==2) right.appendChild(eve_plakat);
			if(nowy_plakat==1) right.appendChild(eve_nowy_plakat);
		}else if(eve_zak==2){
			for(let i=0;i<plakaty.length;i++){ if(plakaty[i].acces==1) ile_stron++; }
			right.appendChild(eve_back);
		}
		strona[1]=Math.ceil(ile_stron/3);
		everugi(strona[0]);
		if(strona[0]<strona[1]) eve_next.src=imgPath+"z2/next.png"; else eve_next.src=imgPath+"basic/pusty.png";
		if(strona[0]>1) eve_prev.src=imgPath+"z2/prev.png"; else eve_prev.src=imgPath+"basic/pusty.png";
		
		bu1.onmousedown = function(){
			if(bu1.src.includes("z2/buy")&&eve_buy[0]!=-1&&blok==0){
				if(energole[eve_buy[0]].cost<=balans) bu1.src=imgPath+"z2/buy_yes.png"; else bu1.src=imgPath+"z2/buy_no.png";
			}
		}
		bu1.onmouseup = function(){
			if(bu1.src.includes("z2/buy")&&eve_buy[0]!=-1&&blok==0){
				bu1.src=imgPath+"z2/buy.png";
				if(energole[eve_buy[0]].cost<=balans){
					balans=(balans-energole[eve_buy[0]].cost).toFixed(2);
					balans_wydany=(parseFloat(balans_wydany)+energole[eve_buy[0]].cost).toFixed(2);
					if(energole[eve_buy[0]].energy.includes("%")){
						energia[0]+=Math.round(parseInt(energole[eve_buy[0]].energy.substring(0,energole[eve_buy[0]].energy.length-1))/100*energia[1]);
					}else{ energia[0]+=parseInt(energole[eve_buy[0]].energy); }
					if(energia[0]>energia[1]) energia[0]=energia[1];
					eve_balans.innerHTML=balans+"$"; blok=1;
					if(mruganie){clearInterval(mruganie)}; if(mruganie_a){clearInterval(mruganie_a)};
					left.appendChild(poczta); ile_pic=0; piciowanie=setInterval(pij,70);
					if(emo[eve_buy[0]][0]==0){ emo[eve_buy[0]][0]=1; emo_collection(); }
				}
			}
		}
		bu2.onmousedown = function(){
			if(bu2.src.includes("z2/buy")&&eve_buy[1]!=-1&&blok==0){
				if(energole[eve_buy[1]].cost<=balans) bu2.src=imgPath+"z2/buy_yes.png"; else bu2.src=imgPath+"z2/buy_no.png";
			}
		}
		bu2.onmouseup = function(){
			if(bu2.src.includes("z2/buy")&&eve_buy[1]!=-1&&blok==0){
				bu2.src=imgPath+"z2/buy.png";
				if(energole[eve_buy[1]].cost<=balans){
					balans=(balans-energole[eve_buy[1]].cost).toFixed(2);
					balans_wydany=(parseFloat(balans_wydany)+energole[eve_buy[1]].cost).toFixed(2);
					if(energole[eve_buy[1]].energy.includes("%")){
						energia[0]+=Math.round(parseInt(energole[eve_buy[1]].energy.substring(0,energole[eve_buy[1]].energy.length-1))/100*energia[1]);
					}else{ energia[0]+=parseInt(energole[eve_buy[1]].energy); }
					if(energia[0]>energia[1]) energia[0]=energia[1];
					eve_balans.innerHTML=balans+"$"; blok=1;
					if(mruganie){clearInterval(mruganie)}; if(mruganie_a){clearInterval(mruganie_a)};
					left.appendChild(poczta); ile_pic=0; piciowanie=setInterval(pij,70);
					if(emo[eve_buy[1]][0]==0){ emo[eve_buy[1]][0]=1; emo_collection(); }
				}
			}
		}
		bu3.onmousedown = function(){
			if(bu3.src.includes("z2/buy")&&eve_buy[2]!=-1&&blok==0){
				if(energole[eve_buy[2]].cost<=balans) bu3.src=imgPath+"z2/buy_yes.png"; else bu3.src=imgPath+"z2/buy_no.png";
			}
		}
		bu3.onmouseup = function(){
			if(bu3.src.includes("z2/buy")&&eve_buy[2]!=-1&&blok==0){
				bu3.src=imgPath+"z2/buy.png";
				if(energole[eve_buy[2]].cost<=balans){
					balans=(balans-energole[eve_buy[2]].cost).toFixed(2);
					balans_wydany=(parseFloat(balans_wydany)+energole[eve_buy[2]].cost).toFixed(2);
					if(energole[eve_buy[2]].energy.includes("%")){
						energia[0]+=Math.round(parseInt(energole[eve_buy[2]].energy.substring(0,energole[eve_buy[2]].energy.length-1))/100*energia[1]);
					}else{ energia[0]+=parseInt(energole[eve_buy[2]].energy); }
					if(energia[0]>energia[1]) energia[0]=energia[1];
					eve_balans.innerHTML=balans+"$"; blok=1;
					if(mruganie){clearInterval(mruganie)}; if(mruganie_a){clearInterval(mruganie_a)};
					left.appendChild(poczta); ile_pic=0; piciowanie=setInterval(pij,70);
					if(emo[eve_buy[2]][0]==0){ emo[eve_buy[2]][0]=1; emo_collection(); }
				}
			}
		}
		bup1.onmouseup = function(){
			if(bup1.src.includes("z2/acquire")&&eve_buy[0]!=-1&&sciana_plakat.src.includes(plakaty[eve_buy[0]].source)==false&&blok==0){
				sciana_plakat.style.transition="opacity 0s"; sciana_plakat.style.opacity=0; sciana_plakat.src=plakaty[eve_buy[0]].wall;
				sciana_plakat.style.transition="opacity 1s"; setTimeout(function(){sciana_plakat.style.opacity=1},5);
			}
		}
		bup2.onmouseup = function(){
			if(bup2.src.includes("z2/acquire")&&eve_buy[1]!=-1&&sciana_plakat.src.includes(plakaty[eve_buy[1]].source)==false&&blok==0){
				sciana_plakat.style.transition="opacity 0s"; sciana_plakat.style.opacity=0; sciana_plakat.src=plakaty[eve_buy[1]].wall;
				sciana_plakat.style.transition="opacity 1s"; setTimeout(function(){sciana_plakat.style.opacity=1},5);
			}
		}
		bup3.onmouseup = function(){
			if(bup3.src.includes("z2/acquire")&&eve_buy[2]!=-1&&sciana_plakat.src.includes(plakaty[eve_buy[2]].source)==false&&blok==0){
				sciana_plakat.style.transition="opacity 0s"; sciana_plakat.style.opacity=0; sciana_plakat.src=plakaty[eve_buy[2]].wall;
				sciana_plakat.style.transition="opacity 1s"; setTimeout(function(){sciana_plakat.style.opacity=1},5);
			}
		}
		
		right.appendChild(white1); setTimeout(function(){ white1.style.width="0px"; }, 10);
		right.appendChild(white2); setTimeout(function(){ white2.style.height="0px"; }, 10);
	}else if(zak==3){
		blackowanie=false; 
		black1.style.width="100%"; black1.style.height="392px"; black1.style.marginTop="112px";
		black2.style.width="100%"; black2.style.height="19.6px"; black2.style.marginTop="112px";
		atlo.style.backgroundImage="url("+imgPath+"z3/tlo.png)"; right.appendChild(atlo); black_h=392; black_m=112;
		if(hakzug_zak==1){
			firewanie=false; ile_fire=0;
			atlo2.style.backgroundImage="url("+imgPath+"z3/tlo1.png)"; right.appendChild(atlo2);
			right.appendChild(fire); firewanie=setInterval(firej, 120);
			right.appendChild(hakzug_button); right.appendChild(hakzug_button2);
			hakzug_button.onmousedown = function(){ hakzug_button.src=imgPath+"z3/virus_onpress.png" }
			hakzug_button2.onmousedown = function(){ hakzug_button2.src=imgPath+"z3/implant_onpress.png" }
			hakzug_button.onmouseout = function(){ hakzug_button.src=imgPath+"z3/virus.png" }
			hakzug_button2.onmouseout = function(){ hakzug_button2.src=imgPath+"z3/implant.png" }
			hakzug_button.onmouseup = function(){ usuwanie(3); hakzug_zak=2; zmiana(); hakzug_button.src=imgPath+"z3/virus.png" }
			hakzug_button2.onmouseup = function(){ usuwanie(3); hakzug_zak=3; zmiana(); hakzug_button2.src=imgPath+"z3/implant.png" }
			
			hakzug_button3.onmousedown = function(){ hakzug_button3.src=imgPath+"z3/back_onpress.png" }
			hakzug_button3.onmouseout = function(){ hakzug_button3.src=imgPath+"z3/back.png" }
			hakzug_button3.onmouseup = function(){ usuwanie(3); hakzug_zak=1; zmiana(); hakzug_button3.src=imgPath+"z3/back.png"}
		}else if(hakzug_zak==2){
			atlo2.style.backgroundImage="url("+imgPath+"z3/tlo2.png)"; right.appendChild(atlo2); right.appendChild(hakzug_button3);
			right.appendChild(hakzug_balans); hakzug_balans.innerHTML=balans+"$"; right.appendChild(hakzug_div);
			for(let i=0;i<wirusy.length;i++){
				if(wirusy[i].acces==1){
					new_hdiv=hakzug_div2.cloneNode(true); new_hdiv.style.backgroundImage="url("+wirusy[i].source+")";
					new_hdiv.appendChild(hakzug_cena.cloneNode(true)); new_hdiv.childNodes[0].innerHTML=wirusy[i].cost+"$";
					hakzug_div.appendChild(new_hdiv); hakzug_div.innerHTML+="<br>";
				}
			}
		}else if(hakzug_zak==3){
			atlo2.style.backgroundImage="url("+imgPath+"z3/tlo2.png)"; right.appendChild(atlo2); right.appendChild(hakzug_button3);
			right.appendChild(hakzug_balans); hakzug_balans.innerHTML=balans+"$"; right.appendChild(hakzug_div);
		}
		right.appendChild(helpline);
		right.appendChild(black1); right.appendChild(black2); blackowanie=setInterval(z3_trans, 200);
	}
	right.appendChild(helpline_right);
}

function firej(){ ile_fire++; fire.src=imgPath+"z3/og"+(ile_fire%3+1)+".png"; }

function z3_trans(){
	if(black_h>19.6&&blackowanie){
		right.removeChild(black2); black2.style.transition="width 0s"; black2.style.width="100%";
		black2.style.transition="width 150ms ease-out"; black_h-=19.6; black_m+=19.6;
		black1.style.height=black_h+"px"; black1.style.marginTop=black_m+"px"; 
		black2.style.marginTop=(black_m-19.6)+"px"; right.appendChild(black2);
		setTimeout(function(){ black2.style.width="0px"; }, 1);
	}else{
		clearInterval(blackowanie); blackowanie=false;
		right.removeChild(black1); right.removeChild(black2);
	}
}

function everugi(str_a){
	let i=0; let j=0;
	if(eve_zak==1){
		while(i<energole.length){
			if(i>=(str_a-1)*3&&energole[i].acces==1){
				if(j==0){
					right.appendChild(of1); of1.style.backgroundImage="url("+energole[i].source+")"; of1.style.marginTop="170.1px";
					right.appendChild(bu1); of1.childNodes[0].innerHTML=energole[i].cost.toFixed(2)+" $"; of1.childNodes[1].innerHTML=energole[i].effect;
				}
				if(j==1){
					right.appendChild(of2); of2.style.backgroundImage="url("+energole[i].source+")"; of2.style.marginTop="261px";
					right.appendChild(bu2); of2.childNodes[0].innerHTML=energole[i].cost.toFixed(2)+" $"; of2.childNodes[1].innerHTML=energole[i].effect;
				}
				if(j==2){
					right.appendChild(of3); of3.style.backgroundImage="url("+energole[i].source+")"; of3.style.marginTop="353px";
					right.appendChild(bu3); of3.childNodes[0].innerHTML=energole[i].cost.toFixed(2)+" $"; of3.childNodes[1].innerHTML=energole[i].effect;
				}
				eve_buy[j]=i; j++;
			}
			i++;
		}
	}else if(eve_zak==2){
		while(i<plakaty.length){
			if(i>=(str_a-1)*3&&plakaty[i].acces==1){
				if(j==0){
					right.appendChild(ofp1); ofp1.style.backgroundImage="url("+plakaty[i].source+")"; ofp1.style.marginTop="170.1px";
					ofp1.childNodes[0].innerHTML=plakaty[i].effect; right.appendChild(bup1);
				}
				if(j==1){
					right.appendChild(ofp2); ofp2.style.backgroundImage="url("+plakaty[i].source+")"; ofp2.style.marginTop="261px";
					ofp2.childNodes[0].innerHTML=plakaty[i].effect; right.appendChild(bup2);
				}
				if(j==2){
					right.appendChild(ofp3); ofp3.style.backgroundImage="url("+plakaty[i].source+")"; ofp3.style.marginTop="353px";
					ofp3.childNodes[0].innerHTML=plakaty[i].effect; right.appendChild(bup3);
				}
				eve_buy[j]=i; j++;
			}
			i++;
		}
	}
}

function usuwanie(dla){
	if(dla==1){
		kot.src=imgPath+"kot/1.png"; kot_amu.src=imgPath+"basic/pusty.png"; 
		right.removeChild(tlo); right.removeChild(kot); right.removeChild(karma); 
		right.removeChild(tlo_d); right.removeChild(kot_amu); right.removeChild(rec);
		clearInterval(machanie); clearInterval(miganie); 
		if(jem[0]==1) right.removeChild(puszka);
		if(typeof wcinanie !== 'undefined') clearInterval(wcinanie);
		if(typeof wysypywanie !== 'undefined') clearInterval(wysypywanie);
	}else if(dla==2){
		right.removeChild(white1); right.removeChild(white2); right.removeChild(atlo);
		white1.style.width="100%"; white2.style.height="350px";
		right.removeChild(eve_balans); right.removeChild(eve_next); right.removeChild(eve_prev);
		if(right.contains(of1)){ right.removeChild(of1); right.removeChild(bu1); }
		if(right.contains(of2)){ right.removeChild(of2); right.removeChild(bu2); }
		if(right.contains(of3)){ right.removeChild(of3); right.removeChild(bu3); }
		if(right.contains(ofp1)){ right.removeChild(ofp1); right.removeChild(bup1); }
		if(right.contains(ofp2)){ right.removeChild(ofp2); right.removeChild(bup2); }
		if(right.contains(ofp3)){ right.removeChild(ofp3); right.removeChild(bup3); }
		if(popupy[0].acces==2&&eve_zak==1) right.removeChild(eve_plakat);
		if(nowy_plakat==1&&eve_zak==1) right.removeChild(eve_nowy_plakat);
		if(eve_zak==2) right.removeChild(eve_back);
	}else if(dla==3){
		right.removeChild(atlo); right.removeChild(atlo2); right.removeChild(helpline);
		if(hakzug_zak==1){ right.removeChild(hakzug_button); right.removeChild(hakzug_button2); }
		if(hakzug_zak>1){ right.removeChild(hakzug_button3); right.removeChild(hakzug_balans); right.removeChild(hakzug_div);
			while (hakzug_div.firstChild) {hakzug_div.removeChild(hakzug_div.firstChild); }}
		if(blackowanie){ clearInterval(blackowanie); blackowanie=false; right.removeChild(black1); right.removeChild(black2); }
		if(firewanie){ clearInterval(firewanie); firewanie=false; right.removeChild(fire); }
	}
	right.removeChild(helpline_right);
}

poczta=document.createElement("img"); poczta.style.opacity=0; poczta.style.pointerEvents="none";
poczta.src=imgPath+"basic/poczta.png"; poczta.style.width="100%"; poczta.style.height="100%";
poczta.style.position="absolute"; poczta.style.transition="opacity 200ms, margin 1s";
zgnieciona=document.createElement("img"); zgnieciona.style.opacity=1; zgnieciona.style.pointerEvents="none";
zgnieciona.src=imgPath+"picie/puszka.png"; zgnieciona.style.width="30px"; zgnieciona.style.height="40px";
zgnieciona.style.position="absolute"; zgnieciona.style.transition="margin 0.7s ease-out, opacity 0.5s ease-in, transform 0.8s, height 0.8s linear";
zgnieciona.style.marginTop="30px"; zgnieciona.style.marginLeft="110px"; 
function pij(){
	if(ile_pic<8){ cialo.src=imgPath+"picie/"+(ile_pic%4+1)+".png";
	if(ile_pic==0){ glowa.src=imgPath+"basic/pusty.png"; reka.style.visibility="hidden"; poczta.style.opacity=1; poczta.style.marginTop="-10px"}
	}else if(ile_pic<24){ cialo.src=imgPath+"picie/"+(ile_pic+1)+".png"; if(ile_pic<16){ poczta.style.opacity=0 }
	}else if(ile_pic<27){ cialo.src=imgPath+"picie/24.png";
	}else if(ile_pic<31){ cialo.src=imgPath+"picie/"+(ile_pic-2)+".png";
	if(ile_pic==27){left.appendChild(zgnieciona); setTimeout(function(){ zgnieciona.style.marginLeft="400px"; zgnieciona.style.marginTop="0px";
	zgnieciona.style.opacity=0; zgnieciona.style.transform="rotate(360deg)"; zgnieciona.style.height="10px";}, 5); }
	}else if(ile_pic>34){
		left.removeChild(poczta); poczta.style.marginTop="0px"; clearInterval(piciowanie);
		left.removeChild(zgnieciona); zgnieciona.style.marginTop="30px"; zgnieciona.style.transform="rotate(-360deg)";
		zgnieciona.style.marginLeft="110px"; zgnieciona.style.opacity=1; zgnieciona.style.height="40px";
		stan=0; blok_special=1; stan_ciala(); check_popups();
	}
	ile_pic++;
}

function check_popups(){
	for(let i=0;i<popupy.length;i++){
		if(popupy[i].acces==1&&popupy[i].peak<=balans_wydany){
			popupy[i].acces=2;
			eve_poptext.innerHTML=popupy[i].info;
			right.appendChild(eve_pop); right.appendChild(eve_popbutton); right.appendChild(eve_poptext);
			if(i==0){ plakaty[0].acces=1; nowy_plakat=1; right.appendChild(eve_plakat); right.appendChild(eve_nowy_plakat); }
			setTimeout(function(){ eve_pop.style.opacity=1; eve_popbutton.style.opacity=1; eve_poptext.style.opacity=1; }, 20);
			return;
		}
	}
	blok=0; blok_special=0;
}

emo_puszka=document.createElement("img"); emo_puszka.style.pointerEvents="none"; 
emo_puszka.style.position="absolute"; emo_puszka.style.width="100%"; emo_puszka.style.height="100%";
emo_puszka.style.opacity=0; emo_puszka.style.transition="opacity 1s ease-in";
function emo_collection(){
	for(let i=0;i<emo.length;i++){
		if(emo[i][0]==1&&emo[i][1]==0){
			nowe_emo=emo_puszka.cloneNode(true);
			nowe_emo.src=imgPath+"kolekcja/"+i+".png"; left.appendChild(nowe_emo);
			setTimeout(function(){ nowe_emo.style.opacity=1; }, 10)
		}
	}
}

zmeczenie=setInterval(zmecz,ile_energia);
function zmecz(){ if(blok==0||blok_special==1){ energia[0]--; stan_ciala(); } }
function stan_ciala(){
	if(stan!=1&&energia[0]/energia[1]>0.8){
		stan=1; cialo.src=imgPath+"basic/cialo_max.png"; glowa.style.visibility="hidden";
		reka.style.marginTop="-10px"; reka.src=imgPath+"reka_max/1.png"; reka.style.marginLeft="0px"; reka.style.visibility="visible";
		if(mruganie){clearInterval(mruganie)}; if(mruganie_a){clearInterval(mruganie_a)}; mruganie=false; mruganie_a=false;
	}else if(stan!=2&&energia[0]/energia[1]>0.2&&energia[0]/energia[1]<=0.8){
		stan=2; cialo.src=imgPath+"basic/cialo.png"; glowa.style.visibility="visible";
		glowa.src=imgPath+"mruganie/1.png"; reka.src=imgPath+"reka/1.png"; reka.style.marginLeft="-2px"; reka.style.visibility="visible";
		if(mruganie){clearInterval(mruganie)}; if(mruganie_a){clearInterval(mruganie_a)}; mruganie_a=false;
		mruganie=setInterval(mrugaj, 4000); m_i=1;
	}else if(stan!=3&&energia[0]/energia[1]<=0.2){
		stan=3; cialo.src=imgPath+"basic/cialo_min.png"; glowa.style.visibility="visible";
		glowa.src=imgPath+"mruganie_min/1.png"; reka.src=imgPath+"reka_min/1.png"; reka.style.marginLeft="0px"; reka.style.visibility="visible";
		if(mruganie){clearInterval(mruganie)}; if(mruganie_a){clearInterval(mruganie_a)}; mruganie_a=false;
		mruganie=setInterval(mrugaj_min, 3500); m_i=1;
	}
}
