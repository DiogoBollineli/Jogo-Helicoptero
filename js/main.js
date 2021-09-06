var gameOver = document.getElementById("gameover");
function start() {
    $(".inicio").hide();
    $(".game").append("<div id='jogador' class='animaPlayer'></div>");
    $(".game").append("<div id='amigo' class='animaAmigo'></div>");
    $(".game").append("<div id='inimigo1' class='animaEnemy'></div>");
    $(".game").append("<div id='inimigo2'></div>");
    $(".game").append("<div id='placar'></div>");
    $(".game").append("<div id='energia'></div>");


const jogo ={}
var TECLA = {
    W:87,
    S:83,
    SPACE:32
}
let pontos=0;
let salvos=0;
let perdidos=0;
let velocidade = 5;
let energia = 3;
let posicaoY = parseInt(Math.random() * 334);
var enablefire = true;
var fimdejogo = false;
let somDisparo = document.getElementById("somDisparo");
let resgate = document.getElementById("resgate");
let perdido = document.getElementById("perdido");
let musicaFundo = document.getElementById("musicafundo");
let musica = document.getElementById("musica");
let explosao = document.getElementById("somExplosao");
jogo.pressionou =[];

musica.addEventListener("ended", function(){musica.currentTIME = 0; musica.play(); }, false);
$(document).keydown(function(e) {
    jogo.pressionou [e.which] = true;
});

$(document).keyup(function(e) {
    jogo.pressionou [e.which] = false;
});

jogo.timer = setInterval(loop,30);

function loop() {
    moveFundo();
    moveJogador();
    moveInimigo1();
    moveInimigo2();
    moveAmigo();
    colisao();
    placar();
    barraEnergia();
}

function moveFundo() {
    let esquerda = parseInt($(".game").css("background-position"));
    $(".game").css("background-position",esquerda-1)
}

function moveJogador(){
        if(jogo.pressionou [TECLA.W]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10);
        if(topo<=0){
            $("#jogador").css("top",topo+10)
    }    
}
        if(jogo.pressionou [TECLA.S]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);
        if(topo >= 434){
            $("#jogador").css("top",topo-10)
        }
    }
    if(jogo.pressionou [TECLA.SPACE]){
        disparo()
        somDisparo.play();
    }
    
}
function moveInimigo1(){
    let posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);
        if(posicaoX<=0){
           posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
}
function moveInimigo2() {
    let X = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", X-3);
        if(X<=0){
            $("#inimigo2").css("left",775);
        }
}
function moveAmigo(){
   let posicaoX = parseInt($("#amigo").css("left"));
    $("#amigo").css("left",posicaoX + 1 );
    if(posicaoX >= 906){
        $("#amigo").css("left", 0);
    }
}
function disparo(){
    if(enablefire == true){
        enablefire = false;
        topo = parseInt($("#jogador").css("top"));
      let posicaoX = parseInt($("#jogador").css("left"));
        tiroX = posicaoX + 190;
        topoTiro = topo +37;
        $(".game").append("<div id = 'disparo'></div>");
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);

        var tempoDisparo = window.setInterval(executaDisparo,30);
    }
    function executaDisparo(){
        posicaoX = parseInt($("#disparo").css("left"));
        $("#disparo").css("left",posicaoX+15);
        if(posicaoX>900){
            window.clearInterval(tempoDisparo);
            tempoDisparo = null;
            $("#disparo").remove();
            enablefire = true;
        }
    }
}
function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")));
    var colisao2 = ($("#jogador").collision($("#inimigo2")));
    var colisao3 = ($("#disparo").collision($("#inimigo1")));
    var colisao4 = ($("#disparo").collision($("#inimigo2")));
    var colisao5 = ($("#jogador").collision($("#amigo")));
    var colisao6 = ($("#inimigo2").collision($("#amigo"))); 
        if (colisao1.length>0) {         
        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));
        explosao1(inimigo1X,inimigo1Y);
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
        energia--
        explosao.play();
        }
        if (colisao2.length>0) {
	
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
                
            reposicionaInimigo2();
            energia--
            explosao.play();
            }
            if(colisao3.length>0){
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));
                explosao1(inimigo1X,inimigo1Y);
                posicaoY = parseInt(Math.random() * 334);
                $("#disparo").css("left",950);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
                pontos=pontos+100;
                if(velocidade<=10){
                velocidade = velocidade + 0.3}
                explosao.play();
                
            }
            if(colisao4.length>0){
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                explosao2(inimigo2X,inimigo2Y);
                $("#inimigo2").remove();
                $("#disparo").css("left",950);
                reposicionaInimigo2();
                pontos=pontos+50;
                explosao.play();
            }
            if(colisao5.length>0){
                reposicionaAmigo();
                $("#amigo").remove();
                salvos++;
                resgate.play();
            }
            if(colisao6.length>0){
                amigoX = parseInt($("#amigo").css("left"));
                amigoY = parseInt($("#amigo").css("top"));
                explosao3(amigoX,amigoY);
                $("#amigo").remove();
                reposicionaAmigo();
                perdidos++;
                perdido.play();
            }
        }	
function explosao1(inimigo1X,inimigo1Y) {
	$(".game").append("<div id='explosao1'></div");
	var div=$("#explosao1").css("background-image", "url(imgs/explosao.png)");
	div.css("top", inimigo1Y);
	div.css("left", inimigo1X);
	div.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
		
	}
    function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 5000);
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
                if (fimdejogo==false) {
                
                $(".game").append("<div id=inimigo2></div");
                
                }
                
            }	
        }	
        function explosao2(inimigo2X,inimigo2Y) {
	
            $(".game").append("<div id='explosao2'></div");
            $("#explosao2").css("background-image", "url(imgs/explosao.png)");
            var div2=$("#explosao2");
            div2.css("top", inimigo2Y);
            div2.css("left", inimigo2X);
            div2.animate({width:200, opacity:0}, "slow");
            
            var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
            
                function removeExplosao2() {
                    
                    div2.remove();
                    window.clearInterval(tempoExplosao2);
                    tempoExplosao2=null;
                    
                }
            } 
        function reposicionaAmigo(){
            let tempoAmigo=window.setInterval(reposiciona6, 6000);
            function reposiciona6(){
                window.clearInterval(tempoAmigo);
                tempoAmigo =null;
                if(fimdejogo == false){
                    $(".game").append("<div id='amigo' class='animaAmigo'></div>")
                }
            }
        }
        function explosao3(amigoX,amigoY){
            $(".game").append("<div id='explosao3' class='animaFamigo'></div>")
            $("#explosao3").css("top",amigoY);
            $("#explosao3").css("left",amigoX);
            let tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
            function resetaExplosao3(){
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;}
        }
        function placar(){
            $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>")
        }
        function barraEnergia(){
            if(energia==3){
                $("#energia").css("background-image", "url(imgs/energia3.png)");
            }
            if(energia==2){
                $("#energia").css("background-image", "url(imgs/energia2.png)");
            }
            if(energia==1){
                $("#energia").css("background-image", "url(imgs/energia1.png)");
            }
            if(energia==0){
                $("#energia").css("background-image", "url(imgs/energia0.png)");
                gameover();
            }
        }
        function gameover(){
        fimdejogo = true;
        gameOver.play();
        window.clearInterval(jogo.timer);
        jogo.timer = null;
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        $(".game").append("<div id='fim'></div>");
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
        }
    }
        function reiniciaJogo(){
          gameOver.pause();
            $("#fim").remove();
            start()
        }
