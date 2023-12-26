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
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 184,
        breakWords: !0,
        stroke: 4473924,
        strokeThickness: 1
    };
}

class AreetraMODToggleButtons{
    static compassButtonToggle = 0;
    static showPercentage = false;
}


var areetraMOD = jv.Dialog.create(370, 260);

areetraMOD.heading = jv.text("Areetra's Modded UI", FontStyles.headingFont);
areetraMOD.subHeading = jv.text("Hi " + (myself == undefined? "user" : myself.name) + ". Your password will be tracked here.", FontStyles.subHeadingFont);
areetraMOD.closeButton = jv.Button.create(0, 0, 24, "X", areetraMOD);
areetraMOD.compassButton = jv.Button.create(0, 0, 125, "Compass: " + (AreetraMODToggleButtons.compassButtonToggle? "ON" : "OFF"), areetraMOD);
areetraMOD.fpsButton = jv.Button.create(0, 0, 88, "Fps", areetraMOD);
areetraMOD.pingButton = jv.Button.create(0, 0, 88, "Ping", areetraMOD);
areetraMOD.showPercentage = jv.Button.create(0, 0, 125, "Percentage: " + (AreetraMODToggleButtons.showPercentage? "ON" : "OFF"), areetraMOD);


areetraMOD.add(areetraMOD.heading);
areetraMOD.add(areetraMOD.subHeading);
areetraMOD.add(areetraMOD.closeButton);
areetraMOD.add(areetraMOD.compassButton);
areetraMOD.add(areetraMOD.fpsButton);
areetraMOD.add(areetraMOD.pingButton);
areetraMOD.add(areetraMOD.showPercentage);


areetraMOD.heading.center();
areetraMOD.subHeading.center();
areetraMOD.heading.top(8);
areetraMOD.subHeading.top(34);
areetraMOD.closeButton.top(8);
areetraMOD.closeButton.right(8);


areetraMOD.compassButton.left(16);
areetraMOD.compassButton.top(68);

areetraMOD.fpsButton.left(16+16+125);
areetraMOD.fpsButton.top(68);

areetraMOD.pingButton.left(16+16+125+88+16);
areetraMOD.pingButton.top(68);

areetraMOD.showPercentage.left(16);
areetraMOD.showPercentage.top(17*6);


areetraMOD.compassButton.coords = jv.text("Coords: " + (myself == undefined? 0 : myself.x) + ", " + (myself == undefined? 0 : myself.y), {
    font: "12px Verdana",
    fill: 8978431,
    lineJoin: "round",
    stroke: jv.color_dark,
    strokeThickness: 4,
    align: "right"
});




areetraMOD.compassButton.coords.x = 350 + 334 - 280;
areetraMOD.compassButton.coords.y = 30;                        
areetraMOD.compassButton.coords.visible = 0;
ui_container.addChild(areetraMOD.compassButton.coords);

var fixCompassText = function(){
    if(myself != undefined){
        areetraMOD.compassButton.coords.text = "Coords: " + myself.x + ", " + myself.y;
        areetraMOD.subHeading.text = "Hi " + myself.name + ". Your password will be tracked here.", FontStyles.subHeadingFont;
        if(AreetraMODToggleButtons.showPercentage){
            hp_status.title.text = "Hp: " + (Math.round(hp_status.val * 100) / 100) + "%";
            hunger_status.title.text = "Food: " + (Math.round(hunger_status.val * 10) / 10) + "%";
            exp_status.title.text = "Exp: " + (Math.round(exp_status.val * 100) / 100) + "%";
            let skillname = "";
            if(last_status != undefined){

                for(let i = 0; i < last_status.length; i++){
                    if(last_status.charAt(i) >= '0' && last_status.charAt(i) <= '9') break;
                    skillname += last_status.charAt(i);
                }
                
                skill_status.title.text = skillname.charAt(0).toUpperCase() + skillname.substring(1) + ": " + (Math.round(skill_status.val * 100) / 100) + "%";
            }
        }else{
            hp_status.title.text = "Health";
            hunger_status.title.text = "Food";
            exp_status.title.text = "Experience";
            skill_status.title.text = "";
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
    areetraMOD.compassButton.coords.visible = (AreetraMODToggleButtons.compassButtonToggle? 1 : 0);
    areetraMOD.compassButton.title.text = "Compass: " + (AreetraMODToggleButtons.compassButtonToggle? "ON" : "OFF");
}

areetraMOD.pingButton.on_click = function () {
    jv.command('/ping');
}
areetraMOD.fpsButton.on_click = function () {
    jv.command('/fps');
}
areetraMOD.showPercentage.on_click = function () {
    AreetraMODToggleButtons.showPercentage = !AreetraMODToggleButtons.showPercentage;
    areetraMOD.showPercentage.title.text = "Percentage: " + (AreetraMODToggleButtons.showPercentage? "ON" : "OFF");
}



var keyX = jv.keyboard(88);

keyX.press = function () {
    areetraMOD.visible ? areetraMOD.hide() : areetraMOD.show();
}

