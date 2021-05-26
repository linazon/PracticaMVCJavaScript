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
    self.Board.prototype = {
        //agregar objeto json
        get elements(){
            // me trae los elementos (bars)
            var elements = this.bars; // barras laterales del juego
            //elements.push(this.ball);
            return elements;
        }
    }
})();

//dibujar las barras
(function(){
    self.Bar = function(x,y,width,height,board){
        this.x= x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //traigo el objeto board, luego el arreglo bars y con push le agrego el objeto bar (misma funcion)
        this.board.bars.push(this);
        //le aviso al canvas que voy a dibujar un rectangulo
        this.kind ="rectangle";
        this.speed = 10; //define el atributo para la velocidad de las barras
    }

    self.Bar.prototype ={
        // funciones para mover la barra
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " +this.x+ "y: " +this.y;
        }
    }
})();

// clase para dibujar el tablero
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width; //le asigno el tamaño al canva
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");// usa el getcontext propio del canvas y se lo asigna al objet ctx
    }

    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];
                draw(this.ctx,el);
            };
        }
    }

    //dibuja las barras en el tablero
    function draw(ctx,element){
        //if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            }
        //}
        
    }
})();

var board = new Board(800,400);
var bar = new Bar(20,150,40,100,board);
var bar_2 = new Bar(740,150,40,100,board);
var limite = new Bar(50,10,700,10,board);
var limite = new Bar(50,380,700,10,board);
var canvas = document.getElementById('canvas');
var board_View = new BoardView(canvas,board);

//ejecuto las funciones up y down, según se oprima las teclas
document.addEventListener("keydown",function(ev){
    ev.preventDefault()
    console.log(ev.keyCode);
    if(ev.keyCode == 38){
        bar.up();
    }else if(ev.keyCode ==40){
        bar.down();
    }else if(ev.keyCode === 87){
         bar_2.up();
        //w
    }else if(ev.keyCode === 83){
        bar_2.down();
        //s
    }

    console.log(""+bar_2);
});

// ejecutar cuando sale la ventana
//self.addEventListener("load",main);

window.requestAnimationFrame(controller);

function controller(){
    board_View.draw();
    window.requestAnimationFrame(controller);
}