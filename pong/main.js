//creo mi tablero 
(function(){
    var self.Board = function(width,height){
        this.width = width;
        this.height = height; //tamaño tablero
        this.playing = false; // var bool, si esta jugando
        this.game_over = false; // var bool, si perdio
        this.bars = [];
        this.ball = null;
    }

    // modificar el prototipo para agregar los metodos
    self.Board.prototype ={
        //agregar objeto json
        get elements(){
            // me trae los elementos (bars)
            var elements = this.bars; // barras laterales del juego
            elements.push(ball);
            return elements;
        }
    }
})();

// clase para dibujar el tablero

function main(){

}