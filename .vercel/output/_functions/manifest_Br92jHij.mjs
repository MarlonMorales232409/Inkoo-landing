import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_BVjB27pg.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DU9mn8GQ.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///media/Data/projects/Kazecode/Inkoo-landing/","cacheDir":"file:///media/Data/projects/Kazecode/Inkoo-landing/node_modules/.astro/","outDir":"file:///media/Data/projects/Kazecode/Inkoo-landing/dist/","srcDir":"file:///media/Data/projects/Kazecode/Inkoo-landing/src/","publicDir":"file:///media/Data/projects/Kazecode/Inkoo-landing/public/","buildClientDir":"file:///media/Data/projects/Kazecode/Inkoo-landing/dist/client/","buildServerDir":"file:///media/Data/projects/Kazecode/Inkoo-landing/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send.ts","pathname":"/api/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/media/Data/projects/Kazecode/Inkoo-landing/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/send@_@ts":"pages/api/send.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Br92jHij.mjs","/media/Data/projects/Kazecode/Inkoo-landing/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Pm13jINX.mjs","/media/Data/projects/Kazecode/Inkoo-landing/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CpWxba8O.js","/media/Data/projects/Kazecode/Inkoo-landing/src/components/organisms/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.DTVrj-1u.js","/media/Data/projects/Kazecode/Inkoo-landing/src/components/organisms/ContactForm.astro?astro&type=script&index=0&lang.ts":"_astro/ContactForm.astro_astro_type_script_index_0_lang.C3vJTNwK.js","/media/Data/projects/Kazecode/Inkoo-landing/src/components/sections/FAQ.astro?astro&type=script&index=0&lang.ts":"_astro/FAQ.astro_astro_type_script_index_0_lang.CCNCvzIe.js","/media/Data/projects/Kazecode/Inkoo-landing/src/components/organisms/ScrollToTop.astro?astro&type=script&index=0&lang.ts":"_astro/ScrollToTop.astro_astro_type_script_index_0_lang.BwnrTCvb.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/media/Data/projects/Kazecode/Inkoo-landing/src/components/organisms/Navbar.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"main-navbar\"),m=document.getElementById(\"mobile-menu-btn\"),o=document.getElementById(\"mobile-menu\"),u=document.getElementById(\"mobile-menu-close\"),l=document.getElementById(\"menu-icon\"),a=document.getElementById(\"close-icon\"),b=document.querySelectorAll(\".mobile-link\"),e=document.getElementById(\"floating-menu-btn\"),v=document.getElementById(\"floating-menu-trigger\");function c(){if(!o)return;o.classList.add(\"translate-x-full\"),l?.classList.remove(\"hidden\"),a?.classList.add(\"hidden\"),document.body.style.overflow=\"auto\";const t=window.innerWidth<768,s=n?.style.transform===\"translateY(-100%)\";t&&s&&e&&(e.classList.remove(\"opacity-0\",\"pointer-events-none\"),e.classList.add(\"opacity-100\",\"pointer-events-auto\"))}function r(){o&&(o.classList.remove(\"translate-x-full\"),l?.classList.add(\"hidden\"),a?.classList.remove(\"hidden\"),document.body.style.overflow=\"hidden\",e&&(e.classList.remove(\"opacity-100\",\"pointer-events-auto\"),e.classList.add(\"opacity-0\",\"pointer-events-none\")))}v?.addEventListener(\"click\",r);let i=0;function d(){if(!n)return;const t=window.scrollY,s=window.innerWidth<768;Math.abs(t-i)>50&&(t>i&&t>100?(n.style.transform=\"translateY(-100%)\",s&&e&&(e.classList.remove(\"opacity-0\",\"pointer-events-none\"),e.classList.add(\"opacity-100\",\"pointer-events-auto\"))):(n.style.transform=\"translateY(0)\",e&&(e.classList.remove(\"opacity-100\",\"pointer-events-auto\"),e.classList.add(\"opacity-0\",\"pointer-events-none\"))),i=t),t<10?(n.classList.remove(\"bg-inkoo-black/90\",\"backdrop-blur-md\",\"border-b\",\"border-white/10\",\"shadow-sm\"),n.classList.add(\"bg-transparent\")):(n.classList.remove(\"bg-transparent\"),n.classList.add(\"bg-inkoo-black/90\",\"backdrop-blur-md\",\"border-b\",\"border-white/10\",\"shadow-sm\"))}window.addEventListener(\"scroll\",()=>{window.requestAnimationFrame(d)});d();m?.addEventListener(\"click\",r);u?.addEventListener(\"click\",c);b.forEach(t=>{t.addEventListener(\"click\",c)});"],["/media/Data/projects/Kazecode/Inkoo-landing/src/components/organisms/ContactForm.astro?astro&type=script&index=0&lang.ts","const L=document.getElementById(\"metodo-contacto\"),n=document.getElementById(\"contacto-dato\"),o=document.getElementById(\"contacto-label\");L?.addEventListener(\"change\",t=>{const s=t.target;s.value===\"email\"?(n&&(n.type=\"email\",n.placeholder=\"tu@email.com\"),o&&(o.innerHTML='Tu Email <span class=\"text-red-500\">*</span>')):s.value===\"whatsapp\"&&(n&&(n.type=\"tel\",n.placeholder=\"+34 600 000 000\"),o&&(o.innerHTML='Tu WhatsApp <span class=\"text-red-500\">*</span>'))});const e=document.getElementById(\"adjuntos\"),a=document.getElementById(\"file-label\"),m=document.getElementById(\"clear-files-btn\");function u(){if(e.files&&e.files.length>0){const t=e.files.length;a&&(a.textContent=t===1?e.files[0].name:`${t} archivos seleccionados`),m?.classList.remove(\"hidden\")}else a&&(a.textContent=\"Haz clic para subir imágenes\"),m?.classList.add(\"hidden\")}e?.addEventListener(\"change\",u);m?.addEventListener(\"click\",()=>{e&&(e.value=\"\",u())});const l=document.getElementById(\"contact-form\"),i=document.getElementById(\"submit-btn\"),g=document.getElementById(\"btn-text\"),p=document.getElementById(\"btn-spinner\"),r=document.getElementById(\"form-success\"),d=document.getElementById(\"form-error\"),c=document.getElementById(\"error-text\");l?.addEventListener(\"submit\",async t=>{t.preventDefault(),r?.classList.add(\"hidden\"),d?.classList.add(\"hidden\"),i&&(i.disabled=!0),g?.classList.add(\"hidden\"),p?.classList.remove(\"hidden\");try{const s=new FormData(l),f=await fetch(\"/api/send\",{method:\"POST\",body:s}),h=await f.json();f.ok&&h.success?(r?.classList.remove(\"hidden\"),setTimeout(()=>r?.classList.add(\"hidden\"),3e3),l.reset(),u()):(c&&(c.textContent=`❌ ${h.error||\"Error al enviar. Inténtalo de nuevo.\"}`),d?.classList.remove(\"hidden\"),setTimeout(()=>d?.classList.add(\"hidden\"),3e3))}catch{c&&(c.textContent=\"❌ Error de conexión. Comprueba tu internet e inténtalo de nuevo.\"),d?.classList.remove(\"hidden\"),setTimeout(()=>d?.classList.add(\"hidden\"),3e3)}finally{i&&(i.disabled=!1),g?.classList.remove(\"hidden\"),p?.classList.add(\"hidden\")}});"],["/media/Data/projects/Kazecode/Inkoo-landing/src/components/sections/FAQ.astro?astro&type=script&index=0&lang.ts","function i(){const s=document.querySelectorAll(\".faq-item\");s.forEach(n=>{const t=n.querySelector(\".faq-question\");t&&(t.addEventListener(\"click\",()=>{const e=n.classList.contains(\"active\");s.forEach(a=>{if(a!==n){a.classList.remove(\"active\");const o=a.querySelector(\".faq-question\");o&&o.setAttribute(\"aria-expanded\",\"false\")}}),n.classList.toggle(\"active\"),t.setAttribute(\"aria-expanded\",e?\"false\":\"true\")}),t.addEventListener(\"keydown\",e=>{e instanceof KeyboardEvent&&(e.key===\"Enter\"||e.key===\" \")&&(e.preventDefault(),t.click())}))})}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",i):i();document.addEventListener(\"astro:page-load\",i);"],["/media/Data/projects/Kazecode/Inkoo-landing/src/components/organisms/ScrollToTop.astro?astro&type=script&index=0&lang.ts","function o(){const e=document.getElementById(\"scroll-to-top\");if(!e)return;const t=()=>{window.scrollY>400?e.classList.add(\"visible\"):e.classList.remove(\"visible\")},s=()=>{window.scrollTo({top:0,behavior:\"smooth\"})};window.addEventListener(\"scroll\",t,{passive:!0}),e.addEventListener(\"click\",s),t()}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",o):o();document.addEventListener(\"astro:page-load\",o);"]],"assets":["/_astro/hero-press.DEi-s-L7.png","/_astro/construction-uniform.BRHeiwwk.png","/_astro/gym-tshirt.CcCRD2cz.png","/_astro/festival-merch.CLuYwRm_.png","/_astro/inkoosub_qr.D1FgO6_1.png","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-cyrillic-800-normal.C7MGvYyJ.woff2","/_astro/inter-cyrillic-ext-800-normal.BZOjs1Xv.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-greek-800-normal.CLIouy3y.woff2","/_astro/inter-vietnamese-800-normal.Cm7tD1pz.woff2","/_astro/inter-latin-800-normal.BYj_oED-.woff2","/_astro/inter-greek-ext-800-normal.B--PVpEC.woff2","/_astro/inter-latin-ext-800-normal.DZJjya6U.woff2","/_astro/inter-greek-ext-600-normal.DRtmH8MT.woff2","/_astro/inter-greek-600-normal.plRanbMR.woff2","/_astro/inter-cyrillic-600-normal.CWCymEST.woff2","/_astro/inter-cyrillic-ext-600-normal.Dfes3d0z.woff2","/_astro/outfit-latin-ext-700-normal.CI4iH74K.woff2","/_astro/inter-vietnamese-600-normal.Cc8MFFhd.woff2","/_astro/inter-latin-ext-600-normal.D2bJ5OIk.woff2","/_astro/inter-latin-600-normal.LgqL8muc.woff2","/_astro/outfit-latin-700-normal.Cu9v6i1X.woff2","/_astro/outfit-latin-ext-900-normal.D2Agn9b_.woff2","/_astro/outfit-latin-400-normal.BGsTXAXT.woff2","/_astro/outfit-latin-900-normal.D7VxKg29.woff2","/_astro/outfit-latin-ext-400-normal.5tcqmc2S.woff2","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-cyrillic-800-normal.CCHyn08d.woff","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-greek-800-normal.BU00tryP.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-vietnamese-800-normal.DDlpr_Ee.woff","/_astro/inter-cyrillic-ext-800-normal.Ca-gJeZY.woff","/_astro/inter-greek-600-normal.BZpKdvQh.woff","/_astro/inter-greek-ext-600-normal.B8X0CLgF.woff","/_astro/inter-latin-800-normal.D1mf63XC.woff","/_astro/inter-greek-ext-800-normal.DUe57HfS.woff","/_astro/inter-latin-ext-800-normal.BOMpwxm3.woff","/_astro/outfit-latin-ext-700-normal.fjS8-Gm7.woff","/_astro/inter-vietnamese-600-normal.BuLX-rYi.woff","/_astro/inter-cyrillic-ext-600-normal.Bcila6Z-.woff","/_astro/inter-cyrillic-600-normal.4D_pXhcN.woff","/_astro/outfit-latin-ext-900-normal.P1LUQYP8.woff","/_astro/outfit-latin-700-normal.D4itBLBr.woff","/_astro/inter-latin-ext-600-normal.CIVaiw4L.woff","/_astro/inter-latin-600-normal.CiBQ2DWP.woff","/_astro/outfit-latin-400-normal.DMwTpYkH.woff","/_astro/outfit-latin-900-normal.DBTzQ72N.woff","/_astro/outfit-latin-ext-400-normal.DHm7mdGe.woff","/_astro/index.DdbZqIIB.css","/favicon.svg","/_astro/Layout.DvB2Xm2x.css","/_astro/Layout.astro_astro_type_script_index_0_lang.CpWxba8O.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"mh2t4grh2RggY0gBenKoCg6gYE53vn/02xHyyXz/i+U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
