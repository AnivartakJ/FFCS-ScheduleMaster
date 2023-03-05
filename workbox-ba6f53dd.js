define("./workbox-ba6f53dd.js", ["exports"], (function(t) {
    "use strict";
    try {
        self["workbox:core:5.1.3"] && _()
    } catch (t) {}
    const e = {
            googleAnalytics: "googleAnalytics",
            precache: "precache-v2",
            prefix: "workbox",
            runtime: "runtime",
            suffix: "undefined" != typeof registration ? registration.scope : ""
        },
        s = t => [e.prefix, t, e.suffix].filter(t => t && t.length > 0).join("-"),
        n = t => t || s(e.googleAnalytics),
        i = t => t || s(e.precache),
        r = t => t || s(e.runtime),
        a = t => new URL(String(t), location.href).href.replace(new RegExp("^" + location.origin), ""),
        c = (t, ...e) => {
            let s = t;
            return e.length > 0 && (s += " :: " + JSON.stringify(e)), s
        };
    class o extends Error {
        constructor(t, e) {
            super(c(t, e)), this.name = t, this.details = e
        }
    }
    const u = new Set;
    const h = (t, e) => t.filter(t => e in t),
        l = async ({
            request: t,
            mode: e,
            plugins: s = []
        }) => {
            const n = h(s, "cacheKeyWillBeUsed");
            let i = t;
            for (const t of n) i = await t.cacheKeyWillBeUsed.call(t, {
                mode: e,
                request: i
            }), "string" == typeof i && (i = new Request(i));
            return i
        },
        w = async ({
            cacheName: t,
            request: e,
            event: s,
            matchOptions: n,
            plugins: i = []
        }) => {
            const r = await self.caches.open(t),
                a = await l({
                    plugins: i,
                    request: e,
                    mode: "read"
                });
            let c = await r.match(a, n);
            for (const e of i)
                if ("cachedResponseWillBeUsed" in e) {
                    const i = e.cachedResponseWillBeUsed;
                    c = await i.call(e, {
                        cacheName: t,
                        event: s,
                        matchOptions: n,
                        cachedResponse: c,
                        request: a
                    })
                }
            return c
        },
        f = async ({
            cacheName: t,
            request: e,
            response: s,
            event: n,
            plugins: i = [],
            matchOptions: r
        }) => {
            const c = await l({
                plugins: i,
                request: e,
                mode: "write"
            });
            if (!s) throw new o("cache-put-with-no-response", {
                url: a(c.url)
            });
            const f = await (async ({
                request: t,
                response: e,
                event: s,
                plugins: n = []
            }) => {
                let i = e,
                    r = !1;
                for (const e of n)
                    if ("cacheWillUpdate" in e) {
                        r = !0;
                        const n = e.cacheWillUpdate;
                        if (i = await n.call(e, {
                                request: t,
                                response: i,
                                event: s
                            }), !i) break
                    }
                return r || (i = i && 200 === i.status ? i : void 0), i || null
            })({
                event: n,
                plugins: i,
                response: s,
                request: c
            });
            if (!f) return;
            const y = await self.caches.open(t),
                d = h(i, "cacheDidUpdate"),
                p = d.length > 0 ? await w({
                    cacheName: t,
                    matchOptions: r,
                    request: c
                }) : null;
            try {
                await y.put(c, f)
            } catch (t) {
                throw "QuotaExceededError" === t.name && await async function() {
                    for (const t of u) await t()
                }(), t
            }
            for (const e of d) await e.cacheDidUpdate.call(e, {
                cacheName: t,
                event: n,
                oldResponse: p,
                newResponse: f,
                request: c
            })
        },
        y = w,
        d = async ({
            request: t,
            fetchOptions: e,
            event: s,
            plugins: n = []
        }) => {
            if ("string" == typeof t && (t = new Request(t)), s instanceof FetchEvent && s.preloadResponse) {
                const t = await s.preloadResponse;
                if (t) return t
            }
            const i = h(n, "fetchDidFail"),
                r = i.length > 0 ? t.clone() : null;
            try {
                for (const e of n)
                    if ("requestWillFetch" in e) {
                        const n = e.requestWillFetch,
                            i = t.clone();
                        t = await n.call(e, {
                            request: i,
                            event: s
                        })
                    }
            } catch (t) {
                throw new o("plugin-error-request-will-fetch", {
                    thrownError: t
                })
            }
            const a = t.clone();
            try {
                let i;
                i = "navigate" === t.mode ? await fetch(t) : await fetch(t, e);
                for (const t of n) "fetchDidSucceed" in t && (i = await t.fetchDidSucceed.call(t, {
                    event: s,
                    request: a,
                    response: i
                }));
                return i
            } catch (t) {
                for (const e of i) await e.fetchDidFail.call(e, {
                    error: t,
                    event: s,
                    originalRequest: r.clone(),
                    request: a.clone()
                });
                throw t
            }
        };
    let p;
    async function g(t, e) {
        const s = t.clone(),
            n = {
                headers: new Headers(s.headers),
                status: s.status,
                statusText: s.statusText
            },
            i = e ? e(n) : n,
            r = function() {
                if (void 0 === p) {
                    const t = new Response("");
                    if ("body" in t) try {
                        new Response(t.body), p = !0
                    } catch (t) {
                        p = !1
                    }
                    p = !1
                }
                return p
            }() ? s.body : await s.blob();
        return new Response(r, i)
    }
    try {
        self["workbox:precaching:5.1.3"] && _()
    } catch (t) {}

    function m(t) {
        if (!t) throw new o("add-to-cache-list-unexpected-type", {
            entry: t
        });
        if ("string" == typeof t) {
            const e = new URL(t, location.href);
            return {
                cacheKey: e.href,
                url: e.href
            }
        }
        const {
            revision: e,
            url: s
        } = t;
        if (!s) throw new o("add-to-cache-list-unexpected-type", {
            entry: t
        });
        if (!e) {
            const t = new URL(s, location.href);
            return {
                cacheKey: t.href,
                url: t.href
            }
        }
        const n = new URL(s, location.href),
            i = new URL(s, location.href);
        return n.searchParams.set("__WB_REVISION__", e), {
            cacheKey: n.href,
            url: i.href
        }
    }
    class q {
        constructor(t) {
            this.t = i(t), this.s = new Map, this.i = new Map, this.o = new Map
        }
        addToCacheList(t) {
            const e = [];
            for (const s of t) {
                "string" == typeof s ? e.push(s) : s && void 0 === s.revision && e.push(s.url);
                const {
                    cacheKey: t,
                    url: n
                } = m(s), i = "string" != typeof s && s.revision ? "reload" : "default";
                if (this.s.has(n) && this.s.get(n) !== t) throw new o("add-to-cache-list-conflicting-entries", {
                    firstEntry: this.s.get(n),
                    secondEntry: t
                });
                if ("string" != typeof s && s.integrity) {
                    if (this.o.has(t) && this.o.get(t) !== s.integrity) throw new o("add-to-cache-list-conflicting-integrities", {
                        url: n
                    });
                    this.o.set(t, s.integrity)
                }
                if (this.s.set(n, t), this.i.set(n, i), e.length > 0) {
                    const t = `Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
                    console.warn(t)
                }
            }
        }
        async install({
            event: t,
            plugins: e
        } = {}) {
            const s = [],
                n = [],
                i = await self.caches.open(this.t),
                r = await i.keys(),
                a = new Set(r.map(t => t.url));
            for (const [t, e] of this.s) a.has(e) ? n.push(t) : s.push({
                cacheKey: e,
                url: t
            });
            const c = s.map(({
                cacheKey: s,
                url: n
            }) => {
                const i = this.o.get(s),
                    r = this.i.get(n);
                return this.u({
                    cacheKey: s,
                    cacheMode: r,
                    event: t,
                    integrity: i,
                    plugins: e,
                    url: n
                })
            });
            await Promise.all(c);
            return {
                updatedURLs: s.map(t => t.url),
                notUpdatedURLs: n
            }
        }
        async activate() {
            const t = await self.caches.open(this.t),
                e = await t.keys(),
                s = new Set(this.s.values()),
                n = [];
            for (const i of e) s.has(i.url) || (await t.delete(i), n.push(i.url));
            return {
                deletedURLs: n
            }
        }
        async u({
            cacheKey: t,
            url: e,
            cacheMode: s,
            event: n,
            plugins: i,
            integrity: r
        }) {
            const a = new Request(e, {
                integrity: r,
                cache: s,
                credentials: "same-origin"
            });
            let c, u = await d({
                event: n,
                plugins: i,
                request: a
            });
            for (const t of i || []) "cacheWillUpdate" in t && (c = t);
            if (!(c ? await c.cacheWillUpdate({
                    event: n,
                    request: a,
                    response: u
                }) : u.status < 400)) throw new o("bad-precaching-response", {
                url: e,
                status: u.status
            });
            u.redirected && (u = await g(u)), await f({
                event: n,
                plugins: i,
                response: u,
                request: t === e ? a : new Request(t),
                cacheName: this.t,
                matchOptions: {
                    ignoreSearch: !0
                }
            })
        }
        getURLsToCacheKeys() {
            return this.s
        }
        getCachedURLs() {
            return [...this.s.keys()]
        }
        getCacheKeyForURL(t) {
            const e = new URL(t, location.href);
            return this.s.get(e.href)
        }
        async matchPrecache(t) {
            const e = t instanceof Request ? t.url : t,
                s = this.getCacheKeyForURL(e);
            if (s) {
                return (await self.caches.open(this.t)).match(s)
            }
        }
        createHandler(t = !0) {
            return async ({
                request: e
            }) => {
                try {
                    const t = await this.matchPrecache(e);
                    if (t) return t;
                    throw new o("missing-precache-entry", {
                        cacheName: this.t,
                        url: e instanceof Request ? e.url : e
                    })
                } catch (s) {
                    if (t) return fetch(e);
                    throw s
                }
            }
        }
        createHandlerBoundToURL(t, e = !0) {
            if (!this.getCacheKeyForURL(t)) throw new o("non-precached-url", {
                url: t
            });
            const s = this.createHandler(e),
                n = new Request(t);
            return () => s({
                request: n
            })
        }
    }
    let R;
    const v = () => (R || (R = new q), R);
    const U = (t, e) => {
        const s = v().getURLsToCacheKeys();
        for (const n of function*(t, {
                ignoreURLParametersMatching: e,
                directoryIndex: s,
                cleanURLs: n,
                urlManipulation: i
            } = {}) {
                const r = new URL(t, location.href);
                r.hash = "", yield r.href;
                const a = function(t, e = []) {
                    for (const s of [...t.searchParams.keys()]) e.some(t => t.test(s)) && t.searchParams.delete(s);
                    return t
                }(r, e);
                if (yield a.href, s && a.pathname.endsWith("/")) {
                    const t = new URL(a.href);
                    t.pathname += s, yield t.href
                }
                if (n) {
                    const t = new URL(a.href);
                    t.pathname += ".html", yield t.href
                }
                if (i) {
                    const t = i({
                        url: r
                    });
                    for (const e of t) yield e.href
                }
            }(t, e)) {
            const t = s.get(n);
            if (t) return t
        }
    };
    let L = !1;

    function b(t) {
        L || ((({
            ignoreURLParametersMatching: t = [/^utm_/],
            directoryIndex: e = "index.html",
            cleanURLs: s = !0,
            urlManipulation: n
        } = {}) => {
            const r = i();
            self.addEventListener("fetch", i => {
                const a = U(i.request.url, {
                    cleanURLs: s,
                    directoryIndex: e,
                    ignoreURLParametersMatching: t,
                    urlManipulation: n
                });
                if (!a) return;
                let c = self.caches.open(r).then(t => t.match(a)).then(t => t || fetch(a));
                i.respondWith(c)
            })
        })(t), L = !0)
    }
    const x = [],
        E = {
            get: () => x,
            add(t) {
                x.push(...t)
            }
        },
        T = t => {
            const e = v(),
                s = E.get();
            t.waitUntil(e.install({
                event: t,
                plugins: s
            }).catch(t => {
                throw t
            }))
        },
        O = t => {
            const e = v();
            t.waitUntil(e.activate())
        };
    class N {
        constructor(t, e, {
            onupgradeneeded: s,
            onversionchange: n
        } = {}) {
            this.h = null, this.l = t, this.p = e, this.g = s, this.m = n || (() => this.close())
        }
        get db() {
            return this.h
        }
        async open() {
            if (!this.h) return this.h = await new Promise((t, e) => {
                let s = !1;
                setTimeout(() => {
                    s = !0, e(new Error("The open request was blocked and timed out"))
                }, this.OPEN_TIMEOUT);
                const n = indexedDB.open(this.l, this.p);
                n.onerror = () => e(n.error), n.onupgradeneeded = t => {
                    s ? (n.transaction.abort(), n.result.close()) : "function" == typeof this.g && this.g(t)
                }, n.onsuccess = () => {
                    const e = n.result;
                    s ? e.close() : (e.onversionchange = this.m.bind(this), t(e))
                }
            }), this
        }
        async getKey(t, e) {
            return (await this.getAllKeys(t, e, 1))[0]
        }
        async getAll(t, e, s) {
            return await this.getAllMatching(t, {
                query: e,
                count: s
            })
        }
        async getAllKeys(t, e, s) {
            return (await this.getAllMatching(t, {
                query: e,
                count: s,
                includeKeys: !0
            })).map(t => t.key)
        }
        async getAllMatching(t, {
            index: e,
            query: s = null,
            direction: n = "next",
            count: i,
            includeKeys: r = !1
        } = {}) {
            return await this.transaction([t], "readonly", (a, c) => {
                const o = a.objectStore(t),
                    u = e ? o.index(e) : o,
                    h = [],
                    l = u.openCursor(s, n);
                l.onsuccess = () => {
                    const t = l.result;
                    t ? (h.push(r ? t : t.value), i && h.length >= i ? c(h) : t.continue()) : c(h)
                }
            })
        }
        async transaction(t, e, s) {
            return await this.open(), await new Promise((n, i) => {
                const r = this.h.transaction(t, e);
                r.onabort = () => i(r.error), r.oncomplete = () => n(), s(r, t => n(t))
            })
        }
        async q(t, e, s, ...n) {
            return await this.transaction([e], s, (s, i) => {
                const r = s.objectStore(e),
                    a = r[t].apply(r, n);
                a.onsuccess = () => i(a.result)
            })
        }
        close() {
            this.h && (this.h.close(), this.h = null)
        }
    }
    N.prototype.OPEN_TIMEOUT = 2e3;
    const P = {
        readonly: ["get", "count", "getKey", "getAll", "getAllKeys"],
        readwrite: ["add", "put", "clear", "delete"]
    };
    for (const [t, e] of Object.entries(P))
        for (const s of e) s in IDBObjectStore.prototype && (N.prototype[s] = async function(e, ...n) {
            return await this.q(s, e, t, ...n)
        });
    try {
        self["workbox:background-sync:5.1.3"] && _()
    } catch (t) {}
    class S {
        constructor(t) {
            this.R = t, this.h = new N("workbox-background-sync", 3, {
                onupgradeneeded: this.v
            })
        }
        async pushEntry(t) {
            delete t.id, t.queueName = this.R, await this.h.add("requests", t)
        }
        async unshiftEntry(t) {
            const [e] = await this.h.getAllMatching("requests", {
                count: 1
            });
            e ? t.id = e.id - 1 : delete t.id, t.queueName = this.R, await this.h.add("requests", t)
        }
        async popEntry() {
            return this.U({
                direction: "prev"
            })
        }
        async shiftEntry() {
            return this.U({
                direction: "next"
            })
        }
        async getAll() {
            return await this.h.getAllMatching("requests", {
                index: "queueName",
                query: IDBKeyRange.only(this.R)
            })
        }
        async deleteEntry(t) {
            await this.h.delete("requests", t)
        }
        async U({
            direction: t
        }) {
            const [e] = await this.h.getAllMatching("requests", {
                direction: t,
                index: "queueName",
                query: IDBKeyRange.only(this.R),
                count: 1
            });
            if (e) return await this.deleteEntry(e.id), e
        }
        v(t) {
            const e = t.target.result;
            t.oldVersion > 0 && t.oldVersion < 3 && e.objectStoreNames.contains("requests") && e.deleteObjectStore("requests");
            e.createObjectStore("requests", {
                autoIncrement: !0,
                keyPath: "id"
            }).createIndex("queueName", "queueName", {
                unique: !1
            })
        }
    }
    const K = ["method", "referrer", "referrerPolicy", "mode", "credentials", "cache", "redirect", "integrity", "keepalive"];
    class k {
        constructor(t) {
            "navigate" === t.mode && (t.mode = "same-origin"), this.L = t
        }
        static async fromRequest(t) {
            const e = {
                url: t.url,
                headers: {}
            };
            "GET" !== t.method && (e.body = await t.clone().arrayBuffer());
            for (const [s, n] of t.headers.entries()) e.headers[s] = n;
            for (const s of K) void 0 !== t[s] && (e[s] = t[s]);
            return new k(e)
        }
        toObject() {
            const t = Object.assign({}, this.L);
            return t.headers = Object.assign({}, this.L.headers), t.body && (t.body = t.body.slice(0)), t
        }
        toRequest() {
            return new Request(this.L.url, this.L)
        }
        clone() {
            return new k(this.toObject())
        }
    }
    const D = new Set,
        M = t => {
            const e = {
                request: new k(t.requestData).toRequest(),
                timestamp: t.timestamp
            };
            return t.metadata && (e.metadata = t.metadata), e
        };
    class j {
        constructor(t, {
            onSync: e,
            maxRetentionTime: s
        } = {}) {
            if (this.T = !1, this._ = !1, D.has(t)) throw new o("duplicate-queue-name", {
                name: t
            });
            D.add(t), this.l = t, this.O = e || this.replayRequests, this.N = s || 10080, this.P = new S(this.l), this.S()
        }
        get name() {
            return this.l
        }
        async pushRequest(t) {
            await this.K(t, "push")
        }
        async unshiftRequest(t) {
            await this.K(t, "unshift")
        }
        async popRequest() {
            return this.k("pop")
        }
        async shiftRequest() {
            return this.k("shift")
        }
        async getAll() {
            const t = await this.P.getAll(),
                e = Date.now(),
                s = [];
            for (const n of t) {
                const t = 60 * this.N * 1e3;
                e - n.timestamp > t ? await this.P.deleteEntry(n.id) : s.push(M(n))
            }
            return s
        }
        async K({
            request: t,
            metadata: e,
            timestamp: s = Date.now()
        }, n) {
            const i = {
                requestData: (await k.fromRequest(t.clone())).toObject(),
                timestamp: s
            };
            e && (i.metadata = e), await this.P[n + "Entry"](i), this.T ? this._ = !0 : await this.registerSync()
        }
        async k(t) {
            const e = Date.now(),
                s = await this.P[t + "Entry"]();
            if (s) {
                const n = 60 * this.N * 1e3;
                return e - s.timestamp > n ? this.k(t) : M(s)
            }
        }
        async replayRequests() {
            let t;
            for (; t = await this.shiftRequest();) try {
                await fetch(t.request.clone())
            } catch (e) {
                throw await this.unshiftRequest(t), new o("queue-replay-failed", {
                    name: this.l
                })
            }
        }
        async registerSync() {
            if ("sync" in self.registration) try {
                await self.registration.sync.register("workbox-background-sync:" + this.l)
            } catch (t) {}
        }
        S() {
            "sync" in self.registration ? self.addEventListener("sync", t => {
                if (t.tag === "workbox-background-sync:" + this.l) {
                    const e = async () => {
                        let e;
                        this.T = !0;
                        try {
                            await this.O({
                                queue: this
                            })
                        } catch (t) {
                            throw e = t, e
                        } finally {
                            !this._ || e && !t.lastChance || await this.registerSync(), this.T = !1, this._ = !1
                        }
                    };
                    t.waitUntil(e())
                }
            }) : this.O({
                queue: this
            })
        }
        static get D() {
            return D
        }
    }
    class A {
        constructor(t, e) {
            this.fetchDidFail = async ({
                request: t
            }) => {
                await this.M.pushRequest({
                    request: t
                })
            }, this.M = new j(t, e)
        }
    }
    try {
        self["workbox:routing:5.1.3"] && _()
    } catch (t) {}
    const C = t => t && "object" == typeof t ? t : {
        handle: t
    };
    class I {
        constructor(t, e, s = "GET") {
            this.handler = C(e), this.match = t, this.method = s
        }
    }
    class B {
        constructor() {
            this.j = new Map
        }
        get routes() {
            return this.j
        }
        addFetchListener() {
            self.addEventListener("fetch", t => {
                const {
                    request: e
                } = t, s = this.handleRequest({
                    request: e,
                    event: t
                });
                s && t.respondWith(s)
            })
        }
        addCacheListener() {
            self.addEventListener("message", t => {
                if (t.data && "CACHE_URLS" === t.data.type) {
                    const {
                        payload: e
                    } = t.data, s = Promise.all(e.urlsToCache.map(t => {
                        "string" == typeof t && (t = [t]);
                        const e = new Request(...t);
                        return this.handleRequest({
                            request: e
                        })
                    }));
                    t.waitUntil(s), t.ports && t.ports[0] && s.then(() => t.ports[0].postMessage(!0))
                }
            })
        }
        handleRequest({
            request: t,
            event: e
        }) {
            const s = new URL(t.url, location.href);
            if (!s.protocol.startsWith("http")) return;
            const {
                params: n,
                route: i
            } = this.findMatchingRoute({
                url: s,
                request: t,
                event: e
            });
            let r, a = i && i.handler;
            if (!a && this.A && (a = this.A), a) {
                try {
                    r = a.handle({
                        url: s,
                        request: t,
                        event: e,
                        params: n
                    })
                } catch (t) {
                    r = Promise.reject(t)
                }
                return r instanceof Promise && this.C && (r = r.catch(n => this.C.handle({
                    url: s,
                    request: t,
                    event: e
                }))), r
            }
        }
        findMatchingRoute({
            url: t,
            request: e,
            event: s
        }) {
            const n = this.j.get(e.method) || [];
            for (const i of n) {
                let n;
                const r = i.match({
                    url: t,
                    request: e,
                    event: s
                });
                if (r) return n = r, (Array.isArray(r) && 0 === r.length || r.constructor === Object && 0 === Object.keys(r).length || "boolean" == typeof r) && (n = void 0), {
                    route: i,
                    params: n
                }
            }
            return {}
        }
        setDefaultHandler(t) {
            this.A = C(t)
        }
        setCatchHandler(t) {
            this.C = C(t)
        }
        registerRoute(t) {
            this.j.has(t.method) || this.j.set(t.method, []), this.j.get(t.method).push(t)
        }
        unregisterRoute(t) {
            if (!this.j.has(t.method)) throw new o("unregister-route-but-not-found-with-method", {
                method: t.method
            });
            const e = this.j.get(t.method).indexOf(t);
            if (!(e > -1)) throw new o("unregister-route-route-not-registered");
            this.j.get(t.method).splice(e, 1)
        }
    }
    try {
        self["workbox:strategies:5.1.3"] && _()
    } catch (t) {}
    const W = {
        cacheWillUpdate: async ({
            response: t
        }) => 200 === t.status || 0 === t.status ? t : null
    };
    class F {
        constructor(t = {}) {
            if (this.t = r(t.cacheName), t.plugins) {
                const e = t.plugins.some(t => !!t.cacheWillUpdate);
                this.I = e ? t.plugins : [W, ...t.plugins]
            } else this.I = [W];
            this.B = t.networkTimeoutSeconds || 0, this.W = t.fetchOptions, this.F = t.matchOptions
        }
        async handle({
            event: t,
            request: e
        }) {
            const s = [];
            "string" == typeof e && (e = new Request(e));
            const n = [];
            let i;
            if (this.B) {
                const {
                    id: r,
                    promise: a
                } = this.G({
                    request: e,
                    event: t,
                    logs: s
                });
                i = r, n.push(a)
            }
            const r = this.H({
                timeoutId: i,
                request: e,
                event: t,
                logs: s
            });
            n.push(r);
            let a = await Promise.race(n);
            if (a || (a = await r), !a) throw new o("no-response", {
                url: e.url
            });
            return a
        }
        G({
            request: t,
            logs: e,
            event: s
        }) {
            let n;
            return {
                promise: new Promise(e => {
                    n = setTimeout(async () => {
                        e(await this.J({
                            request: t,
                            event: s
                        }))
                    }, 1e3 * this.B)
                }),
                id: n
            }
        }
        async H({
            timeoutId: t,
            request: e,
            logs: s,
            event: n
        }) {
            let i, r;
            try {
                r = await d({
                    request: e,
                    event: n,
                    fetchOptions: this.W,
                    plugins: this.I
                })
            } catch (t) {
                i = t
            }
            if (t && clearTimeout(t), i || !r) r = await this.J({
                request: e,
                event: n
            });
            else {
                const t = r.clone(),
                    s = f({
                        cacheName: this.t,
                        request: e,
                        response: t,
                        event: n,
                        plugins: this.I
                    });
                if (n) try {
                    n.waitUntil(s)
                } catch (t) {}
            }
            return r
        }
        J({
            event: t,
            request: e
        }) {
            return y({
                cacheName: this.t,
                request: e,
                event: t,
                matchOptions: this.F,
                plugins: this.I
            })
        }
    }
    class G {
        constructor(t = {}) {
            this.I = t.plugins || [], this.W = t.fetchOptions
        }
        async handle({
            event: t,
            request: e
        }) {
            let s, n;
            "string" == typeof e && (e = new Request(e));
            try {
                n = await d({
                    request: e,
                    event: t,
                    fetchOptions: this.W,
                    plugins: this.I
                })
            } catch (t) {
                s = t
            }
            if (!n) throw new o("no-response", {
                url: e.url,
                error: s
            });
            return n
        }
    }
    try {
        self["workbox:google-analytics:5.1.3"] && _()
    } catch (t) {}
    const H = /^\/(\w+\/)?collect/,
        J = t => {
            const e = ({
                    url: t
                }) => "www.google-analytics.com" === t.hostname && H.test(t.pathname),
                s = new G({
                    plugins: [t]
                });
            return [new I(e, s, "GET"), new I(e, s, "POST")]
        },
        Q = t => {
            const e = new F({
                cacheName: t
            });
            return new I(({
                url: t
            }) => "www.google-analytics.com" === t.hostname && "/analytics.js" === t.pathname, e, "GET")
        },
        V = t => {
            const e = new F({
                cacheName: t
            });
            return new I(({
                url: t
            }) => "www.googletagmanager.com" === t.hostname && "/gtag/js" === t.pathname, e, "GET")
        },
        $ = t => {
            const e = new F({
                cacheName: t
            });
            return new I(({
                url: t
            }) => "www.googletagmanager.com" === t.hostname && "/gtm.js" === t.pathname, e, "GET")
        };
    t.cleanupOutdatedCaches = function() {
        self.addEventListener("activate", t => {
            const e = i();
            t.waitUntil((async (t, e = "-precache-") => {
                const s = (await self.caches.keys()).filter(s => s.includes(e) && s.includes(self.registration.scope) && s !== t);
                return await Promise.all(s.map(t => self.caches.delete(t))), s
            })(e).then(t => {}))
        })
    }, t.initialize = (t = {}) => {
        const e = n(t.cacheName),
            s = new A("workbox-google-analytics", {
                maxRetentionTime: 2880,
                onSync: (i = t, async ({
                    queue: t
                }) => {
                    let e;
                    for (; e = await t.shiftRequest();) {
                        const {
                            request: s,
                            timestamp: n
                        } = e, r = new URL(s.url);
                        try {
                            const t = "POST" === s.method ? new URLSearchParams(await s.clone().text()) : r.searchParams,
                                e = n - (Number(t.get("qt")) || 0),
                                a = Date.now() - e;
                            if (t.set("qt", String(a)), i.parameterOverrides)
                                for (const e of Object.keys(i.parameterOverrides)) {
                                    const s = i.parameterOverrides[e];
                                    t.set(e, s)
                                }
                            "function" == typeof i.hitFilter && i.hitFilter.call(null, t), await fetch(new Request(r.origin + r.pathname, {
                                body: t.toString(),
                                method: "POST",
                                mode: "cors",
                                credentials: "omit",
                                headers: {
                                    "Content-Type": "text/plain"
                                }
                            }))
                        } catch (s) {
                            throw await t.unshiftRequest(e), s
                        }
                    }
                })
            });
        var i;
        const r = [$(e), Q(e), V(e), ...J(s)],
            a = new B;
        for (const t of r) a.registerRoute(t);
        a.addFetchListener()
    }, t.precacheAndRoute = function(t, e) {
        ! function(t) {
            v().addToCacheList(t), t.length > 0 && (self.addEventListener("install", T), self.addEventListener("activate", O))
        }(t), b(e)
    }, t.skipWaiting = function() {
        self.addEventListener("install", () => self.skipWaiting())
    }
}));
//# sourceMappingURL=workbox-ba6f53dd.js.map