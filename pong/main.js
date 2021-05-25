//creo mi tablero 
(function(){
     self.Board = function(width,height){
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
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width; //le asigno el tamaño al canva
        this.canvas.height = board.height;
        this.Board = board;
        this.ctx = canvas.getContext("2d")// usa el getcontext propio del canvas y se lo asigna al objet ctx
    
    }
})();

// ejecutar cuando sale la ventana
window.addEventListener("load",main);

function main(){
    //instancio un objeto de la clase board
    var board = new Board(1000,200);
    var canvas = document.getElementById('canvas');
    var boardView = new BoardView(canvas,board);
}