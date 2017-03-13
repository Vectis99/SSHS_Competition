(function(a) {
    if (typeof exports == "object" && typeof module == "object") {
        module.exports = a()
    } else {
        if (typeof define == "function" && define.amd) {
            return define([], a)
        } else {
            this.CodeMirror = a()
        }
    }
})(function() {
    var ce = /gecko\/\d/i.test(navigator.userAgent);
    var eo = /MSIE \d/.test(navigator.userAgent);
    var b1 = eo && (document.documentMode == null || document.documentMode < 8);
    var bY = eo && (document.documentMode == null || document.documentMode < 9);
    var bX = eo && (document.documentMode == null || document.documentMode < 10);
    var by = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);
    var dn = eo || by;
    var cJ = /WebKit\//.test(navigator.userAgent);
    var dr = cJ && /Qt\/\d+\.\d+/.test(navigator.userAgent);
    var cV = /Chrome\//.test(navigator.userAgent);
    var dF = /Opera\//.test(navigator.userAgent);
    var ay = /Apple Computer/.test(navigator.vendor);
    var a1 = /KHTML\//.test(navigator.userAgent);
    var cP = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
    var e5 = /PhantomJS/.test(navigator.userAgent);
    var eD = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var dS = eD || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
    var bU = eD || /Mac/.test(navigator.platform);
    var aG = /win/i.test(navigator.platform);
    var aO = dF && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    if (aO) {
        aO = Number(aO[1])
    }
    if (aO && aO >= 15) {
        dF = false;
        cJ = true
    }
    var bF = bU && (dr || dF && (aO == null || aO < 12.11));
    var fF = ce || (dn && !bY);
    var fI = false, aX = false;
    function I(fP, fQ) {
        if (!(this instanceof I)) {
            return new I(fP, fQ)
        }
        this.options = fQ = fQ || {};
        aE(eF, fQ, false);
        b4(fQ);
        var fS = fQ.value;
        if (typeof fS == "string") {
            fS = new ao(fS, fQ.mode)
        }
        this.doc = fS;
        var fR = this.display = new em(fP, fS);
        fR.wrapper.CodeMirror = this;
        dO(this);
        cB(this);
        if (fQ.lineWrapping) {
            this.display.wrapper.className += " CodeMirror-wrap"
        }
        if (fQ.autofocus && !dS) {
            ed(this)
        }
        this.state = {keyMaps: [],overlays: [],modeGen: 0,overwrite: false,focused: false,suppressEdits: false,pasteIncoming: false,cutIncoming: false,draggingText: false,highlight: new fN()};
        if (eo) {
            setTimeout(cl(eZ, this, true), 20)
        }
        fq(this);
        a8();
        var fO = this;
        cz(this, function() {
            fO.curOp.forceUpdate = true;
            dN(fO, fS);
            if ((fQ.autofocus && !dS) || ds() == fR.input) {
                setTimeout(cl(cq, fO), 20)
            } else {
                aL(fO)
            }
            for (var fU in a4) {
                if (a4.hasOwnProperty(fU)) {
                    a4[fU](fO, fQ[fU], b2)
                }
            }
            for (var fT = 0; fT < aY.length; ++fT) {
                aY[fT](fO)
            }
        })
    }
    function em(fO, fQ) {
        var fR = this;
        var fP = fR.input = fx("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
        if (cJ) {
            fP.style.width = "1000px"
        } else {
            fP.setAttribute("wrap", "off")
        }
        if (eD) {
            fP.style.border = "1px solid black"
        }
        fP.setAttribute("autocorrect", "off");
        fP.setAttribute("autocapitalize", "off");
        fP.setAttribute("spellcheck", "false");
        fR.inputDiv = fx("div", [fP], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        fR.scrollbarH = fx("div", [fx("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        fR.scrollbarV = fx("div", [fx("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
        fR.scrollbarFiller = fx("div", null, "CodeMirror-scrollbar-filler");
        fR.gutterFiller = fx("div", null, "CodeMirror-gutter-filler");
        fR.lineDiv = fx("div", null, "CodeMirror-code");
        fR.selectionDiv = fx("div", null, null, "position: relative; z-index: 1");
        fR.cursorDiv = fx("div", null, "CodeMirror-cursors");
        fR.measure = fx("div", null, "CodeMirror-measure");
        fR.lineMeasure = fx("div", null, "CodeMirror-measure");
        fR.lineSpace = fx("div", [fR.measure, fR.lineMeasure, fR.selectionDiv, fR.cursorDiv, fR.lineDiv], null, "position: relative; outline: none");
        fR.mover = fx("div", [fx("div", [fR.lineSpace], "CodeMirror-lines")], null, "position: relative");
        fR.sizer = fx("div", [fR.mover], "CodeMirror-sizer");
        fR.heightForcer = fx("div", null, null, "position: absolute; height: " + ba + "px; width: 1px;");
        fR.gutters = fx("div", null, "CodeMirror-gutters");
        fR.lineGutter = null;
        fR.scroller = fx("div", [fR.sizer, fR.heightForcer, fR.gutters], "CodeMirror-scroll");
        fR.scroller.setAttribute("tabIndex", "-1");
        fR.wrapper = fx("div", [fR.inputDiv, fR.scrollbarH, fR.scrollbarV, fR.scrollbarFiller, fR.gutterFiller, fR.scroller], "CodeMirror");
        if (b1) {
            fR.gutters.style.zIndex = -1;
            fR.scroller.style.paddingRight = 0
        }
        if (eD) {
            fP.style.width = "0px"
        }
        if (!cJ) {
            fR.scroller.draggable = true
        }
        if (a1) {
            fR.inputDiv.style.height = "1px";
            fR.inputDiv.style.position = "absolute"
        }
        if (b1) {
            fR.scrollbarH.style.minHeight = fR.scrollbarV.style.minWidth = "18px"
        }
        if (fO.appendChild) {
            fO.appendChild(fR.wrapper)
        } else {
            fO(fR.wrapper)
        }
        fR.viewFrom = fR.viewTo = fQ.first;
        fR.view = [];
        fR.externalMeasured = null;
        fR.viewOffset = 0;
        fR.lastSizeC = 0;
        fR.updateLineNumbers = null;
        fR.lineNumWidth = fR.lineNumInnerWidth = fR.lineNumChars = null;
        fR.prevInput = "";
        fR.alignWidgets = false;
        fR.pollingFast = false;
        fR.poll = new fN();
        fR.cachedCharWidth = fR.cachedTextHeight = fR.cachedPaddingH = null;
        fR.inaccurateSelection = false;
        fR.maxLine = null;
        fR.maxLineLength = 0;
        fR.maxLineChanged = false;
        fR.wheelDX = fR.wheelDY = fR.wheelStartX = fR.wheelStartY = null;
        fR.shift = false;
        fR.selForContextMenu = null
    }
    function bh(fO) {
        fO.doc.mode = I.getMode(fO.options, fO.doc.modeOption);
        dX(fO)
    }
    function dX(fO) {
        fO.doc.iter(function(fP) {
            if (fP.stateAfter) {
                fP.stateAfter = null
            }
            if (fP.styles) {
                fP.styles = null
            }
        });
        fO.doc.frontier = fO.doc.first;
        dR(fO, 100);
        fO.state.modeGen++;
        if (fO.curOp) {
            af(fO)
        }
    }
    function ek(fO) {
        if (fO.options.lineWrapping) {
            fb(fO.display.wrapper, "CodeMirror-wrap");
            fO.display.sizer.style.minWidth = ""
        } else {
            g(fO.display.wrapper, "CodeMirror-wrap");
            h(fO)
        }
        X(fO);
        af(fO);
        ai(fO);
        setTimeout(function() {
            eB(fO)
        }, 100)
    }
    function a3(fO) {
        var fQ = aN(fO.display), fP = fO.options.lineWrapping;
        var fR = fP && Math.max(5, fO.display.scroller.clientWidth / di(fO.display) - 3);
        return function(fT) {
            if (e7(fO.doc, fT)) {
                return 0
            }
            var fS = 0;
            if (fT.widgets) {
                for (var fU = 0; fU < fT.widgets.length; fU++) {
                    if (fT.widgets[fU].height) {
                        fS += fT.widgets[fU].height
                    }
                }
            }
            if (fP) {
                return fS + (Math.ceil(fT.text.length / fR) || 1) * fQ
            } else {
                return fS + fQ
            }
        }
    }
    function X(fO) {
        var fQ = fO.doc, fP = a3(fO);
        fQ.iter(function(fR) {
            var fS = fP(fR);
            if (fS != fR.height) {
                fB(fR, fS)
            }
        })
    }
    function fL(fO) {
        var fQ = eK[fO.options.keyMap], fP = fQ.style;
        fO.display.wrapper.className = fO.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (fP ? " cm-keymap-" + fP : "")
    }
    function cB(fO) {
        fO.display.wrapper.className = fO.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + fO.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        ai(fO)
    }
    function db(fO) {
        dO(fO);
        af(fO);
        setTimeout(function() {
            ei(fO)
        }, 20)
    }
    function dO(fO) {
        var fP = fO.display.gutters, fT = fO.options.gutters;
        dE(fP);
        for (var fQ = 0; fQ < fT.length; ++fQ) {
            var fR = fT[fQ];
            var fS = fP.appendChild(fx("div", null, "CodeMirror-gutter " + fR));
            if (fR == "CodeMirror-linenumbers") {
                fO.display.lineGutter = fS;
                fS.style.width = (fO.display.lineNumWidth || 1) + "px"
            }
        }
        fP.style.display = fQ ? "" : "none";
        cN(fO)
    }
    function cN(fO) {
        var fP = fO.display.gutters.offsetWidth;
        fO.display.sizer.style.marginLeft = fP + "px";
        fO.display.scrollbarH.style.left = fO.options.fixedGutter ? fP + "px" : 0
    }
    function dY(fQ) {
        if (fQ.height == 0) {
            return 0
        }
        var fP = fQ.text.length, fO, fS = fQ;
        while (fO = er(fS)) {
            var fR = fO.find(0, true);
            fS = fR.from.line;
            fP += fR.from.ch - fR.to.ch
        }
        fS = fQ;
        while (fO = d7(fS)) {
            var fR = fO.find(0, true);
            fP -= fS.text.length - fR.from.ch;
            fS = fR.to.line;
            fP += fS.text.length - fR.to.ch
        }
        return fP
    }
    function h(fO) {
        var fQ = fO.display, fP = fO.doc;
        fQ.maxLine = eP(fP, fP.first);
        fQ.maxLineLength = dY(fQ.maxLine);
        fQ.maxLineChanged = true;
        fP.iter(function(fS) {
            var fR = dY(fS);
            if (fR > fQ.maxLineLength) {
                fQ.maxLineLength = fR;
                fQ.maxLine = fS
            }
        })
    }
    function b4(fO) {
        var fP = c1(fO.gutters, "CodeMirror-linenumbers");
        if (fP == -1 && fO.lineNumbers) {
            fO.gutters = fO.gutters.concat(["CodeMirror-linenumbers"])
        } else {
            if (fP > -1 && !fO.lineNumbers) {
                fO.gutters = fO.gutters.slice(0);
                fO.gutters.splice(fP, 1)
            }
        }
    }
    function df(fP) {
        var fO = fP.display.scroller;
        return {clientHeight: fO.clientHeight,barHeight: fP.display.scrollbarV.clientHeight,scrollWidth: fO.scrollWidth,clientWidth: fO.clientWidth,barWidth: fP.display.scrollbarH.clientWidth,docHeight: Math.round(fP.doc.height + bx(fP.display))}
    }
    function eB(fO, fT) {
        if (!fT) {
            fT = df(fO)
        }
        var fV = fO.display;
        var fS = fT.docHeight + ba;
        var fU = fT.scrollWidth > fT.clientWidth;
        var fQ = fS > fT.clientHeight;
        if (fQ) {
            fV.scrollbarV.style.display = "block";
            fV.scrollbarV.style.bottom = fU ? l(fV.measure) + "px" : "0";
            fV.scrollbarV.firstChild.style.height = Math.max(0, fS - fT.clientHeight + (fT.barHeight || fV.scrollbarV.clientHeight)) + "px"
        } else {
            fV.scrollbarV.style.display = "";
            fV.scrollbarV.firstChild.style.height = "0"
        }
        if (fU) {
            fV.scrollbarH.style.display = "block";
            fV.scrollbarH.style.right = fQ ? l(fV.measure) + "px" : "0";
            fV.scrollbarH.firstChild.style.width = (fT.scrollWidth - fT.clientWidth + (fT.barWidth || fV.scrollbarH.clientWidth)) + "px"
        } else {
            fV.scrollbarH.style.display = "";
            fV.scrollbarH.firstChild.style.width = "0"
        }
        if (fU && fQ) {
            fV.scrollbarFiller.style.display = "block";
            fV.scrollbarFiller.style.height = fV.scrollbarFiller.style.width = l(fV.measure) + "px"
        } else {
            fV.scrollbarFiller.style.display = ""
        }
        if (fU && fO.options.coverGutterNextToScrollbar && fO.options.fixedGutter) {
            fV.gutterFiller.style.display = "block";
            fV.gutterFiller.style.height = l(fV.measure) + "px";
            fV.gutterFiller.style.width = fV.gutters.offsetWidth + "px"
        } else {
            fV.gutterFiller.style.display = ""
        }
        if (!fO.state.checkedOverlayScrollbar && fT.clientHeight > 0) {
            if (l(fV.measure) === 0) {
                var fP = bU && !cP ? "12px" : "18px";
                fV.scrollbarV.style.minWidth = fV.scrollbarH.style.minHeight = fP;
                var fR = function(fW) {
                    if (L(fW) != fV.scrollbarV && L(fW) != fV.scrollbarH) {
                        cL(fO, d5)(fW)
                    }
                };
                bM(fV.scrollbarV, "mousedown", fR);
                bM(fV.scrollbarH, "mousedown", fR)
            }
            fO.state.checkedOverlayScrollbar = true
        }
    }
    function bT(fQ, fU, fW) {
        var fR = fW && fW.top != null ? Math.max(0, fW.top) : fQ.scroller.scrollTop;
        fR = Math.floor(fR - eI(fQ));
        var fO = fW && fW.bottom != null ? fW.bottom : fR + fQ.wrapper.clientHeight;
        var fS = bv(fU, fR), fT = bv(fU, fO);
        if (fW && fW.ensure) {
            var fP = fW.ensure.from.line, fV = fW.ensure.to.line;
            if (fP < fS) {
                return {from: fP,to: bv(fU, bB(eP(fU, fP)) + fQ.wrapper.clientHeight)}
            }
            if (Math.min(fV, fU.lastLine()) >= fT) {
                return {from: bv(fU, bB(eP(fU, fV)) - fQ.wrapper.clientHeight),to: fV}
            }
        }
        return {from: fS,to: Math.max(fT, fS + 1)}
    }
    function ei(fW) {
        var fU = fW.display, fV = fU.view;
        if (!fU.alignWidgets && (!fU.gutters.firstChild || !fW.options.fixedGutter)) {
            return
        }
        var fS = dA(fU) - fU.scroller.scrollLeft + fW.doc.scrollLeft;
        var fO = fU.gutters.offsetWidth, fP = fS + "px";
        for (var fR = 0; fR < fV.length; fR++) {
            if (!fV[fR].hidden) {
                if (fW.options.fixedGutter && fV[fR].gutter) {
                    fV[fR].gutter.style.left = fP
                }
                var fT = fV[fR].alignable;
                if (fT) {
                    for (var fQ = 0; fQ < fT.length; fQ++) {
                        fT[fQ].style.left = fP
                    }
                }
            }
        }
        if (fW.options.fixedGutter) {
            fU.gutters.style.left = (fS + fO) + "px"
        }
    }
    function dI(fO) {
        if (!fO.options.lineNumbers) {
            return false
        }
        var fT = fO.doc, fP = d4(fO.options, fT.first + fT.size - 1), fS = fO.display;
        if (fP.length != fS.lineNumChars) {
            var fU = fS.measure.appendChild(fx("div", [fx("div", fP)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
            var fQ = fU.firstChild.offsetWidth, fR = fU.offsetWidth - fQ;
            fS.lineGutter.style.width = "";
            fS.lineNumInnerWidth = Math.max(fQ, fS.lineGutter.offsetWidth - fR);
            fS.lineNumWidth = fS.lineNumInnerWidth + fR;
            fS.lineNumChars = fS.lineNumInnerWidth ? fP.length : -1;
            fS.lineGutter.style.width = fS.lineNumWidth + "px";
            cN(fO);
            return true
        }
        return false
    }
    function d4(fO, fP) {
        return String(fO.lineNumberFormatter(fP + fO.firstLineNumber))
    }
    function dA(fO) {
        return fO.scroller.getBoundingClientRect().left - fO.sizer.getBoundingClientRect().left
    }
    function dp(fT, fW, fX) {
        var fV = fT.display.viewFrom, fU = fT.display.viewTo, fR;
        var fO = bT(fT.display, fT.doc, fW);
        for (var fQ = true; ; fQ = false) {
            var fP = fT.display.scroller.clientWidth;
            if (!cZ(fT, fO, fX)) {
                break
            }
            fR = true;
            if (fT.display.maxLineChanged && !fT.options.lineWrapping) {
                b(fT)
            }
            var fS = df(fT);
            br(fT);
            de(fT, fS);
            eB(fT, fS);
            if (cJ && fT.options.lineWrapping) {
                fA(fT, fS)
            }
            if (fQ && fT.options.lineWrapping && fP != fT.display.scroller.clientWidth) {
                fX = true;
                continue
            }
            fX = false;
            if (fW && fW.top != null) {
                fW = {top: Math.min(fS.docHeight - ba - fS.clientHeight, fW.top)}
            }
            fO = bT(fT.display, fT.doc, fW);
            if (fO.from >= fT.display.viewFrom && fO.to <= fT.display.viewTo) {
                break
            }
        }
        fT.display.updateLineNumbers = null;
        if (fR) {
            ac(fT, "update", fT);
            if (fT.display.viewFrom != fV || fT.display.viewTo != fU) {
                ac(fT, "viewportChange", fT, fT.display.viewFrom, fT.display.viewTo)
            }
        }
        return fR
    }
    function cZ(fY, fQ, fZ) {
        var fS = fY.display, fX = fY.doc;
        if (!fS.wrapper.offsetWidth) {
            d9(fY);
            return
        }
        if (!fZ && fQ.from >= fS.viewFrom && fQ.to <= fS.viewTo && cU(fY) == 0) {
            return
        }
        if (dI(fY)) {
            d9(fY)
        }
        var fW = eM(fY);
        var fR = fX.first + fX.size;
        var fV = Math.max(fQ.from - fY.options.viewportMargin, fX.first);
        var fU = Math.min(fR, fQ.to + fY.options.viewportMargin);
        if (fS.viewFrom < fV && fV - fS.viewFrom < 20) {
            fV = Math.max(fX.first, fS.viewFrom)
        }
        if (fS.viewTo > fU && fS.viewTo - fU < 20) {
            fU = Math.min(fR, fS.viewTo)
        }
        if (aX) {
            fV = aM(fY.doc, fV);
            fU = dG(fY.doc, fU)
        }
        var fP = fV != fS.viewFrom || fU != fS.viewTo || fS.lastSizeC != fS.wrapper.clientHeight;
        cD(fY, fV, fU);
        fS.viewOffset = bB(eP(fY.doc, fS.viewFrom));
        fY.display.mover.style.top = fS.viewOffset + "px";
        var fO = cU(fY);
        if (!fP && fO == 0 && !fZ) {
            return
        }
        var fT = ds();
        if (fO > 4) {
            fS.lineDiv.style.display = "none"
        }
        cc(fY, fS.updateLineNumbers, fW);
        if (fO > 4) {
            fS.lineDiv.style.display = ""
        }
        if (fT && ds() != fT && fT.offsetHeight) {
            fT.focus()
        }
        dE(fS.cursorDiv);
        dE(fS.selectionDiv);
        if (fP) {
            fS.lastSizeC = fS.wrapper.clientHeight;
            dR(fY, 400)
        }
        aZ(fY);
        return true
    }
    function b(fO) {
        var fS = fO.display;
        var fQ = dT(fO, fS.maxLine, fS.maxLine.text.length).left;
        fS.maxLineChanged = false;
        var fP = Math.max(0, fQ + 3);
        var fR = Math.max(0, fS.sizer.offsetLeft + fP + ba - fS.scroller.clientWidth);
        fS.sizer.style.minWidth = fP + "px";
        if (fR < fO.doc.scrollLeft) {
            bt(fO, Math.min(fS.scroller.scrollLeft, fR), true)
        }
    }
    function de(fO, fP) {
        fO.display.sizer.style.minHeight = fO.display.heightForcer.style.top = fP.docHeight + "px";
        fO.display.gutters.style.height = Math.max(fP.docHeight, fP.clientHeight - ba) + "px"
    }
    function fA(fO, fP) {
        if (fO.display.sizer.offsetWidth + fO.display.gutters.offsetWidth < fO.display.scroller.clientWidth - 1) {
            fO.display.sizer.style.minHeight = fO.display.heightForcer.style.top = "0px";
            fO.display.gutters.style.height = fP.docHeight + "px"
        }
    }
    function aZ(fV) {
        var fT = fV.display;
        var fP = fT.lineDiv.offsetTop;
        for (var fQ = 0; fQ < fT.view.length; fQ++) {
            var fW = fT.view[fQ], fX;
            if (fW.hidden) {
                continue
            }
            if (b1) {
                var fS = fW.node.offsetTop + fW.node.offsetHeight;
                fX = fS - fP;
                fP = fS
            } else {
                var fR = fW.node.getBoundingClientRect();
                fX = fR.bottom - fR.top
            }
            var fU = fW.line.height - fX;
            if (fX < 2) {
                fX = aN(fT)
            }
            if (fU > 0.001 || fU < -0.001) {
                fB(fW.line, fX);
                b0(fW.line);
                if (fW.rest) {
                    for (var fO = 0; fO < fW.rest.length; fO++) {
                        b0(fW.rest[fO])
                    }
                }
            }
        }
    }
    function b0(fO) {
        if (fO.widgets) {
            for (var fP = 0; fP < fO.widgets.length; ++fP) {
                fO.widgets[fP].height = fO.widgets[fP].node.offsetHeight
            }
        }
    }
    function eM(fO) {
        var fS = fO.display, fR = {}, fQ = {};
        for (var fT = fS.gutters.firstChild, fP = 0; fT; fT = fT.nextSibling, ++fP) {
            fR[fO.options.gutters[fP]] = fT.offsetLeft;
            fQ[fO.options.gutters[fP]] = fT.offsetWidth
        }
        return {fixedPos: dA(fS),gutterTotalWidth: fS.gutters.offsetWidth,gutterLeft: fR,gutterWidth: fQ,wrapperWidth: fS.wrapper.clientWidth}
    }
    function cc(fZ, fQ, fY) {
        var fV = fZ.display, f1 = fZ.options.lineNumbers;
        var fO = fV.lineDiv, f0 = fO.firstChild;
        function fU(f3) {
            var f2 = f3.nextSibling;
            if (cJ && bU && fZ.display.currentWheelTarget == f3) {
                f3.style.display = "none"
            } else {
                f3.parentNode.removeChild(f3)
            }
            return f2
        }
        var fW = fV.view, fT = fV.viewFrom;
        for (var fR = 0; fR < fW.length; fR++) {
            var fS = fW[fR];
            if (fS.hidden) {
            } else {
                if (!fS.node) {
                    var fP = aA(fZ, fS, fT, fY);
                    fO.insertBefore(fP, f0)
                } else {
                    while (f0 != fS.node) {
                        f0 = fU(f0)
                    }
                    var fX = f1 && fQ != null && fQ <= fT && fS.lineNumber;
                    if (fS.changes) {
                        if (c1(fS.changes, "gutter") > -1) {
                            fX = false
                        }
                        Z(fZ, fS, fT, fY)
                    }
                    if (fX) {
                        dE(fS.lineNumber);
                        fS.lineNumber.appendChild(document.createTextNode(d4(fZ.options, fT)))
                    }
                    f0 = fS.node.nextSibling
                }
            }
            fT += fS.size
        }
        while (f0) {
            f0 = fU(f0)
        }
    }
    function Z(fO, fQ, fS, fT) {
        for (var fP = 0; fP < fQ.changes.length; fP++) {
            var fR = fQ.changes[fP];
            if (fR == "text") {
                eV(fO, fQ)
            } else {
                if (fR == "gutter") {
                    cY(fO, fQ, fS, fT)
                } else {
                    if (fR == "class") {
                        dl(fQ)
                    } else {
                        if (fR == "widget") {
                            al(fQ, fT)
                        }
                    }
                }
            }
        }
        fQ.changes = null
    }
    function fj(fO) {
        if (fO.node == fO.text) {
            fO.node = fx("div", null, null, "position: relative");
            if (fO.text.parentNode) {
                fO.text.parentNode.replaceChild(fO.node, fO.text)
            }
            fO.node.appendChild(fO.text);
            if (b1) {
                fO.node.style.zIndex = 2
            }
        }
        return fO.node
    }
    function d6(fP) {
        var fO = fP.bgClass ? fP.bgClass + " " + (fP.line.bgClass || "") : fP.line.bgClass;
        if (fO) {
            fO += " CodeMirror-linebackground"
        }
        if (fP.background) {
            if (fO) {
                fP.background.className = fO
            } else {
                fP.background.parentNode.removeChild(fP.background);
                fP.background = null
            }
        } else {
            if (fO) {
                var fQ = fj(fP);
                fP.background = fQ.insertBefore(fx("div", null, fO), fQ.firstChild)
            }
        }
    }
    function dy(fO, fP) {
        var fQ = fO.display.externalMeasured;
        if (fQ && fQ.line == fP.line) {
            fO.display.externalMeasured = null;
            fP.measure = fQ.measure;
            return fQ.built
        }
        return ev(fO, fP)
    }
    function eV(fO, fR) {
        var fP = fR.text.className;
        var fQ = dy(fO, fR);
        if (fR.text == fR.node) {
            fR.node = fQ.pre
        }
        fR.text.parentNode.replaceChild(fQ.pre, fR.text);
        fR.text = fQ.pre;
        if (fQ.bgClass != fR.bgClass || fQ.textClass != fR.textClass) {
            fR.bgClass = fQ.bgClass;
            fR.textClass = fQ.textClass;
            dl(fR)
        } else {
            if (fP) {
                fR.text.className = fP
            }
        }
    }
    function dl(fP) {
        d6(fP);
        if (fP.line.wrapClass) {
            fj(fP).className = fP.line.wrapClass
        } else {
            if (fP.node != fP.text) {
                fP.node.className = ""
            }
        }
        var fO = fP.textClass ? fP.textClass + " " + (fP.line.textClass || "") : fP.line.textClass;
        fP.text.className = fO || ""
    }
    function cY(fW, fU, fT, fV) {
        if (fU.gutter) {
            fU.node.removeChild(fU.gutter);
            fU.gutter = null
        }
        var fR = fU.line.gutterMarkers;
        if (fW.options.lineNumbers || fR) {
            var fP = fj(fU);
            var fS = fU.gutter = fP.insertBefore(fx("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (fW.options.fixedGutter ? fV.fixedPos : -fV.gutterTotalWidth) + "px"), fU.text);
            if (fW.options.lineNumbers && (!fR || !fR["CodeMirror-linenumbers"])) {
                fU.lineNumber = fS.appendChild(fx("div", d4(fW.options, fT), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + fV.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + fW.display.lineNumInnerWidth + "px"))
            }
            if (fR) {
                for (var fQ = 0; fQ < fW.options.gutters.length; ++fQ) {
                    var fO = fW.options.gutters[fQ], fX = fR.hasOwnProperty(fO) && fR[fO];
                    if (fX) {
                        fS.appendChild(fx("div", [fX], "CodeMirror-gutter-elt", "left: " + fV.gutterLeft[fO] + "px; width: " + fV.gutterWidth[fO] + "px"))
                    }
                }
            }
        }
    }
    function al(fO, fR) {
        if (fO.alignable) {
            fO.alignable = null
        }
        for (var fQ = fO.node.firstChild, fP; fQ; fQ = fP) {
            var fP = fQ.nextSibling;
            if (fQ.className == "CodeMirror-linewidget") {
                fO.node.removeChild(fQ)
            }
        }
        e4(fO, fR)
    }
    function aA(fO, fQ, fR, fS) {
        var fP = dy(fO, fQ);
        fQ.text = fQ.node = fP.pre;
        if (fP.bgClass) {
            fQ.bgClass = fP.bgClass
        }
        if (fP.textClass) {
            fQ.textClass = fP.textClass
        }
        dl(fQ);
        cY(fO, fQ, fR, fS);
        e4(fQ, fS);
        return fQ.node
    }
    function e4(fP, fQ) {
        fC(fP.line, fP, fQ, true);
        if (fP.rest) {
            for (var fO = 0; fO < fP.rest.length; fO++) {
                fC(fP.rest[fO], fP, fQ, false)
            }
        }
    }
    function fC(fW, fT, fV, fR) {
        if (!fW.widgets) {
            return
        }
        var fO = fj(fT);
        for (var fQ = 0, fU = fW.widgets; fQ < fU.length; ++fQ) {
            var fS = fU[fQ], fP = fx("div", [fS.node], "CodeMirror-linewidget");
            if (!fS.handleMouseEvents) {
                fP.ignoreEvents = true
            }
            bu(fS, fP, fT, fV);
            if (fR && fS.above) {
                fO.insertBefore(fP, fT.gutter || fT.text)
            } else {
                fO.appendChild(fP)
            }
            ac(fS, "redraw")
        }
    }
    function bu(fR, fQ, fO, fS) {
        if (fR.noHScroll) {
            (fO.alignable || (fO.alignable = [])).push(fQ);
            var fP = fS.wrapperWidth;
            fQ.style.left = fS.fixedPos + "px";
            if (!fR.coverGutter) {
                fP -= fS.gutterTotalWidth;
                fQ.style.paddingLeft = fS.gutterTotalWidth + "px"
            }
            fQ.style.width = fP + "px"
        }
        if (fR.coverGutter) {
            fQ.style.zIndex = 5;
            fQ.style.position = "relative";
            if (!fR.noHScroll) {
                fQ.style.marginLeft = -fS.gutterTotalWidth + "px"
            }
        }
    }
    var W = I.Pos = function(fO, fP) {
        if (!(this instanceof W)) {
            return new W(fO, fP)
        }
        this.line = fO;
        this.ch = fP
    };
    var b5 = I.cmpPos = function(fP, fO) {
        return fP.line - fO.line || fP.ch - fO.ch
    };
    function b9(fO) {
        return W(fO.line, fO.ch)
    }
    function bn(fP, fO) {
        return b5(fP, fO) < 0 ? fO : fP
    }
    function am(fP, fO) {
        return b5(fP, fO) < 0 ? fP : fO
    }
    function fy(fO, fP) {
        this.ranges = fO;
        this.primIndex = fP
    }
    fy.prototype = {primary: function() {
            return this.ranges[this.primIndex]
        },equals: function(fO) {
            if (fO == this) {
                return true
            }
            if (fO.primIndex != this.primIndex || fO.ranges.length != this.ranges.length) {
                return false
            }
            for (var fQ = 0; fQ < this.ranges.length; fQ++) {
                var fP = this.ranges[fQ], fR = fO.ranges[fQ];
                if (b5(fP.anchor, fR.anchor) != 0 || b5(fP.head, fR.head) != 0) {
                    return false
                }
            }
            return true
        },deepCopy: function() {
            for (var fO = [], fP = 0; fP < this.ranges.length; fP++) {
                fO[fP] = new dB(b9(this.ranges[fP].anchor), b9(this.ranges[fP].head))
            }
            return new fy(fO, this.primIndex)
        },somethingSelected: function() {
            for (var fO = 0; fO < this.ranges.length; fO++) {
                if (!this.ranges[fO].empty()) {
                    return true
                }
            }
            return false
        },contains: function(fR, fO) {
            if (!fO) {
                fO = fR
            }
            for (var fQ = 0; fQ < this.ranges.length; fQ++) {
                var fP = this.ranges[fQ];
                if (b5(fO, fP.from()) >= 0 && b5(fR, fP.to()) <= 0) {
                    return fQ
                }
            }
            return -1
        }};
    function dB(fO, fP) {
        this.anchor = fO;
        this.head = fP
    }
    dB.prototype = {from: function() {
            return am(this.anchor, this.head)
        },to: function() {
            return bn(this.anchor, this.head)
        },empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }};
    function cm(fO, fV) {
        var fQ = fO[fV];
        fO.sort(function(fY, fX) {
            return b5(fY.from(), fX.from())
        });
        fV = c1(fO, fQ);
        for (var fS = 1; fS < fO.length; fS++) {
            var fW = fO[fS], fP = fO[fS - 1];
            if (b5(fP.to(), fW.from()) >= 0) {
                var fT = am(fP.from(), fW.from()), fU = bn(fP.to(), fW.to());
                var fR = fP.empty() ? fW.from() == fW.head : fP.from() == fP.head;
                if (fS <= fV) {
                    --fV
                }
                fO.splice(--fS, 2, new dB(fR ? fU : fT, fR ? fT : fU))
            }
        }
        return new fy(fO, fV)
    }
    function eu(fO, fP) {
        return new fy([new dB(fO, fP || fO)], 0)
    }
    function cO(fO, fP) {
        return Math.max(fO.first, Math.min(fP, fO.first + fO.size - 1))
    }
    function fk(fP, fQ) {
        if (fQ.line < fP.first) {
            return W(fP.first, 0)
        }
        var fO = fP.first + fP.size - 1;
        if (fQ.line > fO) {
            return W(fO, eP(fP, fO).text.length)
        }
        return e3(fQ, eP(fP, fQ.line).text.length)
    }
    function e3(fQ, fP) {
        var fO = fQ.ch;
        if (fO == null || fO > fP) {
            return W(fQ.line, fP)
        } else {
            if (fO < 0) {
                return W(fQ.line, 0)
            } else {
                return fQ
            }
        }
    }
    function bW(fP, fO) {
        return fO >= fP.first && fO < fP.first + fP.size
    }
    function dC(fQ, fR) {
        for (var fO = [], fP = 0; fP < fR.length; fP++) {
            fO[fP] = fk(fQ, fR[fP])
        }
        return fO
    }
    function e6(fT, fP, fS, fO) {
        if (fT.cm && fT.cm.display.shift || fT.extend) {
            var fR = fP.anchor;
            if (fO) {
                var fQ = b5(fS, fR) < 0;
                if (fQ != (b5(fO, fR) < 0)) {
                    fR = fS;
                    fS = fO
                } else {
                    if (fQ != (b5(fS, fO) < 0)) {
                        fS = fO
                    }
                }
            }
            return new dB(fR, fS)
        } else {
            return new dB(fO || fS, fS)
        }
    }
    function fu(fR, fQ, fO, fP) {
        bJ(fR, new fy([e6(fR, fR.sel.primary(), fQ, fO)], 0), fP)
    }
    function at(fT, fS, fQ) {
        for (var fP = [], fR = 0; fR < fT.sel.ranges.length; fR++) {
            fP[fR] = e6(fT, fT.sel.ranges[fR], fS[fR], null)
        }
        var fO = cm(fP, fT.sel.primIndex);
        bJ(fT, fO, fQ)
    }
    function f(fS, fR, fP, fQ) {
        var fO = fS.sel.ranges.slice(0);
        fO[fR] = fP;
        bJ(fS, cm(fO, fS.sel.primIndex), fQ)
    }
    function G(fR, fP, fQ, fO) {
        bJ(fR, eu(fP, fQ), fO)
    }
    function d(fQ, fO) {
        var fP = {ranges: fO.ranges,update: function(fR) {
                this.ranges = [];
                for (var fS = 0; fS < fR.length; fS++) {
                    this.ranges[fS] = new dB(fk(fQ, fR[fS].anchor), fk(fQ, fR[fS].head))
                }
            }};
        az(fQ, "beforeSelectionChange", fQ, fP);
        if (fQ.cm) {
            az(fQ.cm, "beforeSelectionChange", fQ.cm, fP)
        }
        if (fP.ranges != fO.ranges) {
            return cm(fP.ranges, fP.ranges.length - 1)
        } else {
            return fO
        }
    }
    function eH(fS, fR, fP) {
        var fO = fS.history.done, fQ = fi(fO);
        if (fQ && fQ.ranges) {
            fO[fO.length - 1] = fR;
            d1(fS, fR, fP)
        } else {
            bJ(fS, fR, fP)
        }
    }
    function bJ(fQ, fP, fO) {
        d1(fQ, fP, fO);
        fH(fQ, fQ.sel, fQ.cm ? fQ.cm.curOp.id : NaN, fO)
    }
    function d1(fR, fQ, fP) {
        if (eS(fR, "beforeSelectionChange") || fR.cm && eS(fR.cm, "beforeSelectionChange")) {
            fQ = d(fR, fQ)
        }
        var fO = fP && fP.bias || (b5(fQ.primary().head, fR.sel.primary().head) < 0 ? -1 : 1);
        cS(fR, o(fR, fQ, fO, true));
        if (!(fP && fP.scroll === false) && fR.cm) {
            fh(fR.cm)
        }
    }
    function cS(fP, fO) {
        if (fO.equals(fP.sel)) {
            return
        }
        fP.sel = fO;
        if (fP.cm) {
            fP.cm.curOp.updateInput = fP.cm.curOp.selectionChanged = true;
            V(fP.cm)
        }
        ac(fP, "cursorActivity", fP)
    }
    function ea(fO) {
        cS(fO, o(fO, fO.sel, null, false), Y)
    }
    function o(fW, fO, fT, fU) {
        var fQ;
        for (var fR = 0; fR < fO.ranges.length; fR++) {
            var fS = fO.ranges[fR];
            var fV = bK(fW, fS.anchor, fT, fU);
            var fP = bK(fW, fS.head, fT, fU);
            if (fQ || fV != fS.anchor || fP != fS.head) {
                if (!fQ) {
                    fQ = fO.ranges.slice(0, fR)
                }
                fQ[fR] = new dB(fV, fP)
            }
        }
        return fQ ? cm(fQ, fO.primIndex) : fO
    }
    function bK(fX, fW, fT, fU) {
        var fY = false, fQ = fW;
        var fR = fT || 1;
        fX.cantEdit = false;
        search: for (; ; ) {
            var fZ = eP(fX, fQ.line);
            if (fZ.markedSpans) {
                for (var fS = 0; fS < fZ.markedSpans.length; ++fS) {
                    var fO = fZ.markedSpans[fS], fP = fO.marker;
                    if ((fO.from == null || (fP.inclusiveLeft ? fO.from <= fQ.ch : fO.from < fQ.ch)) && (fO.to == null || (fP.inclusiveRight ? fO.to >= fQ.ch : fO.to > fQ.ch))) {
                        if (fU) {
                            az(fP, "beforeCursorEnter");
                            if (fP.explicitlyCleared) {
                                if (!fZ.markedSpans) {
                                    break
                                } else {
                                    --fS;
                                    continue
                                }
                            }
                        }
                        if (!fP.atomic) {
                            continue
                        }
                        var fV = fP.find(fR < 0 ? -1 : 1);
                        if (b5(fV, fQ) == 0) {
                            fV.ch += fR;
                            if (fV.ch < 0) {
                                if (fV.line > fX.first) {
                                    fV = fk(fX, W(fV.line - 1))
                                } else {
                                    fV = null
                                }
                            } else {
                                if (fV.ch > fZ.text.length) {
                                    if (fV.line < fX.first + fX.size - 1) {
                                        fV = W(fV.line + 1, 0)
                                    } else {
                                        fV = null
                                    }
                                }
                            }
                            if (!fV) {
                                if (fY) {
                                    if (!fU) {
                                        return bK(fX, fW, fT, true)
                                    }
                                    fX.cantEdit = true;
                                    return W(fX.first, 0)
                                }
                                fY = true;
                                fV = fW;
                                fR = -fR
                            }
                        }
                        fQ = fV;
                        continue search
                    }
                }
            }
            return fQ
        }
    }
    function br(f0) {
        var fV = f0.display, fZ = f0.doc;
        var fX = document.createDocumentFragment();
        var fR = document.createDocumentFragment();
        for (var fT = 0; fT < fZ.sel.ranges.length; fT++) {
            var fU = fZ.sel.ranges[fT];
            var fS = fU.empty();
            if (fS || f0.options.showCursorWhenSelecting) {
                B(f0, fU, fX)
            }
            if (!fS) {
                bs(f0, fU, fR)
            }
        }
        if (f0.options.moveInputWithCursor) {
            var fW = dx(f0, fZ.sel.primary().head, "div");
            var fO = fV.wrapper.getBoundingClientRect(), fQ = fV.lineDiv.getBoundingClientRect();
            var fY = Math.max(0, Math.min(fV.wrapper.clientHeight - 10, fW.top + fQ.top - fO.top));
            var fP = Math.max(0, Math.min(fV.wrapper.clientWidth - 10, fW.left + fQ.left - fO.left));
            fV.inputDiv.style.top = fY + "px";
            fV.inputDiv.style.left = fP + "px"
        }
        bG(fV.cursorDiv, fX);
        bG(fV.selectionDiv, fR)
    }
    function B(fO, fR, fQ) {
        var fT = dx(fO, fR.head, "div");
        var fS = fQ.appendChild(fx("div", "\u00a0", "CodeMirror-cursor"));
        fS.style.left = fT.left + "px";
        fS.style.top = fT.top + "px";
        fS.style.height = Math.max(0, fT.bottom - fT.top) * fO.options.cursorHeight + "px";
        if (fT.other) {
            var fP = fQ.appendChild(fx("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
            fP.style.display = "";
            fP.style.left = fT.other.left + "px";
            fP.style.top = fT.other.top + "px";
            fP.style.height = (fT.other.bottom - fT.other.top) * 0.85 + "px"
        }
    }
    function bs(fS, fY, fT) {
        var f1 = fS.display, f5 = fS.doc;
        var fO = document.createDocumentFragment();
        var fX = eG(fS.display), fR = fX.left, f2 = f1.lineSpace.offsetWidth - fX.right;
        function fZ(f9, f8, f7, f6) {
            if (f8 < 0) {
                f8 = 0
            }
            f8 = Math.round(f8);
            f6 = Math.round(f6);
            fO.appendChild(fx("div", null, "CodeMirror-selected", "position: absolute; left: " + f9 + "px; top: " + f8 + "px; width: " + (f7 == null ? f2 - f9 : f7) + "px; height: " + (f6 - f8) + "px"))
        }
        function fP(f7, f9, gc) {
            var f8 = eP(f5, f7);
            var ga = f8.text.length;
            var gd, f6;
            function gb(gf, ge) {
                return cx(fS, W(f7, gf), "div", f8, ge)
            }
            dH(a(f8), f9 || 0, gc == null ? ga : gc, function(gl, gk, ge) {
                var gh = gb(gl, "left"), gi, gj, gg;
                if (gl == gk) {
                    gi = gh;
                    gj = gg = gh.left
                } else {
                    gi = gb(gk - 1, "right");
                    if (ge == "rtl") {
                        var gf = gh;
                        gh = gi;
                        gi = gf
                    }
                    gj = gh.left;
                    gg = gi.right
                }
                if (f9 == null && gl == 0) {
                    gj = fR
                }
                if (gi.top - gh.top > 3) {
                    fZ(gj, gh.top, null, gh.bottom);
                    gj = fR;
                    if (gh.bottom < gi.top) {
                        fZ(gj, gh.bottom, null, gi.top)
                    }
                }
                if (gc == null && gk == ga) {
                    gg = f2
                }
                if (!gd || gh.top < gd.top || gh.top == gd.top && gh.left < gd.left) {
                    gd = gh
                }
                if (!f6 || gi.bottom > f6.bottom || gi.bottom == f6.bottom && gi.right > f6.right) {
                    f6 = gi
                }
                if (gj < fR + 1) {
                    gj = fR
                }
                fZ(gj, gi.top, gg - gj, gi.bottom)
            });
            return {start: gd,end: f6}
        }
        var f4 = fY.from(), f3 = fY.to();
        if (f4.line == f3.line) {
            fP(f4.line, f4.ch, f3.ch)
        } else {
            var fQ = eP(f5, f4.line), fV = eP(f5, f3.line);
            var fU = z(fQ) == z(fV);
            var fW = fP(f4.line, f4.ch, fU ? fQ.text.length + 1 : null).end;
            var f0 = fP(f3.line, fU ? 0 : null, f3.ch).start;
            if (fU) {
                if (fW.top < f0.top - 2) {
                    fZ(fW.right, fW.top, null, fW.bottom);
                    fZ(fR, f0.top, f0.left, f0.bottom)
                } else {
                    fZ(fW.right, fW.top, f0.left - fW.right, fW.bottom)
                }
            }
            if (fW.bottom < f0.top) {
                fZ(fR, fW.bottom, null, f0.top)
            }
        }
        fT.appendChild(fO)
    }
    function p(fO) {
        if (!fO.state.focused) {
            return
        }
        var fQ = fO.display;
        clearInterval(fQ.blinker);
        var fP = true;
        fQ.cursorDiv.style.visibility = "";
        if (fO.options.cursorBlinkRate > 0) {
            fQ.blinker = setInterval(function() {
                fQ.cursorDiv.style.visibility = (fP = !fP) ? "" : "hidden"
            }, fO.options.cursorBlinkRate)
        }
    }
    function dR(fO, fP) {
        if (fO.doc.mode.startState && fO.doc.frontier < fO.display.viewTo) {
            fO.state.highlight.set(fP, cl(cC, fO))
        }
    }
    function cC(fO) {
        var fR = fO.doc;
        if (fR.frontier < fR.first) {
            fR.frontier = fR.first
        }
        if (fR.frontier >= fO.display.viewTo) {
            return
        }
        var fP = +new Date + fO.options.workTime;
        var fQ = bR(fR.mode, dg(fO, fR.frontier));
        cz(fO, function() {
            fR.iter(fR.frontier, Math.min(fR.first + fR.size, fO.display.viewTo + 500), function(fS) {
                if (fR.frontier >= fO.display.viewFrom) {
                    var fU = fS.styles;
                    var fV = fa(fO, fS, fQ, true);
                    fS.styles = fV.styles;
                    if (fV.classes) {
                        fS.styleClasses = fV.classes
                    } else {
                        if (fS.styleClasses) {
                            fS.styleClasses = null
                        }
                    }
                    var fW = !fU || fU.length != fS.styles.length;
                    for (var fT = 0; !fW && fT < fU.length; ++fT) {
                        fW = fU[fT] != fS.styles[fT]
                    }
                    if (fW) {
                        R(fO, fR.frontier, "text")
                    }
                    fS.stateAfter = bR(fR.mode, fQ)
                } else {
                    dc(fO, fS.text, fQ);
                    fS.stateAfter = fR.frontier % 5 == 0 ? bR(fR.mode, fQ) : null
                }
                ++fR.frontier;
                if (+new Date > fP) {
                    dR(fO, fO.options.workDelay);
                    return true
                }
            })
        })
    }
    function co(fU, fO, fR) {
        var fP, fS, fT = fU.doc;
        var fQ = fR ? -1 : fO - (fU.doc.mode.innerMode ? 1000 : 100);
        for (var fX = fO; fX > fQ; --fX) {
            if (fX <= fT.first) {
                return fT.first
            }
            var fW = eP(fT, fX - 1);
            if (fW.stateAfter && (!fR || fX <= fT.frontier)) {
                return fX
            }
            var fV = bI(fW.text, null, fU.options.tabSize);
            if (fS == null || fP > fV) {
                fS = fX - 1;
                fP = fV
            }
        }
        return fS
    }
    function dg(fO, fU, fP) {
        var fS = fO.doc, fR = fO.display;
        if (!fS.mode.startState) {
            return true
        }
        var fT = co(fO, fU, fP), fQ = fT > fS.first && eP(fS, fT - 1).stateAfter;
        if (!fQ) {
            fQ = bP(fS.mode)
        } else {
            fQ = bR(fS.mode, fQ)
        }
        fS.iter(fT, fU, function(fV) {
            dc(fO, fV.text, fQ);
            var fW = fT == fU - 1 || fT % 5 == 0 || fT >= fR.viewFrom && fT < fR.viewTo;
            fV.stateAfter = fW ? bR(fS.mode, fQ) : null;
            ++fT
        });
        if (fP) {
            fS.frontier = fT
        }
        return fQ
    }
    function eI(fO) {
        return fO.lineSpace.offsetTop
    }
    function bx(fO) {
        return fO.mover.offsetHeight - fO.lineSpace.offsetHeight
    }
    function eG(fR) {
        if (fR.cachedPaddingH) {
            return fR.cachedPaddingH
        }
        var fQ = bG(fR.measure, fx("pre", "x"));
        var fO = window.getComputedStyle ? window.getComputedStyle(fQ) : fQ.currentStyle;
        var fP = {left: parseInt(fO.paddingLeft),right: parseInt(fO.paddingRight)};
        if (!isNaN(fP.left) && !isNaN(fP.right)) {
            fR.cachedPaddingH = fP
        }
        return fP
    }
    function b8(fV, fR, fU) {
        var fQ = fV.options.lineWrapping;
        var fS = fQ && fV.display.scroller.clientWidth;
        if (!fR.measure.heights || fQ && fR.measure.width != fS) {
            var fT = fR.measure.heights = [];
            if (fQ) {
                fR.measure.width = fS;
                var fX = fR.text.firstChild.getClientRects();
                for (var fO = 0; fO < fX.length - 1; fO++) {
                    var fW = fX[fO], fP = fX[fO + 1];
                    if (Math.abs(fW.bottom - fP.bottom) > 2) {
                        fT.push((fW.bottom + fP.top) / 2 - fU.top)
                    }
                }
            }
            fT.push(fU.bottom - fU.top)
        }
    }
    function cj(fQ, fO, fR) {
        if (fQ.line == fO) {
            return {map: fQ.measure.map,cache: fQ.measure.cache}
        }
        for (var fP = 0; fP < fQ.rest.length; fP++) {
            if (fQ.rest[fP] == fO) {
                return {map: fQ.measure.maps[fP],cache: fQ.measure.caches[fP]}
            }
        }
        for (var fP = 0; fP < fQ.rest.length; fP++) {
            if (bC(fQ.rest[fP]) > fR) {
                return {map: fQ.measure.maps[fP],cache: fQ.measure.caches[fP],before: true}
            }
        }
    }
    function cK(fO, fQ) {
        fQ = z(fQ);
        var fS = bC(fQ);
        var fP = fO.display.externalMeasured = new bl(fO.doc, fQ, fS);
        fP.lineN = fS;
        var fR = fP.built = ev(fO, fP);
        fP.text = fR.pre;
        bG(fO.display.lineMeasure, fR.pre);
        return fP
    }
    function dT(fO, fP, fR, fQ) {
        return D(fO, aU(fO, fP), fR, fQ)
    }
    function eL(fO, fQ) {
        if (fQ >= fO.display.viewFrom && fQ < fO.display.viewTo) {
            return fO.display.view[c7(fO, fQ)]
        }
        var fP = fO.display.externalMeasured;
        if (fP && fQ >= fP.lineN && fQ < fP.lineN + fP.size) {
            return fP
        }
    }
    function aU(fO, fQ) {
        var fR = bC(fQ);
        var fP = eL(fO, fR);
        if (fP && !fP.text) {
            fP = null
        } else {
            if (fP && fP.changes) {
                Z(fO, fP, fR, eM(fO))
            }
        }
        if (!fP) {
            fP = cK(fO, fQ)
        }
        var fS = cj(fP, fQ, fR);
        return {line: fQ,view: fP,rect: null,map: fS.map,cache: fS.cache,before: fS.before,hasHeights: false}
    }
    function D(fO, fT, fR, fP) {
        if (fT.before) {
            fR = -1
        }
        var fQ = fR + (fP || ""), fS;
        if (fT.cache.hasOwnProperty(fQ)) {
            fS = fT.cache[fQ]
        } else {
            if (!fT.rect) {
                fT.rect = fT.view.text.getBoundingClientRect()
            }
            if (!fT.hasHeights) {
                b8(fO, fT.view, fT.rect);
                fT.hasHeights = true
            }
            fS = k(fO, fT, fR, fP);
            if (!fS.bogus) {
                fT.cache[fQ] = fS
            }
        }
        return {left: fS.left,right: fS.right,top: fS.top,bottom: fS.bottom}
    }
    var ee = {left: 0,right: 0,top: 0,bottom: 0};
    function k(fV, f3, fX, fT) {
        var f6 = f3.map;
        var f0, fS, fR, fO;
        for (var f2 = 0; f2 < f6.length; f2 += 3) {
            var f5 = f6[f2], f1 = f6[f2 + 1];
            if (fX < f5) {
                fS = 0;
                fR = 1;
                fO = "left"
            } else {
                if (fX < f1) {
                    fS = fX - f5;
                    fR = fS + 1
                } else {
                    if (f2 == f6.length - 3 || fX == f1 && f6[f2 + 3] > fX) {
                        fR = f1 - f5;
                        fS = fR - 1;
                        if (fX >= f1) {
                            fO = "right"
                        }
                    }
                }
            }
            if (fS != null) {
                f0 = f6[f2 + 2];
                if (f5 == f1 && fT == (f0.insertLeft ? "left" : "right")) {
                    fO = fT
                }
                if (fT == "left" && fS == 0) {
                    while (f2 && f6[f2 - 2] == f6[f2 - 3] && f6[f2 - 1].insertLeft) {
                        f0 = f6[(f2 -= 3) + 2];
                        fO = "left"
                    }
                }
                if (fT == "right" && fS == f1 - f5) {
                    while (f2 < f6.length - 3 && f6[f2 + 3] == f6[f2 + 4] && !f6[f2 + 5].insertLeft) {
                        f0 = f6[(f2 += 3) + 2];
                        fO = "right"
                    }
                }
                break
            }
        }
        var fP;
        if (f0.nodeType == 3) {
            while (fS && e0(f3.line.text.charAt(f5 + fS))) {
                --fS
            }
            while (f5 + fR < f1 && e0(f3.line.text.charAt(f5 + fR))) {
                ++fR
            }
            if (bY && fS == 0 && fR == f1 - f5) {
                fP = f0.parentNode.getBoundingClientRect()
            } else {
                if (dn && fV.options.lineWrapping) {
                    var fQ = cb(f0, fS, fR).getClientRects();
                    if (fQ.length) {
                        fP = fQ[fT == "right" ? fQ.length - 1 : 0]
                    } else {
                        fP = ee
                    }
                } else {
                    fP = cb(f0, fS, fR).getBoundingClientRect() || ee
                }
            }
        } else {
            if (fS > 0) {
                fO = fT = "right"
            }
            var fQ;
            if (fV.options.lineWrapping && (fQ = f0.getClientRects()).length > 1) {
                fP = fQ[fT == "right" ? fQ.length - 1 : 0]
            } else {
                fP = f0.getBoundingClientRect()
            }
        }
        if (bY && !fS && (!fP || !fP.left && !fP.right)) {
            var fU = f0.parentNode.getClientRects()[0];
            if (fU) {
                fP = {left: fU.left,right: fU.left + di(fV.display),top: fU.top,bottom: fU.bottom}
            } else {
                fP = ee
            }
        }
        var fZ, fY = (fP.bottom + fP.top) / 2 - f3.rect.top;
        var f4 = f3.view.measure.heights;
        for (var f2 = 0; f2 < f4.length - 1; f2++) {
            if (fY < f4[f2]) {
                break
            }
        }
        fZ = f2 ? f4[f2 - 1] : 0;
        fY = f4[f2];
        var fW = {left: (fO == "right" ? fP.right : fP.left) - f3.rect.left,right: (fO == "left" ? fP.left : fP.right) - f3.rect.left,top: fZ,bottom: fY};
        if (!fP.left && !fP.right) {
            fW.bogus = true
        }
        return fW
    }
    function ap(fP) {
        if (fP.measure) {
            fP.measure.cache = {};
            fP.measure.heights = null;
            if (fP.rest) {
                for (var fO = 0; fO < fP.rest.length; fO++) {
                    fP.measure.caches[fO] = {}
                }
            }
        }
    }
    function aF(fO) {
        fO.display.externalMeasure = null;
        dE(fO.display.lineMeasure);
        for (var fP = 0; fP < fO.display.view.length; fP++) {
            ap(fO.display.view[fP])
        }
    }
    function ai(fO) {
        aF(fO);
        fO.display.cachedCharWidth = fO.display.cachedTextHeight = fO.display.cachedPaddingH = null;
        if (!fO.options.lineWrapping) {
            fO.display.maxLineChanged = true
        }
        fO.display.lineNumChars = null
    }
    function ck() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function ci() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function et(fU, fR, fT, fP) {
        if (fR.widgets) {
            for (var fQ = 0; fQ < fR.widgets.length; ++fQ) {
                if (fR.widgets[fQ].above) {
                    var fW = cH(fR.widgets[fQ]);
                    fT.top += fW;
                    fT.bottom += fW
                }
            }
        }
        if (fP == "line") {
            return fT
        }
        if (!fP) {
            fP = "local"
        }
        var fS = bB(fR);
        if (fP == "local") {
            fS += eI(fU.display)
        } else {
            fS -= fU.display.viewOffset
        }
        if (fP == "page" || fP == "window") {
            var fO = fU.display.lineSpace.getBoundingClientRect();
            fS += fO.top + (fP == "window" ? 0 : ci());
            var fV = fO.left + (fP == "window" ? 0 : ck());
            fT.left += fV;
            fT.right += fV
        }
        fT.top += fS;
        fT.bottom += fS;
        return fT
    }
    function fK(fP, fS, fQ) {
        if (fQ == "div") {
            return fS
        }
        var fU = fS.left, fT = fS.top;
        if (fQ == "page") {
            fU -= ck();
            fT -= ci()
        } else {
            if (fQ == "local" || !fQ) {
                var fR = fP.display.sizer.getBoundingClientRect();
                fU += fR.left;
                fT += fR.top
            }
        }
        var fO = fP.display.lineSpace.getBoundingClientRect();
        return {left: fU - fO.left,top: fT - fO.top}
    }
    function cx(fO, fS, fR, fQ, fP) {
        if (!fQ) {
            fQ = eP(fO.doc, fS.line)
        }
        return et(fO, fQ, dT(fO, fQ, fS.ch, fP), fR)
    }
    function dx(fW, fV, fQ, fU, fY) {
        fU = fU || eP(fW.doc, fV.line);
        if (!fY) {
            fY = aU(fW, fU)
        }
        function fS(f1, f0) {
            var fZ = D(fW, fY, f1, f0 ? "right" : "left");
            if (f0) {
                fZ.left = fZ.right
            } else {
                fZ.right = fZ.left
            }
            return et(fW, fU, fZ, fQ)
        }
        function fX(f2, fZ) {
            var f0 = fT[fZ], f1 = f0.level % 2;
            if (f2 == dd(f0) && fZ && f0.level < fT[fZ - 1].level) {
                f0 = fT[--fZ];
                f2 = fJ(f0) - (f0.level % 2 ? 0 : 1);
                f1 = true
            } else {
                if (f2 == fJ(f0) && fZ < fT.length - 1 && f0.level < fT[fZ + 1].level) {
                    f0 = fT[++fZ];
                    f2 = dd(f0) - f0.level % 2;
                    f1 = false
                }
            }
            if (f1 && f2 == f0.to && f2 > f0.from) {
                return fS(f2 - 1)
            }
            return fS(f2, f1)
        }
        var fT = a(fU), fO = fV.ch;
        if (!fT) {
            return fS(fO)
        }
        var fP = aB(fT, fO);
        var fR = fX(fO, fP);
        if (eE != null) {
            fR.other = fX(fO, eE)
        }
        return fR
    }
    function dm(fO, fS) {
        var fR = 0, fS = fk(fO.doc, fS);
        if (!fO.options.lineWrapping) {
            fR = di(fO.display) * fS.ch
        }
        var fP = eP(fO.doc, fS.line);
        var fQ = bB(fP) + eI(fO.display);
        return {left: fR,right: fR,top: fQ,bottom: fQ + fP.height}
    }
    function fw(fO, fP, fQ, fS) {
        var fR = W(fO, fP);
        fR.xRel = fS;
        if (fQ) {
            fR.outside = true
        }
        return fR
    }
    function fp(fV, fS, fR) {
        var fU = fV.doc;
        fR += fV.display.viewOffset;
        if (fR < 0) {
            return fw(fU.first, 0, true, -1)
        }
        var fQ = bv(fU, fR), fW = fU.first + fU.size - 1;
        if (fQ > fW) {
            return fw(fU.first + fU.size - 1, eP(fU, fW).text.length, true, 1)
        }
        if (fS < 0) {
            fS = 0
        }
        var fP = eP(fU, fQ);
        for (; ; ) {
            var fX = cI(fV, fP, fQ, fS, fR);
            var fT = d7(fP);
            var fO = fT && fT.find(0, true);
            if (fT && (fX.ch > fO.from.ch || fX.ch == fO.from.ch && fX.xRel > 0)) {
                fQ = bC(fP = fO.to.line)
            } else {
                return fX
            }
        }
    }
    function cI(fY, fQ, f1, f0, fZ) {
        var fX = fZ - bB(fQ);
        var fU = false, f7 = 2 * fY.display.wrapper.clientWidth;
        var f4 = aU(fY, fQ);
        function gb(gd) {
            var ge = dx(fY, W(f1, gd), "line", fQ, f4);
            fU = true;
            if (fX > ge.bottom) {
                return ge.left - f7
            } else {
                if (fX < ge.top) {
                    return ge.left + f7
                } else {
                    fU = false
                }
            }
            return ge.left
        }
        var f3 = a(fQ), f6 = fQ.text.length;
        var f8 = ct(fQ), fR = cE(fQ);
        var f5 = gb(f8), fO = fU, fP = gb(fR), fT = fU;
        if (f0 > fP) {
            return fw(f1, fR, fT, 1)
        }
        for (; ; ) {
            if (f3 ? fR == f8 || fR == v(fQ, f8, 1) : fR - f8 <= 1) {
                var f2 = f0 < f5 || f0 - f5 <= fP - f0 ? f8 : fR;
                var ga = f0 - (f2 == f8 ? f5 : fP);
                while (e0(fQ.text.charAt(f2))) {
                    ++f2
                }
                var fW = fw(f1, f2, f2 == f8 ? fO : fT, ga < -1 ? -1 : ga > 1 ? 1 : 0);
                return fW
            }
            var fV = Math.ceil(f6 / 2), gc = f8 + fV;
            if (f3) {
                gc = f8;
                for (var f9 = 0; f9 < fV; ++f9) {
                    gc = v(fQ, gc, 1)
                }
            }
            var fS = gb(gc);
            if (fS > f0) {
                fR = gc;
                fP = fS;
                if (fT = fU) {
                    fP += 1000
                }
                f6 = fV
            } else {
                f8 = gc;
                f5 = fS;
                fO = fU;
                f6 -= fV
            }
        }
    }
    var aC;
    function aN(fQ) {
        if (fQ.cachedTextHeight != null) {
            return fQ.cachedTextHeight
        }
        if (aC == null) {
            aC = fx("pre");
            for (var fP = 0; fP < 49; ++fP) {
                aC.appendChild(document.createTextNode("x"));
                aC.appendChild(fx("br"))
            }
            aC.appendChild(document.createTextNode("x"))
        }
        bG(fQ.measure, aC);
        var fO = aC.offsetHeight / 50;
        if (fO > 3) {
            fQ.cachedTextHeight = fO
        }
        dE(fQ.measure);
        return fO || 1
    }
    function di(fS) {
        if (fS.cachedCharWidth != null) {
            return fS.cachedCharWidth
        }
        var fO = fx("span", "xxxxxxxxxx");
        var fR = fx("pre", [fO]);
        bG(fS.measure, fR);
        var fQ = fO.getBoundingClientRect(), fP = (fQ.right - fQ.left) / 10;
        if (fP > 2) {
            fS.cachedCharWidth = fP
        }
        return fP || 10
    }
    var dL = 0;
    function cw(fO) {
        fO.curOp = {viewChanged: false,startHeight: fO.doc.height,forceUpdate: false,updateInput: null,typing: false,changeObjs: null,cursorActivityHandlers: null,selectionChanged: false,updateMaxLine: false,scrollLeft: null,scrollTop: null,scrollToPos: null,id: ++dL};
        if (!ch++) {
            be = []
        }
    }
    function aj(fZ) {
        var fU = fZ.curOp, fY = fZ.doc, fV = fZ.display;
        fZ.curOp = null;
        if (fU.updateMaxLine) {
            h(fZ)
        }
        if (fU.viewChanged || fU.forceUpdate || fU.scrollTop != null || fU.scrollToPos && (fU.scrollToPos.from.line < fV.viewFrom || fU.scrollToPos.to.line >= fV.viewTo) || fV.maxLineChanged && fZ.options.lineWrapping) {
            var fS = dp(fZ, {top: fU.scrollTop,ensure: fU.scrollToPos}, fU.forceUpdate);
            if (fZ.display.scroller.offsetHeight) {
                fZ.doc.scrollTop = fZ.display.scroller.scrollTop
            }
        }
        if (!fS && fU.selectionChanged) {
            br(fZ)
        }
        if (!fS && fU.startHeight != fZ.doc.height) {
            eB(fZ)
        }
        if (fV.wheelStartX != null && (fU.scrollTop != null || fU.scrollLeft != null || fU.scrollToPos)) {
            fV.wheelStartX = fV.wheelStartY = null
        }
        if (fU.scrollTop != null && fV.scroller.scrollTop != fU.scrollTop) {
            var fW = Math.max(0, Math.min(fV.scroller.scrollHeight - fV.scroller.clientHeight, fU.scrollTop));
            fV.scroller.scrollTop = fV.scrollbarV.scrollTop = fY.scrollTop = fW
        }
        if (fU.scrollLeft != null && fV.scroller.scrollLeft != fU.scrollLeft) {
            var fP = Math.max(0, Math.min(fV.scroller.scrollWidth - fV.scroller.clientWidth, fU.scrollLeft));
            fV.scroller.scrollLeft = fV.scrollbarH.scrollLeft = fY.scrollLeft = fP;
            ei(fZ)
        }
        if (fU.scrollToPos) {
            var fX = E(fZ, fk(fZ.doc, fU.scrollToPos.from), fk(fZ.doc, fU.scrollToPos.to), fU.scrollToPos.margin);
            if (fU.scrollToPos.isCursor && fZ.state.focused) {
                dJ(fZ, fX)
            }
        }
        if (fU.selectionChanged) {
            p(fZ)
        }
        if (fZ.state.focused && fU.updateInput) {
            eZ(fZ, fU.typing)
        }
        var fT = fU.maybeHiddenMarkers, fO = fU.maybeUnhiddenMarkers;
        if (fT) {
            for (var fR = 0; fR < fT.length; ++fR) {
                if (!fT[fR].lines.length) {
                    az(fT[fR], "hide")
                }
            }
        }
        if (fO) {
            for (var fR = 0; fR < fO.length; ++fR) {
                if (fO[fR].lines.length) {
                    az(fO[fR], "unhide")
                }
            }
        }
        var fQ;
        if (!--ch) {
            fQ = be;
            be = null
        }
        if (fU.changeObjs) {
            az(fZ, "changes", fZ, fU.changeObjs)
        }
        if (fQ) {
            for (var fR = 0; fR < fQ.length; ++fR) {
                fQ[fR]()
            }
        }
        if (fU.cursorActivityHandlers) {
            for (var fR = 0; fR < fU.cursorActivityHandlers.length; fR++) {
                fU.cursorActivityHandlers[fR](fZ)
            }
        }
    }
    function cz(fO, fP) {
        if (fO.curOp) {
            return fP()
        }
        cw(fO);
        try {
            return fP()
        }finally {
            aj(fO)
        }
    }
    function cL(fO, fP) {
        return function() {
            if (fO.curOp) {
                return fP.apply(fO, arguments)
            }
            cw(fO);
            try {
                return fP.apply(fO, arguments)
            }finally {
                aj(fO)
            }
        }
    }
    function cR(fO) {
        return function() {
            if (this.curOp) {
                return fO.apply(this, arguments)
            }
            cw(this);
            try {
                return fO.apply(this, arguments)
            }finally {
                aj(this)
            }
        }
    }
    function cs(fO) {
        return function() {
            var fP = this.cm;
            if (!fP || fP.curOp) {
                return fO.apply(this, arguments)
            }
            cw(fP);
            try {
                return fO.apply(this, arguments)
            }finally {
                aj(fP)
            }
        }
    }
    function bl(fQ, fO, fP) {
        this.line = fO;
        this.rest = i(fO);
        this.size = this.rest ? bC(fi(this.rest)) - fP + 1 : 1;
        this.node = this.text = null;
        this.hidden = e7(fQ, fO)
    }
    function ey(fO, fU, fT) {
        var fS = [], fQ;
        for (var fR = fU; fR < fT; fR = fQ) {
            var fP = new bl(fO.doc, eP(fO.doc, fR), fR);
            fQ = fR + fP.size;
            fS.push(fP)
        }
        return fS
    }
    function af(fV, fT, fU, fW) {
        if (fT == null) {
            fT = fV.doc.first
        }
        if (fU == null) {
            fU = fV.doc.first + fV.doc.size
        }
        if (!fW) {
            fW = 0
        }
        var fQ = fV.display;
        if (fW && fU < fQ.viewTo && (fQ.updateLineNumbers == null || fQ.updateLineNumbers > fT)) {
            fQ.updateLineNumbers = fT
        }
        fV.curOp.viewChanged = true;
        if (fT >= fQ.viewTo) {
            if (aX && aM(fV.doc, fT) < fQ.viewTo) {
                d9(fV)
            }
        } else {
            if (fU <= fQ.viewFrom) {
                if (aX && dG(fV.doc, fU + fW) > fQ.viewFrom) {
                    d9(fV)
                } else {
                    fQ.viewFrom += fW;
                    fQ.viewTo += fW
                }
            } else {
                if (fT <= fQ.viewFrom && fU >= fQ.viewTo) {
                    d9(fV)
                } else {
                    if (fT <= fQ.viewFrom) {
                        var fS = cX(fV, fU, fU + fW, 1);
                        if (fS) {
                            fQ.view = fQ.view.slice(fS.index);
                            fQ.viewFrom = fS.lineN;
                            fQ.viewTo += fW
                        } else {
                            d9(fV)
                        }
                    } else {
                        if (fU >= fQ.viewTo) {
                            var fS = cX(fV, fT, fT, -1);
                            if (fS) {
                                fQ.view = fQ.view.slice(0, fS.index);
                                fQ.viewTo = fS.lineN
                            } else {
                                d9(fV)
                            }
                        } else {
                            var fR = cX(fV, fT, fT, -1);
                            var fP = cX(fV, fU, fU + fW, 1);
                            if (fR && fP) {
                                fQ.view = fQ.view.slice(0, fR.index).concat(ey(fV, fR.lineN, fP.lineN)).concat(fQ.view.slice(fP.index));
                                fQ.viewTo += fW
                            } else {
                                d9(fV)
                            }
                        }
                    }
                }
            }
        }
        var fO = fQ.externalMeasured;
        if (fO) {
            if (fU < fO.lineN) {
                fO.lineN += fW
            } else {
                if (fT < fO.lineN + fO.size) {
                    fQ.externalMeasured = null
                }
            }
        }
    }
    function R(fP, fQ, fT) {
        fP.curOp.viewChanged = true;
        var fU = fP.display, fS = fP.display.externalMeasured;
        if (fS && fQ >= fS.lineN && fQ < fS.lineN + fS.size) {
            fU.externalMeasured = null
        }
        if (fQ < fU.viewFrom || fQ >= fU.viewTo) {
            return
        }
        var fR = fU.view[c7(fP, fQ)];
        if (fR.node == null) {
            return
        }
        var fO = fR.changes || (fR.changes = []);
        if (c1(fO, fT) == -1) {
            fO.push(fT)
        }
    }
    function d9(fO) {
        fO.display.viewFrom = fO.display.viewTo = fO.doc.first;
        fO.display.view = [];
        fO.display.viewOffset = 0
    }
    function c7(fO, fR) {
        if (fR >= fO.display.viewTo) {
            return null
        }
        fR -= fO.display.viewFrom;
        if (fR < 0) {
            return null
        }
        var fP = fO.display.view;
        for (var fQ = 0; fQ < fP.length; fQ++) {
            fR -= fP[fQ].size;
            if (fR < 0) {
                return fQ
            }
        }
    }
    function cX(fW, fQ, fS, fP) {
        var fT = c7(fW, fQ), fV, fU = fW.display.view;
        if (!aX || fS == fW.doc.first + fW.doc.size) {
            return {index: fT,lineN: fS}
        }
        for (var fR = 0, fO = fW.display.viewFrom; fR < fT; fR++) {
            fO += fU[fR].size
        }
        if (fO != fQ) {
            if (fP > 0) {
                if (fT == fU.length - 1) {
                    return null
                }
                fV = (fO + fU[fT].size) - fQ;
                fT++
            } else {
                fV = fO - fQ
            }
            fQ += fV;
            fS += fV
        }
        while (aM(fW.doc, fS) != fS) {
            if (fT == (fP < 0 ? 0 : fU.length - 1)) {
                return null
            }
            fS += fP * fU[fT - (fP < 0 ? 1 : 0)].size;
            fT += fP
        }
        return {index: fT,lineN: fS}
    }
    function cD(fO, fS, fR) {
        var fQ = fO.display, fP = fQ.view;
        if (fP.length == 0 || fS >= fQ.viewTo || fR <= fQ.viewFrom) {
            fQ.view = ey(fO, fS, fR);
            fQ.viewFrom = fS
        } else {
            if (fQ.viewFrom > fS) {
                fQ.view = ey(fO, fS, fQ.viewFrom).concat(fQ.view)
            } else {
                if (fQ.viewFrom < fS) {
                    fQ.view = fQ.view.slice(c7(fO, fS))
                }
            }
            fQ.viewFrom = fS;
            if (fQ.viewTo < fR) {
                fQ.view = fQ.view.concat(ey(fO, fQ.viewTo, fR))
            } else {
                if (fQ.viewTo > fR) {
                    fQ.view = fQ.view.slice(0, c7(fO, fR))
                }
            }
        }
        fQ.viewTo = fR
    }
    function cU(fO) {
        var fP = fO.display.view, fS = 0;
        for (var fR = 0; fR < fP.length; fR++) {
            var fQ = fP[fR];
            if (!fQ.hidden && (!fQ.node || fQ.changes)) {
                ++fS
            }
        }
        return fS
    }
    function bc(fO) {
        if (fO.display.pollingFast) {
            return
        }
        fO.display.poll.set(fO.options.pollInterval, function() {
            b7(fO);
            if (fO.state.focused) {
                bc(fO)
            }
        })
    }
    function C(fO) {
        var fP = false;
        fO.display.pollingFast = true;
        function fQ() {
            var fR = b7(fO);
            if (!fR && !fP) {
                fP = true;
                fO.display.poll.set(60, fQ)
            } else {
                fO.display.pollingFast = false;
                bc(fO)
            }
        }
        fO.display.poll.set(20, fQ)
    }
    function b7(fS) {
        var fT = fS.display.input, fW = fS.display.prevInput, f7 = fS.doc;
        if (!fS.state.focused || (bi(fT) && !fW) || ah(fS) || fS.options.disableInput) {
            return false
        }
        if (fS.state.pasteIncoming && fS.state.fakedLastChar) {
            fT.value = fT.value.substring(0, fT.value.length - 1);
            fS.state.fakedLastChar = false
        }
        var fV = fT.value;
        if (fV == fW && !fS.somethingSelected()) {
            return false
        }
        if (dn && !bY && fS.display.inputHasSelection === fV) {
            eZ(fS);
            return false
        }
        var f3 = !fS.curOp;
        if (f3) {
            cw(fS)
        }
        fS.display.shift = false;
        if (fV.charCodeAt(0) == 8203 && f7.sel == fS.display.selForContextMenu && !fW) {
            fW = "\u200b"
        }
        var f2 = 0, fZ = Math.min(fW.length, fV.length);
        while (f2 < fZ && fW.charCodeAt(f2) == fV.charCodeAt(f2)) {
            ++f2
        }
        var fP = fV.slice(f2), fX = aQ(fP);
        var f6 = fS.state.pasteIncoming && fX.length > 1 && f7.sel.ranges.length == fX.length;
        for (var f4 = f7.sel.ranges.length - 1; f4 >= 0; f4--) {
            var fY = f7.sel.ranges[f4];
            var f0 = fY.from(), fO = fY.to();
            if (f2 < fW.length) {
                f0 = W(f0.line, f0.ch - (fW.length - f2))
            } else {
                if (fS.state.overwrite && fY.empty() && !fS.state.pasteIncoming) {
                    fO = W(fO.line, Math.min(eP(f7, fO.line).text.length, fO.ch + fi(fX).length))
                }
            }
            var fR = fS.curOp.updateInput;
            var f5 = {from: f0,to: fO,text: f6 ? [fX[f4]] : fX,origin: fS.state.pasteIncoming ? "paste" : fS.state.cutIncoming ? "cut" : "+input"};
            a5(fS.doc, f5);
            ac(fS, "inputRead", fS, f5);
            if (fP && !fS.state.pasteIncoming && fS.options.electricChars && fS.options.smartIndent && fY.head.ch < 100 && (!f4 || f7.sel.ranges[f4 - 1].head.line != fY.head.line)) {
                var fU = fS.getModeAt(fY.head);
                if (fU.electricChars) {
                    for (var f1 = 0; f1 < fU.electricChars.length; f1++) {
                        if (fP.indexOf(fU.electricChars.charAt(f1)) > -1) {
                            ab(fS, fY.head.line, "smart");
                            break
                        }
                    }
                } else {
                    if (fU.electricInput) {
                        var fQ = cG(f5);
                        if (fU.electricInput.test(eP(f7, fQ.line).text.slice(0, fQ.ch))) {
                            ab(fS, fY.head.line, "smart")
                        }
                    }
                }
            }
        }
        fh(fS);
        fS.curOp.updateInput = fR;
        fS.curOp.typing = true;
        if (fV.length > 1000 || fV.indexOf("\n") > -1) {
            fT.value = fS.display.prevInput = ""
        } else {
            fS.display.prevInput = fV
        }
        if (f3) {
            aj(fS)
        }
        fS.state.pasteIncoming = fS.state.cutIncoming = false;
        return true
    }
    function eZ(fO, fS) {
        var fP, fR, fU = fO.doc;
        if (fO.somethingSelected()) {
            fO.display.prevInput = "";
            var fQ = fU.sel.primary();
            fP = cT && (fQ.to().line - fQ.from().line > 100 || (fR = fO.getSelection()).length > 1000);
            var fT = fP ? "-" : fR || fO.getSelection();
            fO.display.input.value = fT;
            if (fO.state.focused) {
                dq(fO.display.input)
            }
            if (dn && !bY) {
                fO.display.inputHasSelection = fT
            }
        } else {
            if (!fS) {
                fO.display.prevInput = fO.display.input.value = "";
                if (dn && !bY) {
                    fO.display.inputHasSelection = null
                }
            }
        }
        fO.display.inaccurateSelection = fP
    }
    function ed(fO) {
        if (fO.options.readOnly != "nocursor" && (!dS || ds() != fO.display.input)) {
            fO.display.input.focus()
        }
    }
    function s(fO) {
        if (!fO.state.focused) {
            ed(fO);
            cq(fO)
        }
    }
    function ah(fO) {
        return fO.options.readOnly || fO.doc.cantEdit
    }
    function fq(fO) {
        var fQ = fO.display;
        bM(fQ.scroller, "mousedown", cL(fO, d5));
        if (eo) {
            bM(fQ.scroller, "dblclick", cL(fO, function(fU) {
                if (aI(fO, fU)) {
                    return
                }
                var fV = cd(fO, fU);
                if (!fV || m(fO, fU) || a0(fO.display, fU)) {
                    return
                }
                cu(fU);
                var fT = ar(fO, fV);
                fu(fO.doc, fT.anchor, fT.head)
            }))
        } else {
            bM(fQ.scroller, "dblclick", function(fT) {
                aI(fO, fT) || cu(fT)
            })
        }
        bM(fQ.lineSpace, "selectstart", function(fT) {
            if (!a0(fQ, fT)) {
                cu(fT)
            }
        });
        if (!fF) {
            bM(fQ.scroller, "contextmenu", function(fT) {
                av(fO, fT)
            })
        }
        bM(fQ.scroller, "scroll", function() {
            if (fQ.scroller.clientHeight) {
                N(fO, fQ.scroller.scrollTop);
                bt(fO, fQ.scroller.scrollLeft, true);
                az(fO, "scroll", fO)
            }
        });
        bM(fQ.scrollbarV, "scroll", function() {
            if (fQ.scroller.clientHeight) {
                N(fO, fQ.scrollbarV.scrollTop)
            }
        });
        bM(fQ.scrollbarH, "scroll", function() {
            if (fQ.scroller.clientHeight) {
                bt(fO, fQ.scrollbarH.scrollLeft)
            }
        });
        bM(fQ.scroller, "mousewheel", function(fT) {
            c(fO, fT)
        });
        bM(fQ.scroller, "DOMMouseScroll", function(fT) {
            c(fO, fT)
        });
        function fS() {
            if (fO.state.focused) {
                setTimeout(cl(ed, fO), 0)
            }
        }
        bM(fQ.scrollbarH, "mousedown", fS);
        bM(fQ.scrollbarV, "mousedown", fS);
        bM(fQ.wrapper, "scroll", function() {
            fQ.wrapper.scrollTop = fQ.wrapper.scrollLeft = 0
        });
        bM(fQ.input, "keyup", cL(fO, a7));
        bM(fQ.input, "input", function() {
            if (dn && !bY && fO.display.inputHasSelection) {
                fO.display.inputHasSelection = null
            }
            C(fO)
        });
        bM(fQ.input, "keydown", cL(fO, q));
        bM(fQ.input, "keypress", cL(fO, cn));
        bM(fQ.input, "focus", cl(cq, fO));
        bM(fQ.input, "blur", cl(aL, fO));
        function fP(fT) {
            if (!aI(fO, fT)) {
                d3(fT)
            }
        }
        if (fO.options.dragDrop) {
            bM(fQ.scroller, "dragstart", function(fT) {
                Q(fO, fT)
            });
            bM(fQ.scroller, "dragenter", fP);
            bM(fQ.scroller, "dragover", fP);
            bM(fQ.scroller, "drop", cL(fO, a9))
        }
        bM(fQ.scroller, "paste", function(fT) {
            if (a0(fQ, fT)) {
                return
            }
            fO.state.pasteIncoming = true;
            ed(fO);
            C(fO)
        });
        bM(fQ.input, "paste", function() {
            if (cJ && !fO.state.fakedLastChar && !(new Date - fO.state.lastMiddleDown < 200)) {
                var fU = fQ.input.selectionStart, fT = fQ.input.selectionEnd;
                fQ.input.value += "$";
                fQ.input.selectionStart = fU;
                fQ.input.selectionEnd = fT;
                fO.state.fakedLastChar = true
            }
            fO.state.pasteIncoming = true;
            C(fO)
        });
        function fR(fX) {
            if (fO.somethingSelected()) {
                if (fQ.inaccurateSelection) {
                    fQ.prevInput = "";
                    fQ.inaccurateSelection = false;
                    fQ.input.value = fO.getSelection();
                    dq(fQ.input)
                }
            } else {
                var fY = "", fU = [];
                for (var fV = 0; fV < fO.doc.sel.ranges.length; fV++) {
                    var fT = fO.doc.sel.ranges[fV].head.line;
                    var fW = {anchor: W(fT, 0),head: W(fT + 1, 0)};
                    fU.push(fW);
                    fY += fO.getRange(fW.anchor, fW.head)
                }
                if (fX.type == "cut") {
                    fO.setSelections(fU, null, Y)
                } else {
                    fQ.prevInput = "";
                    fQ.input.value = fY;
                    dq(fQ.input)
                }
            }
            if (fX.type == "cut") {
                fO.state.cutIncoming = true
            }
        }
        bM(fQ.input, "cut", fR);
        bM(fQ.input, "copy", fR);
        if (a1) {
            bM(fQ.sizer, "mouseup", function() {
                if (ds() == fQ.input) {
                    fQ.input.blur()
                }
                ed(fO)
            })
        }
    }
    function aK(fO) {
        var fP = fO.display;
        fP.cachedCharWidth = fP.cachedTextHeight = fP.cachedPaddingH = null;
        fO.setSize()
    }
    function a0(fP, fO) {
        for (var fQ = L(fO); fQ != fP.wrapper; fQ = fQ.parentNode) {
            if (!fQ || fQ.ignoreEvents || fQ.parentNode == fP.sizer && fQ != fP.mover) {
                return true
            }
        }
    }
    function cd(fY, fS, fP, fQ) {
        var fU = fY.display;
        if (!fP) {
            var fT = L(fS);
            if (fT == fU.scrollbarH || fT == fU.scrollbarV || fT == fU.scrollbarFiller || fT == fU.gutterFiller) {
                return null
            }
        }
        var fX, fV, fO = fU.lineSpace.getBoundingClientRect();
        try {
            fX = fS.clientX - fO.left;
            fV = fS.clientY - fO.top
        } catch (fS) {
            return null
        }
        var fW = fp(fY, fX, fV), fZ;
        if (fQ && fW.xRel == 1 && (fZ = eP(fY.doc, fW.line).text).length == fW.ch) {
            var fR = bI(fZ, fZ.length, fY.options.tabSize) - fZ.length;
            fW = W(fW.line, Math.max(0, Math.round((fX - eG(fY.display).left) / di(fY.display)) - fR))
        }
        return fW
    }
    function d5(fQ) {
        if (aI(this, fQ)) {
            return
        }
        var fO = this, fP = fO.display;
        fP.shift = fQ.shiftKey;
        if (a0(fP, fQ)) {
            if (!cJ) {
                fP.scroller.draggable = false;
                setTimeout(function() {
                    fP.scroller.draggable = true
                }, 100)
            }
            return
        }
        if (m(fO, fQ)) {
            return
        }
        var fR = cd(fO, fQ);
        window.focus();
        switch (fo(fQ)) {
            case 1:
                if (fR) {
                    au(fO, fQ, fR)
                } else {
                    if (L(fQ) == fP.scroller) {
                        cu(fQ)
                    }
                }
                break;
            case 2:
                if (cJ) {
                    fO.state.lastMiddleDown = +new Date
                }
                if (fR) {
                    fu(fO.doc, fR)
                }
                setTimeout(cl(ed, fO), 20);
                cu(fQ);
                break;
            case 3:
                if (fF) {
                    av(fO, fQ)
                }
                break
        }
    }
    var c4, cW;
    function au(fP, fT, fU) {
        setTimeout(cl(s, fP), 0);
        var fQ = +new Date, fR;
        if (cW && cW.time > fQ - 400 && b5(cW.pos, fU) == 0) {
            fR = "triple"
        } else {
            if (c4 && c4.time > fQ - 400 && b5(c4.pos, fU) == 0) {
                fR = "double";
                cW = {time: fQ,pos: fU}
            } else {
                fR = "single";
                c4 = {time: fQ,pos: fU}
            }
        }
        var fS = fP.doc.sel, fO = bU ? fT.metaKey : fT.ctrlKey;
        if (fP.options.dragDrop && ep && !ah(fP) && fR == "single" && fS.contains(fU) > -1 && fS.somethingSelected()) {
            aT(fP, fT, fU, fO)
        } else {
            n(fP, fT, fU, fR, fO)
        }
    }
    function aT(fQ, fS, fT, fP) {
        var fR = fQ.display;
        var fO = cL(fQ, function(fU) {
            if (cJ) {
                fR.scroller.draggable = false
            }
            fQ.state.draggingText = false;
            dP(document, "mouseup", fO);
            dP(fR.scroller, "drop", fO);
            if (Math.abs(fS.clientX - fU.clientX) + Math.abs(fS.clientY - fU.clientY) < 10) {
                cu(fU);
                if (!fP) {
                    fu(fQ.doc, fT)
                }
                ed(fQ);
                if (eo && !bY) {
                    setTimeout(function() {
                        document.body.focus();
                        ed(fQ)
                    }, 20)
                }
            }
        });
        if (cJ) {
            fR.scroller.draggable = true
        }
        fQ.state.draggingText = fO;
        if (fR.scroller.dragDrop) {
            fR.scroller.dragDrop()
        }
        bM(document, "mouseup", fO);
        bM(fR.scroller, "drop", fO)
    }
    function n(fR, f5, fQ, fO, fT) {
        var f2 = fR.display, f7 = fR.doc;
        cu(f5);
        var fP, f6, fS = f7.sel;
        if (fT && !f5.shiftKey) {
            f6 = f7.sel.contains(fQ);
            if (f6 > -1) {
                fP = f7.sel.ranges[f6]
            } else {
                fP = new dB(fQ, fQ)
            }
        } else {
            fP = f7.sel.primary()
        }
        if (f5.altKey) {
            fO = "rect";
            if (!fT) {
                fP = new dB(fQ, fQ)
            }
            fQ = cd(fR, f5, true, true);
            f6 = -1
        } else {
            if (fO == "double") {
                var f3 = ar(fR, fQ);
                if (fR.display.shift || f7.extend) {
                    fP = e6(f7, fP, f3.anchor, f3.head)
                } else {
                    fP = f3
                }
            } else {
                if (fO == "triple") {
                    var fW = new dB(W(fQ.line, 0), fk(f7, W(fQ.line + 1, 0)));
                    if (fR.display.shift || f7.extend) {
                        fP = e6(f7, fP, fW.anchor, fW.head)
                    } else {
                        fP = fW
                    }
                } else {
                    fP = e6(f7, fP, fQ)
                }
            }
        }
        if (!fT) {
            f6 = 0;
            bJ(f7, new fy([fP], 0), M);
            fS = f7.sel
        } else {
            if (f6 > -1) {
                f(f7, f6, fP, M)
            } else {
                f6 = f7.sel.ranges.length;
                bJ(f7, cm(f7.sel.ranges.concat([fP]), f6), {scroll: false,origin: "*mouse"})
            }
        }
        var f1 = fQ;
        function f0(gi) {
            if (b5(f1, gi) == 0) {
                return
            }
            f1 = gi;
            if (fO == "rect") {
                var f9 = [], gf = fR.options.tabSize;
                var f8 = bI(eP(f7, fQ.line).text, fQ.ch, gf);
                var gl = bI(eP(f7, gi.line).text, gi.ch, gf);
                var ga = Math.min(f8, gl), gj = Math.max(f8, gl);
                for (var gm = Math.min(fQ.line, gi.line), gc = Math.min(fR.lastLine(), Math.max(fQ.line, gi.line)); gm <= gc; gm++) {
                    var gk = eP(f7, gm).text, gb = d2(gk, ga, gf);
                    if (ga == gj) {
                        f9.push(new dB(W(gm, gb), W(gm, gb)))
                    } else {
                        if (gk.length > gb) {
                            f9.push(new dB(W(gm, gb), W(gm, d2(gk, gj, gf))))
                        }
                    }
                }
                if (!f9.length) {
                    f9.push(new dB(fQ, fQ))
                }
                bJ(f7, cm(fS.ranges.slice(0, f6).concat(f9), f6), {origin: "*mouse",scroll: false});
                fR.scrollIntoView(gi)
            } else {
                var gg = fP;
                var gd = gg.anchor, gh = gi;
                if (fO != "single") {
                    if (fO == "double") {
                        var ge = ar(fR, gi)
                    } else {
                        var ge = new dB(W(gi.line, 0), fk(f7, W(gi.line + 1, 0)))
                    }
                    if (b5(ge.anchor, gd) > 0) {
                        gh = ge.head;
                        gd = am(gg.from(), ge.anchor)
                    } else {
                        gh = ge.anchor;
                        gd = bn(gg.to(), ge.head)
                    }
                }
                var f9 = fS.ranges.slice(0);
                f9[f6] = new dB(fk(f7, gd), gh);
                bJ(f7, cm(f9, f6), M)
            }
        }
        var fY = f2.wrapper.getBoundingClientRect();
        var fU = 0;
        function f4(ga) {
            var f8 = ++fU;
            var gc = cd(fR, ga, true, fO == "rect");
            if (!gc) {
                return
            }
            if (b5(gc, f1) != 0) {
                s(fR);
                f0(gc);
                var gb = bT(f2, f7);
                if (gc.line >= gb.to || gc.line < gb.from) {
                    setTimeout(cL(fR, function() {
                        if (fU == f8) {
                            f4(ga)
                        }
                    }), 150)
                }
            } else {
                var f9 = ga.clientY < fY.top ? -20 : ga.clientY > fY.bottom ? 20 : 0;
                if (f9) {
                    setTimeout(cL(fR, function() {
                        if (fU != f8) {
                            return
                        }
                        f2.scroller.scrollTop += f9;
                        f4(ga)
                    }), 50)
                }
            }
        }
        function fX(f8) {
            fU = Infinity;
            cu(f8);
            ed(fR);
            dP(document, "mousemove", fZ);
            dP(document, "mouseup", fV);
            f7.history.lastSelOrigin = null
        }
        var fZ = cL(fR, function(f8) {
            if ((dn && !bX) ? !f8.buttons : !fo(f8)) {
                fX(f8)
            } else {
                f4(f8)
            }
        });
        var fV = cL(fR, fX);
        bM(document, "mousemove", fZ);
        bM(document, "mouseup", fV)
    }
    function fM(fZ, fV, fX, fY, fR) {
        try {
            var fP = fV.clientX, fO = fV.clientY
        } catch (fV) {
            return false
        }
        if (fP >= Math.floor(fZ.display.gutters.getBoundingClientRect().right)) {
            return false
        }
        if (fY) {
            cu(fV)
        }
        var fW = fZ.display;
        var fU = fW.lineDiv.getBoundingClientRect();
        if (fO > fU.bottom || !eS(fZ, fX)) {
            return bA(fV)
        }
        fO -= fU.top - fW.viewOffset;
        for (var fS = 0; fS < fZ.options.gutters.length; ++fS) {
            var fT = fW.gutters.childNodes[fS];
            if (fT && fT.getBoundingClientRect().right >= fP) {
                var f0 = bv(fZ.doc, fO);
                var fQ = fZ.options.gutters[fS];
                fR(fZ, fX, fZ, f0, fQ, fV);
                return bA(fV)
            }
        }
    }
    function m(fO, fP) {
        return fM(fO, fP, "gutterClick", true, ac)
    }
    var ae = 0;
    function a9(fU) {
        var fW = this;
        if (aI(fW, fU) || a0(fW.display, fU)) {
            return
        }
        cu(fU);
        if (dn) {
            ae = +new Date
        }
        var fV = cd(fW, fU, true), fO = fU.dataTransfer.files;
        if (!fV || ah(fW)) {
            return
        }
        if (fO && fO.length && window.FileReader && window.File) {
            var fQ = fO.length, fX = Array(fQ), fP = 0;
            var fS = function(f0, fZ) {
                var fY = new FileReader;
                fY.onload = cL(fW, function() {
                    fX[fZ] = fY.result;
                    if (++fP == fQ) {
                        fV = fk(fW.doc, fV);
                        var f1 = {from: fV,to: fV,text: aQ(fX.join("\n")),origin: "paste"};
                        a5(fW.doc, f1);
                        eH(fW.doc, eu(fV, cG(f1)))
                    }
                });
                fY.readAsText(f0)
            };
            for (var fT = 0; fT < fQ; ++fT) {
                fS(fO[fT], fT)
            }
        } else {
            if (fW.state.draggingText && fW.doc.sel.contains(fV) > -1) {
                fW.state.draggingText(fU);
                setTimeout(cl(ed, fW), 20);
                return
            }
            try {
                var fX = fU.dataTransfer.getData("Text");
                if (fX) {
                    if (fW.state.draggingText && !(bU ? fU.metaKey : fU.ctrlKey)) {
                        var fR = fW.listSelections()
                    }
                    d1(fW.doc, eu(fV, fV));
                    if (fR) {
                        for (var fT = 0; fT < fR.length; ++fT) {
                            aR(fW.doc, "", fR[fT].anchor, fR[fT].head, "drag")
                        }
                    }
                    fW.replaceSelection(fX, "around", "paste");
                    ed(fW)
                }
            } catch (fU) {
            }
        }
    }
    function Q(fO, fQ) {
        if (dn && (!fO.state.draggingText || +new Date - ae < 100)) {
            d3(fQ);
            return
        }
        if (aI(fO, fQ) || a0(fO.display, fQ)) {
            return
        }
        fQ.dataTransfer.setData("Text", fO.getSelection());
        if (fQ.dataTransfer.setDragImage && !ay) {
            var fP = fx("img", null, null, "position: fixed; left: 0; top: 0;");
            fP.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            if (dF) {
                fP.width = fP.height = 1;
                fO.display.wrapper.appendChild(fP);
                fP._top = fP.offsetTop
            }
            fQ.dataTransfer.setDragImage(fP, 0, 0);
            if (dF) {
                fP.parentNode.removeChild(fP)
            }
        }
    }
    function N(fO, fP) {
        if (Math.abs(fO.doc.scrollTop - fP) < 2) {
            return
        }
        fO.doc.scrollTop = fP;
        if (!ce) {
            dp(fO, {top: fP})
        }
        if (fO.display.scroller.scrollTop != fP) {
            fO.display.scroller.scrollTop = fP
        }
        if (fO.display.scrollbarV.scrollTop != fP) {
            fO.display.scrollbarV.scrollTop = fP
        }
        if (ce) {
            dp(fO)
        }
        dR(fO, 100)
    }
    function bt(fO, fQ, fP) {
        if (fP ? fQ == fO.doc.scrollLeft : Math.abs(fO.doc.scrollLeft - fQ) < 2) {
            return
        }
        fQ = Math.min(fQ, fO.display.scroller.scrollWidth - fO.display.scroller.clientWidth);
        fO.doc.scrollLeft = fQ;
        ei(fO);
        if (fO.display.scroller.scrollLeft != fQ) {
            fO.display.scroller.scrollLeft = fQ
        }
        if (fO.display.scrollbarH.scrollLeft != fQ) {
            fO.display.scrollbarH.scrollLeft = fQ
        }
    }
    var eW = 0, b6 = null;
    if (dn) {
        b6 = -0.53
    } else {
        if (ce) {
            b6 = 15
        } else {
            if (cV) {
                b6 = -0.7
            } else {
                if (ay) {
                    b6 = -1 / 3
                }
            }
        }
    }
    function c(fW, fQ) {
        var fZ = fQ.wheelDeltaX, fY = fQ.wheelDeltaY;
        if (fZ == null && fQ.detail && fQ.axis == fQ.HORIZONTAL_AXIS) {
            fZ = fQ.detail
        }
        if (fY == null && fQ.detail && fQ.axis == fQ.VERTICAL_AXIS) {
            fY = fQ.detail
        } else {
            if (fY == null) {
                fY = fQ.wheelDelta
            }
        }
        var fS = fW.display, fV = fS.scroller;
        if (!(fZ && fV.scrollWidth > fV.clientWidth || fY && fV.scrollHeight > fV.clientHeight)) {
            return
        }
        if (fY && bU && cJ) {
            outer: for (var fX = fQ.target, fU = fS.view; fX != fV; fX = fX.parentNode) {
                for (var fP = 0; fP < fU.length; fP++) {
                    if (fU[fP].node == fX) {
                        fW.display.currentWheelTarget = fX;
                        break outer
                    }
                }
            }
        }
        if (fZ && !ce && !dF && b6 != null) {
            if (fY) {
                N(fW, Math.max(0, Math.min(fV.scrollTop + fY * b6, fV.scrollHeight - fV.clientHeight)))
            }
            bt(fW, Math.max(0, Math.min(fV.scrollLeft + fZ * b6, fV.scrollWidth - fV.clientWidth)));
            cu(fQ);
            fS.wheelStartX = null;
            return
        }
        if (fY && b6 != null) {
            var fO = fY * b6;
            var fT = fW.doc.scrollTop, fR = fT + fS.wrapper.clientHeight;
            if (fO < 0) {
                fT = Math.max(0, fT + fO - 50)
            } else {
                fR = Math.min(fW.doc.height, fR + fO + 50)
            }
            dp(fW, {top: fT,bottom: fR})
        }
        if (eW < 20) {
            if (fS.wheelStartX == null) {
                fS.wheelStartX = fV.scrollLeft;
                fS.wheelStartY = fV.scrollTop;
                fS.wheelDX = fZ;
                fS.wheelDY = fY;
                setTimeout(function() {
                    if (fS.wheelStartX == null) {
                        return
                    }
                    var f0 = fV.scrollLeft - fS.wheelStartX;
                    var f2 = fV.scrollTop - fS.wheelStartY;
                    var f1 = (f2 && fS.wheelDY && f2 / fS.wheelDY) || (f0 && fS.wheelDX && f0 / fS.wheelDX);
                    fS.wheelStartX = fS.wheelStartY = null;
                    if (!f1) {
                        return
                    }
                    b6 = (b6 * eW + f1) / (eW + 1);
                    ++eW
                }, 200)
            } else {
                fS.wheelDX += fZ;
                fS.wheelDY += fY
            }
        }
    }
    function fr(fP, fS, fO) {
        if (typeof fS == "string") {
            fS = eh[fS];
            if (!fS) {
                return false
            }
        }
        if (fP.display.pollingFast && b7(fP)) {
            fP.display.pollingFast = false
        }
        var fR = fP.display.shift, fQ = false;
        try {
            if (ah(fP)) {
                fP.state.suppressEdits = true
            }
            if (fO) {
                fP.display.shift = false
            }
            fQ = fS(fP) != bZ
        }finally {
            fP.display.shift = fR;
            fP.state.suppressEdits = false
        }
        return fQ
    }
    function c9(fO) {
        var fP = fO.state.keyMaps.slice(0);
        if (fO.options.extraKeys) {
            fP.push(fO.options.extraKeys)
        }
        fP.push(fO.options.keyMap);
        return fP
    }
    var an;
    function eT(fO, fU) {
        var fP = fv(fO.options.keyMap), fS = fP.auto;
        clearTimeout(an);
        if (fS && !eg(fU)) {
            an = setTimeout(function() {
                if (fv(fO.options.keyMap) == fP) {
                    fO.options.keyMap = (fS.call ? fS.call(null, fO) : fS);
                    fL(fO)
                }
            }, 50)
        }
        var fR = e2(fU, true), fT = false;
        if (!fR) {
            return false
        }
        var fQ = c9(fO);
        if (fU.shiftKey) {
            fT = j("Shift-" + fR, fQ, function(fV) {
                return fr(fO, fV, true)
            }) || j(fR, fQ, function(fV) {
                if (typeof fV == "string" ? /^go[A-Z]/.test(fV) : fV.motion) {
                    return fr(fO, fV)
                }
            })
        } else {
            fT = j(fR, fQ, function(fV) {
                return fr(fO, fV)
            })
        }
        if (fT) {
            cu(fU);
            p(fO);
            ac(fO, "keyHandled", fO, fR, fU)
        }
        return fT
    }
    function dV(fO, fR, fP) {
        var fQ = j("'" + fP + "'", c9(fO), function(fS) {
            return fr(fO, fS, true)
        });
        if (fQ) {
            cu(fR);
            p(fO);
            ac(fO, "keyHandled", fO, "'" + fP + "'", fR)
        }
        return fQ
    }
    var c3 = null;
    function q(fR) {
        var fO = this;
        s(fO);
        if (aI(fO, fR)) {
            return
        }
        if (eo && fR.keyCode == 27) {
            fR.returnValue = false
        }
        var fP = fR.keyCode;
        fO.display.shift = fP == 16 || fR.shiftKey;
        var fQ = eT(fO, fR);
        if (dF) {
            c3 = fQ ? fP : null;
            if (!fQ && fP == 88 && !cT && (bU ? fR.metaKey : fR.ctrlKey)) {
                fO.replaceSelection("", null, "cut")
            }
        }
        if (fP == 18 && !/\bCodeMirror-crosshair\b/.test(fO.display.lineDiv.className)) {
            aq(fO)
        }
    }
    function aq(fP) {
        var fQ = fP.display.lineDiv;
        fb(fQ, "CodeMirror-crosshair");
        function fO(fR) {
            if (fR.keyCode == 18 || !fR.altKey) {
                g(fQ, "CodeMirror-crosshair");
                dP(document, "keyup", fO);
                dP(document, "mouseover", fO)
            }
        }
        bM(document, "keyup", fO);
        bM(document, "mouseover", fO)
    }
    function a7(fO) {
        if (aI(this, fO)) {
            return
        }
        if (fO.keyCode == 16) {
            this.doc.sel.shift = false
        }
    }
    function cn(fS) {
        var fO = this;
        if (aI(fO, fS)) {
            return
        }
        var fR = fS.keyCode, fP = fS.charCode;
        if (dF && fR == c3) {
            c3 = null;
            cu(fS);
            return
        }
        if (((dF && (!fS.which || fS.which < 10)) || a1) && eT(fO, fS)) {
            return
        }
        var fQ = String.fromCharCode(fP == null ? fR : fP);
        if (dV(fO, fS, fQ)) {
            return
        }
        if (dn && !bY) {
            fO.display.inputHasSelection = null
        }
        C(fO)
    }
    function cq(fO) {
        if (fO.options.readOnly == "nocursor") {
            return
        }
        if (!fO.state.focused) {
            az(fO, "focus", fO);
            fO.state.focused = true;
            fb(fO.display.wrapper, "CodeMirror-focused");
            if (!fO.curOp && fO.display.selForContextMenu != fO.doc.sel) {
                eZ(fO);
                if (cJ) {
                    setTimeout(cl(eZ, fO, true), 0)
                }
            }
        }
        bc(fO);
        p(fO)
    }
    function aL(fO) {
        if (fO.state.focused) {
            az(fO, "blur", fO);
            fO.state.focused = false;
            g(fO.display.wrapper, "CodeMirror-focused")
        }
        clearInterval(fO.display.blinker);
        setTimeout(function() {
            if (!fO.state.focused) {
                fO.display.shift = false
            }
        }, 150)
    }
    function av(fX, fS) {
        if (aI(fX, fS, "contextmenu")) {
            return
        }
        var fU = fX.display;
        if (a0(fU, fS) || c0(fX, fS)) {
            return
        }
        var fW = cd(fX, fS), fO = fU.scroller.scrollTop;
        if (!fW || dF) {
            return
        }
        var fQ = fX.options.resetSelectionOnContextMenu;
        if (fQ && fX.doc.sel.contains(fW) == -1) {
            cL(fX, bJ)(fX.doc, eu(fW), Y)
        }
        var fT = fU.input.style.cssText;
        fU.inputDiv.style.position = "absolute";
        fU.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (fS.clientY - 5) + "px; left: " + (fS.clientX - 5) + "px; z-index: 1000; background: " + (dn ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
        ed(fX);
        eZ(fX);
        if (!fX.somethingSelected()) {
            fU.input.value = fU.prevInput = " "
        }
        fU.selForContextMenu = fX.doc.sel;
        clearTimeout(fU.detectingSelectAll);
        function fR() {
            if (fU.input.selectionStart != null) {
                var fY = fX.somethingSelected();
                var fZ = fU.input.value = "\u200b" + (fY ? fU.input.value : "");
                fU.prevInput = fY ? "" : "\u200b";
                fU.input.selectionStart = 1;
                fU.input.selectionEnd = fZ.length;
                fU.selForContextMenu = fX.doc.sel
            }
        }
        function fV() {
            fU.inputDiv.style.position = "relative";
            fU.input.style.cssText = fT;
            if (bY) {
                fU.scrollbarV.scrollTop = fU.scroller.scrollTop = fO
            }
            bc(fX);
            if (fU.input.selectionStart != null) {
                if (!dn || bY) {
                    fR()
                }
                var fY = 0, fZ = function() {
                    if (fU.selForContextMenu == fX.doc.sel && fU.input.selectionStart == 0) {
                        cL(fX, eh.selectAll)(fX)
                    } else {
                        if (fY++ < 10) {
                            fU.detectingSelectAll = setTimeout(fZ, 500)
                        } else {
                            eZ(fX)
                        }
                    }
                };
                fU.detectingSelectAll = setTimeout(fZ, 200)
            }
        }
        if (dn && !bY) {
            fR()
        }
        if (fF) {
            d3(fS);
            var fP = function() {
                dP(window, "mouseup", fP);
                setTimeout(fV, 20)
            };
            bM(window, "mouseup", fP)
        } else {
            setTimeout(fV, 50)
        }
    }
    function c0(fO, fP) {
        if (!eS(fO, "gutterContextMenu")) {
            return false
        }
        return fM(fO, fP, "gutterContextMenu", false, az)
    }
    var cG = I.changeEnd = function(fO) {
        if (!fO.text) {
            return fO.to
        }
        return W(fO.from.line + fO.text.length - 1, fi(fO.text).length + (fO.text.length == 1 ? fO.from.ch : 0))
    };
    function bO(fR, fQ) {
        if (b5(fR, fQ.from) < 0) {
            return fR
        }
        if (b5(fR, fQ.to) <= 0) {
            return cG(fQ)
        }
        var fO = fR.line + fQ.text.length - (fQ.to.line - fQ.from.line) - 1, fP = fR.ch;
        if (fR.line == fQ.to.line) {
            fP += cG(fQ).ch - fQ.to.ch
        }
        return W(fO, fP)
    }
    function eU(fR, fS) {
        var fP = [];
        for (var fQ = 0; fQ < fR.sel.ranges.length; fQ++) {
            var fO = fR.sel.ranges[fQ];
            fP.push(new dB(bO(fO.anchor, fS), bO(fO.head, fS)))
        }
        return cm(fP, fR.sel.primIndex)
    }
    function bk(fQ, fP, fO) {
        if (fQ.line == fP.line) {
            return W(fO.line, fQ.ch - fP.ch + fO.ch)
        } else {
            return W(fO.line + (fQ.line - fP.line), fQ.ch)
        }
    }
    function ad(fY, fV, fP) {
        var fQ = [];
        var fO = W(fY.first, 0), fZ = fO;
        for (var fS = 0; fS < fV.length; fS++) {
            var fU = fV[fS];
            var fX = bk(fU.from, fO, fZ);
            var fW = bk(cG(fU), fO, fZ);
            fO = fU.to;
            fZ = fW;
            if (fP == "around") {
                var fT = fY.sel.ranges[fS], fR = b5(fT.head, fT.anchor) < 0;
                fQ[fS] = new dB(fR ? fW : fX, fR ? fX : fW)
            } else {
                fQ[fS] = new dB(fX, fX)
            }
        }
        return new fy(fQ, fY.sel.primIndex)
    }
    function dv(fP, fR, fQ) {
        var fO = {canceled: false,from: fR.from,to: fR.to,text: fR.text,origin: fR.origin,cancel: function() {
                this.canceled = true
            }};
        if (fQ) {
            fO.update = function(fV, fU, fT, fS) {
                if (fV) {
                    this.from = fk(fP, fV)
                }
                if (fU) {
                    this.to = fk(fP, fU)
                }
                if (fT) {
                    this.text = fT
                }
                if (fS !== undefined) {
                    this.origin = fS
                }
            }
        }
        az(fP, "beforeChange", fP, fO);
        if (fP.cm) {
            az(fP.cm, "beforeChange", fP.cm, fO)
        }
        if (fO.canceled) {
            return null
        }
        return {from: fO.from,to: fO.to,text: fO.text,origin: fO.origin}
    }
    function a5(fR, fS, fQ) {
        if (fR.cm) {
            if (!fR.cm.curOp) {
                return cL(fR.cm, a5)(fR, fS, fQ)
            }
            if (fR.cm.state.suppressEdits) {
                return
            }
        }
        if (eS(fR, "beforeChange") || fR.cm && eS(fR.cm, "beforeChange")) {
            fS = dv(fR, fS, true);
            if (!fS) {
                return
            }
        }
        var fP = fI && !fQ && cv(fR, fS.from, fS.to);
        if (fP) {
            for (var fO = fP.length - 1; fO >= 0; --fO) {
                K(fR, {from: fP[fO].from,to: fP[fO].to,text: fO ? [""] : fS.text})
            }
        } else {
            K(fR, fS)
        }
    }
    function K(fQ, fR) {
        if (fR.text.length == 1 && fR.text[0] == "" && b5(fR.from, fR.to) == 0) {
            return
        }
        var fP = eU(fQ, fR);
        fn(fQ, fR, fP, fQ.cm ? fQ.cm.curOp.id : NaN);
        dQ(fQ, fR, fP, dW(fQ, fR));
        var fO = [];
        dK(fQ, function(fT, fS) {
            if (!fS && c1(fO, fT.history) == -1) {
                dj(fT.history, fR);
                fO.push(fT.history)
            }
            dQ(fT, fR, null, dW(fT, fR))
        })
    }
    function bV(fZ, fX, f1) {
        if (fZ.cm && fZ.cm.state.suppressEdits) {
            return
        }
        var fW = fZ.history, fQ, fS = fZ.sel;
        var fO = fX == "undo" ? fW.done : fW.undone, f0 = fX == "undo" ? fW.undone : fW.done;
        for (var fT = 0; fT < fO.length; fT++) {
            fQ = fO[fT];
            if (f1 ? fQ.ranges && !fQ.equals(fZ.sel) : !fQ.ranges) {
                break
            }
        }
        if (fT == fO.length) {
            return
        }
        fW.lastOrigin = fW.lastSelOrigin = null;
        for (; ; ) {
            fQ = fO.pop();
            if (fQ.ranges) {
                cA(fQ, f0);
                if (f1 && !fQ.equals(fZ.sel)) {
                    bJ(fZ, fQ, {clearRedo: false});
                    return
                }
                fS = fQ
            } else {
                break
            }
        }
        var fV = [];
        cA(fS, f0);
        f0.push({changes: fV,generation: fW.generation});
        fW.generation = fQ.generation || ++fW.maxGeneration;
        var fR = eS(fZ, "beforeChange") || fZ.cm && eS(fZ.cm, "beforeChange");
        for (var fT = fQ.changes.length - 1; fT >= 0; --fT) {
            var fY = fQ.changes[fT];
            fY.origin = fX;
            if (fR && !dv(fZ, fY, false)) {
                fO.length = 0;
                return
            }
            fV.push(da(fZ, fY));
            var fP = fT ? eU(fZ, fY, null) : fi(fO);
            dQ(fZ, fY, fP, dM(fZ, fY));
            if (!fT && fZ.cm) {
                fZ.cm.scrollIntoView(fY)
            }
            var fU = [];
            dK(fZ, function(f3, f2) {
                if (!f2 && c1(fU, f3.history) == -1) {
                    dj(f3.history, fY);
                    fU.push(f3.history)
                }
                dQ(f3, fY, null, dM(f3, fY))
            })
        }
    }
    function eX(fP, fR) {
        if (fR == 0) {
            return
        }
        fP.first += fR;
        fP.sel = new fy(bH(fP.sel.ranges, function(fS) {
            return new dB(W(fS.anchor.line + fR, fS.anchor.ch), W(fS.head.line + fR, fS.head.ch))
        }), fP.sel.primIndex);
        if (fP.cm) {
            af(fP.cm, fP.first, fP.first - fR, fR);
            for (var fQ = fP.cm.display, fO = fQ.viewFrom; fO < fQ.viewTo; fO++) {
                R(fP.cm, fO, "gutter")
            }
        }
    }
    function dQ(fS, fT, fR, fP) {
        if (fS.cm && !fS.cm.curOp) {
            return cL(fS.cm, dQ)(fS, fT, fR, fP)
        }
        if (fT.to.line < fS.first) {
            eX(fS, fT.text.length - 1 - (fT.to.line - fT.from.line));
            return
        }
        if (fT.from.line > fS.lastLine()) {
            return
        }
        if (fT.from.line < fS.first) {
            var fO = fT.text.length - 1 - (fS.first - fT.from.line);
            eX(fS, fO);
            fT = {from: W(fS.first, 0),to: W(fT.to.line + fO, fT.to.ch),text: [fi(fT.text)],origin: fT.origin}
        }
        var fQ = fS.lastLine();
        if (fT.to.line > fQ) {
            fT = {from: fT.from,to: W(fQ, eP(fS, fQ).text.length),text: [fT.text[0]],origin: fT.origin}
        }
        fT.removed = fz(fS, fT.from, fT.to);
        if (!fR) {
            fR = eU(fS, fT, null)
        }
        if (fS.cm) {
            aD(fS.cm, fT, fP)
        } else {
            e9(fS, fT, fP)
        }
        d1(fS, fR, Y)
    }
    function aD(fZ, fV, fT) {
        var fY = fZ.doc, fU = fZ.display, fW = fV.from, fX = fV.to;
        var fO = false, fS = fW.line;
        if (!fZ.options.lineWrapping) {
            fS = bC(z(eP(fY, fW.line)));
            fY.iter(fS, fX.line + 1, function(f1) {
                if (f1 == fU.maxLine) {
                    fO = true;
                    return true
                }
            })
        }
        if (fY.sel.contains(fV.from, fV.to) > -1) {
            V(fZ)
        }
        e9(fY, fV, fT, a3(fZ));
        if (!fZ.options.lineWrapping) {
            fY.iter(fS, fW.line + fV.text.length, function(f2) {
                var f1 = dY(f2);
                if (f1 > fU.maxLineLength) {
                    fU.maxLine = f2;
                    fU.maxLineLength = f1;
                    fU.maxLineChanged = true;
                    fO = false
                }
            });
            if (fO) {
                fZ.curOp.updateMaxLine = true
            }
        }
        fY.frontier = Math.min(fY.frontier, fW.line);
        dR(fZ, 400);
        var f0 = fV.text.length - (fX.line - fW.line) - 1;
        if (fW.line == fX.line && fV.text.length == 1 && !dw(fZ.doc, fV)) {
            R(fZ, fW.line, "text")
        } else {
            af(fZ, fW.line, fX.line + 1, f0)
        }
        var fQ = eS(fZ, "changes"), fR = eS(fZ, "change");
        if (fR || fQ) {
            var fP = {from: fW,to: fX,text: fV.text,removed: fV.removed,origin: fV.origin};
            if (fR) {
                ac(fZ, "change", fZ, fP)
            }
            if (fQ) {
                (fZ.curOp.changeObjs || (fZ.curOp.changeObjs = [])).push(fP)
            }
        }
        fZ.display.selForContextMenu = null
    }
    function aR(fR, fQ, fT, fS, fO) {
        if (!fS) {
            fS = fT
        }
        if (b5(fS, fT) < 0) {
            var fP = fS;
            fS = fT;
            fT = fP
        }
        if (typeof fQ == "string") {
            fQ = aQ(fQ)
        }
        a5(fR, {from: fT,to: fS,text: fQ,origin: fO})
    }
    function dJ(fP, fS) {
        var fT = fP.display, fQ = fT.sizer.getBoundingClientRect(), fO = null;
        if (fS.top + fQ.top < 0) {
            fO = true
        } else {
            if (fS.bottom + fQ.top > (window.innerHeight || document.documentElement.clientHeight)) {
                fO = false
            }
        }
        if (fO != null && !e5) {
            var fR = fx("div", "\u200b", null, "position: absolute; top: " + (fS.top - fT.viewOffset - eI(fP.display)) + "px; height: " + (fS.bottom - fS.top + ba) + "px; left: " + fS.left + "px; width: 2px;");
            fP.display.lineSpace.appendChild(fR);
            fR.scrollIntoView(fO);
            fP.display.lineSpace.removeChild(fR)
        }
    }
    function E(fX, fV, fS, fR) {
        if (fR == null) {
            fR = 0
        }
        for (; ; ) {
            var fT = false, fW = dx(fX, fV);
            var fO = !fS || fS == fV ? fW : dx(fX, fS);
            var fQ = H(fX, Math.min(fW.left, fO.left), Math.min(fW.top, fO.top) - fR, Math.max(fW.left, fO.left), Math.max(fW.bottom, fO.bottom) + fR);
            var fU = fX.doc.scrollTop, fP = fX.doc.scrollLeft;
            if (fQ.scrollTop != null) {
                N(fX, fQ.scrollTop);
                if (Math.abs(fX.doc.scrollTop - fU) > 1) {
                    fT = true
                }
            }
            if (fQ.scrollLeft != null) {
                bt(fX, fQ.scrollLeft);
                if (Math.abs(fX.doc.scrollLeft - fP) > 1) {
                    fT = true
                }
            }
            if (!fT) {
                return fW
            }
        }
    }
    function F(fO, fQ, fS, fP, fR) {
        var fT = H(fO, fQ, fS, fP, fR);
        if (fT.scrollTop != null) {
            N(fO, fT.scrollTop)
        }
        if (fT.scrollLeft != null) {
            bt(fO, fT.scrollLeft)
        }
    }
    function H(fU, f2, fR, f1, fQ) {
        var fZ = fU.display, fY = aN(fU.display);
        if (fR < 0) {
            fR = 0
        }
        var fX = fU.curOp && fU.curOp.scrollTop != null ? fU.curOp.scrollTop : fZ.scroller.scrollTop;
        var fP = fZ.scroller.clientHeight - ba, fW = {};
        var f4 = fU.doc.height + bx(fZ);
        var f5 = fR < fY, f0 = fQ > f4 - fY;
        if (fR < fX) {
            fW.scrollTop = f5 ? 0 : fR
        } else {
            if (fQ > fX + fP) {
                var fV = Math.min(fR, (f0 ? f4 : fQ) - fP);
                if (fV != fX) {
                    fW.scrollTop = fV
                }
            }
        }
        var fO = fU.curOp && fU.curOp.scrollLeft != null ? fU.curOp.scrollLeft : fZ.scroller.scrollLeft;
        var fT = fZ.scroller.clientWidth - ba;
        f2 += fZ.gutters.offsetWidth;
        f1 += fZ.gutters.offsetWidth;
        var fS = fZ.gutters.offsetWidth;
        var f3 = f2 < fS + 10;
        if (f2 < fO + fS || f3) {
            if (f3) {
                f2 = 0
            }
            fW.scrollLeft = Math.max(0, f2 - 10 - fS)
        } else {
            if (f1 > fT + fO - 3) {
                fW.scrollLeft = f1 + 10 - fT
            }
        }
        return fW
    }
    function cy(fO, fQ, fP) {
        if (fQ != null || fP != null) {
            fd(fO)
        }
        if (fQ != null) {
            fO.curOp.scrollLeft = (fO.curOp.scrollLeft == null ? fO.doc.scrollLeft : fO.curOp.scrollLeft) + fQ
        }
        if (fP != null) {
            fO.curOp.scrollTop = (fO.curOp.scrollTop == null ? fO.doc.scrollTop : fO.curOp.scrollTop) + fP
        }
    }
    function fh(fO) {
        fd(fO);
        var fP = fO.getCursor(), fR = fP, fQ = fP;
        if (!fO.options.lineWrapping) {
            fR = fP.ch ? W(fP.line, fP.ch - 1) : fP;
            fQ = W(fP.line, fP.ch + 1)
        }
        fO.curOp.scrollToPos = {from: fR,to: fQ,margin: fO.options.cursorScrollMargin,isCursor: true}
    }
    function fd(fO) {
        var fQ = fO.curOp.scrollToPos;
        if (fQ) {
            fO.curOp.scrollToPos = null;
            var fS = dm(fO, fQ.from), fR = dm(fO, fQ.to);
            var fP = H(fO, Math.min(fS.left, fR.left), Math.min(fS.top, fR.top) - fQ.margin, Math.max(fS.right, fR.right), Math.max(fS.bottom, fR.bottom) + fQ.margin);
            fO.scrollTo(fP.scrollLeft, fP.scrollTop)
        }
    }
    function ab(f1, fR, f0, fQ) {
        var fZ = f1.doc, fP;
        if (f0 == null) {
            f0 = "add"
        }
        if (f0 == "smart") {
            if (!f1.doc.mode.indent) {
                f0 = "prev"
            } else {
                fP = dg(f1, fR)
            }
        }
        var fV = f1.options.tabSize;
        var f2 = eP(fZ, fR), fU = bI(f2.text, null, fV);
        if (f2.stateAfter) {
            f2.stateAfter = null
        }
        var fO = f2.text.match(/^\s*/)[0], fX;
        if (!fQ && !/\S/.test(f2.text)) {
            fX = 0;
            f0 = "not"
        } else {
            if (f0 == "smart") {
                fX = f1.doc.mode.indent(fP, f2.text.slice(fO.length), f2.text);
                if (fX == bZ) {
                    if (!fQ) {
                        return
                    }
                    f0 = "prev"
                }
            }
        }
        if (f0 == "prev") {
            if (fR > fZ.first) {
                fX = bI(eP(fZ, fR - 1).text, null, fV)
            } else {
                fX = 0
            }
        } else {
            if (f0 == "add") {
                fX = fU + f1.options.indentUnit
            } else {
                if (f0 == "subtract") {
                    fX = fU - f1.options.indentUnit
                } else {
                    if (typeof f0 == "number") {
                        fX = fU + f0
                    }
                }
            }
        }
        fX = Math.max(0, fX);
        var fY = "", fW = 0;
        if (f1.options.indentWithTabs) {
            for (var fS = Math.floor(fX / fV); fS; --fS) {
                fW += fV;
                fY += "\t"
            }
        }
        if (fW < fX) {
            fY += cf(fX - fW)
        }
        if (fY != fO) {
            aR(f1.doc, fY, W(fR, 0), W(fR, fO.length), "+input")
        } else {
            for (var fS = 0; fS < fZ.sel.ranges.length; fS++) {
                var fT = fZ.sel.ranges[fS];
                if (fT.head.line == fR && fT.head.ch < fO.length) {
                    var fW = W(fR, fO.length);
                    f(fZ, fS, new dB(fW, fW));
                    break
                }
            }
        }
        f2.stateAfter = null
    }
    function eb(fP, fR, fO, fU) {
        var fT = fR, fQ = fR, fS = fP.doc;
        if (typeof fR == "number") {
            fQ = eP(fS, cO(fS, fR))
        } else {
            fT = bC(fR)
        }
        if (fT == null) {
            return null
        }
        if (fU(fQ, fT)) {
            R(fP, fT, fO)
        }
        return fQ
    }
    function eA(fO, fU) {
        var fP = fO.doc.sel.ranges, fS = [];
        for (var fR = 0; fR < fP.length; fR++) {
            var fQ = fU(fP[fR]);
            while (fS.length && b5(fQ.from, fi(fS).to) <= 0) {
                var fT = fS.pop();
                if (b5(fT.from, fQ.from) < 0) {
                    fQ.from = fT.from;
                    break
                }
            }
            fS.push(fQ)
        }
        cz(fO, function() {
            for (var fV = fS.length - 1; fV >= 0; fV--) {
                aR(fO.doc, "", fS[fV].from, fS[fV].to, "+delete")
            }
            fh(fO)
        })
    }
    function bm(f6, fS, f0, fZ, fU) {
        var fX = fS.line, fY = fS.ch, f5 = f0;
        var fP = eP(f6, fX);
        var f3 = true;
        function f4() {
            var f7 = fX + f0;
            if (f7 < f6.first || f7 >= f6.first + f6.size) {
                return (f3 = false)
            }
            fX = f7;
            return fP = eP(f6, f7)
        }
        function f2(f8) {
            var f7 = (fU ? v : ag)(fP, fY, f0, true);
            if (f7 == null) {
                if (!f8 && f4()) {
                    if (fU) {
                        fY = (f0 < 0 ? cE : ct)(fP)
                    } else {
                        fY = f0 < 0 ? fP.text.length : 0
                    }
                } else {
                    return (f3 = false)
                }
            } else {
                fY = f7
            }
            return true
        }
        if (fZ == "char") {
            f2()
        } else {
            if (fZ == "column") {
                f2(true)
            } else {
                if (fZ == "word" || fZ == "group") {
                    var f1 = null, fV = fZ == "group";
                    var fO = f6.cm && f6.cm.getHelper(fS, "wordChars");
                    for (var fT = true; ; fT = false) {
                        if (f0 < 0 && !f2(!fT)) {
                            break
                        }
                        var fQ = fP.text.charAt(fY) || "\n";
                        var fR = cp(fQ, fO) ? "w" : fV && fQ == "\n" ? "n" : !fV || /\s/.test(fQ) ? null : "p";
                        if (fV && !fT && !fR) {
                            fR = "s"
                        }
                        if (f1 && f1 != fR) {
                            if (f0 < 0) {
                                f0 = 1;
                                f2()
                            }
                            break
                        }
                        if (fR) {
                            f1 = fR
                        }
                        if (f0 > 0 && !f2(!fT)) {
                            break
                        }
                    }
                }
            }
        }
        var fW = bK(f6, W(fX, fY), f5, true);
        if (!f3) {
            fW.hitSide = true
        }
        return fW
    }
    function bg(fW, fR, fO, fV) {
        var fU = fW.doc, fT = fR.left, fS;
        if (fV == "page") {
            var fQ = Math.min(fW.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            fS = fR.top + fO * (fQ - (fO < 0 ? 1.5 : 0.5) * aN(fW.display))
        } else {
            if (fV == "line") {
                fS = fO > 0 ? fR.bottom + 3 : fR.top - 3
            }
        }
        for (; ; ) {
            var fP = fp(fW, fT, fS);
            if (!fP.outside) {
                break
            }
            if (fO < 0 ? fS <= 0 : fS >= fU.height) {
                fP.hitSide = true;
                break
            }
            fS += fO * 5
        }
        return fP
    }
    function ar(fU, fS) {
        var fT = fU.doc, fV = eP(fT, fS.line).text;
        var fP = fS.ch, fR = fS.ch;
        if (fV) {
            var fQ = fU.getHelper(fS, "wordChars");
            if ((fS.xRel < 0 || fR == fV.length) && fP) {
                --fP
            } else {
                ++fR
            }
            var fW = fV.charAt(fP);
            var fO = cp(fW, fQ) ? function(fX) {
                return cp(fX, fQ)
            } : /\s/.test(fW) ? function(fX) {
                return /\s/.test(fX)
            } : function(fX) {
                return !/\s/.test(fX) && !cp(fX)
            };
            while (fP > 0 && fO(fV.charAt(fP - 1))) {
                --fP
            }
            while (fR < fV.length && fO(fV.charAt(fR))) {
                ++fR
            }
        }
        return new dB(W(fS.line, fP), W(fS.line, fR))
    }
    I.prototype = {constructor: I,focus: function() {
            window.focus();
            ed(this);
            C(this)
        },setOption: function(fQ, fR) {
            var fP = this.options, fO = fP[fQ];
            if (fP[fQ] == fR && fQ != "mode") {
                return
            }
            fP[fQ] = fR;
            if (a4.hasOwnProperty(fQ)) {
                cL(this, a4[fQ])(this, fR, fO)
            }
        },getOption: function(fO) {
            return this.options[fO]
        },getDoc: function() {
            return this.doc
        },addKeyMap: function(fP, fO) {
            this.state.keyMaps[fO ? "push" : "unshift"](fP)
        },removeKeyMap: function(fP) {
            var fQ = this.state.keyMaps;
            for (var fO = 0; fO < fQ.length; ++fO) {
                if (fQ[fO] == fP || (typeof fQ[fO] != "string" && fQ[fO].name == fP)) {
                    fQ.splice(fO, 1);
                    return true
                }
            }
        },addOverlay: cR(function(fO, fP) {
            var fQ = fO.token ? fO : I.getMode(this.options, fO);
            if (fQ.startState) {
                throw new Error("Overlays may not be stateful.")
            }
            this.state.overlays.push({mode: fQ,modeSpec: fO,opaque: fP && fP.opaque});
            this.state.modeGen++;
            af(this)
        }),removeOverlay: cR(function(fO) {
            var fQ = this.state.overlays;
            for (var fP = 0; fP < fQ.length; ++fP) {
                var fR = fQ[fP].modeSpec;
                if (fR == fO || typeof fO == "string" && fR.name == fO) {
                    fQ.splice(fP, 1);
                    this.state.modeGen++;
                    af(this);
                    return
                }
            }
        }),indentLine: cR(function(fQ, fO, fP) {
            if (typeof fO != "string" && typeof fO != "number") {
                if (fO == null) {
                    fO = this.options.smartIndent ? "smart" : "prev"
                } else {
                    fO = fO ? "add" : "subtract"
                }
            }
            if (bW(this.doc, fQ)) {
                ab(this, fQ, fO, fP)
            }
        }),indentSelection: cR(function(fT) {
            var fP = this.doc.sel.ranges, fO = -1;
            for (var fS = 0; fS < fP.length; fS++) {
                var fQ = fP[fS];
                if (!fQ.empty()) {
                    var fV = Math.max(fO, fQ.from().line);
                    var fU = fQ.to();
                    fO = Math.min(this.lastLine(), fU.line - (fU.ch ? 0 : 1)) + 1;
                    for (var fR = fV; fR < fO; ++fR) {
                        ab(this, fR, fT)
                    }
                } else {
                    if (fQ.head.line > fO) {
                        ab(this, fQ.head.line, fT, true);
                        fO = fQ.head.line;
                        if (fS == this.doc.sel.primIndex) {
                            fh(this)
                        }
                    }
                }
            }
        }),getTokenAt: function(fV, fP) {
            var fS = this.doc;
            fV = fk(fS, fV);
            var fR = dg(this, fV.line, fP), fU = this.doc.mode;
            var fO = eP(fS, fV.line);
            var fT = new ew(fO.text, this.options.tabSize);
            while (fT.pos < fV.ch && !fT.eol()) {
                fT.start = fT.pos;
                var fQ = ef(fU, fT, fR)
            }
            return {start: fT.start,end: fT.pos,string: fT.current(),type: fQ || null,state: fR}
        },getTokenTypeAt: function(fV) {
            fV = fk(this.doc, fV);
            var fR = cQ(this, eP(this.doc, fV.line));
            var fT = 0, fU = (fR.length - 1) / 2, fQ = fV.ch;
            var fP;
            if (fQ == 0) {
                fP = fR[2]
            } else {
                for (; ; ) {
                    var fO = (fT + fU) >> 1;
                    if ((fO ? fR[fO * 2 - 1] : 0) >= fQ) {
                        fU = fO
                    } else {
                        if (fR[fO * 2 + 1] < fQ) {
                            fT = fO + 1
                        } else {
                            fP = fR[fO * 2 + 2];
                            break
                        }
                    }
                }
            }
            var fS = fP ? fP.indexOf("cm-overlay ") : -1;
            return fS < 0 ? fP : fS == 0 ? null : fP.slice(0, fS - 1)
        },getModeAt: function(fP) {
            var fO = this.doc.mode;
            if (!fO.innerMode) {
                return fO
            }
            return I.innerMode(fO, this.getTokenAt(fP).state).mode
        },getHelper: function(fP, fO) {
            return this.getHelpers(fP, fO)[0]
        },getHelpers: function(fV, fQ) {
            var fR = [];
            if (!eY.hasOwnProperty(fQ)) {
                return eY
            }
            var fO = eY[fQ], fU = this.getModeAt(fV);
            if (typeof fU[fQ] == "string") {
                if (fO[fU[fQ]]) {
                    fR.push(fO[fU[fQ]])
                }
            } else {
                if (fU[fQ]) {
                    for (var fP = 0; fP < fU[fQ].length; fP++) {
                        var fT = fO[fU[fQ][fP]];
                        if (fT) {
                            fR.push(fT)
                        }
                    }
                } else {
                    if (fU.helperType && fO[fU.helperType]) {
                        fR.push(fO[fU.helperType])
                    } else {
                        if (fO[fU.name]) {
                            fR.push(fO[fU.name])
                        }
                    }
                }
            }
            for (var fP = 0; fP < fO._global.length; fP++) {
                var fS = fO._global[fP];
                if (fS.pred(fU, this) && c1(fR, fS.val) == -1) {
                    fR.push(fS.val)
                }
            }
            return fR
        },getStateAfter: function(fP, fO) {
            var fQ = this.doc;
            fP = cO(fQ, fP == null ? fQ.first + fQ.size - 1 : fP);
            return dg(this, fP + 1, fO)
        },cursorCoords: function(fR, fP) {
            var fQ, fO = this.doc.sel.primary();
            if (fR == null) {
                fQ = fO.head
            } else {
                if (typeof fR == "object") {
                    fQ = fk(this.doc, fR)
                } else {
                    fQ = fR ? fO.from() : fO.to()
                }
            }
            return dx(this, fQ, fP || "page")
        },charCoords: function(fP, fO) {
            return cx(this, fk(this.doc, fP), fO || "page")
        },coordsChar: function(fO, fP) {
            fO = fK(this, fO, fP || "page");
            return fp(this, fO.left, fO.top)
        },lineAtHeight: function(fO, fP) {
            fO = fK(this, {top: fO,left: 0}, fP || "page").top;
            return bv(this.doc, fO + this.display.viewOffset)
        },heightAtLine: function(fP, fS) {
            var fO = false, fR = this.doc.first + this.doc.size - 1;
            if (fP < this.doc.first) {
                fP = this.doc.first
            } else {
                if (fP > fR) {
                    fP = fR;
                    fO = true
                }
            }
            var fQ = eP(this.doc, fP);
            return et(this, fQ, {top: 0,left: 0}, fS || "page").top + (fO ? this.doc.height - bB(fQ) : 0)
        },defaultTextHeight: function() {
            return aN(this.display)
        },defaultCharWidth: function() {
            return di(this.display)
        },setGutterMarker: cR(function(fO, fP, fQ) {
            return eb(this, fO, "gutter", function(fR) {
                var fS = fR.gutterMarkers || (fR.gutterMarkers = {});
                fS[fP] = fQ;
                if (!fQ && ex(fS)) {
                    fR.gutterMarkers = null
                }
                return true
            })
        }),clearGutter: cR(function(fQ) {
            var fO = this, fR = fO.doc, fP = fR.first;
            fR.iter(function(fS) {
                if (fS.gutterMarkers && fS.gutterMarkers[fQ]) {
                    fS.gutterMarkers[fQ] = null;
                    R(fO, fP, "gutter");
                    if (ex(fS.gutterMarkers)) {
                        fS.gutterMarkers = null
                    }
                }
                ++fP
            })
        }),addLineClass: cR(function(fQ, fP, fO) {
            return eb(this, fQ, "class", function(fR) {
                var fS = fP == "text" ? "textClass" : fP == "background" ? "bgClass" : "wrapClass";
                if (!fR[fS]) {
                    fR[fS] = fO
                } else {
                    if (new RegExp("(?:^|\\s)" + fO + "(?:$|\\s)").test(fR[fS])) {
                        return false
                    } else {
                        fR[fS] += " " + fO
                    }
                }
                return true
            })
        }),removeLineClass: cR(function(fQ, fP, fO) {
            return eb(this, fQ, "class", function(fS) {
                var fV = fP == "text" ? "textClass" : fP == "background" ? "bgClass" : "wrapClass";
                var fU = fS[fV];
                if (!fU) {
                    return false
                } else {
                    if (fO == null) {
                        fS[fV] = null
                    } else {
                        var fT = fU.match(new RegExp("(?:^|\\s+)" + fO + "(?:$|\\s+)"));
                        if (!fT) {
                            return false
                        }
                        var fR = fT.index + fT[0].length;
                        fS[fV] = fU.slice(0, fT.index) + (!fT.index || fR == fU.length ? "" : " ") + fU.slice(fR) || null
                    }
                }
                return true
            })
        }),addLineWidget: cR(function(fQ, fP, fO) {
            return bw(this, fQ, fP, fO)
        }),removeLineWidget: function(fO) {
            fO.clear()
        },lineInfo: function(fO) {
            if (typeof fO == "number") {
                if (!bW(this.doc, fO)) {
                    return null
                }
                var fP = fO;
                fO = eP(this.doc, fO);
                if (!fO) {
                    return null
                }
            } else {
                var fP = bC(fO);
                if (fP == null) {
                    return null
                }
            }
            return {line: fP,handle: fO,text: fO.text,gutterMarkers: fO.gutterMarkers,textClass: fO.textClass,bgClass: fO.bgClass,wrapClass: fO.wrapClass,widgets: fO.widgets}
        },getViewport: function() {
            return {from: this.display.viewFrom,to: this.display.viewTo}
        },addWidget: function(fT, fQ, fV, fR, fX) {
            var fS = this.display;
            fT = dx(this, fk(this.doc, fT));
            var fU = fT.bottom, fP = fT.left;
            fQ.style.position = "absolute";
            fS.sizer.appendChild(fQ);
            if (fR == "over") {
                fU = fT.top
            } else {
                if (fR == "above" || fR == "near") {
                    var fO = Math.max(fS.wrapper.clientHeight, this.doc.height), fW = Math.max(fS.sizer.clientWidth, fS.lineSpace.clientWidth);
                    if ((fR == "above" || fT.bottom + fQ.offsetHeight > fO) && fT.top > fQ.offsetHeight) {
                        fU = fT.top - fQ.offsetHeight
                    } else {
                        if (fT.bottom + fQ.offsetHeight <= fO) {
                            fU = fT.bottom
                        }
                    }
                    if (fP + fQ.offsetWidth > fW) {
                        fP = fW - fQ.offsetWidth
                    }
                }
            }
            fQ.style.top = fU + "px";
            fQ.style.left = fQ.style.right = "";
            if (fX == "right") {
                fP = fS.sizer.clientWidth - fQ.offsetWidth;
                fQ.style.right = "0px"
            } else {
                if (fX == "left") {
                    fP = 0
                } else {
                    if (fX == "middle") {
                        fP = (fS.sizer.clientWidth - fQ.offsetWidth) / 2
                    }
                }
                fQ.style.left = fP + "px"
            }
            if (fV) {
                F(this, fP, fU, fP + fQ.offsetWidth, fU + fQ.offsetHeight)
            }
        },triggerOnKeyDown: cR(q),triggerOnKeyPress: cR(cn),triggerOnKeyUp: cR(a7),execCommand: function(fO) {
            if (eh.hasOwnProperty(fO)) {
                return eh[fO](this)
            }
        },findPosH: function(fU, fR, fS, fP) {
            var fO = 1;
            if (fR < 0) {
                fO = -1;
                fR = -fR
            }
            for (var fQ = 0, fT = fk(this.doc, fU); fQ < fR; ++fQ) {
                fT = bm(this.doc, fT, fO, fS, fP);
                if (fT.hitSide) {
                    break
                }
            }
            return fT
        },moveH: cR(function(fP, fQ) {
            var fO = this;
            fO.extendSelectionsBy(function(fR) {
                if (fO.display.shift || fO.doc.extend || fR.empty()) {
                    return bm(fO.doc, fR.head, fP, fQ, fO.options.rtlMoveVisually)
                } else {
                    return fP < 0 ? fR.from() : fR.to()
                }
            }, cF)
        }),deleteH: cR(function(fO, fP) {
            var fQ = this.doc.sel, fR = this.doc;
            if (fQ.somethingSelected()) {
                fR.replaceSelection("", null, "+delete")
            } else {
                eA(this, function(fT) {
                    var fS = bm(fR, fT.head, fO, fP, false);
                    return fO < 0 ? {from: fS,to: fT.head} : {from: fT.head,to: fS}
                })
            }
        }),findPosV: function(fT, fQ, fU, fW) {
            var fO = 1, fS = fW;
            if (fQ < 0) {
                fO = -1;
                fQ = -fQ
            }
            for (var fP = 0, fV = fk(this.doc, fT); fP < fQ; ++fP) {
                var fR = dx(this, fV, "div");
                if (fS == null) {
                    fS = fR.left
                } else {
                    fR.left = fS
                }
                fV = bg(this, fR, fO, fU);
                if (fV.hitSide) {
                    break
                }
            }
            return fV
        },moveV: cR(function(fP, fR) {
            var fO = this, fT = this.doc, fS = [];
            var fU = !fO.display.shift && !fT.extend && fT.sel.somethingSelected();
            fT.extendSelectionsBy(function(fV) {
                if (fU) {
                    return fP < 0 ? fV.from() : fV.to()
                }
                var fX = dx(fO, fV.head, "div");
                if (fV.goalColumn != null) {
                    fX.left = fV.goalColumn
                }
                fS.push(fX.left);
                var fW = bg(fO, fX, fP, fR);
                if (fR == "page" && fV == fT.sel.primary()) {
                    cy(fO, null, cx(fO, fW, "div").top - fX.top)
                }
                return fW
            }, cF);
            if (fS.length) {
                for (var fQ = 0; fQ < fT.sel.ranges.length; fQ++) {
                    fT.sel.ranges[fQ].goalColumn = fS[fQ]
                }
            }
        }),toggleOverwrite: function(fO) {
            if (fO != null && fO == this.state.overwrite) {
                return
            }
            if (this.state.overwrite = !this.state.overwrite) {
                fb(this.display.cursorDiv, "CodeMirror-overwrite")
            } else {
                g(this.display.cursorDiv, "CodeMirror-overwrite")
            }
            az(this, "overwriteToggle", this, this.state.overwrite)
        },hasFocus: function() {
            return ds() == this.display.input
        },scrollTo: cR(function(fO, fP) {
            if (fO != null || fP != null) {
                fd(this)
            }
            if (fO != null) {
                this.curOp.scrollLeft = fO
            }
            if (fP != null) {
                this.curOp.scrollTop = fP
            }
        }),getScrollInfo: function() {
            var fO = this.display.scroller, fP = ba;
            return {left: fO.scrollLeft,top: fO.scrollTop,height: fO.scrollHeight - fP,width: fO.scrollWidth - fP,clientHeight: fO.clientHeight - fP,clientWidth: fO.clientWidth - fP}
        },scrollIntoView: cR(function(fP, fQ) {
            if (fP == null) {
                fP = {from: this.doc.sel.primary().head,to: null};
                if (fQ == null) {
                    fQ = this.options.cursorScrollMargin
                }
            } else {
                if (typeof fP == "number") {
                    fP = {from: W(fP, 0),to: null}
                } else {
                    if (fP.from == null) {
                        fP = {from: fP,to: null}
                    }
                }
            }
            if (!fP.to) {
                fP.to = fP.from
            }
            fP.margin = fQ || 0;
            if (fP.from.line != null) {
                fd(this);
                this.curOp.scrollToPos = fP
            } else {
                var fO = H(this, Math.min(fP.from.left, fP.to.left), Math.min(fP.from.top, fP.to.top) - fP.margin, Math.max(fP.from.right, fP.to.right), Math.max(fP.from.bottom, fP.to.bottom) + fP.margin);
                this.scrollTo(fO.scrollLeft, fO.scrollTop)
            }
        }),setSize: cR(function(fQ, fO) {
            function fP(fR) {
                return typeof fR == "number" || /^\d+$/.test(String(fR)) ? fR + "px" : fR
            }
            if (fQ != null) {
                this.display.wrapper.style.width = fP(fQ)
            }
            if (fO != null) {
                this.display.wrapper.style.height = fP(fO)
            }
            if (this.options.lineWrapping) {
                aF(this)
            }
            this.curOp.forceUpdate = true;
            az(this, "refresh", this)
        }),operation: function(fO) {
            return cz(this, fO)
        },refresh: cR(function() {
            var fO = this.display.cachedTextHeight;
            af(this);
            this.curOp.forceUpdate = true;
            ai(this);
            this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
            cN(this);
            if (fO == null || Math.abs(fO - aN(this.display)) > 0.5) {
                X(this)
            }
            az(this, "refresh", this)
        }),swapDoc: cR(function(fP) {
            var fO = this.doc;
            fO.cm = null;
            dN(this, fP);
            ai(this);
            eZ(this);
            this.scrollTo(fP.scrollLeft, fP.scrollTop);
            ac(this, "swapDoc", this, fO);
            return fO
        }),getInputField: function() {
            return this.display.input
        },getWrapperElement: function() {
            return this.display.wrapper
        },getScrollerElement: function() {
            return this.display.scroller
        },getGutterElement: function() {
            return this.display.gutters
        }};
    bo(I);
    var eF = I.defaults = {};
    var a4 = I.optionHandlers = {};
    function t(fO, fR, fQ, fP) {
        I.defaults[fO] = fR;
        if (fQ) {
            a4[fO] = fP ? function(fS, fU, fT) {
                if (fT != b2) {
                    fQ(fS, fU, fT)
                }
            } : fQ
        }
    }
    var b2 = I.Init = {toString: function() {
            return "CodeMirror.Init"
        }};
    t("value", "", function(fO, fP) {
        fO.setValue(fP)
    }, true);
    t("mode", null, function(fO, fP) {
        fO.doc.modeOption = fP;
        bh(fO)
    }, true);
    t("indentUnit", 2, bh, true);
    t("indentWithTabs", false);
    t("smartIndent", true);
    t("tabSize", 4, function(fO) {
        dX(fO);
        ai(fO);
        af(fO)
    }, true);
    t("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(fO, fP) {
        fO.options.specialChars = new RegExp(fP.source + (fP.test("\t") ? "" : "|\t"), "g");
        fO.refresh()
    }, true);
    t("specialCharPlaceholder", eN, function(fO) {
        fO.refresh()
    }, true);
    t("electricChars", true);
    t("rtlMoveVisually", !aG);
    t("wholeLineUpdateBefore", true);
    t("theme", "default", function(fO) {
        cB(fO);
        db(fO)
    }, true);
    t("keyMap", "default", fL);
    t("extraKeys", null);
    t("lineWrapping", false, ek, true);
    t("gutters", [], function(fO) {
        b4(fO.options);
        db(fO)
    }, true);
    t("fixedGutter", true, function(fO, fP) {
        fO.display.gutters.style.left = fP ? dA(fO.display) + "px" : "0";
        fO.refresh()
    }, true);
    t("coverGutterNextToScrollbar", false, eB, true);
    t("lineNumbers", false, function(fO) {
        b4(fO.options);
        db(fO)
    }, true);
    t("firstLineNumber", 1, db, true);
    t("lineNumberFormatter", function(fO) {
        return fO
    }, db, true);
    t("showCursorWhenSelecting", false, br, true);
    t("resetSelectionOnContextMenu", true);
    t("readOnly", false, function(fO, fP) {
        if (fP == "nocursor") {
            aL(fO);
            fO.display.input.blur();
            fO.display.disabled = true
        } else {
            fO.display.disabled = false;
            if (!fP) {
                eZ(fO)
            }
        }
    });
    t("disableInput", false, function(fO, fP) {
        if (!fP) {
            eZ(fO)
        }
    }, true);
    t("dragDrop", true);
    t("cursorBlinkRate", 530);
    t("cursorScrollMargin", 0);
    t("cursorHeight", 1);
    t("workTime", 100);
    t("workDelay", 100);
    t("flattenSpans", true, dX, true);
    t("addModeClass", false, dX, true);
    t("pollInterval", 100);
    t("undoDepth", 200, function(fO, fP) {
        fO.doc.history.undoDepth = fP
    });
    t("historyEventDelay", 1250);
    t("viewportMargin", 10, function(fO) {
        fO.refresh()
    }, true);
    t("maxHighlightLength", 10000, dX, true);
    t("moveInputWithCursor", true, function(fO, fP) {
        if (!fP) {
            fO.display.inputDiv.style.top = fO.display.inputDiv.style.left = 0
        }
    });
    t("tabindex", null, function(fO, fP) {
        fO.display.input.tabIndex = fP || ""
    });
    t("autofocus", null);
    var c8 = I.modes = {}, aJ = I.mimeModes = {};
    I.defineMode = function(fO, fQ) {
        if (!I.defaults.mode && fO != "null") {
            I.defaults.mode = fO
        }
        if (arguments.length > 2) {
            fQ.dependencies = [];
            for (var fP = 2; fP < arguments.length; ++fP) {
                fQ.dependencies.push(arguments[fP])
            }
        }
        c8[fO] = fQ
    };
    I.defineMIME = function(fP, fO) {
        aJ[fP] = fO
    };
    I.resolveMode = function(fO) {
        if (typeof fO == "string" && aJ.hasOwnProperty(fO)) {
            fO = aJ[fO]
        } else {
            if (fO && typeof fO.name == "string" && aJ.hasOwnProperty(fO.name)) {
                var fP = aJ[fO.name];
                if (typeof fP == "string") {
                    fP = {name: fP}
                }
                fO = ca(fP, fO);
                fO.name = fP.name
            } else {
                if (typeof fO == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(fO)) {
                    return I.resolveMode("application/xml")
                }
            }
        }
        if (typeof fO == "string") {
            return {name: fO}
        } else {
            return fO || {name: "null"}
        }
    };
    I.getMode = function(fP, fO) {
        var fO = I.resolveMode(fO);
        var fR = c8[fO.name];
        if (!fR) {
            return I.getMode(fP, "text/plain")
        }
        var fS = fR(fP, fO);
        if (c5.hasOwnProperty(fO.name)) {
            var fQ = c5[fO.name];
            for (var fT in fQ) {
                if (!fQ.hasOwnProperty(fT)) {
                    continue
                }
                if (fS.hasOwnProperty(fT)) {
                    fS["_" + fT] = fS[fT]
                }
                fS[fT] = fQ[fT]
            }
        }
        fS.name = fO.name;
        if (fO.helperType) {
            fS.helperType = fO.helperType
        }
        if (fO.modeProps) {
            for (var fT in fO.modeProps) {
                fS[fT] = fO.modeProps[fT]
            }
        }
        return fS
    };
    I.defineMode("null", function() {
        return {token: function(fO) {
                fO.skipToEnd()
            }}
    });
    I.defineMIME("text/plain", "null");
    var c5 = I.modeExtensions = {};
    I.extendMode = function(fQ, fP) {
        var fO = c5.hasOwnProperty(fQ) ? c5[fQ] : (c5[fQ] = {});
        aE(fP, fO)
    };
    I.defineExtension = function(fO, fP) {
        I.prototype[fO] = fP
    };
    I.defineDocExtension = function(fO, fP) {
        ao.prototype[fO] = fP
    };
    I.defineOption = t;
    var aY = [];
    I.defineInitHook = function(fO) {
        aY.push(fO)
    };
    var eY = I.helpers = {};
    I.registerHelper = function(fP, fO, fQ) {
        if (!eY.hasOwnProperty(fP)) {
            eY[fP] = I[fP] = {_global: []}
        }
        eY[fP][fO] = fQ
    };
    I.registerGlobalHelper = function(fQ, fP, fO, fR) {
        I.registerHelper(fQ, fP, fR);
        eY[fQ]._global.push({pred: fO,val: fR})
    };
    var bR = I.copyState = function(fR, fO) {
        if (fO === true) {
            return fO
        }
        if (fR.copyState) {
            return fR.copyState(fO)
        }
        var fQ = {};
        for (var fS in fO) {
            var fP = fO[fS];
            if (fP instanceof Array) {
                fP = fP.concat([])
            }
            fQ[fS] = fP
        }
        return fQ
    };
    var bP = I.startState = function(fQ, fP, fO) {
        return fQ.startState ? fQ.startState(fP, fO) : true
    };
    I.innerMode = function(fQ, fO) {
        while (fQ.innerMode) {
            var fP = fQ.innerMode(fO);
            if (!fP || fP.mode == fQ) {
                break
            }
            fO = fP.state;
            fQ = fP.mode
        }
        return fP || {mode: fQ,state: fO}
    };
    var eh = I.commands = {selectAll: function(fO) {
            fO.setSelection(W(fO.firstLine(), 0), W(fO.lastLine()), Y)
        },singleSelection: function(fO) {
            fO.setSelection(fO.getCursor("anchor"), fO.getCursor("head"), Y)
        },killLine: function(fO) {
            eA(fO, function(fQ) {
                if (fQ.empty()) {
                    var fP = eP(fO.doc, fQ.head.line).text.length;
                    if (fQ.head.ch == fP && fQ.head.line < fO.lastLine()) {
                        return {from: fQ.head,to: W(fQ.head.line + 1, 0)}
                    } else {
                        return {from: fQ.head,to: W(fQ.head.line, fP)}
                    }
                } else {
                    return {from: fQ.from(),to: fQ.to()}
                }
            })
        },deleteLine: function(fO) {
            eA(fO, function(fP) {
                return {from: W(fP.from().line, 0),to: fk(fO.doc, W(fP.to().line + 1, 0))}
            })
        },delLineLeft: function(fO) {
            eA(fO, function(fP) {
                return {from: W(fP.from().line, 0),to: fP.from()}
            })
        },undo: function(fO) {
            fO.undo()
        },redo: function(fO) {
            fO.redo()
        },undoSelection: function(fO) {
            fO.undoSelection()
        },redoSelection: function(fO) {
            fO.redoSelection()
        },goDocStart: function(fO) {
            fO.extendSelection(W(fO.firstLine(), 0))
        },goDocEnd: function(fO) {
            fO.extendSelection(W(fO.lastLine()))
        },goLineStart: function(fO) {
            fO.extendSelectionsBy(function(fP) {
                return bj(fO, fP.head.line)
            }, cF)
        },goLineStartSmart: function(fO) {
            fO.extendSelectionsBy(function(fR) {
                var fU = bj(fO, fR.head.line);
                var fQ = fO.getLineHandle(fU.line);
                var fP = a(fQ);
                if (!fP || fP[0].level == 0) {
                    var fT = Math.max(0, fQ.text.search(/\S/));
                    var fS = fR.head.line == fU.line && fR.head.ch <= fT && fR.head.ch;
                    return W(fU.line, fS ? 0 : fT)
                }
                return fU
            }, cF)
        },goLineEnd: function(fO) {
            fO.extendSelectionsBy(function(fP) {
                return dt(fO, fP.head.line)
            }, cF)
        },goLineRight: function(fO) {
            fO.extendSelectionsBy(function(fP) {
                var fQ = fO.charCoords(fP.head, "div").top + 5;
                return fO.coordsChar({left: fO.display.lineDiv.offsetWidth + 100,top: fQ}, "div")
            }, cF)
        },goLineLeft: function(fO) {
            fO.extendSelectionsBy(function(fP) {
                var fQ = fO.charCoords(fP.head, "div").top + 5;
                return fO.coordsChar({left: 0,top: fQ}, "div")
            }, cF)
        },goLineUp: function(fO) {
            fO.moveV(-1, "line")
        },goLineDown: function(fO) {
            fO.moveV(1, "line")
        },goPageUp: function(fO) {
            fO.moveV(-1, "page")
        },goPageDown: function(fO) {
            fO.moveV(1, "page")
        },goCharLeft: function(fO) {
            fO.moveH(-1, "char")
        },goCharRight: function(fO) {
            fO.moveH(1, "char")
        },goColumnLeft: function(fO) {
            fO.moveH(-1, "column")
        },goColumnRight: function(fO) {
            fO.moveH(1, "column")
        },goWordLeft: function(fO) {
            fO.moveH(-1, "word")
        },goGroupRight: function(fO) {
            fO.moveH(1, "group")
        },goGroupLeft: function(fO) {
            fO.moveH(-1, "group")
        },goWordRight: function(fO) {
            fO.moveH(1, "word")
        },delCharBefore: function(fO) {
            fO.deleteH(-1, "char")
        },delCharAfter: function(fO) {
            fO.deleteH(1, "char")
        },delWordBefore: function(fO) {
            fO.deleteH(-1, "word")
        },delWordAfter: function(fO) {
            fO.deleteH(1, "word")
        },delGroupBefore: function(fO) {
            fO.deleteH(-1, "group")
        },delGroupAfter: function(fO) {
            fO.deleteH(1, "group")
        },indentAuto: function(fO) {
            fO.indentSelection("smart")
        },indentMore: function(fO) {
            fO.indentSelection("add")
        },indentLess: function(fO) {
            fO.indentSelection("subtract")
        },insertTab: function(fO) {
            fO.replaceSelection("\t")
        },insertSoftTab: function(fO) {
            var fQ = [], fP = fO.listSelections(), fT = fO.options.tabSize;
            for (var fS = 0; fS < fP.length; fS++) {
                var fU = fP[fS].from();
                var fR = bI(fO.getLine(fU.line), fU.ch, fT);
                fQ.push(new Array(fT - fR % fT + 1).join(" "))
            }
            fO.replaceSelections(fQ)
        },defaultTab: function(fO) {
            if (fO.somethingSelected()) {
                fO.indentSelection("add")
            } else {
                fO.execCommand("insertTab")
            }
        },transposeChars: function(fO) {
            cz(fO, function() {
                var fR = fO.listSelections(), fQ = [];
                for (var fS = 0; fS < fR.length; fS++) {
                    var fU = fR[fS].head, fP = eP(fO.doc, fU.line).text;
                    if (fP) {
                        if (fU.ch == fP.length) {
                            fU = new W(fU.line, fU.ch - 1)
                        }
                        if (fU.ch > 0) {
                            fU = new W(fU.line, fU.ch + 1);
                            fO.replaceRange(fP.charAt(fU.ch - 1) + fP.charAt(fU.ch - 2), W(fU.line, fU.ch - 2), fU, "+transpose")
                        } else {
                            if (fU.line > fO.doc.first) {
                                var fT = eP(fO.doc, fU.line - 1).text;
                                if (fT) {
                                    fO.replaceRange(fP.charAt(0) + "\n" + fT.charAt(fT.length - 1), W(fU.line - 1, fT.length - 1), W(fU.line, 1), "+transpose")
                                }
                            }
                        }
                    }
                    fQ.push(new dB(fU, fU))
                }
                fO.setSelections(fQ)
            })
        },newlineAndIndent: function(fO) {
            cz(fO, function() {
                var fP = fO.listSelections().length;
                for (var fR = 0; fR < fP; fR++) {
                    var fQ = fO.listSelections()[fR];
                    fO.replaceRange("\n", fQ.anchor, fQ.head, "+input");
                    fO.indentLine(fQ.from().line + 1, null, true);
                    fh(fO)
                }
            })
        },toggleOverwrite: function(fO) {
            fO.toggleOverwrite()
        }};
    var eK = I.keyMap = {};
    eK.basic = {Left: "goCharLeft",Right: "goCharRight",Up: "goLineUp",Down: "goLineDown",End: "goLineEnd",Home: "goLineStartSmart",PageUp: "goPageUp",PageDown: "goPageDown",Delete: "delCharAfter",Backspace: "delCharBefore","Shift-Backspace": "delCharBefore",Tab: "defaultTab","Shift-Tab": "indentAuto",Enter: "newlineAndIndent",Insert: "toggleOverwrite",Esc: "singleSelection"};
    eK.pcDefault = {"Ctrl-A": "selectAll","Ctrl-D": "deleteLine","Ctrl-Z": "undo","Shift-Ctrl-Z": "redo","Ctrl-Y": "redo","Ctrl-Home": "goDocStart","Ctrl-Up": "goDocStart","Ctrl-End": "goDocEnd","Ctrl-Down": "goDocEnd","Ctrl-Left": "goGroupLeft","Ctrl-Right": "goGroupRight","Alt-Left": "goLineStart","Alt-Right": "goLineEnd","Ctrl-Backspace": "delGroupBefore","Ctrl-Delete": "delGroupAfter","Ctrl-S": "save","Ctrl-F": "find","Ctrl-G": "findNext","Shift-Ctrl-G": "findPrev","Shift-Ctrl-F": "replace","Shift-Ctrl-R": "replaceAll","Ctrl-[": "indentLess","Ctrl-]": "indentMore","Ctrl-U": "undoSelection","Shift-Ctrl-U": "redoSelection","Alt-U": "redoSelection",fallthrough: "basic"};
    eK.macDefault = {"Cmd-A": "selectAll","Cmd-D": "deleteLine","Cmd-Z": "undo","Shift-Cmd-Z": "redo","Cmd-Y": "redo","Cmd-Up": "goDocStart","Cmd-End": "goDocEnd","Cmd-Down": "goDocEnd","Alt-Left": "goGroupLeft","Alt-Right": "goGroupRight","Cmd-Left": "goLineStart","Cmd-Right": "goLineEnd","Alt-Backspace": "delGroupBefore","Ctrl-Alt-Backspace": "delGroupAfter","Alt-Delete": "delGroupAfter","Cmd-S": "save","Cmd-F": "find","Cmd-G": "findNext","Shift-Cmd-G": "findPrev","Cmd-Alt-F": "replace","Shift-Cmd-Alt-F": "replaceAll","Cmd-[": "indentLess","Cmd-]": "indentMore","Cmd-Backspace": "delLineLeft","Cmd-U": "undoSelection","Shift-Cmd-U": "redoSelection",fallthrough: ["basic", "emacsy"]};
    eK.emacsy = {"Ctrl-F": "goCharRight","Ctrl-B": "goCharLeft","Ctrl-P": "goLineUp","Ctrl-N": "goLineDown","Alt-F": "goWordRight","Alt-B": "goWordLeft","Ctrl-A": "goLineStart","Ctrl-E": "goLineEnd","Ctrl-V": "goPageDown","Shift-Ctrl-V": "goPageUp","Ctrl-D": "delCharAfter","Ctrl-H": "delCharBefore","Alt-D": "delWordAfter","Alt-Backspace": "delWordBefore","Ctrl-K": "killLine","Ctrl-T": "transposeChars"};
    eK["default"] = bU ? eK.macDefault : eK.pcDefault;
    function fv(fO) {
        if (typeof fO == "string") {
            return eK[fO]
        } else {
            return fO
        }
    }
    var j = I.lookupKey = function(fP, fT, fR) {
        function fS(fY) {
            fY = fv(fY);
            var fX = fY[fP];
            if (fX === false) {
                return "stop"
            }
            if (fX != null && fR(fX)) {
                return true
            }
            if (fY.nofallthrough) {
                return "stop"
            }
            var fW = fY.fallthrough;
            if (fW == null) {
                return false
            }
            if (Object.prototype.toString.call(fW) != "[object Array]") {
                return fS(fW)
            }
            for (var fV = 0; fV < fW.length; ++fV) {
                var fU = fS(fW[fV]);
                if (fU) {
                    return fU
                }
            }
            return false
        }
        for (var fQ = 0; fQ < fT.length; ++fQ) {
            var fO = fS(fT[fQ]);
            if (fO) {
                return fO != "stop"
            }
        }
    };
    var eg = I.isModifierKey = function(fP) {
        var fO = eQ[fP.keyCode];
        return fO == "Ctrl" || fO == "Alt" || fO == "Shift" || fO == "Mod"
    };
    var e2 = I.keyName = function(fP, fQ) {
        if (dF && fP.keyCode == 34 && fP["char"]) {
            return false
        }
        var fO = eQ[fP.keyCode];
        if (fO == null || fP.altGraphKey) {
            return false
        }
        if (fP.altKey) {
            fO = "Alt-" + fO
        }
        if (bF ? fP.metaKey : fP.ctrlKey) {
            fO = "Ctrl-" + fO
        }
        if (bF ? fP.ctrlKey : fP.metaKey) {
            fO = "Cmd-" + fO
        }
        if (!fQ && fP.shiftKey) {
            fO = "Shift-" + fO
        }
        return fO
    };
    I.fromTextArea = function(fV, fW) {
        if (!fW) {
            fW = {}
        }
        fW.value = fV.value;
        if (!fW.tabindex && fV.tabindex) {
            fW.tabindex = fV.tabindex
        }
        if (!fW.placeholder && fV.placeholder) {
            fW.placeholder = fV.placeholder
        }
        if (fW.autofocus == null) {
            var fO = ds();
            fW.autofocus = fO == fV || fV.getAttribute("autofocus") != null && fO == document.body
        }
        function fS() {
            fV.value = fU.getValue()
        }
        if (fV.form) {
            bM(fV.form, "submit", fS);
            if (!fW.leaveSubmitMethodAlone) {
                var fP = fV.form, fT = fP.submit;
                try {
                    var fR = fP.submit = function() {
                        fS();
                        fP.submit = fT;
                        fP.submit();
                        fP.submit = fR
                    }
                } catch (fQ) {
                }
            }
        }
        fV.style.display = "none";
        var fU = I(function(fX) {
            fV.parentNode.insertBefore(fX, fV.nextSibling)
        }, fW);
        fU.save = fS;
        fU.getTextArea = function() {
            return fV
        };
        fU.toTextArea = function() {
            fS();
            fV.parentNode.removeChild(fU.getWrapperElement());
            fV.style.display = "";
            if (fV.form) {
                dP(fV.form, "submit", fS);
                if (typeof fV.form.submit == "function") {
                    fV.form.submit = fT
                }
            }
        };
        return fU
    };
    var ew = I.StringStream = function(fO, fP) {
        this.pos = this.start = 0;
        this.string = fO;
        this.tabSize = fP || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0
    };
    ew.prototype = {eol: function() {
            return this.pos >= this.string.length
        },sol: function() {
            return this.pos == this.lineStart
        },peek: function() {
            return this.string.charAt(this.pos) || undefined
        },next: function() {
            if (this.pos < this.string.length) {
                return this.string.charAt(this.pos++)
            }
        },eat: function(fO) {
            var fQ = this.string.charAt(this.pos);
            if (typeof fO == "string") {
                var fP = fQ == fO
            } else {
                var fP = fQ && (fO.test ? fO.test(fQ) : fO(fQ))
            }
            if (fP) {
                ++this.pos;
                return fQ
            }
        },eatWhile: function(fO) {
            var fP = this.pos;
            while (this.eat(fO)) {
            }
            return this.pos > fP
        },eatSpace: function() {
            var fO = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
                ++this.pos
            }
            return this.pos > fO
        },skipToEnd: function() {
            this.pos = this.string.length
        },skipTo: function(fO) {
            var fP = this.string.indexOf(fO, this.pos);
            if (fP > -1) {
                this.pos = fP;
                return true
            }
        },backUp: function(fO) {
            this.pos -= fO
        },column: function() {
            if (this.lastColumnPos < this.start) {
                this.lastColumnValue = bI(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
                this.lastColumnPos = this.start
            }
            return this.lastColumnValue - (this.lineStart ? bI(this.string, this.lineStart, this.tabSize) : 0)
        },indentation: function() {
            return bI(this.string, null, this.tabSize) - (this.lineStart ? bI(this.string, this.lineStart, this.tabSize) : 0)
        },match: function(fS, fP, fO) {
            if (typeof fS == "string") {
                var fT = function(fU) {
                    return fO ? fU.toLowerCase() : fU
                };
                var fR = this.string.substr(this.pos, fS.length);
                if (fT(fR) == fT(fS)) {
                    if (fP !== false) {
                        this.pos += fS.length
                    }
                    return true
                }
            } else {
                var fQ = this.string.slice(this.pos).match(fS);
                if (fQ && fQ.index > 0) {
                    return null
                }
                if (fQ && fP !== false) {
                    this.pos += fQ[0].length
                }
                return fQ
            }
        },current: function() {
            return this.string.slice(this.start, this.pos)
        },hideFirstChars: function(fP, fO) {
            this.lineStart += fP;
            try {
                return fO()
            }finally {
                this.lineStart -= fP
            }
        }};
    var P = I.TextMarker = function(fP, fO) {
        this.lines = [];
        this.type = fO;
        this.doc = fP
    };
    bo(P);
    P.prototype.clear = function() {
        if (this.explicitlyCleared) {
            return
        }
        var fV = this.doc.cm, fP = fV && !fV.curOp;
        if (fP) {
            cw(fV)
        }
        if (eS(this, "clear")) {
            var fW = this.find();
            if (fW) {
                ac(this, "clear", fW.from, fW.to)
            }
        }
        var fQ = null, fT = null;
        for (var fR = 0; fR < this.lines.length; ++fR) {
            var fX = this.lines[fR];
            var fU = eJ(fX.markedSpans, this);
            if (fV && !this.collapsed) {
                R(fV, bC(fX), "text")
            } else {
                if (fV) {
                    if (fU.to != null) {
                        fT = bC(fX)
                    }
                    if (fU.from != null) {
                        fQ = bC(fX)
                    }
                }
            }
            fX.markedSpans = el(fX.markedSpans, fU);
            if (fU.from == null && this.collapsed && !e7(this.doc, fX) && fV) {
                fB(fX, aN(fV.display))
            }
        }
        if (fV && this.collapsed && !fV.options.lineWrapping) {
            for (var fR = 0; fR < this.lines.length; ++fR) {
                var fO = z(this.lines[fR]), fS = dY(fO);
                if (fS > fV.display.maxLineLength) {
                    fV.display.maxLine = fO;
                    fV.display.maxLineLength = fS;
                    fV.display.maxLineChanged = true
                }
            }
        }
        if (fQ != null && fV && this.collapsed) {
            af(fV, fQ, fT + 1)
        }
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
            this.doc.cantEdit = false;
            if (fV) {
                ea(fV.doc)
            }
        }
        if (fV) {
            ac(fV, "markerCleared", fV, this)
        }
        if (fP) {
            aj(fV)
        }
        if (this.parent) {
            this.parent.clear()
        }
    };
    P.prototype.find = function(fR, fP) {
        if (fR == null && this.type == "bookmark") {
            fR = 1
        }
        var fU, fT;
        for (var fQ = 0; fQ < this.lines.length; ++fQ) {
            var fO = this.lines[fQ];
            var fS = eJ(fO.markedSpans, this);
            if (fS.from != null) {
                fU = W(fP ? fO : bC(fO), fS.from);
                if (fR == -1) {
                    return fU
                }
            }
            if (fS.to != null) {
                fT = W(fP ? fO : bC(fO), fS.to);
                if (fR == 1) {
                    return fT
                }
            }
        }
        return fU && {from: fU,to: fT}
    };
    P.prototype.changed = function() {
        var fQ = this.find(-1, true), fP = this, fO = this.doc.cm;
        if (!fQ || !fO) {
            return
        }
        cz(fO, function() {
            var fS = fQ.line, fT = bC(fQ.line);
            var fR = eL(fO, fT);
            if (fR) {
                ap(fR);
                fO.curOp.selectionChanged = fO.curOp.forceUpdate = true
            }
            fO.curOp.updateMaxLine = true;
            if (!e7(fP.doc, fS) && fP.height != null) {
                var fV = fP.height;
                fP.height = null;
                var fU = cH(fP) - fV;
                if (fU) {
                    fB(fS, fS.height + fU)
                }
            }
        })
    };
    P.prototype.attachLine = function(fO) {
        if (!this.lines.length && this.doc.cm) {
            var fP = this.doc.cm.curOp;
            if (!fP.maybeHiddenMarkers || c1(fP.maybeHiddenMarkers, this) == -1) {
                (fP.maybeUnhiddenMarkers || (fP.maybeUnhiddenMarkers = [])).push(this)
            }
        }
        this.lines.push(fO)
    };
    P.prototype.detachLine = function(fO) {
        this.lines.splice(c1(this.lines, fO), 1);
        if (!this.lines.length && this.doc.cm) {
            var fP = this.doc.cm.curOp;
            (fP.maybeHiddenMarkers || (fP.maybeHiddenMarkers = [])).push(this)
        }
    };
    var aV = 0;
    function ej(fW, fU, fV, fY, fS) {
        if (fY && fY.shared) {
            return O(fW, fU, fV, fY, fS)
        }
        if (fW.cm && !fW.cm.curOp) {
            return cL(fW.cm, ej)(fW, fU, fV, fY, fS)
        }
        var fR = new P(fW, fS), fX = b5(fU, fV);
        if (fY) {
            aE(fY, fR, false)
        }
        if (fX > 0 || fX == 0 && fR.clearWhenEmpty !== false) {
            return fR
        }
        if (fR.replacedWith) {
            fR.collapsed = true;
            fR.widgetNode = fx("span", [fR.replacedWith], "CodeMirror-widget");
            if (!fY.handleMouseEvents) {
                fR.widgetNode.ignoreEvents = true
            }
            if (fY.insertLeft) {
                fR.widgetNode.insertLeft = true
            }
        }
        if (fR.collapsed) {
            if (A(fW, fU.line, fU, fV, fR) || fU.line != fV.line && A(fW, fV.line, fU, fV, fR)) {
                throw new Error("Inserting collapsed marker partially overlapping an existing one")
            }
            aX = true
        }
        if (fR.addToHistory) {
            fn(fW, {from: fU,to: fV,origin: "markText"}, fW.sel, NaN)
        }
        var fP = fU.line, fT = fW.cm, fO;
        fW.iter(fP, fV.line + 1, function(fZ) {
            if (fT && fR.collapsed && !fT.options.lineWrapping && z(fZ) == fT.display.maxLine) {
                fO = true
            }
            if (fR.collapsed && fP != fU.line) {
                fB(fZ, 0)
            }
            b3(fZ, new dU(fR, fP == fU.line ? fU.ch : null, fP == fV.line ? fV.ch : null));
            ++fP
        });
        if (fR.collapsed) {
            fW.iter(fU.line, fV.line + 1, function(fZ) {
                if (e7(fW, fZ)) {
                    fB(fZ, 0)
                }
            })
        }
        if (fR.clearOnEnter) {
            bM(fR, "beforeCursorEnter", function() {
                fR.clear()
            })
        }
        if (fR.readOnly) {
            fI = true;
            if (fW.history.done.length || fW.history.undone.length) {
                fW.clearHistory()
            }
        }
        if (fR.collapsed) {
            fR.id = ++aV;
            fR.atomic = true
        }
        if (fT) {
            if (fO) {
                fT.curOp.updateMaxLine = true
            }
            if (fR.collapsed) {
                af(fT, fU.line, fV.line + 1)
            } else {
                if (fR.className || fR.title || fR.startStyle || fR.endStyle) {
                    for (var fQ = fU.line; fQ <= fV.line; fQ++) {
                        R(fT, fQ, "text")
                    }
                }
            }
            if (fR.atomic) {
                ea(fT.doc)
            }
            ac(fT, "markerAdded", fT, fR)
        }
        return fR
    }
    var y = I.SharedTextMarker = function(fQ, fP) {
        this.markers = fQ;
        this.primary = fP;
        for (var fO = 0; fO < fQ.length; ++fO) {
            fQ[fO].parent = this
        }
    };
    bo(y);
    y.prototype.clear = function() {
        if (this.explicitlyCleared) {
            return
        }
        this.explicitlyCleared = true;
        for (var fO = 0; fO < this.markers.length; ++fO) {
            this.markers[fO].clear()
        }
        ac(this, "clear")
    };
    y.prototype.find = function(fP, fO) {
        return this.primary.find(fP, fO)
    };
    function O(fS, fV, fU, fO, fQ) {
        fO = aE(fO);
        fO.shared = false;
        var fT = [ej(fS, fV, fU, fO, fQ)], fP = fT[0];
        var fR = fO.widgetNode;
        dK(fS, function(fX) {
            if (fR) {
                fO.widgetNode = fR.cloneNode(true)
            }
            fT.push(ej(fX, fk(fX, fV), fk(fX, fU), fO, fQ));
            for (var fW = 0; fW < fX.linked.length; ++fW) {
                if (fX.linked[fW].isParent) {
                    return
                }
            }
            fP = fi(fT)
        });
        return new y(fT, fP)
    }
    function es(fO) {
        return fO.findMarks(W(fO.first, 0), fO.clipPos(W(fO.lastLine())), function(fP) {
            return fP.parent
        })
    }
    function dk(fT, fU) {
        for (var fR = 0; fR < fU.length; fR++) {
            var fP = fU[fR], fV = fP.find();
            var fO = fT.clipPos(fV.from), fS = fT.clipPos(fV.to);
            if (b5(fO, fS)) {
                var fQ = ej(fT, fO, fS, fP.primary, fP.primary.type);
                fP.markers.push(fQ);
                fQ.parent = fP
            }
        }
    }
    function d0(fR) {
        for (var fQ = 0; fQ < fR.length; fQ++) {
            var fO = fR[fQ], fT = [fO.primary.doc];
            dK(fO.primary.doc, function(fU) {
                fT.push(fU)
            });
            for (var fP = 0; fP < fO.markers.length; fP++) {
                var fS = fO.markers[fP];
                if (c1(fT, fS.doc) == -1) {
                    fS.parent = null;
                    fO.markers.splice(fP--, 1)
                }
            }
        }
    }
    function dU(fO, fQ, fP) {
        this.marker = fO;
        this.from = fQ;
        this.to = fP
    }
    function eJ(fQ, fO) {
        if (fQ) {
            for (var fP = 0; fP < fQ.length; ++fP) {
                var fR = fQ[fP];
                if (fR.marker == fO) {
                    return fR
                }
            }
        }
    }
    function el(fP, fQ) {
        for (var fR, fO = 0; fO < fP.length; ++fO) {
            if (fP[fO] != fQ) {
                (fR || (fR = [])).push(fP[fO])
            }
        }
        return fR
    }
    function b3(fO, fP) {
        fO.markedSpans = fO.markedSpans ? fO.markedSpans.concat([fP]) : [fP];
        fP.marker.attachLine(fO)
    }
    function aH(fP, fQ, fU) {
        if (fP) {
            for (var fS = 0, fV; fS < fP.length; ++fS) {
                var fW = fP[fS], fT = fW.marker;
                var fO = fW.from == null || (fT.inclusiveLeft ? fW.from <= fQ : fW.from < fQ);
                if (fO || fW.from == fQ && fT.type == "bookmark" && (!fU || !fW.marker.insertLeft)) {
                    var fR = fW.to == null || (fT.inclusiveRight ? fW.to >= fQ : fW.to > fQ);
                    (fV || (fV = [])).push(new dU(fT, fW.from, fR ? null : fW.to))
                }
            }
        }
        return fV
    }
    function ax(fP, fR, fU) {
        if (fP) {
            for (var fS = 0, fV; fS < fP.length; ++fS) {
                var fW = fP[fS], fT = fW.marker;
                var fQ = fW.to == null || (fT.inclusiveRight ? fW.to >= fR : fW.to > fR);
                if (fQ || fW.from == fR && fT.type == "bookmark" && (!fU || fW.marker.insertLeft)) {
                    var fO = fW.from == null || (fT.inclusiveLeft ? fW.from <= fR : fW.from < fR);
                    (fV || (fV = [])).push(new dU(fT, fO ? null : fW.from - fR, fW.to == null ? null : fW.to - fR))
                }
            }
        }
        return fV
    }
    function dW(f0, fX) {
        var fW = bW(f0, fX.from.line) && eP(f0, fX.from.line).markedSpans;
        var f3 = bW(f0, fX.to.line) && eP(f0, fX.to.line).markedSpans;
        if (!fW && !f3) {
            return null
        }
        var fP = fX.from.ch, fS = fX.to.ch, fV = b5(fX.from, fX.to) == 0;
        var fU = aH(fW, fP, fV);
        var f2 = ax(f3, fS, fV);
        var f1 = fX.text.length == 1, fQ = fi(fX.text).length + (f1 ? fP : 0);
        if (fU) {
            for (var fR = 0; fR < fU.length; ++fR) {
                var fZ = fU[fR];
                if (fZ.to == null) {
                    var f4 = eJ(f2, fZ.marker);
                    if (!f4) {
                        fZ.to = fP
                    } else {
                        if (f1) {
                            fZ.to = f4.to == null ? null : f4.to + fQ
                        }
                    }
                }
            }
        }
        if (f2) {
            for (var fR = 0; fR < f2.length; ++fR) {
                var fZ = f2[fR];
                if (fZ.to != null) {
                    fZ.to += fQ
                }
                if (fZ.from == null) {
                    var f4 = eJ(fU, fZ.marker);
                    if (!f4) {
                        fZ.from = fQ;
                        if (f1) {
                            (fU || (fU = [])).push(fZ)
                        }
                    }
                } else {
                    fZ.from += fQ;
                    if (f1) {
                        (fU || (fU = [])).push(fZ)
                    }
                }
            }
        }
        if (fU) {
            fU = r(fU)
        }
        if (f2 && f2 != fU) {
            f2 = r(f2)
        }
        var fT = [fU];
        if (!f1) {
            var fY = fX.text.length - 2, fO;
            if (fY > 0 && fU) {
                for (var fR = 0; fR < fU.length; ++fR) {
                    if (fU[fR].to == null) {
                        (fO || (fO = [])).push(new dU(fU[fR].marker, null, null))
                    }
                }
            }
            for (var fR = 0; fR < fY; ++fR) {
                fT.push(fO)
            }
            fT.push(f2)
        }
        return fT
    }
    function r(fP) {
        for (var fO = 0; fO < fP.length; ++fO) {
            var fQ = fP[fO];
            if (fQ.from != null && fQ.from == fQ.to && fQ.marker.clearWhenEmpty !== false) {
                fP.splice(fO--, 1)
            }
        }
        if (!fP.length) {
            return null
        }
        return fP
    }
    function dM(fW, fU) {
        var fO = bS(fW, fU);
        var fX = dW(fW, fU);
        if (!fO) {
            return fX
        }
        if (!fX) {
            return fO
        }
        for (var fR = 0; fR < fO.length; ++fR) {
            var fS = fO[fR], fT = fX[fR];
            if (fS && fT) {
                spans: for (var fQ = 0; fQ < fT.length; ++fQ) {
                    var fV = fT[fQ];
                    for (var fP = 0; fP < fS.length; ++fP) {
                        if (fS[fP].marker == fV.marker) {
                            continue spans
                        }
                    }
                    fS.push(fV)
                }
            } else {
                if (fT) {
                    fO[fR] = fT
                }
            }
        }
        return fO
    }
    function cv(f0, fY, fZ) {
        var fS = null;
        f0.iter(fY.line, fZ.line + 1, function(f1) {
            if (f1.markedSpans) {
                for (var f2 = 0; f2 < f1.markedSpans.length; ++f2) {
                    var f3 = f1.markedSpans[f2].marker;
                    if (f3.readOnly && (!fS || c1(fS, f3) == -1)) {
                        (fS || (fS = [])).push(f3)
                    }
                }
            }
        });
        if (!fS) {
            return null
        }
        var fT = [{from: fY,to: fZ}];
        for (var fU = 0; fU < fS.length; ++fU) {
            var fV = fS[fU], fQ = fV.find(0);
            for (var fR = 0; fR < fT.length; ++fR) {
                var fP = fT[fR];
                if (b5(fP.to, fQ.from) < 0 || b5(fP.from, fQ.to) > 0) {
                    continue
                }
                var fX = [fR, 1], fO = b5(fP.from, fQ.from), fW = b5(fP.to, fQ.to);
                if (fO < 0 || !fV.inclusiveLeft && !fO) {
                    fX.push({from: fP.from,to: fQ.from})
                }
                if (fW > 0 || !fV.inclusiveRight && !fW) {
                    fX.push({from: fQ.to,to: fP.to})
                }
                fT.splice.apply(fT, fX);
                fR += fX.length - 1
            }
        }
        return fT
    }
    function fE(fO) {
        var fQ = fO.markedSpans;
        if (!fQ) {
            return
        }
        for (var fP = 0; fP < fQ.length; ++fP) {
            fQ[fP].marker.detachLine(fO)
        }
        fO.markedSpans = null
    }
    function cM(fO, fQ) {
        if (!fQ) {
            return
        }
        for (var fP = 0; fP < fQ.length; ++fP) {
            fQ[fP].marker.attachLine(fO)
        }
        fO.markedSpans = fQ
    }
    function w(fO) {
        return fO.inclusiveLeft ? -1 : 0
    }
    function bL(fO) {
        return fO.inclusiveRight ? 1 : 0
    }
    function du(fR, fP) {
        var fT = fR.lines.length - fP.lines.length;
        if (fT != 0) {
            return fT
        }
        var fQ = fR.find(), fU = fP.find();
        var fO = b5(fQ.from, fU.from) || w(fR) - w(fP);
        if (fO) {
            return -fO
        }
        var fS = b5(fQ.to, fU.to) || bL(fR) - bL(fP);
        if (fS) {
            return fS
        }
        return fP.id - fR.id
    }
    function aW(fP, fT) {
        var fO = aX && fP.markedSpans, fS;
        if (fO) {
            for (var fR, fQ = 0; fQ < fO.length; ++fQ) {
                fR = fO[fQ];
                if (fR.marker.collapsed && (fT ? fR.from : fR.to) == null && (!fS || du(fS, fR.marker) < 0)) {
                    fS = fR.marker
                }
            }
        }
        return fS
    }
    function er(fO) {
        return aW(fO, true)
    }
    function d7(fO) {
        return aW(fO, false)
    }
    function A(fW, fQ, fU, fV, fS) {
        var fZ = eP(fW, fQ);
        var fO = aX && fZ.markedSpans;
        if (fO) {
            for (var fR = 0; fR < fO.length; ++fR) {
                var fP = fO[fR];
                if (!fP.marker.collapsed) {
                    continue
                }
                var fY = fP.marker.find(0);
                var fX = b5(fY.from, fU) || w(fP.marker) - w(fS);
                var fT = b5(fY.to, fV) || bL(fP.marker) - bL(fS);
                if (fX >= 0 && fT <= 0 || fX <= 0 && fT >= 0) {
                    continue
                }
                if (fX <= 0 && (b5(fY.to, fU) || bL(fP.marker) - w(fS)) > 0 || fX >= 0 && (b5(fY.from, fV) || w(fP.marker) - bL(fS)) < 0) {
                    return true
                }
            }
        }
    }
    function z(fP) {
        var fO;
        while (fO = er(fP)) {
            fP = fO.find(-1, true).line
        }
        return fP
    }
    function i(fQ) {
        var fO, fP;
        while (fO = d7(fQ)) {
            fQ = fO.find(1, true).line;
            (fP || (fP = [])).push(fQ)
        }
        return fP
    }
    function aM(fR, fP) {
        var fO = eP(fR, fP), fQ = z(fO);
        if (fO == fQ) {
            return fP
        }
        return bC(fQ)
    }
    function dG(fR, fQ) {
        if (fQ > fR.lastLine()) {
            return fQ
        }
        var fP = eP(fR, fQ), fO;
        if (!e7(fR, fP)) {
            return fQ
        }
        while (fO = d7(fP)) {
            fP = fO.find(1, true).line
        }
        return bC(fP) + 1
    }
    function e7(fS, fP) {
        var fO = aX && fP.markedSpans;
        if (fO) {
            for (var fR, fQ = 0; fQ < fO.length; ++fQ) {
                fR = fO[fQ];
                if (!fR.marker.collapsed) {
                    continue
                }
                if (fR.from == null) {
                    return true
                }
                if (fR.marker.widgetNode) {
                    continue
                }
                if (fR.from == 0 && fR.marker.inclusiveLeft && T(fS, fP, fR)) {
                    return true
                }
            }
        }
    }
    function T(fT, fP, fR) {
        if (fR.to == null) {
            var fO = fR.marker.find(1, true);
            return T(fT, fO.line, eJ(fO.line.markedSpans, fR.marker))
        }
        if (fR.marker.inclusiveRight && fR.to == fP.text.length) {
            return true
        }
        for (var fS, fQ = 0; fQ < fP.markedSpans.length; ++fQ) {
            fS = fP.markedSpans[fQ];
            if (fS.marker.collapsed && !fS.marker.widgetNode && fS.from == fR.to && (fS.to == null || fS.to != fR.from) && (fS.marker.inclusiveLeft || fR.marker.inclusiveRight) && T(fT, fP, fS)) {
                return true
            }
        }
    }
    var dh = I.LineWidget = function(fO, fR, fP) {
        if (fP) {
            for (var fQ in fP) {
                if (fP.hasOwnProperty(fQ)) {
                    this[fQ] = fP[fQ]
                }
            }
        }
        this.cm = fO;
        this.node = fR
    };
    bo(dh);
    function dD(fO, fP, fQ) {
        if (bB(fP) < ((fO.curOp && fO.curOp.scrollTop) || fO.doc.scrollTop)) {
            cy(fO, null, fQ)
        }
    }
    dh.prototype.clear = function() {
        var fP = this.cm, fR = this.line.widgets, fQ = this.line, fT = bC(fQ);
        if (fT == null || !fR) {
            return
        }
        for (var fS = 0; fS < fR.length; ++fS) {
            if (fR[fS] == this) {
                fR.splice(fS--, 1)
            }
        }
        if (!fR.length) {
            fQ.widgets = null
        }
        var fO = cH(this);
        cz(fP, function() {
            dD(fP, fQ, -fO);
            R(fP, fT, "widget");
            fB(fQ, Math.max(0, fQ.height - fO))
        })
    };
    dh.prototype.changed = function() {
        var fP = this.height, fO = this.cm, fQ = this.line;
        this.height = null;
        var fR = cH(this) - fP;
        if (!fR) {
            return
        }
        cz(fO, function() {
            fO.curOp.forceUpdate = true;
            dD(fO, fQ, fR);
            fB(fQ, fQ.height + fR)
        })
    };
    function cH(fO) {
        if (fO.height != null) {
            return fO.height
        }
        if (!fG(document.body, fO.node)) {
            bG(fO.cm.display.measure, fx("div", [fO.node], null, "position: relative"))
        }
        return fO.height = fO.node.offsetHeight
    }
    function bw(fO, fS, fQ, fP) {
        var fR = new dh(fO, fQ, fP);
        if (fR.noHScroll) {
            fO.display.alignWidgets = true
        }
        eb(fO, fS, "widget", function(fU) {
            var fV = fU.widgets || (fU.widgets = []);
            if (fR.insertAt == null) {
                fV.push(fR)
            } else {
                fV.splice(Math.min(fV.length - 1, Math.max(0, fR.insertAt)), 0, fR)
            }
            fR.line = fU;
            if (!e7(fO.doc, fU)) {
                var fT = bB(fU) < fO.doc.scrollTop;
                fB(fU, fU.height + cH(fR));
                if (fT) {
                    cy(fO, null, fR.height)
                }
                fO.curOp.forceUpdate = true
            }
            return true
        });
        return fR
    }
    var fD = I.Line = function(fQ, fP, fO) {
        this.text = fQ;
        cM(this, fP);
        this.height = fO ? fO(this) : 1
    };
    bo(fD);
    fD.prototype.lineNo = function() {
        return bC(this)
    };
    function dZ(fP, fS, fQ, fO) {
        fP.text = fS;
        if (fP.stateAfter) {
            fP.stateAfter = null
        }
        if (fP.styles) {
            fP.styles = null
        }
        if (fP.order != null) {
            fP.order = null
        }
        fE(fP);
        cM(fP, fQ);
        var fR = fO ? fO(fP) : 1;
        if (fR != fP.height) {
            fB(fP, fR)
        }
    }
    function bq(fO) {
        fO.parent = null;
        fE(fO)
    }
    function c2(fQ, fP) {
        if (fQ) {
            for (; ; ) {
                var fO = fQ.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!fO) {
                    break
                }
                fQ = fQ.slice(0, fO.index) + fQ.slice(fO.index + fO[0].length);
                var fR = fO[1] ? "bgClass" : "textClass";
                if (fP[fR] == null) {
                    fP[fR] = fO[2]
                } else {
                    if (!(new RegExp("(?:^|s)" + fO[2] + "(?:$|s)")).test(fP[fR])) {
                        fP[fR] += " " + fO[2]
                    }
                }
            }
        }
        return fQ
    }
    function e1(fQ, fP) {
        if (fQ.blankLine) {
            return fQ.blankLine(fP)
        }
        if (!fQ.innerMode) {
            return
        }
        var fO = I.innerMode(fQ, fP);
        if (fO.mode.blankLine) {
            return fO.mode.blankLine(fO.state)
        }
    }
    function ef(fS, fR, fQ) {
        for (var fO = 0; fO < 10; fO++) {
            var fP = fS.token(fR, fQ);
            if (fR.pos > fR.start) {
                return fP
            }
        }
        throw new Error("Mode " + fS.name + " failed to advance stream.")
    }
    function x(fY, f0, fT, fP, fU, fR, fS) {
        var fQ = fT.flattenSpans;
        if (fQ == null) {
            fQ = fY.options.flattenSpans
        }
        var fW = 0, fV = null;
        var fZ = new ew(f0, fY.options.tabSize), fO;
        if (f0 == "") {
            c2(e1(fT, fP), fR)
        }
        while (!fZ.eol()) {
            if (fZ.pos > fY.options.maxHighlightLength) {
                fQ = false;
                if (fS) {
                    dc(fY, f0, fP, fZ.pos)
                }
                fZ.pos = f0.length;
                fO = null
            } else {
                fO = c2(ef(fT, fZ, fP), fR)
            }
            if (fY.options.addModeClass) {
                var f1 = I.innerMode(fT, fP).mode.name;
                if (f1) {
                    fO = "m-" + (fO ? f1 + " " + fO : f1)
                }
            }
            if (!fQ || fV != fO) {
                if (fW < fZ.start) {
                    fU(fZ.start, fV)
                }
                fW = fZ.start;
                fV = fO
            }
            fZ.start = fZ.pos
        }
        while (fW < fZ.pos) {
            var fX = Math.min(fZ.pos, fW + 50000);
            fU(fX, fV);
            fW = fX
        }
    }
    function fa(fV, fX, fO, fS) {
        var fW = [fV.state.modeGen], fR = {};
        x(fV, fX.text, fV.doc.mode, fO, function(fY, fZ) {
            fW.push(fY, fZ)
        }, fR, fS);
        for (var fP = 0; fP < fV.state.overlays.length; ++fP) {
            var fT = fV.state.overlays[fP], fU = 1, fQ = 0;
            x(fV, fX.text, fT.mode, true, function(fY, f0) {
                var f2 = fU;
                while (fQ < fY) {
                    var fZ = fW[fU];
                    if (fZ > fY) {
                        fW.splice(fU, 1, fY, fW[fU + 1], fZ)
                    }
                    fU += 2;
                    fQ = Math.min(fY, fZ)
                }
                if (!f0) {
                    return
                }
                if (fT.opaque) {
                    fW.splice(f2, fU - f2, fY, "cm-overlay " + f0);
                    fU = f2 + 2
                } else {
                    for (; f2 < fU; f2 += 2) {
                        var f1 = fW[f2 + 1];
                        fW[f2 + 1] = (f1 ? f1 + " " : "") + "cm-overlay " + f0
                    }
                }
            }, fR)
        }
        return {styles: fW,classes: fR.bgClass || fR.textClass ? fR : null}
    }
    function cQ(fP, fQ) {
        if (!fQ.styles || fQ.styles[0] != fP.state.modeGen) {
            var fO = fa(fP, fQ, fQ.stateAfter = dg(fP, bC(fQ)));
            fQ.styles = fO.styles;
            if (fO.classes) {
                fQ.styleClasses = fO.classes
            } else {
                if (fQ.styleClasses) {
                    fQ.styleClasses = null
                }
            }
        }
        return fQ.styles
    }
    function dc(fO, fT, fQ, fP) {
        var fS = fO.doc.mode;
        var fR = new ew(fT, fO.options.tabSize);
        fR.start = fR.pos = fP || 0;
        if (fT == "") {
            e1(fS, fQ)
        }
        while (!fR.eol() && fR.pos <= fO.options.maxHighlightLength) {
            ef(fS, fR, fQ);
            fR.start = fR.pos
        }
    }
    var dz = {}, bQ = {};
    function ez(fQ, fP) {
        if (!fQ || /^\s*$/.test(fQ)) {
            return null
        }
        var fO = fP.addModeClass ? bQ : dz;
        return fO[fQ] || (fO[fQ] = fQ.replace(/\S+/g, "cm-$&"))
    }
    function ev(fP, fT) {
        var fU = fx("span", null, null, cJ ? "padding-right: .1px" : null);
        var fR = {pre: fx("pre", [fU]),content: fU,col: 0,pos: 0,cm: fP};
        fT.measure = {};
        for (var fS = 0; fS <= (fT.rest ? fT.rest.length : 0); fS++) {
            var fQ = fS ? fT.rest[fS - 1] : fT.line, fO;
            fR.pos = 0;
            fR.addToken = u;
            if ((dn || cJ) && fP.getOption("lineWrapping")) {
                fR.addToken = fg(fR.addToken)
            }
            if (bD(fP.display.measure) && (fO = a(fQ))) {
                fR.addToken = U(fR.addToken, fO)
            }
            fR.map = [];
            bf(fQ, fR, cQ(fP, fQ));
            if (fQ.styleClasses) {
                if (fQ.styleClasses.bgClass) {
                    fR.bgClass = fs(fQ.styleClasses.bgClass, fR.bgClass || "")
                }
                if (fQ.styleClasses.textClass) {
                    fR.textClass = fs(fQ.styleClasses.textClass, fR.textClass || "")
                }
            }
            if (fR.map.length == 0) {
                fR.map.push(0, 0, fR.content.appendChild(bd(fP.display.measure)))
            }
            if (fS == 0) {
                fT.measure.map = fR.map;
                fT.measure.cache = {}
            } else {
                (fT.measure.maps || (fT.measure.maps = [])).push(fR.map);
                (fT.measure.caches || (fT.measure.caches = [])).push({})
            }
        }
        az(fP, "renderLine", fP, fT.line, fR.pre);
        if (fR.pre.className) {
            fR.textClass = fs(fR.pre.className, fR.textClass || "")
        }
        return fR
    }
    function eN(fP) {
        var fO = fx("span", "\u2022", "cm-invalidchar");
        fO.title = "\\u" + fP.charCodeAt(0).toString(16);
        return fO
    }
    function u(fT, f3, fO, fR, f4, f2) {
        if (!f3) {
            return
        }
        var fY = fT.cm.options.specialChars, fX = false;
        if (!fY.test(f3)) {
            fT.col += f3.length;
            var fW = document.createTextNode(f3);
            fT.map.push(fT.pos, fT.pos + f3.length, fW);
            if (bY) {
                fX = true
            }
            fT.pos += f3.length
        } else {
            var fW = document.createDocumentFragment(), f0 = 0;
            while (true) {
                fY.lastIndex = f0;
                var fP = fY.exec(f3);
                var fV = fP ? fP.index - f0 : f3.length - f0;
                if (fV) {
                    var fS = document.createTextNode(f3.slice(f0, f0 + fV));
                    if (bY) {
                        fW.appendChild(fx("span", [fS]))
                    } else {
                        fW.appendChild(fS)
                    }
                    fT.map.push(fT.pos, fT.pos + fV, fS);
                    fT.col += fV;
                    fT.pos += fV
                }
                if (!fP) {
                    break
                }
                f0 += fV + 1;
                if (fP[0] == "\t") {
                    var fU = fT.cm.options.tabSize, fZ = fU - fT.col % fU;
                    var fS = fW.appendChild(fx("span", cf(fZ), "cm-tab"));
                    fT.col += fZ
                } else {
                    var fS = fT.cm.options.specialCharPlaceholder(fP[0]);
                    if (bY) {
                        fW.appendChild(fx("span", [fS]))
                    } else {
                        fW.appendChild(fS)
                    }
                    fT.col += 1
                }
                fT.map.push(fT.pos, fT.pos + 1, fS);
                fT.pos++
            }
        }
        if (fO || fR || f4 || fX) {
            var f1 = fO || "";
            if (fR) {
                f1 += fR
            }
            if (f4) {
                f1 += f4
            }
            var fQ = fx("span", [fW], f1);
            if (f2) {
                fQ.title = f2
            }
            return fT.content.appendChild(fQ)
        }
        fT.content.appendChild(fW)
    }
    function fg(fO) {
        function fP(fQ) {
            var fR = " ";
            for (var fS = 0; fS < fQ.length - 2; ++fS) {
                fR += fS % 2 ? " " : "\u00a0"
            }
            fR += " ";
            return fR
        }
        return function(fR, fV, fS, fQ, fU, fT) {
            fO(fR, fV.replace(/ {3,}/g, fP), fS, fQ, fU, fT)
        }
    }
    function U(fP, fO) {
        return function(fW, fY, fQ, fU, fZ, fX) {
            fQ = fQ ? fQ + " cm-force-border" : "cm-force-border";
            var fR = fW.pos, fT = fR + fY.length;
            for (; ; ) {
                for (var fV = 0; fV < fO.length; fV++) {
                    var fS = fO[fV];
                    if (fS.to > fR && fS.from <= fR) {
                        break
                    }
                }
                if (fS.to >= fT) {
                    return fP(fW, fY, fQ, fU, fZ, fX)
                }
                fP(fW, fY.slice(0, fS.to - fR), fQ, fU, null, fX);
                fU = null;
                fY = fY.slice(fS.to - fR);
                fR = fS.to
            }
        }
    }
    function aa(fP, fR, fO, fQ) {
        var fS = !fQ && fO.widgetNode;
        if (fS) {
            fP.map.push(fP.pos, fP.pos + fR, fS);
            fP.content.appendChild(fS)
        }
        fP.pos += fR
    }
    function bf(fX, f3, fW) {
        var fT = fX.markedSpans, fV = fX.text, f1 = 0;
        if (!fT) {
            for (var f6 = 1; f6 < fW.length; f6 += 2) {
                f3.addToken(f3, fV.slice(f1, f1 = fW[f6]), ez(fW[f6 + 1], f3.cm.options))
            }
            return
        }
        var f7 = fV.length, fS = 0, f6 = 1, fZ = "", f8;
        var ga = 0, fO, f9, f0, gb, fQ;
        for (; ; ) {
            if (ga == fS) {
                fO = f9 = f0 = gb = "";
                fQ = null;
                ga = Infinity;
                var fU = [];
                for (var f4 = 0; f4 < fT.length; ++f4) {
                    var f5 = fT[f4], f2 = f5.marker;
                    if (f5.from <= fS && (f5.to == null || f5.to > fS)) {
                        if (f5.to != null && ga > f5.to) {
                            ga = f5.to;
                            f9 = ""
                        }
                        if (f2.className) {
                            fO += " " + f2.className
                        }
                        if (f2.startStyle && f5.from == fS) {
                            f0 += " " + f2.startStyle
                        }
                        if (f2.endStyle && f5.to == ga) {
                            f9 += " " + f2.endStyle
                        }
                        if (f2.title && !gb) {
                            gb = f2.title
                        }
                        if (f2.collapsed && (!fQ || du(fQ.marker, f2) < 0)) {
                            fQ = f5
                        }
                    } else {
                        if (f5.from > fS && ga > f5.from) {
                            ga = f5.from
                        }
                    }
                    if (f2.type == "bookmark" && f5.from == fS && f2.widgetNode) {
                        fU.push(f2)
                    }
                }
                if (fQ && (fQ.from || 0) == fS) {
                    aa(f3, (fQ.to == null ? f7 + 1 : fQ.to) - fS, fQ.marker, fQ.from == null);
                    if (fQ.to == null) {
                        return
                    }
                }
                if (!fQ && fU.length) {
                    for (var f4 = 0; f4 < fU.length; ++f4) {
                        aa(f3, 0, fU[f4])
                    }
                }
            }
            if (fS >= f7) {
                break
            }
            var fY = Math.min(f7, ga);
            while (true) {
                if (fZ) {
                    var fP = fS + fZ.length;
                    if (!fQ) {
                        var fR = fP > fY ? fZ.slice(0, fY - fS) : fZ;
                        f3.addToken(f3, fR, f8 ? f8 + fO : fO, f0, fS + fR.length == ga ? f9 : "", gb)
                    }
                    if (fP >= fY) {
                        fZ = fZ.slice(fY - fS);
                        fS = fY;
                        break
                    }
                    fS = fP;
                    f0 = ""
                }
                fZ = fV.slice(f1, f1 = fW[f6++]);
                f8 = ez(fW[f6++], f3.cm.options)
            }
        }
    }
    function dw(fO, fP) {
        return fP.from.ch == 0 && fP.to.ch == 0 && fi(fP.text) == "" && (!fO.cm || fO.cm.options.wholeLineUpdateBefore)
    }
    function e9(f1, fW, fO, fS) {
        function f2(f4) {
            return fO ? fO[f4] : null
        }
        function fP(f4, f6, f5) {
            dZ(f4, f6, f5, fS);
            ac(f4, "change", f4, fW)
        }
        var fZ = fW.from, f0 = fW.to, f3 = fW.text;
        var fX = eP(f1, fZ.line), fY = eP(f1, f0.line);
        var fV = fi(f3), fR = f2(f3.length - 1), fU = f0.line - fZ.line;
        if (dw(f1, fW)) {
            for (var fQ = 0, fT = []; fQ < f3.length - 1; ++fQ) {
                fT.push(new fD(f3[fQ], f2(fQ), fS))
            }
            fP(fY, fY.text, fR);
            if (fU) {
                f1.remove(fZ.line, fU)
            }
            if (fT.length) {
                f1.insert(fZ.line, fT)
            }
        } else {
            if (fX == fY) {
                if (f3.length == 1) {
                    fP(fX, fX.text.slice(0, fZ.ch) + fV + fX.text.slice(f0.ch), fR)
                } else {
                    for (var fT = [], fQ = 1; fQ < f3.length - 1; ++fQ) {
                        fT.push(new fD(f3[fQ], f2(fQ), fS))
                    }
                    fT.push(new fD(fV + fX.text.slice(f0.ch), fR, fS));
                    fP(fX, fX.text.slice(0, fZ.ch) + f3[0], f2(0));
                    f1.insert(fZ.line + 1, fT)
                }
            } else {
                if (f3.length == 1) {
                    fP(fX, fX.text.slice(0, fZ.ch) + f3[0] + fY.text.slice(f0.ch), f2(0));
                    f1.remove(fZ.line + 1, fU)
                } else {
                    fP(fX, fX.text.slice(0, fZ.ch) + f3[0], f2(0));
                    fP(fY, fV + fY.text.slice(f0.ch), fR);
                    for (var fQ = 1, fT = []; fQ < f3.length - 1; ++fQ) {
                        fT.push(new fD(f3[fQ], f2(fQ), fS))
                    }
                    if (fU > 1) {
                        f1.remove(fZ.line + 1, fU - 1)
                    }
                    f1.insert(fZ.line + 1, fT)
                }
            }
        }
        ac(f1, "change", f1, fW)
    }
    function eC(fP) {
        this.lines = fP;
        this.parent = null;
        for (var fQ = 0, fO = 0; fQ < fP.length; ++fQ) {
            fP[fQ].parent = this;
            fO += fP[fQ].height
        }
        this.height = fO
    }
    eC.prototype = {chunkSize: function() {
            return this.lines.length
        },removeInner: function(fO, fS) {
            for (var fQ = fO, fR = fO + fS; fQ < fR; ++fQ) {
                var fP = this.lines[fQ];
                this.height -= fP.height;
                bq(fP);
                ac(fP, "delete")
            }
            this.lines.splice(fO, fS)
        },collapse: function(fO) {
            fO.push.apply(fO, this.lines)
        },insertInner: function(fP, fQ, fO) {
            this.height += fO;
            this.lines = this.lines.slice(0, fP).concat(fQ).concat(this.lines.slice(fP));
            for (var fR = 0; fR < fQ.length; ++fR) {
                fQ[fR].parent = this
            }
        },iterN: function(fO, fR, fQ) {
            for (var fP = fO + fR; fO < fP; ++fO) {
                if (fQ(this.lines[fO])) {
                    return true
                }
            }
        }};
    function e8(fR) {
        this.children = fR;
        var fQ = 0, fO = 0;
        for (var fP = 0; fP < fR.length; ++fP) {
            var fS = fR[fP];
            fQ += fS.chunkSize();
            fO += fS.height;
            fS.parent = this
        }
        this.size = fQ;
        this.height = fO;
        this.parent = null
    }
    e8.prototype = {chunkSize: function() {
            return this.size
        },removeInner: function(fO, fV) {
            this.size -= fV;
            for (var fQ = 0; fQ < this.children.length; ++fQ) {
                var fU = this.children[fQ], fS = fU.chunkSize();
                if (fO < fS) {
                    var fR = Math.min(fV, fS - fO), fT = fU.height;
                    fU.removeInner(fO, fR);
                    this.height -= fT - fU.height;
                    if (fS == fR) {
                        this.children.splice(fQ--, 1);
                        fU.parent = null
                    }
                    if ((fV -= fR) == 0) {
                        break
                    }
                    fO = 0
                } else {
                    fO -= fS
                }
            }
            if (this.size - fV < 25 && (this.children.length > 1 || !(this.children[0] instanceof eC))) {
                var fP = [];
                this.collapse(fP);
                this.children = [new eC(fP)];
                this.children[0].parent = this
            }
        },collapse: function(fO) {
            for (var fP = 0; fP < this.children.length; ++fP) {
                this.children[fP].collapse(fO)
            }
        },insertInner: function(fP, fQ, fO) {
            this.size += fQ.length;
            this.height += fO;
            for (var fT = 0; fT < this.children.length; ++fT) {
                var fV = this.children[fT], fU = fV.chunkSize();
                if (fP <= fU) {
                    fV.insertInner(fP, fQ, fO);
                    if (fV.lines && fV.lines.length > 50) {
                        while (fV.lines.length > 50) {
                            var fS = fV.lines.splice(fV.lines.length - 25, 25);
                            var fR = new eC(fS);
                            fV.height -= fR.height;
                            this.children.splice(fT + 1, 0, fR);
                            fR.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                fP -= fU
            }
        },maybeSpill: function() {
            if (this.children.length <= 10) {
                return
            }
            var fR = this;
            do {
                var fP = fR.children.splice(fR.children.length - 5, 5);
                var fQ = new e8(fP);
                if (!fR.parent) {
                    var fS = new e8(fR.children);
                    fS.parent = fR;
                    fR.children = [fS, fQ];
                    fR = fS
                } else {
                    fR.size -= fQ.size;
                    fR.height -= fQ.height;
                    var fO = c1(fR.parent.children, fR);
                    fR.parent.children.splice(fO + 1, 0, fQ)
                }
                fQ.parent = fR.parent
            } while (fR.children.length > 10);
            fR.parent.maybeSpill()
        },iterN: function(fO, fU, fT) {
            for (var fP = 0; fP < this.children.length; ++fP) {
                var fS = this.children[fP], fR = fS.chunkSize();
                if (fO < fR) {
                    var fQ = Math.min(fU, fR - fO);
                    if (fS.iterN(fO, fQ, fT)) {
                        return true
                    }
                    if ((fU -= fQ) == 0) {
                        break
                    }
                    fO = 0
                } else {
                    fO -= fR
                }
            }
        }};
    var cg = 0;
    var ao = I.Doc = function(fQ, fP, fO) {
        if (!(this instanceof ao)) {
            return new ao(fQ, fP, fO)
        }
        if (fO == null) {
            fO = 0
        }
        e8.call(this, [new eC([new fD("", null)])]);
        this.first = fO;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.frontier = fO;
        var fR = W(fO, 0);
        this.sel = eu(fR);
        this.history = new ft(null);
        this.id = ++cg;
        this.modeOption = fP;
        if (typeof fQ == "string") {
            fQ = aQ(fQ)
        }
        e9(this, {from: fR,to: fR,text: fQ});
        bJ(this, eu(fR), Y)
    };
    ao.prototype = ca(e8.prototype, {constructor: ao,iter: function(fQ, fP, fO) {
            if (fO) {
                this.iterN(fQ - this.first, fP - fQ, fO)
            } else {
                this.iterN(this.first, this.first + this.size, fQ)
            }
        },insert: function(fP, fQ) {
            var fO = 0;
            for (var fR = 0; fR < fQ.length; ++fR) {
                fO += fQ[fR].height
            }
            this.insertInner(fP - this.first, fQ, fO)
        },remove: function(fO, fP) {
            this.removeInner(fO - this.first, fP)
        },getValue: function(fP) {
            var fO = aS(this, this.first, this.first + this.size);
            if (fP === false) {
                return fO
            }
            return fO.join(fP || "\n")
        },setValue: cs(function(fP) {
            var fQ = W(this.first, 0), fO = this.first + this.size - 1;
            a5(this, {from: fQ,to: W(fO, eP(this, fO).text.length),text: aQ(fP),origin: "setValue"}, true);
            bJ(this, eu(fQ))
        }),replaceRange: function(fP, fR, fQ, fO) {
            fR = fk(this, fR);
            fQ = fQ ? fk(this, fQ) : fR;
            aR(this, fP, fR, fQ, fO)
        },getRange: function(fR, fQ, fP) {
            var fO = fz(this, fk(this, fR), fk(this, fQ));
            if (fP === false) {
                return fO
            }
            return fO.join(fP || "\n")
        },getLine: function(fP) {
            var fO = this.getLineHandle(fP);
            return fO && fO.text
        },getLineHandle: function(fO) {
            if (bW(this, fO)) {
                return eP(this, fO)
            }
        },getLineNumber: function(fO) {
            return bC(fO)
        },getLineHandleVisualStart: function(fO) {
            if (typeof fO == "number") {
                fO = eP(this, fO)
            }
            return z(fO)
        },lineCount: function() {
            return this.size
        },firstLine: function() {
            return this.first
        },lastLine: function() {
            return this.first + this.size - 1
        },clipPos: function(fO) {
            return fk(this, fO)
        },getCursor: function(fQ) {
            var fO = this.sel.primary(), fP;
            if (fQ == null || fQ == "head") {
                fP = fO.head
            } else {
                if (fQ == "anchor") {
                    fP = fO.anchor
                } else {
                    if (fQ == "end" || fQ == "to" || fQ === false) {
                        fP = fO.to()
                    } else {
                        fP = fO.from()
                    }
                }
            }
            return fP
        },listSelections: function() {
            return this.sel.ranges
        },somethingSelected: function() {
            return this.sel.somethingSelected()
        },setCursor: cs(function(fO, fQ, fP) {
            G(this, fk(this, typeof fO == "number" ? W(fO, fQ || 0) : fO), null, fP)
        }),setSelection: cs(function(fP, fQ, fO) {
            G(this, fk(this, fP), fk(this, fQ || fP), fO)
        }),extendSelection: cs(function(fQ, fO, fP) {
            fu(this, fk(this, fQ), fO && fk(this, fO), fP)
        }),extendSelections: cs(function(fP, fO) {
            at(this, dC(this, fP, fO))
        }),extendSelectionsBy: cs(function(fP, fO) {
            at(this, bH(this.sel.ranges, fP), fO)
        }),setSelections: cs(function(fO, fS, fQ) {
            if (!fO.length) {
                return
            }
            for (var fR = 0, fP = []; fR < fO.length; fR++) {
                fP[fR] = new dB(fk(this, fO[fR].anchor), fk(this, fO[fR].head))
            }
            if (fS == null) {
                fS = Math.min(fO.length - 1, this.sel.primIndex)
            }
            bJ(this, cm(fP, fS), fQ)
        }),addSelection: cs(function(fQ, fR, fP) {
            var fO = this.sel.ranges.slice(0);
            fO.push(new dB(fk(this, fQ), fk(this, fR || fQ)));
            bJ(this, cm(fO, fO.length - 1), fP)
        }),getSelection: function(fS) {
            var fP = this.sel.ranges, fO;
            for (var fQ = 0; fQ < fP.length; fQ++) {
                var fR = fz(this, fP[fQ].from(), fP[fQ].to());
                fO = fO ? fO.concat(fR) : fR
            }
            if (fS === false) {
                return fO
            } else {
                return fO.join(fS || "\n")
            }
        },getSelections: function(fS) {
            var fR = [], fO = this.sel.ranges;
            for (var fP = 0; fP < fO.length; fP++) {
                var fQ = fz(this, fO[fP].from(), fO[fP].to());
                if (fS !== false) {
                    fQ = fQ.join(fS || "\n")
                }
                fR[fP] = fQ
            }
            return fR
        },replaceSelection: function(fQ, fS, fO) {
            var fR = [];
            for (var fP = 0; fP < this.sel.ranges.length; fP++) {
                fR[fP] = fQ
            }
            this.replaceSelections(fR, fS, fO || "+input")
        },replaceSelections: cs(function(fT, fV, fQ) {
            var fS = [], fU = this.sel;
            for (var fR = 0; fR < fU.ranges.length; fR++) {
                var fP = fU.ranges[fR];
                fS[fR] = {from: fP.from(),to: fP.to(),text: aQ(fT[fR]),origin: fQ}
            }
            var fO = fV && fV != "end" && ad(this, fS, fV);
            for (var fR = fS.length - 1; fR >= 0; fR--) {
                a5(this, fS[fR])
            }
            if (fO) {
                eH(this, fO)
            } else {
                if (this.cm) {
                    fh(this.cm)
                }
            }
        }),undo: cs(function() {
            bV(this, "undo")
        }),redo: cs(function() {
            bV(this, "redo")
        }),undoSelection: cs(function() {
            bV(this, "undo", true)
        }),redoSelection: cs(function() {
            bV(this, "redo", true)
        }),setExtending: function(fO) {
            this.extend = fO
        },getExtending: function() {
            return this.extend
        },historySize: function() {
            var fR = this.history, fO = 0, fQ = 0;
            for (var fP = 0; fP < fR.done.length; fP++) {
                if (!fR.done[fP].ranges) {
                    ++fO
                }
            }
            for (var fP = 0; fP < fR.undone.length; fP++) {
                if (!fR.undone[fP].ranges) {
                    ++fQ
                }
            }
            return {undo: fO,redo: fQ}
        },clearHistory: function() {
            this.history = new ft(this.history.maxGeneration)
        },markClean: function() {
            this.cleanGeneration = this.changeGeneration(true)
        },changeGeneration: function(fO) {
            if (fO) {
                this.history.lastOp = this.history.lastOrigin = null
            }
            return this.history.generation
        },isClean: function(fO) {
            return this.history.generation == (fO || this.cleanGeneration)
        },getHistory: function() {
            return {done: bE(this.history.done),undone: bE(this.history.undone)}
        },setHistory: function(fP) {
            var fO = this.history = new ft(this.history.maxGeneration);
            fO.done = bE(fP.done.slice(0), null, true);
            fO.undone = bE(fP.undone.slice(0), null, true)
        },markText: function(fQ, fP, fO) {
            return ej(this, fk(this, fQ), fk(this, fP), fO, "range")
        },setBookmark: function(fQ, fO) {
            var fP = {replacedWith: fO && (fO.nodeType == null ? fO.widget : fO),insertLeft: fO && fO.insertLeft,clearWhenEmpty: false,shared: fO && fO.shared};
            fQ = fk(this, fQ);
            return ej(this, fQ, fQ, fP, "bookmark")
        },findMarksAt: function(fS) {
            fS = fk(this, fS);
            var fR = [], fP = eP(this, fS.line).markedSpans;
            if (fP) {
                for (var fO = 0; fO < fP.length; ++fO) {
                    var fQ = fP[fO];
                    if ((fQ.from == null || fQ.from <= fS.ch) && (fQ.to == null || fQ.to >= fS.ch)) {
                        fR.push(fQ.marker.parent || fQ.marker)
                    }
                }
            }
            return fR
        },findMarks: function(fS, fR, fO) {
            fS = fk(this, fS);
            fR = fk(this, fR);
            var fP = [], fQ = fS.line;
            this.iter(fS.line, fR.line + 1, function(fT) {
                var fV = fT.markedSpans;
                if (fV) {
                    for (var fU = 0; fU < fV.length; fU++) {
                        var fW = fV[fU];
                        if (!(fQ == fS.line && fS.ch > fW.to || fW.from == null && fQ != fS.line || fQ == fR.line && fW.from > fR.ch) && (!fO || fO(fW.marker))) {
                            fP.push(fW.marker.parent || fW.marker)
                        }
                    }
                }
                ++fQ
            });
            return fP
        },getAllMarks: function() {
            var fO = [];
            this.iter(function(fQ) {
                var fP = fQ.markedSpans;
                if (fP) {
                    for (var fR = 0; fR < fP.length; ++fR) {
                        if (fP[fR].from != null) {
                            fO.push(fP[fR].marker)
                        }
                    }
                }
            });
            return fO
        },posFromIndex: function(fP) {
            var fO, fQ = this.first;
            this.iter(function(fR) {
                var fS = fR.text.length + 1;
                if (fS > fP) {
                    fO = fP;
                    return true
                }
                fP -= fS;
                ++fQ
            });
            return fk(this, W(fQ, fO))
        },indexFromPos: function(fP) {
            fP = fk(this, fP);
            var fO = fP.ch;
            if (fP.line < this.first || fP.ch < 0) {
                return 0
            }
            this.iter(this.first, fP.line, function(fQ) {
                fO += fQ.text.length + 1
            });
            return fO
        },copy: function(fO) {
            var fP = new ao(aS(this, this.first, this.first + this.size), this.modeOption, this.first);
            fP.scrollTop = this.scrollTop;
            fP.scrollLeft = this.scrollLeft;
            fP.sel = this.sel;
            fP.extend = false;
            if (fO) {
                fP.history.undoDepth = this.history.undoDepth;
                fP.setHistory(this.getHistory())
            }
            return fP
        },linkedDoc: function(fO) {
            if (!fO) {
                fO = {}
            }
            var fR = this.first, fQ = this.first + this.size;
            if (fO.from != null && fO.from > fR) {
                fR = fO.from
            }
            if (fO.to != null && fO.to < fQ) {
                fQ = fO.to
            }
            var fP = new ao(aS(this, fR, fQ), fO.mode || this.modeOption, fR);
            if (fO.sharedHist) {
                fP.history = this.history
            }
            (this.linked || (this.linked = [])).push({doc: fP,sharedHist: fO.sharedHist});
            fP.linked = [{doc: this,isParent: true,sharedHist: fO.sharedHist}];
            dk(fP, es(this));
            return fP
        },unlinkDoc: function(fP) {
            if (fP instanceof I) {
                fP = fP.doc
            }
            if (this.linked) {
                for (var fQ = 0; fQ < this.linked.length; ++fQ) {
                    var fR = this.linked[fQ];
                    if (fR.doc != fP) {
                        continue
                    }
                    this.linked.splice(fQ, 1);
                    fP.unlinkDoc(this);
                    d0(es(this));
                    break
                }
            }
            if (fP.history == this.history) {
                var fO = [fP.id];
                dK(fP, function(fS) {
                    fO.push(fS.id)
                }, true);
                fP.history = new ft(null);
                fP.history.done = bE(this.history.done, fO);
                fP.history.undone = bE(this.history.undone, fO)
            }
        },iterLinkedDocs: function(fO) {
            dK(this, fO)
        },getMode: function() {
            return this.mode
        },getEditor: function() {
            return this.cm
        }});
    ao.prototype.eachLine = ao.prototype.iter;
    var e = "iter insert remove copy getEditor".split(" ");
    for (var bz in ao.prototype) {
        if (ao.prototype.hasOwnProperty(bz) && c1(e, bz) < 0) {
            I.prototype[bz] = (function(fO) {
                return function() {
                    return fO.apply(this.doc, arguments)
                }
            })(ao.prototype[bz])
        }
    }
    bo(ao);
    function dK(fR, fQ, fP) {
        function fO(fX, fV, fT) {
            if (fX.linked) {
                for (var fU = 0; fU < fX.linked.length; ++fU) {
                    var fS = fX.linked[fU];
                    if (fS.doc == fV) {
                        continue
                    }
                    var fW = fT && fS.sharedHist;
                    if (fP && !fW) {
                        continue
                    }
                    fQ(fS.doc, fW);
                    fO(fS.doc, fX, fW)
                }
            }
        }
        fO(fR, null, true)
    }
    function dN(fO, fP) {
        if (fP.cm) {
            throw new Error("This document is already in use.")
        }
        fO.doc = fP;
        fP.cm = fO;
        X(fO);
        bh(fO);
        if (!fO.options.lineWrapping) {
            h(fO)
        }
        fO.options.mode = fP.modeOption;
        af(fO)
    }
    function eP(fR, fT) {
        fT -= fR.first;
        if (fT < 0 || fT >= fR.size) {
            throw new Error("There is no line " + (fT + fR.first) + " in the document.")
        }
        for (var fO = fR; !fO.lines; ) {
            for (var fP = 0; ; ++fP) {
                var fS = fO.children[fP], fQ = fS.chunkSize();
                if (fT < fQ) {
                    fO = fS;
                    break
                }
                fT -= fQ
            }
        }
        return fO.lines[fT]
    }
    function fz(fQ, fS, fO) {
        var fP = [], fR = fS.line;
        fQ.iter(fS.line, fO.line + 1, function(fT) {
            var fU = fT.text;
            if (fR == fO.line) {
                fU = fU.slice(0, fO.ch)
            }
            if (fR == fS.line) {
                fU = fU.slice(fS.ch)
            }
            fP.push(fU);
            ++fR
        });
        return fP
    }
    function aS(fP, fR, fQ) {
        var fO = [];
        fP.iter(fR, fQ, function(fS) {
            fO.push(fS.text)
        });
        return fO
    }
    function fB(fP, fO) {
        var fQ = fO - fP.height;
        if (fQ) {
            for (var fR = fP; fR; fR = fR.parent) {
                fR.height += fQ
            }
        }
    }
    function bC(fO) {
        if (fO.parent == null) {
            return null
        }
        var fS = fO.parent, fR = c1(fS.lines, fO);
        for (var fP = fS.parent; fP; fS = fP, fP = fP.parent) {
            for (var fQ = 0; ; ++fQ) {
                if (fP.children[fQ] == fS) {
                    break
                }
                fR += fP.children[fQ].chunkSize()
            }
        }
        return fR + fS.first
    }
    function bv(fQ, fT) {
        var fV = fQ.first;
        outer: do {
            for (var fR = 0; fR < fQ.children.length; ++fR) {
                var fU = fQ.children[fR], fS = fU.height;
                if (fT < fS) {
                    fQ = fU;
                    continue outer
                }
                fT -= fS;
                fV += fU.chunkSize()
            }
            return fV
        } while (!fQ.lines);
        for (var fR = 0; fR < fQ.lines.length; ++fR) {
            var fP = fQ.lines[fR], fO = fP.height;
            if (fT < fO) {
                break
            }
            fT -= fO
        }
        return fV + fR
    }
    function bB(fQ) {
        fQ = z(fQ);
        var fS = 0, fP = fQ.parent;
        for (var fR = 0; fR < fP.lines.length; ++fR) {
            var fO = fP.lines[fR];
            if (fO == fQ) {
                break
            } else {
                fS += fO.height
            }
        }
        for (var fT = fP.parent; fT; fP = fT, fT = fP.parent) {
            for (var fR = 0; fR < fT.children.length; ++fR) {
                var fU = fT.children[fR];
                if (fU == fP) {
                    break
                } else {
                    fS += fU.height
                }
            }
        }
        return fS
    }
    function a(fP) {
        var fO = fP.order;
        if (fO == null) {
            fO = fP.order = a6(fP.text)
        }
        return fO
    }
    function ft(fO) {
        this.done = [];
        this.undone = [];
        this.undoDepth = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = fO || 1
    }
    function da(fO, fQ) {
        var fP = {from: b9(fQ.from),to: cG(fQ),text: fz(fO, fQ.from, fQ.to)};
        bN(fO, fP, fQ.from.line, fQ.to.line + 1);
        dK(fO, function(fR) {
            bN(fR, fP, fQ.from.line, fQ.to.line + 1)
        }, true);
        return fP
    }
    function fc(fP) {
        while (fP.length) {
            var fO = fi(fP);
            if (fO.ranges) {
                fP.pop()
            } else {
                break
            }
        }
    }
    function eq(fP, fO) {
        if (fO) {
            fc(fP.done);
            return fi(fP.done)
        } else {
            if (fP.done.length && !fi(fP.done).ranges) {
                return fi(fP.done)
            } else {
                if (fP.done.length > 1 && !fP.done[fP.done.length - 2].ranges) {
                    fP.done.pop();
                    return fi(fP.done)
                }
            }
        }
    }
    function fn(fU, fS, fO, fR) {
        var fQ = fU.history;
        fQ.undone.length = 0;
        var fP = +new Date, fV;
        if ((fQ.lastOp == fR || fQ.lastOrigin == fS.origin && fS.origin && ((fS.origin.charAt(0) == "+" && fU.cm && fQ.lastModTime > fP - fU.cm.options.historyEventDelay) || fS.origin.charAt(0) == "*")) && (fV = eq(fQ, fQ.lastOp == fR))) {
            var fW = fi(fV.changes);
            if (b5(fS.from, fS.to) == 0 && b5(fS.from, fW.to) == 0) {
                fW.to = cG(fS)
            } else {
                fV.changes.push(da(fU, fS))
            }
        } else {
            var fT = fi(fQ.done);
            if (!fT || !fT.ranges) {
                cA(fU.sel, fQ.done)
            }
            fV = {changes: [da(fU, fS)],generation: fQ.generation};
            fQ.done.push(fV);
            while (fQ.done.length > fQ.undoDepth) {
                fQ.done.shift();
                if (!fQ.done[0].ranges) {
                    fQ.done.shift()
                }
            }
        }
        fQ.done.push(fO);
        fQ.generation = ++fQ.maxGeneration;
        fQ.lastModTime = fQ.lastSelTime = fP;
        fQ.lastOp = fR;
        fQ.lastOrigin = fQ.lastSelOrigin = fS.origin;
        if (!fW) {
            az(fU, "historyAdded")
        }
    }
    function bp(fS, fO, fQ, fR) {
        var fP = fO.charAt(0);
        return fP == "*" || fP == "+" && fQ.ranges.length == fR.ranges.length && fQ.somethingSelected() == fR.somethingSelected() && new Date - fS.history.lastSelTime <= (fS.cm ? fS.cm.options.historyEventDelay : 500)
    }
    function fH(fT, fR, fO, fQ) {
        var fS = fT.history, fP = fQ && fQ.origin;
        if (fO == fS.lastOp || (fP && fS.lastSelOrigin == fP && (fS.lastModTime == fS.lastSelTime && fS.lastOrigin == fP || bp(fT, fP, fi(fS.done), fR)))) {
            fS.done[fS.done.length - 1] = fR
        } else {
            cA(fR, fS.done)
        }
        fS.lastSelTime = +new Date;
        fS.lastSelOrigin = fP;
        fS.lastOp = fO;
        if (fQ && fQ.clearRedo !== false) {
            fc(fS.undone)
        }
    }
    function cA(fP, fO) {
        var fQ = fi(fO);
        if (!(fQ && fQ.ranges && fQ.equals(fP))) {
            fO.push(fP)
        }
    }
    function bN(fP, fT, fS, fR) {
        var fO = fT["spans_" + fP.id], fQ = 0;
        fP.iter(Math.max(fP.first, fS), Math.min(fP.first + fP.size, fR), function(fU) {
            if (fU.markedSpans) {
                (fO || (fO = fT["spans_" + fP.id] = {}))[fQ] = fU.markedSpans
            }
            ++fQ
        })
    }
    function bb(fQ) {
        if (!fQ) {
            return null
        }
        for (var fP = 0, fO; fP < fQ.length; ++fP) {
            if (fQ[fP].marker.explicitlyCleared) {
                if (!fO) {
                    fO = fQ.slice(0, fP)
                }
            } else {
                if (fO) {
                    fO.push(fQ[fP])
                }
            }
        }
        return !fO ? fQ : fO.length ? fO : null
    }
    function bS(fR, fS) {
        var fQ = fS["spans_" + fR.id];
        if (!fQ) {
            return null
        }
        for (var fP = 0, fO = []; fP < fS.text.length; ++fP) {
            fO.push(bb(fQ[fP]))
        }
        return fO
    }
    function bE(fZ, fR, fY) {
        for (var fU = 0, fP = []; fU < fZ.length; ++fU) {
            var fQ = fZ[fU];
            if (fQ.ranges) {
                fP.push(fY ? fy.prototype.deepCopy.call(fQ) : fQ);
                continue
            }
            var fW = fQ.changes, fX = [];
            fP.push({changes: fX});
            for (var fT = 0; fT < fW.length; ++fT) {
                var fV = fW[fT], fS;
                fX.push({from: fV.from,to: fV.to,text: fV.text});
                if (fR) {
                    for (var fO in fV) {
                        if (fS = fO.match(/^spans_(\d+)$/)) {
                            if (c1(fR, Number(fS[1])) > -1) {
                                fi(fX)[fO] = fV[fO];
                                delete fV[fO]
                            }
                        }
                    }
                }
            }
        }
        return fP
    }
    function J(fR, fQ, fP, fO) {
        if (fP < fR.line) {
            fR.line += fO
        } else {
            if (fQ < fR.line) {
                fR.line = fQ;
                fR.ch = 0
            }
        }
    }
    function eR(fR, fT, fU, fV) {
        for (var fQ = 0; fQ < fR.length; ++fQ) {
            var fO = fR[fQ], fS = true;
            if (fO.ranges) {
                if (!fO.copied) {
                    fO = fR[fQ] = fO.deepCopy();
                    fO.copied = true
                }
                for (var fP = 0; fP < fO.ranges.length; fP++) {
                    J(fO.ranges[fP].anchor, fT, fU, fV);
                    J(fO.ranges[fP].head, fT, fU, fV)
                }
                continue
            }
            for (var fP = 0; fP < fO.changes.length; ++fP) {
                var fW = fO.changes[fP];
                if (fU < fW.from.line) {
                    fW.from = W(fW.from.line + fV, fW.from.ch);
                    fW.to = W(fW.to.line + fV, fW.to.ch)
                } else {
                    if (fT <= fW.to.line) {
                        fS = false;
                        break
                    }
                }
            }
            if (!fS) {
                fR.splice(0, fQ + 1);
                fQ = 0
            }
        }
    }
    function dj(fP, fS) {
        var fR = fS.from.line, fQ = fS.to.line, fO = fS.text.length - (fQ - fR) - 1;
        eR(fP.done, fR, fQ, fO);
        eR(fP.undone, fR, fQ, fO)
    }
    var cu = I.e_preventDefault = function(fO) {
        if (fO.preventDefault) {
            fO.preventDefault()
        } else {
            fO.returnValue = false
        }
    };
    var c6 = I.e_stopPropagation = function(fO) {
        if (fO.stopPropagation) {
            fO.stopPropagation()
        } else {
            fO.cancelBubble = true
        }
    };
    function bA(fO) {
        return fO.defaultPrevented != null ? fO.defaultPrevented : fO.returnValue == false
    }
    var d3 = I.e_stop = function(fO) {
        cu(fO);
        c6(fO)
    };
    function L(fO) {
        return fO.target || fO.srcElement
    }
    function fo(fP) {
        var fO = fP.which;
        if (fO == null) {
            if (fP.button & 1) {
                fO = 1
            } else {
                if (fP.button & 2) {
                    fO = 3
                } else {
                    if (fP.button & 4) {
                        fO = 2
                    }
                }
            }
        }
        if (bU && fP.ctrlKey && fO == 1) {
            fO = 3
        }
        return fO
    }
    var bM = I.on = function(fR, fP, fQ) {
        if (fR.addEventListener) {
            fR.addEventListener(fP, fQ, false)
        } else {
            if (fR.attachEvent) {
                fR.attachEvent("on" + fP, fQ)
            } else {
                var fS = fR._handlers || (fR._handlers = {});
                var fO = fS[fP] || (fS[fP] = []);
                fO.push(fQ)
            }
        }
    };
    var dP = I.off = function(fS, fQ, fR) {
        if (fS.removeEventListener) {
            fS.removeEventListener(fQ, fR, false)
        } else {
            if (fS.detachEvent) {
                fS.detachEvent("on" + fQ, fR)
            } else {
                var fO = fS._handlers && fS._handlers[fQ];
                if (!fO) {
                    return
                }
                for (var fP = 0; fP < fO.length; ++fP) {
                    if (fO[fP] == fR) {
                        fO.splice(fP, 1);
                        break
                    }
                }
            }
        }
    };
    var az = I.signal = function(fS, fR) {
        var fO = fS._handlers && fS._handlers[fR];
        if (!fO) {
            return
        }
        var fP = Array.prototype.slice.call(arguments, 2);
        for (var fQ = 0; fQ < fO.length; ++fQ) {
            fO[fQ].apply(null, fP)
        }
    };
    var be, ch = 0;
    function ac(fT, fS) {
        var fO = fT._handlers && fT._handlers[fS];
        if (!fO) {
            return
        }
        var fQ = Array.prototype.slice.call(arguments, 2);
        if (!be) {
            ++ch;
            be = [];
            setTimeout(ec, 0)
        }
        function fP(fU) {
            return function() {
                fU.apply(null, fQ)
            }
        }
        for (var fR = 0; fR < fO.length; ++fR) {
            be.push(fP(fO[fR]))
        }
    }
    function ec() {
        --ch;
        var fO = be;
        be = null;
        for (var fP = 0; fP < fO.length; ++fP) {
            fO[fP]()
        }
    }
    function aI(fO, fQ, fP) {
        az(fO, fP || fQ.type, fO, fQ);
        return bA(fQ) || fQ.codemirrorIgnore
    }
    function V(fP) {
        var fO = fP._handlers && fP._handlers.cursorActivity;
        if (!fO) {
            return
        }
        var fR = fP.curOp.cursorActivityHandlers || (fP.curOp.cursorActivityHandlers = []);
        for (var fQ = 0; fQ < fO.length; ++fQ) {
            if (c1(fR, fO[fQ]) == -1) {
                fR.push(fO[fQ])
            }
        }
    }
    function eS(fQ, fP) {
        var fO = fQ._handlers && fQ._handlers[fP];
        return fO && fO.length > 0
    }
    function bo(fO) {
        fO.prototype.on = function(fP, fQ) {
            bM(this, fP, fQ)
        };
        fO.prototype.off = function(fP, fQ) {
            dP(this, fP, fQ)
        }
    }
    var ba = 30;
    var bZ = I.Pass = {toString: function() {
            return "CodeMirror.Pass"
        }};
    var Y = {scroll: false}, M = {origin: "*mouse"}, cF = {origin: "+move"};
    function fN() {
        this.id = null
    }
    fN.prototype.set = function(fO, fP) {
        clearTimeout(this.id);
        this.id = setTimeout(fP, fO)
    };
    var bI = I.countColumn = function(fR, fP, fT, fU, fQ) {
        if (fP == null) {
            fP = fR.search(/[^\s\u00a0]/);
            if (fP == -1) {
                fP = fR.length
            }
        }
        for (var fS = fU || 0, fV = fQ || 0; ; ) {
            var fO = fR.indexOf("\t", fS);
            if (fO < 0 || fO >= fP) {
                return fV + (fP - fS)
            }
            fV += fO - fS;
            fV += fT - (fV % fT);
            fS = fO + 1
        }
    };
    function d2(fS, fR, fT) {
        for (var fU = 0, fQ = 0; ; ) {
            var fP = fS.indexOf("\t", fU);
            if (fP == -1) {
                fP = fS.length
            }
            var fO = fP - fU;
            if (fP == fS.length || fQ + fO >= fR) {
                return fU + Math.min(fO, fR - fQ)
            }
            fQ += fP - fU;
            fQ += fT - (fQ % fT);
            fU = fP + 1;
            if (fQ >= fR) {
                return fU
            }
        }
    }
    var aP = [""];
    function cf(fO) {
        while (aP.length <= fO) {
            aP.push(fi(aP) + " ")
        }
        return aP[fO]
    }
    function fi(fO) {
        return fO[fO.length - 1]
    }
    var dq = function(fO) {
        fO.select()
    };
    if (eD) {
        dq = function(fO) {
            fO.selectionStart = 0;
            fO.selectionEnd = fO.value.length
        }
    } else {
        if (dn) {
            dq = function(fP) {
                try {
                    fP.select()
                } catch (fO) {
                }
            }
        }
    }
    function c1(fQ, fO) {
        for (var fP = 0; fP < fQ.length; ++fP) {
            if (fQ[fP] == fO) {
                return fP
            }
        }
        return -1
    }
    if ([].indexOf) {
        c1 = function(fP, fO) {
            return fP.indexOf(fO)
        }
    }
    function bH(fR, fQ) {
        var fO = [];
        for (var fP = 0; fP < fR.length; fP++) {
            fO[fP] = fQ(fR[fP], fP)
        }
        return fO
    }
    if ([].map) {
        bH = function(fP, fO) {
            return fP.map(fO)
        }
    }
    function ca(fR, fO) {
        var fQ;
        if (Object.create) {
            fQ = Object.create(fR)
        } else {
            var fP = function() {
            };
            fP.prototype = fR;
            fQ = new fP()
        }
        if (fO) {
            aE(fO, fQ)
        }
        return fQ
    }
    function aE(fQ, fP, fO) {
        if (!fP) {
            fP = {}
        }
        for (var fR in fQ) {
            if (fQ.hasOwnProperty(fR) && (fO !== false || !fP.hasOwnProperty(fR))) {
                fP[fR] = fQ[fR]
            }
        }
        return fP
    }
    function cl(fP) {
        var fO = Array.prototype.slice.call(arguments, 1);
        return function() {
            return fP.apply(null, fO)
        }
    }
    var a2 = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    var fe = I.isWordChar = function(fO) {
        return /\w/.test(fO) || fO > "\x80" && (fO.toUpperCase() != fO.toLowerCase() || a2.test(fO))
    };
    function cp(fO, fP) {
        if (!fP) {
            return fe(fO)
        }
        if (fP.source.indexOf("\\w") > -1 && fe(fO)) {
            return true
        }
        return fP.test(fO)
    }
    function ex(fO) {
        for (var fP in fO) {
            if (fO.hasOwnProperty(fP) && fO[fP]) {
                return false
            }
        }
        return true
    }
    var en = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function e0(fO) {
        return fO.charCodeAt(0) >= 768 && en.test(fO)
    }
    function fx(fO, fS, fR, fQ) {
        var fT = document.createElement(fO);
        if (fR) {
            fT.className = fR
        }
        if (fQ) {
            fT.style.cssText = fQ
        }
        if (typeof fS == "string") {
            fT.appendChild(document.createTextNode(fS))
        } else {
            if (fS) {
                for (var fP = 0; fP < fS.length; ++fP) {
                    fT.appendChild(fS[fP])
                }
            }
        }
        return fT
    }
    var cb;
    if (document.createRange) {
        cb = function(fQ, fR, fO) {
            var fP = document.createRange();
            fP.setEnd(fQ, fO);
            fP.setStart(fQ, fR);
            return fP
        }
    } else {
        cb = function(fQ, fR, fO) {
            var fP = document.body.createTextRange();
            fP.moveToElementText(fQ.parentNode);
            fP.collapse(true);
            fP.moveEnd("character", fO);
            fP.moveStart("character", fR);
            return fP
        }
    }
    function dE(fP) {
        for (var fO = fP.childNodes.length; fO > 0; --fO) {
            fP.removeChild(fP.firstChild)
        }
        return fP
    }
    function bG(fO, fP) {
        return dE(fO).appendChild(fP)
    }
    function fG(fO, fP) {
        if (fO.contains) {
            return fO.contains(fP)
        }
        while (fP = fP.parentNode) {
            if (fP == fO) {
                return true
            }
        }
    }
    function ds() {
        return document.activeElement
    }
    if (eo) {
        ds = function() {
            try {
                return document.activeElement
            } catch (fO) {
                return document.body
            }
        }
    }
    function S(fO) {
        return new RegExp("\\b" + fO + "\\b\\s*")
    }
    function g(fP, fO) {
        var fQ = S(fO);
        if (fQ.test(fP.className)) {
            fP.className = fP.className.replace(fQ, "")
        }
    }
    function fb(fP, fO) {
        if (!S(fO).test(fP.className)) {
            fP.className += " " + fO
        }
    }
    function fs(fQ, fO) {
        var fP = fQ.split(" ");
        for (var fR = 0; fR < fP.length; fR++) {
            if (fP[fR] && !S(fP[fR]).test(fO)) {
                fO += " " + fP[fR]
            }
        }
        return fO
    }
    function aw(fR) {
        if (!document.body.getElementsByClassName) {
            return
        }
        var fQ = document.body.getElementsByClassName("CodeMirror");
        for (var fP = 0; fP < fQ.length; fP++) {
            var fO = fQ[fP].CodeMirror;
            if (fO) {
                fR(fO)
            }
        }
    }
    var cr = false;
    function a8() {
        if (cr) {
            return
        }
        ff();
        cr = true
    }
    function ff() {
        var fO;
        bM(window, "resize", function() {
            if (fO == null) {
                fO = setTimeout(function() {
                    fO = null;
                    d8 = null;
                    aw(aK)
                }, 100)
            }
        });
        bM(window, "blur", function() {
            aw(aL)
        })
    }
    var ep = function() {
        if (bY) {
            return false
        }
        var fO = fx("div");
        return "draggable" in fO || "dragDrop" in fO
    }();
    var d8;
    function l(fO) {
        if (d8 != null) {
            return d8
        }
        var fP = fx("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        bG(fO, fP);
        if (fP.offsetWidth) {
            d8 = fP.offsetHeight - fP.clientHeight
        }
        return d8 || 0
    }
    var fm;
    function bd(fO) {
        if (fm == null) {
            var fP = fx("span", "\u200b");
            bG(fO, fx("span", [fP, document.createTextNode("x")]));
            if (fO.firstChild.offsetHeight != 0) {
                fm = fP.offsetWidth <= 1 && fP.offsetHeight > 2 && !b1
            }
        }
        if (fm) {
            return fx("span", "\u200b")
        } else {
            return fx("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px")
        }
    }
    var fl;
    function bD(fR) {
        if (fl != null) {
            return fl
        }
        var fO = bG(fR, document.createTextNode("A\u062eA"));
        var fQ = cb(fO, 0, 1).getBoundingClientRect();
        if (fQ.left == fQ.right) {
            return false
        }
        var fP = cb(fO, 1, 2).getBoundingClientRect();
        return fl = (fP.right - fQ.right < 3)
    }
    var aQ = I.splitLines = "\n\nb".split(/\n/).length != 3 ? function(fT) {
        var fU = 0, fO = [], fS = fT.length;
        while (fU <= fS) {
            var fR = fT.indexOf("\n", fU);
            if (fR == -1) {
                fR = fT.length
            }
            var fQ = fT.slice(fU, fT.charAt(fR - 1) == "\r" ? fR - 1 : fR);
            var fP = fQ.indexOf("\r");
            if (fP != -1) {
                fO.push(fQ.slice(0, fP));
                fU += fP + 1
            } else {
                fO.push(fQ);
                fU = fR + 1
            }
        }
        return fO
    } : function(fO) {
        return fO.split(/\r\n?|\n/)
    };
    var bi = window.getSelection ? function(fP) {
        try {
            return fP.selectionStart != fP.selectionEnd
        } catch (fO) {
            return false
        }
    } : function(fQ) {
        try {
            var fO = fQ.ownerDocument.selection.createRange()
        } catch (fP) {
        }
        if (!fO || fO.parentElement() != fQ) {
            return false
        }
        return fO.compareEndPoints("StartToEnd", fO) != 0
    };
    var cT = (function() {
        var fO = fx("div");
        if ("oncopy" in fO) {
            return true
        }
        fO.setAttribute("oncopy", "return;");
        return typeof fO.oncopy == "function"
    })();
    var eQ = {3: "Enter",8: "Backspace",9: "Tab",13: "Enter",16: "Shift",17: "Ctrl",18: "Alt",19: "Pause",20: "CapsLock",27: "Esc",32: "Space",33: "PageUp",34: "PageDown",35: "End",36: "Home",37: "Left",38: "Up",39: "Right",40: "Down",44: "PrintScrn",45: "Insert",46: "Delete",59: ";",61: "=",91: "Mod",92: "Mod",93: "Mod",107: "=",109: "-",127: "Delete",173: "-",186: ";",187: "=",188: ",",189: "-",190: ".",191: "/",192: "`",219: "[",220: "\\",221: "]",222: "'",63232: "Up",63233: "Down",63234: "Left",63235: "Right",63272: "Delete",63273: "Home",63275: "End",63276: "PageUp",63277: "PageDown",63302: "Insert"};
    I.keyNames = eQ;
    (function() {
        for (var fO = 0; fO < 10; fO++) {
            eQ[fO + 48] = eQ[fO + 96] = String(fO)
        }
        for (var fO = 65; fO <= 90; fO++) {
            eQ[fO] = String.fromCharCode(fO)
        }
        for (var fO = 1; fO <= 12; fO++) {
            eQ[fO + 111] = eQ[fO + 63235] = "F" + fO
        }
    })();
    function dH(fO, fU, fT, fS) {
        if (!fO) {
            return fS(fU, fT, "ltr")
        }
        var fR = false;
        for (var fQ = 0; fQ < fO.length; ++fQ) {
            var fP = fO[fQ];
            if (fP.from < fT && fP.to > fU || fU == fT && fP.to == fU) {
                fS(Math.max(fP.from, fU), Math.min(fP.to, fT), fP.level == 1 ? "rtl" : "ltr");
                fR = true
            }
        }
        if (!fR) {
            fS(fU, fT, "ltr")
        }
    }
    function dd(fO) {
        return fO.level % 2 ? fO.to : fO.from
    }
    function fJ(fO) {
        return fO.level % 2 ? fO.from : fO.to
    }
    function ct(fP) {
        var fO = a(fP);
        return fO ? dd(fO[0]) : 0
    }
    function cE(fP) {
        var fO = a(fP);
        if (!fO) {
            return fP.text.length
        }
        return fJ(fi(fO))
    }
    function bj(fP, fS) {
        var fQ = eP(fP.doc, fS);
        var fT = z(fQ);
        if (fT != fQ) {
            fS = bC(fT)
        }
        var fO = a(fT);
        var fR = !fO ? 0 : fO[0].level % 2 ? cE(fT) : ct(fT);
        return W(fS, fR)
    }
    function dt(fQ, fT) {
        var fP, fR = eP(fQ.doc, fT);
        while (fP = d7(fR)) {
            fR = fP.find(1, true).line;
            fT = null
        }
        var fO = a(fR);
        var fS = !fO ? fR.text.length : fO[0].level % 2 ? ct(fR) : cE(fR);
        return W(fT == null ? bC(fR) : fT, fS)
    }
    function ak(fP, fQ, fO) {
        var fR = fP[0].level;
        if (fQ == fR) {
            return true
        }
        if (fO == fR) {
            return false
        }
        return fQ < fO
    }
    var eE;
    function aB(fO, fS) {
        eE = null;
        for (var fP = 0, fQ; fP < fO.length; ++fP) {
            var fR = fO[fP];
            if (fR.from < fS && fR.to > fS) {
                return fP
            }
            if ((fR.from == fS || fR.to == fS)) {
                if (fQ == null) {
                    fQ = fP
                } else {
                    if (ak(fO, fR.level, fO[fQ].level)) {
                        if (fR.from != fR.to) {
                            eE = fQ
                        }
                        return fP
                    } else {
                        if (fR.from != fR.to) {
                            eE = fP
                        }
                        return fQ
                    }
                }
            }
        }
        return fQ
    }
    function eO(fO, fR, fP, fQ) {
        if (!fQ) {
            return fR + fP
        }
        do {
            fR += fP
        } while (fR > 0 && e0(fO.text.charAt(fR)));
        return fR
    }
    function v(fO, fV, fQ, fR) {
        var fS = a(fO);
        if (!fS) {
            return ag(fO, fV, fQ, fR)
        }
        var fU = aB(fS, fV), fP = fS[fU];
        var fT = eO(fO, fV, fP.level % 2 ? -fQ : fQ, fR);
        for (; ; ) {
            if (fT > fP.from && fT < fP.to) {
                return fT
            }
            if (fT == fP.from || fT == fP.to) {
                if (aB(fS, fT) == fU) {
                    return fT
                }
                fP = fS[fU += fQ];
                return (fQ > 0) == fP.level % 2 ? fP.to : fP.from
            } else {
                fP = fS[fU += fQ];
                if (!fP) {
                    return null
                }
                if ((fQ > 0) == fP.level % 2) {
                    fT = eO(fO, fP.to, -1, fR)
                } else {
                    fT = eO(fO, fP.from, 1, fR)
                }
            }
        }
    }
    function ag(fO, fS, fP, fQ) {
        var fR = fS + fP;
        if (fQ) {
            while (fR > 0 && e0(fO.text.charAt(fR))) {
                fR += fP
            }
        }
        return fR < 0 || fR > fO.text.length ? null : fR
    }
    var a6 = (function() {
        var fU = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        var fS = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
        function fR(fY) {
            if (fY <= 247) {
                return fU.charAt(fY)
            } else {
                if (1424 <= fY && fY <= 1524) {
                    return "R"
                } else {
                    if (1536 <= fY && fY <= 1773) {
                        return fS.charAt(fY - 1536)
                    } else {
                        if (1774 <= fY && fY <= 2220) {
                            return "r"
                        } else {
                            if (8192 <= fY && fY <= 8203) {
                                return "w"
                            } else {
                                if (fY == 8204) {
                                    return "b"
                                } else {
                                    return "L"
                                }
                            }
                        }
                    }
                }
            }
        }
        var fO = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var fX = /[stwN]/, fQ = /[LRr]/, fP = /[Lb1n]/, fT = /[1n]/;
        var fW = "L";
        function fV(f0, fZ, fY) {
            this.level = f0;
            this.from = fZ;
            this.to = fY
        }
        return function(f8) {
            if (!fO.test(f8)) {
                return false
            }
            var ge = f8.length, f4 = [];
            for (var gd = 0, f0; gd < ge; ++gd) {
                f4.push(f0 = fR(f8.charCodeAt(gd)))
            }
            for (var gd = 0, f7 = fW; gd < ge; ++gd) {
                var f0 = f4[gd];
                if (f0 == "m") {
                    f4[gd] = f7
                } else {
                    f7 = f0
                }
            }
            for (var gd = 0, fY = fW; gd < ge; ++gd) {
                var f0 = f4[gd];
                if (f0 == "1" && fY == "r") {
                    f4[gd] = "n"
                } else {
                    if (fQ.test(f0)) {
                        fY = f0;
                        if (f0 == "r") {
                            f4[gd] = "R"
                        }
                    }
                }
            }
            for (var gd = 1, f7 = f4[0]; gd < ge - 1; ++gd) {
                var f0 = f4[gd];
                if (f0 == "+" && f7 == "1" && f4[gd + 1] == "1") {
                    f4[gd] = "1"
                } else {
                    if (f0 == "," && f7 == f4[gd + 1] && (f7 == "1" || f7 == "n")) {
                        f4[gd] = f7
                    }
                }
                f7 = f0
            }
            for (var gd = 0; gd < ge; ++gd) {
                var f0 = f4[gd];
                if (f0 == ",") {
                    f4[gd] = "N"
                } else {
                    if (f0 == "%") {
                        for (var f1 = gd + 1; f1 < ge && f4[f1] == "%"; ++f1) {
                        }
                        var gf = (gd && f4[gd - 1] == "!") || (f1 < ge && f4[f1] == "1") ? "1" : "N";
                        for (var gb = gd; gb < f1; ++gb) {
                            f4[gb] = gf
                        }
                        gd = f1 - 1
                    }
                }
            }
            for (var gd = 0, fY = fW; gd < ge; ++gd) {
                var f0 = f4[gd];
                if (fY == "L" && f0 == "1") {
                    f4[gd] = "L"
                } else {
                    if (fQ.test(f0)) {
                        fY = f0
                    }
                }
            }
            for (var gd = 0; gd < ge; ++gd) {
                if (fX.test(f4[gd])) {
                    for (var f1 = gd + 1; f1 < ge && fX.test(f4[f1]); ++f1) {
                    }
                    var f5 = (gd ? f4[gd - 1] : fW) == "L";
                    var fZ = (f1 < ge ? f4[f1] : fW) == "L";
                    var gf = f5 || fZ ? "L" : "R";
                    for (var gb = gd; gb < f1; ++gb) {
                        f4[gb] = gf
                    }
                    gd = f1 - 1
                }
            }
            var gc = [], f9;
            for (var gd = 0; gd < ge; ) {
                if (fP.test(f4[gd])) {
                    var f2 = gd;
                    for (++gd; gd < ge && fP.test(f4[gd]); ++gd) {
                    }
                    gc.push(new fV(0, f2, gd))
                } else {
                    var f3 = gd, f6 = gc.length;
                    for (++gd; gd < ge && f4[gd] != "L"; ++gd) {
                    }
                    for (var gb = f3; gb < gd; ) {
                        if (fT.test(f4[gb])) {
                            if (f3 < gb) {
                                gc.splice(f6, 0, new fV(1, f3, gb))
                            }
                            var ga = gb;
                            for (++gb; gb < gd && fT.test(f4[gb]); ++gb) {
                            }
                            gc.splice(f6, 0, new fV(2, ga, gb));
                            f3 = gb
                        } else {
                            ++gb
                        }
                    }
                    if (f3 < gd) {
                        gc.splice(f6, 0, new fV(1, f3, gd))
                    }
                }
            }
            if (gc[0].level == 1 && (f9 = f8.match(/^\s+/))) {
                gc[0].from = f9[0].length;
                gc.unshift(new fV(0, 0, f9[0].length))
            }
            if (fi(gc).level == 1 && (f9 = f8.match(/\s+$/))) {
                fi(gc).to -= f9[0].length;
                gc.push(new fV(0, ge - f9[0].length, ge))
            }
            if (gc[0].level != fi(gc).level) {
                gc.push(new fV(gc[0].level, ge, ge))
            }
            return gc
        }
    })();
    I.version = "4.2.0";
    return I
});
var TextUtils = {};
TextUtils.shorten = function(b, a) {
    return !b ? b : (b.length <= a) ? b : b.substr(0, a - 1) + "\u2026"
};
TextUtils.htmlSafe = function(a) {
    return a == null ? "" : ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;")
};
(function() {
    var a = {id: "Library",kids: [{label: "Help",icon: "&#xE195;",desc: "Help for the RegExr application. See the <b>Reference</b> for help with Regular Expressions.",kids: [{label: "About",desc: "Created by <a href='http://twitter.com/gskinner/' target='_blank'>Grant Skinner</a> & the <a href='http://gskinner.com/' target='_blank'>gskinner</a> team, using the <a href='http://createjs.com/' target='_blank'>CreateJS</a> & <a href='http://codemirror.net/' target='_blank'>CodeMirror</a> libraries.<p>You can provide feedback, log bugs, or access the source code of RegExr on <a href='http://github.com/gskinner/regexr/' target='_blank'>GitHub</a>.</p><p>RegExr v1 is still online at <a href='v1/' target='_blank'>regexr.com/v1/</a>.</p>"}, {label: "RegEx engine",desc: "While the core feature set of regular expressions is fairly consistent, different implementations (ex. Perl vs Java) may have different features or behaviours.<p>RegExr uses your browser's RegExp engine for matching, and its syntax highlighting and documentation reflect the Javascript RegExp standard.</p>"}, {id: "infinite",label: "The 'infinite' error",desc: "The expression can match 0 characters, and therefore matches infinitely.",ext: " <h1>Example:</h1><code>.*</code> can match an empty string of <code>0</code> characters, and therefore will match infinitely."}, {id: "timeout",label: "The 'timeout' error",desc: "The expression took longer than 250ms to execute.",ext: " For some expressions the time to execute grows exponentially, often due to nested quantifiers. <h1>Example:</h1> When <code>(a+)+Z</code> is executed on <code>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</code> it attempts to match any number of 'a' characters any number of times, which results in exponential growth."}, {label: "Getting started",desc: "RegExr provides real-time visual results, syntax highlighting, tooltips, and undo/redo ({{getCtrlKey()}}-Z / Y) so it's easy and fun to explore Regular Expressions.<p>Browse through the <b>Reference</b> and test different tokens to see what they do, then check out the <b>Examples</b> to see how tokens work together.</p>"}, {label: "Expression panel",desc: "This is where you enter a regular expression to test. The results in the <b>Text</b> panel will update as you type. Roll over the expression for information on each token.<p>The buttons to the right allow you to save & share your pattern, or edit the expression flags. Saved patterns can be updated for 24hrs.</p><p>The results bubble will show the number of matches, or indicate errors.</p>"}, {label: "Text panel",desc: "This is where you enter text to test your expression against. Drag & drop a text file to load its contents.<p>Matches will be highlighted as you type. Roll over a match for information on the match and its capture groups.</p><p>Lighter colored caps at the start or end of a line indicate the match continues between lines.</p>"}, {label: "Substitution panel",desc: "Click the <b>Substitution</b> title bar below the <b>Text</b> panel to show or hide the <b>Substitution</b> panel.<p>Matches in the <b>Text</b> panel are replaced by the substitution string & displayed as you type.</p><p>Escaped characters compatible with the JS string format are supported, such as <code>\\n</code>, <code>\\t</code> & <code>\\u0009</code>.</p><p>Roll over tokens in the substitution string for information.</p>"}, {label: "Library panel",desc: "The <b>Library</b> includes help content and a reference that includes info on all regular expression tokens and flags.<p>Tap a selected item in the reference to insert it into your <b>Expression</b>. Click the <span class='icon'>&#xE212;</span> beside an example to load it.</p><p>The library also includes example patterns, searchable community submissions, and your saved favourites.</p>"}]}, {label: "Reference",id: "reference",icon: "&#xE072;",desc: "Information on all of the tokens available to create regular expressions.<p>Click a selected item again to insert it into your Expression.</p><p>Click the <span class='icon'>&#xE212;</span> beside an example to load it.</p>",target: "expr",kids: [{label: "Character classes",id: "charclasses",desc: "Character classes match a character from a specific set. There are a number of predefined character classes and you can also define your own sets.",kids: [{id: "dot",desc: "Matches any character except line breaks.",ext: " Equivalent to <code>[^\\n\\r]</code>.",example: [".", "glib jocks vex dwarves!"],token: "."}, {label: "match any",desc: "A character set that can be used to match any character, including line breaks.<p>An alternative is <code>[^]</code>, but it is not supported in all browsers.</p>",example: ["[\\s\\S]", "glib jocks vex dwarves!"],token: "[\\s\\S]"}, {id: "word",desc: "Matches any word character (alphanumeric & underscore).",ext: " Only matches low-ascii characters (no accented or non-roman characters). Equivalent to <code>[A-Za-z0-9_]</code>",example: ["\\w", "bonjour, mon fr\u00E8re"],token: "\\w"}, {id: "notword",label: "not word",desc: "Matches any character that is not a word character (alphanumeric & underscore).",ext: " Equivalent to <code>[^A-Za-z0-9_]</code>",example: ["\\W", "bonjour, mon fr\u00E8re"],token: "\\W"}, {id: "digit",desc: "Matches any digit character (0-9).",ext: " Equivalent to <code>[0-9]</code>.",example: ["\\d", "+1-(444)-555-1234"],token: "\\d"}, {id: "notdigit",label: "not digit",desc: "Matches any character that is not a digit character (0-9).",ext: " Equivalent to <code>[^0-9]</code>.",example: ["\\D", "+1-(444)-555-1234"],token: "\\D"}, {id: "whitespace",desc: "Matches any whitespace character (spaces, tabs, line breaks).",example: ["\\s", "glib jocks vex dwarves!"],token: "\\s"}, {id: "notwhitespace",label: "not whitespace",desc: "Matches any character that is not a whitespace character (spaces, tabs, line breaks).",example: ["\\S", "glib jocks vex dwarves!"],token: "\\S"}, {id: "set",label: "character set",desc: "Match any character in the set.",example: ["[aeiou]", "glib jocks vex dwarves!"],token: "[ABC]"}, {id: "setnot",label: "negated set",desc: "Match any character that is not in the set.",example: ["[^aeiou]", "glib jocks vex dwarves!"],token: "[^ABC]"}, {id: "range",tip: "Matches a character in the range {{getChar(prev)}} to {{getChar(next)}} (char code {{prev.code}} to {{next.code}}).",example: ["[g-s]", "abcdefghijklmnopqrstuvwxyz"],desc: "Matches a character having a character code between the two specified characters inclusive.",token: "[A-Z]"}]}, {label: "Anchors",id: "anchors",desc: "Anchors are unique in that they match a position within a string, not a character.",kids: [{id: "bof",label: "beginning",desc: "Matches the beginning of the string, or the beginning of a line if the multiline flag (<code>m</code>) is enabled.",ext: " This matches a position, not a character.",example: ["^\\w+", "she sells seashells"],token: "^"}, {id: "eof",label: "end",desc: "Matches the end of the string, or the end of a line if the multiline flag (<code>m</code>) is enabled.",ext: " This matches a position, not a character.",example: ["\\w+$", "she sells seashells"],token: "$"}, {id: "wordboundary",label: "word boundary",desc: "Matches a word boundary position such as whitespace, punctuation, or the start/end of the string.",ext: " This matches a position, not a character.",example: ["s\\b", "she sells seashells"],token: "\\b"}, {id: "notwordboundary",label: "not word boundary",desc: "Matches any position that is not a word boundary.",ext: " This matches a position, not a character.",example: ["s\\B", "she sells seashells"],token: "\\B"}]}, {label: "Escaped characters",id: "escchars",desc: "Some characters have special meaning in regular expressions and must be escaped. All escaped characters begin with the <code>\\</code> character.<br/><br/> Within a character set, only <code>\\</code>, <code>-</code>, and <code>]</code> need to be escaped.",kids: [{id: "escoctal",label: "octal escape",desc: "Octal escaped character in the form <code>\\000</code>.",ext: " Value must be less than 255 (<code>\\377</code>).",example: ["\\251", "RegExr is \u00A92014"],token: "\\000"}, {id: "eschexadecimal",label: "hexadecimal escape",desc: "Hexadecimal escaped character in the form <code>\\xFF</code>.",example: ["\\xA9", "RegExr is \u00A92014"],token: "\\xFF"}, {id: "escunicode",label: "unicode escape",desc: "Unicode escaped character in the form <code>\\uFFFF</code>.",example: ["\\u00A9", "RegExr is \u00A92014"],token: "\\uFFFF"}, {id: "esccontrolchar",label: "control character escape",desc: "Escaped control character in the form <code>\\cZ</code>.",ext: " This can range from <code>\\cA</code> (NULL, char code 0) to <code>\\cZ</code> (EM, char code 25). <h1>Example:</h1><code>\\cI</code> matches TAB (char code 9).",token: "\\cI"}]}, {label: "Groups & Lookaround",id: "groups",desc: "Groups allow you to combine a sequence of tokens to operate on them together. Capture groups can be referenced by a backreference and accessed separately in the results.<hr/>Lookaround lets you match a group without including it in the result.",kids: [{id: "group",label: "capturing group",desc: "Groups multiple tokens together and creates a capture group for extracting a substring or using a backreference.",example: ["(ha)+", "hahaha haa hah!"],token: "(ABC)"}, {id: "backref",label: "backreference",tip: "Matches the results of capture group #{{group.num}}.",desc: "Matches the results of a previous capture group. For example <code>\\1</code> matches the results of the first capture group & <code>\\3</code> matches the third.",example: ["(\\w)a\\1", "hah dad bad dab gag gab"],token: "\\1"}, {id: "noncapgroup",label: "non-capturing group",desc: "Groups multiple tokens together without creating a capture group.",example: ["(?:ha)+", "hahaha haa hah!"],token: "(?:ABC)"}, {id: "poslookahead",label: "positive lookahead",desc: "Matches a group after the main expression without including it in the result.",example: ["\\d(?=px)", "1pt 2px 3em 4px"],token: "(?=ABC)"}, {id: "neglookahead",label: "negative lookahead",desc: "Specifies a group that can not match after the main expression (if it matches, the result is discarded).",example: ["\\d(?!px)", "1pt 2px 3em 4px"],token: "(?!ABC)"}, {id: "poslookbehind",label: "positive lookbehind*",desc: "<b>*Not supported in JavaScript.</b> Matches a group before the main expression without including it in the result.",token: "(?<=ABC)"}, {id: "neglookbehind",label: "negative lookbehind*",desc: "<b>*Not supported in JavaScript.</b> Specifies a group that can not match before the main expression (if it matches, the result is discarded).",token: "(?&lt;!ABC)"}]}, {label: "Quantifiers & Alternation",id: "quants",desc: "Quantifiers indicate that the preceding token must be matched a certain number of times. By default, quantifiers are greedy, and will match as many characters as possible.<hr/>Alternation acts like a boolean OR, matching one sequence or another.",kids: [{id: "plus",desc: "Matches 1 or more of the preceding token.",example: ["b\\w+", "b be bee beer beers"],token: "+"}, {id: "star",desc: "Matches 0 or more of the preceding token.",example: ["b\\w*", "b be bee beer beers"],token: "*"}, {id: "quant",label: "quantifier",desc: "Matches the specified quantity of the previous token. <code>{1,3}</code> will match 1 to 3. <code>{3}</code> will match exactly 3. <code>{3,}</code> will match 3 or more. ",example: ["b\\w{2,3}", "b be bee beer beers"],token: "{1,3}"}, {id: "opt",label: "optional",desc: "Matches 0 or 1 of the preceding token, effectively making it optional.",example: ["colou?r", "color colour"],token: "?"}, {id: "lazy",desc: "Makes the preceding quantifier lazy, causing it to match as few characters as possible.",ext: " By default, quantifiers are greedy, and will match as many characters as possible.",example: ["b\\w+?", "b be bee beer beers"],token: "?"}, {id: "alt",label: "alternation",desc: "Acts like a boolean OR. Matches the expression before or after the <code>|</code>.",ext: "<p>It can operate within a group, or on a whole expression. The patterns will be tested in order.</p>",example: ["b(a|e|i)d", "bad bud bod bed bid"],token: "|"}]}, {label: "Substitution",desc: "These tokens are used in a substitution string to insert different parts of the match.",target: "subst",kids: [{id: "subst_match",label: "match",desc: "Inserts the matched text.",token: "$$&"}, {id: "subst_num",label: "capture group",tip: "Inserts the results of capture group #{{group.num}}.",desc: "Inserts the results of the specified capture group (ex. $3 will insert the third capture group).",token: "$1"}, {id: "subst_pre",label: "before match",desc: "Inserts the portion of the source string that precedes the match.",token: "$$`"}, {id: "subst_post",label: "after match",desc: "Inserts the portion of the source string that follows the match.",token: "$$'"}, {id: "subst_$",label: "escaped $",desc: "Inserts a dollar sign character ($).",token: "$$$$"}, {label: "escaped characters",token: "\\n",desc: "Escaped characters compatible with the JS string format, such as <code>\\n</code>, <code>\\t</code>, <code>\\x09</code>, & <code>\\u0009</code> are supported in the substitution string."}]}, {id: "flags",label: "Flags",tooltip: "Expression flags change how the expression is interpreted. Click to edit.",desc: "Expression flags change how the expression is interpreted. There are three flags in JS: i, g, and m. Flags follow the closing backslash of the expression (ex. <code>/.+/igm</code> ).",target: "flags",kids: [{id: "flag_i",label: "ignore case",desc: "Makes the whole expression case-insensitive.",ext: " For example, <code>/aBc/i</code> would match <code>AbC</code>.",token: "i"}, {id: "flag_g",label: "global search",tip: "Retain the index of the last match, allowing iterative searches.",desc: "Retain the index of the last match, allowing subsequent searches to start from the end of the previous match.<p>Without the global flag, subsequent searches will return the same match.</p><hr/>RegExr only searches for a single match when the global flag is disabled to avoid infinite match errors.",token: "g"}, {id: "flag_m",label: "multiline",tip: "Beginning/end anchors (<b>^</b>/<b>$</b>) will match the start/end of a line.",desc: "When the multiline flag is enabled, beginning and end anchors (<code>^</code> and <code>$</code>) will match the start and end of a line, instead of the start and end of the whole string.<p>Note that patterns such as <code>/^[\\s\\S]+$/m</code> may return matches that span multiple lines because the anchors will match the start/end of <b>any</b> line.</p>",token: "m"}]}]}, {id: "cheatsheet",label: "Cheatsheet",max: true,kids: [],icon: "&#xE603;",desc: "pulled from html"}, {label: "Examples",id: "examples",icon: "&#xE065;",desc: "Example patterns to get you started with Regular Expressions.<p>Click the <span class='icon'>&#xE212;</span> beside an example to load it.</p>",kids: [{label: "integer & decimal numbers",desc: "Matches integer and decimal numbers.",example: ["(?:\\d*\\.)?\\d+", "10rats + .36geese = 3.14cows"]}, {label: "test testing",desc: "Pay attention. There will be a test.",example: ["\\btest(er|ing|ed|s)?\\b", "that tested test is testing the tester's tests"]}, {label: "phone number",desc: "North American phone number matching. Highly simplified!",example: ["\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b", "p:444-555-1234 f:246.555.8888 m:1235554567"]}, {label: "words",desc: "Simple example matching words in text. In this case, only considering low ascii characters (a-z).",example: ["[a-zA-Z]+", "RegEx is tough, but useful."]}, {label: "24 or 32 bit colors",desc: "Matches a 24 or 32 bit hex color, with an optional leading # or 0x.",example: ["(?:#|0x)?(?:[0-9A-F]{2}){3,4}", "#FF006C 99AAB7FF 0xF0F73611"]}, {label: "4 letter words",desc: "Four letter words are bad right? This finds them.",example: ["\\b\\w{4}\\b", "drink beer, it's very nice!"]}, {label: "2-5 letter palindromes",desc: "Using backreferences to matches 2 to 5 letter palindromes (words that read the same forward and backward).",example: ["\\b(\\w)?(\\w)\\w?\\2\\1", "my dad sees a kayak at noon"]}]}]};
    var c = {kids: [{id: "char",label: "character",tip: "Matches a {{getChar()}} character (char code {{code}})."}, {id: "js_char",label: "character",tip: "Inserts a {{getChar()}} character (char code {{code}})."}, {id: "quant",label: "quantifier",tip: "Match {{getQuant()}} of the preceding token."}, {id: "open",tip: "Indicates the start of a regular expression."}, {id: "close",tip: "Indicates the end of a regular expression and the start of expression flags."}, {id: "ERROR",tip: "Errors in the expression are underlined in red. Roll over errors for more info."}]};
    var b = {groupopen: "Unmatched opening parenthesis.",groupclose: "Unmatched closing parenthesis.",quanttarg: "Invalid target for quantifier.",setopen: "Unmatched opening square bracket.",esccharopen: "Dangling backslash.",quantrev: "Quantifier minimum is greater than maximum.",rangerev: "Range values reversed. Start char is greater than end char.",lookbehind: "Lookbehind is not supported in Javascript.",fwdslash: "Unescaped forward slash.",esccharbad: "Invalid escape sequence."};
    window.documentation = {library: a,misc: c,errors: b}
})();
!function() {
    var a, b, c, d;
    !function() {
        var e = {}, f = {};
        a = function(a, b, c) {
            e[a] = {deps: b,callback: c}
        }, d = c = b = function(a) {
            function c(b) {
                if ("." !== b.charAt(0))
                    return b;
                for (var c = b.split("/"), d = a.split("/").slice(0, -1), e = 0, f = c.length; f > e; e++) {
                    var g = c[e];
                    if (".." === g)
                        d.pop();
                    else {
                        if ("." === g)
                            continue;
                        d.push(g)
                    }
                }
                return d.join("/")
            }
            if (d._eak_seen = e, f[a])
                return f[a];
            if (f[a] = {}, !e[a])
                throw new Error("Could not find module " + a);
            for (var g, h = e[a], i = h.deps, j = h.callback, k = [], l = 0, m = i.length; m > l; l++)
                k.push("exports" === i[l] ? g = {} : b(c(i[l])));
            var n = j.apply(this, k);
            return f[a] = g || n
        }
    }(), a("promise/all", ["./utils", "exports"], function(a, b) {
        "use strict";
        function c(a) {
            var b = this;
            if (!d(a))
                throw new TypeError("You must pass an array to all.");
            return new b(function(b, c) {
                function d(a) {
                    return function(b) {
                        f(a, b)
                    }
                }
                function f(a, c) {
                    h[a] = c, 0 === --i && b(h)
                }
                var g, h = [], i = a.length;
                0 === i && b([]);
                for (var j = 0; j < a.length; j++)
                    g = a[j], g && e(g.then) ? g.then(d(j), c) : f(j, g)
            })
        }
        var d = a.isArray, e = a.isFunction;
        b.all = c
    }), a("promise/asap", ["exports"], function(a) {
        "use strict";
        function b() {
            return function() {
                process.nextTick(e)
            }
        }
        function c() {
            var a = 0, b = new i(e), c = document.createTextNode("");
            return b.observe(c, {characterData: !0}), function() {
                c.data = a = ++a % 2
            }
        }
        function d() {
            return function() {
                j.setTimeout(e, 1)
            }
        }
        function e() {
            for (var a = 0; a < k.length; a++) {
                var b = k[a], c = b[0], d = b[1];
                c(d)
            }
            k = []
        }
        function f(a, b) {
            var c = k.push([a, b]);
            1 === c && g()
        }
        var g, h = "undefined" != typeof window ? window : {}, i = h.MutationObserver || h.WebKitMutationObserver, j = "undefined" != typeof global ? global : this, k = [];
        g = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? b() : i ? c() : d(), a.asap = f
    }), a("promise/cast", ["exports"], function(a) {
        "use strict";
        function b(a) {
            if (a && "object" == typeof a && a.constructor === this)
                return a;
            var b = this;
            return new b(function(b) {
                b(a)
            })
        }
        a.cast = b
    }), a("promise/config", ["exports"], function(a) {
        "use strict";
        function b(a, b) {
            return 2 !== arguments.length ? c[a] : void (c[a] = b)
        }
        var c = {instrument: !1};
        a.config = c, a.configure = b
    }), a("promise/polyfill", ["./promise", "./utils", "exports"], function(a, b, c) {
        "use strict";
        function d() {
            var a = "Promise" in window && "cast" in window.Promise && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise && function() {
                var a;
                return new window.Promise(function(b) {
                    a = b
                }), f(a)
            }();
            a || (window.Promise = e)
        }
        var e = a.Promise, f = b.isFunction;
        c.polyfill = d
    }), a("promise/promise", ["./config", "./utils", "./cast", "./all", "./race", "./resolve", "./reject", "./asap", "exports"], function(a, b, c, d, e, f, g, h, i) {
        "use strict";
        function j(a) {
            if (!w(a))
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            if (!(this instanceof j))
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
            this._subscribers = [], k(a, this)
        }
        function k(a, b) {
            function c(a) {
                p(b, a)
            }
            function d(a) {
                r(b, a)
            }
            try {
                a(c, d)
            } catch (e) {
                d(e)
            }
        }
        function l(a, b, c, d) {
            var e, f, g, h, i = w(c);
            if (i)
                try {
                    e = c(d), g = !0
                } catch (j) {
                    h = !0, f = j
                }
            else
                e = d, g = !0;
            o(b, e) || (i && g ? p(b, e) : h ? r(b, f) : a === F ? p(b, e) : a === G && r(b, e))
        }
        function m(a, b, c, d) {
            var e = a._subscribers, f = e.length;
            e[f] = b, e[f + F] = c, e[f + G] = d
        }
        function n(a, b) {
            for (var c, d, e = a._subscribers, f = a._detail, g = 0; g < e.length; g += 3)
                c = e[g], d = e[g + b], l(b, c, d, f);
            a._subscribers = null
        }
        function o(a, b) {
            var c, d = null;
            try {
                if (a === b)
                    throw new TypeError("A promises callback cannot return that same promise.");
                if (v(b) && (d = b.then, w(d)))
                    return d.call(b, function(d) {
                        return c ? !0 : (c = !0, void (b !== d ? p(a, d) : q(a, d)))
                    }, function(b) {
                        return c ? !0 : (c = !0, void r(a, b))
                    }), !0
            } catch (e) {
                return c ? !0 : (r(a, e), !0)
            }
            return !1
        }
        function p(a, b) {
            a === b ? q(a, b) : o(a, b) || q(a, b)
        }
        function q(a, b) {
            a._state === D && (a._state = E, a._detail = b, u.async(s, a))
        }
        function r(a, b) {
            a._state === D && (a._state = E, a._detail = b, u.async(t, a))
        }
        function s(a) {
            n(a, a._state = F)
        }
        function t(a) {
            n(a, a._state = G)
        }
        var u = a.config, v = (a.configure, b.objectOrFunction), w = b.isFunction, x = (b.now, c.cast), y = d.all, z = e.race, A = f.resolve, B = g.reject, C = h.asap;
        u.async = C;
        var D = void 0, E = 0, F = 1, G = 2;
        j.prototype = {constructor: j,_state: void 0,_detail: void 0,_subscribers: void 0,then: function(a, b) {
                var c = this, d = new this.constructor(function() {
                });
                if (this._state) {
                    var e = arguments;
                    u.async(function() {
                        l(c._state, d, e[c._state - 1], c._detail)
                    })
                } else
                    m(this, d, a, b);
                return d
            },"catch": function(a) {
                return this.then(null, a)
            }}, j.all = y, j.cast = x, j.race = z, j.resolve = A, j.reject = B, i.Promise = j
    }), a("promise/race", ["./utils", "exports"], function(a, b) {
        "use strict";
        function c(a) {
            var b = this;
            if (!d(a))
                throw new TypeError("You must pass an array to race.");
            return new b(function(b, c) {
                for (var d, e = 0; e < a.length; e++)
                    d = a[e], d && "function" == typeof d.then ? d.then(b, c) : b(d)
            })
        }
        var d = a.isArray;
        b.race = c
    }), a("promise/reject", ["exports"], function(a) {
        "use strict";
        function b(a) {
            var b = this;
            return new b(function(b, c) {
                c(a)
            })
        }
        a.reject = b
    }), a("promise/resolve", ["exports"], function(a) {
        "use strict";
        function b(a) {
            var b = this;
            return new b(function(b) {
                b(a)
            })
        }
        a.resolve = b
    }), a("promise/utils", ["exports"], function(a) {
        "use strict";
        function b(a) {
            return c(a) || "object" == typeof a && null !== a
        }
        function c(a) {
            return "function" == typeof a
        }
        function d(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
        var e = Date.now || function() {
            return (new Date).getTime()
        };
        a.objectOrFunction = b, a.isFunction = c, a.isArray = d, a.now = e
    }), b("promise/polyfill").polyfill()
}(), "document" in self && !("classList" in document.createElement("_")) && !function(a) {
    "use strict";
    if ("Element" in a) {
        var b = "classList", c = "prototype", d = a.Element[c], e = Object, f = String[c].trim || function() {
            return this.replace(/^\s+|\s+$/g, "")
        }, g = Array[c].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a)
                    return b;
            return -1
        }, h = function(a, b) {
            this.name = a, this.code = DOMException[a], this.message = b
        }, i = function(a, b) {
            if ("" === b)
                throw new h("SYNTAX_ERR", "An invalid or illegal string was specified");
            if (/\s/.test(b))
                throw new h("INVALID_CHARACTER_ERR", "String contains an invalid character");
            return g.call(a, b)
        }, j = function(a) {
            for (var b = f.call(a.getAttribute("class") || ""), c = b ? b.split(/\s+/) : [], d = 0, e = c.length; e > d; d++)
                this.push(c[d]);
            this._updateClassName = function() {
                a.setAttribute("class", this.toString())
            }
        }, k = j[c] = [], l = function() {
            return new j(this)
        };
        if (h[c] = Error[c], k.item = function(a) {
            return this[a] || null
        }, k.contains = function(a) {
            return a += "", -1 !== i(this, a)
        }, k.add = function() {
            var a, b = arguments, c = 0, d = b.length, e = !1;
            do
                a = b[c] + "", -1 === i(this, a) && (this.push(a), e = !0);
            while (++c < d);
            e && this._updateClassName()
        }, k.remove = function() {
            var a, b = arguments, c = 0, d = b.length, e = !1;
            do {
                a = b[c] + "";
                var f = i(this, a);
                -1 !== f && (this.splice(f, 1), e = !0)
            } while (++c < d);
            e && this._updateClassName()
        }, k.toggle = function(a, b) {
            a += "";
            var c = this.contains(a), d = c ? b !== !0 && "remove" : b !== !1 && "add";
            return d && this[d](a), !c
        }, k.toString = function() {
            return this.join(" ")
        }, e.defineProperty) {
            var m = {get: l,enumerable: !0,configurable: !0};
            try {
                e.defineProperty(d, b, m)
            } catch (n) {
                -2146823252 === n.number && (m.enumerable = !1, e.defineProperty(d, b, m))
            }
        } else
            e[c].__defineGetter__ && d.__defineGetter__(b, l)
    }
}(self), function() {
    "use strict";
    function a(a) {
        return a.replace(/,/g, ".").replace(/[^0-9\.]/g, "")
    }
    function b(b) {
        return parseFloat(a(b)) >= 10
    }
    var c, d = {bridge: null,version: "0.0.0",disabled: null,outdated: null,ready: null}, e = {}, f = 0, g = {}, h = 0, i = {}, j = null, k = null, l = function() {
        var a, b, c, d, e = "ZeroClipboard.swf";
        if (document.currentScript && (d = document.currentScript.src))
            ;
        else {
            var f = document.getElementsByTagName("script");
            if ("readyState" in f[0])
                for (a = f.length; a-- && ("interactive" !== f[a].readyState || !(d = f[a].src)); )
                    ;
            else if ("loading" === document.readyState)
                d = f[f.length - 1].src;
            else {
                for (a = f.length; a--; ) {
                    if (c = f[a].src, !c) {
                        b = null;
                        break
                    }
                    if (c = c.split("#")[0].split("?")[0], c = c.slice(0, c.lastIndexOf("/") + 1), null == b)
                        b = c;
                    else if (b !== c) {
                        b = null;
                        break
                    }
                }
                null !== b && (d = b)
            }
        }
        return d && (d = d.split("#")[0].split("?")[0], e = d.slice(0, d.lastIndexOf("/") + 1) + e), e
    }(), m = function() {
        var a = /\-([a-z])/g, b = function(a, b) {
            return b.toUpperCase()
        };
        return function(c) {
            return c.replace(a, b)
        }
    }(), n = function(a, b) {
        var c, d, e;
        return window.getComputedStyle ? c = window.getComputedStyle(a, null).getPropertyValue(b) : (d = m(b), c = a.currentStyle ? a.currentStyle[d] : a.style[d]), "cursor" !== b || c && "auto" !== c || (e = a.tagName.toLowerCase(), "a" !== e) ? c : "pointer"
    }, o = function(a) {
        a || (a = window.event);
        var b;
        this !== window ? b = this : a.target ? b = a.target : a.srcElement && (b = a.srcElement), I.activate(b)
    }, p = function(a, b, c) {
        a && 1 === a.nodeType && (a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c))
    }, q = function(a, b, c) {
        a && 1 === a.nodeType && (a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c))
    }, r = function(a, b) {
        if (!a || 1 !== a.nodeType)
            return a;
        if (a.classList)
            return a.classList.contains(b) || a.classList.add(b), a;
        if (b && "string" == typeof b) {
            var c = (b || "").split(/\s+/);
            if (1 === a.nodeType)
                if (a.className) {
                    for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; g > f; f++)
                        d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
                    a.className = e.replace(/^\s+|\s+$/g, "")
                } else
                    a.className = b
        }
        return a
    }, s = function(a, b) {
        if (!a || 1 !== a.nodeType)
            return a;
        if (a.classList)
            return a.classList.contains(b) && a.classList.remove(b), a;
        if (b && "string" == typeof b || void 0 === b) {
            var c = (b || "").split(/\s+/);
            if (1 === a.nodeType && a.className)
                if (b) {
                    for (var d = (" " + a.className + " ").replace(/[\n\t]/g, " "), e = 0, f = c.length; f > e; e++)
                        d = d.replace(" " + c[e] + " ", " ");
                    a.className = d.replace(/^\s+|\s+$/g, "")
                } else
                    a.className = ""
        }
        return a
    }, t = function() {
        var a, b, c, d = 1;
        return "function" == typeof document.body.getBoundingClientRect && (a = document.body.getBoundingClientRect(), b = a.right - a.left, c = document.body.offsetWidth, d = Math.round(b / c * 100) / 100), d
    }, u = function(a, b) {
        var c = {left: 0,top: 0,width: 0,height: 0,zIndex: A(b) - 1};
        if (a.getBoundingClientRect) {
            var d, e, f, g = a.getBoundingClientRect();
            "pageXOffset" in window && "pageYOffset" in window ? (d = window.pageXOffset, e = window.pageYOffset) : (f = t(), d = Math.round(document.documentElement.scrollLeft / f), e = Math.round(document.documentElement.scrollTop / f));
            var h = document.documentElement.clientLeft || 0, i = document.documentElement.clientTop || 0;
            c.left = g.left + d - h, c.top = g.top + e - i, c.width = "width" in g ? g.width : g.right - g.left, c.height = "height" in g ? g.height : g.bottom - g.top
        }
        return c
    }, v = function(a, b) {
        var c = null == b || b && b.cacheBust === !0 && b.useNoCache === !0;
        return c ? (-1 === a.indexOf("?") ? "?" : "&") + "noCache=" + (new Date).getTime() : ""
    }, w = function(a) {
        var b, c, d, e = [], f = [], g = [];
        if (a.trustedOrigins && ("string" == typeof a.trustedOrigins ? f.push(a.trustedOrigins) : "object" == typeof a.trustedOrigins && "length" in a.trustedOrigins && (f = f.concat(a.trustedOrigins))), a.trustedDomains && ("string" == typeof a.trustedDomains ? f.push(a.trustedDomains) : "object" == typeof a.trustedDomains && "length" in a.trustedDomains && (f = f.concat(a.trustedDomains))), f.length)
            for (b = 0, c = f.length; c > b; b++)
                if (f.hasOwnProperty(b) && f[b] && "string" == typeof f[b]) {
                    if (d = D(f[b]), !d)
                        continue;
                    if ("*" === d) {
                        g = [d];
                        break
                    }
                    g.push.apply(g, [d, "//" + d, window.location.protocol + "//" + d])
                }
        return g.length && e.push("trustedOrigins=" + encodeURIComponent(g.join(","))), "string" == typeof a.jsModuleId && a.jsModuleId && e.push("jsModuleId=" + encodeURIComponent(a.jsModuleId)), e.join("&")
    }, x = function(a, b, c) {
        if ("function" == typeof b.indexOf)
            return b.indexOf(a, c);
        var d, e = b.length;
        for ("undefined" == typeof c ? c = 0 : 0 > c && (c = e + c), d = c; e > d; d++)
            if (b.hasOwnProperty(d) && b[d] === a)
                return d;
        return -1
    }, y = function(a) {
        if ("string" == typeof a)
            throw new TypeError("ZeroClipboard doesn't accept query strings.");
        return a.length ? a : [a]
    }, z = function(a, b, c, d) {
        d ? window.setTimeout(function() {
            a.apply(b, c)
        }, 0) : a.apply(b, c)
    }, A = function(a) {
        var b, c;
        return a && ("number" == typeof a && a > 0 ? b = a : "string" == typeof a && (c = parseInt(a, 10)) && !isNaN(c) && c > 0 && (b = c)), b || ("number" == typeof L.zIndex && L.zIndex > 0 ? b = L.zIndex : "string" == typeof L.zIndex && (c = parseInt(L.zIndex, 10)) && !isNaN(c) && c > 0 && (b = c)), b || 0
    }, B = function(a, b) {
        if (a && b !== !1 && "undefined" != typeof console && console && (console.warn || console.log)) {
            var c = "`" + a + "` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";
            console.warn ? console.warn(c) : console.log(c)
        }
    }, C = function() {
        var a, b, c, d, e, f, g = arguments[0] || {};
        for (a = 1, b = arguments.length; b > a; a++)
            if (null != (c = arguments[a]))
                for (d in c)
                    if (c.hasOwnProperty(d)) {
                        if (e = g[d], f = c[d], g === f)
                            continue;
                        void 0 !== f && (g[d] = f)
                    }
        return g
    }, D = function(a) {
        if (null == a || "" === a)
            return null;
        if (a = a.replace(/^\s+|\s+$/g, ""), "" === a)
            return null;
        var b = a.indexOf("//");
        a = -1 === b ? a : a.slice(b + 2);
        var c = a.indexOf("/");
        return a = -1 === c ? a : -1 === b || 0 === c ? null : a.slice(0, c), a && ".swf" === a.slice(-4).toLowerCase() ? null : a || null
    }, E = function() {
        var a = function(a, b) {
            var c, d, e;
            if (null != a && "*" !== b[0] && ("string" == typeof a && (a = [a]), "object" == typeof a && "length" in a))
                for (c = 0, d = a.length; d > c; c++)
                    if (a.hasOwnProperty(c) && (e = D(a[c]))) {
                        if ("*" === e) {
                            b.length = 0, b.push("*");
                            break
                        }
                        -1 === x(e, b) && b.push(e)
                    }
        }, b = {always: "always",samedomain: "sameDomain",never: "never"};
        return function(c, d) {
            var e, f = d.allowScriptAccess;
            if ("string" == typeof f && (e = f.toLowerCase()) && /^always|samedomain|never$/.test(e))
                return b[e];
            var g = D(d.moviePath);
            null === g && (g = c);
            var h = [];
            a(d.trustedOrigins, h), a(d.trustedDomains, h);
            var i = h.length;
            if (i > 0) {
                if (1 === i && "*" === h[0])
                    return "always";
                if (-1 !== x(c, h))
                    return 1 === i && c === g ? "sameDomain" : "always"
            }
            return "never"
        }
    }(), F = function(a) {
        if (null == a)
            return [];
        if (Object.keys)
            return Object.keys(a);
        var b = [];
        for (var c in a)
            a.hasOwnProperty(c) && b.push(c);
        return b
    }, G = function(a) {
        if (a)
            for (var b in a)
                a.hasOwnProperty(b) && delete a[b];
        return a
    }, H = function() {
        var a = !1;
        if ("boolean" == typeof d.disabled)
            a = d.disabled === !1;
        else {
            if ("function" == typeof ActiveXObject)
                try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (a = !0)
                } catch (b) {
                }
            !a && navigator.mimeTypes["application/x-shockwave-flash"] && (a = !0)
        }
        return a
    }, I = function(a, b) {
        return this instanceof I ? (this.id = "" + f++, g[this.id] = {instance: this,elements: [],handlers: {}}, a && this.clip(a), "undefined" != typeof b && (B("new ZeroClipboard(elements, options)", L.debug), I.config(b)), this.options = I.config(), "boolean" != typeof d.disabled && (d.disabled = !H()), void (d.disabled === !1 && d.outdated !== !0 && null === d.bridge && (d.outdated = !1, d.ready = !1, M()))) : new I(a, b)
    };
    I.prototype.setText = function(a) {
        return a && "" !== a && (e["text/plain"] = a, d.ready === !0 && d.bridge && d.bridge.setText(a)), this
    }, I.prototype.setSize = function(a, b) {
        return d.ready === !0 && d.bridge && d.bridge.setSize(a, b), this
    };
    var J = function(a) {
        d.ready === !0 && d.bridge && d.bridge.setHandCursor(a)
    };
    I.prototype.destroy = function() {
        this.unclip(), this.off(), delete g[this.id]
    };
    var K = function() {
        var a, b, c, d = [], e = F(g);
        for (a = 0, b = e.length; b > a; a++)
            c = g[e[a]].instance, c && c instanceof I && d.push(c);
        return d
    };
    I.version = "1.3.2";
    var L = {swfPath: l,trustedDomains: window.location.host ? [window.location.host] : [],cacheBust: !0,forceHandCursor: !1,zIndex: 999999999,debug: !0,title: null,autoActivate: !0};
    I.config = function(a) {
        "object" == typeof a && null !== a && C(L, a);
        {
            if ("string" != typeof a || !a) {
                var b = {};
                for (var c in L)
                    L.hasOwnProperty(c) && (b[c] = "object" == typeof L[c] && null !== L[c] ? "length" in L[c] ? L[c].slice(0) : C({}, L[c]) : L[c]);
                return b
            }
            if (L.hasOwnProperty(a))
                return L[a]
        }
    }, I.destroy = function() {
        I.deactivate();
        for (var a in g)
            if (g.hasOwnProperty(a) && g[a]) {
                var b = g[a].instance;
                b && "function" == typeof b.destroy && b.destroy()
            }
        var c = N(d.bridge);
        c && c.parentNode && (c.parentNode.removeChild(c), d.ready = null, d.bridge = null)
    }, I.activate = function(a) {
        c && (s(c, L.hoverClass), s(c, L.activeClass)), c = a, r(a, L.hoverClass), O();
        var b = L.title || a.getAttribute("title");
        if (b) {
            var e = N(d.bridge);
            e && e.setAttribute("title", b)
        }
        var f = L.forceHandCursor === !0 || "pointer" === n(a, "cursor");
        J(f)
    }, I.deactivate = function() {
        var a = N(d.bridge);
        a && (a.style.left = "0px", a.style.top = "-9999px", a.removeAttribute("title")), c && (s(c, L.hoverClass), s(c, L.activeClass), c = null)
    };
    var M = function() {
        var a, b, c = document.getElementById("global-zeroclipboard-html-bridge");
        if (!c) {
            var e = I.config();
            e.jsModuleId = "string" == typeof j && j || "string" == typeof k && k || null;
            var f = E(window.location.host, L), g = w(e), h = L.moviePath + v(L.moviePath, L), i = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + h + '"/>         <param name="allowScriptAccess" value="' + f + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + g + '"/>         <embed src="' + h + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="' + f + '"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + g + '"           scale="exactfit">         </embed>       </object>';
            c = document.createElement("div"), c.id = "global-zeroclipboard-html-bridge", c.setAttribute("class", "global-zeroclipboard-container"), c.style.position = "absolute", c.style.left = "0px", c.style.top = "-9999px", c.style.width = "15px", c.style.height = "15px", c.style.zIndex = "" + A(L.zIndex), document.body.appendChild(c), c.innerHTML = i
        }
        a = document["global-zeroclipboard-flash-bridge"], a && (b = a.length) && (a = a[b - 1]), d.bridge = a || c.children[0].lastElementChild
    }, N = function(a) {
        for (var b = /^OBJECT|EMBED$/, c = a && a.parentNode; c && b.test(c.nodeName) && c.parentNode; )
            c = c.parentNode;
        return c || null
    }, O = function() {
        if (c) {
            var a = u(c, L.zIndex), b = N(d.bridge);
            b && (b.style.top = a.top + "px", b.style.left = a.left + "px", b.style.width = a.width + "px", b.style.height = a.height + "px", b.style.zIndex = a.zIndex + 1), d.ready === !0 && d.bridge && d.bridge.setSize(a.width, a.height)
        }
        return this
    };
    I.prototype.on = function(a, b) {
        var c, e, f, h = {}, i = g[this.id] && g[this.id].handlers;
        if ("string" == typeof a && a)
            f = a.toLowerCase().split(/\s+/);
        else if ("object" == typeof a && a && "undefined" == typeof b)
            for (c in a)
                a.hasOwnProperty(c) && "string" == typeof c && c && "function" == typeof a[c] && this.on(c, a[c]);
        if (f && f.length) {
            for (c = 0, e = f.length; e > c; c++)
                a = f[c].replace(/^on/, ""), h[a] = !0, i[a] || (i[a] = []), i[a].push(b);
            h.noflash && d.disabled && R.call(this, "noflash", {}), h.wrongflash && d.outdated && R.call(this, "wrongflash", {flashVersion: d.version}), h.load && d.ready && R.call(this, "load", {flashVersion: d.version})
        }
        return this
    }, I.prototype.off = function(a, b) {
        var c, d, e, f, h, i = g[this.id] && g[this.id].handlers;
        if (0 === arguments.length)
            f = F(i);
        else if ("string" == typeof a && a)
            f = a.split(/\s+/);
        else if ("object" == typeof a && a && "undefined" == typeof b)
            for (c in a)
                a.hasOwnProperty(c) && "string" == typeof c && c && "function" == typeof a[c] && this.off(c, a[c]);
        if (f && f.length)
            for (c = 0, d = f.length; d > c; c++)
                if (a = f[c].toLowerCase().replace(/^on/, ""), h = i[a], h && h.length)
                    if (b)
                        for (e = x(b, h); -1 !== e; )
                            h.splice(e, 1), e = x(b, h, e);
                    else
                        i[a].length = 0;
        return this
    }, I.prototype.handlers = function(a) {
        var b, c = null, d = g[this.id] && g[this.id].handlers;
        if (d) {
            if ("string" == typeof a && a)
                return d[a] ? d[a].slice(0) : null;
            c = {};
            for (b in d)
                d.hasOwnProperty(b) && d[b] && (c[b] = d[b].slice(0))
        }
        return c
    };
    var P = function(a, b, c, d) {
        var e = g[this.id] && g[this.id].handlers[a];
        if (e && e.length) {
            var f, h, i, j = b || this;
            for (f = 0, h = e.length; h > f; f++)
                i = e[f], b = j, "string" == typeof i && "function" == typeof window[i] && (i = window[i]), "object" == typeof i && i && "function" == typeof i.handleEvent && (b = i, i = i.handleEvent), "function" == typeof i && z(i, b, c, d)
        }
        return this
    };
    I.prototype.clip = function(a) {
        a = y(a);
        for (var b = 0; b < a.length; b++)
            if (a.hasOwnProperty(b) && a[b] && 1 === a[b].nodeType) {
                a[b].zcClippingId ? -1 === x(this.id, i[a[b].zcClippingId]) && i[a[b].zcClippingId].push(this.id) : (a[b].zcClippingId = "zcClippingId_" + h++, i[a[b].zcClippingId] = [this.id], L.autoActivate === !0 && p(a[b], "mouseover", o));
                var c = g[this.id].elements;
                -1 === x(a[b], c) && c.push(a[b])
            }
        return this
    }, I.prototype.unclip = function(a) {
        var b = g[this.id];
        if (b) {
            var c, d = b.elements;
            a = "undefined" == typeof a ? d.slice(0) : y(a);
            for (var e = a.length; e--; )
                if (a.hasOwnProperty(e) && a[e] && 1 === a[e].nodeType) {
                    for (c = 0; -1 !== (c = x(a[e], d, c)); )
                        d.splice(c, 1);
                    var f = i[a[e].zcClippingId];
                    if (f) {
                        for (c = 0; -1 !== (c = x(this.id, f, c)); )
                            f.splice(c, 1);
                        0 === f.length && (L.autoActivate === !0 && q(a[e], "mouseover", o), delete a[e].zcClippingId)
                    }
                }
        }
        return this
    }, I.prototype.elements = function() {
        var a = g[this.id];
        return a && a.elements ? a.elements.slice(0) : []
    };
    var Q = function(a) {
        var b, c, d, e, f, h = [];
        if (a && 1 === a.nodeType && (b = a.zcClippingId) && i.hasOwnProperty(b) && (c = i[b], c && c.length))
            for (d = 0, e = c.length; e > d; d++)
                f = g[c[d]].instance, f && f instanceof I && h.push(f);
        return h
    };
    L.hoverClass = "zeroclipboard-is-hover", L.activeClass = "zeroclipboard-is-active", L.trustedOrigins = null, L.allowScriptAccess = null, L.useNoCache = !0, L.moviePath = "ZeroClipboard.swf", I.detectFlashSupport = function() {
        return B("ZeroClipboard.detectFlashSupport", L.debug), H()
    }, I.dispatch = function(a, b) {
        if ("string" == typeof a && a) {
            var d = a.toLowerCase().replace(/^on/, "");
            if (d)
                for (var e = c ? Q(c) : K(), f = 0, g = e.length; g > f; f++)
                    R.call(e[f], d, b)
        }
    }, I.prototype.setHandCursor = function(a) {
        return B("ZeroClipboard.prototype.setHandCursor", L.debug), a = "boolean" == typeof a ? a : !!a, J(a), L.forceHandCursor = a, this
    }, I.prototype.reposition = function() {
        return B("ZeroClipboard.prototype.reposition", L.debug), O()
    }, I.prototype.receiveEvent = function(a, b) {
        if (B("ZeroClipboard.prototype.receiveEvent", L.debug), "string" == typeof a && a) {
            var c = a.toLowerCase().replace(/^on/, "");
            c && R.call(this, c, b)
        }
    }, I.prototype.setCurrent = function(a) {
        return B("ZeroClipboard.prototype.setCurrent", L.debug), I.activate(a), this
    }, I.prototype.resetBridge = function() {
        return B("ZeroClipboard.prototype.resetBridge", L.debug), I.deactivate(), this
    }, I.prototype.setTitle = function(a) {
        if (B("ZeroClipboard.prototype.setTitle", L.debug), a = a || L.title || c && c.getAttribute("title")) {
            var b = N(d.bridge);
            b && b.setAttribute("title", a)
        }
        return this
    }, I.setDefaults = function(a) {
        B("ZeroClipboard.setDefaults", L.debug), I.config(a)
    }, I.prototype.addEventListener = function(a, b) {
        return B("ZeroClipboard.prototype.addEventListener", L.debug), this.on(a, b)
    }, I.prototype.removeEventListener = function(a, b) {
        return B("ZeroClipboard.prototype.removeEventListener", L.debug), this.off(a, b)
    }, I.prototype.ready = function() {
        return B("ZeroClipboard.prototype.ready", L.debug), d.ready === !0
    };
    var R = function(f, g) {
        f = f.toLowerCase().replace(/^on/, "");
        var h = g && g.flashVersion && a(g.flashVersion) || null, i = c, j = !0;
        switch (f) {
            case "load":
                if (h) {
                    if (!b(h))
                        return void R.call(this, "onWrongFlash", {flashVersion: h});
                    d.outdated = !1, d.ready = !0, d.version = h
                }
                break;
            case "wrongflash":
                h && !b(h) && (d.outdated = !0, d.ready = !1, d.version = h);
                break;
            case "mouseover":
                r(i, L.hoverClass);
                break;
            case "mouseout":
                L.autoActivate === !0 && I.deactivate();
                break;
            case "mousedown":
                r(i, L.activeClass);
                break;
            case "mouseup":
                s(i, L.activeClass);
                break;
            case "datarequested":
                var k = i.getAttribute("data-clipboard-target"), l = k ? document.getElementById(k) : null;
                if (l) {
                    var m = l.value || l.textContent || l.innerText;
                    m && this.setText(m)
                } else {
                    var n = i.getAttribute("data-clipboard-text");
                    n && this.setText(n)
                }
                j = !1;
                break;
            case "complete":
                G(e)
        }
        var o = i, p = [this, g];
        return P.call(this, f, o, p, j)
    };
    "function" == typeof define && define.amd ? define(["require", "exports", "module"], function(a, b, c) {
        return j = c && c.id || null, I
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? (k = module.id || null, module.exports = I) : window.ZeroClipboard = I
}(), function(a) {
    function b() {
        try {
            return h in a && a[h]
        } catch (b) {
            return !1
        }
    }
    function c(a) {
        return function() {
            var b = Array.prototype.slice.call(arguments, 0);
            b.unshift(e), j.appendChild(e), e.addBehavior("#default#userData"), e.load(h);
            var c = a.apply(f, b);
            return j.removeChild(e), c
        }
    }
    function d(a) {
        return a.replace(/^d/, "___$&").replace(m, "___")
    }
    var e, f = {}, g = a.document, h = "localStorage", i = "script";
    if (f.disabled = !1, f.set = function() {
    }, f.get = function() {
    }, f.remove = function() {
    }, f.clear = function() {
    }, f.transact = function(a, b, c) {
        var d = f.get(a);
        null == c && (c = b, b = null), "undefined" == typeof d && (d = b || {}), c(d), f.set(a, d)
    }, f.getAll = function() {
    }, f.forEach = function() {
    }, f.serialize = function(a) {
        return JSON.stringify(a)
    }, f.deserialize = function(a) {
        if ("string" != typeof a)
            return void 0;
        try {
            return JSON.parse(a)
        } catch (b) {
            return a || void 0
        }
    }, b())
        e = a[h], f.set = function(a, b) {
            return void 0 === b ? f.remove(a) : (e.setItem(a, f.serialize(b)), b)
        }, f.get = function(a) {
            return f.deserialize(e.getItem(a))
        }, f.remove = function(a) {
            e.removeItem(a)
        }, f.clear = function() {
            e.clear()
        }, f.getAll = function() {
            var a = {};
            return f.forEach(function(b, c) {
                a[b] = c
            }), a
        }, f.forEach = function(a) {
            for (var b = 0; b < e.length; b++) {
                var c = e.key(b);
                a(c, f.get(c))
            }
        };
    else if (g.documentElement.addBehavior) {
        var j, k;
        try {
            k = new ActiveXObject("htmlfile"), k.open(), k.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), k.close(), j = k.w.frames[0].document, e = j.createElement("div")
        } catch (l) {
            e = g.createElement("div"), j = g.body
        }
        var m = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        f.set = c(function(a, b, c) {
            return b = d(b), void 0 === c ? f.remove(b) : (a.setAttribute(b, f.serialize(c)), a.save(h), c)
        }), f.get = c(function(a, b) {
            return b = d(b), f.deserialize(a.getAttribute(b))
        }), f.remove = c(function(a, b) {
            b = d(b), a.removeAttribute(b), a.save(h)
        }), f.clear = c(function(a) {
            var b = a.XMLDocument.documentElement.attributes;
            a.load(h);
            for (var c, d = 0; c = b[d]; d++)
                a.removeAttribute(c.name);
            a.save(h)
        }), f.getAll = function() {
            var a = {};
            return f.forEach(function(b, c) {
                a[b] = c
            }), a
        }, f.forEach = c(function(a, b) {
            for (var c, d = a.XMLDocument.documentElement.attributes, e = 0; c = d[e]; ++e)
                b(c.name, f.deserialize(a.getAttribute(c.name)))
        })
    }
    try {
        var n = "__storejs__";
        f.set(n, n), f.get(n) != n && (f.disabled = !0), f.remove(n)
    } catch (l) {
        f.disabled = !0
    }
    f.enabled = !f.disabled, "undefined" != typeof module && module.exports ? module.exports = f : "function" == typeof define && define.amd ? define(f) : a.store = f
}(Function("return this")()), function(a) {
    "use strict";
    function b(a, b, c) {
        return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0
    }
    function c(a, b) {
        var c, d;
        for (c = 0, d = a.length; d > c; c++)
            if (a[c] === b)
                return !0;
        return !1
    }
    function d(a, b) {
        var c;
        a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), a.setSelectionRange(b, b))
    }
    function e(a, b) {
        try {
            return a.type = b, !0
        } catch (c) {
            return !1
        }
    }
    a.Placeholders = {Utils: {addEventListener: b,inArray: c,moveCaret: d,changeType: e}}
}(this), function(a) {
    "use strict";
    function b() {
    }
    function c() {
        try {
            return document.activeElement
        } catch (a) {
        }
    }
    function d(a, b) {
        var c, d, e = !!b && a.value !== b, f = a.value === a.getAttribute(H);
        return (e || f) && "true" === a.getAttribute(I) ? (a.removeAttribute(I), a.value = a.value.replace(a.getAttribute(H), ""), a.className = a.className.replace(G, ""), d = a.getAttribute(O), parseInt(d, 10) >= 0 && (a.setAttribute("maxLength", d), a.removeAttribute(O)), c = a.getAttribute(J), c && (a.type = c), !0) : !1
    }
    function e(a) {
        var b, c, d = a.getAttribute(H);
        return "" === a.value && d ? (a.setAttribute(I, "true"), a.value = d, a.className += " " + F, c = a.getAttribute(O), c || (a.setAttribute(O, a.maxLength), a.removeAttribute("maxLength")), b = a.getAttribute(J), b ? a.type = "text" : "password" === a.type && T.changeType(a, "text") && a.setAttribute(J, "password"), !0) : !1
    }
    function f(a, b) {
        var c, d, e, f, g, h, i;
        if (a && a.getAttribute(H))
            b(a);
        else
            for (e = a ? a.getElementsByTagName("input") : p, f = a ? a.getElementsByTagName("textarea") : q, c = e ? e.length : 0, d = f ? f.length : 0, i = 0, h = c + d; h > i; i++)
                g = c > i ? e[i] : f[i - c], b(g)
    }
    function g(a) {
        f(a, d)
    }
    function h(a) {
        f(a, e)
    }
    function i(a) {
        return function() {
            r && a.value === a.getAttribute(H) && "true" === a.getAttribute(I) ? T.moveCaret(a, 0) : d(a)
        }
    }
    function j(a) {
        return function() {
            e(a)
        }
    }
    function k(a) {
        return function(b) {
            return t = a.value, "true" === a.getAttribute(I) && t === a.getAttribute(H) && T.inArray(D, b.keyCode) ? (b.preventDefault && b.preventDefault(), !1) : void 0
        }
    }
    function l(a) {
        return function() {
            d(a, t), "" === a.value && (a.blur(), T.moveCaret(a, 0))
        }
    }
    function m(a) {
        return function() {
            a === c() && a.value === a.getAttribute(H) && "true" === a.getAttribute(I) && T.moveCaret(a, 0)
        }
    }
    function n(a) {
        return function() {
            g(a)
        }
    }
    function o(a) {
        a.form && (y = a.form, "string" == typeof y && (y = document.getElementById(y)), y.getAttribute(K) || (T.addEventListener(y, "submit", n(y)), y.setAttribute(K, "true"))), T.addEventListener(a, "focus", i(a)), T.addEventListener(a, "blur", j(a)), r && (T.addEventListener(a, "keydown", k(a)), T.addEventListener(a, "keyup", l(a)), T.addEventListener(a, "click", m(a))), a.setAttribute(L, "true"), a.setAttribute(H, w), (r || a !== c()) && e(a)
    }
    var p, q, r, s, t, u, v, w, x, y, z, A, B, C = ["text", "search", "url", "tel", "email", "password", "number", "textarea"], D = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], E = "#ccc", F = "placeholdersjs", G = RegExp("(?:^|\\s)" + F + "(?!\\S)"), H = "data-placeholder-value", I = "data-placeholder-active", J = "data-placeholder-type", K = "data-placeholder-submit", L = "data-placeholder-bound", M = "data-placeholder-focus", N = "data-placeholder-live", O = "data-placeholder-maxlength", P = document.createElement("input"), Q = document.getElementsByTagName("head")[0], R = document.documentElement, S = a.Placeholders, T = S.Utils;
    if (S.nativeSupport = void 0 !== P.placeholder, !S.nativeSupport) {
        for (p = document.getElementsByTagName("input"), q = document.getElementsByTagName("textarea"), r = "false" === R.getAttribute(M), s = "false" !== R.getAttribute(N), u = document.createElement("style"), u.type = "text/css", v = document.createTextNode("." + F + " { color:" + E + "; }"), u.styleSheet ? u.styleSheet.cssText = v.nodeValue : u.appendChild(v), Q.insertBefore(u, Q.firstChild), B = 0, A = p.length + q.length; A > B; B++)
            z = p.length > B ? p[B] : q[B - p.length], w = z.attributes.placeholder, w && (w = w.nodeValue, w && T.inArray(C, z.type) && o(z));
        x = setInterval(function() {
            for (B = 0, A = p.length + q.length; A > B; B++)
                z = p.length > B ? p[B] : q[B - p.length], w = z.attributes.placeholder, w ? (w = w.nodeValue, w && T.inArray(C, z.type) && (z.getAttribute(L) || o(z), (w !== z.getAttribute(H) || "password" === z.type && !z.getAttribute(J)) && ("password" === z.type && !z.getAttribute(J) && T.changeType(z, "text") && z.setAttribute(J, "password"), z.value === z.getAttribute(H) && (z.value = w), z.setAttribute(H, w)))) : z.getAttribute(I) && (d(z), z.removeAttribute(H));
            s || clearInterval(x)
        }, 100)
    }
    T.addEventListener(a, "beforeunload", function() {
        S.disable()
    }), S.disable = S.nativeSupport ? b : g, S.enable = S.nativeSupport ? b : h
}(this), function(a, b) {
    "use strict";
    var c = a.History = a.History || {};
    if ("undefined" != typeof c.Adapter)
        throw new Error("History.js Adapter has already been loaded...");
    c.Adapter = {handlers: {},_uid: 1,uid: function(a) {
            return a._uid || (a._uid = c.Adapter._uid++)
        },bind: function(a, b, d) {
            var e = c.Adapter.uid(a);
            c.Adapter.handlers[e] = c.Adapter.handlers[e] || {}, c.Adapter.handlers[e][b] = c.Adapter.handlers[e][b] || [], c.Adapter.handlers[e][b].push(d), a["on" + b] = function(a, b) {
                return function(d) {
                    c.Adapter.trigger(a, b, d)
                }
            }(a, b)
        },trigger: function(a, b, d) {
            d = d || {};
            var e, f, g = c.Adapter.uid(a);
            for (c.Adapter.handlers[g] = c.Adapter.handlers[g] || {}, c.Adapter.handlers[g][b] = c.Adapter.handlers[g][b] || [], e = 0, f = c.Adapter.handlers[g][b].length; f > e; ++e)
                c.Adapter.handlers[g][b][e].apply(this, [d])
        },extractEventData: function(a, c) {
            var d = c && c[a] || b;
            return d
        },onDomLoad: function(b) {
            var c = a.setTimeout(function() {
                b()
            }, 2e3);
            a.onload = function() {
                clearTimeout(c), b()
            }
        }}, "undefined" != typeof c.init && c.init()
}(window), function(a, b) {
    "use strict";
    var c = a.console || b, d = a.document, e = a.navigator, f = !1, g = a.setTimeout, h = a.clearTimeout, i = a.setInterval, j = a.clearInterval, k = a.JSON, l = a.alert, m = a.History = a.History || {}, n = a.history;
    try {
        f = a.sessionStorage, f.setItem("TEST", "1"), f.removeItem("TEST")
    } catch (o) {
        f = !1
    }
    if (k.stringify = k.stringify || k.encode, k.parse = k.parse || k.decode, "undefined" != typeof m.init)
        throw new Error("History.js Core has already been loaded...");
    m.init = function() {
        return "undefined" == typeof m.Adapter ? !1 : ("undefined" != typeof m.initCore && m.initCore(), "undefined" != typeof m.initHtml4 && m.initHtml4(), !0)
    }, m.initCore = function() {
        if ("undefined" != typeof m.initCore.initialized)
            return !1;
        if (m.initCore.initialized = !0, m.options = m.options || {}, m.options.hashChangeInterval = m.options.hashChangeInterval || 100, m.options.safariPollInterval = m.options.safariPollInterval || 500, m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500, m.options.disableSuid = m.options.disableSuid || !1, m.options.storeInterval = m.options.storeInterval || 1e3, m.options.busyDelay = m.options.busyDelay || 250, m.options.debug = m.options.debug || !1, m.options.initialTitle = m.options.initialTitle || d.title, m.options.html4Mode = m.options.html4Mode || !1, m.options.delayInit = m.options.delayInit || !1, m.intervalList = [], m.clearAllIntervals = function() {
            var a, b = m.intervalList;
            if ("undefined" != typeof b && null !== b) {
                for (a = 0; a < b.length; a++)
                    j(b[a]);
                m.intervalList = null
            }
        }, m.debug = function() {
            m.options.debug && m.log.apply(m, arguments)
        }, m.log = function() {
            var a, b, e, f, g, h = !("undefined" == typeof c || "undefined" == typeof c.log || "undefined" == typeof c.log.apply), i = d.getElementById("log");
            for (h ? (f = Array.prototype.slice.call(arguments), a = f.shift(), "undefined" != typeof c.debug ? c.debug.apply(c, [a, f]) : c.log.apply(c, [a, f])) : a = "\n" + arguments[0] + "\n", b = 1, e = arguments.length; e > b; ++b) {
                if (g = arguments[b], "object" == typeof g && "undefined" != typeof k)
                    try {
                        g = k.stringify(g)
                    } catch (j) {
                    }
                a += "\n" + g + "\n"
            }
            return i ? (i.value += a + "\n-----\n", i.scrollTop = i.scrollHeight - i.clientHeight) : h || l(a), !0
        }, m.getInternetExplorerMajorVersion = function() {
            var a = m.getInternetExplorerMajorVersion.cached = "undefined" != typeof m.getInternetExplorerMajorVersion.cached ? m.getInternetExplorerMajorVersion.cached : function() {
                for (var a = 3, b = d.createElement("div"), c = b.getElementsByTagName("i"); (b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0]; )
                    ;
                return a > 4 ? a : !1
            }();
            return a
        }, m.isInternetExplorer = function() {
            var a = m.isInternetExplorer.cached = "undefined" != typeof m.isInternetExplorer.cached ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
            return a
        }, m.emulated = m.options.html4Mode ? {pushState: !0,hashChange: !0} : {pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent))),hashChange: Boolean(!("onhashchange" in a || "onhashchange" in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)}, m.enabled = !m.emulated.pushState, m.bugs = {setHash: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)}, m.isEmptyObject = function(a) {
            for (var b in a)
                if (a.hasOwnProperty(b))
                    return !1;
            return !0
        }, m.cloneObject = function(a) {
            var b, c;
            return a ? (b = k.stringify(a), c = k.parse(b)) : c = {}, c
        }, m.getRootUrl = function() {
            var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
            return d.location.port && (a += ":" + d.location.port), a += "/"
        }, m.getBaseHref = function() {
            var a = d.getElementsByTagName("base"), b = null, c = "";
            return 1 === a.length && (b = a[0], c = b.href.replace(/[^\/]+$/, "")), c = c.replace(/\/+$/, ""), c && (c += "/"), c
        }, m.getBaseUrl = function() {
            var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
            return a
        }, m.getPageUrl = function() {
            var a, b = m.getState(!1, !1), c = (b || {}).url || m.getLocationHref();
            return a = c.replace(/\/+$/, "").replace(/[^\/]+$/, function(a) {
                return /\./.test(a) ? a : a + "/"
            })
        }, m.getBasePageUrl = function() {
            var a = m.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a) {
                return /[^\/]$/.test(a) ? "" : a
            }).replace(/\/+$/, "") + "/";
            return a
        }, m.getFullUrl = function(a, b) {
            var c = a, d = a.substring(0, 1);
            return b = "undefined" == typeof b ? !0 : b, /[a-z]+\:\/\//.test(a) || (c = "/" === d ? m.getRootUrl() + a.replace(/^\/+/, "") : "#" === d ? m.getPageUrl().replace(/#.*/, "") + a : "?" === d ? m.getPageUrl().replace(/[\?#].*/, "") + a : b ? m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")), c.replace(/\#$/, "")
        }, m.getShortUrl = function(a) {
            var b = a, c = m.getBaseUrl(), d = m.getRootUrl();
            return m.emulated.pushState && (b = b.replace(c, "")), b = b.replace(d, "/"), m.isTraditionalAnchor(b) && (b = "./" + b), b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }, m.getLocationHref = function(a) {
            return a = a || d, a.URL === a.location.href ? a.location.href : a.location.href === decodeURIComponent(a.URL) ? a.URL : a.location.hash && decodeURIComponent(a.location.href.replace(/^[^#]+/, "")) === a.location.hash ? a.location.href : -1 == a.URL.indexOf("#") && -1 != a.location.href.indexOf("#") ? a.location.href : a.URL || a.location.href
        }, m.store = {}, m.idToState = m.idToState || {}, m.stateToId = m.stateToId || {}, m.urlToId = m.urlToId || {}, m.storedStates = m.storedStates || [], m.savedStates = m.savedStates || [], m.normalizeStore = function() {
            m.store.idToState = m.store.idToState || {}, m.store.urlToId = m.store.urlToId || {}, m.store.stateToId = m.store.stateToId || {}
        }, m.getState = function(a, b) {
            "undefined" == typeof a && (a = !0), "undefined" == typeof b && (b = !0);
            var c = m.getLastSavedState();
            return !c && b && (c = m.createStateObject()), a && (c = m.cloneObject(c), c.url = c.cleanUrl || c.url), c
        }, m.getIdByState = function(a) {
            var b, c = m.extractId(a.url);
            if (!c)
                if (b = m.getStateString(a), "undefined" != typeof m.stateToId[b])
                    c = m.stateToId[b];
                else if ("undefined" != typeof m.store.stateToId[b])
                    c = m.store.stateToId[b];
                else {
                    for (; ; )
                        if (c = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" == typeof m.idToState[c] && "undefined" == typeof m.store.idToState[c])
                            break;
                    m.stateToId[b] = c, m.idToState[c] = a
                }
            return c
        }, m.normalizeState = function(a) {
            var b, c;
            return a && "object" == typeof a || (a = {}), "undefined" != typeof a.normalized ? a : (a.data && "object" == typeof a.data || (a.data = {}), b = {}, b.normalized = !0, b.title = a.title || "", b.url = m.getFullUrl(a.url ? a.url : m.getLocationHref()), b.hash = m.getShortUrl(b.url), b.data = m.cloneObject(a.data), b.id = m.getIdByState(b), b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""), b.url = b.cleanUrl, c = !m.isEmptyObject(b.data), (b.title || c) && m.options.disableSuid !== !0 && (b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""), /\?/.test(b.hash) || (b.hash += "?"), b.hash += "&_suid=" + b.id), b.hashedUrl = m.getFullUrl(b.hash), (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl), b)
        }, m.createStateObject = function(a, b, c) {
            var d = {data: a,title: b,url: c};
            return d = m.normalizeState(d)
        }, m.getStateById = function(a) {
            a = String(a);
            var c = m.idToState[a] || m.store.idToState[a] || b;
            return c
        }, m.getStateString = function(a) {
            var b, c, d;
            return b = m.normalizeState(a), c = {data: b.data,title: a.title,url: a.url}, d = k.stringify(c)
        }, m.getStateId = function(a) {
            var b, c;
            return b = m.normalizeState(a), c = b.id
        }, m.getHashByState = function(a) {
            var b, c;
            return b = m.normalizeState(a), c = b.hash
        }, m.extractId = function(a) {
            var b, c, d, e;
            return e = -1 != a.indexOf("#") ? a.split("#")[0] : a, c = /(.*)\&_suid=([0-9]+)$/.exec(e), d = c ? c[1] || a : a, b = c ? String(c[2] || "") : "", b || !1
        }, m.isTraditionalAnchor = function(a) {
            var b = !/[\/\?\.]/.test(a);
            return b
        }, m.extractState = function(a, b) {
            var c, d, e = null;
            return b = b || !1, c = m.extractId(a), c && (e = m.getStateById(c)), e || (d = m.getFullUrl(a), c = m.getIdByUrl(d) || !1, c && (e = m.getStateById(c)), e || !b || m.isTraditionalAnchor(a) || (e = m.createStateObject(null, null, d))), e
        }, m.getIdByUrl = function(a) {
            var c = m.urlToId[a] || m.store.urlToId[a] || b;
            return c
        }, m.getLastSavedState = function() {
            return m.savedStates[m.savedStates.length - 1] || b
        }, m.getLastStoredState = function() {
            return m.storedStates[m.storedStates.length - 1] || b
        }, m.hasUrlDuplicate = function(a) {
            var b, c = !1;
            return b = m.extractState(a.url), c = b && b.id !== a.id
        }, m.storeState = function(a) {
            return m.urlToId[a.url] = a.id, m.storedStates.push(m.cloneObject(a)), a
        }, m.isLastSavedState = function(a) {
            var b, c, d, e = !1;
            return m.savedStates.length && (b = a.id, c = m.getLastSavedState(), d = c.id, e = b === d), e
        }, m.saveState = function(a) {
            return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)), !0)
        }, m.getStateByIndex = function(a) {
            var b = null;
            return b = "undefined" == typeof a ? m.savedStates[m.savedStates.length - 1] : 0 > a ? m.savedStates[m.savedStates.length + a] : m.savedStates[a]
        }, m.getCurrentIndex = function() {
            var a = null;
            return a = m.savedStates.length < 1 ? 0 : m.savedStates.length - 1
        }, m.getHash = function(a) {
            var b, c = m.getLocationHref(a);
            return b = m.getHashByUrl(c)
        }, m.unescapeHash = function(a) {
            var b = m.normalizeHash(a);
            return b = decodeURIComponent(b)
        }, m.normalizeHash = function(a) {
            var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
            return b
        }, m.setHash = function(a, b) {
            var c, e;
            return b !== !1 && m.busy() ? (m.pushQueue({scope: m,callback: m.setHash,args: arguments,queue: b}), !1) : (m.busy(!0), c = m.extractState(a, !0), c && !m.emulated.pushState ? m.pushState(c.data, c.title, c.url, !1) : m.getHash() !== a && (m.bugs.setHash ? (e = m.getPageUrl(), m.pushState(null, null, e + "#" + a, !1)) : d.location.hash = a), m)
        }, m.escapeHash = function(b) {
            var c = m.normalizeHash(b);
            return c = a.encodeURIComponent(c), m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), c
        }, m.getHashByUrl = function(a) {
            var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return b = m.unescapeHash(b)
        }, m.setTitle = function(a) {
            var b, c = a.title;
            c || (b = m.getStateByIndex(0), b && b.url === a.url && (c = b.title || m.options.initialTitle));
            try {
                d.getElementsByTagName("title")[0].innerHTML = c.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (e) {
            }
            return d.title = c, m
        }, m.queues = [], m.busy = function(a) {
            if ("undefined" != typeof a ? m.busy.flag = a : "undefined" == typeof m.busy.flag && (m.busy.flag = !1), !m.busy.flag) {
                h(m.busy.timeout);
                var b = function() {
                    var a, c, d;
                    if (!m.busy.flag)
                        for (a = m.queues.length - 1; a >= 0; --a)
                            c = m.queues[a], 0 !== c.length && (d = c.shift(), m.fireQueueItem(d), m.busy.timeout = g(b, m.options.busyDelay))
                };
                m.busy.timeout = g(b, m.options.busyDelay)
            }
            return m.busy.flag
        }, m.busy.flag = !1, m.fireQueueItem = function(a) {
            return a.callback.apply(a.scope || m, a.args || [])
        }, m.pushQueue = function(a) {
            return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [], m.queues[a.queue || 0].push(a), m
        }, m.queue = function(a, b) {
            return "function" == typeof a && (a = {callback: a}), "undefined" != typeof b && (a.queue = b), m.busy() ? m.pushQueue(a) : m.fireQueueItem(a), m
        }, m.clearQueue = function() {
            return m.busy.flag = !1, m.queues = [], m
        }, m.stateChanged = !1, m.doubleChecker = !1, m.doubleCheckComplete = function() {
            return m.stateChanged = !0, m.doubleCheckClear(), m
        }, m.doubleCheckClear = function() {
            return m.doubleChecker && (h(m.doubleChecker), m.doubleChecker = !1), m
        }, m.doubleCheck = function(a) {
            return m.stateChanged = !1, m.doubleCheckClear(), m.bugs.ieDoubleCheck && (m.doubleChecker = g(function() {
                return m.doubleCheckClear(), m.stateChanged || a(), !0
            }, m.options.doubleCheckInterval)), m
        }, m.safariStatePoll = function() {
            var b, c = m.extractState(m.getLocationHref());
            if (!m.isLastSavedState(c))
                return b = c, b || (b = m.createStateObject()), m.Adapter.trigger(a, "popstate"), m
        }, m.back = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({scope: m,callback: m.back,args: arguments,queue: a}), !1) : (m.busy(!0), m.doubleCheck(function() {
                m.back(!1)
            }), n.go(-1), !0)
        }, m.forward = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({scope: m,callback: m.forward,args: arguments,queue: a}), !1) : (m.busy(!0), m.doubleCheck(function() {
                m.forward(!1)
            }), n.go(1), !0)
        }, m.go = function(a, b) {
            var c;
            if (a > 0)
                for (c = 1; a >= c; ++c)
                    m.forward(b);
            else {
                if (!(0 > a))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (c = -1; c >= a; --c)
                    m.back(b)
            }
            return m
        }, m.emulated.pushState) {
            var o = function() {
            };
            m.pushState = m.pushState || o, m.replaceState = m.replaceState || o
        } else
            m.onPopState = function(b, c) {
                var d, e, f = !1, g = !1;
                return m.doubleCheckComplete(), (d = m.getHash()) ? (e = m.extractState(d || m.getLocationHref(), !0), e ? m.replaceState(e.data, e.title, e.url, !1) : (m.Adapter.trigger(a, "anchorchange"), m.busy(!1)), m.expectedStateId = !1, !1) : (f = m.Adapter.extractEventData("state", b, c) || !1, g = f ? m.getStateById(f) : m.expectedStateId ? m.getStateById(m.expectedStateId) : m.extractState(m.getLocationHref()), g || (g = m.createStateObject(null, null, m.getLocationHref())), m.expectedStateId = !1, m.isLastSavedState(g) ? (m.busy(!1), !1) : (m.storeState(g), m.saveState(g), m.setTitle(g), m.Adapter.trigger(a, "statechange"), m.busy(!1), !0))
            }, m.Adapter.bind(a, "popstate", m.onPopState), m.pushState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({scope: m,callback: m.pushState,args: arguments,queue: e}), !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0
            }, m.replaceState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({scope: m,callback: m.replaceState,args: arguments,queue: e}), !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0
            };
        if (f) {
            try {
                m.store = k.parse(f.getItem("History.store")) || {}
            } catch (p) {
                m.store = {}
            }
            m.normalizeStore()
        } else
            m.store = {}, m.normalizeStore();
        m.Adapter.bind(a, "unload", m.clearAllIntervals), m.saveState(m.storeState(m.extractState(m.getLocationHref(), !0))), f && (m.onUnload = function() {
            var a, b, c;
            try {
                a = k.parse(f.getItem("History.store")) || {}
            } catch (d) {
                a = {}
            }
            a.idToState = a.idToState || {}, a.urlToId = a.urlToId || {}, a.stateToId = a.stateToId || {};
            for (b in m.idToState)
                m.idToState.hasOwnProperty(b) && (a.idToState[b] = m.idToState[b]);
            for (b in m.urlToId)
                m.urlToId.hasOwnProperty(b) && (a.urlToId[b] = m.urlToId[b]);
            for (b in m.stateToId)
                m.stateToId.hasOwnProperty(b) && (a.stateToId[b] = m.stateToId[b]);
            m.store = a, m.normalizeStore(), c = k.stringify(a);
            try {
                f.setItem("History.store", c)
            } catch (e) {
                if (e.code !== DOMException.QUOTA_EXCEEDED_ERR)
                    throw e;
                f.length && (f.removeItem("History.store"), f.setItem("History.store", c))
            }
        }, m.intervalList.push(i(m.onUnload, m.options.storeInterval)), m.Adapter.bind(a, "beforeunload", m.onUnload), m.Adapter.bind(a, "unload", m.onUnload)), m.emulated.pushState || (m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval)), ("Apple Computer, Inc." === e.vendor || "Mozilla" === (e.appCodeName || "")) && (m.Adapter.bind(a, "hashchange", function() {
            m.Adapter.trigger(a, "popstate")
        }), m.getHash() && m.Adapter.onDomLoad(function() {
            m.Adapter.trigger(a, "hashchange")
        })))
    }, m.options && m.options.delayInit || m.init()
}(window), function(a) {
    "use strict";
    var b = {};
    b.match = function(a, c, d) {
console.log(a);
        var e = [], f = null, g = null, h = null;
        if (!a)
            return void d(f, e);
	if ($('#engine').val() == "pcre") {
		$.post("pcre.php",{regex: a, string: c})
		.done(function(data) {
			var matches = JSON.parse(data);
//console.log(matches);
			var newArray = [];
			for (var ai = 0; ai < matches.length; ai++) {
				var size = 0, key;
				var newArrayTwo = [];
				for (key in matches[ai]) {
					if (matches[ai].hasOwnProperty(key)) size++;
				}

				for (var aj = 0; aj < size-1; aj++) {
//console.log(matches[ai][aj]);
					newArrayTwo.push(matches[ai][aj]);
				}
//			console.log(newArrayTwo);
				newArray.push(newArrayTwo);
				newArray[ai].index = matches[ai][9999];
				newArray[ai].end = (h = newArray[ai].index + newArray[ai][0].length) - 1;
			}
	//		console.log(newArray);
			d(f,newArray)
		});
	}
        else if (!window.Worker)
            b.worker && (clearTimeout(b.id), b.worker.terminate()), b.worker = new Worker("js/regExWorker.template.js"), b.worker.onmessage = function(a) {
                "onload" == a.data ? b.id = setTimeout(function() {
                    d("timeout", e), b.worker.terminate()
                }, 250) : (e = a.data.matches, f = a.data.error, clearTimeout(b.id), d(f, e))
            }, b.worker.postMessage({regex: a,str: c});
        else {
            for (; !f && (g = a.exec(c)); ) {
                if (a.global && h === a.lastIndex) {
                    f = "infinite";
                    break
                }
                if (g.end = (h = g.index + g[0].length) - 1, g.input = null, e.push(g), !a.global)
                    break
            }
            d(f, e)
        }
    }, a.RegExJS = b
}(window), this.createjs = this.createjs || {}, function() {
    "use strict";
    var a = function(a, b, c) {
        this.initialize(a, b, c)
    }, b = a.prototype;
    b.type = null, b.target = null, b.currentTarget = null, b.eventPhase = 0, b.bubbles = !1, b.cancelable = !1, b.timeStamp = 0, b.defaultPrevented = !1, b.propagationStopped = !1, b.immediatePropagationStopped = !1, b.removed = !1, b.initialize = function(a, b, c) {
        this.type = a, this.bubbles = b, this.cancelable = c, this.timeStamp = (new Date).getTime()
    }, b.preventDefault = function() {
        this.defaultPrevented = !0
    }, b.stopPropagation = function() {
        this.propagationStopped = !0
    }, b.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }, b.remove = function() {
        this.removed = !0
    }, b.clone = function() {
        return new a(this.type, this.bubbles, this.cancelable)
    }, b.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }, createjs.Event = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    var a = function() {
    }, b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent, a.willTrigger = b.willTrigger
    }, b._listeners = null, b._captureListeners = null, b.initialize = function() {
    }, b.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
    }, b.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function(a) {
            b.call(c, a, e), d && a.remove()
        }, f)
    }, b.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == b) {
                        1 == g ? delete d[a] : e.splice(f, 1);
                        break
                    }
        }
    }, b.off = b.removeEventListener, b.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }, b.dispatchEvent = function(a, b) {
        if ("string" == typeof a) {
            var c = this._listeners;
            if (!c || !c[a])
                return !1;
            a = new createjs.Event(a)
        }
        try {
            a.target = b || this
        } catch (d) {
        }
        if (a.bubbles && this.parent) {
            for (var e = this, f = [e]; e.parent; )
                f.push(e = e.parent);
            var g, h = f.length;
            for (g = h - 1; g >= 0 && !a.propagationStopped; g--)
                f[g]._dispatchEvent(a, 1 + (0 == g));
            for (g = 1; h > g && !a.propagationStopped; g++)
                f[g]._dispatchEvent(a, 3)
        } else
            this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }, b.hasEventListener = function(a) {
        var b = this._listeners, c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }, b.willTrigger = function(a) {
        for (var b = this; b; ) {
            if (b.hasEventListener(a))
                return !0;
            b = b.parent
        }
        return !1
    }, b.toString = function() {
        return "[EventDispatcher]"
    }, b._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length))
                return;
            try {
                a.currentTarget = this
            } catch (f) {
            }
            try {
                a.eventPhase = b
            } catch (f) {
            }
            a.removed = !1, e = e.slice();
            for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
                var h = e[g];
                h.handleEvent ? h.handleEvent(a) : h(a), a.removed && (this.off(a.type, h, 1 == b), a.removed = !1)
            }
        }
    }, createjs.EventDispatcher = a
}();
var Utils = {}, dan = Utils;
Utils.timeoutIDs = {}, Utils.el = function(a, b) {
    return (b || document.body).querySelector(a)
}, Utils.els = function(a, b) {
    return (b || document.body).querySelectorAll(a)
}, Utils.removeClass = function(a, b) {
    for (var c = b.split(" "), d = 0; d < c.length; d++)
        a.classList.remove(c[d]);
    return a
}, Utils.addClass = function(a, b) {
    Utils.removeClass(a, b);
    for (var c = b.split(" "), d = 0; d < c.length; d++)
        a.classList.add(c[d]);
    return a
}, Utils.swapClass = function(a, b, c) {
    Utils.removeClass(a, b), Utils.addClass(a, c)
}, Utils.remove = function(a) {
    a.remove ? a.remove() : a.parentNode.removeChild(a)
}, Utils.animate = function(a, b, c) {
    return new Promise(function(d) {
        Utils.addClass(a, b), setTimeout(function() {
            var b = new TransitionEvents(a);
            b.on(TransitionEvents.TRANSISTION_END, function(e) {
                b.removeAllEventListeners(TransitionEvents.TRANSISTION_END), e.target.el.classList.contains(c) && d(a)
            }), Utils.addClass(a, c)
        }, 1)
    })
}, Utils.addCopyListener = function(a, b) {
    var c = !1, d = function(e) {
        (91 == e.which || e.metaKey || "Meta" == e.keyName) && (c = !0), 67 == e.which && c && (a.removeEventListener("keydown", d), b())
    }, e = function(c) {
        (91 == c.which || c.metaKey || "Meta" == c.keyName) && (a.removeEventListener("keydown", d), a.removeEventListener("keyup", e), dan.addCopyListener(a, b))
    };
    a.addEventListener("keydown", d), a.addEventListener("keyup", e)
}, Utils.hasClass = function(a, b) {
    var c = new RegExp("\\b\\s?" + b + "\\b", "g");
    return !!a.className.match(c)
}, Utils.fillTags = function(a, b, c) {
    for (var d, e, f; d = a.match(/{{[\w.()]+}}/); ) {
        e = d[0].substring(2, d[0].length - 2);
        var g = e.match(/\([\w.]*\)/);
        g ? (f = e.substr(0, g.index), e = g[0].substring(1, g[0].length - 1)) : f = null;
        for (var h = b, i = e.split("."), j = 0; j < i.length; j++) {
            var k = i[j];
            k && (h = h[k])
        }
        e = h, f && (e = c[f](e)), a = a.replace(d[0], e)
    }
    return a
}, Utils.bind = function(a, b) {
    return function() {
        return b.apply(a, Array.prototype.slice.call(arguments))
    }
}, Utils.deferF = function(a, b, c, d) {
    d = isNaN(d) || null == d ? 1 : d;
    var e = Utils.timeoutIDs;
    return function() {
        clearTimeout(e[c]), e[c] = setTimeout(Utils.bind(a, b), d)
    }
}, Utils.clearDefer = function(a) {
    var b = Utils.timeoutIDs;
    clearTimeout(b[a]), delete b[a]
}, Utils.defer = function(a, b, c, d) {
    Utils.deferF(a, b, c, d)()
}, Utils.populateSelector = function(a, b) {
    for (var c = [], d = 0; d < b.length; d++) {
        var e = b[d], f = e.label || e, g = e.value || e;
        c.push(e.selected ? "<option selected id='" + g + "'>" + f + "</option>" : "<option id='" + g + "'>" + f + "</option>")
    }
    a.innerHTML = c.join("")
}, Utils.isSupported = function() {
    return dan.isCanvasSupported() && dan.isCalcSupported()
}, Utils.partialSupport = function() {
    return Utils.isSupported() && (null != dan.iosType() || dan.isAndroid()) ? !0 : !1
}, Utils.isCalcSupported = function() {
    return this.checkCalc("-webkit-") || this.checkCalc("-moz-") || this.checkCalc()
}, Utils.isCanvasSupported = function() {
    var a = document.createElement("canvas");
    return !(!a.getContext || !a.getContext("2d"))
}, Utils.isIE = function() {
    var a = /MSIE/gi.test(navigator.userAgent);
    return a
}, Utils.isFirefox = function() {
    var a = /Firefox/gi.test(navigator.userAgent);
    return a
}, Utils.isAndroid = function() {
    var a = /android/gi.test(navigator.userAgent);
    return a
}, Utils.iosType = function() {
    var a = null, b = window.navigator, c = "platform" in b;
    return c && (a = b.platform.match(/iphone|ipod|ipad/gi), a && a[0] && (a = a[0].toLowerCase())), a
}, Utils.iosVersion = function() {
    var a = window.navigator, b = /(?:iPhone\sOS\s)([0-9_]+)/g.exec(a.appVersion);
    return b = b && b[1] ? Number(b[1].replace("_", ".")) : null
}, Utils.checkCalc = function(a) {
    a = a || "";
    var b = document.createElement("div");
    return b.style.cssText = "width: " + a + "calc(1px);", !!b.style.length
}, Utils.parsePattern = function(a) {
    var b = a.match(/\/(.+)(?:\/)([igmxXsuUAJ]+)?$/);
    return b ? {ex: b[1],flags: b[2] || ""} : {ex: a,flags: ""}
}, Utils.createID = function(a) {
    return 0 > a ? null : (3 * (Number(a) + 1e6)).toString(32)
}, Utils.idToNumber = function(a) {
    return parseInt(a, 32) / 3 - 1e6
}, Utils.isIDValid = function(a) {
    var b = Utils.idToNumber(a);
    return b % 1 === 0
}, Utils.createURL = function(a) {
    return "http://regexr.com/" + a
}, Utils.isMac = function() {
    return !!navigator.userAgent.match(/Mac\sOS/i)
}, Utils.getCtrlKey = function() {
    return Utils.isMac() ? "Cmd" : "Ctrl"
}, Utils.empty = function(a) {
    for (; a.firstChild; )
        a.removeChild(a.firstChild)
}, Utils.html = function(a, b) {
    var c = document.createElement("div");
    return c.innerHTML = a, b !== !0 ? c.firstChild : c
}, function() {
    "use strict";
    var a = {};
    a.page = function(a) {
        ga("send", "pageview", "/" + a)
    }, a.event = function(a, b, c) {
        ga("send", "event", a, b, c)
    }, window.Tracking = a
}(), function() {
    var a = {};
    createjs.EventDispatcher.initialize(a), a._currentPath = null, a._currentLocation = null, a.go = function(b) {
//        a._currentPath !== b && (a._currentPath = b, window.history.pushState ? History.pushState(null, null, b || "/") : window.location.hash = b || "", a._currentLocation = document.location.toString())
    }, a.init = function() {
        History.init(), window.history.pushState ? History.Adapter.bind(window, "statechange", dan.bind(a, a.handleHistoryChange)) : window.addEventListener("hashchange", dan.bind(a, a.handleHashChange))
    }, a.handleHistoryChange = function() {
        a.dispatchEvent("change")
    }, a.handleHashChange = function() {
        var b = document.location.hash.substr(1);
        a._currentPath !== b && (a._currentPath = b, a.dispatchEvent("change"))
    }, window.BrowserHistory = a
}(), function(a) {
    "use strict";
    var b = function(a, b) {
        this.init(a, b)
    }, c = b.prototype = Object.create(createjs.Event.prototype);
    b.prototype.constructor = b, c.init = function(a, b) {
        this.data = b, this.initialize(a)
    }, a.DataEvent = b
}(window), function(a) {
    var b = function(a) {
        this.init(a)
    }, c = b.prototype, d = b;
    createjs.EventDispatcher.initialize(c), d.TRANSISTION_END = "end", d.TRANSISTION_START = "start", d.TRANSISTION_ITERATION = "interation", c._endDelay, c._startDelay, c._intDelay, c.init = function(a) {
        this.el = a;
        var b = ["webkitTransitionEnd", "oTransitionEnd", "otransitionend", "transitionend", "webkitAnimationEnd", "animationend", "oanimationend", "MSAnimationEnd"], c = ["animationiteration", "oanimationiteration", "MSAnimationIteration"];
        this.endEventProxy = dan.bind(this, this.handleEndEvent);
        for (var d = 0; d < b.length; d++)
            this.el.addEventListener(b[d], this.endEventProxy);
        for (var e = dan.bind(this, this.handleIterationEvent), d = 0; d < c.length; d++)
            this.el.addEventListener(c[d], e);
        for (var f = dan.bind(this, this.handleStartEvent), d = 0; d < c.length; d++)
            this.el.addEventListener(c[d], f)
    }, c.handleIterationEvent = function() {
        this._intDelay && clearTimeout(this._intDelay);
        var a = this;
        this._intDelay = setTimeout(function() {
            a.dispatchEvent(new createjs.Event(d.TRANSISTION_ITERATION))
        }, 1)
    }, c.handleStartEvent = function() {
        this._startDelay && clearTimeout(this._startDelay);
        var a = this;
        this._startDelay = setTimeout(function() {
            a.dispatchEvent(new createjs.Event(d.TRANSISTION_START))
        }, 1)
    }, c.handleEndEvent = function() {
        this._endDelay && clearTimeout(this._endDelay);
        var a = this;
        this._endDelay = setTimeout(function() {
            a.dispatchEvent(new createjs.Event(d.TRANSISTION_END))
        }, 100)
    }, a.TransitionEvents = d
}(window), function(a) {
    "use strict";
    var b = {};
    b._values = {}, createjs.EventDispatcher.initialize(b), b.setRating = function(a, c) {
        b._saveValue("r" + a, c)
    }, b.getRating = function(a) {
        return b._geValue("r" + a) || 0
    }, b.setFavorite = function(a, c) {
        c ? b._saveValue("f" + a, 1) : (store.remove("f" + a), b.dispatchEvent(new DataEvent("change", {type: "f" + a,value: c})))
    }, b.getFavorite = function(a) {
        return 1 == b._geValue("f" + a) ? !0 : !1
    }, b.getAllFavorites = function() {
        return b.getAllByType("f")
    }, b.getAllByType = function(a) {
        var b = [], c = store.getAll();
        for (var d in c)
            0 == d.indexOf(a) && b.push(Number(d.substr(1)));
        return b
    }, b.setUpdateToken = function(a, c) {
        c.localExpire = (new Date).getTime() + 864e5, b._saveValue("s" + a, c)
    }, b.getUpdateToken = function(a) {
        return b._geValue("s" + a)
    }, b.cleanSaveTokens = function() {
        for (var a = b.getAllByType("s"), c = (new Date).getTime(), d = 0; d < a.length; d++) {
            var e = b.getUpdateToken(a[d]);
            e && e.localExpire < c && store.remove("s" + a[d])
        }
    }, b.trackVisit = function() {
        var a = b._geValue("v") || 0;
        b._saveValue("v", ++a)
    }, b.getVisitCount = function() {
        return b._geValue("v") || 0
    }, b._saveValue = function(a, c) {
        store.enabled ? store.set(a, c) : b._values[a] = c, b.dispatchEvent(new DataEvent("change", {type: a,value: c}))
    }, b._geValue = function(a) {
        return store.enabled ? store.get(a) : b._values[a]
    }, a.Settings = b
}(window), function(a) {
    "use strict";
    var b = function(a, b, c, d) {
        this.init(a, b, c, d)
    }, c = b.prototype = new createjs.EventDispatcher;
    c.el = null, c.interactive = !1, c.stars = null, c._count = null, c._rating = null, c._starIndex = null, c.init = function(a, b, c, d) {
        a = a || 0, b = b || 5, this.interactive = d, this._count = b, this._rating = a;
        var e = "<div class='rating'>";
        d && (this.stars = [], e = dan.html(e));
        for (var f = 0; b > f; f++) {
            var g = a > f ? "full" : "empty", h = "<span class='icon-star-" + g + "'></span>";
            if (d) {
                var i = dan.html(h);
                e.appendChild(i), this.stars.push(i)
            } else
                e += h
        }
        d ? this.el = e : (e += "</div>", this.el = dan.html(e)), c && (c.parentNode.appendChild(this.el), c.parentNode.replaceChild(this.el, c)), this.interactive && (this.el.addEventListener("click", dan.bind(this, this.handleClick)), this.el.addEventListener("mousemove", dan.bind(this, this.handleMouseMove)), this.el.addEventListener("mouseout", dan.bind(this, this.handleMouseOut)))
    }, c.setValue = function(a) {
        this.drawStars(a)
    }, c.getValue = function() {
        return this._starIndex
    }, c.handleClick = function() {
        this._starIndex > -1 && this._rating != this._starIndex && (this._rating = this._starIndex, this.dispatchEvent(new createjs.Event("change")))
    }, c.handleMouseMove = function(a) {
        var b = this.stars.indexOf(a.target);
        -1 == b ? this.drawStars(-1, !1) : (b = -1 == b ? this._starIndex : ++b, this.drawStars(b, !0))
    }, c.handleMouseOut = function() {
        this.drawStars(this._rating)
    }, c.drawStars = function(a, b) {
        var c = b ? " hover" : "";
        if (-1 != a) {
            for (var d = 0; d < this._count; d++) {
                var e = this.stars[d];
                a > d ? dan.swapClass(e, "icon-star empty hover", "icon-star" + c) : dan.swapClass(e, "icon-star hover", "icon-star empty" + c)
            }
            this._starIndex = a
        }
    }, c.toHTMLString = function() {
        return this.el.innerHTML
    }, a.Rating = b
}(window), function(a) {
    "use strict";
    var b = function(a, b, c) {
        this.init(a, b, c)
    }, c = b.prototype;
    createjs.EventDispatcher.initialize(c), c.init = function(a, b, c) {
        this.input = a, this.maxLength = a.getAttribute("maxlength") || 250, this.parent = b;
        var d = dan.el(".tag-list", b);
        this.list = new List(d, dan.el(".item.renderer", b), this), this.hideList(), c && (this.spinner = c, this.input.parentNode.appendChild(this.spinner)), a.addEventListener("keyup", dan.bind(this, this.handleInputKeyup)), a.addEventListener("keydown", dan.bind(this, this.handleInputKeyDown)), this.list.addEventListener("change", dan.bind(this, this.handleListChange))
    }, c.showLoading = function(a) {
        this.spinner && (a !== !1 ? dan.removeClass(this.spinner, "hidden") : dan.addClass(this.spinner, "hidden"))
    }, c.getLabel = function(a) {
        return TextUtils.htmlSafe(a)
    }, c.getTags = function() {
        return this.input.value.split(/(\s?)+,(\s?)+/)
    }, c.setTags = function(a) {
        if (!a)
            return void (this.input.value = "");
        Array.isArray(a) || (a = a.split(","));
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a[c];
            "" != d && b.push(d)
        }
        this.input.value = b.join(",").substr(0, this.maxLength)
    }, c.handleKeyNavigation = function(a) {
        if (40 != a || this.isListVisible())
            if (13 == a && this.isListVisible())
                this.populateInput();
            else {
                var b = 38 == a ? -1 : 1, c = this.list.selectedIndex;
                this.list.setSelectedIndex(c += b)
            }
        else
            this.populateTagList()
    }, c.populateInput = function() {
        var a = this.list.selectedItem;
        a && this.insertTag(a), this.hideList(), this.input.focus(), this.dispatchEvent("close")
    }, c.handleInputKeyDown = function(a) {
        switch (a.which) {
            case 38:
            case 40:
                a.preventDefault()
        }
    }, c.handleInputKeyup = function(a) {
        switch (a.which) {
            case 13:
            case 38:
            case 40:
                a.preventDefault(), this.handleKeyNavigation(a.which);
                break;
            case 27:
                this.hideList();
                break;
            default:
                this.populateTagList()
        }
    }, c.isListVisible = function() {
        return !dan.hasClass(this.parent, "hidden")
    }, c.hideList = function() {
        dan.addClass(this.parent, "hidden")
    }, c.showList = function() {
        dan.removeClass(this.parent, "hidden")
    }, c.populateTagList = function() {
        dan.defer(this, this.searchTags, "search", 300)
    }, c.searchTags = function() {
        var a = this.input.value, b = this.input.selectionStart, c = this.getTag(b, a), d = this.getTags();
        TagsModel.search(c, d).then(dan.bind(this, this.handleTagsLoad))
    }, c.handleTagsLoad = function(a) {
        window.document.activeElement == this.input && (this.list.setData(a), 0 == a.length ? this.hideList() : this.showList())
    }, c.insertTag = function(a) {
        for (var b = this.input.value, c = this.input.selectionStart, d = b.split(","), e = 0, f = 0; f < d.length; f++) {
            var g = d[f];
            if (e += g.length, e + f >= c) {
                d[f] = a;
                break
            }
        }
        var h = d.join(",");
        "," != h.charAt(h.length - 1) && (h += ","), this.input.value = h.substr(0, this.maxLength)
    }, c.handleListChange = function() {
        this.populateInput()
    }, c.getTag = function(a, b) {
        a == b.length && a--;
        for (var c = b.split(","), d = null, e = 0, f = 0; f < c.length; f++) {
            var g = c[f];
            if (e += g.length, e + f >= a) {
                d = g;
                break
            }
        }
        return d
    }, a.TagInput = b
}(window);
var CMUtils = {};
CMUtils.getCharIndexAt = function(a, b, c) {
    for (var d = a.coordsChar({left: b,top: c}, "page"), e = 0; 1 >= e; e++) {
        var f = a.charCoords(d, "page");
        if (b >= f.left && b <= f.right && c >= f.top && c <= f.bottom)
            return a.indexFromPos(d);
        if (d.ch-- <= 0)
            break
    }
    return null
}, CMUtils.getEOLPos = function(a, b) {
    isNaN(b) || (b = a.posFromIndex(b));
    var c = a.charCoords(b, "local"), d = a.getScrollInfo().width;
    return a.coordsChar({left: d - 1,top: c.top}, "local")
}, CMUtils.getCharRect = function(a, b) {
    if (null == b)
        return null;
    var c = a.posFromIndex(b), d = a.charCoords(c);
    return d.x = d.left, d.y = d.top, d.width = d.right - d.left, d.height = d.bottom - d.top, d
}, CMUtils.enforceMaxLength = function(a, b) {
    var c = a.getOption("maxLength");
    if (c && b.update) {
        var d = b.text.join("\n"), e = d.length - (a.indexFromPos(b.to) - a.indexFromPos(b.from));
        if (0 >= e)
            return !0;
        e = a.getValue().length + e - c, e > 0 && (d = d.substr(0, d.length - e), b.update(b.from, b.to, d.split("\n")))
    }
    return !0
}, CMUtils.enforceSingleLine = function(a, b) {
    if (b.update) {
        var c = b.text.join("").replace(/(\n|\r)/g, "");
        b.update(b.from, b.to, [c])
    }
    return !0
}, function() {
    "use strict";
    var a = function(a, b, c) {
        this.initialize(a, b, c)
    }, b = a.prototype = new createjs.EventDispatcher;
    a.add = function(b, c, d) {
        return new a(b, c, d)
    }, a.remove = function(a) {
        a.__tooltip.remove()
    }, b.target = null, b.content = null, b.visible = !1, b.element = null, b.tip = null, b.currentContent = null, b.rect = null, b.config = null, b.x = -1e3, b.y = -1e3, b._wait = !1, b.initialize = function(a, b, c) {
        this.target = a, this.config = c = c || {}, a.__tooltip = this, this.content = b, "press" == c.mode ? a.addEventListener("mousedown", this) : "over" != c.mode && c.mode || (a.addEventListener("mouseover", this), a.addEventListener("mousemove", this)), this.config.controller && this.config.controller.addEventListener("close", dan.bind(this, this.remove))
    }, b.handleEvent = function(a) {
        var b = this.target;
        "mouseout" != a.type || b.contains(a.relatedTarget) || (this.dispatchEvent(a), this.hide()), "mouseover" != a.type || b.contains(a.relatedTarget) || (this.show(), this.dispatchEvent(a)), "mousemove" == a.type && this.dispatchEvent(a), "mousedown" == a.type && (this.visible ? a.target instanceof HTMLEmbedElement || this.element.contains(a.target) || this.hide() : this.show())
    }, b.show = function(a, b) {
        if (a = a || this.content, null == a || this._wait)
            return this.hide();
        if (!this.visible) {
            this.create();
            var c = this.element, d = this.tip;
            this.config.controller && this.config.controller.show(), "press" == this.config.mode ? (document.body.addEventListener("mousedown", this, !0), dan.addClass(this.target, "active"), this._wait = !0) : document.body.addEventListener("mouseout", this), c.style.pointerEvents = this.config.mouseEnabled !== !1, c.className = "tooltip" + (this.config && this.config.className ? " " + this.config.className : ""), d.className = "tooltip-tip", document.body.appendChild(this.element), document.body.appendChild(this.tip);
            setTimeout(function() {
                c.className += " tooltip-visible", d.className += " tooltip-visible"
            }, 0)
        }
        return a != this.currentContent && this.showContent(a), b = b || this.target && this.target.getBoundingClientRect(), b && this.position(b), this.visible || (this.visible = !0, this.dispatchEvent("show")), this
    }, b.remove = function() {
        return this.hide(), this.target.__tooltip = null, this.target.removeEventListener("mouseover", this), this.target.removeEventListener("mousemove", this), this.tip = this.element = null, this
    }, b.hide = function() {
        if (!this.visible)
            return this;
        if (this.element.parentNode.removeChild(this.element), this.tip.parentNode.removeChild(this.tip), document.body.removeEventListener("mouseout", this), document.body.removeEventListener("mousedown", this, !0), "press" == this.config.mode) {
            dan.removeClass(this.target, "active");
            var a = this;
            setTimeout(function() {
                a._wait = !1
            }, 0)
        }
        return this.visible = !1, this.currentContent = null, this.config.controller && this.config.controller.hide && this.config.controller.hide(), this.dispatchEvent("hide"), this
    }, b.position = function(a) {
        var b = this.element, c = this.tip, d = b.getBoundingClientRect(), e = d.right - d.left, f = d.bottom - d.top, g = c.getBoundingClientRect(), h = g.right - g.left >> 1, i = g.bottom - g.top, j = document.body.clientWidth, k = (a.right + a.left) / 2 - e / 2 | 0, l = a.bottom - window.pageYOffset + i, m = Math.max(3 + h, Math.min(j - 2 * h - 10 - 3, k + e / 2 - h)), n = l - i, o = 1;
        return k = Math.max(10, Math.min(j - e - 10, k)), l + f + 10 > window.innerHeight && (l = a.top - f - window.pageYOffset - i, o = -1, n = a.top - i), b.style.left = k + "px", b.style.top = l + "px", c.style.left = m + "px", c.style.top = n + "px", this.setPrefixedCss(c, "transform", "scale(1," + o + ")"), this
    }, b.create = function() {
        return this.element ? this : (this.element = document.createElement("div"), this.tip = document.createElement("div"), this)
    }, b.showContent = function(a) {
        this.currentContent = a, "string" == typeof a ? this.element.innerHTML = a : a instanceof HTMLElement ? (this.element.appendChild(a), a.style.display = "block") : this.element.innerHTML = ""
    }, b.setPrefixedCss = function(a, b, c) {
        var d = b[0].toUpperCase() + b.substr(1), e = a.style;
        e[b] = c, e["webkit" + d] = e["Moz" + d] = e["ms" + d] = e["O" + d] = c
    }, window.Tooltip = a
}(), function() {
    "use strict";
    var a = function(a, b, c) {
        this.initialize(a, b, c)
    }, b = a.prototype;
    b.cm = null, b.canvas = null, b.fill = "#6CF", b.lineSpacing = 2, b.lastBottom = -1, b.lastRight = -1, b.initialize = function(a, b, c) {
        this.cm = a, this.canvas = b, this.fill = c || this.fill
    }, b.draw = function(a, b) {
        if (this.clear(), !this.error && a.length) {
            var c = this.cm, d = c.getDoc(), e = this.canvas.getContext("2d");
            e.fillStyle = this.fill;
            for (var f = c.getScrollInfo(), g = c.indexFromPos(c.coordsChar({left: 0,top: f.top}, "local")), h = c.indexFromPos(c.coordsChar({left: f.clientWidth,top: f.top + f.clientHeight}, "local")), i = 0, j = a.length; j > i; i++) {
                var k = a[i], l = k == b, m = k.index, n = k.end;
                if (m > h)
                    break;
                if (!(g > n)) {
                    var o = k.startPos || (k.startPos = d.posFromIndex(m)), p = k.endPos || (k.endPos = d.posFromIndex(n));
                    l && (e.globalAlpha = .6);
                    var q = c.charCoords(o, "local"), r = c.charCoords(p, "local");
                    if (q.bottom == r.bottom)
                        this.drawHighlight(e, q.left, q.top, r.right, r.bottom, f.top);
                    else {
                        var s = c.getScrollInfo().width, t = c.defaultTextHeight();
                        this.drawHighlight(e, q.left, q.top, s - 2, q.bottom, f.top, !1, !0);
                        for (var u = q.top; (u += t) < r.top - 1; )
                            this.drawHighlight(e, 0, u, s - 2, u + q.bottom - q.top, f.top, !0, !0);
                        this.drawHighlight(e, 0, r.top, r.right, r.bottom, f.top, !0)
                    }
                    l && (e.globalAlpha = 1)
                }
            }
        }
    }, b.drawHighlight = function(a, b, c, d, e, f, g, h) {
        var i = 4;
        if (!(0 > d || b + 1 >= d)) {
            b = b + .5 | 0, d = d + .5 | 0, c = (c + .5 | 0) + this.lineSpacing, e = e + .5 | 0, c + 1 > this.lastBottom ? this.lastBottom = e : b < this.lastRight && (b = this.lastRight), this.lastRight = d;
            var j = a.globalAlpha;
            g && (a.globalAlpha = .5 * j, a.fillRect(b + 1 | 0, c - f, i + 1, e - c), b += i), h && (a.globalAlpha = .5 * j, a.fillRect(d - i - 1 | 0, c - f, i + 1, e - c), d -= i), a.globalAlpha = j, a.fillRect(b + 1, c - f, d - b - 1, e - c)
        }
    }, b.clear = function() {
        this.canvas.width = this.canvas.width, this.lastBottom = -1
    }, window.SourceHighlighter = a
}(), function() {
    "use strict";
    var a = function(a, b, c) {
        this.initialize(a, b, c)
    }, b = a.prototype;
    a.GROUP_CLASS_BY_TYPE = {set: "exp-group-set",setnot: "exp-group-set",group: "exp-group-%depth%",lookaround: "exp-group-%depth%"}, b.cm = null, b.prefix = "exp-", b.selectedToken = null, b.selectedMarks = null, b.activeMarks = null, b.offset = 0, b.initialize = function(a, b) {
        this.cm = a, this.offset = b || 0, this.activeMarks = [], this.selectedMarks = []
    }, b.draw = function(b) {
        var c = this.cm, d = this.prefix;
        this.clear();
        var e = this;
        c.operation(function() {
            for (var f, g = a.GROUP_CLASS_BY_TYPE, h = c.getDoc(), i = e.activeMarks; b; )
                if (b.clear)
                    b = b.next;
                else {
                    b = e._calcTokenPos(h, b);
                    var j = d + (b.clss || b.type);
                    b.err && (j += " " + d + "error"), j && i.push(h.markText(b.startPos, b.endPos, {className: j})), b.close && (f = e._calcTokenPos(h, b.close), j = g[b.clss || b.type], j && (j = j.replace("%depth%", b.depth), i.push(h.markText(b.startPos, f.endPos, {className: j})))), b = b.next
                }
        })
    }, b.clear = function() {
        var a = this;
        this.cm.operation(function() {
            for (var b = a.activeMarks, c = 0, d = b.length; d > c; c++)
                b[c].clear();
            b.length = 0
        })
    }, b.selectToken = function(a) {
        if (!(a == this.selectedToken || a && a.set && -1 != a.set.indexOf(this.selectedToken))) {
            for (; this.selectedMarks.length; )
                this.selectedMarks.pop().clear();
            if (this.selectedToken = a, a && (this._drawSelect(a.open ? a.open : a), a.related))
                for (var b = 0; b < a.related.length; b++)
                    this._drawSelect(a.related[b], "exp-related")
        }
    }, b._drawSelect = function(a, b) {
        var c = a.close || a;
        a.set && (c = a.set[a.set.length - 1], a = a.set[0]), b = b || "exp-selected";
        var d = this.cm.getDoc();
        this._calcTokenPos(d, c), this._calcTokenPos(d, a), this.selectedMarks.push(d.markText(a.startPos, c.endPos, {className: b,startStyle: b + "-left",endStyle: b + "-right"}))
    }, b._calcTokenPos = function(a, b) {
        return b.startPos || null == b ? b : (b.startPos = a.posFromIndex(b.i + this.offset), b.endPos = a.posFromIndex(b.end + this.offset), b)
    }, window.ExpressionHighlighter = a
}(), function() {
    "use strict";
    var a = function(a, b) {
        this.initialize(a, b)
    }, b = a.prototype;
    b.cm = null, b.tooltip = null, b.highlighter = null, b.token = null, b.offset = 0, b.isMouseDown = !1, b.initialize = function(a, b) {
        this.cm = a, this.highlighter = b, this.offset = b.offset, this.tooltip = Tooltip.add(a.display.lineDiv), this.tooltip.on("mousemove", this.onMouseMove, this), this.tooltip.on("mouseout", this.onMouseOut, this), a.on("mousedown", dan.bind(this, this.onMouseDown))
    }, b.onMouseDown = function(a, b) {
        if (1 == b.which || 1 == b.button) {
            this.onMouseMove(), this.isMouseDown = !0;
            var c, d = this, e = window.addEventListener ? window : document;
            e.addEventListener("mouseup", c = function() {
                e.removeEventListener("mouseup", c), d.isMouseDown = !1
            })
        }
    }, b.onMouseMove = function(a) {
        if (!this.isMouseDown) {
            var b, c = this.cm, d = this.token, e = null;
            if (a && d && null != (b = CMUtils.getCharIndexAt(c, a.clientX, a.clientY + window.pageYOffset)))
                for (b -= this.offset; d; ) {
                    if (b >= d.i && b < d.end) {
                        e = d;
                        break
                    }
                    d = d.next
                }
            e && e.proxy && (e = e.proxy), this.highlighter.selectToken(e);
            var f = null != b && CMUtils.getCharRect(c, b);
            f && (f.right = f.left = a.clientX), this.tooltip.show(Docs.forToken(e), f)
        }
    }, b.onMouseOut = function() {
        this.highlighter.selectToken(null)
    }, window.ExpressionHover = a
}(), function() {
    var DocView = function(a) {
        this.initialize(a)
    }, p = DocView.prototype;
    DocView.DEFAULT_EXPRESSION = "/([A-Z])\\w+/g", DocView.DEFAULT_SUBSTITUTION = "\\n# $&:\\n\\t", DocView.VALID_FLAGS = "igmxXsuUAJ", p.isMac = !1, p.ctrlKey = null, p.themeColor = null, p.element = null, p.expressionCM = null, p.sourceCM = null, p.sourceCanvas = null, p.sourceMeasure = null, p.exprResults = null, p.exprResultsTooltip = null, p.expressionHighlighter = null, p.expressionHover = null, p.sourceHighlighter = null, p.sourceTooltip = null, p.substHighlighter = null, p.substHover = null, p.substCM = null, p.substResCM = null, p.flagsTooltip = null, p.flagsMenu = null, p.shareTooltip = null, p.saveTooltip = null, p.matches = null, p.error = null, p.hoverMatch = null, p.exprLexer = null, p.substLexer = null, p.substEnabled = !1, p.timeoutIDs = null, p.history = null, p.historyIndex = 0, p.maxHistoryDepth = 100, p.libView = null, p.initialize = function(a) {
        this.element = a, this.matches = [], this.timeoutIDs = {}, this.exprLexer = new RegExLexer, this.substLexer = new SubstLexer, this.isMac = Utils.isMac(), this.themeColor = window.getComputedStyle(dan.el(".regexr-logo")).color, Docs.content.library.desc = dan.el(".lib .content").innerHTML, window.onbeforeunload = dan.bind(this, this.handleUnload), this.buildUI(a)
    }, p.buildUI = function(a) {
        var b = dan.el(".editor.expr", a), c = this.expressionCM = this.getCM(b, {autofocus: !0,maxLength: 2500,singleLine: !0}, "calc(100% - 5.5rem)", "auto");
        c.on("change", dan.bind(this, this.deferUpdate)), c.on("mousedown", dan.bind(this, this.expressionClick)), c.on("change", dan.bind(this, this.handleExpressionCMChange)), this.expressionHighlighter = new ExpressionHighlighter(c), this.expressionHover = new ExpressionHover(c, this.expressionHighlighter), this.exprResults = dan.el(".expr .results", a), this.exprResultsTooltip = Tooltip.add(this.exprResults);
        var d = dan.el(".editor.source", a), e = this.sourceCM = this.getCM(d, {lineWrapping: !0});
        e.on("change", dan.bind(this, this.deferUpdate)), e.on("scroll", dan.bind(this, this.drawSourceHighlights)), this.sourceCanvas = dan.el(".source canvas", a), this.sourceMeasure = dan.el(".source .measure", a), this.sourceTooltip = Tooltip.add(e.display.lineDiv), this.sourceTooltip.on("mousemove", this.sourceMouseMove, this), this.sourceTooltip.on("mouseout", this.sourceMouseOut, this), this.sourceHighlighter = new SourceHighlighter(e, this.sourceCanvas, this.themeColor);
        var f = dan.el(".title.subst", a);
        f.addEventListener("mousedown", dan.bind(this, this.onSubstClick));
        var g = dan.el(".editor.subst", a), h = this.substCM = this.getCM(g, {maxLength: 500,singleLine: !0}, "100%", "auto");
        h.on("change", dan.bind(this, this.deferUpdate)), this.substHighlighter = new ExpressionHighlighter(h), this.substHover = new ExpressionHover(h, this.substHighlighter);
        var i = dan.el(".editor.substres", a);
        this.substResCM = this.getCM(i, {readOnly: !0,lineWrapping: !0});
        var j = dan.el(".button.flags", a);
        this.flagsTooltip = Tooltip.add(j, dan.el(".menu.flags", a), {mode: "press"}), this.flagsTooltip.on("show", this.updateFlagsMenu, this), this.flagsMenu = new FlagsMenu(dan.el(".menu.flags", a)), this.flagsMenu.on("change", this.onFlagsMenuChange, this), dan.el(".menu.flags .button.help").addEventListener("click", dan.bind(this, this.showFlagsHelp)), window.addEventListener("resize", dan.bind(this, this.deferResize)), this.deferResize(), this.setupUndo(), this.setInitialExpression()
    }, p.setInitialExpression = function() {
        var a = this.expressionCM;
        a.setValue("/./g"), a.getDoc().markText({line: 0,ch: 0}, {line: 0,ch: 1}, {className: "exp-decorator",readOnly: !0,atomic: !0,inclusiveLeft: !0}), a.getDoc().markText({line: 0,ch: 2}, {line: 0,ch: 4}, {className: "exp-decorator",readOnly: !1,atomic: !0,inclusiveRight: !0}), this.deferUpdate()
    }, p.populateAll = function(a, b, c, d) {
        this.setPattern(a), this.setFlags(b), this.setText(c), d ? (this.setSubstitution(d), this.showSubstitution()) : this.showSubstitution(!1), ExpressionModel.saveState()
    }, p.setExpression = function(a) {
        var b = this.decomposeExpression(a);
        return this.setPattern(b.pattern).setFlags(b.flags)
    }, p.getExpression = function() {
        return this.expressionCM.getValue()
    }, p.setPattern = function(a) {
        var b = this.expressionCM, c = b.getValue().lastIndexOf("/");
        return b.replaceRange(a, {line: 0,ch: 1}, {line: 0,ch: c}), this.deferUpdate(), this
    }, p.getPattern = function() {
        return this.decomposeExpression(this.expressionCM.getValue()).pattern
    }, p.setFlags = function(a) {
        a = this.validateFlags(a);
        var b = this.expressionCM, c = b.getValue(), d = c.lastIndexOf("/");
        return b.replaceRange(a, {line: 0,ch: d + 1}, {line: 0,ch: c.length}), this.deferUpdate(), this
    }, p.getFlags = function() {
        return this.decomposeExpression(this.expressionCM.getValue()).flags
    }, p.validateFlags = function(a) {
        for (var b = "", c = DocView.VALID_FLAGS, d = 0, e = c.length; e > d; d++) {
            var f = c[d];
            -1 != a.indexOf(f) && -1 == b.indexOf(f) && (b += f)
        }
        return b
    }, p.toggleFlag = function(a) {
        var b = this.getFlags();
        -1 == b.indexOf(a) ? b += a : b = b.replace(a, ""), this.setFlags(b)
    }, p.setText = function(a) {
        return (null == a || "" == a) && (a = DocView.DEFAULT_TEXT), this.sourceCM.setValue(a), this.deferUpdate(), this
    }, p.getText = function() {
        return this.sourceCM.getValue()
    }, p.setSubstitution = function(a) {
        return this.substCM.setValue(a), this.deferUpdate(), this
    }, p.getSubstitution = function() {
        return this.substCM.getValue()
    }, p.insertExpression = function(a) {
        return this.expressionCM.replaceSelection(a, "end"), this.deferUpdate(), this
    }, p.insertSubstitution = function(a) {
        return this.substCM.replaceSelection(a, "end"), this.deferUpdate(), this
    }, p.showSubstitution = function(a) {
        a = void 0 === a ? !0 : a, this.substEnabled != a && (this.substEnabled = a, a ? dan.removeClass(this.element, "subst-disabled") : dan.addClass(this.element, "subst-disabled"), this.deferUpdate(), this.resize(), this.substCM.refresh(), this.sourceCM.refresh())
    }, p.showSave = function() {
        this.saveTooltip.show()
    }, p.showShare = function() {
        this.shareTooltip.show()
    }, p.showFlags = function() {
        this.flagsTooltip.show()
    }, p.setupUndo = function() {
        this.history = [];
        var a = this.sourceCM, b = this.expressionCM, c = this.substCM, d = this;
        a.getDoc().on("historyAdded", function() {
            d.addHistory(a)
        }), a.setOption("undoDepth", this.maxHistoryDepth), b.getDoc().on("historyAdded", function() {
            d.addHistory(b)
        }), b.setOption("undoDepth", this.maxHistoryDepth), c.getDoc().on("historyAdded", function() {
            d.addHistory(c)
        }), c.setOption("undoDepth", this.maxHistoryDepth), window.addEventListener("keydown", dan.bind(this, this.handleKeyDown))
    }, p.handleKeyDown = function(a) {
        var b = this.isMac ? a.metaKey : a.ctrlKey;
        b && (a.shiftKey && 90 == a.which || 89 == a.which) ? (this.redo(), a.preventDefault()) : b && 90 == a.which && (this.undo(), a.preventDefault())
    }, p.handleUnload = function() {
        return ExpressionModel.isDirty() ? "You have unsaved edits, are you sure you wish to leave this page?" : void 0
    }, p.addHistory = function(a) {
        var b = this.history;
        b.length = this.historyIndex, b.push(a), b.length > this.maxHistoryDepth ? b.shift() : this.historyIndex++
    }, p.resetHistory = function() {
        this.historyIndex = this.history.length = 0
    }, p.undo = function() {
        0 !== this.historyIndex && this.history[--this.historyIndex].undo()
    }, p.redo = function() {
        this.historyIndex != this.history.length && this.history[this.historyIndex++].redo()
    }, p.sourceMouseMove = function(a) {
        var b, c = this.sourceCM, d = this.hoverMatch, e = this.matches;
        if (this.hoverMatch = null, e.length && null != (b = CMUtils.getCharIndexAt(c, a.clientX, a.clientY + window.pageYOffset)))
            for (var f = 0, g = e.length; g > f; f++) {
                var h = e[f];
                if (!(h.end < b)) {
                    if (h.index > b)
                        break;
                    this.hoverMatch = h
                }
            }
        d != this.hoverMatch && this.drawSourceHighlights();
        var i = null != b && CMUtils.getCharRect(c, b);
        i && (i.right = i.left = a.clientX), this.sourceTooltip.show(Docs.forMatch(this.hoverMatch), i)
    }, p.sourceMouseOut = function() {
        null != this.hoverMatch && (this.hoverMatch = null, this.drawSourceHighlights())
    }, p.expressionClick = function(a, b) {
        var c = CMUtils.getCharIndexAt(a, b.clientX - .6 * a.defaultCharWidth(), b.clientY);
        c >= a.getValue().lastIndexOf("/") && this.showFlags()
    }, p.resize = function() {
        var a = this.sourceMeasure.getBoundingClientRect();
        this.sourceCanvas.width = a.right - a.left | 0, this.sourceCanvas.height = a.bottom - a.top | 0, dan.removeClass(this.sourceCanvas, "hidden"), this.drawSourceHighlights()
    }, p.update = function() {
        this.error = null;
        {
            var a, b = this.matches, c = this.sourceCM.getValue(), d = this.expressionCM.getValue(), e = this.decomposeExpression(d);
            -1 != e.flags.indexOf("g")
        }
        this.expressionHighlighter.draw(this.exprLexer.parse(d)), this.expressionHover.token = this.exprLexer.token, this.exprLexer.errors.length && (this.error = "ERROR");
	if ($('#engine').val() == "pcre") {
		a = d;
	} else {
	        try {
	            a = new RegExp(e.pattern, e.flags)
	        } catch (f) {
	            this.error = "ERROR"
	        }
	}
        b.length = 0;
        var g = this;
        RegExJS.match(a, c, function(b, d) {
            g.error = b, g.matches = d, g.updateResults(), dan.defer(g, g.drawSourceHighlights, "draw"), ExpressionModel.isDirty() && BrowserHistory.go(), ExpressionModel.id && BrowserHistory.go(dan.createID(ExpressionModel.id)), g.updateSubst(c, a)
        })
    }, p.updateSubst = function(source, regex) {
        if (this.substEnabled) {
            var str = this.substCM.getValue(), token = this.substLexer.parse(str, this.exprLexer.captureGroups);
            if (this.substHighlighter.draw(token), this.substHover.token = token, !this.error && 0 === this.substLexer.errors.length) {
                try {
                    str = eval('"' + str.replace(/"/g, '\\"') + '"')
                } catch (e) {
                    console.error("UNCAUGHT js string error", e)
                }
                source = source.replace(regex, str)
            }
            this.substResCM.setValue(source)
        }
    }, p.drawSourceHighlights = function() {
        this.sourceHighlighter.draw(this.matches, this.hoverMatch)
    }, p.updateResults = function() {
        var a = "no match", b = this.exprResults, c = null, d = this.matches.length;
        dan.removeClass(b, "error"), dan.removeClass(b, "nomatch"), this.error ? (a = this.error, dan.addClass(b, "error"), c = Docs.forErrorResult(a, this.exprLexer.errors)) : d > 0 ? a = d + " match" + (1 == d ? "" : "es") : dan.addClass(b, "nomatch"), this.exprResultsTooltip.content = c, b.innerHTML = a
    }, p.onSubstClick = function() {
        Tracking.event("substitution", this.substEnabled ? "hide" : "show"), this.showSubstitution(!this.substEnabled)
    }, p.onFlagsMenuChange = function() {
        this.setFlags(this.flagsMenu.getFlags())
    }, p.handleExpressionCMChange = function(a, b) {
        var c = b.text[0];
        c.length < 3 || !c.match(/^\/.+[^\\]\/[a-z]*$/gi) || 1 == b.from.ch && b.to.ch == 1 + b.removed[0].length && this.setExpression(c)
    }, p.updateFlagsMenu = function() {
        Tracking.event("flags", "show"), this.flagsMenu.setFlags(this.getFlags())
    }, p.showFlagsHelp = function() {
        this.flagsTooltip.hide(), this.libView.show("flags")
    }, p.deferUpdate = function(a) {
        dan.clearDefer("draw"), dan.defer(this, this.update, "update", a)
    }, p.deferResize = function() {
        this.sourceHighlighter.clear(), dan.addClass(this.sourceCanvas, "hidden"), dan.defer(this, this.resize, "resize", 500)
    }, p.getCM = function(a, b, c, d) {
        var e = Utils.getCtrlKey(), f = {};
        f[e + "-Z"] = f[e + "-Y"] = f["Shift-" + e + "-Z"] = function() {
            return !1
        };
        var g = {lineNumbers: !1,tabSize: 3,indentWithTabs: !0,extraKeys: f};
        if (b)
            for (var h in b)
                g[h] = b[h];
        var i = CodeMirror(a, g);
        return i.setSize(c || "100%", d || "100%"), i.getOption("maxLength") && i.on("beforeChange", CMUtils.enforceMaxLength), i.getOption("singleLine") && i.on("beforeChange", CMUtils.enforceSingleLine), i
    }, p.decomposeExpression = function(a) {
        var b = a.lastIndexOf("/");
        return {pattern: a.substring(1, b),flags: a.substr(b + 1)}
    }, p.composeExpression = function(a, b) {
        return "/" + a + "/" + b
    }, window.DocView = DocView
}(), function() {
    "use strict";
    var a = function(a, b) {
        this.initialize(a, b)
    }, b = a.prototype;
    b.element = null, b.list = null, b.content = null, b.docs = null, b.dir = null, b.docView = null, b.item = null, b.community = null, b.initialize = function(a, b) {
        this.element = a, this.title = dan.el(".title", a), this.titleButton = dan.el(".button", this.title), this.title.addEventListener("click", this), this.buildUI(a), this.showItem(this.docs = b)
    }, b.show = function(a) {
        this.showItem(Docs.getItem(a))
    }, b.buildUI = function(a) {
        this.list = new List(dan.el(".list", a), dan.el(".list .item.renderer", a), this), this.list.on("change", this.onListChange, this), this.content = dan.el(".content", a)
    }, b.handleEvent = function() {
        this.goBack()
    }, b.goBack = function() {
        this.showItem(this.dir.parent)
    }, b.showItem = function(a) {
        if (a && a != this.item) {
            dan.swapClass(this.content, "hidden", "visible"), this.item && "community" == this.item.id ? (this.community.hide(), dan.removeClass(this.list.element, "hidden")) : this.item && "favorites" == this.item.id && (this.favorites.hide(), dan.removeClass(this.list.element, "hidden")), this.item = a, dan.empty(this.content);
            var b = this.getContent(a);
            this.content.appendChild(dan.html(b, !0)), this.setupContent(this.content), a.kids || (a = a.parent), this.dir != a && (this.dir = a, a.parent ? (dan.swapClass(this.title, "cursor none", "cursor pointer"), dan.removeClass(this.titleButton, "noicon")) : (dan.swapClass(this.title, "cursor pointer", "cursor none"), dan.addClass(this.titleButton, "noicon")), this.titleButton.innerHTML = this.getLabel(a), this.list.setData(a.kids), "community" == a.id ? (this.community.show(), dan.addClass(this.list.element, "hidden")) : "favorites" == a.id && (this.favorites.show(), dan.addClass(this.list.element, "hidden")), a.max ? dan.addClass(this.content, "maximized") : dan.removeClass(this.content, "maximized"), dan.removeClass(this.element, "hidden"))
        }
    }, b.setupContent = function(a) {
        var b = dan.els("code .load.icon", a);
        if (b)
            for (var c = 0; c < b.length; c++)
                a = b[c], a.addEventListener("click", dan.bind(this, this.onLoadClick))
    }, b.onListChange = function(a) {
        var b = this.list.selectedItem;
        if (b == a.relatedItem) {
            if (!this.docView)
                return;
            for (var c = b, d = b.target; !d && c; )
                d = c.target, c = c.parent;
            b.parent && "examples" == b.parent.id && (this.docView.setPattern(b.example[0]), this.docView.setText(b.example[1])), "expr" == d ? this.docView.insertExpression(b.token) : "flags" == d ? this.docView.showFlags() : "subst" == d && (this.docView.insertSubstitution(b.token.replace(/\$\$/g, "$")), this.docView.showSubstitution())
        } else {
            this.showItem(b, !0);
            for (var e = b.parent, f = []; e && e.label; )
                f.push(e.label), e = e.parent;
            var e = f.length ? f.join("/") + "/" : "";
            Tracking.page(e + b.label || b.id)
        }
    }, b.onLoadClick = function(a) {
        var b = a.currentTarget, c = this.item.example;
        dan.hasClass(b, ".expr") ? this.docView.setPattern(c[0]) : dan.hasClass(b, ".source") && this.docView.setText(c[1])
    }, b.getLabel = function(a) {
        return a.label || a.id
    }, b.getIcon = function(a) {
        return a.icon ? a.icon + "&nbsp;" : ""
    }, b.getDetail = function(a) {
        return a.kids ? "<span class='icon'>&#xE224;</span>" : a.token ? "<code>" + a.token + "</code>" : ""
    }, b.getContent = function(a) {
        var b = dan.fillTags((a.desc || "") + (a.ext || ""), a, Docs);
        if (a.example) {
            var c = a.example, d = new RegExp(c[0], "g");
            b += "<div class='example'><h1>Example</h1>", b += "<hr/>", b += "<code><div class='load icon expr'></div>" + c[0] + "</code>", b += "<hr/>", b += "<code><div class='load icon source'></div>" + c[1].replace(d, "<em>$&</em>") + "</code>", b += "</div>"
        }
        return b
    }, window.LibView = a
}(), function() {
    "use strict";
    var a = function(a, b, c) {
        this.initialize(a, b, c)
    }, b = a.prototype = new createjs.EventDispatcher;
    a.defaultRenderer = "{{getLabel()}}", a.defaultHelpers = {getLabel: function(a) {
            return a ? a.label || a.data || a.toString() : ""
        }}, b.element = null, b.data = null, b.renderer = null, b.helpers = null, b.selectedIndex = -1, b.selectedItem = null, b.selectedElement = null, b.focusProxy = null, b.keyupProxy = null, b.blurProxy = null, b.initialize = function(a, b, c) {
        this.element = a, this.setRenderer(b, c), this.focusProxy = dan.bind(this, this.handleFocus), this.blurProxy = dan.bind(this, this.handleBlur), this.keyDownProxy = dan.bind(this, this.handleKeyDown), this.element.addEventListener("focus", this.focusProxy), this.element.addEventListener("blur", this.blurProxy)
    }, b.focus = function() {
        this.element.focus()
    }, b.blur = function() {
        this.element.blur()
    }, b.handleBlur = function(a) {
        window.removeEventListener("keydown", this.keyDownProxy), a && this.dispatchEvent(a)
    }, b.handleFocus = function() {
        this.handleBlur(), window.addEventListener("keydown", this.keyDownProxy)
    }, b.handleKeyDown = function(a) {
        var b = -1, c = 0;
        switch (a.which) {
            case 38:
                b = Math.max(0, this.selectedIndex - 1), c = 1;
                break;
            case 40:
                b = Math.min(this.data.length - 1, this.selectedIndex + 1), c = -1;
                break;
            case 13:
                this.dispatchEvent(new createjs.Event("enter"))
        }
        (b > -1 && b != this.selectedIndex || 13 == a.which) && (a.preventDefault(), this.triggerChange(b, c))
    }, b.setRenderer = function(a, b) {
        this.renderer = a instanceof HTMLElement ? a.innerHTML : a, this.helpers = b, this.draw()
    }, b.setData = function(a) {
        this.data = a, this.clear(), this.draw()
    }, b.clear = function() {
        this.clearItems(), this.selectedIndex = -1, this.selectedItem = null
    }, b.setSelectedIndex = function(a, b) {
        if (this.data) {
            var c = this.element.childNodes[a];
            if (c) {
                var d = dan.el(".item.selected", this.element);
                d && dan.removeClass(d, "selected"), dan.addClass(c, "selected"), this.selectedIndex = a, this.selectedItem = this.data[this.selectedIndex], this.selectedElement = c;
                var e = c.getBoundingClientRect(), f = this.element.getBoundingClientRect(), g = this.getOffsetTop(this.element), h = this.getOffsetTop(c), i = h - g, j = h - g + e.height - f.height, k = this.element.scrollTop, l = k + f.height, m = h - g, n = m + e.height;
                m >= k && l >= n || (this.element.scrollTop = b > 0 ? i : j)
            }
        }
    }, b.getOffsetTop = function(a) {
        for (var b = 0; a; )
            b += a.offsetTop, a = a.offsetParent;
        return b
    }, b.draw = function() {
        this.clearItems();
        var a = this.data, b = this.element;
        if (a && b)
            for (var c = 0, d = a.length; d > c; c++) {
                var e = this.getItem(a[c]);
                e.index = c, b.appendChild(e)
            }
    }, b.clearItems = function() {
        for (var a = this.element; a.firstChild; )
            a.removeChild(a.firstChild)
    }, b.getItem = function(b) {
        var c = document.createElement("div");
        return c.className = "item", c.innerHTML = dan.fillTags(this.renderer || a.defaultRenderer, b, this.helpers || a.defaultHelpers), c.addEventListener("click", this), c
    }, b.getElementAt = function(a) {
        return this.element.childNodes[a]
    }, b.getDataAt = function(a) {
        return this.data[a]
    }, b.findIndexByValue = function(a, b) {
        for (var c = 0; c < this.data.length; c++)
            if (this.data[c][a] == b)
                return c;
        return -1
    }, b.handleEvent = function(a) {
        this.triggerChange(a.currentTarget.index)
    }, b.triggerChange = function(a, b) {
        var c = new createjs.Event("change");
        c.relatedIndex = this.selectedIndex, c.relatedItem = this.selectedItem, this.setSelectedIndex(a, b), this.dispatchEvent(c)
    }, window.List = a
}(), function() {
    "use strict";
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype = new createjs.EventDispatcher;
    b.element = null, b.initialize = function(a) {
        this.element = a, this.buildUI(a)
    }, b.buildUI = function(a) {
        for (var b = dan.els(".check", a), c = 0; c < b.length; c++)
            b[c].addEventListener("click", this)
    }, b.setFlags = function(a) {
        for (var b = dan.els(".check", this.element), c = 0; c < b.length; c++) {
            var d = b[c], e = a.indexOf(d.getAttribute("data-flag"));
            -1 == e ? dan.removeClass(d, "checked") : dan.addClass(d, "checked")
        }
    }, b.getFlags = function() {
        for (var a = "", b = dan.els(".check.checked", this.element), c = 0; c < b.length; c++)
            a += b[c].getAttribute("data-flag");
        return a
    }, b.handleEvent = function(a) {
        var b = a.currentTarget;
        dan.hasClass(b, "checked") ? dan.removeClass(b, "checked") : dan.addClass(b, "checked"), this.dispatchEvent("change")
    }, window.FlagsMenu = a
}();
var Docs = {};
Docs.NONPRINTING_CHARS = {0: "NULL",1: "SOH",2: "STX",3: "ETX",4: "EOT",5: "ENQ",6: "ACK",7: "BELL",8: "BS",9: "TAB",10: "LINE FEED",11: "VERTICAL TAB",12: "FORM FEED",13: "CARRIAGE RETURN",14: "SO",15: "SI",16: "DLE",17: "DC1",18: "DC2",19: "DC3",20: "DC4",21: "NAK",22: "SYN",23: "ETB",24: "CAN",25: "EM",26: "SUB",27: "ESC",28: "FS",29: "GS",30: "RS",31: "US",32: "SPACE",127: "DEL"}, Docs.content = null, Docs.ids = null, Docs.setContent = function(a) {
    Docs.content = a;
    var b = {}, c = function(a, d) {
        var e = a.kids;
        if (a.id && (b[a.id] = a, d && (d[a.id] = a)), e) {
            d = a.ids = {};
            for (var f = 0, g = e.length; g > f; f++)
                c(e[f], d), e[f].parent = a
        }
    };
    c(a.library), c(a.misc), Docs.ids = b
}, Docs.getItem = function(a) {
    return Docs.ids[a]
}, Docs.forMatch = function(a) {
    if (!a)
        return null;
    var b = "<b>match: </b>" + TextUtils.htmlSafe(TextUtils.shorten(a[0], 50)) + "<br/><b>range: </b>" + a.index + "-" + a.end, c = a.length;
    c > 1 && (b += "<hr/>");
    for (var d = 1; c > d; d++)
        d > 1 && (b += "<br/>"), b += "<b>group #" + d + ": </b>" + TextUtils.htmlSafe(TextUtils.shorten(a[d], 20));
    return b
}, Docs.forToken = function(a) {
    var b = "", c = "", d = "", e = Docs.content;
    if (!a)
        return null;
    if (a.open && (a = a.open), a.err)
        return "<span class='error-title'>ERROR: </span>" + e.errors[a.err] || "[" + a.err + "]";
    var f, g = a.type, h = a.clss, i = Docs.ids, j = g, k = i[j];
    return k && (d = a.label || k.label || k.id, "group" == j && (d += " #" + a.num), d = "<b>" + d[0].toUpperCase() + d.substr(1) + ".</b> "), "quant" == h && (k = i[h]), ("char" == g || "esc" == h) && ("esc" == h && (b = (i[g] && i[g].desc || "<b>Escaped character.</b>") + " "), k = i[a.js ? "js_char" : "char"]), f = k ? k.tip || k.desc : "no docs for type='" + g + "'", d + b + dan.fillTags(f, a, Docs) + c
}, Docs.forErrorResult = function(a) {
    var b = Docs.ids[a];
    return "<span class='error-title'>ERROR: </span>" + (b.tip || b.desc)
}, Docs.getDesc = function(a) {
    var b = Docs.ids[a];
    return b && b.desc || "Content not found:" + a
}, Docs.getQuant = function(a) {
    var b = a.min, c = a.max;
    return b == c ? b : -1 == c ? b + " or more" : "between " + b + " and " + c
}, Docs.getChar = function(a) {
    var b = Docs.NONPRINTING_CHARS[a.code];
    return b ? b : '"' + String.fromCharCode(a.code) + '"'
}, Docs.getEscCharDocs = function(a, b, c) {
    var d = a.charCodeAt(0), e = Docs.NONPRINTING_CHARS[d] || a;
    return {token: "\\" + (b || a),label: e.toLowerCase(),desc: dan.fillTags(c, {code: d}, Docs)}
}, Docs.getCtrlKey = function() {
    return Utils.getCtrlKey()
}, function() {
    for (var a = documentation.library.kids[1], b = "	\nf\r\x00.\\+*?^$[]{}()|/", c = "tnvfr0", d = a.kids[2].kids, e = 0; e < b.length; e++)
        d.push(Docs.getEscCharDocs(b[e], c[e], documentation.misc.kids[0].tip));
    Docs.setContent({errors: documentation.errors,library: documentation.library,misc: documentation.misc})
}(), function() {
    "use strict";
    var a = function() {
    }, b = a.prototype;
    a.CHAR_TYPES = {".": "dot","|": "alt",$: "eof","^": "bof","?": "opt","+": "plus","*": "star"}, a.ESC_CHARS_SPECIAL = {w: "word",W: "notword",d: "digit",D: "notdigit",s: "whitespace",S: "notwhitespace",b: "wordboundary",B: "notwordboundary"}, a.UNQUANTIFIABLE = {quant: !0,plus: !0,star: !0,opt: !0,eof: !0,bof: !0,group: !0,lookaround: !0,wordboundary: !0,notwordboundary: !0,lazy: !0,alt: !0,open: !0}, a.ESC_CHAR_CODES = {0: 0,t: 9,n: 10,v: 11,f: 12,r: 13}, b.string = null, b.token = null, b.errors = null, b.captureGroups = null, b.parse = function(b) {
        if (b == this.string)
            return this.token;
        this.token = null, this.string = b, this.errors = [];
        for (var c, d, e, f = this.captureGroups = [], g = [], h = 0, i = b.length, j = null, k = null, l = a.UNQUANTIFIABLE, m = a.CHAR_TYPES, n = b.lastIndexOf("/"); i > h; )
            d = b[h], e = {i: h,l: 1,prev: j}, 0 == h || h >= n ? this.parseFlag(b, e) : "(" != d || k ? ")" != d || k ? "[" != d || k ? "]" == d && k ? (e.type = "setclose", e.open = k, k.close = e, k = null) : "+" != d && "*" != d || k ? "{" != d || k || -1 == b.substr(h).search(/^{\d+,?\d*}/) ? "\\" == d ? this.parseEsc(b, e, k, f, n) : "?" != d || k ? "-" == d && k && null != j.code && j.prev && "range" != j.prev.type ? e.type = "range" : this.parseChar(b, e, k) : j && "quant" == j.clss ? (e.type = "lazy", e.related = [j]) : (e.type = m[d], e.clss = "quant", e.min = 0, e.max = 1) : this.parseQuant(b, e) : (e.type = m[d], e.clss = "quant", e.min = "+" == d ? 1 : 0, e.max = -1) : (e.type = e.clss = "set", k = e, "^" == b[h + 1] && (e.l++, e.type += "not")) : (e.type = "groupclose", g.length ? (c = e.open = g.pop(), c.close = e) : e.err = "groupclose") : (this.parseGroup(b, e), e.depth = g.length, g.push(e), e.capture && (f.push(e), e.num = f.length)), j && (j.next = e), "quant" == e.clss && (!j || l[j.type] ? e.err = "quanttarg" : e.related = [j.open || j]), j && "range" == j.type && 1 == j.l && (e = this.validateRange(b, j)), e.open && !e.clss && (e.clss = e.open.clss), this.token || (this.token = e), h = e.end = e.i + e.l, e.err && this.errors.push(e.err), j = e;
        for (; g.length; )
            this.errors.push(g.pop().err = "groupopen");
        return k && this.errors.push(k.err = "setopen"), this.token
    }, b.parseFlag = function(a, b) {
        var c = b.i, d = a[c];
        "/" == a[c] ? (b.type = 0 == c ? "open" : "close", 0 != c && (b.related = [this.token], this.token.related = [b])) : b.type = "flag_" + d, b.clear = !0
    }, b.parseChar = function(b, c, d) {
        var e = b[c.i];
        return c.type = !d && a.CHAR_TYPES[e] || "char", d || "/" != e || (c.err = "fwdslash"), "char" == c.type ? c.code = e.charCodeAt(0) : "bof" == c.type || "eof" == c.type ? c.clss = "anchor" : "dot" == c.type && (c.clss = "charclass"), c
    }, b.parseGroup = function(a, b) {
        b.clss = "group";
        var c = a.substr(b.i + 1).match(/^\?(?::|<?[!=])/), d = c && c[0];
        return "?:" == d ? (b.l = 3, b.type = "noncapgroup") : d ? (b.behind = "<" == d[1], b.negative = "!" == d[1 + b.behind], b.clss = "lookaround", b.type = (b.negative ? "neg" : "pos") + "look" + (b.behind ? "behind" : "ahead"), b.l = d.length + 1, b.behind && (b.err = "lookbehind")) : (b.type = "group", b.capture = !0), b
    }, b.parseEsc = function(b, c, d, e, f) {
        var g, h, i = c.i, j = c.js, k = b.substr(i + 1), l = k[0];
        if (i + 1 == (f || b.length))
            return void (c.err = "esccharopen");
        if (!j && !d && (g = k.match(/^\d\d?/)) && (h = e[parseInt(g[0]) - 1]))
            return c.type = "backref", c.related = [h], c.group = h, c.l += g[0].length, c;
        if (g = k.match(/^u[\da-fA-F]{4}/))
            k = g[0].substr(1), c.type = "escunicode", c.l += 5, c.code = parseInt(k, 16);
        else if (g = k.match(/^x[\da-fA-F]{2}/))
            k = g[0].substr(1), c.type = "eschexadecimal", c.l += 3, c.code = parseInt(k, 16);
        else if (!j && (g = k.match(/^c[a-zA-Z]/))) {
            k = g[0].substr(1), c.type = "esccontrolchar", c.l += 2;
            var m = k.toUpperCase().charCodeAt(0) - 64;
            m > 0 && (c.code = m)
        } else if (g = k.match(/^[0-7]{1,3}/))
            k = g[0], parseInt(k, 8) > 255 && (k = k.substr(0, 2)), c.type = "escoctal", c.l += k.length, c.code = parseInt(k, 8);
        else {
            if (!j && "c" == l)
                return this.parseChar(b, c, d);
            if (c.l++, !j || "x" != l && "u" != l || (c.err = "esccharbad"), j || (c.type = a.ESC_CHARS_SPECIAL[l]), c.type)
                return c.clss = "b" == l.toLowerCase() ? "anchor" : "charclass", c;
            c.type = "escchar", c.code = a.ESC_CHAR_CODES[l], null == c.code && (c.code = l.charCodeAt(0))
        }
        return c.clss = "esc", c
    }, b.parseQuant = function(a, b) {
        b.type = b.clss = "quant";
        var c = b.i, d = a.indexOf("}", c + 1);
        b.l += d - c;
        var e = a.substring(c + 1, d).split(",");
        return b.min = parseInt(e[0]), b.max = null == e[1] ? b.min : "" == e[1] ? -1 : parseInt(e[1]), -1 != b.max && b.min > b.max && (b.err = "quantrev"), b
    }, b.validateRange = function(a, b) {
        var c = b.prev, d = b.next;
        return null == c.code || null == d.code ? this.parseChar(a, b) : (b.clss = "set", c.code > d.code && (b.err = "rangerev"), d.proxy = c.proxy = b, b.set = [c, b, d]), d
    }, window.RegExLexer = a
}(), function() {
    "use strict";
    var a = function() {
    }, b = a.prototype;
    a.SUBST_TYPES = {$: null,"&": "subst_match","`": "subst_pre","'": "subst_post"}, b.string = null, b.token = null, b.errors = null, b.substMode = !0, b.parse = function(a, b) {
        this.string = a, this.errors = [];
        for (var c = this.token = null, d = 0, e = a.length; e > d; d += g.l) {
            var f = a[d], g = {prev: c,i: d,l: 1,js: !0};
            this.substMode && "$" == f && e > d + 1 ? this.parseSubst(a, g, b) : "\\" == f && this.parseEsc(a, g, !1), g.type || (g.type = "js_char", g.code = f.charCodeAt(0)), c && (c.next = g), this.token || (this.token = g), g.end = g.i + g.l, g.err && this.errors.push(g.err), c = g
        }
        return this.token
    }, b.parseSubst = function(b, c, d) {
        var e = b.substr(c.i + 1).match(/^([$&`']|\d\d?)/);
        if (e) {
            var f = e[0];
            if (c.type = a.SUBST_TYPES[f], void 0 === c.type) {
                var g = parseInt(f), h = d.length;
                f.length > 1 && g > h && (f = f[0], g = parseInt(f)), g > 0 && h >= g && (c.type = "subst_num", c.group = d[g - 1], c.l += f.length - 1)
            }
            void 0 !== c.type && (c.clss = "subst", c.l++)
        }
    }, b.parseEsc = RegExLexer.prototype.parseEsc, window.SubstLexer = a
}(), function(a) {
    "use strict";
    var b = {};
    b.END_POINT = "php/RegExr.php", b.searchTags = function(a) {
        return b._createPromise("searchTags", {term: a})
    }, b.savePattern = function(a, c, d, e, f, g, h, i, j, k) {
        return b._createPromise("savePattern", {tags: a,name: c,pattern: d,content: e,replace: f,description: g,author: h,isPublic: i,id: j,token: k})
    }, b.search = function(a, c, d) {
        return b._createPromise("search", {query: a,startIndex: c || 0,limit: d || 100})
    }, b.rate = function(a, c) {
        return b._createPromise("rate", {patternID: a,rating: c})
    }, b.getPatternByID = function(a) {
        return b._createPromise("getPatternByID", {patternID: a})
    }, b.getPatternList = function(a) {
        if (!Array.isArray(a))
            throw new Error("You must pass an array,");
        return b._createPromise("getPatternList", {idList: a})
    }, b.trackVisit = function(a) {
        return b._createPromise("trackVisit", {id: a})
    }, b.changeCategory = function(a, c) {
        return b._createPromise("changeCategory", {patternID: a,newCategory: c})
    }, b._createPromise = function(a, c, d) {
        var e = new Promise(function(e, f) {
            var g = new XMLHttpRequest;
            g.open("POST", d || b.END_POINT, !0), g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), g.onreadystatechange = function() {
                if (4 == g.readyState) {
                    var a = g.response || g.responseText;
                    if (!a)
                        return void f({error: "No response."});
                    var b = null;
                    try {
                        b = JSON.parse(a)
                    } catch (c) {
                        return void f({error: c})
                    }
                    b.success ? e(b.data) : f(b.data)
                }
            };
            var h = c || {};
            for (var i in h) {
                var j = h[i];
                null == j ? h[i] = "" : Array.isArray(j) ? h[i] = j.join(",") : "boolean" == typeof j && (h[i] = j === !0 ? 1 : !1)
            }
            h.action = a;
            var k = [];
            for (var i in h)
                k.push(i + "=" + encodeURIComponent(h[i]));
            g.send(k.join("&"))
        });
        return e
    }, a.ServerModel = b
}(window), function(a) {
    "use strict";
    var b = {};
    createjs.EventDispatcher.initialize(b), b.docView = null, b.id = null, b._lastSave = null, b._lastSaveTags = null, b._saveState = null, b.savePattern = function(a, c, d, e, f, g, h, i, j, k) {
        return b._lastSaveTags = a, ServerModel.savePattern(a, c, d, e, f, g, h, i, j, k).then(dan.bind(b, b.handleSaveSuccess), dan.bind(b, b.handleSaveFail))
    }, b.saveState = function() {
        b._saveState = b.getState(), b._lastId = null
    }, b.isDirty = function() {
        var a = b._saveState !== b.getState();
        return a && b.id ? (b._lastId = b.id, b.id = null) : !a && b._lastId && (b.id = b._lastId), a
    }, b.getState = function() {
        var a = b.docView.getExpression() + b.docView.getText() + b.docView.getSubstitution();
        return a
    }, b.handleSaveSuccess = function(a) {
        b.saveState();
        var c = a.results[0], d = c.id;
        return a.token && Settings.setUpdateToken(d, a.token), b.id = d, b._lastSave = c, b.dispatchEvent("change"), a
    }, b.handleSaveFail = function(a) {
        throw a
    }, b.setLastSave = function(a) {
        b.id != a.id && (b.id = a.id, Settings.getUpdateToken(b.id) && (b._lastSave = a), b.dispatchEvent("change"))
    }, b.getLastSave = function() {
        return b._lastSave && !b._lastSave.tags && (b._lastSave.tags = b._lastSaveTags), b._lastSave
    }, b.setID = function(a) {
        b.id != a && (b.id = a, b.dispatchEvent("change"))
    }, a.ExpressionModel = b
}(window), function(a) {
    "use strict";
    var b = {};
    b.search = function(a, b, c) {
        var d = ServerModel.search(a, b, c);
        return d
    }, a.CommunityModel = b
}(window), function(a) {
    "use strict";
    var b = {};
    b.activePromise = null, b.existing = null, b.search = function(a, c) {
        if (b.activePromise && (b.activePromise.cancelled = !0), b.existing = {}, c)
            for (var d = 0; d < c.length; d++)
                b.existing[c[d].toLocaleLowerCase()] = !0;
        return b.activePromise = ServerModel.searchTags(a), b.activePromise.cancelled = !1, b.activePromise.then(b.handleTagsLoad), b.activePromise.then(b.handleTagsLoad)
    }, b.handleTagsLoad = function(a) {
        for (var c = [], d = 0; d < a.length; d++)
            b.existing[a[d].name.toLocaleLowerCase()] || c.push(a[d].name);
        return Promise.resolve(c)
    }, a.TagsModel = b
}(window);

