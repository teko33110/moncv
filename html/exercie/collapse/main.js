const main = () => {

    let collapse = document.querySelectorAll("p:first-child");


    const paragraphe = {
        close: true,
    };

    const close = (content) => {
        content.style.Maxheight = null;
        content.style.height = 0;
        content.style.padding = 0;
        paragraphe.close = true;

    };

    const open = (content) => {
        if(content.clientHeight >0) return;
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.height = content.style.maxHeight;
        content.style.padding = 32 + "px";
        paragraphe.close = false;
    };

   

    const handleClick = (content) => {
        const pLast= document.querySelectorAll("p:last-child");
        for (let i = 0; i<pLast.length; i++) {
            const el = pLast[i];
            close(el);
    
        }

        open(content);


    }


    for (i = 0; i < collapse.length; ++i) {
        let element = collapse[i];

        let content = element.nextElementSibling;
        element.addEventListener("click", () => handleClick(content))
        


    }


};

addEventListener("load", main);