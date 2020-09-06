import Iframe from 'react-iframe'


import React,{ useState, useEffect } from 'react';



const RandomGame = () => {
    const [gameUrl, setGameUrl] = useState('')

    const games = [{name:'Tetris', url:'https://chvin.github.io/react-tetris/'}, {name:'Packman', url:"https://pacman-e281c.firebaseapp.com/"}, {name:'Space Invaders', url:"https://arcade.ly/games/space-invaders/"}]

    const setGame = () =>{
        let randomInt = Math.floor(Math.random() * games.length) 
        setGameUrl(games[randomInt].url)
        console.log(gameUrl);
    }

    useEffect(() => {
        setGame()
        return () => {
            setGameUrl('')
        };
    }, [])


    return <div className="random-game">
        {gameUrl &&<Iframe url={gameUrl} width="100%" height="100%" className="iframe" />}
    </div>;
}

export default RandomGame;