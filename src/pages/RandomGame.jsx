import Iframe from 'react-iframe'

import React,{ useState, useEffect } from 'react';



const RandomGame = () => {
    const [gameName, setGameName] = useState('')

    const gamesName = ['tetrix-en-s-iga-cloud','little-jump-guy-new-en-s-iga-cloud','bottle-flip-new-en-s-iga-cloud', 'basket-fall2-new-en-s-iga-cloud','easter-hunt-new-en-s-iga-cloud','trump-run-new-en-s-iga-cloud','minigolf-new-en-s-iga-cloud','onion-boy-new-en-s-iga-cloud','tank-wars-new-en-s-iga-cloud','angry-chicken-egg-madness-new-en-s-iga-cloud','switch-sides-new-en-s-iga-cloud','html5/unlockit-en-s-iga-cloud', 'spotle-en-s-iga-cloud','snake-condo-en-s-iga-cloud', 'cheese-lab-en-s-iga-cloud','medieval-dodgeball-en-s-iga-cloud']
     

    const setGame = () =>{
        let randomInt = Math.floor(Math.random() * gamesName.length) 
        setGameName(gamesName[randomInt])
        console.log(gameName);
    }

    useEffect(() => {
        setGame()
        return () => {
            setGameName('')
        };
    }, [])


    return <div className="random-game">
        {gameName &&<Iframe url={`https://wanted5games.com/games/html5/${gameName}/index.html?pub=10`} width="100%" height="100%" className="iframe" />}
    </div>;
}

export default RandomGame;