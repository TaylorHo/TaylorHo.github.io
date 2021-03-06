import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Olá, me chamo</h1>;
  const two = <h2 className="big-heading">Taylor Hoffmann.</h2>;
  const three = <h3 className="big-heading">Eu crio de tudo um pouco :)</h3>;
  const four = (
    <>
      <p>
        Sou pesquisador em uma{' '}
        <a href="https://certi.org.br/index" target="_blank" rel="noreferrer">
          fundação de
        </a>{' '}
        <a href="https://certi.org.br/index" target="_blank" rel="noreferrer">
          pesquisa e
        </a>{' '}
        <a href="https://certi.org.br/index" target="_blank" rel="noreferrer">
          desenvolvimento tecnológico
        </a>
        , trabalhando com desenvolvimento de softwares. Sou formado em{' '}
        <a
          href="https://pt.wikipedia.org/wiki/Seguran%C3%A7a_de_computadores"
          target="_blank"
          rel="noreferrer">
          Defesa Cibernética
        </a>
        , e contribuo em diversos projetos open source. Você pode ver mais do meu trabalho no{' '}
        <a href="https://twitter.com/hoffxhoff" target="_blank" rel="noreferrer">
          Twitter.
        </a>
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="#contact">
      Entre em Contato
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
