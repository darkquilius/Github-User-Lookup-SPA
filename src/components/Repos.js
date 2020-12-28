import React from 'react';
import styled from 'styled-components';
import {useGlobalContext } from '../context/context';
import {Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = useGlobalContext();

  let languages = repos.reduce((total, item) => {
    const {language} = item;
    if(!language) {
      return total
    };
    total[language]? total[language] = {label: language, value: total[language].value += 1}: total[language] = {label: language, value: 1};
    return total;
  }, {})

  let stars = repos.reduce((total, item) => {
    const {language, stargazers_count} = item;
    if(!language) {
      return total
    };
    total[language]?
      total[language] = {label: language, value: total[language].value + stargazers_count}
      : total[language ] = {label: language , value: 1};
    return total;
  }, {})

  let repoStars = repos.reduce((total, item) => {
    const {name, stargazers_count} = item;
    if(!name) {
      return total
    };
    total[name]?
      total[name] = {label: name, value: total[name].value + stargazers_count}
      : total[name ] = {label: name , value: 1};
    return total;
  }, {})

  let forks = repos.reduce((total, item) => {
    const {name, forks} = item;
    if(!name) {
      return total
    };
    total[name]?
      total[name] = {label: name, value: total[name].value + forks}
      : total[name ] = {label: name , value: 1};
    return total;
  }, {})

  // STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "Venezuela",
//     value: "290"
//   },
//   {
//     label: "Saudi",
//     value: "560"
//   }
// ];

const pie3dData = Object.values(languages);
const doughnut2dData = Object.values(stars);
const column3dData = Object.values(repoStars).slice(-4).reverse();
const bar3dData = Object.values(forks).slice(-4).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData}/> */}
        <Pie3D data={pie3dData} />
        <Column3D data={column3dData} />
        <Doughnut2D data={doughnut2dData}/>
        <Bar3D data={bar3dData} /> 
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
