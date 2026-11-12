// The phone on the page: the driver app's Requests screen (navetto-driver-app) in miniature, playing on a loop: a
// request arrives under its guide sign, its facts appear, its route draws, Accept is tapped, the trip is accepted.
// Decorative: the trip is an example and the amount is blurred.
export function phone(t, mark) {
  const svg = (d) => `<svg viewBox="0 0 24 24">${d}</svg>`;
  return `<figure class="phone" aria-hidden="true">
    <div class="glass"><div class="app">
      <header class="a-head">
        <span class="a-brand">${mark('pm')}<span>avetto</span></span>
        <span class="a-title"><b>${t('Requests', 'Demandes')}</b><small>Marie Tremblay</small></span>
        <span class="a-bell">${svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16zM10 20.5a2 2 0 0 0 4 0"/>')}<i>1</i></span>
        <span class="a-avatar">M</span>
      </header>
      <div class="a-body">
        <p class="a-hint">${t('Trips near your home base that fit your car.', 'Des trajets près de ton port d’attache, qui conviennent à ta voiture.')}</p>
        <div class="a-sign"><div class="a-sign-in">
          <small>${t('From Rimouski, QC', 'De Rimouski, QC')}</small>
          <div class="a-sign-row">${svg('<path d="M12 21V5M5 11.5 12 4.5l7 7"/>')}<b>${t('Québec City', 'Québec')}<small>${t('Airport · YQB', 'Aéroport · YQB')}</small></b><strong>312<small> km</small></strong></div>
        </div></div>
        <div class="a-card">
          <i class="bolt l"></i><i class="bolt r"></i>
          <div class="a-pay"><b class="blur">418,60 $</b><span>${t('for you', 'pour toi')}</span></div>
          <p class="a-when">${t('Fri, Nov 20, 7:30 a.m.', 'ven. 20 nov., 7 h 30')}</p>
          <ul class="a-facts">
            <li>${svg('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M15.5 5.2a3.2 3.2 0 0 1 0 5.8M17.5 14.6c1.6.6 2.7 2 3 4.4"/>')}<span>${t('2 travellers', '2 passagers')}</span>${svg('<rect x="6" y="7" width="12" height="13" rx="2.5"/><path d="M9.5 7V4.5h5V7M9.5 11v5M14.5 11v5"/>')}<span>${t('3 bags', '3 bagages')}</span></li>
            <li>${svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')}<span>${t('About 3 h 10, arrives around 10:40 a.m.', 'Environ 3 h 10, arrivée vers 10 h 40')}</span></li>
            <li>${svg('<path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5"/>')}<span>${t('0 km from home', '0 km de la maison')}</span></li>
          </ul>
          <div class="a-map"><svg viewBox="0 0 300 76" preserveAspectRatio="none"><path class="a-line" d="M60 60 C 120 58, 170 34, 238 16"/><circle class="a-from" cx="60" cy="60" r="7"/><circle class="a-to" cx="238" cy="16" r="7"/></svg></div>
          <div class="a-acts"><span class="a-no">${t('Decline', 'Refuser')}</span><span class="a-yes">${t('Accept ride', 'Accepter')}</span></div>
        </div>
        <div class="a-toast">${svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>')}${t('Trip accepted. It’s in Trips.', 'Trajet accepté. Il est dans Trajets.')}</div>
      </div>
      <nav class="a-tabs">
        <span class="on">${svg('<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>')}${t('Requests', 'Demandes')}</span>
        <span class="a-trips">${svg('<path d="M5 16v-4l2-4.5h10L19 12v4M4 16h16v2.5H4zM7.5 13.5h.01M16.5 13.5h.01"/>')}${t('Trips', 'Trajets')}<i></i></span>
        <span>${svg('<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm0 0V6a2 2 0 0 1 2-2h10"/><circle cx="16" cy="13.5" r="1.2"/>')}${t('Earnings', 'Revenus')}</span>
      </nav>
    </div></div>
  </figure>`;
}

export const phoneCss = `
/* The visual: a soft panel, the road's centre line running down it, the phone on top. */
.visual{position:relative;display:grid;place-items:center;min-height:660px;border-radius:32px;background:#f4f5f2;overflow:hidden}
.lane{position:absolute;top:0;bottom:0;left:50%;width:6px;margin-left:-3px;background:repeating-linear-gradient(180deg,#f4b400 0 46px,transparent 46px 82px);animation:drive 2.4s linear infinite}
@keyframes drive{to{background-position:0 82px}}

/* The phone: the app drawn at 390 px wide, scaled into the frame by --k. */
.phone{position:relative;margin:0;padding:10px;border-radius:48px;background:#1c2226;--k:.74;--loop:10s;--ease:cubic-bezier(.2,.75,.2,1)}
.glass{width:calc(390px * var(--k));height:calc(790px * var(--k));border-radius:38px;overflow:hidden;background:#fff}
.app{width:390px;height:790px;transform:scale(var(--k));transform-origin:0 0;display:flex;flex-direction:column;background:#f0f0ec;font-size:17px;line-height:1.35}
.app svg{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.a-head{display:flex;align-items:center;gap:12px;padding:30px 18px 14px;background:#fff;border-bottom:1.5px solid #e3e5e0}
.a-brand{display:inline-flex;align-items:center;gap:1px;font:800 27px/1 Manrope,sans-serif}
.a-brand .mark{width:36px;height:36px}
.a-title{display:grid;line-height:1.1;margin-left:4px}
.a-title b{font-weight:800;font-size:21px}
.a-title small{font-size:13px;color:#6b756f}
.a-bell{position:relative;margin-left:auto;width:28px;height:28px}
.a-bell svg{width:28px;height:28px}
.a-bell i{position:absolute;top:-6px;right:-7px;min-width:18px;height:18px;border-radius:9px;background:#c8102e;color:#fff;font:800 11px/19px Overpass,sans-serif;font-style:normal;text-align:center;border:2px solid #fff;box-sizing:content-box;animation:badge var(--loop) var(--ease) infinite}
.a-avatar{display:grid;place-items:center;width:40px;height:40px;border-radius:9px;background:#f4b400;font-weight:800;font-size:17px}
.a-body{position:relative;flex:1;padding:16px 16px 0;overflow:hidden}
.a-hint{position:relative;padding-left:22px;font-size:14.5px;color:#55605a}
.a-hint::before{content:'';position:absolute;left:4px;top:6px;width:9px;height:9px;border-radius:50%;background:#0e7c55}
/* The guide sign: green, white border inset, the destination and the distance. */
.a-sign{margin-top:16px;padding:5px;border-radius:13px;background:#0e6b47;color:#fff;animation:sign var(--loop) var(--ease) infinite}
.a-sign-in{border:2.5px solid #fff;border-radius:9px;padding:12px 16px}
.a-sign-in>small{font-weight:800;font-size:14px}
.a-sign-row{display:flex;align-items:center;gap:14px;margin-top:4px}
.a-sign-row svg{width:30px;height:30px;stroke-width:3.4;flex:none}
.a-sign-row b{display:grid;font-weight:800;font-size:25px;line-height:1.1}
.a-sign-row b small{font-size:14px}
.a-sign-row strong{margin-left:auto;font-weight:800;font-size:38px;line-height:1}
.a-sign-row strong small{font-size:15px}
/* The card hangs under the sign, bolted. */
.a-card{position:relative;margin:0 14px;padding:16px 20px 18px;background:#fff;border:2.5px solid #1c2226;border-top:0;border-radius:0 0 12px 12px;transform-origin:top;animation:card var(--loop) var(--ease) infinite}
.bolt{position:absolute;top:8px;width:7px;height:7px;border-radius:50%;background:#8e9893}
.bolt.l{left:8px}.bolt.r{right:8px}
.a-pay{display:flex;align-items:baseline;gap:10px}
.a-pay b{font-weight:800;font-size:32px;line-height:1.1}
.a-pay span{font-size:15px;color:#55605a}
.blur{filter:blur(7px)}
.a-when{font-weight:800;font-size:17px;margin-top:8px}
.a-facts{list-style:none;display:grid;gap:7px;margin-top:10px;font-size:15px}
.a-facts li{display:flex;align-items:center;gap:8px}
.a-facts svg{width:20px;height:20px;flex:none;stroke-width:1.8}
.a-facts span+svg{margin-left:10px}
.a-facts li:nth-child(1){animation:f1 var(--loop) var(--ease) infinite}
.a-facts li:nth-child(2){animation:f2 var(--loop) var(--ease) infinite}
.a-facts li:nth-child(3){animation:f3 var(--loop) var(--ease) infinite}
.a-map{height:76px;margin-top:12px;border-radius:8px;background:#fff8ea}
.a-map svg{width:100%;height:100%}
.app .a-line{stroke:#f4b400;stroke-width:4;stroke-dasharray:220;stroke-dashoffset:220;animation:draw var(--loop) var(--ease) infinite}
.app .a-from{fill:#fff;stroke:#f4b400;stroke-width:3.5}
.app .a-to{fill:#f4b400;stroke:none;transform-box:fill-box;transform-origin:center;animation:land var(--loop) var(--ease) infinite}
.a-acts{display:grid;grid-template-columns:1fr 1.9fr;gap:12px;margin-top:14px}
.a-acts span{display:grid;place-items:center;min-height:50px;border-radius:14px;font-weight:800;font-size:17px}
.a-no{border:2.5px solid #8e9893;box-shadow:0 4px 0 #cfd3cf}
.a-yes{background:#f4b400;box-shadow:0 4px 0 #b88700;animation:tap var(--loop) ease infinite}
/* Accepted: a toast rises over the tab bar, Trips gets a dot. */
.a-toast{position:absolute;left:16px;right:16px;bottom:14px;display:flex;align-items:center;gap:10px;padding:13px 16px 11px;border-radius:12px;background:#1c2226;color:#fff;font-weight:800;font-size:15px;opacity:0;animation:toast var(--loop) var(--ease) infinite}
.a-toast svg{width:24px;height:24px;padding:3px;border-radius:50%;background:#0e7c55;stroke-width:3;flex:none}
.a-tabs{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border-top:1.5px solid #e3e5e0;padding:0 0 20px}
.a-tabs span{position:relative;display:grid;justify-items:center;gap:3px;padding-top:12px;font-weight:600;font-size:13px;color:#6b756f}
.a-tabs svg{width:26px;height:26px}
.a-tabs .on{color:#1c2226;font-weight:800}
.a-tabs .on::before{content:'';position:absolute;top:-1.5px;left:22%;right:22%;height:4px;border-radius:0 0 3px 3px;background:#f4b400}
.a-trips i{position:absolute;top:9px;left:58%;width:9px;height:9px;border-radius:50%;background:#c8102e;transform:scale(0);animation:dot var(--loop) var(--ease) infinite}

/* The scene, one 10 s loop: the sign arrives (0–7%), the card unfolds under it (5–14%), the facts appear (13–21%),
   the route draws (22–34%), Accept is tapped (55%), the toast rises and Trips gets a dot (58–88%), then it all
   leaves for the next request (90–100%). */
@keyframes sign{0%{opacity:0;transform:translateY(-24px)}7%,90%{opacity:1;transform:none}97%,100%{opacity:0;transform:translateY(-12px)}}
@keyframes card{0%,5%{opacity:0;transform:translateY(-30px) scaleY(.6)}14%,90%{opacity:1;transform:none}97%,100%{opacity:0;transform:translateY(-12px)}}
@keyframes f1{0%,13%{opacity:0;transform:translateY(6px)}17%,100%{opacity:1;transform:none}}
@keyframes f2{0%,15%{opacity:0;transform:translateY(6px)}19%,100%{opacity:1;transform:none}}
@keyframes f3{0%,17%{opacity:0;transform:translateY(6px)}21%,100%{opacity:1;transform:none}}
@keyframes draw{0%,22%{stroke-dashoffset:220}34%,100%{stroke-dashoffset:0}}
@keyframes land{0%,32%{transform:scale(0)}37%,100%{transform:none}}
@keyframes tap{0%,53%{transform:none;box-shadow:0 4px 0 #b88700}55%{transform:translateY(4px);box-shadow:0 0 0 #b88700}58%,100%{transform:none;box-shadow:0 4px 0 #b88700}}
@keyframes toast{0%,57%{opacity:0;transform:translateY(24px)}63%,86%{opacity:1;transform:none}91%,100%{opacity:0;transform:translateY(24px)}}
@keyframes dot{0%,60%{transform:scale(0)}65%,92%{transform:none}96%,100%{transform:scale(0)}}
@keyframes badge{0%{transform:scale(0)}6%{transform:scale(1.25)}10%,100%{transform:none}}
@media (max-width:560px){.phone{--k:.7}}
/* Without motion: the request as it stands, its route drawn. */
@media (prefers-reduced-motion:reduce){.a-toast{display:none}.app .a-line{stroke-dashoffset:0}}
`;
