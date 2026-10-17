/** Dasbor — kartu KPI, grafik 7 hari, sebaran status, aksi cepat. */
var Dashboard={render:function(){var u=JSON.parse(localStorage.getItem('laundry_user')||'{}');
document.getElementById('app').innerHTML=
'<section class=hd><div><h1>Halo, '+(u.nama||'Kasir')+' '+ic('spark','lg')+'</h1><p class=mut>Ringkasan +62Laundry hari ini — '+new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+'</p></div>'+
'<div class=row><a href="#/pos"><button class="btn">'+ic('plus')+' Order Baru</button></a><a href="#/laporan"><button class="btn ghost">'+ic('chart')+' Laporan</button></a></div></section>'+
'<div class="grid4" id="kpi"></div>'+'<section class="card" style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding:14px 18px"><div><div style="font-size:12.5px;color:var(--mut)">Laba Bersih Hari Ini (omzet - pengeluaran)</div><div class="num" id="kpiLaba" style="font-size:26px;font-weight:800;margin-top:4px">—</div></div><div class="chip ok">'+ic('chart','lg')+'</div></section>'+
'<div class="grid2" style="margin-top:14px"><section class=card><h3>'+ic('chart')+' Omzet 7 Hari</h3><div class=bars id="bars7"></div></section>'+
'<section class=card><h3>'+ic('clipboard')+' Sebaran Status</h3><div class=row id="stChips"></div><h3 style="margin-top:14px">'+ic('spark')+' Aksi Cepat</h3><div class=row>'+
'<a href="#/orders"><button class="btn ghost sm">'+ic('clock')+' Pesanan Aktif</button></a>'+
'<a href="#/customers"><button class="btn ghost sm">'+ic('users')+' Pelanggan</button></a>'+
'<button class="btn ghost sm" id="qTrack">'+ic('search')+' Lacak Nota</button></div></section></div>';
document.getElementById('qTrack').onclick=function(){location.hash='#/tracking';};
Api.call('dashboard',{}).then(Dashboard.draw).catch(function(e){toast(e.message);});},
draw:function(d){
var k=[
{icon:'money',cls:'',lbl:'Omzet Hari Ini',num:rupiah(d.omzet_hari_ini)},
{icon:'clipboard',cls:'warn',lbl:'Order Masuk Hari Ini',num:d.order_hari_ini},
{icon:'bell',cls:'ok',lbl:'Siap Diambil',num:d.siap_diambil},
{icon:'clock',cls:'danger',lbl:'Belum Lunas',num:d.belum_lunas}];
document.getElementById('kpi').innerHTML=k.map(function(x){return '<section class="card stat"><div class="chip '+x.cls+'">'+ic(x.icon,'lg')+'</div><div><div class="num">'+x.num+'</div><div class="lbl">'+ic('dot')+x.lbl+'</div></div></section>';}).join('');var _l=document.getElementById('kpiLaba');if(_l){_l.textContent=rupiah(d.laba_bersih);_l.style.color=(d.laba_bersih||0)<0?'var(--danger)':'';}
var mx=Math.max.apply(null,d.stats7.map(function(s){return s.total_omzet;}).concat([1]));
document.getElementById('bars7').innerHTML=d.stats7.map(function(s){return '<div class="b"><em>'+Math.round(s.total_omzet/1000)+'k</em><i style="height:'+Math.max(4,Math.round(s.total_omzet/mx*100))+'%"></i><span>'+s.tanggal.slice(8)+'</span></div>';}).join('');
document.getElementById('stChips').innerHTML=Object.keys(d.status_counts).map(function(s){return '<button class="chip" data-st="'+s+'">'+pill(s)+' <b>'+d.status_counts[s]+'</b></button>';}).join('');document.querySelectorAll('[data-st]').forEach(function(b){b.onclick=function(){sessionStorage.setItem('ordSt',b.dataset.st);location.hash='#/orders';if(location.hash==='#/orders')router();};});}};
