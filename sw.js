if (!self.define) {
    const e = e => {
            "require" !== e && (e += ".js");
            let f = Promise.resolve();
            return r[e] || (f = new Promise(async f => {
                if ("document" in self) {
                    const r = document.createElement("script");
                    r.src = e, document.head.appendChild(r), r.onload = f
                } else importScripts(e), f()
            })), f.then(() => {
                if (!r[e]) throw new Error(`Module ${e} didn’t register its module`);
                return r[e]
            })
        },
        f = (f, r) => {
            Promise.all(f.map(e)).then(e => r(1 === e.length ? e[0] : e))
        },
        r = {
            require: Promise.resolve(f)
        };
    self.define = (f, a, d) => {
        r[f] || (r[f] = Promise.resolve().then(() => {
            let r = {};
            const i = {
                uri: location.origin + f.slice(1)
            };
            return Promise.all(a.map(f => {
                switch (f) {
                    case "exports":
                        return r;
                    case "module":
                        return i;
                    default:
                        return e(f)
                }
            })).then(e => {
                const f = d(...e);
                return r.default || (r.default = f), r
            })
        }))
    }
}
define("./sw.js", ["./workbox-ba6f53dd"], (function(e) {
    "use strict";
    e.skipWaiting(), e.precacheAndRoute([{
        url: "fa-brands-400.4d16fbfe.svg",
        revision: "ba7ed552362f64d30f6d844974d89114"
    }, {
        url: "fa-brands-400.76d38564.woff",
        revision: "099a9556e1a63ece24f8a99859c94c7d"
    }, {
        url: "fa-brands-400.d8d82559.ttf",
        revision: "3b89dd103490708d19a95adcae52210e"
    }, {
        url: "fa-brands-400.e5cf17a2.eot",
        revision: "30cc681d4487d2f561035ba24a68c629"
    }, {
        url: "fa-brands-400.fa2b50eb.woff2",
        revision: "f7307680c7fe85959f3ecf122493ea7d"
    }, {
        url: "fa-regular-400.1f18e0a2.woff2",
        revision: "f0f8230116992e521526097a28f54066"
    }, {
        url: "fa-regular-400.2be1b64f.svg",
        revision: "0bb428459c8ecfa61b22a03def1706e6"
    }, {
        url: "fa-regular-400.b8524921.eot",
        revision: "7630483dd4b0c48639d2ac54a894b450"
    }, {
        url: "fa-regular-400.d7f209fa.woff",
        revision: "7124eb50fc8227c78269f2d995637ff5"
    }, {
        url: "fa-regular-400.da848ba3.ttf",
        revision: "1f77739ca9ff2188b539c36f30ffa2be"
    }, {
        url: "fa-solid-900.102f442e.svg",
        revision: "376c1f97f6553dea1ca9b3f9081889bd"
    }, {
        url: "fa-solid-900.187d4d4b.woff",
        revision: "9fe5a17c8ab036d20e6c5ba3fd2ac511"
    }, {
        url: "fa-solid-900.4fe5d922.eot",
        revision: "1042e8ca1ce821518a2d3e7055410839"
    }, {
        url: "fa-solid-900.a633dba1.ttf",
        revision: "605ed7926cf39a2ad5ec2d1f9d391d3d"
    }, {
        url: "fa-solid-900.effee26e.woff2",
        revision: "e8a427e15cc502bef99cfd722b37ea98"
    }, {
        url: "favicon.56cb10d1.png",
        revision: "2028ea90964d793e83959f8df68982fc"
    }, {
        url: "icon-128x128.33cb3244.png",
        revision: "ddee7e9346951e029cbde11ec15982dc"
    }, {
        url: "icon-144x144.e68633be.png",
        revision: "e993ae727d3bf8365b503ca2fb094f3d"
    }, {
        url: "icon-152x152.a2c8dc06.png",
        revision: "f594a23890916df804576c3313160699"
    }, {
        url: "icon-192x192.a4e918ab.png",
        revision: "bd398a35dec0224994f8bbed93542fd8"
    }, {
        url: "icon-384x384.5644ab08.png",
        revision: "d3e05453f7217ab54b80f899e486e02c"
    }, {
        url: "icon-512x512.e832602b.png",
        revision: "d555be20f41fe4cac9ba55970625e08d"
    }, {
        url: "icon-72x72.4af79dc3.png",
        revision: "e5de60aa07aa7c7056b2ad61ce704ec6"
    }, {
        url: "icon-96x96.74e826c7.png",
        revision: "c260dde3fe297824a314298fa340ada0"
    }, {
        url: "index.html",
        revision: "6cc8c2d9eda5d4f4803e7bc565609e94"
    }, {
        url: "main.994deea0.js",
        revision: "fc7f51253fcb6301fe0705142bd0a8a3"
    }, {
        url: "main.d756249f.css",
        revision: "3a7139249952d8e0e9e8a8481f6fe3e3"
    }, {
        url: "og_image.f4108461.png",
        revision: "03c1492d061360c6d67eac0f5dd1ccd6"
    }], {}), e.cleanupOutdatedCaches(), e.initialize({})
}));
//# sourceMappingURL=sw.js.map