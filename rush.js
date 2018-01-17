 
<!-- Reading in the text file -->
    
var levels=0; 

// Create an array with all snapchats of the board to support undo.
var snapShots = new Array();

// Create an array with all the puzzles.
                
                function FileHelper(){}
                {
                FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
                {
                var request = new XMLHttpRequest();
                request.open("GET", pathOfFileToReadFrom, false);
                request.send(null);
                var returnValue = request.responseText;

                return returnValue;
                }
            }
                // creating an array with text files.
                var files = ["input.txt","input1.txt","input2.txt","input3.txt","input4.txt"];
        
                
                
                var text = FileHelper.readStringFromFileAtPath (files[levels]);

     
                // creating puzzle objects 
                var myPuzzle = new Array();
                var colors = new Array();

                
                var init = function(){
                var input=text.split("\n");
                function Puzzle(piece) {
                        this.row = piece[0];
                        this.column = piece[1];
                        this.width = piece[2];
                        this.height = piece[3];
                        this.move = piece[4];
                }
                
                for(var i=1;i<input.length;i++){
                        myPuzzle.push(new Puzzle(input[i].replace(/\s/g, '')))
                }
                    
                        snapShots.push(JSON.parse(JSON.stringify(myPuzzle)));
                    
                    
               
                   // var colors = new Array(); // random colors
                    colors.push('red');
                    
                    for(var i=0;i<myPuzzle.length-1;i++){
                    var rgb = [];  
                    for(var j = 0; j < 3; j++) rgb.push(Math.floor(Math.random() * 255));
                    colors.push('rgb('+ rgb.join(',') +')');
                    }
                };
                
                init();
                /*
                This is a function to initalize the board.
                Setting the postion of each individual Puzzle piece
                */
                
                    $(document).ready(window.initialize = function() {
                    
                        
                    var myBoard= new Array();
                    for (var i=0; i<myPuzzle.length; i++){
                        var piece = document.createElement("div");
                        piece.id = i.toString();
                        myBoard.push(piece);
                    
                document.getElementById("board").appendChild(myBoard[i]).style.backgroundColor =    
                    colors[i];
                        
                    document.getElementById("board").appendChild(myBoard[i]).style.height =    
                  (16.66*myPuzzle[i].height).toString()+"%" ;  
                        
                        document.getElementById("board").appendChild(myBoard[i]).style.width =    
                  (16.66*myPuzzle[i].width).toString()+"%" ; 
                        
                    document.getElementById("board").appendChild(myBoard[i]).style.top =   
                        (16.66*(myPuzzle[i].row-1)).toString()+"%" ;  
                        
                    document.getElementById("board").appendChild(myBoard[i]).style.left =   
                        (16.66*(myPuzzle[i].column-1)).toString()+"%" ;  
                        

                /*
                Setting up the pieces to be draggable and droppable 
                as well as avoiding collisions
                */
                        
            var shouldCancel = false;
            var move;
                        
            if(myPuzzle[i].move == 'b') move="none"
            
            else if(myPuzzle[i].move == 'h') move="x"
            
            else if(myPuzzle[i].move == 'v') move="y"
            
            $( "#"+myBoard[i].id ).draggable({containment: "parent",   
                axis: move,
               revert: function(){
                if (shouldCancel) {
                    shouldCancel = false;
                    return true;
                } else {
                    return false;
                }
            },
                                              
        stop: function(event, ui) {
            
            snapShots.push(JSON.parse(JSON.stringify(myPuzzle)));

            
            // calculating the position of the goal piece when game is over.
            var left = $(this).position().left;
            var top = $(this).position().top;
           
            var width = $(this).parent().width()*(6-myPuzzle[0].width)/6;
            var height = $(this).parent().height()*2/6;
            
    
            // calculating the postion of the currently moved piece.
            
            var currLeft = $(this).position().left;
            var currTop = $(this).position().top;
            
            // getting the new postion of the moved piece. 
            // row postion. 
            
            if(currTop < 20){
               myPuzzle[$(this).attr('id')].row = 1;
            }
            
            if(currTop > 30 && currTop < 60){
                myPuzzle[$(this).attr('id')].row = 2;
            }
            
            if(currTop > 70 && currTop < 110){
                myPuzzle[$(this).attr('id')].row = 3;
            }
            
            if(currTop > 120 && currTop < 150){
                myPuzzle[$(this).attr('id')].row = 4;
            }
             if(currTop > 160 && currTop < 200){
                myPuzzle[$(this).attr('id')].row = 5;
            }
            
             if(currTop > 200 && currTop < 230){
                myPuzzle[$(this).attr('id')].row = 6;
            }
            
            // column postion. 
            
              if(currLeft < 20){
               myPuzzle[$(this).attr('id')].column = 1;
            }
            
            if(currLeft > 60 && currLeft < 120){
                myPuzzle[$(this).attr('id')].column = 2;
            }
            
            if(currLeft > 150 && currLeft < 200){
                myPuzzle[$(this).attr('id')].column= 3;
            }
            
            if(currLeft > 240 && currLeft < 300){
                myPuzzle[$(this).attr('id')].column= 4;
            }
            if(currLeft > 340 && currLeft < 380){
                myPuzzle[$(this).attr('id')].column= 5;
            }
             if(currLeft > 420 && currLeft < 470){
                myPuzzle[$(this).attr('id')].column= 6;
            }
            
            // rearranging the piece bords on the event of a drop.
         
            if($(this).attr('id') == 0 && left > (width-5) && left < (width+5) 
              && top > (height-5) && top < (height+5)){
                alert("game over");
                levels++;
                if(levels == 5){
                    $("#board" ).remove();
                    $( "#exit" ).remove();
                    $("#end").css('display','block');
                }
                else{
                $("#board").empty();
                text = FileHelper.readStringFromFileAtPath (files[1]);
                myPuzzle.length=0;
                colors.length=0;
                init();
                initialize();
                }
            }
    }   
            });

                $( "#"+myBoard[i].id ).droppable({
                    
                    over: function(){
                    shouldCancel = true;
                },
                out: function(){
                    shouldCancel = true;
                }
                                                 
                        });

               }
                 $( "#reset").click(function() {
                    $("#board").empty();
                    myPuzzle.length=0;
                    init();
                    initialize();
                    
                });    
                    });


                $( "#undo").click(function(event) {
                    if(snapShots.length > 1){
                            $("#board").empty();
                            myPuzzle.length=0;
                            myPuzzle=snapShots[snapShots.length-1];
                            snapShots.splice(-1,1);
                            initialize();
                    }
                     });

                    $( "#skip").click(function() {
                        levels++;
                         if(levels == 5){
                        $("#board" ).remove();
                        $( "#exit" ).remove();
                        $("#end").css('display','block');
                        }
                        else{
                         $("#board").empty();
                        text = FileHelper.readStringFromFileAtPath (files[levels]);
                        myPuzzle.length=0;
                        colors.length=0;
                        init();
                        initialize();
                        }
                    });
                
