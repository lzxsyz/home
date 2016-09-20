(function() {
    var H = navigator.userAgent.indexOf("MSIE") != -1 && !window.opera;
    var E = (document.compatMode == "BackCompat");
    function Q(C) {
        return document.getElementById(C)
    }
    function B(C) {
        return document.createElement(C)
    }
    function I(G, R, C) {
        if (H) {
            G.attachEvent("on" + R, (function(S) {
                return function() {
                    C.call(S)
                }
            })(G))
        } else {
            G.addEventListener(R, C, false)
        }
    }
    function D(C) {
        if (H) {
            C.returnValue = false
        } else {
            C.preventDefault()
        }
    }
    function J(C, R) {
        var S = document.styleSheets;
        if (!S || S.length <= 0) {
            var G = document.createElement("STYLE");
            G.type = "text/css";
            var T = document.getElementsByTagName("HEAD")[0];
            T.appendChild(G)
        }
        S = document.styleSheets;
        S = S[S.length - 1];
        if (H) {
            S.addRule(C, R)
        } else {
            S.insertRule(C + " { " + R + " }", S.cssRules.length)
        }
    }
    var L = (function() {
        function C(V) {
            var T = this.__MSG_QS__;
            if (!T[V]) {
                T[V] = []
            }
            for (var U = 1,
            R = arguments.length,
            S; U < R; U++) {
                T[V].push(arguments[U])
            }
        }
        function G(S) {
            var T = this.__MSG_QS__[S.type];
            if (T == null) {
                return
            }
            for (var U = 0,
            R = T.length; U < R; U++) {
                T[U].rm(S)
            }
        }
        return {
            ini: function(R) {
                R.__MSG_QS__ = {};
                R.on = C;
                R.dm = G;
                return R
            }
        }
    })();
    var P = (function() {
        var U = Q("kw");
        var C;
        var d = 0;
        var b = 0;
        var S = "";
        var Z = "";
        var c;
        var X = false;
        var V = true;
        function e() {
            if (V) {
                P.dm({
                    type: "start"
                });
                V = false
            }
        }
        function a(R) {
            if (V) {
                P.dm({
                    type: "start"
                });
                V = false
            }
            R = R || window.event;
            if (R.keyCode == 9 || R.keyCode == 27) {
                P.dm({
                    type: "hide_div"
                })
            }
            if (R.keyCode == 13) {
                D(R);
                P.dm({
                    type: "key_enter"
                })
            }
            if (C.style.display != "none") {
                if (R.keyCode == 38) {
                    D(R);
                    P.dm({
                        type: "key_up"
                    })
                }
                if (R.keyCode == 40) {
                    P.dm({
                        type: "key_down"
                    })
                }
            } else {
                if (R.keyCode == 38 || R.keyCode == 40) {
                    P.dm({
                        type: "need_data",
                        wd: U.value
                    })
                }
            }
        }
        function G() {
            var R = U.value;
            if (R == S && R != "" && R != Z && R != c) {
                if (b == 0) {
                    b = setTimeout(function() {
                        P.dm({
                            type: "need_data",
                            wd: R
                        })
                    },
                    100)
                }
            } else {
                clearTimeout(b);
                b = 0;
                S = R;
                if (R == "") {
                    P.dm({
                        type: "hide_div"
                    })
                }
                if (Z != U.value) {
                    Z = ""
                }
            }
        }
        function f() {
            d = setInterval(G, 10)
        }
        function W() {
            //clearInterval(d)
        }
        function Y() {
            if (X) {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
                X = false
            }
        }
        function T(R) {
            U.blur();
            U.setAttribute("autocomplete", R);
            U.focus()
        }
        U.setAttribute("autocomplete", "off");
        I(U, "keydown", a);
        I(U, "mousedown", e);
        I(U, "beforedeactivate", Y);
        return L.ini({
            rm: function(R) {
                switch (R.type) {
                case "div_ready":
                    C = R.sdiv;
                    Z = U.value;
                    f();
                    break;
                case "clk_submit":
                    W();
                    U.blur();
                    U.value = R.wd;
                    break;
                case "ent_submit":
                    W();
                    U.blur();
                    break;
                case "key_select":
                    c = R.selected;
                    break;
                case "close":
                    W();
                    T("on");
                    break;
                case "mousedown_tr":
                    X = true;
                    break
                }
            }
        })
    })();
    var K = (function() {
        var e;
        var X = Q("kw");
        var i;
        var a = -1;
        var C;
        var j;
        var l;
        function k() {
            var S = i.rows;
            for (var R = 0; R < S.length; R++) {
                S[R].className = "ml"
            }
        }
        function b() {
            if (typeof(i) != "undefined" && i != null && e.style.display != "none") {
                var S = i.rows;
                for (var R = 0; R < S.length; R++) {
                    if (S[R].className == "mo") {
                        return [R, S[R].cells[0].innerHTML]
                    }
                }
            }
            return [ - 1, ""]
        }
        function f() {
            if (H) {
                l.style.display = "none"
            }
            e.style.display = "none"
        }
        function G() {
            k();
            this.className = "mo"
        }
        function Y(R) {
            K.dm({
                type: "mousedown_tr"
            });
            if (!H) {
                R.stopPropagation();
                R.preventDefault();
                return false
            }
        }
        function Z(R) {
            var S = R;
            return function() {
                var T = C[S];
                f();
                K.dm({
                    type: "clk_submit",
                    oq: Q("kw").value,
                    wd: T,
                    rsp: S
                })
            }
        }
        function c(R) {
            R = R || window.event;
            D(R);
            K.dm({
                type: "close"
            });
            f(); (new Image()).src = "http://s.baidu.com/w.gif?fm=suggestion&title=%B9%D8%B1%D5&t=" + new Date().getTime()
        }
        function V() {
            var R = [X.offsetWidth, X.offsetHeight];
            e.style.width = ((H && E) ? R[0] : R[0] - 2) + "px";
            e.style.top = ((H && E) ? R[1] : R[1] - 1) + "px";
            e.style.display = "block"
        }
        function g() {
            i = B("TABLE");
            i.id = "st";
            i.cellSpacing = 0;
            i.cellPadding = 2;
            var n = B("tbody");
            i.appendChild(n);
            for (var o = 0,
            U = C.length; o < U; o++) {
                var T = n.insertRow( - 1);
                I(T, "mouseover", G);
                I(T, "mouseout", k);
                I(T, "mousedown", Y);
                I(T, "click", Z(o));
                var S = T.insertCell( - 1);
                S.innerHTML = C[o].replace(/&/g, "&amp;")
            }
            var m = n.insertRow( - 1);
            I(m, "mousedown", Y);
            var S = m.insertCell( - 1);
            S.style.textAlign = "right";
            var R = B("A");
            R.href = "javascript:void(0)";
            R.innerHTML = "\u5173\u95ed";
            R.style.fontSize = "14px";
            I(R, "click", c);
            S.appendChild(R);
            e.innerHTML = "";
            e.appendChild(i);
            V();
            if (H) {
                l.style.display = "block";
                l.style.left = 0 + "px";
                l.style.top = X.offsetHeight + "px";
                l.style.width = X.offsetWidth + "px";
                l.style.height = e.offsetHeight - 10 + "px"
            }
        }
        function W() {
            a = b()[0];
            if (a == -1) {
                K.dm({
                    type: "submit"
                })
            } else {
                K.dm({
                    type: "ent_submit",
                    oq: j,
                    wd: b()[1],
                    rsp: a
                })
            }
        }
        function h() {
            a = b()[0];
            k();
            if (a == 0) {
                K.dm({
                    type: "key_select",
                    selected: ""
                });
                Q("kw").value = j;
                a--
            } else {
                if (a == -1) {
                    a = C.length
                }
                a--;
                var R = i.rows[a];
                R.className = "mo";
                K.dm({
                    type: "key_select",
                    selected: C[a]
                });
                Q("kw").value = C[a]
            }
        }
        function d() {
            a = b()[0];
            k();
            if (a == C.length - 1) {
                K.dm({
                    type: "key_select",
                    selected: ""
                });
                Q("kw").value = j;
                a = -1
            } else {
                a++;
                var R = i.rows[a];
                R.className = "mo";
                K.dm({
                    type: "key_select",
                    selected: C[a]
                });
                Q("kw").value = C[a]
            }
        }
        return L.ini({
            rm: function(R) {
                switch (R.type) {
                case "div_ready":
                    e = R.sdiv;
                    l = R.frm;
                    break;
                case "give_data":
                    j = R.data.q;
                    C = R.data.s;
                    if (C.length != 0) {
                        g()
                    } else {
                        f()
                    }
                    break;
                case "key_enter":
                    W();
                    break;
                case "key_up":
                    h();
                    break;
                case "key_down":
                    d();
                    break;
                case "hide_div":
                    f();
                    break;
                case "mousedown_other":
                    f();
                    break;
                case "window_blur":
                    f();
                    break;
                case "need_resize":
                    V();
                    break
                }
            }
        })
    })();
    var M = (function() {
        var T = document.forms[0];
        function R() {
            //T.submit()
        }
        function S(U, V) {
            G(U, V);
            R()
        }
        function C(U, W) {
            var V = B("INPUT");
            V.type = "hidden";
            V.name = U;
            V.value = W;
            return V
        }
        function G(U, V) {
            if (typeof T.oq == "undefined") {
                T.appendChild(C("oq", U))
            } else {
                T.oq.value = U
            }
            if (typeof T.f == "undefined") {
                T.appendChild(C("f", 3))
            } else {
                T.f.value = 3
            }
            if (typeof T.rsp == "undefined") {
                T.appendChild(C("rsp", V))
            } else {
                T.rsp.value = V
            }
        }
        return L.ini({
            rm: function(U) {
                switch (U.type) {
                case "clk_submit":
                case "ent_submit":
                    S(U.oq, U.rsp);
                    break;
                case "submit":
                    R();
                    break
                }
            }
        })
    })();
    var N = (function() {
        var G = {};
        function R(C) {
            if (typeof G[C] == "undefined") {
                N.dm({
                    type: "request_data",
                    wd: C
                })
            } else {
                N.dm({
                    type: "give_data",
                    data: G[C]
                })
            }
        }
        function S(C) {
            G[C.q] = C;
            N.dm({
                type: "give_data",
                data: G[C.q]
            })
        }
        return L.ini({
            rm: function(C) {
                switch (C.type) {
                case "response_data":
                    S(C.data);
                    break;
                case "need_data":
                    R(C.wd);
                    break
                }
            }
        })
    })();
    var A = (function() {
        var C;
        var R;
        function G(S) {
            A.dm({
                type: "need_cookie"
            });
            if (C) {
                document.body.removeChild(C)
            }
            C = B("SCRIPT");
            C.src = "http://suggestion.baidu.com/su?wd=" + encodeURIComponent(S) + "&p=" + R + "&t=" + (new Date()).getTime();
            C.charset = "gb2312";
            document.body.appendChild(C)
        }
        return L.ini({
            rm: function(S) {
                switch (S.type) {
                case "request_data":
                    G(S.wd);
                    break;
                case "give_cookie":
                    R = S.sug;
                    break
                }
            }
        })
    })();
    if (typeof window.baidu != "object" || window.baidu == null) {
        window.baidu = {}
    }
    baidu.sug = function(C) {
        baidu.dm({
            type: "response_data",
            data: C
        })
    };
    baidu.initSug = function() {
        baidu.dm({
            type: "init"
        })
    };
    L.ini(baidu);
    var F = (function() {
        function C() {
            if (navigator.cookieEnabled) {
                document.cookie = "su=0; domain=www.baidu.com"
            }
        }
        function G() {
            var R = (navigator.cookieEnabled && /sug=(\d)/.test(document.cookie) ? RegExp.$1: 3);
            F.dm({
                type: "give_cookie",
                sug: R
            })
        }
        return L.ini({
            rm: function(R) {
                switch (R.type) {
                case "close":
                    C();
                    break;
                case "need_cookie":
                    G();
                    break
                }
            }
        })
    })();
    var O = (function() {
        var T = Q("kw");
        var C;
        var W = document.forms[0];
        var S;
        function U() {
            if (C.offsetWidth != 0 && T.offsetWidth != C.offsetWidth) {
                O.dm({
                    type: "need_resize"
                })
            }
        }
        function X() {
            C = B("DIV");
            C.id = "sd_" + new Date().getTime();
            C.style.display = "none";
            W.appendChild(C);
            if (H) {
                S = B("IFRAME");
                S.style.display = "none";
                S.style.position = "absolute";
                C.parentNode.insertBefore(S, C)
            }
        }
        function V(Y) {
            Y = Y || window.event;
            var Z = Y.target || Y.srcElement;
            if (Z == T) {
                return
            }
            while (Z = Z.parentNode) {
                if (Z == C) {
                    return
                }
            }
            O.dm({
                type: "mousedown_other"
            })
        }
        function R() {
            O.dm({
                type: "window_blur"
            })
        }
        function G() {
            O.dm({
                type: "div_ready",
                sdiv: C,
                frm: S
            });
            setInterval(U, 100);
            I(document, "mousedown", V);
            I(window, "blur", R);
            J("#" + C.id, "border:1px solid #817F82;position:absolute;top:28px;left:0");
            J("#" + C.id + " table", "width:100%;background:#fff;cursor:default");
            J("#" + C.id + " td", "font:14px verdana");
            J(".mo", "background-color:#36c;color:#fff");
            J(".ml", "background-color:#fff;color:#000")
        }
        return L.ini({
            rm: function(Y) {
                switch (Y.type) {
                case "start":
                    G();
                    break;
                case "init":
                    X();
                    break
                }
            }
        })
    })();
    P.on("need_data", N);
    P.on("close_div", K);
    P.on("key_enter", K);
    P.on("key_up", K);
    P.on("key_down", K);
    P.on("hide_div", K);
    P.on("start", O);
    N.on("request_data", A);
    N.on("give_data", K);
    baidu.on("response_data", N);
    baidu.on("init", O);
    K.on("clk_submit", P, M);
    K.on("ent_submit", P, M);
    K.on("submit", M);
    K.on("key_select", P);
    K.on("close", P, F);
    K.on("mousedown_tr", P);
    O.on("mousedown_other", K);
    O.on("need_resize", K);
    O.on("div_ready", P, K);
    O.on("window_blur", K);
    A.on("need_cookie", F);
    F.on("give_cookie", A);
    window.baidu.initSug()
})();