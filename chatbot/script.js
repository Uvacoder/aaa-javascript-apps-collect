<!DOCTYPE html>  
<html lang="en">  
 <head>  
  <meta charset="UTF-8" />  
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />  
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
  <title>Chatbot Javascript </title>  
  <link rel="stylesheet" href="style.css" />  
 </head>  
 <body>  
  <div class="glass">  
   <h1>Ask Your Question??</h1>  
   <h2>Yeah,ask Some Question</h2>  
   <div class="input">  
    <input  
     type="text"  
     id="userBox"  
     onkeydown="if(event.keyCode == 13){ talk()}"  
     placeholder="Type your Question"  
    />  
   </div>  
   <p id="chatLog">Answer Appering Hear</p>  
  </div>  
  <script src="app.js"></script>  
 </body>  
</html>  