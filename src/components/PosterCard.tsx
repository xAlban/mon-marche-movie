import React from "react";
import styled from "styled-components";

interface PosterCardProps {
    posterUrl: string,
    clickHandle?: any,
    title: string
}

interface TitleContainerProps {
    isHovered: boolean
}


const StyledContainer = styled.div`
    display: flex;
    flex: 0 0 50px;
    flex-direction: column;
    padding: 5px;
    max-height: 280px;
`;

const StyledImage = styled.img`
`;


const StyledTitleContainer = styled.div<TitleContainerProps>`
    background-color: #FFFFFFA0;
    bottom: 15vh;
    opacity: ${props => props.isHovered ? 1 : 0};
    position: relative;
    text-align: center;
    transition: all 0.2s linear;
`;

/**
 * A card which contains the image of the poster with a title on hover
 * and can handle click if necessary
 */
export const PosterCard = (props: PosterCardProps) => {

    const [isHovered, setIsHovered] = React.useState<boolean>(false)

    const { posterUrl, clickHandle, title } = props;

    function mouseHandle(value: boolean){
        setIsHovered(value)
    }

    return (
        <StyledContainer
            onClick={clickHandle ? clickHandle : () => {}}
            onMouseEnter={() => mouseHandle(true)}
            onMouseLeave={() => mouseHandle(false)}
        >
            <StyledImage src={posterUrl}/>
            <StyledTitleContainer isHovered={isHovered}>{title}</StyledTitleContainer>
        </StyledContainer>
    );
}