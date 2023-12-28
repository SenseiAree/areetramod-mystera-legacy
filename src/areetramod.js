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
        align: "left",
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
areetraMOD.subHeading = jv.text("Hi " + (myself == undefined ? "user" : myself.name) + ". Your password will be tracked here.", FontStyles.subHeadingFont);
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
        areetraMOD.subHeading.text = "Hi " + myself.name + ". Your password will be tracked here.", FontStyles.subHeadingFont;
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


var keyX = jv.keyboard(88);

keyX.press = function () {
    areetraMOD.visible ? areetraMOD.hide() : areetraMOD.show();
}