import styled from 'styled-components';

const Button = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        Selengkapnya
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    width: 10em;
    position: relative;
    height: 3.5em;
    border: 3px ridge #6366F1;
  
    outline: none;
    background-color: transparent;
    color: white;
    transition: 1s;
    border-radius: 0.6em;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  button::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #0e0c15;
    transition: 0.5s;
    transform-origin: center;
  }

  button::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #0e0c15;
    transition: 0.3s;
  }

  button:hover::before, button:hover::after {
    transform: scale(0)
  }

  button:hover {
    box-shadow: inset 0px 0px 30px #6366F1;
  }
`;

export default Button;
