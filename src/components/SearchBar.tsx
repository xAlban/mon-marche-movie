import React from "react";
import styled from "styled-components"

interface SearchBarProps {
    onTextChange?: any
    onCrossClick?: any
}

const StyledContainer = styled.div`
    margin: auto;
    width: 50%;
    padding: 15px;
`;

const StyledSearchBar = styled.input`
    width: 100%;
    border-radius: 20px;
    height: 25px;
    padding: 5px;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 2px;
    }
    position: relative;
`;

const StyledIcon = styled.span`
    position: absolute;
    right: 25%;
    margin-top: 7px;
`;

/**
 * Search bar containing a cross to clear the input with a call possible
 * aswell for the parent
 */
export const SearchBar = (props: SearchBarProps) => {

    const [inputText, setInputText] = React.useState<string>("");

    const { onTextChange, onCrossClick } = props;

    function inputChangeHandler(event: any){
        const textValue = event.target.value;
        setInputText(textValue);
        if(onTextChange){
            onTextChange(textValue);
        }
    }

    function clearInput(){
        setInputText("");
        if(onCrossClick){
            onCrossClick()
        }
    }

    return (
        <StyledContainer>
            <StyledSearchBar placeholder="Search for a movie" value={inputText} onChange={event => inputChangeHandler(event)}/>
            {
                inputText !== "" && <StyledIcon className="material-icons" onClick={clearInput}>close</StyledIcon>
            }
        </StyledContainer>
    );
}