var characters = [
    {
    name: "Luke",
    faction: "Jedi",
    health: 150,
    attack: 9,
    counterAttack: 14,
    calmImgUrl: "assets/images/luke.png",
    attackImgUrl: "assets/images/luke.png",
    damageIncrease: 5
    },
    {
    name: "Yoda",
    faction: "Jedi",
    health: 130,
    attack: 8,
    counterAttack: 14,
    calmImgUrl: "assets/images/yoda.png",
    attackImgUrl: "assets/images/yoda.png",
    damageIncrease: 7
    },
    {
    name: "Darth Vader",
    faction: "Sith",
    health: 210,
    attack: 9,
    counterAttack: 9,
    calmImgUrl: "assets/images/darthvader.jpg",
    attackImgUrl: "assets/images/darthvader.png",
    damageIncrease: 2
    },
    {
    name: "Darth Maul",
    faction: "Sith",
    health: 170,
    attack: 8,
    counterAttack: 10,
    calmImgUrl: "assets/images/darthmaul.jpg",
    attackImgUrl: "assets/images/darthmaul.jpg",
    damageIncrease: 4
    }
  ];
var attacker1 = []
var defender1 = []




$(document).ready(function(){
 
    $(".hide1").hide()
    $(".hide4").hide();
  
    for (var i = 0; i < characters.length; i++) {
        $(".char"+(i+1)+"a").html(characters[i].name);
     
        $(".char"+(i+1)+"b").html('<img src='+characters[i].calmImgUrl+' alt="Char Image" class="characterImage" />');
    
        $(".char"+(i+1)+"c").html(characters[i].health)
        $(".char"+(i+1)).attr("value", i);
    
    }
    
    var attackerSelected=0
    var defenderSelected=0
    var attackerValue=[]
    var defenderValue=[]
    var defendersDefeated = 0
    var attackerFinal=0
    var currentDefender = -1
    var attackerHealth=0
    var defenderHealth=0
    var attackerDamage=0
    var defenderDamage=0
    var attackerName=0
    var defenderName=0
    var attackerIncrease=0
    var k=0
    
        $(".char1,.char2,.char3,.char4").on("click", function() {
            if((attackerSelected===0)){
                var attacker = this;
                attackerValue.push($(this).attr("value"))
                var attackerClone = $(attacker).clone();
                $(".char8").replaceWith(attackerClone)
                var enemies = $(".char1,.char2,.char3,.char4").not(this)
                for (j=0; j<enemies.length-1;j++){
                    var enemiesClone = $(enemies[j]).clone(true)
                    $(".char"+(j+5)).replaceWith(enemiesClone)
                }
                $(".hide1").show();
                $(".hide4").show();
                $(".hide2").remove();
                $(".hide3").hide();
                attackerFinal = parseInt(attackerValue);
                $(".char"+(attackerFinal+1)+"b").html('<img src='+characters[attackerFinal].attackImgUrl+' alt="Char Image" class="characterImage" />');
                attackerHealth=characters[attackerFinal].health;
                attackerName=characters[attackerFinal].name;
                attackerIncrease=characters[attackerFinal].damageIncrease;
                selectCharAudio.play()
                attackerSelected++
            }
            else if (defenderSelected===0) {
                var defender = this;

                defenderValue.push($(this).attr("value"))

                var defenderClone = $(defender).clone();
                console.log(currentDefender)
                console.log(defenderValue)
                console.log(defenderValue[k])
                if(currentDefender===-1){
                    $(".char9").replaceWith(defenderClone);
                }
                else{
                    $(".char"+(currentDefender+1)).replaceWith(defenderClone);
                    k++;

                }  
                $(this).remove()
                $(".hide4").hide();
                $(".hide1").show();
                currentDefender = parseInt(defenderValue[k]);
                $(".char"+(currentDefender+1)+"b").html('<img src='+characters[currentDefender].attackImgUrl+' alt="Char Image" class="characterImage" />');                
                defenderHealth=characters[currentDefender].health
                console.log(defenderHealth);
                console.log(currentDefender);
                attackerDamageBase=characters[attackerFinal].attack*(defendersDefeated+1)
                defenderDamage=characters[currentDefender].counterAttack                
                defenderName=characters[currentDefender].name
                console.log(defenderName);
                selectCharAudio.play()
                defenderSelected++
            }})
        var attacks=0
    
        $(".btn-danger").click(function(){          
            if(attackerHealth > 1 && defenderHealth > 0){
                attAudio.play()
                attackerDamage = attackerDamageBase+(attackerIncrease*attacks);
                defenderHealth = defenderHealth-attackerDamage;
                attackerHealth = attackerHealth-defenderDamage;
                console.log(currentDefender)
                $(".char"+(attackerFinal+1)+"c").html(attackerHealth);
                $(".char"+(currentDefender+1)+"c").html(defenderHealth);
                $("#result").html("Result: <br>"+attackerName+" attacked " +defenderName+" for "+attackerDamage+" points. "+defenderName+" counterattacked for "+defenderDamage+" points.<br>Health Remaining: <br>"+attackerName+":"+attackerHealth+"<br>"+defenderName+":"+defenderHealth);
                attacks++;
            }
            
            if(defenderHealth<1){
                defendersDefeated++;

                $(".hide1").hide();
                $(".hide4").show();
                defenderSelected=0;
 

            }
            if(defendersDefeated==3 && attackerHealth<1){
                $("#result").html("Result: <br> Try Again");
                $("#newButton").append("<button type='button' class='btn btn-primary'>Reset</button>");
                $(".hide1").show();
                $(".hide4").hide();
            }
            else {
                if(attackerHealth<1){
                    $("#result").html("Result: <br> You Died");
                    lossAudio.play();
                    $("#newButton").append("<button type='button' class='btn btn-primary'>Reset</button>")
                }
                if(defendersDefeated==3){
                    $(".hide1").show();
                    $("#result").html("Result: <br> You Win");
                    $(".hide4").hide();
                    winAudio.play();
                    $("#newButton").append("<button type='button' class='btn btn-primary'>Reset</button>")
            }}



        });
        $("#newButton").click(function(){
            document.location.reload(true);
        })
        
    
    })