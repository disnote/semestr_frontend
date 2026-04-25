(function () {
    var display = document.getElementById("display");
    var keys = document.querySelector(".keys");

    function precedence(op) {
        if (op === "+" || op === "-") return 1;
        if (op === "*" || op === "/") return 2;
        return 0;
    }

    function tokenize(str) {
        var s = str.replace(/\s/g, "");
        if (!s) throw new Error("empty");
        var tokens = [];
        var i = 0;

        while (i < s.length) {
            var c = s[i];
            if (c >= "0" && c <= "9") {
                var val = 0;
                while (i < s.length && s[i] >= "0" && s[i] <= "9") {
                    val = val * 10 + (s.charCodeAt(i) - 48);
                    i++;
                }
                tokens.push({ t: "n", v: val });
                continue;
            }
            if (c === "(") {
                tokens.push({ t: "p", v: "(" });
                i++;
                continue;
            }
            if (c === ")") {
                tokens.push({ t: "p", v: ")" });
                i++;
                continue;
            }
            if ("+-*/".indexOf(c) !== -1) {
                var prev = tokens.length ? tokens[tokens.length - 1] : null;
                var unaryMinus =
                    c === "-" &&
                    (!prev ||
                        prev.t === "op" ||
                        (prev.t === "p" && prev.v === "("));
                if (unaryMinus) {
                    i++;
                    if (i < s.length && s[i] >= "0" && s[i] <= "9") {
                        var n = 0;
                        while (i < s.length && s[i] >= "0" && s[i] <= "9") {
                            n = n * 10 + (s.charCodeAt(i) - 48);
                            i++;
                        }
                        tokens.push({ t: "n", v: -n });
                    } else {
                        throw new Error("unary");
                    }
                    continue;
                }
                tokens.push({ t: "op", v: c });
                i++;
                continue;
            }
            throw new Error("badchar");
        }
        return tokens;
    }

    function toRPN(tokens) {
        var output = [];
        var stack = [];

        for (var k = 0; k < tokens.length; k++) {
            var tok = tokens[k];
            if (tok.t === "n") {
                output.push(tok);
            } else if (tok.t === "op") {
                while (stack.length) {
                    var top = stack[stack.length - 1];
                    if (
                        top.t === "op" &&
                        precedence(top.v) >= precedence(tok.v)
                    ) {
                        output.push(stack.pop());
                    } else {
                        break;
                    }
                }
                stack.push(tok);
            } else if (tok.t === "p" && tok.v === "(") {
                stack.push(tok);
            } else if (tok.t === "p" && tok.v === ")") {
                while (
                    stack.length &&
                    !(
                        stack[stack.length - 1].t === "p" &&
                        stack[stack.length - 1].v === "("
                    )
                ) {
                    output.push(stack.pop());
                }
                if (!stack.length) throw new Error("paren");
                stack.pop();
            }
        }
        while (stack.length) {
            var t = stack.pop();
            if (t.t === "p") throw new Error("paren");
            output.push(t);
        }
        return output;
    }

    function evalRPN(rpn) {
        var st = [];
        for (var i = 0; i < rpn.length; i++) {
            var tok = rpn[i];
            if (tok.t === "n") {
                st.push(tok.v);
            } else {
                var b = st.pop();
                var a = st.pop();
                if (a === undefined || b === undefined) throw new Error("stack");
                var r;
                if (tok.v === "+") r = a + b;
                else if (tok.v === "-") r = a - b;
                else if (tok.v === "*") r = a * b;
                else if (tok.v === "/") {
                    if (b === 0) throw new Error("div0");
                    r = a / b;
                } else throw new Error("op");
                st.push(r);
            }
        }
        if (st.length !== 1) throw new Error("end");
        return st[0];
    }

    function evaluate(expr) {
        var tokens = tokenize(expr);
        var rpn = toRPN(tokens);
        return evalRPN(rpn);
    }

    function formatResult(x) {
        if (!isFinite(x)) throw new Error("nan");
        if (Math.round(x) === x && Math.abs(x) < 1e15) return String(x);
        var s = String(x);
        if (s.length > 14) return x.toPrecision(10);
        return s;
    }

    keys.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;

        if (btn.dataset.action === "clear") {
            display.value = "";
            return;
        }

        if (btn.dataset.action === "equals") {
            try {
                var res = evaluate(display.value);
                display.value = formatResult(res);
            } catch (err) {
                display.value = "Ошибка";
            }
            return;
        }

        var ch = btn.dataset.append;
        if (ch !== undefined) {
            if (display.value === "Ошибка") display.value = "";
            display.value += ch;
        }
    });
})();
