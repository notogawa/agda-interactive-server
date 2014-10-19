var Input = (function () {
    function Input () {
        this._dict = {};
        this._tex = {};
        function to_list(str) { return str.replace(/ /g,'').split(''); }

        // M-x describe-input-method TeX
        // this._tex["!`"] = ["¡"]; // !`	¡
        // this._tex["--"] = ["–"]; // --	–
        // this._tex["?`"] = ["¿"]; // ?`	¿
        // this._tex[""] = [" "]; // \	 
        this._tex["\""] = ["̈"]; // \"	̈
        this._tex["'"] = ["́"]; // \'	́
        this._tex[","] = [" "]; // \,	 
        this._tex["-"] = ["­"]; // \-	­
        this._tex["."] = ["̇"]; // \.	̇
        this._tex["/"] = ["‌"]; // \/	‌
        this._tex[":"] = [" "]; // \:
        this._tex[";"] = [" "]; // \;
        this._tex["="] = ["̄"]; // \=	̄
        this._tex["H"] = ["̋"]; // \H	̋
        this._tex["L"] = ["Ł"]; // \L	Ł
        this._tex["O"] = ["Ø"]; // \O	Ø
        this._tex["P"] = ["¶"]; // \P	¶
        this._tex["S"] = ["§"]; // \S	§
        this._tex["^"] = ["̂"]; // \^	̂
        this._tex["`"] = ["̀"]; // \`	̀
        this._tex["b"] = ["̱"]; // \b	̱
        this._tex["c"] = ["̧"]; // \c	̧
        this._tex["d"] = ["̣"]; // \d	̣
        this._tex["i"] = ["ı"]; // \i	ı
        this._tex["k"] = ["̨"]; // \k	̨
        this._tex["l"] = ["ł"]; // \l	ł
        this._tex["o"] = ["ø"]; // \o	ø
        this._tex["u"] = ["̆"]; // \u	̆
        this._tex["v"] = ["̌"]; // \v	̌
        this._tex["~"] = ["̃"]; // \~	̃
        this._tex["^("] = ["⁽"]; // ^(	⁽
        this._tex["^)"] = ["⁾"]; // ^)	⁾
        this._tex["^+"] = ["⁺"]; // ^+	⁺
        this._tex["^-"] = ["⁻"]; // ^-	⁻
        this._tex["^0"] = ["⁰"]; // ^0	⁰
        this._tex["^1"] = ["¹"]; // ^1	¹
        this._tex["^2"] = ["²"]; // ^2	²
        this._tex["^3"] = ["³"]; // ^3	³
        this._tex["^4"] = ["⁴"]; // ^4	⁴
        this._tex["^5"] = ["⁵"]; // ^5	⁵
        this._tex["^6"] = ["⁶"]; // ^6	⁶
        this._tex["^7"] = ["⁷"]; // ^7	⁷
        this._tex["^8"] = ["⁸"]; // ^8	⁸
        this._tex["^9"] = ["⁹"]; // ^9	⁹
        this._tex["^="] = ["⁼"]; // ^=	⁼
        this._tex["^A"] = ["ᴬ"]; // ^A	ᴬ
        this._tex["^B"] = ["ᴮ"]; // ^B	ᴮ
        this._tex["^D"] = ["ᴰ"]; // ^D	ᴰ
        this._tex["^E"] = ["ᴱ"]; // ^E	ᴱ
        this._tex["^G"] = ["ᴳ"]; // ^G	ᴳ
        this._tex["^H"] = ["ᴴ"]; // ^H	ᴴ
        this._tex["^I"] = ["ᴵ"]; // ^I	ᴵ
        this._tex["^J"] = ["ᴶ"]; // ^J	ᴶ
        this._tex["^K"] = ["ᴷ"]; // ^K	ᴷ
        this._tex["^L"] = ["ᴸ"]; // ^L	ᴸ
        this._tex["^M"] = ["ᴹ"]; // ^M	ᴹ
        this._tex["^N"] = ["ᴺ"]; // ^N	ᴺ
        this._tex["^O"] = ["ᴼ"]; // ^O	ᴼ
        this._tex["^P"] = ["ᴾ"]; // ^P	ᴾ
        this._tex["^R"] = ["ᴿ"]; // ^R	ᴿ
        this._tex["^T"] = ["ᵀ"]; // ^T	ᵀ
        this._tex["^U"] = ["ᵁ"]; // ^U	ᵁ
        this._tex["^V"] = ["ⱽ"]; // ^V	ⱽ
        this._tex["^W"] = ["ᵂ"]; // ^W	ᵂ
        this._tex["^a"] = ["ᵃ"]; // ^a	ᵃ
        this._tex["^b"] = ["ᵇ"]; // ^b	ᵇ
        this._tex["^c"] = ["ᶜ"]; // ^c	ᶜ
        this._tex["^d"] = ["ᵈ"]; // ^d	ᵈ
        this._tex["^e"] = ["ᵉ"]; // ^e	ᵉ
        this._tex["^f"] = ["ᶠ"]; // ^f	ᶠ
        this._tex["^g"] = ["ᵍ"]; // ^g	ᵍ
        this._tex["^h"] = ["ʰ"]; // ^h	ʰ
        this._tex["^i"] = ["ⁱ"]; // ^i	ⁱ
        this._tex["^j"] = ["ʲ"]; // ^j	ʲ
        this._tex["^k"] = ["ᵏ"]; // ^k	ᵏ
        this._tex["^l"] = ["ˡ"]; // ^l	ˡ
        this._tex["^m"] = ["ᵐ"]; // ^m	ᵐ
        this._tex["^n"] = ["ⁿ"]; // ^n	ⁿ
        // this._tex["^o"] = ["ᵒ"]; // ^o	ᵒ
        this._tex["^p"] = ["ᵖ"]; // ^p	ᵖ
        this._tex["^r"] = ["ʳ"]; // ^r	ʳ
        this._tex["^s"] = ["ˢ"]; // ^s	ˢ
        this._tex["^t"] = ["ᵗ"]; // ^t	ᵗ
        this._tex["^u"] = ["ᵘ"]; // ^u	ᵘ
        this._tex["^v"] = ["ᵛ"]; // ^v	ᵛ
        this._tex["^w"] = ["ʷ"]; // ^w	ʷ
        this._tex["^x"] = ["ˣ"]; // ^x	ˣ
        this._tex["^y"] = ["ʸ"]; // ^y	ʸ
        this._tex["^z"] = ["ᶻ"]; // ^z	ᶻ
        this._tex["_("] = ["₍"]; // _(	₍
        this._tex["_)"] = ["₎"]; // _)	₎
        this._tex["_+"] = ["₊"]; // _+	₊
        this._tex["_-"] = ["₋"]; // _-	₋
        this._tex["_0"] = ["₀"]; // _0	₀
        this._tex["_1"] = ["₁"]; // _1	₁
        this._tex["_2"] = ["₂"]; // _2	₂
        this._tex["_3"] = ["₃"]; // _3	₃
        this._tex["_4"] = ["₄"]; // _4	₄
        this._tex["_5"] = ["₅"]; // _5	₅
        this._tex["_6"] = ["₆"]; // _6	₆
        this._tex["_7"] = ["₇"]; // _7	₇
        this._tex["_8"] = ["₈"]; // _8	₈
        this._tex["_9"] = ["₉"]; // _9	₉
        this._tex["_="] = ["₌"]; // _=	₌
        this._tex["_a"] = ["ₐ"]; // _a	ₐ
        this._tex["_e"] = ["ₑ"]; // _e	ₑ
        this._tex["_h"] = ["ₕ"]; // _h	ₕ
        this._tex["_i"] = ["ᵢ"]; // _i	ᵢ
        this._tex["_j"] = ["ⱼ"]; // _j	ⱼ
        this._tex["_k"] = ["ₖ"]; // _k	ₖ
        this._tex["_l"] = ["ₗ"]; // _l	ₗ
        this._tex["_m"] = ["ₘ"]; // _m	ₘ
        this._tex["_n"] = ["ₙ"]; // _n	ₙ
        this._tex["_o"] = ["ₒ"]; // _o	ₒ
        this._tex["_p"] = ["ₚ"]; // _p	ₚ
        this._tex["_r"] = ["ᵣ"]; // _r	ᵣ
        this._tex["_s"] = ["ₛ"]; // _s	ₛ
        this._tex["_t"] = ["ₜ"]; // _t	ₜ
        this._tex["_u"] = ["ᵤ"]; // _u	ᵤ
        this._tex["_v"] = ["ᵥ"]; // _v	ᵥ
        this._tex["_x"] = ["ₓ"]; // _x	ₓ
        // this._tex["---"] = ["—"]; // ---	—
        this._tex["\"'"] = ["“"]; // \"'	“
        this._tex["\"<"] = ["«"]; // \"<	«
        this._tex["\">"] = ["»"]; // \">	»
        this._tex["\"H"] = ["Ḧ"]; // \"H	Ḧ
        this._tex["\"W"] = ["Ẅ"]; // \"W	Ẅ
        this._tex["\"X"] = ["Ẍ"]; // \"X	Ẍ
        this._tex["\"Y"] = ["Ÿ"]; // \"Y	Ÿ
        this._tex["\"`"] = ["„"]; // \"`	„
        this._tex["\"h"] = ["ḧ"]; // \"h	ḧ
        this._tex["\"t"] = ["ẗ"]; // \"t	ẗ
        this._tex["\"w"] = ["ẅ"]; // \"w	ẅ
        this._tex["\"x"] = ["ẍ"]; // \"x	ẍ
        this._tex["\"y"] = ["ÿ"]; // \"y	ÿ
        this._tex["'A"] = ["Á"]; // \'A	Á
        this._tex["'C"] = ["Ć"]; // \'C	Ć
        this._tex["'E"] = ["É"]; // \'E	É
        this._tex["'G"] = ["Ǵ"]; // \'G	Ǵ
        this._tex["'I"] = ["Í"]; // \'I	Í
        this._tex["'K"] = ["Ḱ"]; // \'K	Ḱ
        this._tex["'L"] = ["Ĺ"]; // \'L	Ĺ
        this._tex["'M"] = ["Ḿ"]; // \'M	Ḿ
        this._tex["'N"] = ["Ń"]; // \'N	Ń
        this._tex["'O"] = ["Ó"]; // \'O	Ó
        this._tex["'P"] = ["Ṕ"]; // \'P	Ṕ
        this._tex["'R"] = ["Ŕ"]; // \'R	Ŕ
        this._tex["'U"] = ["Ú"]; // \'U	Ú
        this._tex["'W"] = ["Ẃ"]; // \'W	Ẃ
        this._tex["'Y"] = ["Ý"]; // \'Y	Ý
        this._tex["'Z"] = ["Ź"]; // \'Z	Ź
        this._tex["'a"] = ["á"]; // \'a	á
        this._tex["'c"] = ["ć"]; // \'c	ć
        this._tex["'e"] = ["é"]; // \'e	é
        this._tex["'g"] = ["ǵ"]; // \'g	ǵ
        this._tex["'i"] = ["í"]; // \'i	í
        this._tex["'k"] = ["ḱ"]; // \'k	ḱ
        this._tex["'l"] = ["ĺ"]; // \'l	ĺ
        this._tex["'m"] = ["ḿ"]; // \'m	ḿ
        this._tex["'n"] = ["ń"]; // \'n	ń
        this._tex["'o"] = ["ó"]; // \'o	ó
        this._tex["'p"] = ["ṕ"]; // \'p	ṕ
        this._tex["'r"] = ["ŕ"]; // \'r	ŕ
        this._tex["'u"] = ["ú"]; // \'u	ú
        this._tex["'w"] = ["ẃ"]; // \'w	ẃ
        this._tex["'y"] = ["ý"]; // \'y	ý
        this._tex["'z"] = ["ź"]; // \'z	ź
        this._tex[".B"] = ["Ḃ"]; // \.B	Ḃ
        this._tex[".C"] = ["Ċ"]; // \.C	Ċ
        this._tex[".D"] = ["Ḋ"]; // \.D	Ḋ
        this._tex[".E"] = ["Ė"]; // \.E	Ė
        this._tex[".F"] = ["Ḟ"]; // \.F	Ḟ
        this._tex[".G"] = ["Ġ"]; // \.G	Ġ
        this._tex[".H"] = ["Ḣ"]; // \.H	Ḣ
        this._tex[".I"] = ["İ"]; // \.I	İ
        this._tex[".M"] = ["Ṁ"]; // \.M	Ṁ
        this._tex[".N"] = ["Ṅ"]; // \.N	Ṅ
        this._tex[".P"] = ["Ṗ"]; // \.P	Ṗ
        this._tex[".R"] = ["Ṙ"]; // \.R	Ṙ
        this._tex[".S"] = ["Ṡ"]; // \.S	Ṡ
        this._tex[".T"] = ["Ṫ"]; // \.T	Ṫ
        this._tex[".W"] = ["Ẇ"]; // \.W	Ẇ
        this._tex[".X"] = ["Ẋ"]; // \.X	Ẋ
        this._tex[".Y"] = ["Ẏ"]; // \.Y	Ẏ
        this._tex[".Z"] = ["Ż"]; // \.Z	Ż
        this._tex[".b"] = ["ḃ"]; // \.b	ḃ
        this._tex[".c"] = ["ċ"]; // \.c	ċ
        this._tex[".d"] = ["ḋ"]; // \.d	ḋ
        this._tex[".e"] = ["ė"]; // \.e	ė
        this._tex[".f"] = ["ḟ"]; // \.f	ḟ
        this._tex[".g"] = ["ġ"]; // \.g	ġ
        this._tex[".h"] = ["ḣ"]; // \.h	ḣ
        this._tex[".m"] = ["ṁ"]; // \.m	ṁ
        this._tex[".n"] = ["ṅ"]; // \.n	ṅ
        this._tex[".p"] = ["ṗ"]; // \.p	ṗ
        this._tex[".r"] = ["ṙ"]; // \.r	ṙ
        this._tex[".s"] = ["ṡ"]; // \.s	ṡ
        this._tex[".t"] = ["ṫ"]; // \.t	ṫ
        this._tex[".w"] = ["ẇ"]; // \.w	ẇ
        this._tex[".x"] = ["ẋ"]; // \.x	ẋ
        this._tex[".y"] = ["ẏ"]; // \.y	ẏ
        this._tex[".z"] = ["ż"]; // \.z	ż
        this._tex["=A"] = ["Ā"]; // \=A	Ā
        this._tex["=G"] = ["Ḡ"]; // \=G	Ḡ
        this._tex["=Y"] = ["Ȳ"]; // \=Y	Ȳ
        this._tex["=a"] = ["ā"]; // \=a	ā
        this._tex["=g"] = ["ḡ"]; // \=g	ḡ
        this._tex["=y"] = ["ȳ"]; // \=y	ȳ
        this._tex["AA"] = ["Å"]; // \AA	Å
        this._tex["AE"] = ["Æ"]; // \AE	Æ
        this._tex["DH"] = ["Ð"]; // \DH	Ð
        this._tex["HO"] = ["Ő"]; // \HO	Ő
        this._tex["Ho"] = ["ő"]; // \Ho	ő
        this._tex["Im"] = ["ℑ"]; // \Im	ℑ
        this._tex["Ll"] = ["⋘"]; // \Ll	⋘
        this._tex["Mu"] = ["Μ"]; // \Mu	Μ
        this._tex["Nu"] = ["Ν"]; // \Nu	Ν
        this._tex["OE"] = ["Œ"]; // \OE	Œ
        this._tex["Pi"] = ["Π"]; // \Pi	Π
        this._tex["Re"] = ["ℜ"]; // \Re	ℜ
        this._tex["TH"] = ["Þ"]; // \TH	Þ
        this._tex["Uo"] = ["ő"]; // \Uo	ő
        this._tex["Xi"] = ["Ξ"]; // \Xi	Ξ
        this._tex["^C"] = ["Ĉ"]; // \^C	Ĉ
        this._tex["^D"] = ["Ḓ"]; // \^D	Ḓ
        this._tex["^G"] = ["Ĝ"]; // \^G	Ĝ
        this._tex["^H"] = ["Ĥ"]; // \^H	Ĥ
        this._tex["^I"] = ["Î"]; // \^I	Î
        this._tex["^J"] = ["Ĵ"]; // \^J	Ĵ
        this._tex["^L"] = ["Ḽ"]; // \^L	Ḽ
        this._tex["^N"] = ["Ṋ"]; // \^N	Ṋ
        this._tex["^S"] = ["Ŝ"]; // \^S	Ŝ
        this._tex["^T"] = ["Ṱ"]; // \^T	Ṱ
        this._tex["^W"] = ["Ŵ"]; // \^W	Ŵ
        this._tex["^Y"] = ["Ŷ"]; // \^Y	Ŷ
        this._tex["^Z"] = ["Ẑ"]; // \^Z	Ẑ
        this._tex["^c"] = ["ĉ"]; // \^c	ĉ
        this._tex["^d"] = ["ḓ"]; // \^d	ḓ
        this._tex["^g"] = ["ĝ"]; // \^g	ĝ
        this._tex["^h"] = ["ĥ"]; // \^h	ĥ
        this._tex["^i"] = ["î"]; // \^i	î
        this._tex["^j"] = ["ĵ"]; // \^j	ĵ
        this._tex["^l"] = ["ḽ"]; // \^l	ḽ
        this._tex["^n"] = ["ṋ"]; // \^n	ṋ
        this._tex["^s"] = ["ŝ"]; // \^s	ŝ
        this._tex["^t"] = ["ṱ"]; // \^t	ṱ
        this._tex["^w"] = ["ŵ"]; // \^w	ŵ
        this._tex["^y"] = ["ŷ"]; // \^y	ŷ
        this._tex["^z"] = ["ẑ"]; // \^z	ẑ
        this._tex["`A"] = ["À"]; // \`A	À
        this._tex["`E"] = ["È"]; // \`E	È
        this._tex["`N"] = ["Ǹ"]; // \`N	Ǹ
        this._tex["`O"] = ["Ò"]; // \`O	Ò
        this._tex["`U"] = ["Ù"]; // \`U	Ù
        this._tex["`W"] = ["Ẁ"]; // \`W	Ẁ
        this._tex["`Y"] = ["Ỳ"]; // \`Y	Ỳ
        this._tex["`a"] = ["à"]; // \`a	à
        this._tex["`e"] = ["è"]; // \`e	è
        this._tex["`n"] = ["ǹ"]; // \`n	ǹ
        this._tex["`o"] = ["ò"]; // \`o	ò
        this._tex["`u"] = ["ù"]; // \`u	ù
        this._tex["`w"] = ["ẁ"]; // \`w	ẁ
        this._tex["`y"] = ["ỳ"]; // \`y	ỳ
        this._tex["aa"] = ["å"]; // \aa	å
        this._tex["ae"] = ["æ"]; // \ae	æ
        this._tex["cD"] = ["Ḑ"]; // \cD	Ḑ
        this._tex["cG"] = ["Ģ"]; // \cG	Ģ
        this._tex["cH"] = ["Ḩ"]; // \cH	Ḩ
        this._tex["cK"] = ["Ķ"]; // \cK	Ķ
        this._tex["cL"] = ["Ļ"]; // \cL	Ļ
        this._tex["cN"] = ["Ņ"]; // \cN	Ņ
        this._tex["cR"] = ["Ŗ"]; // \cR	Ŗ
        this._tex["cS"] = ["Ş"]; // \cS	Ş
        this._tex["cT"] = ["Ţ"]; // \cT	Ţ
        this._tex["cd"] = ["ḑ"]; // \cd	ḑ
        this._tex["cg"] = ["ģ"]; // \cg	ģ
        this._tex["ch"] = ["ḩ"]; // \ch	ḩ
        this._tex["ck"] = ["ķ"]; // \ck	ķ
        this._tex["cl"] = ["ļ"]; // \cl	ļ
        this._tex["cn"] = ["ņ"]; // \cn	ņ
        this._tex["cr"] = ["ŗ"]; // \cr	ŗ
        this._tex["cs"] = ["ş"]; // \cs	ş
        this._tex["ct"] = ["ţ"]; // \ct	ţ
        this._tex["dh"] = ["ð"]; // \dh	ð
        this._tex["ge"] = ["≥"]; // \ge	≥
        this._tex["gg"] = ["≫"]; // \gg	≫
        this._tex["in"] = ["∈"]; // \in	∈
        this._tex["le"] = ["≤"]; // \le	≤
        this._tex["ll"] = ["≪"]; // \ll	≪
        this._tex["lq"] = ["‘"]; // \lq	‘
        this._tex["mp"] = ["∓"]; // \mp	∓
        this._tex["mu"] = ["μ"]; // \mu	μ
        this._tex["ne"] = ["≠"]; // \ne	≠
        this._tex["ni"] = ["∋"]; // \ni	∋
        this._tex["nu"] = ["ν"]; // \nu	ν
        this._tex["oe"] = ["œ"]; // \oe	œ
        this._tex["pi"] = ["π"]; // \pi	π
        this._tex["pm"] = ["±"]; // \pm	±
        this._tex["rq"] = ["’"]; // \rq	’
        this._tex["ss"] = ["ß"]; // \ss	ß
        this._tex["th"] = ["þ"]; // \th	þ
        this._tex["to"] = ["→"]; // \to	→
        this._tex["uE"] = ["Ĕ"]; // \uE	Ĕ
        this._tex["uG"] = ["Ğ"]; // \uG	Ğ
        this._tex["uH"] = ["Ḫ"]; // \uH	Ḫ
        this._tex["uI"] = ["Ĭ"]; // \uI	Ĭ
        this._tex["uO"] = ["Ŏ"]; // \uO	Ŏ
        this._tex["uU"] = ["Ŭ"]; // \uU	Ŭ
        this._tex["ue"] = ["ĕ"]; // \ue	ĕ
        this._tex["ug"] = ["ğ"]; // \ug	ğ
        this._tex["uh"] = ["ḫ"]; // \uh	ḫ
        this._tex["ui"] = ["ĭ"]; // \ui	ĭ
        this._tex["uo"] = ["ŏ"]; // \uo	ŏ
        this._tex["uu"] = ["ŭ"]; // \uu	ŭ
        this._tex["vA"] = ["Ǎ"]; // \vA	Ǎ
        this._tex["vC"] = ["Č"]; // \vC	Č
        this._tex["vD"] = ["Ď"]; // \vD	Ď
        this._tex["vE"] = ["Ě"]; // \vE	Ě
        this._tex["vG"] = ["Ǧ"]; // \vG	Ǧ
        this._tex["vH"] = ["Ȟ"]; // \vH	Ȟ
        this._tex["vI"] = ["Ǐ"]; // \vI	Ǐ
        this._tex["vK"] = ["Ǩ"]; // \vK	Ǩ
        this._tex["vL"] = ["Ľ"]; // \vL	Ľ
        this._tex["vN"] = ["Ň"]; // \vN	Ň
        this._tex["vO"] = ["Ǒ"]; // \vO	Ǒ
        this._tex["vR"] = ["Ř"]; // \vR	Ř
        this._tex["vT"] = ["Ť"]; // \vT	Ť
        this._tex["vU"] = ["Ǔ"]; // \vU	Ǔ
        this._tex["vZ"] = ["Ž"]; // \vZ	Ž
        this._tex["va"] = ["ǎ"]; // \va	ǎ
        this._tex["vc"] = ["č"]; // \vc	č
        this._tex["vd"] = ["ď"]; // \vd	ď
        this._tex["ve"] = ["ě"]; // \ve	ě
        this._tex["vg"] = ["ǧ"]; // \vg	ǧ
        this._tex["vh"] = ["ȟ"]; // \vh	ȟ
        this._tex["vi"] = ["ǐ"]; // \vi	ǐ
        this._tex["vj"] = ["ǰ"]; // \vj	ǰ
        this._tex["vk"] = ["ǩ"]; // \vk	ǩ
        this._tex["vl"] = ["ľ"]; // \vl	ľ
        this._tex["vn"] = ["ň"]; // \vn	ň
        this._tex["vo"] = ["ǒ"]; // \vo	ǒ
        this._tex["vr"] = ["ř"]; // \vr	ř
        this._tex["vt"] = ["ť"]; // \vt	ť
        this._tex["vu"] = ["ǔ"]; // \vu	ǔ
        this._tex["wp"] = ["℘"]; // \wp	℘
        this._tex["wr"] = ["≀"]; // \wr	≀
        this._tex["xi"] = ["ξ"]; // \xi	ξ
        this._tex["~A"] = ["Ã"]; // \~A	Ã
        this._tex["~N"] = ["Ñ"]; // \~N	Ñ
        this._tex["~V"] = ["Ṽ"]; // \~V	Ṽ
        this._tex["~Y"] = ["Ỹ"]; // \~Y	Ỹ
        this._tex["~a"] = ["ã"]; // \~a	ã
        this._tex["~n"] = ["ñ"]; // \~n	ñ
        this._tex["~v"] = ["ṽ"]; // \~v	ṽ
        this._tex["~y"] = ["ỹ"]; // \~y	ỹ
        this._tex["^o_"] = ["º"]; // ^o_	º
        // this._tex["$^1$"] = ["¹"]; // $^1$	¹
        // this._tex["$^2$"] = ["²"]; // $^2$	²
        // this._tex["$^3$"] = ["³"]; // $^3$	³
        // this._tex["$^a$"] = ["ª"]; // $^a$	ª
        // this._tex["$^o$"] = ["º"]; // $^o$	º
        this._tex["\"{}"] = ["¨"]; // \"{}	¨
        this._tex["'\O"] = ["Ǿ"]; // \'\O	Ǿ
        this._tex["'\o"] = ["ǿ"]; // \'\o	ǿ
        this._tex["'{}"] = ["´"]; // \'{}	´
        this._tex[".{}"] = ["˙"]; // \.{}	˙
        this._tex["={}"] = ["¯"]; // \={}	¯
        this._tex["Box"] = ["□"]; // \Box	□
        this._tex["Cap"] = ["⋒"]; // \Cap	⋒
        this._tex["Chi"] = ["Χ"]; // \Chi	Χ
        this._tex["Cup"] = ["⋓"]; // \Cup	⋓
        this._tex["Dei"] = ["Ϯ"]; // \Dei	Ϯ
        this._tex["Eta"] = ["Η"]; // \Eta	Η
        this._tex["Fei"] = ["Ϥ"]; // \Fei	Ϥ
        this._tex["H{}"] = ["˝"]; // \H{}	˝
        this._tex["Lsh"] = ["↰"]; // \Lsh	↰
        this._tex["Phi"] = ["Φ"]; // \Phi	Φ
        this._tex["Psi"] = ["Ψ"]; // \Psi	Ψ
        this._tex["Rho"] = ["Ρ"]; // \Rho	Ρ
        this._tex["Rsh"] = ["↱"]; // \Rsh	↱
        this._tex["San"] = ["Ϻ"]; // \San	Ϻ
        this._tex["Sho"] = ["Ϸ"]; // \Sho	Ϸ
        this._tex["Tau"] = ["Τ"]; // \Tau	Τ
        this._tex["ast"] = ["∗"]; // \ast	∗
        this._tex["bot"] = ["⊥"]; // \bot	⊥
        this._tex["cap"] = ["∩"]; // \cap	∩
        this._tex["chi"] = ["χ"]; // \chi	χ
        this._tex["cup"] = ["∪"]; // \cup	∪
        this._tex["c{}"] = ["¸"]; // \c{}	¸
        this._tex["dag"] = ["†"]; // \dag	†
        this._tex["dei"] = ["ϯ"]; // \dei	ϯ
        this._tex["div"] = ["÷"]; // \div	÷
        this._tex["ell"] = ["ℓ"]; // \ell	ℓ
        this._tex["eta"] = ["η"]; // \eta	η
        this._tex["fei"] = ["ϥ"]; // \fei	ϥ
        this._tex["flq"] = ["‹"]; // \flq	‹
        this._tex["frq"] = ["›"]; // \frq	›
        // this._tex["geq"] = ["≥"]; // \geq	≥
        this._tex["ggg"] = ["⋙"]; // \ggg	⋙
        this._tex["glq"] = ["‚"]; // \glq	‚
        this._tex["grq"] = ["‘"]; // \grq	‘
        this._tex["iff"] = ["⇔"]; // \iff	⇔
        this._tex["int"] = ["∫"]; // \int	∫
        this._tex["kip"] = ["₭"]; // \kip	₭
        this._tex["k{}"] = ["˛"]; // \k{}	˛
        this._tex["ldq"] = ["“"]; // \ldq	“
        // this._tex["leq"] = ["≤"]; // \leq	≤
        this._tex["lhd"] = ["◁"]; // \lhd	◁
        this._tex["mho"] = ["℧"]; // \mho	℧
        this._tex["mid"] = ["∣"]; // \mid	∣
        this._tex["neg"] = ["¬"]; // \neg	¬
        this._tex["neq"] = ["≠"]; // \neq	≠
        this._tex["ohm"] = ["Ω"]; // \ohm	Ω
        this._tex["per"] = ["⅌"]; // \per	⅌
        this._tex["phi"] = ["φ"]; // \phi	φ
        this._tex["psi"] = ["ψ"]; // \psi	ψ
        // this._tex["qed"] = ["∎"]; // \qed	∎
        this._tex["rdq"] = ["”"]; // \rdq	”
        this._tex["rhd"] = ["▷"]; // \rhd	▷
        this._tex["rho"] = ["ρ"]; // \rho	ρ
        this._tex["san"] = ["ϻ"]; // \san	ϻ
        this._tex["sbs"] = ["﹨"]; // \sbs	﹨
        this._tex["sho"] = ["ϸ"]; // \sho	ϸ
        this._tex["sim"] = ["∼"]; // \sim	∼
        this._tex["sum"] = ["∑"]; // \sum	∑
        this._tex["tau"] = ["τ"]; // \tau	τ
        this._tex["top"] = ["⊤"]; // \top	⊤
        this._tex["u{}"] = ["˘"]; // \u{}	˘
        this._tex["vee"] = ["∨"]; // \vee	∨
        this._tex["v{}"] = ["ˇ"]; // \v{}	ˇ
        this._tex["won"] = ["₩"]; // \won	₩
        this._tex["yen"] = ["¥"]; // \yen	¥
        this._tex["~{}"] = ["˜"]; // \~{}	˜
        this._tex["$\pm$"] = ["±"]; // $\pm$	±
        this._tex["\"{H}"] = ["Ḧ"]; // \"{H}	Ḧ
        this._tex["\"{W}"] = ["Ẅ"]; // \"{W}	Ẅ
        this._tex["\"{X}"] = ["Ẍ"]; // \"{X}	Ẍ
        this._tex["\"{Y}"] = ["Ÿ"]; // \"{Y}	Ÿ
        this._tex["\"{h}"] = ["ḧ"]; // \"{h}	ḧ
        this._tex["\"{t}"] = ["ẗ"]; // \"{t}	ẗ
        this._tex["\"{w}"] = ["ẅ"]; // \"{w}	ẅ
        this._tex["\"{x}"] = ["ẍ"]; // \"{x}	ẍ
        this._tex["\"{y}"] = ["ÿ"]; // \"{y}	ÿ
        this._tex["'\AE"] = ["Ǽ"]; // \'\AE	Ǽ
        this._tex["'\ae"] = ["ǽ"]; // \'\ae	ǽ
        this._tex["'{A}"] = ["Á"]; // \'{A}	Á
        this._tex["'{C}"] = ["Ć"]; // \'{C}	Ć
        this._tex["'{E}"] = ["É"]; // \'{E}	É
        this._tex["'{G}"] = ["Ǵ"]; // \'{G}	Ǵ
        this._tex["'{I}"] = ["Í"]; // \'{I}	Í
        this._tex["'{K}"] = ["Ḱ"]; // \'{K}	Ḱ
        this._tex["'{L}"] = ["Ĺ"]; // \'{L}	Ĺ
        this._tex["'{M}"] = ["Ḿ"]; // \'{M}	Ḿ
        this._tex["'{N}"] = ["Ń"]; // \'{N}	Ń
        this._tex["'{O}"] = ["Ó"]; // \'{O}	Ó
        this._tex["'{P}"] = ["Ṕ"]; // \'{P}	Ṕ
        this._tex["'{R}"] = ["Ŕ"]; // \'{R}	Ŕ
        this._tex["'{U}"] = ["Ú"]; // \'{U}	Ú
        this._tex["'{W}"] = ["Ẃ"]; // \'{W}	Ẃ
        this._tex["'{Y}"] = ["Ý"]; // \'{Y}	Ý
        this._tex["'{Z}"] = ["Ź"]; // \'{Z}	Ź
        this._tex["'{a}"] = ["á"]; // \'{a}	á
        this._tex["'{c}"] = ["ć"]; // \'{c}	ć
        this._tex["'{e}"] = ["é"]; // \'{e}	é
        this._tex["'{g}"] = ["ǵ"]; // \'{g}	ǵ
        this._tex["'{i}"] = ["í"]; // \'{i}	í
        this._tex["'{k}"] = ["ḱ"]; // \'{k}	ḱ
        this._tex["'{l}"] = ["ĺ"]; // \'{l}	ĺ
        this._tex["'{m}"] = ["ḿ"]; // \'{m}	ḿ
        this._tex["'{n}"] = ["ń"]; // \'{n}	ń
        this._tex["'{o}"] = ["ó"]; // \'{o}	ó
        this._tex["'{p}"] = ["ṕ"]; // \'{p}	ṕ
        this._tex["'{r}"] = ["ŕ"]; // \'{r}	ŕ
        this._tex["'{u}"] = ["ú"]; // \'{u}	ú
        this._tex["'{w}"] = ["ẃ"]; // \'{w}	ẃ
        this._tex["'{y}"] = ["ý"]; // \'{y}	ý
        this._tex["'{z}"] = ["ź"]; // \'{z}	ź
        this._tex[".{B}"] = ["Ḃ"]; // \.{B}	Ḃ
        this._tex[".{C}"] = ["Ċ"]; // \.{C}	Ċ
        this._tex[".{D}"] = ["Ḋ"]; // \.{D}	Ḋ
        this._tex[".{E}"] = ["Ė"]; // \.{E}	Ė
        this._tex[".{F}"] = ["Ḟ"]; // \.{F}	Ḟ
        this._tex[".{G}"] = ["Ġ"]; // \.{G}	Ġ
        this._tex[".{H}"] = ["Ḣ"]; // \.{H}	Ḣ
        this._tex[".{I}"] = ["İ"]; // \.{I}	İ
        this._tex[".{M}"] = ["Ṁ"]; // \.{M}	Ṁ
        this._tex[".{N}"] = ["Ṅ"]; // \.{N}	Ṅ
        this._tex[".{P}"] = ["Ṗ"]; // \.{P}	Ṗ
        this._tex[".{R}"] = ["Ṙ"]; // \.{R}	Ṙ
        this._tex[".{S}"] = ["Ṡ"]; // \.{S}	Ṡ
        this._tex[".{T}"] = ["Ṫ"]; // \.{T}	Ṫ
        this._tex[".{W}"] = ["Ẇ"]; // \.{W}	Ẇ
        this._tex[".{X}"] = ["Ẋ"]; // \.{X}	Ẋ
        this._tex[".{Y}"] = ["Ẏ"]; // \.{Y}	Ẏ
        this._tex[".{Z}"] = ["Ż"]; // \.{Z}	Ż
        this._tex[".{b}"] = ["ḃ"]; // \.{b}	ḃ
        this._tex[".{c}"] = ["ċ"]; // \.{c}	ċ
        this._tex[".{d}"] = ["ḋ"]; // \.{d}	ḋ
        this._tex[".{e}"] = ["ė"]; // \.{e}	ė
        this._tex[".{f}"] = ["ḟ"]; // \.{f}	ḟ
        this._tex[".{g}"] = ["ġ"]; // \.{g}	ġ
        this._tex[".{h}"] = ["ḣ"]; // \.{h}	ḣ
        this._tex[".{m}"] = ["ṁ"]; // \.{m}	ṁ
        this._tex[".{n}"] = ["ṅ"]; // \.{n}	ṅ
        this._tex[".{p}"] = ["ṗ"]; // \.{p}	ṗ
        this._tex[".{r}"] = ["ṙ"]; // \.{r}	ṙ
        this._tex[".{s}"] = ["ṡ"]; // \.{s}	ṡ
        this._tex[".{t}"] = ["ṫ"]; // \.{t}	ṫ
        this._tex[".{w}"] = ["ẇ"]; // \.{w}	ẇ
        this._tex[".{x}"] = ["ẋ"]; // \.{x}	ẋ
        this._tex[".{y}"] = ["ẏ"]; // \.{y}	ẏ
        this._tex[".{z}"] = ["ż"]; // \.{z}	ż
        this._tex["=\AE"] = ["Ǣ"]; // \=\AE	Ǣ
        this._tex["=\ae"] = ["ǣ"]; // \=\ae	ǣ
        this._tex["={A}"] = ["Ā"]; // \={A}	Ā
        this._tex["={G}"] = ["Ḡ"]; // \={G}	Ḡ
        this._tex["={Y}"] = ["Ȳ"]; // \={Y}	Ȳ
        this._tex["={a}"] = ["ā"]; // \={a}	ā
        this._tex["={g}"] = ["ḡ"]; // \={g}	ḡ
        this._tex["={y}"] = ["ȳ"]; // \={y}	ȳ
        this._tex["Beta"] = ["Β"]; // \Beta	Β
        this._tex["Heta"] = ["Ͱ"]; // \Heta	Ͱ
        this._tex["Hori"] = ["Ϩ"]; // \Hori	Ϩ
        this._tex["H{O}"] = ["Ő"]; // \H{O}	Ő
        this._tex["H{o}"] = ["ő"]; // \H{o}	ő
        this._tex["Iota"] = ["Ι"]; // \Iota	Ι
        this._tex["Join"] = ["⋈"]; // \Join	⋈
        this._tex["Khei"] = ["Ϧ"]; // \Khei	Ϧ
        this._tex["Shei"] = ["Ϣ"]; // \Shei	Ϣ
        this._tex["U{o}"] = ["ő"]; // \U{o}	ő
        this._tex["Vert"] = ["‖"]; // \Vert	‖
        this._tex["Zeta"] = ["Ζ"]; // \Zeta	Ζ
        this._tex["^{C}"] = ["Ĉ"]; // \^{C}	Ĉ
        this._tex["^{D}"] = ["Ḓ"]; // \^{D}	Ḓ
        this._tex["^{G}"] = ["Ĝ"]; // \^{G}	Ĝ
        this._tex["^{H}"] = ["Ĥ"]; // \^{H}	Ĥ
        this._tex["^{I}"] = ["Î"]; // \^{I}	Î
        this._tex["^{J}"] = ["Ĵ"]; // \^{J}	Ĵ
        this._tex["^{L}"] = ["Ḽ"]; // \^{L}	Ḽ
        this._tex["^{N}"] = ["Ṋ"]; // \^{N}	Ṋ
        this._tex["^{S}"] = ["Ŝ"]; // \^{S}	Ŝ
        this._tex["^{T}"] = ["Ṱ"]; // \^{T}	Ṱ
        this._tex["^{W}"] = ["Ŵ"]; // \^{W}	Ŵ
        this._tex["^{Y}"] = ["Ŷ"]; // \^{Y}	Ŷ
        this._tex["^{Z}"] = ["Ẑ"]; // \^{Z}	Ẑ
        this._tex["^{c}"] = ["ĉ"]; // \^{c}	ĉ
        this._tex["^{d}"] = ["ḓ"]; // \^{d}	ḓ
        this._tex["^{g}"] = ["ĝ"]; // \^{g}	ĝ
        this._tex["^{h}"] = ["ĥ"]; // \^{h}	ĥ
        this._tex["^{i}"] = ["î"]; // \^{i}	î
        this._tex["^{j}"] = ["ĵ"]; // \^{j}	ĵ
        this._tex["^{l}"] = ["ḽ"]; // \^{l}	ḽ
        this._tex["^{n}"] = ["ṋ"]; // \^{n}	ṋ
        this._tex["^{s}"] = ["ŝ"]; // \^{s}	ŝ
        this._tex["^{t}"] = ["ṱ"]; // \^{t}	ṱ
        this._tex["^{w}"] = ["ŵ"]; // \^{w}	ŵ
        this._tex["^{y}"] = ["ŷ"]; // \^{y}	ŷ
        this._tex["^{z}"] = ["ẑ"]; // \^{z}	ẑ
        this._tex["`{A}"] = ["À"]; // \`{A}	À
        this._tex["`{E}"] = ["È"]; // \`{E}	È
        this._tex["`{N}"] = ["Ǹ"]; // \`{N}	Ǹ
        this._tex["`{O}"] = ["Ò"]; // \`{O}	Ò
        this._tex["`{U}"] = ["Ù"]; // \`{U}	Ù
        this._tex["`{W}"] = ["Ẁ"]; // \`{W}	Ẁ
        this._tex["`{Y}"] = ["Ỳ"]; // \`{Y}	Ỳ
        this._tex["`{a}"] = ["à"]; // \`{a}	à
        this._tex["`{e}"] = ["è"]; // \`{e}	è
        this._tex["`{n}"] = ["ǹ"]; // \`{n}	ǹ
        this._tex["`{o}"] = ["ò"]; // \`{o}	ò
        this._tex["`{u}"] = ["ù"]; // \`{u}	ù
        this._tex["`{w}"] = ["ẁ"]; // \`{w}	ẁ
        this._tex["`{y}"] = ["ỳ"]; // \`{y}	ỳ
        this._tex["beta"] = ["β"]; // \beta	β
        this._tex["beth"] = ["ℶ"]; // \beth	ℶ
        this._tex["cdot"] = ["·"]; // \cdot	·
        this._tex["cedi"] = ["₵"]; // \cedi	₵
        this._tex["cent"] = ["¢"]; // \cent	¢
        this._tex["circ"] = ["∘"]; // \circ	∘
        this._tex["cong"] = ["≅"]; // \cong	≅
        this._tex["c{D}"] = ["Ḑ"]; // \c{D}	Ḑ
        this._tex["c{G}"] = ["Ģ"]; // \c{G}	Ģ
        this._tex["c{H}"] = ["Ḩ"]; // \c{H}	Ḩ
        this._tex["c{K}"] = ["Ķ"]; // \c{K}	Ķ
        this._tex["c{L}"] = ["Ļ"]; // \c{L}	Ļ
        this._tex["c{N}"] = ["Ņ"]; // \c{N}	Ņ
        this._tex["c{R}"] = ["Ŗ"]; // \c{R}	Ŗ
        this._tex["c{S}"] = ["Ş"]; // \c{S}	Ş
        this._tex["c{T}"] = ["Ţ"]; // \c{T}	Ţ
        this._tex["c{d}"] = ["ḑ"]; // \c{d}	ḑ
        this._tex["c{g}"] = ["ģ"]; // \c{g}	ģ
        this._tex["c{h}"] = ["ḩ"]; // \c{h}	ḩ
        this._tex["c{k}"] = ["ķ"]; // \c{k}	ķ
        this._tex["c{l}"] = ["ļ"]; // \c{l}	ļ
        this._tex["c{n}"] = ["ņ"]; // \c{n}	ņ
        this._tex["c{r}"] = ["ŗ"]; // \c{r}	ŗ
        this._tex["c{s}"] = ["ş"]; // \c{s}	ş
        this._tex["c{t}"] = ["ţ"]; // \c{t}	ţ
        this._tex["ddag"] = ["‡"]; // \ddag	‡
        this._tex["defs"] = ["≙"]; // \defs	≙
        this._tex["dong"] = ["₫"]; // \dong	₫
        this._tex["d{A}"] = ["Ạ"]; // \d{A}	Ạ
        this._tex["d{B}"] = ["Ḅ"]; // \d{B}	Ḅ
        this._tex["d{D}"] = ["Ḍ"]; // \d{D}	Ḍ
        this._tex["d{E}"] = ["Ẹ"]; // \d{E}	Ẹ
        this._tex["d{H}"] = ["Ḥ"]; // \d{H}	Ḥ
        this._tex["d{I}"] = ["Ị"]; // \d{I}	Ị
        this._tex["d{K}"] = ["Ḳ"]; // \d{K}	Ḳ
        this._tex["d{M}"] = ["Ṃ"]; // \d{M}	Ṃ
        this._tex["d{N}"] = ["Ṇ"]; // \d{N}	Ṇ
        this._tex["d{O}"] = ["Ọ"]; // \d{O}	Ọ
        this._tex["d{T}"] = ["Ṭ"]; // \d{T}	Ṭ
        this._tex["d{U}"] = ["Ụ"]; // \d{U}	Ụ
        this._tex["d{V}"] = ["Ṿ"]; // \d{V}	Ṿ
        this._tex["d{W}"] = ["Ẉ"]; // \d{W}	Ẉ
        this._tex["d{Y}"] = ["Ỵ"]; // \d{Y}	Ỵ
        this._tex["d{Z}"] = ["Ẓ"]; // \d{Z}	Ẓ
        this._tex["d{a}"] = ["ạ"]; // \d{a}	ạ
        this._tex["d{b}"] = ["ḅ"]; // \d{b}	ḅ
        this._tex["d{d}"] = ["ḍ"]; // \d{d}	ḍ
        this._tex["d{e}"] = ["ẹ"]; // \d{e}	ẹ
        this._tex["d{h}"] = ["ḥ"]; // \d{h}	ḥ
        this._tex["d{i}"] = ["ị"]; // \d{i}	ị
        this._tex["d{k}"] = ["ḳ"]; // \d{k}	ḳ
        this._tex["d{m}"] = ["ṃ"]; // \d{m}	ṃ
        this._tex["d{n}"] = ["ṇ"]; // \d{n}	ṇ
        this._tex["d{o}"] = ["ọ"]; // \d{o}	ọ
        this._tex["d{t}"] = ["ṭ"]; // \d{t}	ṭ
        this._tex["d{u}"] = ["ụ"]; // \d{u}	ụ
        this._tex["d{v}"] = ["ṿ"]; // \d{v}	ṿ
        this._tex["d{w}"] = ["ẉ"]; // \d{w}	ẉ
        this._tex["d{y}"] = ["ỵ"]; // \d{y}	ỵ
        this._tex["d{z}"] = ["ẓ"]; // \d{z}	ẓ
        this._tex["euro"] = ["€"]; // \euro	€
        this._tex["flat"] = ["♭"]; // \flat	♭
        this._tex["flqq"] = ["«"]; // \flqq	«
        this._tex["frqq"] = ["»"]; // \frqq	»
        this._tex["geqq"] = ["≧"]; // \geqq	≧
        this._tex["gets"] = ["←"]; // \gets	←
        this._tex["glqq"] = ["„"]; // \glqq	„
        this._tex["gneq"] = ["≩"]; // \gneq	≩
        this._tex["grqq"] = ["“"]; // \grqq	“
        this._tex["hbar"] = ["ℏ"]; // \hbar	ℏ
        this._tex["heta"] = ["ͱ"]; // \heta	ͱ
        this._tex["hori"] = ["ϩ"]; // \hori	ϩ
        this._tex["iota"] = ["ι"]; // \iota	ι
        this._tex["khei"] = ["ϧ"]; // \khei	ϧ
        this._tex["k{A}"] = ["Ą"]; // \k{A}	Ą
        this._tex["k{E}"] = ["Ę"]; // \k{E}	Ę
        this._tex["k{I}"] = ["Į"]; // \k{I}	Į
        this._tex["k{U}"] = ["Ų"]; // \k{U}	Ų
        this._tex["k{a}"] = ["ą"]; // \k{a}	ą
        this._tex["k{e}"] = ["ę"]; // \k{e}	ę
        this._tex["k{i}"] = ["į"]; // \k{i}	į
        this._tex["k{u}"] = ["ų"]; // \k{u}	ų
        this._tex["leqq"] = ["≦"]; // \leqq	≦
        this._tex["lira"] = ["₤"]; // \lira	₤
        this._tex["lneq"] = ["≨"]; // \lneq	≨
        this._tex["lnot"] = ["¬"]; // \lnot	¬
        this._tex["male"] = ["♂"]; // \male	♂
        this._tex["mill"] = ["₥"]; // \mill	₥
        this._tex["ngeq"] = ["≱"]; // \ngeq	≱
        this._tex["ngtr"] = ["≯"]; // \ngtr	≯
        this._tex["nleq"] = ["≰"]; // \nleq	≰
        this._tex["nmid"] = ["∤"]; // \nmid	∤
        this._tex["nsim"] = ["≁"]; // \nsim	≁
        this._tex["odot"] = ["⊙"]; // \odot	⊙
        this._tex["oint"] = ["∮"]; // \oint	∮
        this._tex["perp"] = ["⊥"]; // \perp	⊥
        this._tex["peso"] = ["₱"]; // \peso	₱
        this._tex["prec"] = ["≺"]; // \prec	≺
        this._tex["prod"] = ["∏"]; // \prod	∏
        this._tex["quad"] = [" "]; // \quad
        this._tex["rial"] = ["﷼"]; // \rial	﷼
        this._tex["shei"] = ["ϣ"]; // \shei	ϣ
        this._tex["star"] = ["⋆"]; // \star	⋆
        this._tex["succ"] = ["≻"]; // \succ	≻
        this._tex["surd"] = ["√"]; // \surd	√
        this._tex["u{E}"] = ["Ĕ"]; // \u{E}	Ĕ
        this._tex["u{G}"] = ["Ğ"]; // \u{G}	Ğ
        this._tex["u{H}"] = ["Ḫ"]; // \u{H}	Ḫ
        this._tex["u{I}"] = ["Ĭ"]; // \u{I}	Ĭ
        this._tex["u{O}"] = ["Ŏ"]; // \u{O}	Ŏ
        this._tex["u{U}"] = ["Ŭ"]; // \u{U}	Ŭ
        this._tex["u{e}"] = ["ĕ"]; // \u{e}	ĕ
        this._tex["u{g}"] = ["ğ"]; // \u{g}	ğ
        this._tex["u{h}"] = ["ḫ"]; // \u{h}	ḫ
        this._tex["u{i}"] = ["ĭ"]; // \u{i}	ĭ
        this._tex["u{o}"] = ["ŏ"]; // \u{o}	ŏ
        this._tex["u{u}"] = ["ŭ"]; // \u{u}	ŭ
        this._tex["v{A}"] = ["Ǎ"]; // \v{A}	Ǎ
        this._tex["v{C}"] = ["Č"]; // \v{C}	Č
        this._tex["v{D}"] = ["Ď"]; // \v{D}	Ď
        this._tex["v{E}"] = ["Ě"]; // \v{E}	Ě
        this._tex["v{G}"] = ["Ǧ"]; // \v{G}	Ǧ
        this._tex["v{H}"] = ["Ȟ"]; // \v{H}	Ȟ
        this._tex["v{I}"] = ["Ǐ"]; // \v{I}	Ǐ
        this._tex["v{K}"] = ["Ǩ"]; // \v{K}	Ǩ
        this._tex["v{L}"] = ["Ľ"]; // \v{L}	Ľ
        this._tex["v{N}"] = ["Ň"]; // \v{N}	Ň
        this._tex["v{O}"] = ["Ǒ"]; // \v{O}	Ǒ
        this._tex["v{R}"] = ["Ř"]; // \v{R}	Ř
        this._tex["v{T}"] = ["Ť"]; // \v{T}	Ť
        this._tex["v{U}"] = ["Ǔ"]; // \v{U}	Ǔ
        this._tex["v{Z}"] = ["Ž"]; // \v{Z}	Ž
        this._tex["v{a}"] = ["ǎ"]; // \v{a}	ǎ
        this._tex["v{c}"] = ["č"]; // \v{c}	č
        this._tex["v{d}"] = ["ď"]; // \v{d}	ď
        this._tex["v{e}"] = ["ě"]; // \v{e}	ě
        this._tex["v{g}"] = ["ǧ"]; // \v{g}	ǧ
        this._tex["v{h}"] = ["ȟ"]; // \v{h}	ȟ
        this._tex["v{i}"] = ["ǐ"]; // \v{i}	ǐ
        this._tex["v{j}"] = ["ǰ"]; // \v{j}	ǰ
        this._tex["v{k}"] = ["ǩ"]; // \v{k}	ǩ
        this._tex["v{l}"] = ["ľ"]; // \v{l}	ľ
        this._tex["v{n}"] = ["ň"]; // \v{n}	ň
        this._tex["v{o}"] = ["ǒ"]; // \v{o}	ǒ
        this._tex["v{r}"] = ["ř"]; // \v{r}	ř
        this._tex["v{t}"] = ["ť"]; // \v{t}	ť
        this._tex["v{u}"] = ["ǔ"]; // \v{u}	ǔ
        this._tex["zeta"] = ["ζ"]; // \zeta	ζ
        this._tex["~{A}"] = ["Ã"]; // \~{A}	Ã
        this._tex["~{N}"] = ["Ñ"]; // \~{N}	Ñ
        this._tex["~{V}"] = ["Ṽ"]; // \~{V}	Ṽ
        this._tex["~{Y}"] = ["Ỹ"]; // \~{Y}	Ỹ
        this._tex["~{a}"] = ["ã"]; // \~{a}	ã
        this._tex["~{n}"] = ["ñ"]; // \~{n}	ñ
        this._tex["~{v}"] = ["ṽ"]; // \~{v}	ṽ
        this._tex["~{y}"] = ["ỹ"]; // \~{y}	ỹ
        this._tex["^{SM}"] = ["℠"]; // ^{SM}	℠
        this._tex["^{TM}"] = ["™"]; // ^{TM}	™
        // this._tex["$\div$"] = ["÷"]; // $\div$	÷
        this._tex["'{\O}"] = ["Ǿ"]; // \'{\O}	Ǿ
        this._tex["'{\o}"] = ["ǿ"]; // \'{\o}	ǿ
        this._tex["={\i}"] = ["ī"]; // \={\i}	ī
        this._tex["Alpha"] = ["Α"]; // \Alpha	Α
        this._tex["Delta"] = ["Δ"]; // \Delta	Δ
        this._tex["Gamma"] = ["Γ"]; // \Gamma	Γ
        this._tex["Kappa"] = ["Κ"]; // \Kappa	Κ
        this._tex["Koppa"] = ["Ϟ"]; // \Koppa	Ϟ
        this._tex["Lamda"] = ["Λ"]; // \Lamda	Λ
        this._tex["Omega"] = ["Ω"]; // \Omega	Ω
        this._tex["Sampi"] = ["Ϡ"]; // \Sampi	Ϡ
        this._tex["Shima"] = ["Ϭ"]; // \Shima	Ϭ
        this._tex["Sigma"] = ["Σ"]; // \Sigma	Σ
        this._tex["Theta"] = ["Θ"]; // \Theta	Θ
        this._tex["Vdash"] = ["⊩"]; // \Vdash	⊩
        this._tex["^{\j}"] = ["ĵ"]; // \^{\j}	ĵ
        this._tex["aleph"] = ["ℵ"]; // \aleph	ℵ
        this._tex["alpha"] = ["α"]; // \alpha	α
        this._tex["amalg"] = ["∐"]; // \amalg	∐
        this._tex["angle"] = ["∠"]; // \angle	∠
        this._tex["asymp"] = ["≍"]; // \asymp	≍
        this._tex["cdots"] = ["⋯"]; // \cdots	⋯
        this._tex["dashv"] = ["⊣"]; // \dashv	⊣
        this._tex["ddots"] = ["⋱"]; // \ddots	⋱
        this._tex["delta"] = ["δ"]; // \delta	δ
        this._tex["doteq"] = ["≐"]; // \doteq	≐
        this._tex["equiv"] = ["≡"]; // \equiv	≡
        this._tex["frac1"] = ["⅟"]; // \frac1	⅟
        this._tex["frown"] = ["⌢"]; // \frown	⌢
        this._tex["gamma"] = ["γ"]; // \gamma	γ
        this._tex["gimel"] = ["ℷ"]; // \gimel	ℷ
        this._tex["gneqq"] = ["≩"]; // \gneqq	≩
        this._tex["gnsim"] = ["⋧"]; // \gnsim	⋧
        this._tex["imath"] = ["ı"]; // \imath	ı
        this._tex["infty"] = ["∞"]; // \infty	∞
        this._tex["kappa"] = ["κ"]; // \kappa	κ
        this._tex["koppa"] = ["ϟ"]; // \koppa	ϟ
        this._tex["lamda"] = ["λ"]; // \lamda	λ
        this._tex["lceil"] = ["⌈"]; // \lceil	⌈
        this._tex["ldata"] = ["《"]; // \ldata	《
        this._tex["ldots"] = ["…"]; // \ldots	…
        this._tex["lneqq"] = ["≨"]; // \lneqq	≨
        this._tex["lnsim"] = ["⋦"]; // \lnsim	⋦
        this._tex["micro"] = ["µ"]; // \micro	µ
        this._tex["minus"] = ["−"]; // \minus	−
        this._tex["nabla"] = ["∇"]; // \nabla	∇
        this._tex["naira"] = ["₦"]; // \naira	₦
        this._tex["ncong"] = ["≇"]; // \ncong	≇
        this._tex["ngeqq"] = ["≱"]; // \ngeqq	≱
        this._tex["nleqq"] = ["≰"]; // \nleqq	≰
        this._tex["nless"] = ["≮"]; // \nless	≮
        this._tex["notin"] = ["∉"]; // \notin	∉
        this._tex["nprec"] = ["⊀"]; // \nprec	⊀
        this._tex["nsucc"] = ["⊁"]; // \nsucc	⊁
        this._tex["omega"] = ["ω"]; // \omega	ω
        this._tex["oplus"] = ["⊕"]; // \oplus	⊕
        this._tex["ounce"] = ["℥"]; // \ounce	℥
        this._tex["pound"] = ["£"]; // \pound	£
        this._tex["prime"] = ["′"]; // \prime	′
        this._tex["rceil"] = ["⌉"]; // \rceil	⌉
        this._tex["rdata"] = ["》"]; // \rdata	》
        this._tex["rupee"] = ["₨"]; // \rupee	₨
        this._tex["sampi"] = ["ϡ"]; // \sampi	ϡ
        this._tex["sharp"] = ["♯"]; // \sharp	♯
        this._tex["shima"] = ["ϭ"]; // \shima	ϭ
        this._tex["sigma"] = ["σ"]; // \sigma	σ
        this._tex["simeq"] = ["≃"]; // \simeq	≃
        this._tex["smile"] = ["⌣"]; // \smile	⌣
        this._tex["sqcap"] = ["⊓"]; // \sqcap	⊓
        this._tex["sqcup"] = ["⊔"]; // \sqcup	⊔
        this._tex["tenge"] = ["₸"]; // \tenge	₸
        this._tex["theta"] = ["θ"]; // \theta	θ
        this._tex["times"] = ["×"]; // \times	×
        this._tex["uplus"] = ["⊎"]; // \uplus	⊎
        this._tex["u{\i}"] = ["ĭ"]; // \u{\i}	ĭ
        this._tex["vDash"] = ["⊨"]; // \vDash	⊨
        this._tex["varpi"] = ["ϖ"]; // \varpi	ϖ
        this._tex["vdash"] = ["⊢"]; // \vdash	⊢
        this._tex["vdots"] = ["⋮"]; // \vdots	⋮
        this._tex["v{\i}"] = ["ǐ"]; // \v{\i}	ǐ
        this._tex["v{\j}"] = ["ǰ"]; // \v{\j}	ǰ
        this._tex["wedge"] = ["∧"]; // \wedge	∧
        this._tex["~{\i}"] = ["ĩ"]; // \~{\i}	ĩ
        this._tex["^{TEL}"] = ["℡"]; // ^{TEL}	℡
        // this._tex["$\cdot$"] = ["·"]; // $\cdot$	·
        this._tex["'{\AE}"] = ["Ǽ"]; // \'{\AE}	Ǽ
        this._tex["'{\ae}"] = ["ǽ"]; // \'{\ae}	ǽ
        this._tex["={\AE}"] = ["Ǣ"]; // \={\AE}	Ǣ
        this._tex["={\ae}"] = ["ǣ"]; // \={\ae}	ǣ
        this._tex["Bbb{N}"] = ["ℕ"]; // \Bbb{N}	ℕ
        this._tex["Bbb{P}"] = ["ℙ"]; // \Bbb{P}	ℙ
        this._tex["Bbb{R}"] = ["ℝ"]; // \Bbb{R}	ℝ
        this._tex["Bbb{Z}"] = ["ℤ"]; // \Bbb{Z}	ℤ
        this._tex["Bumpeq"] = ["≎"]; // \Bumpeq	≎
        this._tex["Frowny"] = ["☹"]; // \Frowny	☹
        this._tex["Gangia"] = ["Ϫ"]; // \Gangia	Ϫ
        this._tex["Lambda"] = ["Λ"]; // \Lambda	Λ
        this._tex["Letter"] = ["✉"]; // \Letter	✉
        this._tex["Smiley"] = ["☺"]; // \Smiley	☺
        this._tex["Stigma"] = ["Ϛ"]; // \Stigma	Ϛ
        this._tex["Subset"] = ["⋐"]; // \Subset	⋐
        this._tex["Supset"] = ["⋑"]; // \Supset	⋑
        this._tex["Vvdash"] = ["⊪"]; // \Vvdash	⊪
        this._tex["approx"] = ["≈"]; // \approx	≈
        this._tex["bigcap"] = ["⋂"]; // \bigcap	⋂
        this._tex["bigcup"] = ["⋃"]; // \bigcup	⋃
        this._tex["bigvee"] = ["⋁"]; // \bigvee	⋁
        this._tex["bowtie"] = ["⋈"]; // \bowtie	⋈
        // this._tex["bullet"] = ["•"]; // \bullet	•
        this._tex["bumpeq"] = ["≏"]; // \bumpeq	≏
        this._tex["circeq"] = ["≗"]; // \circeq	≗
        this._tex["coprod"] = ["∐"]; // \coprod	∐
        this._tex["dagger"] = ["†"]; // \dagger	†
        this._tex["daleth"] = ["ℸ"]; // \daleth	ℸ
        this._tex["degree"] = ["°"]; // \degree	°
        this._tex["eqcirc"] = ["≖"]; // \eqcirc	≖
        this._tex["exists"] = ["∃"]; // \exists	∃
        this._tex["female"] = ["♀"]; // \female	♀
        this._tex["forall"] = ["∀"]; // \forall	∀
        this._tex["frac12"] = ["½"]; // \frac12	½
        this._tex["frac13"] = ["⅓"]; // \frac13	⅓
        this._tex["frac14"] = ["¼"]; // \frac14	¼
        this._tex["frac15"] = ["⅕"]; // \frac15	⅕
        this._tex["frac16"] = ["⅙"]; // \frac16	⅙
        this._tex["frac18"] = ["⅛"]; // \frac18	⅛
        this._tex["frac23"] = ["⅔"]; // \frac23	⅔
        this._tex["frac25"] = ["⅖"]; // \frac25	⅖
        this._tex["frac34"] = ["¾"]; // \frac34	¾
        this._tex["frac35"] = ["⅗"]; // \frac35	⅗
        this._tex["frac38"] = ["⅜"]; // \frac38	⅜
        this._tex["frac45"] = ["⅘"]; // \frac45	⅘
        this._tex["frac56"] = ["⅚"]; // \frac56	⅚
        this._tex["frac58"] = ["⅝"]; // \frac58	⅝
        this._tex["frac78"] = ["⅞"]; // \frac78	⅞
        this._tex["gangia"] = ["ϫ"]; // \gangia	ϫ
        this._tex["gtrdot"] = ["⋗"]; // \gtrdot	⋗
        this._tex["gtrsim"] = ["≳"]; // \gtrsim	≳
        this._tex["kelvin"] = ["K"]; // \kelvin	K
        this._tex["lambda"] = ["λ"]; // \lambda	λ
        this._tex["langle"] = ["〈"]; // \langle	〈
        this._tex["lfloor"] = ["⌊"]; // \lfloor	⌊
        this._tex["ltimes"] = ["⋉"]; // \ltimes	⋉
        this._tex["mapsto"] = ["↦"]; // \mapsto	↦
        this._tex["models"] = ["⊧"]; // \models	⊧
        this._tex["nVDash"] = ["⊯"]; // \nVDash	⊯
        this._tex["nVdash"] = ["⊮"]; // \nVdash	⊮
        this._tex["nequiv"] = ["≢"]; // \nequiv	≢
        this._tex["nsimeq"] = ["≄"]; // \nsimeq	≄
        this._tex["numero"] = ["№"]; // \numero	№
        this._tex["nvDash"] = ["⊭"]; // \nvDash	⊭
        this._tex["nvdash"] = ["⊬"]; // \nvdash	⊬
        this._tex["ominus"] = ["⊖"]; // \ominus	⊖
        this._tex["oslash"] = ["⊘"]; // \oslash	⊘
        this._tex["otimes"] = ["⊗"]; // \otimes	⊗
        this._tex["permil"] = ["‰"]; // \permil	‰
        this._tex["peseta"] = ["₧"]; // \peseta	₧
        this._tex["pounds"] = ["£"]; // \pounds	£
        this._tex["preceq"] = ["≼"]; // \preceq	≼
        this._tex["propto"] = ["∝"]; // \propto	∝
        this._tex["rangle"] = ["〉"]; // \rangle	〉
        this._tex["rfloor"] = ["⌋"]; // \rfloor	⌋
        this._tex["rtimes"] = ["⋊"]; // \rtimes	⋊
        this._tex["square"] = ["□"]; // \square	□
        this._tex["stigma"] = ["ϛ"]; // \stigma	ϛ
        this._tex["subset"] = ["⊂"]; // \subset	⊂
        this._tex["succeq"] = ["≽"]; // \succeq	≽
        this._tex["supset"] = ["⊃"]; // \supset	⊃
        this._tex["textmu"] = ["µ"]; // \textmu	µ
        this._tex["tugrik"] = ["₮"]; // \tugrik	₮
        this._tex["varkai"] = ["ϗ"]; // \varkai	ϗ
        this._tex["varphi"] = ["ϕ"]; // \varphi	ϕ
        this._tex["varrho"] = ["ϱ"]; // \varrho	ϱ
        this._tex["veebar"] = ["⊻"]; // \veebar	⊻
        this._tex["^\gamma"] = ["ˠ"]; // ^\gamma	ˠ
        // this._tex["$\times$"] = ["×"]; // $\times$	×
        this._tex["Diamond"] = ["◇"]; // \Diamond	◇
        this._tex["Digamma"] = ["Ϝ"]; // \Digamma	Ϝ
        this._tex["Epsilon"] = ["Ε"]; // \Epsilon	Ε
        this._tex["Omicron"] = ["Ο"]; // \Omicron	Ο
        this._tex["Uparrow"] = ["⇑"]; // \Uparrow	⇑
        this._tex["Upsilon"] = ["Υ"]; // \Upsilon	Υ
        this._tex["afghani"] = ["؋"]; // \afghani	؋
        this._tex["austral"] = ["₳"]; // \austral	₳
        this._tex["backsim"] = ["∽"]; // \backsim	∽
        this._tex["because"] = ["∵"]; // \because	∵
        this._tex["between"] = ["≬"]; // \between	≬
        this._tex["bigcirc"] = ["◯"]; // \bigcirc	◯
        this._tex["bigstar"] = ["★"]; // \bigstar	★
        this._tex["boxplus"] = ["⊞"]; // \boxplus	⊞
        this._tex["caution"] = ["☡"]; // \caution	☡
        this._tex["celsius"] = ["℃"]; // \celsius	℃
        this._tex["coloneq"] = ["≔"]; // \coloneq	≔
        this._tex["ddagger"] = ["‡"]; // \ddagger	‡
        this._tex["diamond"] = ["⋄"]; // \diamond	⋄
        this._tex["dotplus"] = ["∔"]; // \dotplus	∔
        this._tex["drachma"] = ["₯"]; // \drachma	₯
        this._tex["epsilon"] = ["ε"]; // \epsilon	ε
        this._tex["eqcolon"] = ["≕"]; // \eqcolon	≕
        this._tex["gtrless"] = ["≷"]; // \gtrless	≷
        this._tex["guarani"] = ["₲"]; // \guarani	₲
        this._tex["hryvnia"] = ["₴"]; // \hryvnia	₴
        this._tex["leadsto"] = ["↝"]; // \leadsto	↝
        this._tex["lessdot"] = ["⋖"]; // \lessdot	⋖
        this._tex["lessgtr"] = ["≶"]; // \lessgtr	≶
        this._tex["lesssim"] = ["≲"]; // \lesssim	≲
        this._tex["lozenge"] = ["✧"]; // \lozenge	✧
        this._tex["maltese"] = ["✠"]; // \maltese	✠
        this._tex["napprox"] = ["≉"]; // \napprox	≉
        this._tex["natural"] = ["♮"]; // \natural	♮
        this._tex["nearrow"] = ["↗"]; // \nearrow	↗
        this._tex["nexists"] = ["∄"]; // \nexists	∄
        this._tex["npreceq"] = ["⋠"]; // \npreceq	⋠
        this._tex["nsubset"] = ["⊄"]; // \nsubset	⊄
        this._tex["nsucceq"] = ["⋡"]; // \nsucceq	⋡
        this._tex["nsupset"] = ["⊅"]; // \nsupset	⊅
        this._tex["nwarrow"] = ["↖"]; // \nwarrow	↖
        this._tex["omicron"] = ["ο"]; // \omicron	ο
        this._tex["partial"] = ["∂"]; // \partial	∂
        this._tex["pilcrow"] = ["¶"]; // \pilcrow	¶
        this._tex["precsim"] = ["≾"]; // \precsim	≾
        this._tex["searrow"] = ["↘"]; // \searrow	↘
        this._tex["section"] = ["§"]; // \section	§
        this._tex["succsim"] = ["≿"]; // \succsim	≿
        this._tex["swarrow"] = ["↙"]; // \swarrow	↙
        this._tex["textwon"] = ["₩"]; // \textwon	₩
        this._tex["uparrow"] = ["↑"]; // \uparrow	↑
        this._tex["upsilon"] = ["υ"]; // \upsilon	υ
        this._tex["varbeta"] = ["ϐ"]; // \varbeta	ϐ
        this._tex["warning"] = ["⚠"]; // \warning	⚠
        this._tex["angstrom"] = ["Å"]; // \angstrom	Å
        this._tex["approxeq"] = ["≊"]; // \approxeq	≊
        this._tex["backcong"] = ["≌"]; // \backcong	≌
        this._tex["barwedge"] = ["⊼"]; // \barwedge	⊼
        this._tex["bigwedge"] = ["⋀"]; // \bigwedge	⋀
        this._tex["boxminus"] = ["⊟"]; // \boxminus	⊟
        this._tex["boxtimes"] = ["⊠"]; // \boxtimes	⊠
        this._tex["circledR"] = ["®"]; // \circledR	®
        this._tex["circledS"] = ["Ⓢ"]; // \circledS	Ⓢ
        this._tex["clubsuit"] = ["♣"]; // \clubsuit	♣
        this._tex["cruzeiro"] = ["₢"]; // \cruzeiro	₢
        this._tex["curlyvee"] = ["⋎"]; // \curlyvee	⋎
        this._tex["currency"] = ["¤"]; // \currency	¤
        this._tex["diameter"] = ["⌀"]; // \diameter	⌀
        this._tex["division"] = ["÷"]; // \division	÷
        this._tex["doteqdot"] = ["≑"]; // \doteqdot	≑
        this._tex["emptyset"] = ["∅"]; // \emptyset	∅
        this._tex["geqslant"] = ["≥"]; // \geqslant	≥
        this._tex["gnapprox"] = ["⋧"]; // \gnapprox	⋧
        this._tex["intercal"] = ["⊺"]; // \intercal	⊺
        this._tex["leqslant"] = ["≤"]; // \leqslant	≤
        this._tex["llcorner"] = ["⌞"]; // \llcorner	⌞
        this._tex["lnapprox"] = ["⋦"]; // \lnapprox	⋦
        this._tex["lrcorner"] = ["⌟"]; // \lrcorner	⌟
        this._tex["multimap"] = ["⊸"]; // \multimap	⊸
        this._tex["parallel"] = ["∥"]; // \parallel	∥
        this._tex["precnsim"] = ["⋨"]; // \precnsim	⋨
        this._tex["setminus"] = ["∖"]; // \setminus	∖
        this._tex["shortmid"] = ["∣"]; // \shortmid	∣
        this._tex["spesmilo"] = ["₷"]; // \spesmilo	₷
        this._tex["sqsubset"] = ["⊏"]; // \sqsubset	⊏
        this._tex["sqsupset"] = ["⊐"]; // \sqsupset	⊐
        this._tex["subseteq"] = ["⊆"]; // \subseteq	⊆
        this._tex["succnsim"] = ["⋩"]; // \succnsim	⋩
        this._tex["supseteq"] = ["⊇"]; // \supseteq	⊇
        this._tex["textbaht"] = ["฿"]; // \textbaht	฿
        this._tex["textdied"] = ["✝"]; // \textdied	✝
        this._tex["textlira"] = ["₤"]; // \textlira	₤
        this._tex["textpeso"] = ["₱"]; // \textpeso	₱
        this._tex["thicksim"] = ["∼"]; // \thicksim	∼
        this._tex["triangle"] = ["▵"]; // \triangle	▵
        this._tex["ulcorner"] = ["⌜"]; // \ulcorner	⌜
        this._tex["urcorner"] = ["⌝"]; // \urcorner	⌝
        this._tex["varkappa"] = ["ϰ"]; // \varkappa	ϰ
        this._tex["varprime"] = ["′"]; // \varprime	′
        this._tex["varsigma"] = ["ς"]; // \varsigma	ς
        this._tex["vartheta"] = ["ϑ"]; // \vartheta	ϑ
        this._tex["Downarrow"] = ["⇓"]; // \Downarrow	⇓
        this._tex["Leftarrow"] = ["⇐"]; // \Leftarrow	⇐
        this._tex["backprime"] = ["‵"]; // \backprime	‵
        this._tex["backsimeq"] = ["⋍"]; // \backsimeq	⋍
        this._tex["biohazard"] = ["☣"]; // \biohazard	☣
        this._tex["centerdot"] = ["·"]; // \centerdot	·
        this._tex["checkmark"] = ["✓"]; // \checkmark	✓
        this._tex["copyright"] = ["©"]; // \copyright	©
        this._tex["dotsquare"] = ["⊡"]; // \dotsquare	⊡
        this._tex["downarrow"] = ["↓"]; // \downarrow	↓
        this._tex["facsimile"] = ["℻"]; // \facsimile	℻
        this._tex["gtrapprox"] = ["≳"]; // \gtrapprox	≳
        this._tex["gtreqless"] = ["⋛"]; // \gtreqless	⋛
        this._tex["gvertneqq"] = ["≩"]; // \gvertneqq	≩
        this._tex["heartsuit"] = ["♥"]; // \heartsuit	♥
        this._tex["lambdabar"] = ["ƛ"]; // \lambdabar	ƛ
        this._tex["leftarrow"] = ["←"]; // \leftarrow	←
        this._tex["lesseqgtr"] = ["⋚"]; // \lesseqgtr	⋚
        this._tex["llbracket"] = ["〚"]; // \llbracket	〚
        this._tex["lvertneqq"] = ["≨"]; // \lvertneqq	≨
        this._tex["ngeqslant"] = ["≱"]; // \ngeqslant	≱
        this._tex["nleqslant"] = ["≰"]; // \nleqslant	≰
        this._tex["nparallel"] = ["∦"]; // \nparallel	∦
        this._tex["nshortmid"] = ["∤"]; // \nshortmid	∤
        this._tex["nsubseteq"] = ["⊈"]; // \nsubseteq	⊈
        this._tex["nsupseteq"] = ["⊉"]; // \nsupseteq	⊉
        this._tex["paragraph"] = ["¶"]; // \paragraph	¶
        this._tex["pitchfork"] = ["⋔"]; // \pitchfork	⋔
        this._tex["rrbracket"] = ["〛"]; // \rrbracket	〛
        this._tex["spadesuit"] = ["♠"]; // \spadesuit	♠
        this._tex["subseteqq"] = ["⊆"]; // \subseteqq	⊆
        this._tex["subsetneq"] = ["⊊"]; // \subsetneq	⊊
        this._tex["supseteqq"] = ["⊇"]; // \supseteqq	⊇
        this._tex["supsetneq"] = ["⊋"]; // \supsetneq	⊋
        this._tex["telephone"] = ["℡"]; // \telephone	℡
        this._tex["textnaira"] = ["₦"]; // \textnaira	₦
        this._tex["therefore"] = ["∴"]; // \therefore	∴
        this._tex["triangleq"] = ["≜"]; // \triangleq	≜
        this._tex["varpropto"] = ["∝"]; // \varpropto	∝
        this._tex["Lleftarrow"] = ["⇚"]; // \Lleftarrow	⇚
        this._tex["Rightarrow"] = ["⇒"]; // \Rightarrow	⇒
        this._tex["circledast"] = ["⊛"]; // \circledast	⊛
        this._tex["complement"] = ["∁"]; // \complement	∁
        this._tex["curlywedge"] = ["⋏"]; // \curlywedge	⋏
        this._tex["eqslantgtr"] = ["⋝"]; // \eqslantgtr	⋝
        this._tex["gtreqqless"] = ["⋛"]; // \gtreqqless	⋛
        this._tex["lessapprox"] = ["≲"]; // \lessapprox	≲
        this._tex["lesseqqgtr"] = ["⋚"]; // \lesseqqgtr	⋚
        this._tex["longmapsto"] = ["↦"]; // \longmapsto	↦
        this._tex["mathscr{I}"] = ["ℐ"]; // \mathscr{I}	ℐ
        this._tex["nLeftarrow"] = ["⇍"]; // \nLeftarrow	⇍
        this._tex["nleftarrow"] = ["↚"]; // \nleftarrow	↚
        this._tex["nsubseteqq"] = ["⊈"]; // \nsubseteqq	⊈
        this._tex["nsupseteqq"] = ["⊉"]; // \nsupseteqq	⊉
        this._tex["precapprox"] = ["≾"]; // \precapprox	≾
        this._tex["registered"] = ["®"]; // \registered	®
        this._tex["rightarrow"] = ["→"]; // \rightarrow	→
        this._tex["smallamalg"] = ["∐"]; // \smallamalg	∐
        this._tex["smallsmile"] = ["⌣"]; // \smallsmile	⌣
        this._tex["sqsubseteq"] = ["⊑"]; // \sqsubseteq	⊑
        this._tex["sqsupseteq"] = ["⊒"]; // \sqsupseteq	⊒
        this._tex["subsetneqq"] = ["⊊"]; // \subsetneqq	⊊
        this._tex["succapprox"] = ["≿"]; // \succapprox	≿
        this._tex["supsetneqq"] = ["⊋"]; // \supsetneqq	⊋
        this._tex["textlquill"] = ["⁅"]; // \textlquill	⁅
        this._tex["textnumero"] = ["№"]; // \textnumero	№
        this._tex["textrecipe"] = ["℞"]; // \textrecipe	℞
        this._tex["textrquill"] = ["⁆"]; // \textrquill	⁆
        this._tex["upuparrows"] = ["⇈"]; // \upuparrows	⇈
        this._tex["Rrightarrow"] = ["⇛"]; // \Rrightarrow	⇛
        this._tex["Updownarrow"] = ["⇕"]; // \Updownarrow	⇕
        this._tex["backepsilon"] = ["∍"]; // \backepsilon	∍
        this._tex["blacksmiley"] = ["☻"]; // \blacksmiley	☻
        this._tex["blacksquare"] = ["▪"]; // \blacksquare	▪
        this._tex["circledcirc"] = ["⊚"]; // \circledcirc	⊚
        this._tex["circleddash"] = ["⊝"]; // \circleddash	⊝
        this._tex["curlyeqprec"] = ["⋞"]; // \curlyeqprec	⋞
        this._tex["curlyeqsucc"] = ["⋟"]; // \curlyeqsucc	⋟
        this._tex["curlypreceq"] = ["≼"]; // \curlypreceq	≼
        this._tex["diamondsuit"] = ["♢"]; // \diamondsuit	♢
        this._tex["eqslantless"] = ["⋜"]; // \eqslantless	⋜
        this._tex["nRightarrow"] = ["⇏"]; // \nRightarrow	⇏
        this._tex["nrightarrow"] = ["↛"]; // \nrightarrow	↛
        this._tex["ordfeminine"] = ["ª"]; // \ordfeminine	ª
        this._tex["partnership"] = ["㉐"]; // \partnership	㉐
        this._tex["precnapprox"] = ["⋨"]; // \precnapprox	⋨
        this._tex["radioactive"] = ["☢"]; // \radioactive	☢
        this._tex["straightphi"] = ["φ"]; // \straightphi	φ
        this._tex["succcurlyeq"] = ["≽"]; // \succcurlyeq	≽
        this._tex["succnapprox"] = ["⋩"]; // \succnapprox	⋩
        this._tex["thickapprox"] = ["≈"]; // \thickapprox	≈
        this._tex["updownarrow"] = ["↕"]; // \updownarrow	↕
        this._tex["blacklozenge"] = ["✦"]; // \blacklozenge	✦
        this._tex["construction"] = ["🚧"]; // \construction	🚧
        this._tex["leftparengtr"] = ["〈"]; // \leftparengtr	〈
        this._tex["ordmasculine"] = ["º"]; // \ordmasculine	º
        this._tex["risingdotseq"] = ["≓"]; // \risingdotseq	≓
        this._tex["textcircledP"] = ["℗"]; // \textcircledP	℗
        this._tex["textdiscount"] = ["⁒"]; // \textdiscount	⁒
        this._tex["triangledown"] = ["▿"]; // \triangledown	▿
        this._tex["triangleleft"] = ["◃"]; // \triangleleft	◃
        this._tex["Longleftarrow"] = ["⇐"]; // \Longleftarrow	⇐
        this._tex["bigtriangleup"] = ["△"]; // \bigtriangleup	△
        this._tex["blacktriangle"] = ["▴"]; // \blacktriangle	▴
        this._tex["divideontimes"] = ["⋇"]; // \divideontimes	⋇
        this._tex["fallingdotseq"] = ["≒"]; // \fallingdotseq	≒
        this._tex["hookleftarrow"] = ["↩"]; // \hookleftarrow	↩
        this._tex["leftarrowtail"] = ["↢"]; // \leftarrowtail	↢
        this._tex["leftharpoonup"] = ["↼"]; // \leftharpoonup	↼
        this._tex["longleftarrow"] = ["←"]; // \longleftarrow	←
        this._tex["looparrowleft"] = ["↫"]; // \looparrowleft	↫
        this._tex["measuredangle"] = ["∡"]; // \measuredangle	∡
        this._tex["ntriangleleft"] = ["⋪"]; // \ntriangleleft	⋪
        this._tex["rightparengtr"] = ["〉"]; // \rightparengtr	〉
        this._tex["shortparallel"] = ["∥"]; // \shortparallel	∥
        this._tex["smallsetminus"] = ["∖"]; // \smallsetminus	∖
        this._tex["textbigcircle"] = ["⃝"]; // \textbigcircle	⃝
        this._tex["textestimated"] = ["℮"]; // \textestimated	℮
        this._tex["triangleright"] = ["▹"]; // \triangleright	▹
        this._tex["upleftharpoon"] = ["↿"]; // \upleftharpoon	↿
        this._tex["Leftrightarrow"] = ["⇔"]; // \Leftrightarrow	⇔
        this._tex["Longrightarrow"] = ["⇒"]; // \Longrightarrow	⇒
        this._tex["curvearrowleft"] = ["↶"]; // \curvearrowleft	↶
        this._tex["downdownarrows"] = ["⇊"]; // \downdownarrows	⇊
        this._tex["hookrightarrow"] = ["↪"]; // \hookrightarrow	↪
        this._tex["leftleftarrows"] = ["⇇"]; // \leftleftarrows	⇇
        this._tex["leftrightarrow"] = ["↔"]; // \leftrightarrow	↔
        this._tex["leftthreetimes"] = ["⋋"]; // \leftthreetimes	⋋
        this._tex["longrightarrow"] = ["→"]; // \longrightarrow	→
        this._tex["looparrowright"] = ["↬"]; // \looparrowright	↬
        this._tex["multiplication"] = ["×"]; // \multiplication	×
        this._tex["nshortparallel"] = ["∦"]; // \nshortparallel	∦
        this._tex["ntriangleright"] = ["⋫"]; // \ntriangleright	⋫
        this._tex["rightarrowtail"] = ["↣"]; // \rightarrowtail	↣
        this._tex["rightharpoonup"] = ["⇀"]; // \rightharpoonup	⇀
        this._tex["sphericalangle"] = ["∢"]; // \sphericalangle	∢
        this._tex["textopenbullet"] = ["◦"]; // \textopenbullet	◦
        this._tex["trianglelefteq"] = ["⊴"]; // \trianglelefteq	⊴
        this._tex["uprightharpoon"] = ["↾"]; // \uprightharpoon	↾
        this._tex["bigtriangledown"] = ["▽"]; // \bigtriangledown	▽
        this._tex["circlearrowleft"] = ["↺"]; // \circlearrowleft	↺
        this._tex["curvearrowright"] = ["↷"]; // \curvearrowright	↷
        this._tex["downleftharpoon"] = ["⇃"]; // \downleftharpoon	⇃
        this._tex["leftharpoondown"] = ["↽"]; // \leftharpoondown	↽
        this._tex["leftrightarrows"] = ["⇆"]; // \leftrightarrows	⇆
        this._tex["nLeftrightarrow"] = ["⇎"]; // \nLeftrightarrow	⇎
        this._tex["nleftrightarrow"] = ["↮"]; // \nleftrightarrow	↮
        this._tex["ntrianglelefteq"] = ["⋬"]; // \ntrianglelefteq	⋬
        this._tex["rightleftarrows"] = ["⇄"]; // \rightleftarrows	⇄
        this._tex["rightthreetimes"] = ["⋌"]; // \rightthreetimes	⋌
        this._tex["squigarrowright"] = ["⇝"]; // \squigarrowright	⇝
        this._tex["textinterrobang"] = ["‽"]; // \textinterrobang	‽
        this._tex["textmusicalnote"] = ["♪"]; // \textmusicalnote	♪
        this._tex["trianglerighteq"] = ["⊵"]; // \trianglerighteq	⊵
        this._tex["vartriangleleft"] = ["⊲"]; // \vartriangleleft	⊲
        this._tex["circlearrowright"] = ["↻"]; // \circlearrowright	↻
        this._tex["downrightharpoon"] = ["⇂"]; // \downrightharpoon	⇂
        this._tex["ntrianglerighteq"] = ["⋭"]; // \ntrianglerighteq	⋭
        this._tex["rightharpoondown"] = ["⇁"]; // \rightharpoondown	⇁
        this._tex["rightrightarrows"] = ["⇉"]; // \rightrightarrows	⇉
        this._tex["twoheadleftarrow"] = ["↞"]; // \twoheadleftarrow	↞
        this._tex["vartriangleright"] = ["⊳"]; // \vartriangleright	⊳
        this._tex["blacktriangledown"] = ["▾"]; // \blacktriangledown	▾
        this._tex["blacktriangleleft"] = ["◂"]; // \blacktriangleleft	◂
        this._tex["leftrightharpoons"] = ["⇋"]; // \leftrightharpoons	⇋
        this._tex["rightleftharpoons"] = ["⇌"]; // \rightleftharpoons	⇌
        this._tex["textcolonmonetary"] = ["₡"]; // \textcolonmonetary	₡
        this._tex["textreferencemark"] = ["※"]; // \textreferencemark	※
        this._tex["twoheadrightarrow"] = ["↠"]; // \twoheadrightarrow	↠
        this._tex["Longleftrightarrow"] = ["⇔"]; // \Longleftrightarrow	⇔
        this._tex["blacktriangleright"] = ["▸"]; // \blacktriangleright	▸
        this._tex["longleftrightarrow"] = ["↔"]; // \longleftrightarrow	↔
        this._tex["textpertenthousand"] = ["‱"]; // \textpertenthousand	‱
        this._tex["leftrightsquigarrow"] = ["↭"]; // \leftrightsquigarrow	↭
        this._tex["textfractionsolidus"] = ["⁄"]; // \textfractionsolidus	⁄

        this._tex["\"A"] = to_list("Ӓ Ǟ Ä "); // \"A
        this._tex["\"E"] = to_list("Ӭ Ë "); // \"E
        this._tex["\"I"] = to_list("Ḯ Ӥ Ï "); // \"I
        this._tex["\"O"] = to_list("Ӧ Ȫ Ö "); // \"O
        this._tex["\"U"] = to_list("Ṳ Ӱ Ǜ Ǚ Ǘ Ǖ Ü "); // \"U
        this._tex["\"a"] = to_list("ӓ ǟ ä "); // \"a
        this._tex["\"e"] = to_list("ӭ ë "); // \"e
        this._tex["\"i"] = to_list("ḯ ӥ ï "); // \"i
        this._tex["\"o"] = to_list("ӧ ȫ ö "); // \"o
        this._tex["\"u"] = to_list("ṳ ӱ ǜ ǚ ǘ ǖ ü "); // \"u
        this._tex["'S"] = to_list("Ṥ Ś "); // \'S
        this._tex["'s"] = to_list("ṥ ś "); // \'s
        this._tex[".A"] = to_list("Ȧ Ǡ "); // \.A
        this._tex[".O"] = to_list("Ȱ Ȯ "); // \.O
        this._tex[".a"] = to_list("ȧ ǡ "); // \.a
        this._tex[".o"] = to_list("ȱ ȯ "); // \.o
        this._tex["=E"] = to_list("Ḗ Ḕ Ē "); // \=E
        this._tex["=I"] = to_list("Ӣ Ī "); // \=I
        this._tex["=O"] = to_list("Ṓ Ṑ Ō "); // \=O
        this._tex["=U"] = to_list("Ṻ Ӯ Ū "); // \=U
        this._tex["=e"] = to_list("ḗ ḕ ē "); // \=e
        this._tex["=i"] = to_list("ӣ ī "); // \=i
        this._tex["=o"] = to_list("ṓ ṑ ō "); // \=o
        this._tex["=u"] = to_list("ṻ ӯ ū "); // \=u
        this._tex["HU"] = to_list("Ӳ Ű "); // \HU
        this._tex["Hu"] = to_list("ӳ ű "); // \Hu
        this._tex["^A"] = to_list("Ậ Ẫ Ẩ Ầ Ấ Â "); // \^A
        this._tex["^E"] = to_list("Ệ Ễ Ể Ề Ế Ḙ Ê "); // \^E
        this._tex["^O"] = to_list("Ộ Ỗ Ổ Ồ Ố Ô "); // \^O
        this._tex["^U"] = to_list("Ṷ Û "); // \^U
        this._tex["^a"] = to_list("ậ ẫ ẩ ầ ấ â "); // \^a
        this._tex["^e"] = to_list("ệ ễ ể ề ế ḙ ê "); // \^e
        this._tex["^o"] = to_list("ộ ỗ ổ ồ ố ô "); // \^o
        this._tex["^u"] = to_list("ṷ û "); // \^u
        this._tex["`I"] = to_list("Ѝ Ì "); // \`I
        this._tex["`i"] = to_list("ѝ ì "); // \`i
        this._tex["cC"] = to_list("Ḉ Ç "); // \cC
        this._tex["cE"] = to_list("Ḝ Ȩ "); // \cE
        this._tex["cc"] = to_list("ḉ ç "); // \cc
        this._tex["ce"] = to_list("ḝ ȩ "); // \ce
        this._tex["uA"] = to_list("Ặ Ẵ Ẳ Ằ Ắ Ӑ Ă "); // \uA
        this._tex["ua"] = to_list("ặ ẵ ẳ ằ ắ ӑ ă "); // \ua
        this._tex["vS"] = to_list("Ṧ Š "); // \vS
        this._tex["vs"] = to_list("ṧ š "); // \vs
        this._tex["vz"] = to_list("ǅ ž "); // \vz
        this._tex["~E"] = to_list("Ẽ Ḛ "); // \~E
        this._tex["~I"] = to_list("Ḭ Ĩ "); // \~I
        this._tex["~O"] = to_list("Ṏ Ṍ Ȭ Õ "); // \~O
        this._tex["~U"] = to_list("Ṹ Ṵ Ũ "); // \~U
        this._tex["~e"] = to_list("ẽ ḛ "); // \~e
        this._tex["~i"] = to_list("ḭ ĩ "); // \~i
        this._tex["~o"] = to_list("ṏ ṍ ȭ õ "); // \~o
        this._tex["~u"] = to_list("ṹ ṵ ũ "); // \~u
        this._tex["not"] = to_list("¬ ̸ "); // \not
        this._tex["\"{A}"] = to_list("Ӓ Ǟ Ä "); // \"{A}
        this._tex["\"{E}"] = to_list("Ӭ Ë "); // \"{E}
        this._tex["\"{I}"] = to_list("Ḯ Ӥ Ï "); // \"{I}
        this._tex["\"{O}"] = to_list("Ӧ Ȫ Ö "); // \"{O}
        this._tex["\"{U}"] = to_list("Ṳ Ӱ Ǜ Ǚ Ǘ Ǖ Ü "); // \"{U}
        this._tex["\"{a}"] = to_list("ӓ ǟ ä "); // \"{a}
        this._tex["\"{e}"] = to_list("ӭ ë "); // \"{e}
        this._tex["\"{i}"] = to_list("ḯ ӥ ï "); // \"{i}
        this._tex["\"{o}"] = to_list("ӧ ȫ ö "); // \"{o}
        this._tex["\"{u}"] = to_list("ṳ ӱ ǜ ǚ ǘ ǖ ü "); // \"{u}
        this._tex["'{S}"] = to_list("Ṥ Ś "); // \'{S}
        this._tex["'{s}"] = to_list("ṥ ś "); // \'{s}
        this._tex[".{A}"] = to_list("Ȧ Ǡ "); // \.{A}
        this._tex[".{O}"] = to_list("Ȱ Ȯ "); // \.{O}
        this._tex[".{a}"] = to_list("ȧ ǡ "); // \.{a}
        this._tex[".{o}"] = to_list("ȱ ȯ "); // \.{o}
        this._tex["={E}"] = to_list("Ḗ Ḕ Ē "); // \={E}
        this._tex["={I}"] = to_list("Ӣ Ī "); // \={I}
        this._tex["={O}"] = to_list("Ṓ Ṑ Ō "); // \={O}
        this._tex["={U}"] = to_list("Ṻ Ӯ Ū "); // \={U}
        this._tex["={e}"] = to_list("ḗ ḕ ē "); // \={e}
        this._tex["={i}"] = to_list("ӣ ī "); // \={i}
        this._tex["={o}"] = to_list("ṓ ṑ ō "); // \={o}
        this._tex["={u}"] = to_list("ṻ ӯ ū "); // \={u}
        this._tex["H{U}"] = to_list("Ӳ Ű "); // \H{U}
        this._tex["H{u}"] = to_list("ӳ ű "); // \H{u}
        this._tex["^{A}"] = to_list("Ậ Ẫ Ẩ Ầ Ấ Â "); // \^{A}
        this._tex["^{E}"] = to_list("Ệ Ễ Ể Ề Ế Ḙ Ê "); // \^{E}
        this._tex["^{O}"] = to_list("Ộ Ỗ Ổ Ồ Ố Ô "); // \^{O}
        this._tex["^{U}"] = to_list("Ṷ Û "); // \^{U}
        this._tex["^{a}"] = to_list("ậ ẫ ẩ ầ ấ â "); // \^{a}
        this._tex["^{e}"] = to_list("ệ ễ ể ề ế ḙ ê "); // \^{e}
        this._tex["^{o}"] = to_list("ộ ỗ ổ ồ ố ô "); // \^{o}
        this._tex["^{u}"] = to_list("ṷ û "); // \^{u}
        this._tex["`{I}"] = to_list("Ѝ Ì "); // \`{I}
        this._tex["`{i}"] = to_list("ѝ ì "); // \`{i}
        this._tex["c{C}"] = to_list("Ḉ Ç "); // \c{C}
        this._tex["c{E}"] = to_list("Ḝ Ȩ "); // \c{E}
        this._tex["c{c}"] = to_list("ḉ ç "); // \c{c}
        this._tex["c{e}"] = to_list("ḝ ȩ "); // \c{e}
        this._tex["d{L}"] = to_list("Ḹ Ḷ "); // \d{L}
        this._tex["d{R}"] = to_list("Ṝ Ṛ "); // \d{R}
        this._tex["d{S}"] = to_list("Ṩ Ṣ "); // \d{S}
        this._tex["d{l}"] = to_list("ḹ ḷ "); // \d{l}
        this._tex["d{r}"] = to_list("ṝ ṛ "); // \d{r}
        this._tex["d{s}"] = to_list("ṩ ṣ "); // \d{s}
        this._tex["k{O}"] = to_list("Ǭ Ǫ "); // \k{O}
        this._tex["k{o}"] = to_list("ǭ ǫ "); // \k{o}
        this._tex["u{A}"] = to_list("Ặ Ẵ Ẳ Ằ Ắ Ӑ Ă "); // \u{A}
        this._tex["u{a}"] = to_list("ặ ẵ ẳ ằ ắ ӑ ă "); // \u{a}
        this._tex["v{S}"] = to_list("Ṧ Š "); // \v{S}
        this._tex["v{s}"] = to_list("ṧ š "); // \v{s}
        this._tex["v{z}"] = to_list("ǅ ž "); // \v{z}
        this._tex["~{E}"] = to_list("Ẽ Ḛ "); // \~{E}
        this._tex["~{I}"] = to_list("Ḭ Ĩ "); // \~{I}
        this._tex["~{O}"] = to_list("Ṏ Ṍ Ȭ Õ "); // \~{O}
        this._tex["~{U}"] = to_list("Ṹ Ṵ Ũ "); // \~{U}
        this._tex["~{e}"] = to_list("ẽ ḛ "); // \~{e}
        this._tex["~{i}"] = to_list("ḭ ĩ "); // \~{i}
        this._tex["~{o}"] = to_list("ṏ ṍ ȭ õ "); // \~{o}
        this._tex["~{u}"] = to_list("ṹ ṵ ũ "); // \~{u}
        this._tex["colon"] = to_list("₡ : "); // \colon
        this._tex["digamma"] = to_list("ϝ Ϝ "); // \digamma

        // Equality and similar symbols.
        this._dict["eq"  ] = to_list("=∼∽≈≋∻∾∿≀≃⋍≂≅ ≌≊≡≣≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≍≎≏≬⋕");
        this._dict["eqn" ] = to_list("≠≁ ≉     ≄  ≇≆  ≢                 ≭    ");
        /*                       */ this._dict["=n"  ] = ["≠"];
        this._dict["~"   ] = ["∼"]; this._dict["~n"  ] = ["≁"];
        this._dict["~~"  ] = ["≈"]; this._dict["~~n" ] = ["≉"];
        this._dict["~~~" ] = ["≋"];
        this._dict[":~"  ] = ["∻"];
        this._dict["~-"  ] = ["≃"]; this._dict["~-n" ] = ["≄"];
        this._dict["-~"  ] = ["≂"];
        this._dict["~="  ] = ["≅"]; this._dict["~=n" ] = ["≇"];
        this._dict["~~-" ] = ["≊"];
        this._dict["=="  ] = ["≡"]; this._dict["==n" ] = ["≢"];
        this._dict["===" ] = ["≣"];
        this._dict[".="  ] = ["≐"]; this._dict[".=." ] = ["≑"];
        this._dict[":="  ] = ["≔"]; this._dict["=:"  ] = ["≕"];
        this._dict["=o"  ] = ["≗"];
        this._dict["(="  ] = ["≘"];
        this._dict["and="] = ["≙"]; this._dict["or=" ] = ["≚"];
        this._dict["*="  ] = ["≛"];
        this._dict["t="  ] = ["≜"];
        this._dict["def="] = ["≝"];
        this._dict["m="  ] = ["≞"];
        this._dict["?="  ] = ["≟"];

        // Inequality and similar symbols.
        this._dict["leq" ] = to_list("<≪⋘≤≦≲ ≶≺≼≾⊂⊆ ⋐⊏⊑ ⊰⊲⊴⋖⋚⋜⋞");
        this._dict["leqn"] = to_list("≮  ≰≨≴⋦≸⊀ ⋨⊄⊈⊊  ⋢⋤ ⋪⋬   ⋠");
        this._dict["geq" ] = to_list(">≫⋙≥≧≳ ≷≻≽≿⊃⊇ ⋑⊐⊒ ⊱⊳⊵⋗⋛⋝⋟");
        this._dict["geqn"] = to_list("≯  ≱≩≵⋧≹⊁ ⋩⊅⊉⊋  ⋣⋥ ⋫⋭   ⋡");

        this._dict["<="  ] = ["≤"]; this._dict[">="  ] = ["≥"];
        this._dict["<=n" ] = ["≰"]; this._dict[">=n" ] = ["≱"];
        this._dict["len" ] = ["≰"]; this._dict["gen" ] = ["≱"];
        this._dict["<n"  ] = ["≮"]; this._dict[">n"  ] = ["≯"];
        this._dict["<~"  ] = ["≲"]; this._dict[">~"  ] = ["≳"];
        this._dict["<~n" ] = ["⋦"]; this._dict[">~n" ] = ["⋧"];
        this._dict["<~nn"] = ["≴"]; this._dict[">~nn"] = ["≵"];

        this._dict["sub"  ] = ["⊂"]; this._dict["sup"  ] = ["⊃"];
        this._dict["subn" ] = ["⊄"]; this._dict["supn" ] = ["⊅"];
        this._dict["sub=" ] = ["⊆"]; this._dict["sup=" ] = ["⊇"];
        this._dict["sub=n"] = ["⊈"]; this._dict["sup=n"] = ["⊉"];

        this._dict["squb"  ] = ["⊏"]; this._dict["squp"  ] = ["⊐"];
        this._dict["squb=" ] = ["⊑"]; this._dict["squp=" ] = ["⊒"];
        this._dict["squb=n"] = ["⋢"]; this._dict["squp=n"] = ["⋣"];

        // Set membership etc.
        this._dict["member"] = to_list("∈∉∊∋∌∍⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿");

        this._dict["inn"] = ["∉"];
        this._dict["nin"] = ["∌"];

        // Intersections, unions etc.
        this._dict["intersection"] = to_list("∩⋂∧⋀⋏⨇⊓⨅⋒∏ ⊼      ⨉");
        this._dict["union"       ] = to_list("∪⋃∨⋁⋎⨈⊔⨆⋓∐⨿⊽⊻⊍⨃⊎⨄⊌∑⅀");

        this._dict["and"] = ["∧"]; this._dict["or" ] = ["∨"];
        this._dict["And"] = ["⋀"]; this._dict["Or" ] = ["⋁"];
        this._dict["i"  ] = ["∩"]; this._dict["un" ] = ["∪"]; this._dict["u+"] = ["⊎"]; this._dict["u."] = ["⊍"];
        this._dict["I"  ] = ["⋂"]; this._dict["Un" ] = ["⋃"]; this._dict["U+"] = ["⨄"]; this._dict["U."] = ["⨃"];
        this._dict["glb"] = ["⊓"]; this._dict["lub"] = ["⊔"];
        this._dict["Glb"] = ["⨅"]; this._dict["Lub"] = ["⨆"];

        // Entailment etc.
        this._dict["entails"] = to_list("⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯");

        this._dict["|-"  ] = ["⊢"]; this._dict["|-n" ] = ["⊬"];
        this._dict["-|"  ] = ["⊣"];
        this._dict["|="  ] = ["⊨"]; this._dict["|=n" ] = ["⊭"];
        this._dict["||-" ] = ["⊩"]; this._dict["||-n"] = ["⊮"];
        this._dict["||=" ] = ["⊫"]; this._dict["||=n"] = ["⊯"];
        this._dict["|||-"] = ["⊪"];

        // Divisibility, parallelity.
        this._dict["|" ] = ["∣"]; this._dict["|n" ] = ["∤"];
        this._dict["||"] = ["∥"]; this._dict["||n"] = ["∦"];

        // Some symbols from logic and set theory.
        this._dict["all"] = ["∀"];
        this._dict["ex" ] = ["∃"];
        this._dict["exn"] = ["∄"];
        this._dict["0"  ] = ["∅"];
        this._dict["C"  ] = ["∁"];

        // Corners, ceilings and floors.
        this._dict["c" ] = to_list("⌜⌝⌞⌟⌈⌉⌊⌋");
        this._dict["cu"] = to_list("⌜⌝  ⌈⌉  ");
        this._dict["cl"] = to_list("  ⌞⌟  ⌊⌋");

        this._dict["cul"] = ["⌜"]; this._dict["cuL"] = ["⌈"];
        this._dict["cur"] = ["⌝"]; this._dict["cuR"] = ["⌉"];
        this._dict["cll"] = ["⌞"]; this._dict["clL"] = ["⌊"];
        this._dict["clr"] = ["⌟"]; this._dict["clR"] = ["⌋"];

        // Various operators/symbols.
        this._dict["qed"      ] = ["∎"];
        this._dict["x"        ] = ["×"];
        this._dict["o"        ] = ["∘"];
        this._dict["comp"     ] = ["∘"];
        this._dict["."        ] = ["∙"];
        this._dict["*"        ] = ["⋆"];
        this._dict[".+"       ] = ["∔"];
        this._dict[".-"       ] = ["∸"];
        this._dict[":"        ] = ["∶"];
        this._dict["::"       ] = ["∷"];
        this._dict["::-"      ] = ["∺"];
        this._dict["-:"       ] = ["∹"];
        this._dict["+ "       ] = ["⊹"];
        this._dict["surd3"    ] = ["∛"];
        this._dict["surd4"    ] = ["∜"];
        this._dict["increment"] = ["∆"];
        this._dict["inf"      ] = ["∞"];
        this._dict["&"        ] = ["⅋"];

        // Circled operators.
        this._dict["o+" ] = ["⊕"];
        this._dict["o--"] = ["⊖"];
        this._dict["ox" ] = ["⊗"];
        this._dict["o/" ] = ["⊘"];
        this._dict["o." ] = ["⊙"];
        this._dict["oo" ] = ["⊚"];
        this._dict["o*" ] = ["⊛"];
        this._dict["o=" ] = ["⊜"];
        this._dict["o-" ] = ["⊝"];

        this._dict["O+" ] = ["⨁"];
        this._dict["Ox" ] = ["⨂"];
        this._dict["O." ] = ["⨀"];
        this._dict["O*" ] = ["⍟"];

        // Boxed operators.
        this._dict["b+"] = ["⊞"];
        this._dict["b-"] = ["⊟"];
        this._dict["bx"] = ["⊠"];
        this._dict["b."] = ["⊡"];

        // Various symbols.
        this._dict["integral"] = to_list("∫∬∭∮∯∰∱∲∳");
        this._dict["angle"   ] = to_list("∟∡∢⊾⊿");
        this._dict["join"    ] = to_list("⋈⋉⋊⋋⋌⨝⟕⟖⟗");

        // Arrows.
        this._dict["l" ] = to_list("←⇐⇚⇇⇆↤⇦↞↼↽⇠⇺↜⇽⟵⟸↚⇍⇷ ↹     ↢↩↫⇋⇜⇤⟻⟽⤆↶↺⟲                                     ");
        this._dict["r" ] = to_list("→⇒⇛⇉⇄↦⇨↠⇀⇁⇢⇻↝⇾⟶⟹↛⇏⇸⇶ ↴    ↣↪↬⇌⇝⇥⟼⟾⤇↷↻⟳⇰⇴⟴⟿ ➵➸➙➔➛➜➝➞➟➠➡➢➣➤➧➨➩➪➫➬➭➮➯➱➲➳➺➻➼➽➾⊸");
        this._dict["u" ] = to_list("↑⇑⟰⇈⇅↥⇧↟↿↾⇡⇞          ↰↱➦ ⇪⇫⇬⇭⇮⇯                                           ");
        this._dict["d" ] = to_list("↓⇓⟱⇊⇵↧⇩↡⇃⇂⇣⇟         ↵↲↳➥ ↯                                                ");
        this._dict["ud"] = to_list("↕⇕   ↨⇳                                                                    ");
        this._dict["lr"] = to_list("↔⇔         ⇼↭⇿⟷⟺↮⇎⇹                                                        ");
        this._dict["ul"] = to_list("↖⇖                        ⇱↸                                               ");
        this._dict["ur"] = to_list("↗⇗                                         ➶➹➚                             ");
        this._dict["dr"] = to_list("↘⇘                        ⇲                ➴➷➘                             ");
        this._dict["dl"] = to_list("↙⇙                                                                         ");

        this._dict["l-" ] = ["←"]; this._dict["<-" ] = ["←"]; this._dict["l=" ] = ["⇐"];
        this._dict["r-" ] = ["→"]; this._dict["->" ] = ["→"]; this._dict["r=" ] = ["⇒"]; this._dict["=>" ] = ["⇒"];
        this._dict["u-" ] = ["↑"];                            this._dict["u=" ] = ["⇑"];
        this._dict["d-" ] = ["↓"];                            this._dict["d=" ] = ["⇓"];
        this._dict["ud-"] = ["↕"];                            this._dict["ud="] = ["⇕"];
        this._dict["lr-"] = ["↔"]; this._dict["<->"] = ["↔"]; this._dict["lr="] = ["⇔"]; this._dict["<=>"] = ["⇔"];
        this._dict["ul-"] = ["↖"];                            this._dict["ul="] = ["⇖"];
        this._dict["ur-"] = ["↗"];                            this._dict["ur="] = ["⇗"];
        this._dict["dr-"] = ["↘"];                            this._dict["dr="] = ["⇘"];
        this._dict["dl-"] = ["↙"];                            this._dict["dl="] = ["⇙"];

        this._dict["l=="] = ["⇚"]; this._dict["l-2"] = ["⇇"];                            this._dict["l-r-"] = ["⇆"];
        this._dict["r=="] = ["⇛"]; this._dict["r-2"] = ["⇉"]; this._dict["r-3"] = ["⇶"]; this._dict["r-l-"] = ["⇄"];
        this._dict["u=="] = ["⟰"]; this._dict["u-2"] = ["⇈"];                            this._dict["u-d-"] = ["⇅"];
        this._dict["d=="] = ["⟱"]; this._dict["d-2"] = ["⇊"];                            this._dict["d-u-"] = ["⇵"];

        this._dict["l--" ] = ["⟵"]; this._dict["<--" ] = ["⟵"]; this._dict["l~"  ] = ["↜", "⇜"];
        this._dict["r--" ] = ["⟶"]; this._dict["-->" ] = ["⟶"]; this._dict["r~" ] = ["↝", "⇝", "⟿"];
        this._dict["lr--"] = ["⟷"]; this._dict["<-->"] = ["⟷"]; this._dict["lr~"] = ["↭"];

        this._dict["l-n" ] = ["↚"]; this._dict["<-n" ] = ["↚"]; this._dict["l=n" ] = ["⇍"];
        this._dict["r-n" ] = ["↛"]; this._dict["->n" ] = ["↛"]; this._dict["r=n" ] = ["⇏"]; this._dict["=>n" ] = ["⇏"];
        this._dict["lr-n"] = ["↮"]; this._dict["<->n"] = ["↮"]; this._dict["lr=n"] = ["⇎"]; this._dict["<=>n"] = ["⇎"];

        this._dict["l-|" ] = ["↤"]; this._dict["ll-"] = ["↞"];
        this._dict["r-|" ] = ["↦"]; this._dict["rr-"] = ["↠"];
        this._dict["u-|" ] = ["↥"]; this._dict["uu-"] = ["↟"];
        this._dict["d-|" ] = ["↧"]; this._dict["dd-"] = ["↡"];
        this._dict["ud-|"] = ["↨"];

        this._dict["l->"] = ["↢"];
        this._dict["r->"] = ["↣"];

        this._dict["r-o"] = ["⊸"]; this._dict["-o" ] = ["⊸"];

        this._dict["dz"] = ["↯"];

        // Ellipsis.
        this._dict["..."] = to_list("⋯⋮⋰⋱");

        // Box-drawing characters.
        this._dict["---"] = to_list("─│┌┐└┘├┤┬┼┴╴╵╶╷╭╮╯╰╱╲╳");
        this._dict["--="] = to_list("═║╔╗╚╝╠╣╦╬╩     ╒╕╘╛╞╡╤╪╧ ╓╖╙╜╟╢╥╫╨");
        this._dict["--_"] = to_list("━┃┏┓┗┛┣┫┳╋┻╸╹╺╻┍┯┑┕┷┙┝┿┥┎┰┒┖┸┚┠╂┨┞╀┦┟╁┧┢╈┪┡╇┩┮┭┶┵┾┽┲┱┺┹╊╉╆╅╄╃ ╿╽╼╾");
        this._dict["--."] = to_list("╌╎┄┆┈┊╍╏┅┇┉┋");

        // Triangles.

        // Big/small, black/white.
        this._dict["t"] = to_list("◂◃◄◅▸▹►▻▴▵▾▿◢◿◣◺◤◸◥◹");
        this._dict["T"] = to_list("◀◁▶▷▲△▼▽◬◭◮");

        this._dict["tb"] = to_list("◂▸▴▾◄►◢◣◤◥");
        this._dict["tw"] = to_list("◃▹▵▿◅▻◿◺◸◹");

        this._dict["Tb"] = to_list("◀▶▲▼");
        this._dict["Tw"] = to_list("◁▷△▽");

        // Squares.

        this._dict["sq" ] = to_list("■□◼◻◾◽▣▢▤▥▦▧▨▩◧◨◩◪◫◰◱◲◳");
        this._dict["sqb"] = to_list("■◼◾");
        this._dict["sqw"] = to_list("□◻◽");
        this._dict["sq."] = ["▣"];
        this._dict["sqo"] = ["▢"];

        // Rectangles.

        this._dict["re" ] = to_list("▬▭▮▯");
        this._dict["reb"] = to_list("▬▮");
        this._dict["rew"] = to_list("▭▯");

        // Parallelograms.

        this._dict["pa" ] = to_list("▰▱");
        this._dict["pab" ] = ["▰"];
        this._dict["paw" ] = ["▱"];

        // Diamonds.

        this._dict["di" ] = to_list("◆◇◈");
        this._dict["dib" ] = ["◆"];
        this._dict["diw" ] = ["◇"];
        this._dict["di." ] = ["◈"];

        // Circles.

        this._dict["ci"  ] = to_list("●○◎◌◯◍◐◑◒◓◔◕◖◗◠◡◴◵◶◷⚆⚇⚈⚉");
        this._dict["cib"  ] = ["●"];
        this._dict["ciw"  ] = ["○"];
        this._dict["ci."  ] = ["◎"];
        this._dict["ci.." ] = ["◌"];
        this._dict["ciO"  ] = ["◯"];

        // Stars.

        this._dict["st"  ] = to_list("⋆✦✧✶✴✹ ★☆✪✫✯✰✵✷✸");
        this._dict["st4" ] = to_list("✦✧");
        this._dict["st6"  ] = ["✶"];
        this._dict["st8"  ] = ["✴"];
        this._dict["st12" ] = ["✹"];

        // Blackboard bold letters.

        this._dict["bn"   ] = ["ℕ"];
        this._dict["bz"   ] = ["ℤ"];
        this._dict["bq"   ] = ["ℚ"];
        this._dict["br"   ] = ["ℝ"];
        this._dict["bc"   ] = ["ℂ"];
        this._dict["bp"   ] = ["ℙ"];
        this._dict["bb"   ] = ["𝔹"];
        this._dict["bsum" ] = ["⅀"];

        // Blackboard bold numbers.

        this._dict["b0"   ] = ["𝟘"];
        this._dict["b1"   ] = ["𝟙"];
        this._dict["b2"   ] = ["𝟚"];
        this._dict["b3"   ] = ["𝟛"];
        this._dict["b4"   ] = ["𝟜"];
        this._dict["b5"   ] = ["𝟝"];
        this._dict["b6"   ] = ["𝟞"];
        this._dict["b7"   ] = ["𝟟"];
        this._dict["b8"   ] = ["𝟠"];
        this._dict["b9"   ] = ["𝟡"];

        // Parentheses.

        this._dict["("] = to_list("([{⁅⁽₍〈⎴⟅⟦⟨⟪⦃〈《「『【〔〖〚︵︷︹︻︽︿﹁﹃﹙﹛﹝（［｛｢");
        this._dict[")"] = to_list(")]}⁆⁾₎〉⎵⟆⟧⟩⟫⦄〉》」』】〕〗〛︶︸︺︼︾﹀﹂﹄﹚﹜﹞）］｝｣");

        this._dict["[[" ] = ["⟦"];
        this._dict["]]" ] = ["⟧"];
        this._dict["<"  ] = ["⟨"];
        this._dict[">"  ] = ["⟩"];
        this._dict["<<" ] = ["⟪"];
        this._dict[">>" ] = ["⟫"];
        this._dict["{{" ] = ["⦃"];
        this._dict["}}" ] = ["⦄"];

        this._dict["(b" ] = ["⟅"];
        this._dict[")b" ] = ["⟆"];

        this._dict["lbag" ] = ["⟅"];
        this._dict["rbag" ] = ["⟆"];

        // Primes.

        this._dict["'"] = to_list("′″‴⁗");
        this._dict["`"] = to_list("‵‶‷");

        // Fractions.

        this._dict["frac"] = to_list("¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟");

        // Bullets.

        this._dict["bu" ] = to_list("•◦‣⁌⁍");
        this._dict["bub" ] = ["•"];
        this._dict["buw" ] = ["◦"];
        this._dict["but" ] = ["‣"];

        // Musical symbols.

        this._dict["note"] = to_list("♩♪♫♬");
        this._dict["b"    ] = ["♭"];
        this._dict["#"    ] = ["♯"];

        // Other punctuation and symbols.

        this._dict["\\"         ] = ["\\"];
        this._dict["en"         ] = ["–"];
        this._dict["em"         ] = ["—"];
        this._dict["^i"         ] = ["ⁱ"];
        this._dict["!!"         ] = ["‼"];
        this._dict["??"         ] = ["⁇"];
        this._dict["?!"         ] = ["‽", "⁈"];
        this._dict["!?"         ] = ["⁉"];
        this._dict["die"       ] = to_list("⚀⚁⚂⚃⚄⚅");
        this._dict["asterisk"  ] = to_list("⁎⁑⁂✢✣✤✥✱✲✳✺✻✼✽❃❉❊❋");
        this._dict["8<"         ] = ["✂", "✄"];
        this._dict["tie"        ] = ["⁀"];
        this._dict["undertie"   ] = ["‿"];
        this._dict["apl"       ] = to_list("⌶⌷⌸⌹⌺⌻⌼⌽⌾⌿⍀⍁⍂⍃⍄⍅⍆⍇⍈⍉⍊⍋⍌⍍⍎⍏⍐⍑⍒⍓⍔⍕⍖⍗⍘⍙⍚⍛⍜⍝⍞⍟⍠⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯⍰⍱⍲⍳⍴⍵⍶⍷⍸⍹⍺⎕");

        // Some combining characters.
        //
        // The following combining characters also have (other)
        // translations:
        // ̀ ́ ̂ ̃ ̄ ̆ ̇ ̈ ̋ ̌ ̣ ̧ ̱

        this._dict["^--"] = to_list("̅̿");
        this._dict["_--"] = to_list("̲̳");
        this._dict["^~" ] = to_list("̃͌");
        this._dict["_~" ] = ["̰"];
        this._dict["^." ] = to_list("̇̈⃛⃜");
        this._dict["_." ] = to_list("̣̤");
        this._dict["^l" ] = to_list("⃖⃐⃔");
        this._dict["^l-"] = ["⃖"];
        this._dict["^r" ] = to_list("⃗⃑⃕");
        this._dict["^r-"] = ["⃗"];
        this._dict["^lr"] = ["⃡"];
        this._dict["_lr"] = ["͍"];
        this._dict["^^" ] = to_list("̂̑͆");
        this._dict["_^" ] = to_list("̭̯̪");
        this._dict["^v" ] = to_list("̌̆");
        this._dict["_v" ] = to_list("̬̮̺");

        // Shorter forms of many greek letters plus ƛ.

        this._dict["Ga"] = ["α"];  this._dict["GA"] = ["Α"];
        this._dict["Gb"] = ["β"];  this._dict["GB"] = ["Β"];
        this._dict["Gg"] = ["γ"];  this._dict["GG"] = ["Γ"];
        this._dict["Gd"] = ["δ"];  this._dict["GD"] = ["Δ"];
        this._dict["Ge"] = ["ε"];  this._dict["GE"] = ["Ε"];
        this._dict["Gz"] = ["ζ"];  this._dict["GZ"] = ["Ζ"];
        // \eta \Eta
        this._dict["Gth"] = ["θ"];  this._dict["GTH"] = ["Θ"];
        this._dict["Gi"] = ["ι"];  this._dict["GI"] = ["Ι"];
        this._dict["Gk"] = ["κ"];  this._dict["GK"] = ["Κ"];
        this._dict["Gl"] = ["λ"];  this._dict["GL"] = ["Λ"];  this._dict["Gl-"] = ["ƛ"];
        this._dict["Gm"] = ["μ"];  this._dict["GM"] = ["Μ"];
        this._dict["Gn"] = ["ν"];  this._dict["GN"] = ["Ν"];
        this._dict["Gx"] = ["ξ"];  this._dict["GX"] = ["Ξ"];
        // \omicron \Omicron
        // \pi \Pi
        this._dict["Gr"] = ["ρ"];  this._dict["GR"] = ["Ρ"];
        this._dict["Gs"] = ["σ"];  this._dict["GS"] = ["Σ"];
        this._dict["Gt"] = ["τ"];  this._dict["GT"] = ["Τ"];
        this._dict["Gu"] = ["υ"];  this._dict["GU"] = ["Υ"];
        this._dict["Gf"] = ["φ"];  this._dict["GF"] = ["Φ"];
        this._dict["Gc"] = ["χ"];  this._dict["GC"] = ["Χ"];
        this._dict["Gp"] = ["ψ"];  this._dict["GP"] = ["Ψ"];
        this._dict["Go"] = ["ω"];  this._dict["GO"] = ["Ω"];

        // Mathematical characters

        this._dict["MiA"] = ["𝐴"];
        this._dict["MiB"] = ["𝐵"];
        this._dict["MiC"] = ["𝐶"];
        this._dict["MiD"] = ["𝐷"];
        this._dict["MiE"] = ["𝐸"];
        this._dict["MiF"] = ["𝐹"];
        this._dict["MiG"] = ["𝐺"];
        this._dict["MiH"] = ["𝐻"];
        this._dict["MiI"] = ["𝐼"];
        this._dict["MiJ"] = ["𝐽"];
        this._dict["MiK"] = ["𝐾"];
        this._dict["MiL"] = ["𝐿"];
        this._dict["MiM"] = ["𝑀"];
        this._dict["MiN"] = ["𝑁"];
        this._dict["MiO"] = ["𝑂"];
        this._dict["MiP"] = ["𝑃"];
        this._dict["MiQ"] = ["𝑄"];
        this._dict["MiR"] = ["𝑅"];
        this._dict["MiS"] = ["𝑆"];
        this._dict["MiT"] = ["𝑇"];
        this._dict["MiU"] = ["𝑈"];
        this._dict["MiV"] = ["𝑉"];
        this._dict["MiW"] = ["𝑊"];
        this._dict["MiX"] = ["𝑋"];
        this._dict["MiY"] = ["𝑌"];
        this._dict["MiZ"] = ["𝑍"];
        this._dict["Mia"] = ["𝑎"];
        this._dict["Mib"] = ["𝑏"];
        this._dict["Mic"] = ["𝑐"];
        this._dict["Mid"] = ["𝑑"];
        this._dict["Mie"] = ["𝑒"];
        this._dict["Mif"] = ["𝑓"];
        this._dict["Mig"] = ["𝑔"];
        this._dict["Mii"] = ["𝑖"];
        this._dict["Mij"] = ["𝑗"];
        this._dict["Mik"] = ["𝑘"];
        this._dict["Mil"] = ["𝑙"];
        this._dict["Mim"] = ["𝑚"];
        this._dict["Min"] = ["𝑛"];
        this._dict["Mio"] = ["𝑜"];
        this._dict["Mip"] = ["𝑝"];
        this._dict["Miq"] = ["𝑞"];
        this._dict["Mir"] = ["𝑟"];
        this._dict["Mis"] = ["𝑠"];
        this._dict["Mit"] = ["𝑡"];
        this._dict["Miu"] = ["𝑢"];
        this._dict["Miv"] = ["𝑣"];
        this._dict["Miw"] = ["𝑤"];
        this._dict["Mix"] = ["𝑥"];
        this._dict["Miy"] = ["𝑦"];
        this._dict["Miz"] = ["𝑧"];
        this._dict["MIA"] = ["𝑨"];
        this._dict["MIB"] = ["𝑩"];
        this._dict["MIC"] = ["𝑪"];
        this._dict["MID"] = ["𝑫"];
        this._dict["MIE"] = ["𝑬"];
        this._dict["MIF"] = ["𝑭"];
        this._dict["MIG"] = ["𝑮"];
        this._dict["MIH"] = ["𝑯"];
        this._dict["MII"] = ["𝑰"];
        this._dict["MIJ"] = ["𝑱"];
        this._dict["MIK"] = ["𝑲"];
        this._dict["MIL"] = ["𝑳"];
        this._dict["MIM"] = ["𝑴"];
        this._dict["MIN"] = ["𝑵"];
        this._dict["MIO"] = ["𝑶"];
        this._dict["MIP"] = ["𝑷"];
        this._dict["MIQ"] = ["𝑸"];
        this._dict["MIR"] = ["𝑹"];
        this._dict["MIS"] = ["𝑺"];
        this._dict["MIT"] = ["𝑻"];
        this._dict["MIU"] = ["𝑼"];
        this._dict["MIV"] = ["𝑽"];
        this._dict["MIW"] = ["𝑾"];
        this._dict["MIX"] = ["𝑿"];
        this._dict["MIY"] = ["𝒀"];
        this._dict["MIZ"] = ["𝒁"];
        this._dict["MIa"] = ["𝒂"];
        this._dict["MIb"] = ["𝒃"];
        this._dict["MIc"] = ["𝒄"];
        this._dict["MId"] = ["𝒅"];
        this._dict["MIe"] = ["𝒆"];
        this._dict["MIf"] = ["𝒇"];
        this._dict["MIg"] = ["𝒈"];
        this._dict["MIh"] = ["𝒉"];
        this._dict["MIi"] = ["𝒊"];
        this._dict["MIj"] = ["𝒋"];
        this._dict["MIk"] = ["𝒌"];
        this._dict["MIl"] = ["𝒍"];
        this._dict["MIm"] = ["𝒎"];
        this._dict["MIn"] = ["𝒏"];
        this._dict["MIo"] = ["𝒐"];
        this._dict["MIp"] = ["𝒑"];
        this._dict["MIq"] = ["𝒒"];
        this._dict["MIr"] = ["𝒓"];
        this._dict["MIs"] = ["𝒔"];
        this._dict["MIt"] = ["𝒕"];
        this._dict["MIu"] = ["𝒖"];
        this._dict["MIv"] = ["𝒗"];
        this._dict["MIw"] = ["𝒘"];
        this._dict["MIx"] = ["𝒙"];
        this._dict["MIy"] = ["𝒚"];
        this._dict["MIz"] = ["𝒛"];
        this._dict["McA"] = ["𝒜"];
        this._dict["McC"] = ["𝒞"];
        this._dict["McD"] = ["𝒟"];
        this._dict["McG"] = ["𝒢"];
        this._dict["McJ"] = ["𝒥"];
        this._dict["McK"] = ["𝒦"];
        this._dict["McN"] = ["𝒩"];
        this._dict["McO"] = ["𝒪"];
        this._dict["McP"] = ["𝒫"];
        this._dict["McQ"] = ["𝒬"];
        this._dict["McS"] = ["𝒮"];
        this._dict["McT"] = ["𝒯"];
        this._dict["McU"] = ["𝒰"];
        this._dict["McV"] = ["𝒱"];
        this._dict["McW"] = ["𝒲"];
        this._dict["McX"] = ["𝒳"];
        this._dict["McY"] = ["𝒴"];
        this._dict["McZ"] = ["𝒵"];
        this._dict["Mca"] = ["𝒶"];
        this._dict["Mcb"] = ["𝒷"];
        this._dict["Mcc"] = ["𝒸"];
        this._dict["Mcd"] = ["𝒹"];
        this._dict["Mcf"] = ["𝒻"];
        this._dict["Mch"] = ["𝒽"];
        this._dict["Mci"] = ["𝒾"];
        this._dict["Mcj"] = ["𝒿"];
        this._dict["Mck"] = ["𝓀"];
        this._dict["Mcl"] = ["𝓁"];
        this._dict["Mcm"] = ["𝓂"];
        this._dict["Mcn"] = ["𝓃"];
        this._dict["Mcp"] = ["𝓅"];
        this._dict["Mcq"] = ["𝓆"];
        this._dict["Mcr"] = ["𝓇"];
        this._dict["Mcs"] = ["𝓈"];
        this._dict["Mct"] = ["𝓉"];
        this._dict["Mcu"] = ["𝓊"];
        this._dict["Mcv"] = ["𝓋"];
        this._dict["Mcw"] = ["𝓌"];
        this._dict["Mcx"] = ["𝓍"];
        this._dict["Mcy"] = ["𝓎"];
        this._dict["Mcz"] = ["𝓏"];
        this._dict["MCA"] = ["𝓐"];
        this._dict["MCB"] = ["𝓑"];
        this._dict["MCC"] = ["𝓒"];
        this._dict["MCD"] = ["𝓓"];
        this._dict["MCE"] = ["𝓔"];
        this._dict["MCF"] = ["𝓕"];
        this._dict["MCG"] = ["𝓖"];
        this._dict["MCH"] = ["𝓗"];
        this._dict["MCI"] = ["𝓘"];
        this._dict["MCJ"] = ["𝓙"];
        this._dict["MCK"] = ["𝓚"];
        this._dict["MCL"] = ["𝓛"];
        this._dict["MCM"] = ["𝓜"];
        this._dict["MCN"] = ["𝓝"];
        this._dict["MCO"] = ["𝓞"];
        this._dict["MCP"] = ["𝓟"];
        this._dict["MCQ"] = ["𝓠"];
        this._dict["MCR"] = ["𝓡"];
        this._dict["MCS"] = ["𝓢"];
        this._dict["MCT"] = ["𝓣"];
        this._dict["MCU"] = ["𝓤"];
        this._dict["MCV"] = ["𝓥"];
        this._dict["MCW"] = ["𝓦"];
        this._dict["MCX"] = ["𝓧"];
        this._dict["MCY"] = ["𝓨"];
        this._dict["MCZ"] = ["𝓩"];
        this._dict["MCa"] = ["𝓪"];
        this._dict["MCb"] = ["𝓫"];
        this._dict["MCc"] = ["𝓬"];
        this._dict["MCd"] = ["𝓭"];
        this._dict["MCe"] = ["𝓮"];
        this._dict["MCf"] = ["𝓯"];
        this._dict["MCg"] = ["𝓰"];
        this._dict["MCh"] = ["𝓱"];
        this._dict["MCi"] = ["𝓲"];
        this._dict["MCj"] = ["𝓳"];
        this._dict["MCk"] = ["𝓴"];
        this._dict["MCl"] = ["𝓵"];
        this._dict["MCm"] = ["𝓶"];
        this._dict["MCn"] = ["𝓷"];
        this._dict["MCo"] = ["𝓸"];
        this._dict["MCp"] = ["𝓹"];
        this._dict["MCq"] = ["𝓺"];
        this._dict["MCr"] = ["𝓻"];
        this._dict["MCs"] = ["𝓼"];
        this._dict["MCt"] = ["𝓽"];
        this._dict["MCu"] = ["𝓾"];
        this._dict["MCv"] = ["𝓿"];
        this._dict["MCw"] = ["𝔀"];
        this._dict["MCx"] = ["𝔁"];
        this._dict["MCy"] = ["𝔂"];
        this._dict["MCz"] = ["𝔃"];
        this._dict["MfA"] = ["𝔄"];
        this._dict["MfB"] = ["𝔅"];
        this._dict["MfD"] = ["𝔇"];
        this._dict["MfE"] = ["𝔈"];
        this._dict["MfF"] = ["𝔉"];
        this._dict["MfG"] = ["𝔊"];
        this._dict["MfJ"] = ["𝔍"];
        this._dict["MfK"] = ["𝔎"];
        this._dict["MfL"] = ["𝔏"];
        this._dict["MfM"] = ["𝔐"];
        this._dict["MfN"] = ["𝔑"];
        this._dict["MfO"] = ["𝔒"];
        this._dict["MfP"] = ["𝔓"];
        this._dict["MfQ"] = ["𝔔"];
        this._dict["MfS"] = ["𝔖"];
        this._dict["MfT"] = ["𝔗"];
        this._dict["MfU"] = ["𝔘"];
        this._dict["MfV"] = ["𝔙"];
        this._dict["MfW"] = ["𝔚"];
        this._dict["MfX"] = ["𝔛"];
        this._dict["MfY"] = ["𝔜"];
        this._dict["Mfa"] = ["𝔞"];
        this._dict["Mfb"] = ["𝔟"];
        this._dict["Mfc"] = ["𝔠"];
        this._dict["Mfd"] = ["𝔡"];
        this._dict["Mfe"] = ["𝔢"];
        this._dict["Mff"] = ["𝔣"];
        this._dict["Mfg"] = ["𝔤"];
        this._dict["Mfh"] = ["𝔥"];
        this._dict["Mfi"] = ["𝔦"];
        this._dict["Mfj"] = ["𝔧"];
        this._dict["Mfk"] = ["𝔨"];
        this._dict["Mfl"] = ["𝔩"];
        this._dict["Mfm"] = ["𝔪"];
        this._dict["Mfn"] = ["𝔫"];
        this._dict["Mfo"] = ["𝔬"];
        this._dict["Mfp"] = ["𝔭"];
        this._dict["Mfq"] = ["𝔮"];
        this._dict["Mfr"] = ["𝔯"];
        this._dict["Mfs"] = ["𝔰"];
        this._dict["Mft"] = ["𝔱"];
        this._dict["Mfu"] = ["𝔲"];
        this._dict["Mfv"] = ["𝔳"];
        this._dict["Mfw"] = ["𝔴"];
        this._dict["Mfx"] = ["𝔵"];
        this._dict["Mfy"] = ["𝔶"];
        this._dict["Mfz"] = ["𝔷"];

        // (Sub / Super) scripts

        this._dict["_a"] = ["ₐ"];
        this._dict["_e"] = ["ₑ"];
        this._dict["_h"] = ["ₕ"];
        this._dict["_i"] = ["ᵢ"];
        this._dict["_j"] = ["ⱼ"];
        this._dict["_k"] = ["ₖ"];
        this._dict["_l"] = ["ₗ"];
        this._dict["_m"] = ["ₘ"];
        this._dict["_n"] = ["ₙ"];
        this._dict["_o"] = ["ₒ"];
        this._dict["_p"] = ["ₚ"];
        this._dict["_r"] = ["ᵣ"];
        this._dict["_s"] = ["ₛ"];
        this._dict["_t"] = ["ₜ"];
        this._dict["_u"] = ["ᵤ"];
        this._dict["_v"] = ["ᵥ"];
        this._dict["_x"] = ["ₓ"];

        this._dict["^a"] = ["ᵃ"];
        this._dict["^b"] = ["ᵇ"];
        this._dict["^c"] = ["ᶜ"];
        this._dict["^d"] = ["ᵈ"];
        this._dict["^e"] = ["ᵉ"];
        this._dict["^f"] = ["ᶠ"];
        this._dict["^g"] = ["ᵍ"];
        this._dict["^h"] = ["ʰ"];
        this._dict["^i"] = ["ⁱ"];
        this._dict["^j"] = ["ʲ"];
        this._dict["^k"] = ["ᵏ"];
        this._dict["^l"] = ["ˡ"];
        this._dict["^m"] = ["ᵐ"];
        this._dict["^n"] = ["ⁿ"];
        this._dict["^o"] = ["ᵒ"];
        this._dict["^p"] = ["ᵖ"];
        this._dict["^r"] = ["ʳ"];
        this._dict["^s"] = ["ˢ"];
        this._dict["^t"] = ["ᵗ"];
        this._dict["^u"] = ["ᵘ"];
        this._dict["^v"] = ["ᵛ"];
        this._dict["^w"] = ["ʷ"];
        this._dict["^x"] = ["ˣ"];
        this._dict["^y"] = ["ʸ"];
        this._dict["^z"] = ["ᶻ"];

        this._dict["^A"] = ["ᴬ"];
        this._dict["^B"] = ["ᴮ"];
        this._dict["^D"] = ["ᴰ"];
        this._dict["^E"] = ["ᴱ"];
        this._dict["^G"] = ["ᴳ"];
        this._dict["^H"] = ["ᴴ"];
        this._dict["^I"] = ["ᴵ"];
        this._dict["^J"] = ["ᴶ"];
        this._dict["^K"] = ["ᴷ"];
        this._dict["^L"] = ["ᴸ"];
        this._dict["^M"] = ["ᴹ"];
        this._dict["^N"] = ["ᴺ"];
        this._dict["^O"] = ["ᴼ"];
        this._dict["^P"] = ["ᴾ"];
        this._dict["^R"] = ["ᴿ"];
        this._dict["^T"] = ["ᵀ"];
        this._dict["^U"] = ["ᵁ"];
        this._dict["^V"] = ["ⱽ"];
        this._dict["^W"] = ["ᵂ"];

        // Some ISO8859-1 characters.

        this._dict[" "        ] = [" "];
        this._dict["!"        ] = ["¡"];
        this._dict["cent"     ] = ["¢"];
        this._dict["brokenbar"] = ["¦"];
        this._dict["degree"   ] = ["°"];
        this._dict["?"        ] = ["¿"];
        this._dict["^a_"      ] = ["ª"];
        this._dict["^o_"      ] = ["º"];

        // Circled, parenthesised etc. numbers and letters.

        this._dict[ "(0)"] = to_list(" ⓪");
        this._dict[ "(1)"] = to_list("⑴①⒈❶➀➊");
        this._dict[ "(2)"] = to_list("⑵②⒉❷➁➋");
        this._dict[ "(3)"] = to_list("⑶③⒊❸➂➌");
        this._dict[ "(4)"] = to_list("⑷④⒋❹➃➍");
        this._dict[ "(5)"] = to_list("⑸⑤⒌❺➄➎");
        this._dict[ "(6)"] = to_list("⑹⑥⒍❻➅➏");
        this._dict[ "(7)"] = to_list("⑺⑦⒎❼➆➐");
        this._dict[ "(8)"] = to_list("⑻⑧⒏❽➇➑");
        this._dict[ "(9)"] = to_list("⑼⑨⒐❾➈➒");
        this._dict["(10)"] = to_list("⑽⑩⒑❿➉➓");
        this._dict["(11)"] = to_list("⑾⑪⒒");
        this._dict["(12)"] = to_list("⑿⑫⒓");
        this._dict["(13)"] = to_list("⒀⑬⒔");
        this._dict["(14)"] = to_list("⒁⑭⒕");
        this._dict["(15)"] = to_list("⒂⑮⒖");
        this._dict["(16)"] = to_list("⒃⑯⒗");
        this._dict["(17)"] = to_list("⒄⑰⒘");
        this._dict["(18)"] = to_list("⒅⑱⒙");
        this._dict["(19)"] = to_list("⒆⑲⒚");
        this._dict["(20)"] = to_list("⒇⑳⒛");

        this._dict["(a)" ] = to_list("⒜Ⓐⓐ");
        this._dict["(b)" ] = to_list("⒝Ⓑⓑ");
        this._dict["(c)" ] = to_list("⒞Ⓒⓒ");
        this._dict["(d)" ] = to_list("⒟Ⓓⓓ");
        this._dict["(e)" ] = to_list("⒠Ⓔⓔ");
        this._dict["(f)" ] = to_list("⒡Ⓕⓕ");
        this._dict["(g)" ] = to_list("⒢Ⓖⓖ");
        this._dict["(h)" ] = to_list("⒣Ⓗⓗ");
        this._dict["(i)" ] = to_list("⒤Ⓘⓘ");
        this._dict["(j)" ] = to_list("⒥Ⓙⓙ");
        this._dict["(k)" ] = to_list("⒦Ⓚⓚ");
        this._dict["(l)" ] = to_list("⒧Ⓛⓛ");
        this._dict["(m)" ] = to_list("⒨Ⓜⓜ");
        this._dict["(n)" ] = to_list("⒩Ⓝⓝ");
        this._dict["(o)" ] = to_list("⒪Ⓞⓞ");
        this._dict["(p)" ] = to_list("⒫Ⓟⓟ");
        this._dict["(q)" ] = to_list("⒬Ⓠⓠ");
        this._dict["(r)" ] = to_list("⒭Ⓡⓡ");
        this._dict["(s)" ] = to_list("⒮Ⓢⓢ");
        this._dict["(t)" ] = to_list("⒯Ⓣⓣ");
        this._dict["(u)" ] = to_list("⒰Ⓤⓤ");
        this._dict["(v)" ] = to_list("⒱Ⓥⓥ");
        this._dict["(w)" ] = to_list("⒲Ⓦⓦ");
        this._dict["(x)" ] = to_list("⒳Ⓧⓧ");
        this._dict["(y)" ] = to_list("⒴Ⓨⓨ");
        this._dict["(z)" ] = to_list("⒵Ⓩⓩ");

    }

    function translate(input) {
        var candidates = [];
        if (typeof this._dict[input] !== "undefined") {
            candidates = candidates.concat(this._dict[input]);
        }
        if (typeof this._tex[input] !== "undefined") {
            candidates = candidates.concat(this._tex[input]);
        }
        return candidates.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    }

    Input.prototype = {
        constructor: Input,
        translate: translate
    };

    return Input;
} () );
