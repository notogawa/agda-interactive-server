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
        return this._dict[input];
    }

    Input.prototype = {
        constructor: Input,
        translate: translate
    };

    return Input;
} () );
