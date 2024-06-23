let solutions = {};
let first_selected_field=null;
let can_player_click=true;
let counter=0;
const soundtrack=new Audio('soundtrack.mp3');
let is_music_enabled=true;
const start = function(){
    counter=0;
    document.querySelector('.box').textContent="";
    const board=document.createElement('div');
    board.classList.add('board');
    for(let i=0;i<16;i++){
        const field=document.createElement('button');
        field.classList.add('field');
        field.id=i;
        board.appendChild(field);
    }
    const score=document.createElement('p');
    score.innerHTML=`Liczba ruchów:${counter}`;
    score.id="score";
    document.querySelector('.box').appendChild(score);
    document.querySelector('.box').appendChild(board);
    const cards=['man','robot','rocket','woman','astronautv1','astronautv2','astronautv3','dragon'];
    let fieldsArray = Array.apply(null,document.querySelectorAll('.field'));
    for(const card of cards){
        let random_number=Math.floor(Math.random() * fieldsArray.length);
        let field_to_object=fieldsArray[random_number];
        solutions[field_to_object.id]=card;
        fieldsArray.splice(random_number,1);
        random_number=Math.floor(Math.random() * fieldsArray.length);
        field_to_object=fieldsArray[random_number];
        solutions[field_to_object.id]=card;
        fieldsArray.splice(random_number,1);
    }
    console.log(solutions);
    fieldsArray = Array.apply(null,document.querySelectorAll('.field'));
    for(const field of fieldsArray){
        field.addEventListener('click',show_card);
    }
    audio_function();
}
const show_card = function(){
    if(can_player_click && this.id!=first_selected_field)
    {
        this.classList.remove('field');
        this.style.backgroundImage=`url(card_images/${solutions[this.id]}.png)`;
        this.style.backgroundSize=`cover`;
        if(first_selected_field){
            counter++;
            const score=document.getElementById('score');
            score.innerHTML=`Liczba ruchów: ${counter}`;
            can_player_click=false;
            const second_selected_field=this.id;
            const first_field=document.getElementById(first_selected_field);
            const second_field=document.getElementById(second_selected_field);
            if(solutions[first_selected_field]==solutions[second_selected_field]){
                setTimeout(function(){
                    first_field.removeAttribute("style");
                    second_field.removeAttribute("style");
                    first_field.disabled=true;
                    second_field.disabled=true;
                    can_player_click=true;
                    first_selected_field=null;
                    check();
                },1000)
            }
            else{
                setTimeout(function(){
                    first_field.removeAttribute("style");
                    second_field.removeAttribute("style");
                    first_field.classList.add('field');
                    second_field.classList.add('field');
                    first_selected_field=null;
                    can_player_click=true;
                },2000)
            }
    }
    else{
        first_selected_field=this.id;
    }
    }
}
const check =function(){
    const fieldsNodeList=document.querySelectorAll('.field');
    if(!fieldsNodeList.length){
        // soundtrack.pause();
        // soundtrack.currentTime=0;
        document.querySelector('.board').remove();
        document.getElementById('score').remove();
        const winner_box=document.createElement('div');
        winner_box.classList.add('info');
        document.querySelector('.box').appendChild(winner_box);
        const header=document.createElement('h1');
        header.innerHTML=`Udało ci się za ${counter} razem`;
        winner_box.appendChild(header);
        const button=document.createElement('button');
        button.classList.add('reset');
        winner_box.appendChild(button);
        button.innerHTML="Zagraj jeszcze raz";
        button.addEventListener('click',start);
    }
}
const audio_function= function(){
    if(is_music_enabled){
        soundtrack.play();
        soundtrack.loop=true;
        soundtrack.volume=0.01;
    }
    else{
        soundtrack.pause();
    }
}
const change_audio = function(){
    const audio_icon=document.querySelector('#audio_button i');
    if(is_music_enabled){
        audio_icon.className="icon-volume-off";
        is_music_enabled=false;
    }
    else{
        audio_icon.className="icon-music";
        is_music_enabled=true;
    }
    audio_function();
}
document.getElementById('audio_button').addEventListener('click',change_audio);
document.getElementById('start').addEventListener('click', function(){
    $('.info').fadeOut(500);
    document.getElementById('start').disabled=true;
    setTimeout(function(){
        start();
    },500);
})
