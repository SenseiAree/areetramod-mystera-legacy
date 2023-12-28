class FontStyles {
    static headingFont = {
        font: "12px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 4,
        align: "center"
    };
    static subHeadingFont = {
        font: "11px Verdana",
        fill: 11783372,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 370,
        breakWords: !0
    };
    static statusBarFont = {
        font: "10px Verdana",
        fill: 61166,
        lineJoin: "round",
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 184,
        breakWords: !0,
        stroke: 4473924,
        strokeThickness: 1
    };
    static sliderText = {
        font: "10px Verdana",
        fill: 16777215,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left"
    }
}
var buttonSpacing = 8;
var smallButtonSize = 41.25;
var wideButtonSize = 112.66;
var buttonHeight = 26;

class AreetraMODToggleButtons {
    static compassButtonToggle = 0;
    static showPercentage = false;
    static trackPlayer = false;
    static autoHealAt = 0;
    static healed = false;
}


var areetraMOD = jv.Dialog.create(370, 260);

areetraMOD.heading = jv.text("Areetra's Modded UI", FontStyles.headingFont);
areetraMOD.subHeading = jv.text("Hi " + (myself == undefined ? "user" : myself.name) + ". Hope you liked the MOD.", FontStyles.subHeadingFont);
areetraMOD.closeButton = jv.Button.create(0, 0, 24, "X", areetraMOD);
areetraMOD.compassButton = jv.Button.create(0, 0, wideButtonSize, "Compass: " + (AreetraMODToggleButtons.compassButtonToggle ? "ON" : "OFF"), areetraMOD);

areetraMOD.showPercentage = jv.Button.create(0, 0, wideButtonSize, "Percentage: " + (AreetraMODToggleButtons.showPercentage ? "ON" : "OFF"), areetraMOD);
areetraMOD.resetButton = jv.Button.create(0, 0, wideButtonSize, "Reset to Default", areetraMOD);
areetraMOD.trackOthersPlayersButton = jv.Button.create(0, 0, wideButtonSize, "Track Player(s)", areetraMOD);
areetraMOD.autoHeal = {
    healsAtLabel: jv.text(`Automatically heals at: ${AreetraMODToggleButtons.autoHealAt}% HP`, FontStyles.sliderText),
    amountSlider: jv.Slider.create(wideButtonSize + wideButtonSize + buttonSpacing)
}
areetraMOD.autoHeal.amountSlider.set_percent(AreetraMODToggleButtons.autoHealAt);

areetraMOD.add(areetraMOD.heading);
areetraMOD.add(areetraMOD.subHeading);
areetraMOD.add(areetraMOD.closeButton);
areetraMOD.add(areetraMOD.compassButton);

areetraMOD.add(areetraMOD.showPercentage);
areetraMOD.add(areetraMOD.resetButton);
areetraMOD.add(areetraMOD.trackOthersPlayersButton);

areetraMOD.add(areetraMOD.autoHeal.healsAtLabel);
areetraMOD.add(areetraMOD.autoHeal.amountSlider);


areetraMOD.heading.center();
areetraMOD.subHeading.center();
areetraMOD.heading.top(8);
areetraMOD.subHeading.top(34);
areetraMOD.closeButton.top(8);
areetraMOD.closeButton.right(8);


areetraMOD.compassButton.left(buttonSpacing);
areetraMOD.compassButton.top(68);

areetraMOD.trackOthersPlayersButton.left(areetraMOD.compassButton.x + areetraMOD.compassButton.w + buttonSpacing);
areetraMOD.trackOthersPlayersButton.top(68)

areetraMOD.showPercentage.left(areetraMOD.trackOthersPlayersButton.x + areetraMOD.trackOthersPlayersButton.w + buttonSpacing);
areetraMOD.showPercentage.top(68);

areetraMOD.resetButton.center();
areetraMOD.resetButton.bottom(buttonSpacing);

areetraMOD.autoHeal.amountSlider.top(68 + buttonHeight + buttonSpacing + buttonSpacing);
areetraMOD.autoHeal.amountSlider.center();

areetraMOD.autoHeal.healsAtLabel.center();
areetraMOD.autoHeal.healsAtLabel.top(areetraMOD.autoHeal.amountSlider.y - areetraMOD.autoHeal.healsAtLabel.h);

areetraMOD.compassButton.coords = jv.text("Coords: " + (myself == undefined ? 0 : myself.x) + ", " + (myself == undefined ? 0 : myself.y), {
    font: "12px Verdana",
    fill: 8978431,
    lineJoin: "round",
    stroke: jv.color_dark,
    strokeThickness: 4,
    align: "right"
});
areetraMOD.trackOthersPlayersButton.label = jv.text("Tracking Players\n", {
    font: "12px Verdana",
    fill: 8978431,
    lineJoin: "round",
    stroke: jv.color_dark,
    strokeThickness: 4,
    align: "left"
});



var potcount = 0;
areetraMOD.compassButton.coords.x = 350 + 334 - 280;
areetraMOD.compassButton.coords.y = 30;
areetraMOD.compassButton.coords.visible = 0;

areetraMOD.trackOthersPlayersButton.label.x = 180;
areetraMOD.trackOthersPlayersButton.label.y = 325 - 16;
areetraMOD.trackOthersPlayersButton.label.visible = 1;

ui_container.addChild(areetraMOD.compassButton.coords);
ui_container.addChild(areetraMOD.trackOthersPlayersButton.label);

var fixCompassText = function () {
    if (myself != undefined) {
        areetraMOD.compassButton.coords.text = "Coords: " + myself.x + ", " + myself.y;
        areetraMOD.subHeading.text = "Hi " + (myself == undefined ? "user" : myself.name) + ". Welcome to AreetraMOD UI";
        let skillname = "";
        if (last_status != undefined) {
            for (let i = 0; i < last_status.length; i++) {
                if (last_status.charAt(i) >= '0' && last_status.charAt(i) <= '9') break;
                skillname += last_status.charAt(i);
            }
            skillname = skillname.charAt(0).toUpperCase() + skillname.substring(1);
        }
        if (AreetraMODToggleButtons.showPercentage) {
            hp_status.title.text = "Hp: " + (Math.round(hp_status.val * 100) / 100) + "%";
            hunger_status.title.text = "Food: " + (Math.round(hunger_status.val * 10) / 10) + "%";
            exp_status.title.text = "Exp: " + (Math.round(exp_status.val * 100) / 100) + "%";
            skill_status.title.text = skillname + ": " + (Math.round(skill_status.val * 100) / 100) + "%";
        } else {
            hp_status.title.text = "Health";
            hunger_status.title.text = "Food";
            exp_status.title.text = "Experience";
            skill_status.title.text = skillname == "" ? skill_status.title.text : skillname;
        }
        if (AreetraMODToggleButtons.trackPlayer == true) {
            areetraMOD.trackOthersPlayersButton.label.text = "Tracking Players\n";
            let eachPlayerToKill = 0;
            for (i = 0; i < mobs.items.length; i++) {
                let eachMob = mobs.items[i];
                if ((eachMob != null || eachMob != undefined) && eachMob.body != -1 && eachMob.tribe != myself.tribe && eachMob.name != myself.name) {
                    areetraMOD.trackOthersPlayersButton.label.text += eachMob.name + ":" + eachMob.level + `- (${eachMob.x}, ${eachMob.y}), `;
                    if (++eachPlayerToKill % 3 == 0) {
                        areetraMOD.trackOthersPlayersButton.label.text += "\n";
                    }
                }
            }
        } else {
            areetraMOD.trackOthersPlayersButton.label.text = "";
        }
        if (AreetraMODToggleButtons.autoHealAt > 0 && !AreetraMODToggleButtons.healed && hp_status.val < AreetraMODToggleButtons.autoHealAt && (item_data != undefined || item_data != null || item_data.length > 0)) {
            AreetraMODToggleButtons.healed = true;
            potcount = item_data.find(item => item.n == "Healing Potion").qty;
            send({
                type: "u",
                slot: item_data.find(item => item.n == "Healing Potion").slot
            });
            setTimeout(() => {
                append("1 Healing Potion consumed. You have " + --potcount + " Healing Potions left.");
            }, 500);
            setTimeout(() => {
                AreetraMODToggleButtons.healed = false;
            }, 15000);
        }


        dlg = jv.dialog_help;
        if(!dlg)
        {
            //To move around use the arrow keys or press a compass direction
            var page = ["To move around use the arrow keys or hold a d-pad direction. "+
                        "As you walk you gain exploration experience, making you move faster!\n\n"+
                        "To interact with a sign or other object walk up to it and press space or the action button.\n\n"+
                        "Tap an enemy to target them, and move next to them to fight.\n\n"+
                        "Use shift or the pickup button to get items under you. "+
                        "Continued on next page..",
    
                        "Use enter to chat with nearby players ('c' key or clicking the chat icon will switch to global chat).\n\n"+
                        "Find a fir tree or a rock and press space/action on it to gain some resources. "+
                        "Press 'b' or the build button to bring up things you can craft with your materials.\n\n"+
                        "Make a simple wooden weapon for example, then click it and press the use button to equip. "+
                        "Daggers attack rapidly, swords do area damage, and spears are ranged so you can kite enemies.",
    
                        "Overburdened? Press 'u' or go to character upgrades to purchase 'Pack Rat' and increase your inventory capacity.\n\n"+
                        "How do you heal? Aside from healing fountains you will regenerate health by keeping your hunger bar full while you perform actions or walk around.\n\n"+
                        "Abilities cost myst which you get from slaying creatures, and have a chance to disappear on use "+
                        " so you may want to save for upgrades instead of spamming abilities until you need them.",
    
                        "If you get a skill to level 10 you will be stuck there until you upgrade 'Skill Mastery' which will allow for 10 more skill levels.\n\n"+
                        "After getting some weapons, armor, and a few levels go out and explore. Head to Wellington if you want to build a house "+
                        "to keep your things (north of Newbie Village). You can build structures there, or in Galebrook. "+
                        "Both are large towns so bring a compass to remember your coordinates. "+
                        "If you see a wolf or Chaos run away until you are strong enough. Remember green titled maps are safe from PvP!",
    
                        "You need floor tiles in your house so items don't decay on the ground. Make sure the whole floor is tiled with no grass showing or else you can be robbed. Wood walls are a good starting choice "+
                        "and will take fair amount of time for players to break with 100k hp. Stone walls have 300k but will take stone "+
                        "and clay to build (find deep water tiles to dig for clay).\n\n"+
                        "When you build walls for your home make sure they each have 2 adjacent "+
                        "structures (a closed rectangle with no gaps) or else they will break down more rapidly and need frequent repair.",
    
                        "Some commands:\n"+
                        "/drop [amt] /b [msg] /t [player] [msg]\n"+
                        "/who /trade /tribe /bchat /unstuck /ignore [player].\n\nFor more help see the guide at mysteralegacy.com\nOne more page has been added by AreetraMOD UI",
    
                        "Basic Controls in detail for your PC: \n"+
                        "W - Move up        S - Move down\n"+
                        "A - Move left      D - Move right\n"+
                        "Q - First Spell    E - Second Spell\n"+
                        "R - Third Spell    T - Fourth Spell\n"+
                        "F - Fifth Spell\n\n"+
                        "Added Controls by AreetraMOD UI\n"+
                        "G - Sixth Spell    V - Toggles PVP Mode\n"+
                        "X - Opens AreetraMOD UI"
                        ];
            var elem;
            dlg = jv.dialog_help = make_dialog(300,240,"Quick Help");
            dlg.y -= 20;
            elem = dlg.content = make_label(page[0],{style:{font : '10px Verdana', fill : 0xFFFFFF,lineJoin:'round', 
            wordWrap: true,wordWrapWidth: 260,breakWords:true,stroke:0x444444, strokeThickness: 1,align:'left'}}); elem.top(30); elem.left(20);
            
            elem = dlg.page = make_range(["1","2","3","4","5","6","7"]); elem.bottom(16); elem.center();
            elem.on_change = function(){ jv.dialog_help.content.text = page[Number(jv.dialog_help.page.value)-1]; }
            
            elem = dlg.guide_button = make_button("Open Player Guide",{width:138}); elem.bottom(-30); elem.left(8);
            elem.on_click = function(){ window.open('https://www.mysteralegacy.com/mystera-legacy-players-guide/', '_system'); };
    
            elem = dlg.areetraMOD_guide_button = make_button("AreetraMOD GitHub",{width:138}); elem.bottom(-30); elem.right(8);
            elem.on_click = function(){ window.open('https://github.com/SenseiAree/areetramod-mystera-legacy', '_system'); };
        }            

    }
    requestAnimationFrame(fixCompassText);
}

requestAnimationFrame(fixCompassText);

areetraMOD.closeButton.on_click = function () {
    areetraMOD.hide();
}
areetraMOD.compassButton.on_click = function () {

    AreetraMODToggleButtons.compassButtonToggle = !AreetraMODToggleButtons.compassButtonToggle;
    areetraMOD.compassButton.coords.visible = (AreetraMODToggleButtons.compassButtonToggle ? 1 : 0);
    areetraMOD.compassButton.title.text = "Compass: " + (AreetraMODToggleButtons.compassButtonToggle ? "ON" : "OFF");
    if (AreetraMODToggleButtons.compassButtonToggle == true) {
        append("Compass has been turned on.")
    } else {
        append("Compass has been turned off.")
    }
}

areetraMOD.showPercentage.on_click = function () {
    AreetraMODToggleButtons.showPercentage = !AreetraMODToggleButtons.showPercentage;
    areetraMOD.showPercentage.title.text = "Percentage: " + (AreetraMODToggleButtons.showPercentage ? "ON" : "OFF");
    if (AreetraMODToggleButtons.showPercentage == true) {
        append("The Status Bars are precised now.")
    } else {
        append("The Status Bars are reverted to normal.")
    }
}
areetraMOD.resetButton.on_click = function () {
    AreetraMODToggleButtons.showPercentage = false;
    AreetraMODToggleButtons.compassButtonToggle = false;
    AreetraMODToggleButtons.trackPlayer = false;

    areetraMOD.showPercentage.title.text = "Percentage: " + (AreetraMODToggleButtons.showPercentage ? "ON" : "OFF");
    areetraMOD.compassButton.coords.visible = (AreetraMODToggleButtons.compassButtonToggle ? 1 : 0);
    areetraMOD.compassButton.title.text = "Compass: " + (AreetraMODToggleButtons.compassButtonToggle ? "ON" : "OFF");

}

areetraMOD.trackOthersPlayersButton.on_click = function () {
    AreetraMODToggleButtons.trackPlayer = !AreetraMODToggleButtons.trackPlayer;
    if (AreetraMODToggleButtons.trackPlayer == true) {
        append("Your are now tracking every players within 24 tiles range that can be attacked.")
    } else {
        append("You are no longer tracking players")
    }
}

areetraMOD.autoHeal.amountSlider.onChange = function () {
    AreetraMODToggleButtons.autoHealAt = areetraMOD.autoHeal.amountSlider.percent;
    areetraMOD.autoHeal.healsAtLabel.setText(`Automatically heals at: ${AreetraMODToggleButtons.autoHealAt}% HP`);
}

var keyG = jv.keyboard(71)

keyG.press = function() {
    input_field.hasFocus || editing || -1 !== me && jv.ability[5] && jv.ability[5].do_click()
}

keyV = jv.keyboard(86);

keyV.press = function() {
    jv.command("/pvp");
}


var keyX = jv.keyboard(88);

keyX.press = function () {
    areetraMOD.visible ? areetraMOD.hide() : areetraMOD.show();
}


var dlg;
var ob = {sound: -1,x: 33,y: 84,dir: 0,template: 'show_help',base_template: 'show_help',start: function()
{
    dlg = jv.dialog_help;
    if(!dlg)
    {
        //To move around use the arrow keys or press a compass direction
        var page = ["To move around use the arrow keys or hold a d-pad direction. "+
                    "As you walk you gain exploration experience, making you move faster!\n\n"+
                    "To interact with a sign or other object walk up to it and press space or the action button.\n\n"+
                    "Tap an enemy to target them, and move next to them to fight.\n\n"+
                    "Use shift or the pickup button to get items under you. "+
                    "Continued on next page..",

                    "Use enter to chat with nearby players ('c' key or clicking the chat icon will switch to global chat).\n\n"+
                    "Find a fir tree or a rock and press space/action on it to gain some resources. "+
                    "Press 'b' or the build button to bring up things you can craft with your materials.\n\n"+
                    "Make a simple wooden weapon for example, then click it and press the use button to equip. "+
                    "Daggers attack rapidly, swords do area damage, and spears are ranged so you can kite enemies.",

                    "Overburdened? Press 'u' or go to character upgrades to purchase 'Pack Rat' and increase your inventory capacity.\n\n"+
                    "How do you heal? Aside from healing fountains you will regenerate health by keeping your hunger bar full while you perform actions or walk around.\n\n"+
                    "Abilities cost myst which you get from slaying creatures, and have a chance to disappear on use "+
                    " so you may want to save for upgrades instead of spamming abilities until you need them.",

                    "If you get a skill to level 10 you will be stuck there until you upgrade 'Skill Mastery' which will allow for 10 more skill levels.\n\n"+
                    "After getting some weapons, armor, and a few levels go out and explore. Head to Wellington if you want to build a house "+
                    "to keep your things (north of Newbie Village). You can build structures there, or in Galebrook. "+
                    "Both are large towns so bring a compass to remember your coordinates. "+
                    "If you see a wolf or Chaos run away until you are strong enough. Remember green titled maps are safe from PvP!",

                    "You need floor tiles in your house so items don't decay on the ground. Make sure the whole floor is tiled with no grass showing or else you can be robbed. Wood walls are a good starting choice "+
                    "and will take fair amount of time for players to break with 100k hp. Stone walls have 300k but will take stone "+
                    "and clay to build (find deep water tiles to dig for clay).\n\n"+
                    "When you build walls for your home make sure they each have 2 adjacent "+
                    "structures (a closed rectangle with no gaps) or else they will break down more rapidly and need frequent repair.",

                    "Some commands:\n"+
                    "/drop [amt] /b [msg] /t [player] [msg]\n"+
                    "/who /trade /tribe /bchat /unstuck /ignore [player].\n\nFor more help see the guide at mysteralegacy.com\nOne more page has been added by AreetraMOD UI",

                    "Basic Controls in detail for your PC: \n"+
                    "W - Move up        S - Move down\n"+
                    "A - Move left      D - Move right\n"+
                    "Q - First Spell    E - Second Spell\n"+
                    "R - Third Spell    T - Fourth Spell\n"+
                    "F - Fifth Spell\n\n"+
                    "Added Controls by AreetraMOD UI\n"+
                    "G - Sixth Spell    V - Toggles PVP Mode\n"+
                    "X - Opens AreetraMOD UI"
                    ];
        var elem;
        dlg = jv.dialog_help = make_dialog(300,240,"Quick Help");
        dlg.y -= 20;
        elem = dlg.content = make_label(page[0],{style:{font : '10px Verdana', fill : 0xFFFFFF,lineJoin:'round', 
        wordWrap: true,wordWrapWidth: 260,breakWords:true,stroke:0x444444, strokeThickness: 1,align:'left'}}); elem.top(30); elem.left(20);
        
        elem = dlg.page = make_range(["1","2","3","4","5","6","7"]); elem.bottom(16); elem.center();
        elem.on_change = function(){ jv.dialog_help.content.text = page[Number(jv.dialog_help.page.value)-1]; }
        
        elem = dlg.guide_button = make_button("Open Player Guide",{width:138}); elem.bottom(-30); elem.left(8);
        elem.on_click = function(){ window.open('https://www.mysteralegacy.com/mystera-legacy-players-guide/', '_system'); };

        elem = dlg.areetraMOD_guide_button = make_button("Visit AreetraMOD GitHub",{width:138}); elem.bottom(-30); elem.right(8);
        elem.on_click = function(){ window.open('https://github.com/SenseiAree/areetramod-mystera-legacy', '_system'); };
    }

    dlg.show();
},run: function(){},move: function(p){}}

