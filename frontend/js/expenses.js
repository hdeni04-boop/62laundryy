/** Expenses — catat pengeluaran & hitung laba bersih (omzet - pengeluaran). */
var Expenses={render:function(){
  var u=JSON.parse(localStorage.getItem('laundry_user')||'{}');
  document.getElementById('app').innerHTML=
  '<section class=hd><div><h1>'+ic('money','lg')+' Pengeluaran & Laba Bersih</h1><p class=mut>Catat biaya operasional +62Laundry — laba = omzet − pengeluaran</p></div><button class="btn" id="exAdd">'+ic('plus')+' Catat Pengeluaran</button></section>'+
  '<div class="grid3" id="exKpi"></div><div id="exAddBox"></div>'+
  '<section class=card style="margin-top:14px;padding:6px 14px 14px"><h3 style="padding:12px 4px 4px">'+ic('clipboard')+' Riwayat Pengeluaran Terakhir</h3><table><thead><tr><th>Waktu</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Oleh</th></tr></thead><tbody id="exLog"></tbody></table></section>';
  var today=new Date().toISOString().slice(0,10);
  var load=function(){
    Promise.all([Api.call('dailyOmzet',{tanggal:today}),Api.call('listExpenses',{tanggal:today,limit:30})]).then(function(r){
      var om=r[0],ex=r[1];
      var k=[{cls:'danger',lbl:'Pengeluaran Hari Ini',num:rupiah(ex.pengeluaran_hari_ini)},{cls:'ok',lbl:'Laba Bersih Hari Ini',num:rupiah(om.laba_bersih)},{cls:'',lbl:'Pengeluaran Bulan Ini',num:rupiah(ex.pengeluaran_bulan_ini)}];
      document.getElementById('exKpi').innerHTML=k.map(function(x){return '<section class="card stat"><div class="chip '+x.cls+'">'+ic('money','lg')+'</div><div><div class="num">'+x.num+'</div><div class="lbl">'+x.lbl+'</div></div></section>';}).join('');
      document.getElementById('exLog').innerHTML=ex.items.map(function(t){return '<tr><td class="mut">'+t.timestamp+'</td><td><span class="badge b-DITERIMA">'+t.kategori+'</span></td><td class="mut">'+(t.keterangan||'-')+'</td><td><b>'+rupiah(t.jumlah)+'</b></td><td class="mut">'+t.oleh+'</td></tr>';}).join('')||'<tr><td colspan=5><div class="empty">Belum ada pengeluaran</div></td></tr>';
    }).catch(function(e){toast(e.message,false);});
  };
  document.getElementById('exAdd').onclick=function(){var b=document.getElementById('exAddBox');
    var cats=['Deterjen & Pewangi','Listrik & Air','Gaji Karyawan','Sewa Tempat','Perawatan Mesin','Plastik & Kemasan','Lain-lain'];
    b.innerHTML='<section class=card style="margin-top:14px"><div class=row><select id="exKat" style="flex:1">'+cats.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select><input id="exJml" type="number" min="0" step="500" placeholder="Jumlah (Rp)" style="width:180px"><input id="exKet" placeholder="Keterangan (cth: beli deterjen 1 galon)" style="flex:2"><button class="btn sm" id="exSave">'+ic('check')+' Simpan</button><button class="btn sm ghost" id="exBatal">Batal</button></div></section>';
    document.getElementById('exSave').onclick=function(){var j=Number(document.getElementById('exJml').value||0);if(j<=0)return toast('Jumlah wajib > 0',false);Api.call('addExpense',{kategori:document.getElementById('exKat').value,jumlah:j,keterangan:document.getElementById('exKet').value,oleh:u.nama||'',tanggal:today}).then(function(r){toast('Pengeluaran '+rupiah(j)+' dicatat');b.innerHTML='';load();}).catch(function(e){toast(e.message,false);});};
    document.getElementById('exBatal').onclick=function(){b.innerHTML='';};
  };
  load();
}};