<<<<<<< HEAD
if(!self.define){let e,i={};const s=(s,a)=>(s=new URL(s+".js",a).href,i[s]||new Promise(i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()}).then(()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e}));self.define=(a,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const d=e=>s(e,c),r={module:{uri:c},exports:t,require:d};i[c]=Promise.all(a.map(e=>r[e]||d(e))).then(e=>(n(...e),t))}}define(["./workbox-4754cb34"],function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Bgimg.jpg",revision:"680864e44ea6497faf61cca6879f9f20"},{url:"/_next/app-build-manifest.json",revision:"d14e61a38967edd0ef9d3f801bfa086f"},{url:"/_next/static/chunks/139-7f4a2028270a3738.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/341.34f2b76c309db662.js",revision:"34f2b76c309db662"},{url:"/_next/static/chunks/381-5c8fa34b191ad26d.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/402-74be18e663725fbc.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/450.66d8d22cf4bcff84.js",revision:"66d8d22cf4bcff84"},{url:"/_next/static/chunks/472.a3826d29d6854395.js",revision:"a3826d29d6854395"},{url:"/_next/static/chunks/4bd1b696-989d33d1584df2ab.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/503-fd751b57b07cb503.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/604-c72796cfacfa7103.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/684-a89a5f065868209f.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/933-dd910414178763da.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/_not-found/page-7b137d85f9de4771.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/alarms/page-b46b58ce9b1dd828.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/dashboard/layout-061c41d8c267c82c.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/dashboard/page-416d66a055951740.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/help/chat/page-a624be81d0dd1f37.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/help/faq/loading-ef5f9febc8e47065.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/help/faq/page-1822fe0b035f6a36.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/help/feedback/page-4fb9e07e0ae40ef7.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/help/page-bec2ec01560d0ed7.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/layout-6593266e3e3f1471.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/login/page-67f21ce26496b1cd.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/notifications/page-7afe820b7ec2624d.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/offline/page-3a431396008bdb92.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/page-2242e2bf66f2c059.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/patient-info/page-c5a11aac5061242e.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/pharmacy-locator/page-331264b29fc7e535.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/prescriptions/add/page-90a3b5be7666959a.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/prescriptions/page-267b7e7123881215.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/reminders/page-dd8423e324c2c296.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/reports/page-6a18d1a726cb3383.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/settings/page-8c3afd25e02f6dbd.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/signup/page-8aff1e0409596cab.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/app/upload/page-10d8452819c51f9a.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/framework-6d868e9bc95e10d8.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/main-app-7f8129b44829cb0d.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/main-f629f0771c5da581.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/pages/_app-f49b2a5977e4bd4f.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/pages/_error-c67e5ae945ee3c40.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a776fa00f9d20611.js",revision:"e_znEM6U6dTlCHyV7y6iO"},{url:"/_next/static/css/3b8cf51cd0a1a443.css",revision:"3b8cf51cd0a1a443"},{url:"/_next/static/css/e928138dc489c8dd.css",revision:"e928138dc489c8dd"},{url:"/_next/static/e_znEM6U6dTlCHyV7y6iO/_buildManifest.js",revision:"72eb83c3b08557ad2a166837fbcf7a6e"},{url:"/_next/static/e_znEM6U6dTlCHyV7y6iO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/034d78ad42e9620c-s.woff2",revision:"be7c930fceb794521be0a68e113a71d8"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/29a4aea02fdee119-s.woff2",revision:"69d9d2cdadeab7225297d50fc8e48e8b"},{url:"/_next/static/media/29e7bbdce9332268-s.woff2",revision:"9e3ecbe4bb4c6f0b71adc1cd481c2bdc"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6c177e25b87fd9cd-s.woff2",revision:"4f9434d4845212443bbd9d102f1f5d7d"},{url:"/_next/static/media/6c9a125e97d835e1-s.woff2",revision:"889718d692d5bfc6019cbdfcb5cc106f"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8e9860b6e62d6359-s.woff2",revision:"01ba6c2a184b8cba08b0d57167664d75"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a1386beebedccca4-s.woff2",revision:"d3aa06d13d3cf9c0558927051f3cb948"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c3bc380753a8436c-s.woff2",revision:"5a1b7c983a9dc0a87a2ff138e07ae822"},{url:"/_next/static/media/db911767852bc875-s.woff2",revision:"9516f567cd80b0f418bba2f1299ed6d1"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/e4af272ccee01ff0-s.p.woff2",revision:"65850a373e258f1c897a2b3d75eb74de"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f10b8e9d91f3edcb-s.woff2",revision:"63af7d5e18e585fad8d0220e5d551da1"},{url:"/_next/static/media/fe0777f1195381cb-s.woff2",revision:"f2a04185547c36abfa589651236a9849"},{url:"/alarm.mp3",revision:"9a96db12d12b852c90465da644c93a32"},{url:"/amoxicillin-prescription.png",revision:"bb8a87b74a45344926ac7616dcfc9641"},{url:"/atorvastatin-prescription.png",revision:"a843d5c770f3d2900a0211d872bc508f"},{url:"/browserconfig.xml",revision:"b07a1ca2287cc207260c792b27e818da"},{url:"/ibuprofen-prescription.png",revision:"a65072d3237e90e0e661484775eee9cd"},{url:"/icon-192x192.png",revision:"486886fb83804624d871646b5e81c1b1"},{url:"/icon-512x512.png",revision:"7bcfe4059d4aaea6b362dd0986a89c7c"},{url:"/lisinopril-prescription.png",revision:"36106fb718330a1dce818a193a3c3099"},{url:"/manifest.json",revision:"a3a433750167f86dc9458b5711bec0b4"},{url:"/metformin-prescription.png",revision:"365b08c846e5c071698d41c39470873b"},{url:"/placeholder-logo.png",revision:"95d8d1a4a9bbcccc875e2c381e74064a"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"7ee6562646feae6d6d77e2c72e204591"},{url:"/placeholder.jpg",revision:"1e533b7b4545d1d605144ce893afc601"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/prescription-lisinopril.png",revision:"3bdf3db3498f642241136ed0c70a305c"},{url:"/prescription-ventolin.png",revision:"7dd9f793ca7db70c16348deba614bb77"},{url:"/professional-person.png",revision:"bffb48fc4cbc7347cf1b08583fd2c4d3"},{url:"/rxwings-logo.png",revision:"3b8c1e0702fcc0d2d12c95b461497719"},{url:"/screenshot-narrow.png",revision:"44a4118da9af22255bc6375f6a4c194b"},{url:"/screenshot-wide.png",revision:"a6952493b9b29c88edf6776eafd5f523"},{url:"/ventolin-prescription.png",revision:"ef7e26abdbb949773f8d04c5115827ee"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")},new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")},new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>!(self.origin===e.origin),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")});
=======
<<<<<<< HEAD
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};
=======
const CACHE_NAME = "rxmind-v1"
// Cache only guaranteed-available assets to avoid install failing
const urlsToCache = [
  "/",
  "/offline",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(urlsToCache.map((u) => cache.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  )
})
>>>>>>> dc5be7fae343000696ed53f8c2a00dc5f5d27b7d

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

<<<<<<< HEAD
  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };
=======
      return fetch(event.request).catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === "document") {
          return caches.match("/offline")
        }
      })
    })
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          })
        )
      )
      .then(() => self.clients.claim())
  )
})
>>>>>>> dc5be7fae343000696ed53f8c2a00dc5f5d27b7d

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-e43f5367'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
>>>>>>> c4e561e8b680d931d654f5ee126b50b8b5d840d0
