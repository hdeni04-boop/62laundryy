var CONFIG={
  WEB_APP_URL:(location.hostname==='localhost'||location.hostname==='127.0.0.1')?location.origin+'/exec':'https://script.google.com/macros/s/PASTE_ID_DISINI/exec',
  TOKEN:localStorage.getItem('laundry_token')||'GANTI_TOKEN_RAHASIA'
};
