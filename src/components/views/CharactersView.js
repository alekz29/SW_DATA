import React from 'react'
import CharacterListPage from "../CharacterListPage";

const CharactersView = (props) => {
    const {productId} = props.match.params;
    return (
        <div>
            <CharacterListPage item={productId}/>
        </div>)

}


export default CharactersView