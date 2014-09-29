var Input = (function () {
    function Input () {
        this._dict = {};
        function to_list(str) { return str.replace(/ /g,'').split(''); }

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

        this._dict["l--" ] = ["⟵"]; this._dict["<--" ] = ["⟵"]; this._dict["l~" ] = ["↜" "⇜"];
        this._dict["r--" ] = ["⟶"]; this._dict["-->" ] = ["⟶"]; this._dict["r~" ] = ["↝" "⇝" "⟿"];
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

        this._dict["sq" ] = to_list("■□◼◻◾◽▣▢▤▥▦▧▨▩◧◨◩◪◫◰◱◲◳"];
        this._dict["sqb"] = to_list("■◼◾"];
        this._dict["sqw"] = to_list("□◻◽"];
        this._dict["sq."] = ["▣"];
        this._dict["sqo"] = ["▢"];

        // Rectangles.

        this._dict["re" ] = to_list("▬▭▮▯"];
        this._dict["reb"] = to_list("▬▮"];
        this._dict["rew"] = to_list("▭▯"];

        // Parallelograms.

        this._dict["pa" ] = to_list("▰▱"];
        this._dict["pab" ] = ["▰"];
        this._dict["paw" ] = ["▱"];

        // Diamonds.

        this._dict["di" ] = to_list("◆◇◈"];
        this._dict["dib" ] = ["◆"];
        this._dict["diw" ] = ["◇"];
        this._dict["di." ] = ["◈"];

        // Circles.

        this._dict["ci"  ] = to_list("●○◎◌◯◍◐◑◒◓◔◕◖◗◠◡◴◵◶◷⚆⚇⚈⚉"];
        this._dict["cib"  ] = ["●"];
        this._dict["ciw"  ] = ["○"];
        this._dict["ci."  ] = ["◎"];
        this._dict["ci.." ] = ["◌"];
        this._dict["ciO"  ] = ["◯"];

        // Stars.

        this._dict["st"  ] = to_list("⋆✦✧✶✴✹ ★☆✪✫✯✰✵✷✸"];
        this._dict["st4" ] = to_list("✦✧"];
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

        this._dict["("] = to_list("([{⁅⁽₍〈⎴⟅⟦⟨⟪⦃〈《「『【〔〖〚︵︷︹︻︽︿﹁﹃﹙﹛﹝（［｛｢"];
        this._dict[")"] = to_list(")]}⁆⁾₎〉⎵⟆⟧⟩⟫⦄〉》」』】〕〗〛︶︸︺︼︾﹀﹂﹄﹚﹜﹞）］｝｣"];

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

        this._dict["'"] = to_list("′″‴⁗"];
        this._dict["`"] = to_list("‵‶‷"];

        // Fractions.

        this._dict["frac"] = to_list("¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟"];

        // Bullets.

        this._dict["bu" ] = to_list("•◦‣⁌⁍"];
        this._dict["bub" ] = ["•"];
        this._dict["buw" ] = ["◦"];
        this._dict["but" ] = ["‣"];

        // Musical symbols.

        this._dict["note"] = to_list("♩♪♫♬"];
        this._dict["b"    ] = ["♭"];
        this._dict["#"    ] = ["♯"];

        // Other punctuation and symbols.

        this._dict["\\"         ] = ["\\"];
        this._dict["en"         ] = ["–"];
        this._dict["em"         ] = ["—"];
        this._dict["^i"         ] = ["ⁱ"];
        this._dict["!!"         ] = ["‼"];
        this._dict["??"         ] = ["⁇"];
        this._dict["?!"         ] = ["‽" "⁈"];
        this._dict["!?"         ] = ["⁉"];
        this._dict["die"       ] = to_list("⚀⚁⚂⚃⚄⚅"];
        this._dict["asterisk"  ] = to_list("⁎⁑⁂✢✣✤✥✱✲✳✺✻✼✽❃❉❊❋"];
        this._dict["8<"         ] = ["✂" "✄"];
        this._dict["tie"        ] = ["⁀"];
        this._dict["undertie"   ] = ["‿"];
        this._dict["apl"       ] = to_list("⌶⌷⌸⌹⌺⌻⌼⌽⌾⌿⍀⍁⍂⍃⍄⍅⍆⍇⍈⍉⍊⍋⍌⍍⍎⍏⍐⍑⍒⍓⍔⍕⍖⍗⍘⍙⍚⍛⍜⍝⍞⍟⍠⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯⍰⍱⍲⍳⍴⍵⍶⍷⍸⍹⍺⎕"];
    }

    function translate(input) {
        return this._dict[input];
    }

    Input.prototype = {
        constructor: Input,
        translate: translate,
        sendConstraints: sendConstraints,
        sendSolveAll: sendSolveAll,
        sendGive: sendGive,
        sendRefine: sendRefine,
        sendMetas: sendMetas,
        sendAuto: sendAuto,
        highlight: highlight
    };

    return Input;
} () );
