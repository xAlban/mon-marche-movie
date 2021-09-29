import React from 'react';
import styled from 'styled-components';
import Switch from "react-switch";

const StyledHeader = styled.header`
    background-color: ${props => props.theme.palette.general.mainColor};
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledTitle = styled.h1`
    margin: 0;
    text-align: center;
    color: white;
`;

const StyledSwitchContainer = styled.div`
    position: absolute;
    right: 25px;
`;

const StyledBackIcon = styled.span`
    position: absolute;
    left: 25px;
    color: white;
`;


interface HeaderProps {
    title: string,
    backClick?: any,
    toggleMode: any,
    toggleInitValue?: boolean
}

/**
 * Header Banner which contains a backbutton if needed and a Toggle for the light or dark theme
 */
export const Header = (props: HeaderProps) => {
    const {backClick, title, toggleMode, toggleInitValue} = props;

    const [checked, setChecked] = React.useState<boolean>(toggleInitValue ? toggleInitValue : false);

    function handleToggleChange(value: boolean){
        toggleMode(value)
        setChecked(value)
    }

    return (
        <StyledHeader>
            {
                backClick 
                && <StyledBackIcon 
                    className="material-icons"
                    onClick={backClick}
                    >
                        navigate_before
                    </StyledBackIcon>}
            <StyledTitle>{title}</StyledTitle>
            <StyledSwitchContainer>
                <Switch
                    onChange={(newVal: boolean) => handleToggleChange(newVal)}
                    checked={checked}
                    offColor="#888"
                    onColor="#888"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    checkedHandleIcon={<span className="material-icons">dark_mode</span>}
                    uncheckedHandleIcon={<span className="material-icons">light_mode</span>}
                />
            </StyledSwitchContainer>
            
        </StyledHeader>
    );
};