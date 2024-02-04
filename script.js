let tmpdiv;
let tmpchild;
let number1 , number2;
let operator;
const maxFontSize = 60;
const textElement = document.getElementById('myText');
const initialTextWidth = textElement.offsetWidth;
let operation = "";
let result = 0;


let container = document.querySelector('#numButtons');

let display = document.querySelector('#myText');

display.innerHTML = '0'


createDivs(3, 3);



function createDivs(height, width){



    for(let i = 0; i < height; i++){

        tmpdiv = document.createElement('div');
        tmpdiv.classList.add('row');
        container.appendChild(tmpdiv);
        
        for (let j=0; j < width; j++){

            tmpchild = document.createElement('button')
            tmpchild.classList.add('button');
            tmpchild.innerHTML = (j+1) * (i+1)
            tmpdiv.appendChild(tmpchild);
            
        }
    }

    tmpdiv = document.createElement('div');
    tmpdiv.classList.add('row');
    container.appendChild(tmpdiv);

    tmpchild = document.createElement('button')
    tmpchild.classList.add('button');
    tmpchild.innerHTML = "0"
    tmpdiv.appendChild(tmpchild);

    tmpchild = document.createElement('button')
    tmpchild.classList.add('button');
    tmpchild.innerHTML = "C"
    tmpdiv.appendChild(tmpchild);


}


function operate(num1, num2, operator){

    switch(operator){

        case '+':
            return num1 + num2;

        case '-':
            return num1 - num2;

        case '/':
            if(num2 == 0){
                display.textContent = "SYNTAX ERROR"
                textElement.offsetWidth = initialTextWidth;
                break;
            }
            else
                return Math.round(num1 / num2);

        case 'X':
            return num1 * num2;

        default:
            display.textContent = "SYNTAX ERROR"
            textElement.offsetWidth = initialTextWidth;
            break;

    }

}


function write(event){


    var btnTemp = event.target;


        switch (btnTemp.innerHTML) {
            case 'x':
                operator ='x'
                display.textContent += " X "
                break;

             case '+':
                display.textContent += " + "
                operator = '+'
                break;
            case '-':
                display.textContent += " - "
                operator = '-'
                break;
            
            case '/':
                display.textContent += " / "
                operator = '/'
                break;

            case 'C':
                display.textContent = "0"
                textElement.offsetWidth = initialTextWidth;
                break;
            
            case '=':
                result = 0;
                number1 = null;
                operator = null;
                number2 = null;
                operation = display.textContent.split(' ');
                    
                try {

                        operation.forEach(x => {

                            if(number1 == null)
                                number1 = parseInt(x);
                            else if(operator == null)
                                operator = x;
                            else if(number2 == null && number1 != null)
                                number2 = parseInt(x);
                            
                            if(number2 != null && number1 != null && operator != null)
                            {
                                result = operate(number1,number2,operator);
                                number1 = result;
                                operator = null;
                                number2 = null;
                            }
                            

                        })

                        display.textContent = result.toString();
                        
                } catch (error) {
                    display.textContent = "ERROR";
                }
                
                break;


            default:

                if(display.textContent == "0" || display.textContent == "SYNTAX ERROR" || 
                    display.textContent == "ERROR" || display.textContent == result.toString())
                    display.textContent = btnTemp.innerHTML;
                else 
                    display.textContent += btnTemp.innerHTML;
                
                break;
                
        }


}




window.onload = function() {

    const divWidth = document.querySelector('#display').offsetWidth;
    const textElement = document.getElementById('myText');
    const initialTextWidth = textElement.offsetWidth;

    const resizeObserver = new ResizeObserver( entries => {
        for (const entry of entries) {
            const newWidth = entry.contentRect.width;

            if(newWidth > divWidth ||  newWidth <= divWidth)
                adjustFontSize();

        }

    })
    
    function adjustFontSize() {
        
        const textWidth = textElement.offsetWidth;
    
        const ratio = divWidth / textWidth;
    
        const newSize = parseFloat(window.getComputedStyle(textElement).fontSize) * ratio;
    
        if(newSize > maxFontSize)
          textElement.style.fontSize = maxFontSize + 'px';
        else
    
          textElement.style.fontSize = newSize + 'px';
      }

    // Adjust font size on window resize
    resizeObserver.observe(textElement);

    // Initial adjustment
    adjustFontSize();

};
    


let btn = document.querySelectorAll('.button');

btn.forEach(b => {
    
        b.addEventListener('click', write);
        
    }
);
